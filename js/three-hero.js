/* ════════════════════════════════════════════════════
   3D HERO SCENE — rotating glowing wireframe core + particles
   Pure Three.js, no postprocessing, kept light for mobile.
   Fails silently if Three.js CDN didn't load — hero still
   works fine with just the CSS gradient background.
════════════════════════════════════════════════════ */
(function () {
  if (typeof THREE === 'undefined') return;          // CDN failed — graceful no-op
  const container = document.getElementById('site3dBg');
  if (!container) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const isSmallScreen = window.innerWidth < 700;

  // ── Scene / camera / renderer ──
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 6;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch (e) { return; }                              // WebGL unavailable — bail out cleanly

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // ── Core wireframe object (icosahedron) ──
  const coreGroup = new THREE.Group();

  const coreGeo = new THREE.IcosahedronGeometry(1.5, 1);
  const coreEdges = new THREE.EdgesGeometry(coreGeo);
  const coreMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.5 });   // dimmer — sits behind real content now
  const coreLines = new THREE.LineSegments(coreEdges, coreMat);
  coreGroup.add(coreLines);

  // Soft glow halo — larger, very transparent duplicate
  const haloGeo = new THREE.IcosahedronGeometry(1.7, 1);
  const haloEdges = new THREE.EdgesGeometry(haloGeo);
  const haloMat = new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.1 });
  const haloLines = new THREE.LineSegments(haloEdges, haloMat);
  coreGroup.add(haloLines);

  // Faint inner solid fill for depth (additive glow tint)
  const fillMat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6, transparent: true, opacity: 0.05,
    blending: THREE.AdditiveBlending, side: THREE.DoubleSide
  });
  const fillMesh = new THREE.Mesh(coreGeo, fillMat);
  coreGroup.add(fillMesh);

  scene.add(coreGroup);

  // ── Particle field (data-network feel) ──
  const PARTICLE_COUNT = isSmallScreen ? 130 : 260;   // trimmed for smoother scroll performance
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors    = new Float32Array(PARTICLE_COUNT * 3);
  const cyan   = new THREE.Color(0x22d3ee);
  const violet = new THREE.Color(0x8b5cf6);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const r = 3.2 + Math.random() * 4.2;
    const theta = Math.random() * Math.PI * 2;
    const phi   = Math.acos((Math.random() * 2) - 1);
    positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);

    const c = Math.random() > 0.5 ? cyan : violet;
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }

  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.04, vertexColors: true, transparent: true, opacity: 0.55,
    sizeAttenuation: true
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // ── Mouse parallax target (desktop only) ──
  let targetX = 0, targetY = 0;
  if (isFinePointer && !reduceMotion) {
    document.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    });
  }

  // ── Resize handling ──
  function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // ── Animation loop ──
  const rotSpeed = reduceMotion ? 0 : 1;
  function animate() {
    requestAnimationFrame(animate);

    coreGroup.rotation.y += 0.0028 * rotSpeed;
    coreGroup.rotation.x += 0.0009 * rotSpeed;
    particles.rotation.y -= 0.0008 * rotSpeed;
    particles.rotation.x += 0.0003 * rotSpeed;

    // Smooth mouse-follow easing
    camera.position.x += (targetX - camera.position.x) * 0.04;
    camera.position.y += (-targetY - camera.position.y) * 0.04;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }
  animate();
})();
