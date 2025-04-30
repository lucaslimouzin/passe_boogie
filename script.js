// Animation Three.js
let scene, camera, renderer, particles;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-container').appendChild(renderer.domElement);

    // Création des particules en forme de brins de muguet
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    const sizes = [];

    // Couleurs pour les brins de muguet
    const green = new THREE.Color(0x4CAF50); // Vert pour la tige
    const white = new THREE.Color(0xFFFFFF); // Blanc pour les clochettes

    for (let i = 0; i < 1000; i++) {
        // Position aléatoire dans l'espace
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;

        // Création d'un brin de muguet (tige + clochettes)
        const stemLength = Math.random() * 2 + 1;
        const numBells = Math.floor(Math.random() * 3) + 3;

        // Tige
        for (let j = 0; j < stemLength * 10; j++) {
            vertices.push(x, y - j * 0.1, z);
            colors.push(green.r, green.g, green.b);
            sizes.push(0.5);
        }

        // Clochettes
        for (let j = 0; j < numBells; j++) {
            const bellX = x + (Math.random() - 0.5) * 0.5;
            const bellY = y - stemLength + j * 0.3;
            const bellZ = z + (Math.random() - 0.5) * 0.5;
            
            vertices.push(bellX, bellY, bellZ);
            colors.push(white.r, white.g, white.b);
            sizes.push(1.5);
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Position de la caméra
    camera.position.z = 1000;

    // Ajout d'une lumière ambiante
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Ajout d'une lumière directionnelle pour créer des ombres
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Gestion du redimensionnement
    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotation lente des particules
    particles.rotation.x += 0.0002;
    particles.rotation.y += 0.0002;

    // Animation de flottement
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.05;
        positions[i + 1] += Math.cos(Date.now() * 0.001 + i) * 0.05;
    }
    particles.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

// Initialisation de l'animation
init();
animate();

// Gestion du formulaire
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('password').value.toLowerCase();
    const errorElement = document.getElementById('error');
    
    if (password === 'élise') {
        // Animation de transition avant la redirection
        const container = document.querySelector('.container');
        container.style.animation = 'fadeOut 0.5s ease-in-out forwards';
        setTimeout(() => {
            window.location.href = 'page_cachee.html';
        }, 500);
    } else {
        errorElement.textContent = 'Mot de passe incorrect';
        errorElement.style.display = 'block';
        // Animation de secousse pour le formulaire
        const form = document.getElementById('loginForm');
        form.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            form.style.animation = '';
        }, 500);
    }
});

document.getElementById('indiceBtn').addEventListener('click', function() {
    const indice = document.getElementById('indice');
    if (indice.style.display === 'none' || indice.style.display === '') {
        indice.style.display = 'block';
        this.textContent = 'Cacher l\'indice';
    } else {
        indice.style.display = 'none';
        this.textContent = 'Besoin d\'un indice ?';
    }
}); 