// Dotted-earth globe with routes from Bhopal to the overseas MBBS destinations named on Instagram.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const canvas = document.getElementById('globe');
const labelsEl = document.getElementById('globeLabels');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const R = 2;

const PLACES = [
  { name: 'India · Bhopal', lat: 23.26, lon: 77.41, home: true, dx: 12, dy: -14 },
  { name: 'Georgia · CIU Tbilisi', lat: 41.72, lon: 44.79, dx: 12, dy: 2 },
  { name: 'Russia', lat: 55.76, lon: 37.62, dx: 12, dy: -30 },
  { name: 'Ukraine', lat: 50.45, lon: 30.52, dx: -12, dy: -14 },
];

const toVec = (lat, lon, r = R) => {
  const phi = (90 - lat) * Math.PI / 180, th = (lon + 180) * Math.PI / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};

async function landMask() {
  const W = 1024, H = 512;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d', { willReadFrequently: true });
  try {
    const [{ feature }, topo] = await Promise.all([
      import('https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/+esm'),
      fetch('https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/land-110m.json').then(r => r.json()),
    ]);
    const land = feature(topo, topo.objects.land);
    x.fillStyle = '#fff';
    const draw = poly => {
      poly.forEach(ring => {
        x.beginPath();
        ring.forEach(([lon, lat], i) => { const px = (lon + 180) / 360 * W, py = (90 - lat) / 180 * H; i ? x.lineTo(px, py) : x.moveTo(px, py); });
        x.closePath(); x.fill();
      });
    };
    land.features.forEach(f => f.geometry.type === 'Polygon' ? draw(f.geometry.coordinates) : f.geometry.coordinates.forEach(draw));
    const data = x.getImageData(0, 0, W, H).data;
    return (lat, lon) => { const px = Math.floor((lon + 180) / 360 * (W - 1)), py = Math.floor((90 - lat) / 180 * (H - 1)); return data[(py * W + px) * 4] > 128; };
  } catch (e) {
    console.warn('land map unavailable', e);
    return null;
  }
}

async function init() {
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, .1, 100);
  const look = toVec(40, 55, 7.4); camera.position.copy(look);

  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false; controls.enablePan = false; controls.enableDamping = true; controls.rotateSpeed = .5;
  controls.autoRotate = !reduced; controls.autoRotateSpeed = .45;
  controls.minPolarAngle = .6; controls.maxPolarAngle = 2.3;

  // core sphere + fresnel atmosphere
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(R * .995, 64, 64), new THREE.MeshBasicMaterial({ color: 0x0a2350 })));
  const atmo = new THREE.Mesh(new THREE.SphereGeometry(R * 1.14, 64, 64), new THREE.ShaderMaterial({
    transparent: true, side: THREE.BackSide, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: 'varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.); }',
    fragmentShader: 'varying vec3 vN; void main(){ float i = pow(clamp(-dot(vN, vec3(0.,0.,1.)) * 1.7, 0., 1.), 3.); gl_FragColor = vec4(0.3,0.5,1.,1.) * i * .9; }',
  }));
  scene.add(atmo);

  // land dots (Fibonacci sphere sampled against the land mask)
  const isLand = await landMask();
  const N = 16000, pts = [], cols = [];
  const gold = new THREE.Color(0xf6d77c), pale = new THREE.Color(0x9dbcf0);
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * Math.PI * (3 - Math.sqrt(5));
    const lat = Math.asin(y) * 180 / Math.PI;
    let lon = (Math.atan2(Math.sin(th) * r, Math.cos(th) * r) * 180 / Math.PI);
    const land = isLand ? isLand(lat, lon) : (i % 7 === 0);
    if (!land) continue;
    const v = toVec(lat, lon, R * 1.002); pts.push(v.x, v.y, v.z);
    // glow the dots around the routes' region
    const near = lat > 15 && lat < 62 && lon > 20 && lon < 90;
    const c = near ? gold : pale; cols.push(c.r, c.g, c.b);
  }
  const dg = new THREE.BufferGeometry();
  dg.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
  dg.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  scene.add(new THREE.Points(dg, new THREE.PointsMaterial({ size: .032, vertexColors: true, transparent: true, opacity: .95 })));

  // routes
  const home = PLACES[0];
  const routes = PLACES.slice(1).map((p, i) => {
    const a = toVec(home.lat, home.lon), b = toVec(p.lat, p.lon);
    const mid = a.clone().add(b).multiplyScalar(.5); mid.setLength(R + a.distanceTo(b) * .45);
    const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
    const geo = new THREE.TubeGeometry(curve, 80, .012, 6);
    const mat = new THREE.MeshBasicMaterial({ color: 0xf6d77c, transparent: true, opacity: .95 });
    const tube = new THREE.Mesh(geo, mat); scene.add(tube);
    const total = geo.index.count; geo.setDrawRange(0, 0);
    const pulse = new THREE.Mesh(new THREE.SphereGeometry(.04, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    scene.add(pulse);
    return { curve, geo, total, pulse, delay: i * .6 };
  });

  // city markers
  const markers = PLACES.map(p => {
    const v = toVec(p.lat, p.lon, R * 1.01);
    const ring = new THREE.Mesh(new THREE.RingGeometry(.05, .075, 32), new THREE.MeshBasicMaterial({ color: p.home ? 0xf6d77c : 0xffffff, side: THREE.DoubleSide, transparent: true }));
    ring.position.copy(v); ring.lookAt(v.clone().multiplyScalar(2)); scene.add(ring);
    const dot = new THREE.Mesh(new THREE.CircleGeometry(.032, 24), new THREE.MeshBasicMaterial({ color: p.home ? 0xf6d77c : 0xffffff, side: THREE.DoubleSide }));
    dot.position.copy(v); dot.lookAt(v.clone().multiplyScalar(2)); scene.add(dot);
    const el = document.createElement('span'); el.className = 'g-label' + (p.home ? ' home' : ''); el.textContent = p.name; labelsEl.append(el);
    return { v, ring, el, dx: p.dx, dy: p.dy };
  });

  const size = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
  };
  size(); addEventListener('resize', size);

  let visible = false, started = 0;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !started) started = performance.now(); }, { threshold: .15 }).observe(canvas);

  const tmp = new THREE.Vector3(), camDir = new THREE.Vector3();
  renderer.setAnimationLoop(now => {
    if (!visible) return;
    controls.update();
    const t = (now - started) / 1000;
    routes.forEach(r => {
      const p = reduced ? 1 : Math.min(1, Math.max(0, (t - r.delay) / 1.6));
      r.geo.setDrawRange(0, Math.floor(r.total * p / 3) * 3);
      const q = ((t - r.delay) * .35) % 1;
      r.pulse.visible = p >= 1; r.pulse.position.copy(r.curve.getPoint(q < 0 ? 0 : q));
    });
    camDir.copy(camera.position).normalize();
    const w = canvas.clientWidth, h = canvas.clientHeight;
    markers.forEach((m, i) => {
      const s = 1 + ((t * .8 + i * .3) % 1) * 1.6; m.ring.scale.setScalar(s); m.ring.material.opacity = 1 - ((t * .8 + i * .3) % 1);
      const facing = m.v.clone().normalize().dot(camDir);
      tmp.copy(m.v).project(camera);
      m.el.style.transform = `translate(${(tmp.x * .5 + .5) * w + m.dx}px, ${(-tmp.y * .5 + .5) * h + m.dy}px)${m.dx < 0 ? ' translateX(-100%)' : ''}`;
      m.el.style.opacity = facing > .15 ? 1 : 0;
    });
    renderer.render(scene, camera);
  });
}

init();
