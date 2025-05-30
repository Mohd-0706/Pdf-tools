function initThreeJS() {
    try {
        const container = document.getElementById('pdf-3d-container');
        if (!container) return;
        
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(1, 1, 1);
        scene.add(directionalLight);
        
        // Create a stack of PDF pages
        const group = new THREE.Group();
        
        // Create pages
        const pageGeometry = new THREE.BoxGeometry(3, 4, 0.02);
        const pageMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xf9f9f9,
            specular: 0x111111,
            shininess: 30
        });
        
        const pages = [];
        const pageCount = 5;
        
        for (let i = 0; i < pageCount; i++) {
            const page = new THREE.Mesh(pageGeometry, pageMaterial.clone());
            page.position.z = i * 0.02;
            page.position.y = i * 0.02;
            page.position.x = i * 0.02;
            page.rotation.y = (Math.PI / 180) * (i * 2);
            pages.push(page);
            group.add(page);
        }
        
        scene.add(group);
        
        // Camera position
        camera.position.z = 7;
        camera.position.y = 2;
        
        // Add controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1;
        
        // Animation loop
        let animationId;
        function animate() {
            animationId = requestAnimationFrame(animate);
            
            // Gentle floating animation
            group.rotation.y += 0.001;
            group.position.y = Math.sin(Date.now() * 0.001) * 0.2;
            
            controls.update();
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        function handleResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    } catch (error) {
        console.error('Three.js initialization error:', error);
        // Fallback: Show static image if 3D fails
        const container = document.getElementById('pdf-3d-container');
        if (container) {
            container.innerHTML = '<img src="../assets/images/pdf-stack.png" alt="PDF Stack" class="w-full h-full object-contain">';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on pages that need it
    if (document.getElementById('pdf-3d-container')) {
        const cleanupThreeJS = initThreeJS();
        
        // Cleanup when navigating away (handled by page transitions)
        window.addEventListener('beforeunload', () => {
            if (cleanupThreeJS) cleanupThreeJS();
        });
    }
});