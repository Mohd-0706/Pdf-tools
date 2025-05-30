// Page transition manager
class PageTransitions {
    constructor() {
        this.transitionOverlay = document.getElementById('page-transition');
        this.init();
    }
    
    init() {
        if (!this.transitionOverlay) return;
        
        // Set up event listeners for all links
        this.setupLinkInterception();
        
        // Handle popstate (back/forward navigation)
        window.addEventListener('popstate', this.handlePopState.bind(this));
    }
    
    setupLinkInterception() {
        document.addEventListener('click', (e) => {
            // Find the closest anchor tag
            let target = e.target;
            while (target && target.tagName !== 'A') {
                target = target.parentNode;
                if (target === document.body) {
                    target = null;
                    break;
                }
            }
            
            if (!target) return;
            
            const href = target.getAttribute('href');
            
            // Skip if it's a hash link or external URL
            if (!href || href.startsWith('#') || href.startsWith('mailto:') || 
                href.startsWith('tel:') || href.startsWith('http') && !href.includes(window.location.host)) {
                return;
            }
            
            // Prevent default navigation
            e.preventDefault();
            
            // Start transition
            this.startTransition(href);
        });
    }
    
    startTransition(url) {
        // Show transition overlay with random animation style
        this.transitionOverlay.style.opacity = '1';
        this.transitionOverlay.style.pointerEvents = 'auto';
        
        // Add random animation class
        const animations = ['slide-up', 'slide-down', 'fade', 'zoom', 'rotate'];
        const randomAnim = animations[Math.floor(Math.random() * animations.length)];
        this.transitionOverlay.className = `page-transition ${randomAnim}`;
        
        // After a short delay, navigate to the new page
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
    
    handlePopState() {
        // When navigating back/forward, use a simple fade transition
        this.transitionOverlay.style.opacity = '1';
        this.transitionOverlay.style.pointerEvents = 'auto';
        this.transitionOverlay.className = 'page-transition fade';
        
        setTimeout(() => {
            this.transitionOverlay.style.opacity = '0';
            this.transitionOverlay.style.pointerEvents = 'none';
        }, 300);
    }
    
    completeTransition() {
        // Hide transition overlay when new page is loaded
        if (this.transitionOverlay) {
            this.transitionOverlay.style.opacity = '0';
            this.transitionOverlay.style.pointerEvents = 'none';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const pageTransitions = new PageTransitions();
    
    // Complete any ongoing transition when page loads
    pageTransitions.completeTransition();
    
    // Add animation classes to elements as they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});