import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Polished underwater scene — v2.
 * Replaces clunky 3D fish with elegant flat-shaded silhouettes that
 * swim in coordinated schools, plus swaying seaweed silhouettes,
 * caustic shader, god-rays, and floating plankton.
 */
export function FishTank3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x031420, 0.05);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    /* ---------- Lights ---------- */
    scene.add(new THREE.AmbientLight(0x6fd0e0, 0.6));
    const sun = new THREE.DirectionalLight(0x9eecff, 1.2);
    sun.position.set(2, 12, 4);
    scene.add(sun);

    /* ---------- Fish: flat silhouette built from a Shape ---------- */
    function buildFishGeometry() {
      // Fish silhouette in side view, nose pointing +X
      const s = new THREE.Shape();
      s.moveTo(0.9, 0); // nose
      s.bezierCurveTo(0.7, 0.25, 0.2, 0.32, -0.4, 0.18); // top
      s.lineTo(-0.6, 0.42); // top of tail
      s.lineTo(-0.95, 0.15);
      s.lineTo(-0.95, -0.15);
      s.lineTo(-0.6, -0.42); // bottom of tail
      s.lineTo(-0.4, -0.18);
      s.bezierCurveTo(0.2, -0.32, 0.7, -0.25, 0.9, 0); // bottom
      return new THREE.ShapeGeometry(s);
    }
    const fishGeo = buildFishGeometry();

    type Fish = {
      mesh: THREE.Mesh;
      // school params
      schoolIdx: number;
      // local offsets within the school
      offset: THREE.Vector3;
      phase: number;
      scale: number;
    };

    type School = {
      // path params (figure-8-ish lemniscate)
      radiusX: number;
      radiusY: number;
      depth: number;
      speed: number;
      yOffset: number;
      direction: 1 | -1;
      color: number;
    };

    const schools: School[] = [
      { radiusX: 6, radiusY: 1.6, depth: -1, speed: 0.18, yOffset: 1.2, direction: 1, color: 0x7fe9ff },
      { radiusX: 5, radiusY: 1.2, depth: 1.5, speed: 0.22, yOffset: -1.5, direction: -1, color: 0xb5f0ff },
      { radiusX: 4.5, radiusY: 0.9, depth: -2.5, speed: 0.15, yOffset: 0.3, direction: 1, color: 0xffb38a },
    ];

    const fishes: Fish[] = [];
    schools.forEach((school, schoolIdx) => {
      const count = schoolIdx === 2 ? 5 : 8;
      const mat = new THREE.MeshBasicMaterial({
        color: school.color,
        transparent: true,
        opacity: 0.85,
        side: THREE.DoubleSide,
        depthWrite: false,
      });
      for (let i = 0; i < count; i++) {
        const mesh = new THREE.Mesh(fishGeo, mat);
        const scale = 0.28 + Math.random() * 0.22;
        mesh.scale.setScalar(scale);
        scene.add(mesh);
        fishes.push({
          mesh,
          schoolIdx,
          offset: new THREE.Vector3(
            (Math.random() - 0.5) * 1.6,
            (Math.random() - 0.5) * 0.8,
            (Math.random() - 0.5) * 1.2,
          ),
          phase: Math.random() * Math.PI * 2,
          scale,
        });
      }
    });

    /* ---------- Seaweed (swaying ribbons) ---------- */
    type Weed = {
      mesh: THREE.Mesh;
      basePositions: Float32Array;
      sway: number;
      phase: number;
    };
    const weeds: Weed[] = [];
    const weedMat = new THREE.MeshBasicMaterial({
      color: 0x0a4f6e,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    for (let i = 0; i < 9; i++) {
      const segments = 14;
      const heightW = 4 + Math.random() * 3;
      const widthW = 0.18 + Math.random() * 0.12;
      const geo = new THREE.PlaneGeometry(widthW, heightW, 1, segments);
      // Move pivot to the bottom
      geo.translate(0, heightW / 2, 0);
      const mesh = new THREE.Mesh(geo, weedMat);
      mesh.position.set(-9 + i * 2.4 + (Math.random() - 0.5) * 1.2, -5, -3 - Math.random() * 3);
      scene.add(mesh);
      const positions = (geo.attributes.position as THREE.BufferAttribute).array as Float32Array;
      weeds.push({
        mesh,
        basePositions: new Float32Array(positions),
        sway: 0.25 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
      });
    }

    /* ---------- God-rays ---------- */
    const rayGroup = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const rayGeo = new THREE.ConeGeometry(0.7 + Math.random() * 0.4, 18, 14, 1, true);
      const mat = new THREE.MeshBasicMaterial({
        color: 0x9eecff,
        transparent: true,
        opacity: 0.05 + Math.random() * 0.05,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      const ray = new THREE.Mesh(rayGeo, mat);
      ray.position.set(-5 + i * 2.5 + (Math.random() - 0.5), 8, -2 - Math.random() * 3);
      ray.rotation.z = (Math.random() - 0.5) * 0.25;
      rayGroup.add(ray);
    }
    scene.add(rayGroup);

    /* ---------- Caustic seabed ---------- */
    const causticUniforms = {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(0x3fd0d4) },
    };
    const causticMat = new THREE.ShaderMaterial({
      uniforms: causticUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        float caustic(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          float minDist = 1.0;
          for (int y = -1; y <= 1; y++) {
            for (int x = -1; x <= 1; x++) {
              vec2 g = vec2(float(x), float(y));
              vec2 o = vec2(
                fract(sin(dot(i + g, vec2(127.1, 311.7))) * 43758.5453),
                fract(sin(dot(i + g, vec2(269.5, 183.3))) * 43758.5453)
              );
              o = 0.5 + 0.5 * sin(uTime * 0.6 + 6.2831 * o);
              vec2 r = g + o - f;
              minDist = min(minDist, dot(r, r));
            }
          }
          return pow(1.0 - minDist, 6.0);
        }
        void main() {
          vec2 p = vUv * 8.0;
          float c = caustic(p) * 0.6 + caustic(p * 2.0 + 5.0) * 0.4;
          float vignette = smoothstep(0.7, 0.0, length(vUv - 0.5));
          gl_FragColor = vec4(uColor * c * 1.4, c * vignette * 0.5);
        }
      `,
    });
    const causticGeo = new THREE.PlaneGeometry(40, 40);
    const caustic = new THREE.Mesh(causticGeo, causticMat);
    caustic.rotation.x = -Math.PI / 2;
    caustic.position.y = -5;
    scene.add(caustic);

    /* ---------- Plankton ---------- */
    const particleCount = 250;
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      speeds[i] = 0.002 + Math.random() * 0.008;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xb8f0ff,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    /* ---------- Interaction ---------- */
    const mouse = { x: 0, y: 0 };
    const handleMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    mount.addEventListener("mousemove", handleMove);

    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    /* ---------- Animate ---------- */
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();
      causticUniforms.uTime.value = t;

      // Schools follow a smooth lemniscate path
      fishes.forEach((f, i) => {
        const school = schools[f.schoolIdx];
        const a = t * school.speed * school.direction + i * 0.04;

        // lemniscate of Gerono — natural "S" looping path
        const cx = (Math.sin(a) * school.radiusX);
        const cy = (Math.sin(a) * Math.cos(a) * school.radiusY) + school.yOffset;
        const cz = school.depth + Math.cos(a) * 0.8;

        // tangent for facing
        const da = 0.01;
        const nx = Math.sin(a + da) * school.radiusX;
        const ny = Math.sin(a + da) * Math.cos(a + da) * school.radiusY + school.yOffset;
        const nz = school.depth + Math.cos(a + da) * 0.8;

        const dx = nx - cx;
        const dy = ny - cy;

        // add per-fish offset for schooling spread + a tiny wiggle
        const wiggle = Math.sin(t * 4 + f.phase) * 0.08;
        f.mesh.position.set(
          cx + f.offset.x,
          cy + f.offset.y + wiggle,
          cz + f.offset.z,
        );

        // 2D facing — flip mesh based on travel direction
        const facingAngle = Math.atan2(dy, dx);
        f.mesh.rotation.z = facingAngle;
        // billboards always face camera plane: rotate Y so mesh stays readable
        f.mesh.rotation.y = dx < 0 ? Math.PI : 0;
        // slight body undulation
        f.mesh.scale.x = f.scale * (1 + Math.sin(t * 5 + f.phase) * 0.06);
      });

      // Seaweed sway (each vertex offset based on its height ratio)
      weeds.forEach((w) => {
        const pos = w.mesh.geometry.attributes.position as THREE.BufferAttribute;
        const arr = pos.array as Float32Array;
        for (let i = 0; i < arr.length; i += 3) {
          const baseY = w.basePositions[i + 1];
          const heightRatio = baseY / 5; // 0 at root, ~1 at tip
          arr[i] = w.basePositions[i] + Math.sin(t * w.sway + w.phase + heightRatio * 3) * heightRatio * 0.6;
        }
        pos.needsUpdate = true;
      });

      // Plankton drift
      const ppos = pGeo.attributes.position as THREE.BufferAttribute;
      const parr = ppos.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        parr[i * 3 + 1] += speeds[i];
        if (parr[i * 3 + 1] > 7) parr[i * 3 + 1] = -7;
        parr[i * 3] += Math.sin(t * 0.5 + i) * 0.001;
      }
      ppos.needsUpdate = true;

      // God-rays sway
      rayGroup.children.forEach((r, i) => {
        r.rotation.z = Math.sin(t * 0.25 + i) * 0.06;
        const m = (r as THREE.Mesh).material as THREE.MeshBasicMaterial;
        m.opacity = 0.05 + Math.sin(t * 0.5 + i * 1.7) * 0.03;
      });

      // Camera parallax + scroll dolly
      const scrollNorm = Math.min(scrollY / window.innerHeight, 1.5);
      camera.position.x += (mouse.x * 1.2 - camera.position.x) * 0.04;
      camera.position.y += (-mouse.y * 0.7 - scrollNorm * 0.5 - camera.position.y) * 0.04;
      camera.position.z += (10 + scrollNorm * 3 - camera.position.z) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      mount.removeEventListener("mousemove", handleMove);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      fishGeo.dispose();
      pGeo.dispose();
      pMat.dispose();
      causticGeo.dispose();
      causticMat.dispose();
      weedMat.dispose();
      weeds.forEach((w) => w.mesh.geometry.dispose());
      rayGroup.children.forEach((r) => {
        const mesh = r as THREE.Mesh;
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      fishes.forEach((f) => (f.mesh.material as THREE.Material).dispose());
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" />;
}
