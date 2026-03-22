function setPlanets(planetName, planetContainerColor) {
  const allPlanetsContainer = document.querySelector(".all-planets-container");

  const planetContainerElement = document.createElement("div");
  planetContainerElement.className = "planet-container";

  const planetNameElement = document.createElement("span");
  planetNameElement.className = "planet-name";
  planetNameElement.innerHTML = planetName;

  planetContainerElement.appendChild(planetNameElement);
  allPlanetsContainer.appendChild(planetContainerElement);

  // create the main scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(planetContainerColor);

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    planetContainerElement.clientWidth / planetContainerElement.clientHeight,
    0.1,
    1000,
  );
  camera.position.z = 3; // move the camera back so we can see the scene

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(
    planetContainerElement.clientWidth,
    planetContainerElement.clientHeight,
  );
  renderer.setPixelRatio(window.devicePixelRatio);
  planetContainerElement.appendChild(renderer.domElement);

  // create the planet (Geometry + Material = Mesh)

  const geometry = new THREE.SphereGeometry(1.2, 128 * 2, 128 * 2);

  const textureLoader = new THREE.TextureLoader();
  const planetTexture = textureLoader.load(
    `planets-images/${planetName}/map.jpg`,
  );
  const planetBumpTexture = textureLoader.load(
    `planets-images/${planetName}/bump.jpg`,
  );
  const material = new THREE.MeshStandardMaterial({
    map: planetTexture,
    bumpMap: planetBumpTexture,
    bumpScale: 0.05,
    roughness: 0.7,
    metalness: 0.1,
  });
  const planet = new THREE.Mesh(geometry, material);
  scene.add(planet);

  // Light
  const light = new THREE.DirectionalLight(0xffffff, 4);
  light.position.set(5, 2, 5).normalize();
  scene.add(light);

  const ambinentLight = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(ambinentLight);

  // Animation loop

  function animate() {
    requestAnimationFrame(animate);

    planet.rotation.y += 0.01; // rotate the ball around the y-axis
    renderer.render(scene, camera);
  }
  window.addEventListener("load", () => {
    animate();
  });

  window.addEventListener("resize", OnWindowResize, false);
  function OnWindowResize() {
    camera.aspect = planetContainerElement.clientWidth / planetContainerElement.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(planeContainerElement.clientWidth, planeContainerElement.clientHeight);
  }
}

//const planets(planetsSet[],)
setPlanets("Earth", "#c9d5e0");

