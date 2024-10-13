document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    const heroButtons = document.querySelectorAll('.hero-button');
    console.log('Hero buttons:', heroButtons);
    let buttonsVisible = false;

    function toggleButtons(show) {
        console.log('Toggling buttons:', show);
        heroButtons.forEach((button, index) => {
            setTimeout(() => {
                button.classList.toggle('visible', show);
                console.log(`Button ${index} visibility:`, button.classList.contains('visible'));
            }, index * 100);
        });
        buttonsVisible = show;
    }

    function handleScroll() {
        console.log('Handling scroll');
        const scrollPosition = window.scrollY;
        const heroSection = document.getElementById('hero');
        const heroHeight = heroSection.offsetHeight;
        const scrollThreshold = heroHeight / 30;

        console.log('Scroll position:', scrollPosition);
        console.log('Scroll threshold:', scrollThreshold);

        if (scrollPosition > scrollThreshold && !buttonsVisible) {
            console.log('Showing buttons');
            toggleButtons(true);
        } else if (scrollPosition <= scrollThreshold && buttonsVisible) {
            console.log('Hiding buttons');
            toggleButtons(false);
        }
    }

    window.addEventListener('scroll', handleScroll);
    console.log('Scroll event listener added');

    function handlePageTransitions() {
        const sections = ['about', 'events', 'contact'];
        
        sections.forEach(section => {
            const button = document.querySelector(`.hero-button[data-type="${section}"]`);
            const backButton = document.getElementById(section).querySelector('.back-button');

            button.addEventListener('click', () => {
                console.log(`${section} button clicked`);
                document.body.style.overflow = 'hidden';
                showSection(section);
            });

            backButton.addEventListener('click', () => {
                console.log(`${section} back button clicked`);
                document.body.style.overflow = 'auto';
                showSection('home');
            });
        });
    }

    handlePageTransitions();

    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;

    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        updateModeToggleIcon();
    }

    function updateModeToggleIcon() {
        const icon = modeToggle.querySelector('.mode-toggle__icon');
        icon.textContent = body.classList.contains('dark-mode') ? '☀️' : '🌓';
    }

    modeToggle.addEventListener('click', toggleDarkMode);
    updateModeToggleIcon();

    // Add your existing code for dark mode toggle and other functionalities here

    function handleButtonHover() {
        const buttons = document.querySelectorAll('.hero-button');
    }

    function handleNavLinkHover() {
        const navLinks = document.querySelectorAll('.main-nav a, .hero-button, .back-button');
        
        navLinks.forEach(link => {
            link.addEventListener('mousemove', (e) => {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                link.style.setProperty('--mouse-x', `${x}px`);
                link.style.setProperty('--mouse-y', `${y}px`);
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.removeProperty('--mouse-x');
                link.style.removeProperty('--mouse-y');
            });
        });
    }

    handleNavLinkHover();

    const backgroundImage = document.querySelector('.background-image');
    const contentOverlay = document.querySelector('.content-overlay');
    const pageSections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('nav a');

    function showSection(sectionId) {
        const heroSection = document.getElementById('hero');
        const pageSections = document.querySelectorAll('.page-section');

        if (sectionId === 'home') {
            // Fade out all sections
            pageSections.forEach(section => {
                section.style.opacity = '0';
                section.style.visibility = 'hidden';
                const content = section.querySelector('.section-content');
                content.style.opacity = '0';
                content.style.transform = 'translateY(50px) scale(0.95)';
            });

            // Show hero section after a short delay
            setTimeout(() => {
                heroSection.style.display = 'flex';
                heroSection.style.opacity = '1';
            }, 300);
        } else {
            const targetSection = document.getElementById(sectionId);
            if (!targetSection) {
                console.error(`Section with id "${sectionId}" not found`);
                return;
            }

            // Hide hero section, show only the target section
            heroSection.style.opacity = '0';
            setTimeout(() => {
                heroSection.style.display = 'none';
                pageSections.forEach(section => {
                    if (section.id === sectionId) {
                        section.style.visibility = 'visible';
                        section.style.opacity = '1';
                        // Show content with a slight delay
                        setTimeout(() => {
                            const content = section.querySelector('.section-content');
                            content.style.opacity = '1';
                            content.style.transform = 'translateY(0) scale(1)';
                        }, 50);
                    } else {
                        section.style.visibility = 'hidden';
                        section.style.opacity = '0';
                        // Reset content styles for hidden sections
                        const content = section.querySelector('.section-content');
                        content.style.opacity = '0';
                        content.style.transform = 'translateY(50px) scale(0.95)';
                    }
                });
            }, 300);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    // Handle back button
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            showSection('home');
        });
    });

    const backgroundMusic = document.getElementById('background-music');
    const musicToggle = document.createElement('button');
    musicToggle.id = 'music-toggle';
    musicToggle.innerHTML = '🎵';
    musicToggle.setAttribute('aria-label', 'Toggle background music');
    document.body.appendChild(musicToggle);

    let isMusicPlaying = false;

    function toggleMusic() {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '🎵';
        } else {
            backgroundMusic.play();
            musicToggle.innerHTML = '🔇';
        }
        isMusicPlaying = !isMusicPlaying;
    }

    musicToggle.addEventListener('click', toggleMusic);

    const floatingDotsContainer = document.getElementById('floating-dots');
    const numberOfDots = 50;

    function createDots() {
        for (let i = 0; i < numberOfDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.width = `${Math.random() * 5 + 2}px`;
            dot.style.height = dot.style.width;
            dot.style.left = `${Math.random() * 100}vw`;
            dot.style.top = `${Math.random() * 100}vh`;
            dot.style.backgroundColor = 'var(--dot-color)';
            floatingDotsContainer.appendChild(dot);
        }
    }

    function animateDots() {
        const dots = document.querySelectorAll('.dot');
        const mouse = { x: Infinity, y: Infinity };
        const repelDistance = 100;
        const repelStrength = 0.1;

        dots.forEach(dot => {
            const speedX = (Math.random() - 0.5) * 0.02;
            const speedY = (Math.random() - 0.5) * 0.02;
            let posX = parseFloat(dot.style.left);
            let posY = parseFloat(dot.style.top);

            function move() {
                const dx = mouse.x - posX;
                const dy = mouse.y - posY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < repelDistance) {
                    const angle = Math.atan2(dy, dx);
                    posX -= Math.cos(angle) * repelStrength * (repelDistance - distance) / repelDistance;
                    posY -= Math.sin(angle) * repelStrength * (repelDistance - distance) / repelDistance;
                }

                posX += speedX;
                posY += speedY;

                // Wrap around the screen
                if (posX > 100) posX = 0;
                if (posX < 0) posX = 100;
                if (posY > 100) posY = 0;
                if (posY < 0) posY = 100;

                dot.style.left = `${posX}vw`;
                dot.style.top = `${posY}vh`;
                requestAnimationFrame(move);
            }

            move();
        });

        function handleMouseMove(e) {
            mouse.x = (e.clientX / window.innerWidth) * 100;
            mouse.y = (e.clientY / window.innerHeight) * 100;
        }

        document.addEventListener('mousemove', handleMouseMove);
    }

    createDots();
    animateDots();

    // Update dot color when switching between light and dark mode
    function updateDotColor() {
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => {
            dot.style.backgroundColor = 'var(--dot-color)';
        });
    }

    // Modify the existing toggleDarkMode function
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
        updateModeToggleIcon();
        updateDotColor();
    }

    // Mouse parallax effect for background image
    const backgroundContainer = document.querySelector('.background-container');
    const parallaxImage = document.querySelector('.background-image');

    let mouseX = 0;
    let mouseY = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    function updateParallax() {
        const maxMove = 50; // Maximum pixels to move
        const moveX = Math.max(-maxMove, Math.min(maxMove, (mouseX / windowWidth) * 60 - 30));
        const moveY = Math.max(-maxMove, Math.min(maxMove, (mouseY / windowHeight) * 60 - 30));

        parallaxImage.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        requestAnimationFrame(updateParallax);
    }

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
        windowWidth = window.innerWidth;
        windowHeight = window.innerHeight;
    });

    updateParallax();

    // Add this code near the beginning of the file, after the DOMContentLoaded event listener
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav ul');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });

    // Close the menu when a link is clicked
    mainNav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mainNav.classList.remove('show');
        }
    });

    // Close the menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav') && !e.target.closest('.menu-toggle')) {
            mainNav.classList.remove('show');
        }
    });
});