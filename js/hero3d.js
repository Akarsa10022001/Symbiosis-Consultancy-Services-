// The Instagram logo (mortarboard over a gold "S" over an open book) rebuilt as real 3D geometry,
// plus floating motifs taken from the course posters: a pill capsule, a gear, a rupee coin and a DNA helix.
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const NAVY = 0x0b1f4d, GOLD = 0xe2ad3c, CREAM = 0xf7f1e3;

export const mats = {
  navy: () => new THREE.MeshPhysicalMaterial({ color: NAVY, roughness: .55, metalness: .05, clearcoat: .6, clearcoatRoughness: .4, sheen: .35, sheenColor: new THREE.Color(0x3d66b8), sheenRoughness: .6 }),
  gold: () => new THREE.MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: .22 }),
  paper: () => new THREE.MeshStandardMaterial({ color: CREAM, roughness: .8 }),
};

export function makeCap(m = { navy: mats.navy(), gold: mats.gold() }) {
  const g = new THREE.Group();
  const board = new THREE.Mesh(new RoundedBoxGeometry(3, .12, 3, 4, .04), m.navy);
  g.add(board);
  const skull = new THREE.Mesh(new THREE.CylinderGeometry(1.08, 1.2, .95, 64, 1, true), m.navy);
  skull.material.side = THREE.DoubleSide; skull.position.y = -.5; skull.scale.z = .86; g.add(skull);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.2, .045, 12, 64), m.navy);
  rim.rotation.x = Math.PI / 2; rim.position.y = -.97; rim.scale.y = .86; g.add(rim);
  const button = new THREE.Mesh(new THREE.CylinderGeometry(.13, .13, .07, 24), m.gold);
  button.position.y = .1; g.add(button);
  // cord runs to a corner then hangs, ending in a tassel
  const cord = new THREE.CatmullRomCurve3([new THREE.Vector3(0, .1, 0), new THREE.Vector3(.8, .1, .8), new THREE.Vector3(1.42, .07, 1.42), new THREE.Vector3(1.5, -.3, 1.5), new THREE.Vector3(1.5, -.75, 1.5)]);
  g.add(new THREE.Mesh(new THREE.TubeGeometry(cord, 60, .028, 8), m.gold));
  const bead = new THREE.Mesh(new THREE.SphereGeometry(.08, 16, 16), m.gold);
  bead.position.set(1.5, -.78, 1.5); g.add(bead);
  const tassel = new THREE.Group();
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2, r = .03 + Math.random() * .05;
    const s = new THREE.Mesh(new THREE.CylinderGeometry(.012, .012, .55 + Math.random() * .12, 4), m.gold);
    s.position.set(Math.cos(a) * r, -.3, Math.sin(a) * r); s.rotation.z = Math.cos(a) * .12; s.rotation.x = Math.sin(a) * .12;
    tassel.add(s);
  }
  tassel.position.set(1.5, -.8, 1.5); g.add(tassel);
  g.userData.tassel = tassel;
  return g;
}

function makeBook(m) {
  const g = new THREE.Group();
  // side profile of one half of an open book: spine at x=0, pages curving up then flattening
  const half = (thick, lift, w) => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(w * .25, lift * 1.2, w * .6, lift, w, lift * .8);
    s.lineTo(w, lift * .8 - thick);
    s.bezierCurveTo(w * .6, lift - thick, w * .25, lift * 1.2 - thick, 0, -thick * .5);
    s.closePath();
    return s;
  };
  const depth = 2.5;
  const ext = { depth, bevelEnabled: true, bevelSize: .015, bevelThickness: .015, bevelSegments: 2, curveSegments: 40 };
  for (const side of [1, -1]) {
    const pages = new THREE.Mesh(new THREE.ExtrudeGeometry(half(.26, .5, 2.2), ext), m.paper);
    const cover = new THREE.Mesh(new THREE.ExtrudeGeometry(half(.06, .5, 2.34), { ...ext, depth: depth + .16 }), m.navy);
    cover.position.set(0, -.27, -.08);
    const goldEdge = new THREE.Mesh(new THREE.BoxGeometry(.02, .22, depth), m.gold);
    goldEdge.position.set(2.2, .3, depth / 2);
    const hs = new THREE.Group(); hs.add(pages, cover, goldEdge);
    hs.scale.x = side; g.add(hs);
    // printed lines on the page surface
    for (let i = 0; i < 6; i++) {
      const line = new THREE.Mesh(new THREE.PlaneGeometry(1.2, .025), new THREE.MeshBasicMaterial({ color: 0x9fb2d4 }));
      const x = .6 + .65; line.position.set(side * x, .53, .45 + i * .3); line.rotation.x = -Math.PI / 2; line.rotation.z = side * -.06;
      g.add(line);
    }
  }
  // ribbon bookmark
  const rib = new THREE.Mesh(new THREE.PlaneGeometry(.14, 1.2), new THREE.MeshStandardMaterial({ color: GOLD, metalness: .6, roughness: .35, side: THREE.DoubleSide }));
  rib.position.set(.05, -.2, depth + .35); rib.rotation.x = .5; g.add(rib);
  g.position.z = -depth / 2;
  const wrap = new THREE.Group(); wrap.add(g);
  return wrap;
}

function makeCapsule() {
  const geo = new THREE.CapsuleGeometry(.22, .5, 12, 24);
  const pos = geo.attributes.position, col = [];
  const a = new THREE.Color(0xffffff), b = new THREE.Color(0x2a73d9);
  for (let i = 0; i < pos.count; i++) { const c = pos.getY(i) > 0 ? a : b; col.push(c.r, c.g, c.b); }
  geo.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  return new THREE.Mesh(geo, new THREE.MeshPhysicalMaterial({ vertexColors: true, roughness: .25, clearcoat: 1 }));
}

function makeGear(mat) {
  const s = new THREE.Shape(), teeth = 10, R = .5, r = .4;
  for (let i = 0; i < teeth * 2; i++) {
    const a0 = (i / (teeth * 2)) * Math.PI * 2, a1 = ((i + 1) / (teeth * 2)) * Math.PI * 2, rad = i % 2 ? r : R;
    const p0 = [Math.cos(a0) * rad, Math.sin(a0) * rad], p1 = [Math.cos(a1) * rad, Math.sin(a1) * rad];
    i === 0 ? s.moveTo(...p0) : s.lineTo(...p0); s.lineTo(...p1);
  }
  const hole = new THREE.Path(); hole.absarc(0, 0, .16, 0, Math.PI * 2, true); s.holes.push(hole);
  const geo = new THREE.ExtrudeGeometry(s, { depth: .16, bevelEnabled: true, bevelSize: .02, bevelThickness: .02, bevelSegments: 2 });
  geo.center();
  return new THREE.Mesh(geo, mat);
}

function makeCoin(gold) {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d');
  const grd = x.createRadialGradient(100, 90, 20, 128, 128, 128); grd.addColorStop(0, '#fbe39a'); grd.addColorStop(1, '#c48a1a');
  x.fillStyle = grd; x.fillRect(0, 0, 256, 256);
  x.strokeStyle = 'rgba(120,80,10,.6)'; x.lineWidth = 8; x.beginPath(); x.arc(128, 128, 108, 0, Math.PI * 2); x.stroke();
  x.fillStyle = '#7a520c'; x.font = 'bold 150px Figtree, Arial'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('₹', 128, 136);
  const face = new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(c), metalness: .7, roughness: .3 });
  face.map.colorSpace = THREE.SRGBColorSpace;
  return new THREE.Mesh(new THREE.CylinderGeometry(.42, .42, .08, 48), [gold, face, face]);
}

function makeHelix(gold) {
  const g = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xdfe9fb, roughness: .3, metalness: .2 });
  const sph = new THREE.SphereGeometry(.07, 12, 12);
  for (let i = 0; i < 14; i++) {
    const t = i / 13, a = t * Math.PI * 3, y = (t - .5) * 1.8;
    const p1 = new THREE.Vector3(Math.cos(a) * .3, y, Math.sin(a) * .3), p2 = p1.clone().multiply(new THREE.Vector3(-1, 1, -1));
    const s1 = new THREE.Mesh(sph, gold); s1.position.copy(p1);
    const s2 = new THREE.Mesh(sph, white); s2.position.copy(p2);
    const bar = new THREE.Mesh(new THREE.CylinderGeometry(.015, .015, .6, 6), white);
    bar.position.set(0, y, 0); bar.lookAt(p1.x, y, p1.z); bar.rotateX(Math.PI / 2);
    g.add(s1, s2, bar);
  }
  return g;
}

function dust(count, spread, color = 0xf6d77c) {
  const geo = new THREE.BufferGeometry(), p = new Float32Array(count * 3), sp = new Float32Array(count);
  for (let i = 0; i < count; i++) { p[i * 3] = (Math.random() - .5) * spread; p[i * 3 + 1] = (Math.random() - .5) * spread * .6; p[i * 3 + 2] = (Math.random() - .5) * 6 - 1; sp[i] = .2 + Math.random(); }
  geo.setAttribute('position', new THREE.BufferAttribute(p, 3)); geo.userData.speed = sp;
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  return new THREE.Points(geo, new THREE.PointsMaterial({ color, size: .07, map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .85 }));
}

function baseRenderer(canvas) {
  const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  r.setPixelRatio(Math.min(devicePixelRatio, 2));
  r.toneMapping = THREE.ACESFilmicToneMapping; r.toneMappingExposure = 1.05;
  return r;
}

function lights(scene, renderer) {
  const pm = new THREE.PMREMGenerator(renderer);
  scene.environment = pm.fromScene(new RoomEnvironment(), .04).texture;
  const key = new THREE.DirectionalLight(0xffe3a8, 2.2); key.position.set(4, 6, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(0x5b8cff, 2.4); rim.position.set(-6, 2, -4); scene.add(rim);
  scene.add(new THREE.AmbientLight(0x6f8ccc, .5));
}

function whenVisible(el, cb) {
  let vis = true;
  new IntersectionObserver(([e]) => { vis = e.isIntersecting; cb(vis); }, { rootMargin: '100px' }).observe(el);
  return () => vis;
}

/* ================================================================== HERO — floating motifs over the photo */
function hero() {
  const canvas = document.getElementById('hero3d');
  if (!canvas) return;
  const renderer = baseRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
  camera.position.set(0, 0, 14);
  lights(scene, renderer);
  const gold = mats.gold();
  const sats = [
    { o: makeCapsule(), p: [.9, .78], z: .5, s: 1 },
    { o: makeCoin(gold), p: [.93, .22], z: .4, s: .95 },
  ];
  sats.forEach((s, i) => { s.phase = i * 1.7; scene.add(s.o); });
  const motes = dust(360, 24); scene.add(motes);

  let halfW = 1, halfH = 1;
  const layout = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
    halfH = Math.tan(THREE.MathUtils.degToRad(17.5)) * 14; halfW = halfH * camera.aspect;
    const narrow = w < 900;
    sats.forEach(s => {
      // place by fraction of the viewport; on narrow screens keep them at the edges, away from the copy
      const fx = narrow ? (s.p[0] > .7 ? .9 : .78) : s.p[0], fy = narrow ? s.p[1] * .5 + .02 : s.p[1];
      s.base = new THREE.Vector3((fx * 2 - 1) * halfW, (fy * 2 - 1) * halfH, s.z);
      s.o.scale.setScalar(s.s * (narrow ? .7 : 1));
    });
  };
  layout(); addEventListener('resize', layout);

  const mouse = new THREE.Vector2(), target = new THREE.Vector2();
  addEventListener('pointermove', e => target.set(e.clientX / innerWidth - .5, e.clientY / innerHeight - .5));
  let scrollP = 0;
  addEventListener('scroll', () => scrollP = Math.min(1.5, scrollY / innerHeight), { passive: true });
  let intro = reduced ? 1 : 0;
  if (window.gsap && !reduced) gsap.to({}, { duration: 2.2, ease: 'expo.out', delay: .4, onUpdate() { intro = this.progress(); } });
  const isVisible = whenVisible(canvas, () => {});
  const clock = new THREE.Clock();
  window.dispatchEvent(new Event('hero3d:ready'));

  renderer.setAnimationLoop(() => {
    if (!isVisible()) return;
    const t = clock.getElapsedTime(), e = 1 - Math.pow(1 - intro, 3);
    mouse.lerp(target, .05);
    sats.forEach((s, i) => {
      s.o.position.set(s.base.x + mouse.x * (i % 2 ? .8 : -.8) + (1 - e) * 4, s.base.y + Math.sin(t * .9 + s.phase) * .25 + scrollP * (i % 2 ? 2 : -1.5), s.base.z);
      s.o.rotation.x = t * .4 + s.phase; s.o.rotation.y = t * .6 + s.phase;
    });
    const pos = motes.geometry.attributes.position, sp = motes.geometry.userData.speed;
    for (let i = 0; i < pos.count; i++) { let y = pos.getY(i) + sp[i] * .004; if (y > 7) y = -7; pos.setY(i, y); }
    pos.needsUpdate = true;
    motes.rotation.y = mouse.x * .1;
    renderer.render(scene, camera);
  });
}

/* ================================================================== BRAND — the logo in 3D, tossed as you scroll */
async function brand() {
  const canvas = document.getElementById('brand3d');
  if (!canvas) return;
  const renderer = baseRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 100);
  camera.position.set(0, 0, 15);
  lights(scene, renderer);
  const m = { navy: mats.navy(), gold: mats.gold(), paper: mats.paper() };
  const logo = new THREE.Group(); scene.add(logo);
  const cap = makeCap(m); cap.position.y = 2.25; cap.rotation.set(.32, -.6, -.08); cap.scale.setScalar(.9); logo.add(cap);
  const book = makeBook(m); book.position.y = -2.05; book.rotation.set(.55, .25, 0); book.scale.setScalar(.9); logo.add(book);
  const sHolder = new THREE.Group(); sHolder.position.y = .15; logo.add(sHolder);
  try {
    const font = await new FontLoader().loadAsync('https://cdn.jsdelivr.net/npm/three@0.169.0/examples/fonts/gentilis_bold.typeface.json');
    const geo = new TextGeometry('S', { font, size: 2.6, depth: .5, curveSegments: 18, bevelEnabled: true, bevelThickness: .08, bevelSize: .05, bevelSegments: 5 });
    geo.center(); sHolder.add(new THREE.Mesh(geo, m.gold));
  } catch {
    const curve = new THREE.CatmullRomCurve3([[.9, 1], [0, 1.3], [-.9, .7], [0, 0], [.9, -.7], [0, -1.3], [-.9, -1]].map(([x, y]) => new THREE.Vector3(x, y, 0)));
    sHolder.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 80, .26, 16), m.gold));
  }
  const halo = new THREE.Mesh(new THREE.TorusGeometry(3.3, .012, 8, 160), new THREE.MeshBasicMaterial({ color: 0xf6d77c, transparent: true, opacity: .35 }));
  halo.rotation.x = 1.2; logo.add(halo);
  const halo2 = halo.clone(); halo2.scale.setScalar(1.18); halo2.rotation.set(1.35, .4, 0); halo2.material = halo.material.clone(); halo2.material.opacity = .18; logo.add(halo2);
  scene.add(dust(200, 14));
  const orbiters = [makeGear(new THREE.MeshStandardMaterial({ color: 0xb9c7e3, metalness: 1, roughness: .28 })), makeHelix(m.gold)];
  orbiters.forEach(o => { o.scale.setScalar(.85); logo.add(o); });

  const size = () => { const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); logo.scale.setScalar(Math.min(1, w / h)); };
  size(); addEventListener('resize', size);
  const mouse = new THREE.Vector2(), target = new THREE.Vector2();
  canvas.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); target.set((e.clientX - r.left) / r.width - .5, (e.clientY - r.top) / r.height - .5); });
  canvas.addEventListener('pointerleave', () => target.set(0, 0));
  const isVisible = whenVisible(canvas, () => {});
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    if (!isVisible()) return;
    const t = clock.getElapsedTime();
    const r = canvas.getBoundingClientRect();
    const p = THREE.MathUtils.clamp(1 - (r.top + r.height / 2) / innerHeight, 0, 1); // 0 entering, .5 centred, 1 leaving
    mouse.lerp(target, .06);
    logo.rotation.y = Math.sin(t * .35) * .25 + mouse.x * .8 + (p - .5) * 1.2;
    logo.rotation.x = mouse.y * .3;
    sHolder.rotation.y = Math.sin(t * .6) * .35 + (p - .5) * 3;
    const toss = Math.max(0, p - .55) * 2.2;
    cap.position.y = 2.25 + Math.sin(t * 1.1) * .08 + toss * 3;
    cap.rotation.x = .32 + toss * 2; cap.rotation.y = -.6 + Math.sin(t * .5) * .1 + toss * 3;
    cap.userData.tassel.rotation.z = Math.sin(t * 2.2) * .12;
    book.position.y = -2.05 + Math.sin(t * 1.1 + 1) * .06;
    halo.rotation.z = t * .15; halo2.rotation.z = -t * .1;
    orbiters.forEach((o, i) => {
      const a = t * .35 + i * Math.PI;
      o.position.set(Math.cos(a) * 3.6, Math.sin(a) * .9 + (i ? -.6 : .6), Math.sin(a) * 1.6);
      o.rotation.x = t * .5 + i; o.rotation.y = t * .7;
    });
    renderer.render(scene, camera);
  });
}

/* ================================================================== FINAL CTA — caps tossed in the air */
function finalCaps() {
  const canvas = document.getElementById('finalCaps');
  if (!canvas) return;
  const renderer = baseRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, .1, 100); camera.position.z = 16;
  lights(scene, renderer);
  const m = { navy: mats.navy(), gold: mats.gold() };
  const caps = [];
  const N = 14;
  const spawn = (c, first) => {
    c.userData.v = new THREE.Vector3((Math.random() - .5) * .03, .11 + Math.random() * .06, 0);
    c.userData.spin = new THREE.Vector3((Math.random() - .5) * .05, (Math.random() - .5) * .06, (Math.random() - .5) * .05);
    c.position.set((Math.random() - .5) * 22, first ? (Math.random() - .5) * 14 : -9 - Math.random() * 4, -Math.random() * 8);
  };
  for (let i = 0; i < N; i++) { const c = makeCap(m); c.scale.setScalar(.5 + Math.random() * .35); spawn(c, true); scene.add(c); caps.push(c); }
  scene.add(dust(260, 26));
  const size = () => { const w = canvas.clientWidth, h = canvas.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); };
  size(); addEventListener('resize', size);
  const isVisible = whenVisible(canvas, () => {});
  renderer.setAnimationLoop(() => {
    if (!isVisible()) return;
    caps.forEach(c => {
      if (!reduced) {
        c.userData.v.y -= .0011; // gravity: rise, slow, fall
        c.position.add(c.userData.v);
        c.rotation.x += c.userData.spin.x; c.rotation.y += c.userData.spin.y; c.rotation.z += c.userData.spin.z;
      }
      if (c.position.y < -11) spawn(c, false);
    });
    renderer.render(scene, camera);
  });
}

try { hero(); } catch (err) { console.error(err); window.dispatchEvent(new Event('hero3d:ready')); }
brand().catch(console.error);
finalCaps();
