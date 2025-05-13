document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');

    // Hide loading screen after 1.5 seconds
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 1100);

    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);

    // Set initial checkbox state
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
    }

    // Theme toggle event
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav ul');

    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('show') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Scroll Animations
    const animateElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');

                // Add delay if specified
                const delay = entry.target.getAttribute('data-delay') || 0;
                entry.target.style.transitionDelay = `${delay}s`;

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;

            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // Tool hover effects
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.tool-hover').style.transform = 'translateY(0)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.tool-hover').style.transform = 'translateY(100%)';
        });
    });

    // Initialize dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content').style.opacity = '1';
            this.querySelector('.dropdown-content').style.visibility = 'visible';
        });

        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content').style.opacity = '0';
            this.querySelector('.dropdown-content').style.visibility = 'hidden';
        });
    });

    // Initialize Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#8a2be2" },
            shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
            line_linked: { enable: true, distance: 150, color: "#8a2be2", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out", bounce: false, attract: { enable: false, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                onclick: { enable: true, mode: "push" },
                resize: true
            },
            modes: {
                grab: { distance: 140, line_linked: { opacity: 1 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });
});

///-----------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    // Simulate loading progress
    const progress = document.querySelector('.progress');
    let width = 0;
    const progressInterval = setInterval(() => {
        width += 5;
        progress.style.width = width + '%';
        
        if (width >= 100) {
            clearInterval(progressInterval);
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
        }
    }, 50);

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    
    // Set initial checkbox state
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
    }
    
    // Theme toggle event
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add transition class for smooth theme change
        html.classList.add('theme-transition');
        setTimeout(() => {
            html.classList.remove('theme-transition');
        }, 500);
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav ul');
    
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('show') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Search Functionality
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.querySelector('.search-results');
    const tools = [
        {name: 'Merge PDF', icon: 'object-group', link: 'tools/organizepdf/merge.html', category: 'Organize PDF'},
        {name: 'Split PDF', icon: 'cut', link: 'tools/organizepdf/splitpdf.html', category: 'Organize PDF'},
        {name: 'Compress PDF', icon: 'compress', link: 'tools/organizepdf/compresspdf.html', category: 'Organize PDF'},
        {name: 'Remove Pages', icon: 'sort', link: 'tools/organizepdf/removepages.html', category: 'Organize PDF'},
        {name: 'Repair PDF', icon: 'sort', link: 'tools/organizepdf/repairpdf.html', category: 'Organize PDF'},
        {name: 'JPG to PDF', icon: 'file-image', link: 'tools/convert-to-pdf/jpg-to-pdf.html', category: 'Convert to PDF'},
        {name: 'Word to PDF', icon: 'file-word', link: 'tools/convert-to-pdf/word-to-pdf.html', category: 'Convert to PDF'},
        {name: 'Excel to PDF', icon: 'file-excel', link: 'tools/convert-to-pdf/excel-to-pdf.html', category: 'Convert to PDF'},
        {name: 'PPT to PDF', icon: 'file-powerpoint', link: 'tools/convert-to-pdf/ppt-to-pdf.html', category: 'Convert to PDF'},
        {name: 'PDF to JPG', icon: 'image', link: 'tools/convert-from-pdf/pdf-to-jpeg.html', category: 'Convert from PDF'},
        {name: 'PDF to Word', icon: 'file-word', link: 'tools/convert-from-pdf/pdf-to-word.html', category: 'Convert from PDF'},
        {name: 'PDF to Excel', icon: 'file-word', link: 'tools/convert-from-pdf/pdf-to-excel.html', category: 'Convert from PDF'},
        {name: 'PDF to Powerpoint', icon: 'file-word', link: 'tools/convent-from-pdf/pdf-to-powerpoint.html', category: 'Convert from PDF'},
        {name: 'Edit PDF', icon: 'edit', link: 'tools/edit/edit-pdf.html', category: 'Edit PDF'},
        {name: 'Rotate PDF', icon: 'redo', link: 'tools/editpdf/rotate-pdf.html', category: 'Edit PDF'},
        {name: 'Add Watermark', icon: 'tint', link: 'tools/edit/add-watermark.html', category: 'Edit PDF'},
        {name: 'Add Page Numbers', icon: 'list-ol', link: 'tools/edit/add-page-numbers.html', category: 'Edit PDF'},
        {name: 'Crop PDF', icon: 'crop', link: 'tools/edit/crop-pdf.html', category: 'Edit PDF'},
        {name: 'Protect PDF', icon: 'lock', link: 'tools/security/protect-pdf.html', category: 'Security'},
        {name: 'Unlock PDF', icon: 'lock-open', link: 'tools/security/unlock-pdf.html', category: 'Security'},
        {name: 'Sign PDF', icon: 'signature', link: 'tools/security/sign-pdf.html', category: 'Security'},
    ];

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('show');
            return;
        }
        
        const results = tools.filter(tool => 
            tool.name.toLowerCase().includes(query) || 
            tool.category.toLowerCase().includes(query)
        );
        
        displayResults(results);
    });

    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.textContent = 'No tools found';
            searchResults.appendChild(noResults);
        } else {
            results.forEach(tool => {
                const item = document.createElement('a');
                item.href = tool.link;
                item.className = 'search-result-item';
                item.innerHTML = `
                    <i class="fas fa-${tool.icon}"></i>
                    <div class="search-result-info">
                        <h4>${tool.name}</h4>
                        <p>${tool.category}</p>
                    </div>
                `;
                searchResults.appendChild(item);
            });
        }
        
        searchResults.classList.add('show');
    }

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });

    // Tools Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding tab pane
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Animations
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add delay if specified
                const delay = entry.target.getAttribute('data-delay') || 0;
                entry.target.style.transitionDelay = `${delay}s`;
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });

    // Hero scroll indicator
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            window.scrollTo({
                top: document.querySelector('#tools').offsetTop - 80,
                behavior: 'smooth'
            });
        });
    }

    // File Upload Area Interaction
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'white';
            uploadArea.style.transform = 'translateY(-3px)';
        });

        uploadArea.addEventListener('dragleave', () => {
            uploadArea.style.borderColor = 'rgba(255,255,255,0.3)';
            uploadArea.style.transform = 'translateY(0)';
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.style.borderColor = 'rgba(255,255,255,0.3)';
            uploadArea.style.transform = 'translateY(0)';
            
            // Handle dropped files
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleFiles(files);
            }
        });

        uploadArea.addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('fileInput').addEventListener('change', function() {
            if (this.files.length > 0) {
                handleFiles(this.files);
            }
        });
    }

    function handleFiles(files) {
        // Here you would handle the file upload and processing
        console.log('Files selected:', files);
        // In a real implementation, you would upload the files to your server
        // and then redirect to the appropriate tool page or show processing options
    }

    // Tool hover effects
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.tool-hover').style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.tool-hover').style.transform = 'translateY(100%)';
        });
    });

    // Initialize dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content').style.opacity = '1';
            this.querySelector('.dropdown-content').style.visibility = 'visible';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content').style.opacity = '0';
            this.querySelector('.dropdown-content').style.visibility = 'hidden';
        });
    });

    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });
});


//-----------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced Loading Screen with Progress
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress with animation
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 2 + Math.random() * 3;
        loadingProgress.style.width = `${Math.min(progress, 100)}%`;
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    }, 50);

    // Enhanced Theme Toggle with Animation
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);
    
    // Set initial checkbox state
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
    }
    
    // Theme toggle event with smooth transition
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        
        // Add transition class for smooth theme change
        html.classList.add('theme-transition');
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        setTimeout(() => {
            html.classList.remove('theme-transition');
        }, 500);
    });

    // Enhanced Mobile Menu Toggle with Animation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav ul');
    
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('show');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('show') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        
        // Toggle body overflow when menu is open
        if (mainNav.classList.contains('show')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                mainNav.classList.remove('show');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Enhanced Search Functionality with Debounce
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.querySelector('.search-results');
    const tools = [
        {name: 'Merge PDF', icon: 'object-group', link: 'tools/organizepdf/merge.html', category: 'Organize PDF'},
        {name: 'Split PDF', icon: 'cut', link: 'tools/organizepdf/splitpdf.html', category: 'Organize PDF'},
        {name: 'Compress PDF', icon: 'compress', link: 'tools/organizepdf/compresspdf.html', category: 'Organize PDF'},
        {name: 'Remove Pages', icon: 'file', link: 'tools/organizepdf/removepages.html', category: 'Organize PDF'},
        {name: 'Repair PDF', icon: 'screwdriver-wrench', link: 'tools/organizepdf/repairpdf.html', category: 'Organize PDF'},
        {name: 'JPG to PDF', icon: 'file-image', link: 'tools/convert-to-pdf/jpg-to-pdf.html', category: 'Convert to PDF'},
        {name: 'Word to PDF', icon: 'file-word', link: 'tools/convert-to-pdf/word-to-pdf.html', category: 'Convert to PDF'},
        {name: 'Excel to PDF', icon: 'file-excel', link: 'tools/convert-to-pdf/excel-to-pdf.html', category: 'Convert to PDF'},
        {name: 'PPT to PDF', icon: 'file-powerpoint', link: 'tools/convert-to-pdf/ppt-to-pdf.html', category: 'Convert to PDF'},
        {name: 'PDF to JPG', icon: 'file-image', link: 'tools/convert-from-pdf/pdf-to-jpeg.html', category: 'Convert from PDF'},
        {name: 'PDF to Word', icon: 'file-word', link: 'tools/convert-from-pdf/pdf-to-word.html', category: 'Convert from PDF'},
        {name: 'PDF to Excel', icon: 'file-excel', link: 'tools/convert-from-pdf/pdf-to-excel.html', category: 'Convert from PDF'},
        {name: 'PDF to Powerpoint', icon: 'file-powerpoint', link: 'tools/convert-from-pdf/pdf-to-powerpoint.html', category: 'Convert from PDF'},
        {name: 'Edit PDF', icon: 'pen-to-square', link: 'tools/editpdf/edit-pdf.html', category: 'Edit PDF'},
        {name: 'Rotate PDF', icon: 'rotate', link: 'tools/editpdf/rotate-pdf.html', category: 'Edit PDF'},
        {name: 'Add Watermark', icon: 'marker', link: 'tools/editpdf/watermark.html', category: 'Edit PDF'},
        {name: 'Add Page Numbers', icon: 'pager', link: 'tools/editpdf/add-page-numbers.html', category: 'Edit PDF'},
        {name: 'Crop PDF', icon: 'crop', link: 'tools/editpdf/crop-pdf.html', category: 'Edit PDF'},
        {name: 'Protect PDF', icon: 'shield-halved', link: 'tools/securitypdf/protect-pdf.html', category: 'Security'},
        {name: 'Unlock PDF', icon: 'unlock', link: 'tools/securitypdf/unlock-pdf.html', category: 'Security'},
        {name: 'Sign PDF', icon: 'signature', link: 'tools/securitypdf/sign-pdf.html', category: 'Security'},
    ];

    // Debounce search input for performance
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = this.value.toLowerCase().trim();
            
            if (query.length < 2) {
                searchResults.classList.remove('show');
                return;
            }
            
            try {
                const results = tools.filter(tool => 
                    tool.name.toLowerCase().includes(query) || 
                    tool.category.toLowerCase().includes(query)
                );
                
                displayResults(results);
            } catch (error) {
                console.error('Search error:', error);
                displayError();
            }
        }, 300);
    });

    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.textContent = 'No tools found';
            searchResults.appendChild(noResults);
        } else {
            results.forEach(tool => {
                const item = document.createElement('a');
                item.href = tool.link;
                item.className = 'search-result-item';
                item.innerHTML = `
                    <i class="fas fa-${tool.icon}"></i>
                    <div class="search-result-info">
                        <h4>${tool.name}</h4>
                        <p>${tool.category}</p>
                    </div>
                `;
                searchResults.appendChild(item);
            });
        }
        
        searchResults.classList.add('show');
    }

    function displayError() {
        searchResults.innerHTML = '';
        const errorItem = document.createElement('div');
        errorItem.className = 'search-result-item';
        errorItem.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <div class="search-result-info">
                <h4>Search Error</h4>
                <p>Please try again</p>
            </div>
        `;
        searchResults.appendChild(errorItem);
        searchResults.classList.add('show');
    }

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('show');
        }
    });

    // Enhanced Tools Tabs with Animation
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button with animation
            tabBtns.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'translateY(0)';
            });
            this.classList.add('active');
            this.style.transform = 'translateY(-2px)';
            
            // Show corresponding tab pane with fade animation
            tabPanes.forEach(pane => pane.classList.remove('active'));
            const activePane = document.getElementById(tabId);
            activePane.classList.add('active');
        });
    });

    // Enhanced Back to Top Button with Scroll Behavior
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        try {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
            
            // Header shadow on scroll
            const header = document.querySelector('.site-header');
            if (window.pageYOffset > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        } catch (error) {
            console.error('Scroll handler error:', error);
        }
    });
    
    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        try {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } catch (error) {
            window.scrollTo(0, 0);
        }
    });

    // Enhanced Scroll Animations with Intersection Observer
    const animateElements = document.querySelectorAll('[data-animate]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add delay if specified
                const delay = entry.target.getAttribute('data-delay') || 0;
                entry.target.style.transitionDelay = `${delay}s`;
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Enhanced Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                try {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without page reload
                    history.pushState(null, null, targetId);
                } catch (error) {
                    window.location.href = targetId;
                }
            }
        });
    });

    // Hero scroll indicator
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function(e) {
            e.preventDefault();
            try {
                window.scrollTo({
                    top: document.querySelector('#tools').offsetTop - 80,
                    behavior: 'smooth'
                });
            } catch (error) {
                window.location.href = '#tools';
            }
        });
    }

    // Enhanced Tool Hover Effects
    document.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.tool-hover').style.transform = 'translateY(0)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.tool-hover').style.transform = 'translateY(100%)';
        });
    });

    // Enhanced Dropdown Menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function() {
            this.querySelector('.dropdown-content').style.opacity = '1';
            this.querySelector('.dropdown-content').style.visibility = 'visible';
            this.querySelector('.dropdown-content').style.transform = 'translateX(-50%) translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            this.querySelector('.dropdown-content').style.opacity = '0';
            this.querySelector('.dropdown-content').style.visibility = 'hidden';
            this.querySelector('.dropdown-content').style.transform = 'translateX(-50%) translateY(10px)';
        });
    });

    // Enhanced Ripple Effect for Buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove existing ripples
            const existingRipples = this.querySelectorAll('.ripple');
            existingRipples.forEach(ripple => ripple.remove());
            
            // Create new ripple
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 1000);
        });
    });

    // Initialize Particles.js with Error Handling
    try {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: { 
                        value: 80, 
                        density: { 
                            enable: true, 
                            value_area: 800 
                        } 
                    },
                    color: { 
                        value: "#8a2be2" 
                    },
                    shape: { 
                        type: "circle", 
                        stroke: { 
                            width: 0, 
                            color: "#000000" 
                        } 
                    },
                    opacity: { 
                        value: 0.5, 
                        random: true, 
                        anim: { 
                            enable: true, 
                            speed: 1, 
                            opacity_min: 0.1 
                        } 
                    },
                    size: { 
                        value: 3, 
                        random: true, 
                        anim: { 
                            enable: true, 
                            speed: 2, 
                            size_min: 0.1 
                        } 
                    },
                    line_linked: { 
                        enable: true, 
                        distance: 150, 
                        color: "#8a2be2", 
                        opacity: 0.4, 
                        width: 1 
                    },
                    move: { 
                        enable: true, 
                        speed: 1, 
                        direction: "none", 
                        random: true, 
                        straight: false, 
                        out_mode: "out", 
                        bounce: false, 
                        attract: { 
                            enable: false, 
                            rotateX: 600, 
                            rotateY: 1200 
                        } 
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { 
                            enable: true, 
                            mode: "grab" 
                        },
                        onclick: { 
                            enable: true, 
                            mode: "push" 
                        },
                        resize: true
                    },
                    modes: {
                        grab: { 
                            distance: 140, 
                            line_linked: { 
                                opacity: 1 
                            } 
                        },
                        push: { 
                            particles_nb: 4 
                        }
                    }
                },
                retina_detect: true
            });
        }
    } catch (error) {
        console.error('Particles.js initialization error:', error);
    }

    // Enhanced Error Handling for All Event Listeners
    window.addEventListener('error', function(e) {
        console.error('Uncaught error:', e.error);
        // You could show a user-friendly error message here
    });

    // Enhanced Touch Support for Mobile Devices
    document.addEventListener('touchstart', function() {}, { passive: true });

    // Performance Optimization - Only animate when not in reduced motion preference
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.style.transition = 'none';
            el.style.animation = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }
});