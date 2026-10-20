/**
 * Three.js 기반 히어로 섹션 3D 데이터 네트워크 애니메이션
 * 남양주시의 디지털 산업 생태계, 데이터 노드 간 연결, 역동적인 미래 성장을 시각화합니다.
 */

(function () {
  const container = document.getElementById("threejs-container");
  if (!container) return;

  let scene, camera, renderer;
  let coreMesh, wireMesh, innerGlowMesh;
  let particlesMesh;
  let orbitingGroup;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let windowHalfX = container.clientWidth / 2;
  let windowHalfY = container.clientHeight / 2;
  let clock = new THREE.Clock();

  function initThree() {
    // 1. Scene 생성
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0e17, 0.0018);

    // 2. Camera 생성
    camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      1,
      2000
    );
    camera.position.z = 700;
    camera.position.y = 50;

    // 3. Renderer 생성
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // 4. 라이팅 (조명)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x10b981, 3, 1200);
    pointLight1.position.set(200, 250, 300);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x06b6d4, 2.5, 1200);
    pointLight2.position.set(-250, -150, 200);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x6366f1, 2, 800);
    pointLight3.position.set(0, -300, -100);
    scene.add(pointLight3);

    // 5. 중심 허브 (남양주 디지털 산업 코어: Icosahedron Wireframe & Glowing Sphere)
    const coreGroup = new THREE.Group();

    // 외부 와이어프레임
    const icosaGeometry = new THREE.IcosahedronGeometry(130, 2);
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    wireMesh = new THREE.Mesh(icosaGeometry, wireMaterial);
    coreGroup.add(wireMesh);

    // 반투명 코어 구체
    const innerGeometry = new THREE.SphereGeometry(85, 32, 32);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x059669,
      emissive: 0x047857,
      emissiveIntensity: 0.5,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75,
    });
    innerGlowMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    coreGroup.add(innerGlowMesh);

    // 가장 깊은 코어 발광체
    const coreLightGeometry = new THREE.SphereGeometry(40, 16, 16);
    const coreLightMaterial = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.9,
    });
    coreMesh = new THREE.Mesh(coreLightGeometry, coreLightMaterial);
    coreGroup.add(coreMesh);

    scene.add(coreGroup);

    // 6. 주변을 공전하는 5개 위성 데이터 노드 (경기 5대 시군 및 성장축 모티프)
    orbitingGroup = new THREE.Group();
    const satelliteCount = 5;
    const colors = [0x10b981, 0x06b6d4, 0x3b82f6, 0xa855f7, 0xf59e0b];
    const distances = [220, 270, 310, 350, 390];

    for (let i = 0; i < satelliteCount; i++) {
      const nodeMesh = new THREE.Mesh(
        new THREE.OctahedronGeometry(12 + (i % 3) * 3),
        new THREE.MeshStandardMaterial({
          color: colors[i],
          emissive: colors[i],
          emissiveIntensity: 0.6,
          roughness: 0.1,
          metalness: 0.9,
        })
      );
      const angle = (i / satelliteCount) * Math.PI * 2;
      nodeMesh.position.set(
        Math.cos(angle) * distances[i],
        (Math.random() - 0.5) * 80,
        Math.sin(angle) * distances[i]
      );
      nodeMesh.userData = {
        speed: 0.005 + (i * 0.002),
        radius: distances[i],
        angle: angle,
        elevationSpeed: 0.01 + Math.random() * 0.01,
        elevationBase: nodeMesh.position.y
      };
      orbitingGroup.add(nodeMesh);
    }
    scene.add(orbitingGroup);

    // 7. 부유하는 3D 파티클 필드 (별자리 & 데이터 생태계)
    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1600;
      positions[i + 1] = (Math.random() - 0.5) * 900;
      positions[i + 2] = (Math.random() - 0.5) * 1200;
      scales[i / 3] = Math.random() * 2.5 + 1;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    // 점 입자 셰이더 혹은 기본 포인트
    const particleMat = new THREE.PointsMaterial({
      color: 0x6ee7b7,
      size: 3.5,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    particlesMesh = new THREE.Points(particleGeo, particleMat);
    scene.add(particlesMesh);

    // 8. 노드 간 가상 데이터 연결선 (Constellation Network)
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];
    const lineRadius = 450;
    for (let i = 0; i < 40; i++) {
      const x1 = (Math.random() - 0.5) * lineRadius;
      const y1 = (Math.random() - 0.5) * lineRadius * 0.6;
      const z1 = (Math.random() - 0.5) * lineRadius;
      const x2 = x1 + (Math.random() - 0.5) * 180;
      const y2 = y1 + (Math.random() - 0.5) * 180;
      const z2 = z1 + (Math.random() - 0.5) * 180;
      linePositions.push(x1, y1, z1, x2, y2, z2);
    }
    lineGeo.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.18,
    });
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(networkLines);

    // 이벤트 리스너 등록
    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", onMouseMove);
  }

  function onWindowResize() {
    if (!container) return;
    windowHalfX = container.clientWidth / 2;
    windowHalfY = container.clientHeight / 2;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }

  function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) * 0.35;
    mouseY = (event.clientY - windowHalfY) * 0.35;
  }

  // 애니메이션 루프
  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // 1. 코어 메쉬 회전 및 호흡 효과
    if (wireMesh) {
      wireMesh.rotation.x = elapsedTime * 0.15;
      wireMesh.rotation.y = elapsedTime * 0.2;
    }
    if (innerGlowMesh) {
      innerGlowMesh.rotation.y = -elapsedTime * 0.12;
      const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
      innerGlowMesh.scale.set(scale, scale, scale);
    }
    if (coreMesh) {
      const coreScale = 1 + Math.cos(elapsedTime * 2.5) * 0.08;
      coreMesh.scale.set(coreScale, coreScale, coreScale);
    }

    // 2. 위성 노드 공전 및 자체 자전
    if (orbitingGroup) {
      orbitingGroup.children.forEach((child) => {
        child.userData.angle += child.userData.speed;
        child.position.x = Math.cos(child.userData.angle) * child.userData.radius;
        child.position.z = Math.sin(child.userData.angle) * child.userData.radius;
        child.position.y = child.userData.elevationBase + Math.sin(elapsedTime * 2 + child.userData.radius) * 20;
        child.rotation.x += 0.02;
        child.rotation.y += 0.03;
      });
    }

    // 3. 파티클 유기적 부유 회전
    if (particlesMesh) {
      particlesMesh.rotation.y = elapsedTime * 0.03;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;
    }

    // 4. 마우스 인터랙션 Parallax 부드러운 감속 추종
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    camera.position.x = targetX;
    camera.position.y = 50 - targetY;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
  }

  // DOM 로드 완료 후 실행
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      initThree();
      animate();
    });
  } else {
    initThree();
    animate();
  }
})();
