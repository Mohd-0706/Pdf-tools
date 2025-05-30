/**
 * Main application initialization with enhanced security and error handling
 */
document.addEventListener('DOMContentLoaded', function() {
    try {
        // Apply CSP nonce before any other operations
        applyCspNonce();

        // Set theme immediately to prevent flash
        initThemeSystem();

        // Initialize loading system with session tracking
        initLoadingSystem();

        // Initialize all UI components
        initUIComponents();

    } catch (error) {
        console.error('Initialization error:', error);
        // Critical fallbacks
        document.documentElement.classList.add('light');
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) loadingScreen.style.display = 'none';
    }
});

/**
 * Loading System with session tracking
 */
function initLoadingSystem() {
    try {
        // Security: Validate and sanitize sessionStorage usage
        const hasVisited = () => {
            try {
                return sessionStorage.getItem('visited') === 'true';
            } catch (e) {
                console.error('Session storage access error:', e);
                return true; // Assume visited to skip loading screen
            }
        };

        if (!hasVisited()) {
            const loadingScreen = document.getElementById('loading-screen');
            const loadingProgress = document.getElementById('loading-progress');
            
            if (loadingScreen && loadingProgress) {
                startLoadingAnimation(loadingScreen, loadingProgress);
            }
        } else {
            const loadingScreen = document.getElementById('loading-screen');
            if (loadingScreen) loadingScreen.style.display = 'none';
        }
    } catch (e) {
        console.error('Loading system error:', e);
    }
}

/**
 * Loading animation with smooth progression
 */
function startLoadingAnimation(loadingScreen, loadingProgress) {
    try {
        loadingScreen.style.display = 'flex';
        loadingScreen.style.opacity = '1';
        
        let progress = 0;
        const duration = 2000; // 2 seconds total
        const startTime = performance.now();
        
        const animate = (timestamp) => {
            const elapsed = timestamp - startTime;
            progress = Math.min(100, (elapsed / duration) * 100);
            
            // Security: Sanitize the progress value
            loadingProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
            
            if (progress < 100) {
                requestAnimationFrame(animate);
            } else {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    try {
                        sessionStorage.setItem('visited', 'true');
                    } catch (e) {
                        console.error('Failed to set sessionStorage:', e);
                    }
                }, 500);
            }
        };
        
        requestAnimationFrame(animate);
    } catch (e) {
        console.error('Loading animation error:', e);
        if (loadingScreen) loadingScreen.style.display = 'none';
    }
}

/**
 * Theme System with secure storage handling
 */
function initThemeSystem() {
    try {
        const themeToggle = document.getElementById('theme-toggle');
        const html = document.documentElement;
        
        // Get saved theme with fallbacks
        const getSavedTheme = () => {
            try {
                const saved = localStorage.getItem('theme');
                if (saved === 'dark' || saved === 'light') return saved;
                
                // Fallback to OS preference
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            } catch (e) {
                console.error('Local storage access error:', e);
                return 'light'; // Default theme if storage access fails
            }
        };
        
        // Apply theme safely
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                html.classList.add('dark');
                html.setAttribute('data-theme', 'dark');
            } else {
                html.classList.remove('dark');
                html.setAttribute('data-theme', 'light');
            }
            
            // Set aria-pressed for toggle button
            const themeToggle = document.getElementById('theme-toggle');
            if (themeToggle) {
                themeToggle.setAttribute('aria-pressed', theme === 'dark');
            }
        };
        
        // Initialize theme
        const savedTheme = getSavedTheme();
        applyTheme(savedTheme);
        
        // Toggle handler with secure storage
        if (themeToggle) {
            // Accessibility: Add ARIA attributes
            themeToggle.setAttribute('role', 'button');
            themeToggle.setAttribute('aria-label', 'Toggle dark mode');
            themeToggle.setAttribute('aria-pressed', savedTheme === 'dark');
            
            const handleThemeToggle = () => {
                const isDark = html.classList.contains('dark');
                const newTheme = isDark ? 'light' : 'dark';
                
                applyTheme(newTheme);
                
                try {
                    localStorage.setItem('theme', newTheme);
                } catch (e) {
                    console.error('Failed to save theme preference:', e);
                }
            };
            
            // Click handler
            themeToggle.addEventListener('click', handleThemeToggle);
            
            // Keyboard accessibility
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleThemeToggle();
                }
            });
        }
    } catch (e) {
        console.error('Theme system error:', e);
        document.documentElement.classList.add('light');
    }
}

/**
 * Initialize all UI components
 */
function initUIComponents() {
    try {
        initMobileMenu();
        initAccordions();
        initBackToTop();
        initAnimations();
        initSearchSystem();
    } catch (e) {
        console.error('UI components initialization error:', e);
    }
}

/**
 * Mobile Menu with enhanced accessibility
 */
function initMobileMenu() {
    try {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.getElementById('mobile-nav');
        
        if (mobileMenuBtn && mobileNav) {
            // Accessibility attributes
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
            mobileMenuBtn.setAttribute('aria-controls', 'mobile-nav');
            
            const toggleMenu = () => {
                const isOpen = mobileNav.classList.toggle('translate-x-full');
                document.body.classList.toggle('overflow-hidden');
                
                // Update accessibility attributes
                mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
                mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
                
                // Close search if open
                const mobileSearchContainer = document.getElementById('mobile-search-container');
                if (mobileSearchContainer) {
                    mobileSearchContainer.classList.add('hidden');
                }
            };
            
            // Click handler
            mobileMenuBtn.addEventListener('click', toggleMenu);
            
            // Keyboard accessibility
            mobileMenuBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleMenu();
                }
            });
            
            // Close on ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && !mobileNav.classList.contains('translate-x-full')) {
                    toggleMenu();
                }
            });
        }
    } catch (e) {
        console.error('Mobile menu error:', e);
    }
}

/**
 * Accordion system with accessibility support
 */
function initAccordions() {
    try {
        const accordionBtns = document.querySelectorAll('.accordion-btn');
        accordionBtns.forEach(btn => {
            if (!btn.nextElementSibling) return;
            
            // Accessibility attributes
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-controls', btn.nextElementSibling.id || 
                `accordion-content-${Math.random().toString(36).substr(2, 9)}`);
            
            if (!btn.nextElementSibling.id) {
                btn.nextElementSibling.id = btn.getAttribute('aria-controls');
            }
            
            const toggleAccordion = () => {
                const content = btn.nextElementSibling;
                const icon = btn.querySelector('i');
                
                if (!content || !icon) return;
                
                const isExpanded = btn.classList.toggle('active');
                btn.setAttribute('aria-expanded', isExpanded.toString());
                
                if (isExpanded) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    icon.classList.add('rotate-180');
                } else {
                    content.style.maxHeight = '0';
                    icon.classList.remove('rotate-180');
                }
            };
            
            // Click handler
            btn.addEventListener('click', toggleAccordion);
            
            // Keyboard accessibility
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleAccordion();
                }
            });
        });
    } catch (e) {
        console.error('Accordion error:', e);
    }
}

/**
 * Back to top button with throttled scroll
 */
function initBackToTop() {
    try {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            // Accessibility attributes
            backToTopBtn.setAttribute('aria-label', 'Scroll to top');
            
            const handleScroll = () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
                    backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
                } else {
                    backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
                    backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
                }
            };
            
            // Throttle scroll event for performance
            const throttledScroll = throttle(handleScroll, 100);
            window.addEventListener('scroll', throttledScroll);
            
            // Click handler
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                backToTopBtn.blur(); // Remove focus after click
            });
            
            // Keyboard accessibility
            backToTopBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            });
        }
    } catch (e) {
        console.error('Back to top error:', e);
    }
}

/**
 * Animation system with IntersectionObserver
 */
function initAnimations() {
    try {
        const animateOnScroll = (elements, animationClass) => {
            if (elements.length === 0) return;
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(animationClass);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            elements.forEach(element => {
                if (element) observer.observe(element);
            });
        };
        
        // Animate feature cards
        animateOnScroll(document.querySelectorAll('.feature-card'), 'animate-fadeInUp');
        
        // Add more animation targets as needed
        animateOnScroll(document.querySelectorAll('.animate-on-scroll'), 'animate-fadeIn');
    } catch (e) {
        console.error('Animation error:', e);
        // Fallback: Show all content immediately
        document.querySelectorAll('.feature-card, .animate-on-scroll').forEach(el => {
            if (el) el.style.opacity = '1';
        });
    }
}


/**
 * Search system with XSS protection
 */
function initSearchSystem() {
    try {
        // Tools data - immutable array for security
        const tools = Object.freeze([
            { name: "Merge PDF", url: "../tools/organizepdf/merge.html", category: "Organize PDF" },
            { name: "Split PDF", url: "../tools/organizepdf/splitpdf.html", category: "Organize PDF" },
            { name: "Compress PDF", url: "../tools/organizepdf/compresspdf.html", category: "Organize PDF" },
            { name: "JPG to PDF", url: "../tools/convert-to-pdf/jpg-to-pdf.html", category: "Convert to PDF" },
            { name: "Word to PDF", url: "../tools/convert-to-pdf/word-to-pdf.html", category: "Convert to PDF" },
            { name: "Excel to PDF", url: "../tools/convert-to-pdf/excel-to-pdf.html", category: "Convert to PDF" },
            { name: "Rotate PDF", url: "../tools/editpdf/rotate-pdf.html", category: "Edit PDF" },
            { name: "Add Watermark", url: "../tools/editpdf/watermark.html", category: "Edit PDF" },
            { name: "Protect PDF", url: "../Updates/comingsoon.html", category: "Edit PDF" }
        ]);
        
        // Security: Escape HTML to prevent XSS
        const escapeHtml = (unsafe) => {
            if (typeof unsafe !== 'string') return '';
            return unsafe.replace(/[&<"'>]/g, function(m) {
                switch (m) {
                    case '&': return '&amp;';
                    case '<': return '&lt;';
                    case '>': return '&gt;';
                    case '"': return '&quot;';
                    case "'": return '&#39;';
                    default: return m;
                }
            });
        };
        
        // Security: Validate URL (for potential location.href usage)
        const isValidUrl = (url) => {
            try {
                // Check if it's a relative path or valid absolute path
                if (typeof url !== 'string') return false;
                if (url.startsWith('../') || url.startsWith('./') || url.startsWith('/')) {
                    return true;
                }
                
                // For absolute URLs, validate protocol
                const parsed = new URL(url, window.location.origin);
                return ['http:', 'https:'].includes(parsed.protocol);
            } catch {
                return false;
            }
        };
        
        // Perform search with input validation
        function performSearch(query, resultsContainer) {
            if (!resultsContainer) return;
            
            // Validate query
            if (typeof query !== 'string' || query.trim().length < 2) {
                resultsContainer.classList.add('hidden');
                return;
            }
            
            const filteredTools = tools.filter(tool => 
                tool.name.toLowerCase().includes(query.toLowerCase())
            );
            
            const resultsDiv = resultsContainer.querySelector('div');
            if (!resultsDiv) return;
            
            // Safer DOM clearing - replace innerHTML with removeChild
            while (resultsDiv.firstChild) {
                resultsDiv.removeChild(resultsDiv.firstChild);
            }
            
            if (filteredTools.length > 0) {
                filteredTools.forEach(tool => {
                    // Validate URL before using
                    if (!isValidUrl(tool.url)) {
                        console.error('Invalid URL detected:', tool.url);
                        return;
                    }
                    
                    const item = document.createElement('a');
                    item.href = escapeHtml(tool.url);
                    item.className = 'block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors';
                    item.setAttribute('role', 'option');
                    
                    // Use textContent instead of innerHTML
                    const nameDiv = document.createElement('div');
                    nameDiv.className = 'font-medium';
                    nameDiv.textContent = tool.name;
                    
                    const categoryDiv = document.createElement('div');
                    categoryDiv.className = 'text-xs text-gray-500 dark:text-gray-400';
                    categoryDiv.textContent = tool.category;
                    
                    item.appendChild(nameDiv);
                    item.appendChild(categoryDiv);
                    resultsDiv.appendChild(item);
                });
                resultsContainer.classList.remove('hidden');
            } else {
                const noResults = document.createElement('div');
                noResults.className = 'py-2 px-4 text-gray-500 dark:text-gray-400';
                noResults.textContent = 'No tools found';
                resultsDiv.appendChild(noResults);
                resultsContainer.classList.remove('hidden');
            }
        }
        
        // Initialize desktop search
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        if (searchInput && searchResults) {
            // Accessibility attributes
            searchInput.setAttribute('role', 'combobox');
            searchInput.setAttribute('aria-autocomplete', 'list');
            searchInput.setAttribute('aria-expanded', 'false');
            searchInput.setAttribute('aria-controls', 'search-results');
            searchInput.setAttribute('aria-label', 'Search for tools');
            
            searchInput.addEventListener('input', () => {
                performSearch(searchInput.value, searchResults);
                searchInput.setAttribute('aria-expanded', searchResults.classList.contains('hidden') ? 'false' : 'true');
            });
            
            // Hide results when clicking outside
            document.addEventListener('click', (e) => {
                if (!searchInput?.contains(e.target) && !searchResults?.contains(e.target)) {
                    searchResults.classList.add('hidden');
                    searchInput.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Keyboard navigation for search results
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    searchResults.classList.add('hidden');
                    searchInput.setAttribute('aria-expanded', 'false');
                }
            });
        }
        
        // Initialize mobile search
        const mobileSearchInput = document.getElementById('mobile-search-input');
        const mobileSearchResults = document.getElementById('mobile-search-results');
        const mobileSearchBtn = document.getElementById('mobile-search-btn');
        const mobileSearchContainer = document.getElementById('mobile-search-container');
        
        if (mobileSearchBtn && mobileSearchContainer) {
            // Accessibility attributes
            mobileSearchBtn.setAttribute('aria-label', 'Open search');
            mobileSearchBtn.setAttribute('aria-expanded', 'false');
            mobileSearchBtn.setAttribute('aria-controls', 'mobile-search-container');
            
            const toggleSearch = () => {
                const isOpen = mobileSearchContainer.classList.toggle('hidden');
                mobileSearchBtn.setAttribute('aria-expanded', !isOpen);
                
                if (!isOpen) {
                    if (mobileSearchInput) {
                        mobileSearchInput.focus();
                        mobileSearchInput.setAttribute('aria-expanded', 'false');
                    }
                    
                    // Close mobile nav if open
                    const mobileNav = document.getElementById('mobile-nav');
                    if (mobileNav) mobileNav.classList.add('translate-x-full');
                }
            };
            
            mobileSearchBtn.addEventListener('click', toggleSearch);
            
            // Keyboard accessibility
            mobileSearchBtn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSearch();
                }
            });
        }
        
        if (mobileSearchInput && mobileSearchResults) {
            // Accessibility attributes
            mobileSearchInput.setAttribute('role', 'combobox');
            mobileSearchInput.setAttribute('aria-autocomplete', 'list');
            mobileSearchInput.setAttribute('aria-expanded', 'false');
            mobileSearchInput.setAttribute('aria-controls', 'mobile-search-results');
            mobileSearchInput.setAttribute('aria-label', 'Search for tools');
            
            mobileSearchInput.addEventListener('input', () => {
                performSearch(mobileSearchInput.value, mobileSearchResults);
                mobileSearchInput.setAttribute('aria-expanded', 
                    mobileSearchResults.classList.contains('hidden') ? 'false' : 'true');
            });
            
            // Hide results when clicking outside
            document.addEventListener('click', (e) => {
                if (mobileSearchInput && mobileSearchResults && mobileSearchBtn &&
                    !mobileSearchInput?.contains(e.target) && 
                    !mobileSearchResults?.contains(e.target) && 
                    !mobileSearchBtn?.contains(e.target)) {
                    mobileSearchResults.classList.add('hidden');
                    mobileSearchInput.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Keyboard navigation
            mobileSearchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    mobileSearchResults.classList.add('hidden');
                    mobileSearchInput.setAttribute('aria-expanded', 'false');
                }
            });
        }
    } catch (e) {
        console.error('Search system error:', e);
    }
}

/**
 * Throttle function for performance optimization
 */
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

/**
 * Content Security Policy nonce support
 */
function applyCspNonce() {
    try {
        const nonce = document.querySelector('meta[property="csp-nonce"]')?.content;
        if (nonce) {
            document.querySelectorAll('script[data-csp]').forEach(script => {
                script.nonce = nonce;
            });
        }
    } catch (e) {
        console.error('CSP nonce error:', e);
    }
}

/**
 * Safe redirect helper
 */
function safeRedirect(url) {
    try {
        // Validate URL
        if (!url || typeof url !== 'string') {
            console.error('Invalid redirect URL');
            return false;
        }
        
        // Check for relative paths
        if (url.startsWith('../') || url.startsWith('./') || url.startsWith('/')) {
            window.location.href = url;
            return true;
        }
        
        // For absolute URLs, validate protocol
        const parsed = new URL(url, window.location.origin);
        if (['http:', 'https:'].includes(parsed.protocol)) {
            window.location.href = url;
            return true;
        }
        
        console.error('Invalid redirect URL protocol');
        return false;
    } catch (e) {
        console.error('Redirect error:', e);
        return false;
    }
}

/**
 * Error handling for global errors
 */
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Implement error reporting here if needed
});

/**
 * Unhandled promise rejection handler
 */
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});