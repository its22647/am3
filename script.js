// --- Three.js 3D Deep Love Scene Setup (UNCHANGED) ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('love-scene').appendChild(renderer.domElement);

// Screen resize handler (UNCHANGED)
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

scene.fog = new THREE.FogExp2(0x1a1a1a, 0.05);
const spotLight = new THREE.SpotLight(0xffffff, 50, 100, Math.PI / 4, 0.5, 2);
spotLight.position.set(0, 0, 10);
scene.add(spotLight);

// Creating the "Pulsating Heart Energy" (UNCHANGED)
const particleCount = 2000;
const radius = 5;
const geometry = new THREE.BufferGeometry();
const positions = [];
const colors = [];
const color = new THREE.Color(0x800000);

for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() - 0.5) * 2 * radius;
    const y = (Math.random() - 0.5) * 2 * radius;
    const z = (Math.random() - 0.5) * 2 * radius;

    if (x * x + y * y + z * z < radius * radius) {
        positions.push(x, y, z);
        color.set(0x800000); 
        color.offsetHSL(0.01 * Math.random(), -0.1 * Math.random(), 0.1 * Math.random());
        colors.push(color.r, color.g, color.b);
    }
}

geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
    size: 0.05,
    vertexColors: true,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.9
});

const loveOrb = new THREE.Points(geometry, material);
scene.add(loveOrb);

camera.position.z = 8;
let scaleFactor = 1.0; 
let scaleDirection = 0.0015;

// Animation variables for dynamic change (UNCHANGED)
let rotationSpeed = 0.001; 
let pulseMagnitude = 0.05; 

// Animation Loop: Smooth Heartbeat Motion (UNCHANGED)
function animate() {
    requestAnimationFrame(animate);

    loveOrb.rotation.x += rotationSpeed / 2;
    loveOrb.rotation.y += rotationSpeed;

    scaleFactor += scaleDirection;
    if (scaleFactor > 1 + pulseMagnitude || scaleFactor < 1 - pulseMagnitude) {
        scaleDirection = -scaleDirection; 
    }
    loveOrb.scale.set(scaleFactor, scaleFactor, scaleFactor);

    renderer.render(scene, camera);
}
animate();

// --- JavaScript Interactivity: Proposal Logic ---
// New Elements
const introScreen = document.getElementById('intro-screen');
const mainContent = document.getElementById('main-content');
const continueButton = document.getElementById('continue-btn');

// Existing Elements
const surpriseButton = document.getElementById('surprise-btn');
const initialMessage = document.getElementById('initial-msg');
const finalMessage = document.getElementById('final-msg');
const heading = document.getElementById('names'); 
const coupleNameBox = document.getElementById('couple-name-box'); 
const loveMessageContainer = document.querySelector('.love-message');
const buttonContainer = document.querySelector('.button-container');
const yesButton = document.getElementById('yes-btn');
const funnyButton = document.getElementById('funny-btn');

heading.style.visibility = 'hidden'; 

// --- NEW STEP 0: Handle Continue Button Click (Stylish Transition FIXED) ---
continueButton.addEventListener('click', () => {
    // 💖 NEW TRANSITION EFFECT: Zoom out current screen
    introScreen.style.animation = 'zoomOut 0.5s forwards';
    continueButton.disabled = true;

    setTimeout(() => {
        introScreen.style.display = 'none';
        
        // **💖 FIX HERE: Ensure main-content starts hidden and transparent 💖**
        mainContent.style.display = 'block';
        mainContent.style.opacity = '0';
        
        // Apply the zoom-in animation to reveal the content
        mainContent.style.animation = 'zoomIn 0.5s forwards';
        
    }, 500); // Wait for zoomOut animation to complete
});

// --- STEP 1: Reveal Proposal Message (Original First Click) ---
surpriseButton.addEventListener('click', () => {
    
    surpriseButton.disabled = true; 
    
    // Zoom out the current page content (smoother transition)
    // We apply zoomOut to the whole main-content div
    mainContent.style.animation = 'zoomOut 0.5s forwards';
    
    setTimeout(() => {
        // Clear main content animation and reset opacity for next steps
        mainContent.style.animation = 'none';
        mainContent.style.opacity = '1';
        
        // Hide initial message elements
        surpriseButton.style.display = 'none'; 
        initialMessage.style.display = 'none'; 
        
        // 💖 UPDATED TEXT FOR PAGE 2 💖
        finalMessage.innerHTML = `
            <span style="font-size: 0.9em; display: block; margin-bottom: 15px; font-style: italic;">
                From the moment I saw you, I felt something different.
            </span>
            <span style="font-size: 2.2em; font-weight: 900; color: #ff3333; display: block;">
                MINAHIL SAHIBA
            </span>
            <span class="animated-like-you" style="font-size: 1.6em; margin-top: 10px;">
                You truly inspire me — <br>and I admire you, a lot. 🌸
            </span>
            <span style="font-size: 1.4em; display: block; margin-top: 15px;">
                Can we stay connected… as good friends? 😊
            </span>
        `;
        finalMessage.style.color = 'white'; 
        
        // Show new content with zoom-in
        finalMessage.style.opacity = '0';
        finalMessage.style.display = 'block'; 
        finalMessage.style.animation = 'zoomIn 0.5s forwards'; 
        
        buttonContainer.style.display = 'flex';
        buttonContainer.style.opacity = '0';
        setTimeout(() => {
            buttonContainer.style.transition = 'opacity 1s ease';
            buttonContainer.style.opacity = '1';
        }, 800);
        
    }, 500); 
});

// --- STEP 2: Celebrate on the Same Screen (Stylish/Heart Animation) ---
const celebrateInPlace = () => {
    
    yesButton.disabled = true;
    funnyButton.disabled = true;
    
    // Hide current content with zoom-out
    finalMessage.style.animation = 'zoomOut 0.5s forwards';
    buttonContainer.style.opacity = '0';
    
    // 💖 HEART/AMAZING ANIMATION START (Three.js Visual Update) 💖
    rotationSpeed = 0.005; 
    pulseMagnitude = 0.15; 
    material.size = 0.1; 
    
    // Redden the particles for a more dramatic 'love' effect
    const redColor = new THREE.Color(0xff0000);
    const colorsArray = geometry.attributes.color.array;
    for (let i = 0; i < colorsArray.length; i += 3) {
        colorsArray[i] = redColor.r;
        colorsArray[i + 1] = redColor.g;
        colorsArray[i + 2] = redColor.b;
    }
    geometry.attributes.color.needsUpdate = true; 
    
    // Increase the main box shadow glow for a 'heartbeat' look
    loveMessageContainer.style.boxShadow = '0 0 100px rgba(255, 0, 0, 0.9), 0 0 40px rgba(255, 255, 255, 0.2)';
    
    
    setTimeout(() => {
        buttonContainer.style.display = 'none';
        finalMessage.style.display = 'none'; 
        
        coupleNameBox.style.display = 'block';
        
        // 💖 FINAL PAGE: Show "Aamir & Minahil Sahiba" (split for fit) 💖
        heading.innerHTML = "Aamir & <br> Minahil Sahiba";
        heading.style.fontSize = '4em'; 
        heading.style.transition = 'opacity 2s ease, font-size 1s ease';

        heading.style.visibility = 'visible'; 
        heading.style.opacity = '0'; 
        
        // Apply zoom-in animation to the names (H2)
        heading.style.animation = 'zoomIn 0.5s forwards';
        
        heading.classList.add('celebration-text'); 

        // 💖 UPDATED CONGRATS MESSAGE FOR PAGE 3 💖
        const finalCongrats = document.createElement('p');
        finalCongrats.innerHTML = `
            <span class="heart-emoji">💖</span> Grateful for this beautiful connection.
            <br> Some people just make life brighter. ✨
        `;
        finalCongrats.style.fontSize = '2em'; 
        finalCongrats.style.marginTop = '20px';
        finalCongrats.style.color = 'white';
        finalCongrats.style.opacity = '0';
        finalCongrats.id = 'final-congrats';
        finalCongrats.style.animation = 'zoomIn 0.5s forwards'; // Apply zoom-in
        loveMessageContainer.appendChild(finalCongrats);
        
        // Ensure final elements have full opacity after animation (forwards)
        heading.style.opacity = '1';
        
    }, 500);
};

// Event Listeners for both final answer buttons (UNCHANGED)
yesButton.addEventListener('click', celebrateInPlace);
funnyButton.addEventListener('click', celebrateInPlace);