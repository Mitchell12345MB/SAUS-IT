document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    const heroButtons = document.querySelectorAll('.hero-button');
    let buttonsVisible = false;

    function toggleButtons(show) {
        heroButtons.forEach((button, index) => {
            setTimeout(() => {
                button.classList.toggle('visible', show);
            }, index * 100);
        });
        buttonsVisible = show;
    }

    function handleScroll() {
        const scrollPosition = window.scrollY;
        const heroSection = document.getElementById('hero');
        const heroHeight = heroSection.offsetHeight;
        const scrollThreshold = heroHeight / 30;

        if (scrollPosition > scrollThreshold && !buttonsVisible) {
            toggleButtons(true);
        } else if (scrollPosition <= scrollThreshold && buttonsVisible) {
            toggleButtons(false);
        }
    }

    window.addEventListener('scroll', handleScroll);

    function handlePageTransitions() {
        const sections = ['about', 'projects', 'downloads', 'it-services', 'contact'];
        
        sections.forEach(section => {
            const button = document.querySelector(`.hero-button[data-type="${section}"]`);
            const backButton = document.getElementById(section).querySelector('.back-button');

            button.addEventListener('click', () => {
                document.body.style.overflow = 'hidden';
                showSection(section);
            });

            backButton.addEventListener('click', () => {
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
        console.log('Toggle music clicked. Current state:', isMusicPlaying);
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicToggle.innerHTML = '🎵';
            isMusicPlaying = false;
        } else {
            const playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Music started playing');
                    musicToggle.innerHTML = '🔇';
                    isMusicPlaying = true;
                }).catch(error => {
                    console.error('Error playing music:', error);
                    musicToggle.innerHTML = '🎵';
                    isMusicPlaying = false;
                });
            }
        }
    }

    musicToggle.addEventListener('click', toggleMusic);

    // Add this line to ensure autoplay is disabled
    backgroundMusic.autoplay = false;

    // Add these lines after the toggleMusic function
    backgroundMusic.addEventListener('play', () => {
        musicToggle.innerHTML = '🔇';
        isMusicPlaying = true;
    });

    backgroundMusic.addEventListener('pause', () => {
        musicToggle.innerHTML = '🎵';
        isMusicPlaying = false;
    });

    // Preload the audio
    backgroundMusic.load();

    // Ensure the audio is ready before allowing interaction
    backgroundMusic.addEventListener('canplaythrough', () => {
        musicToggle.disabled = false;
    }, { once: true });

    // Initially disable the button until the audio is ready
    musicToggle.disabled = true;

    // Add an error event listener to catch and log any loading errors
    backgroundMusic.addEventListener('error', (e) => {
        console.error('Error loading audio file:', e);
    });

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
        const repelDistance = 50; // Adjusted repel distance
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

    const projectsSection = document.getElementById('projects');
    const projectsList = projectsSection.querySelector('ul');

    async function fetchGitHubProjects() {
        try {
            const response = await fetch('https://api.github.com/users/Mitchell12345MB/repos');
            const repos = await response.json();

            repos.forEach(repo => {
                const projectItem = document.createElement('li');
                projectItem.classList.add('project-item');

                projectItem.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description available'}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;

                projectsList.appendChild(projectItem);
            });
        } catch (error) {
            console.error('Error fetching GitHub projects:', error);
        }
    }

    fetchGitHubProjects();

    // Function to fetch releases from GitHub
    async function fetchLatestReleases() {
        const repoOwner = 'Mitchell12345MB';
        const repoNames = 'Super-Saiyan-Transformations, SSJProject, XBox360App, Windows-Modifications'.split(',').map(name => name.trim());

        const allReleases = [];

        for (const repoName of repoNames) {
            const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases`;

            try {
                const response = await fetch(apiUrl);
                const releases = await response.json();

                if (Array.isArray(releases) && releases.length > 0) {
                    const latestRelease = releases.reduce((latest, release) => {
                        return new Date(release.published_at) > new Date(latest.published_at) ? release : latest;
                    }, releases[0]);

                    allReleases.push(latestRelease);
                } else {
                    console.warn(`No releases found for ${repoName}`);
                }
            } catch (error) {
                console.error(`Error fetching releases for ${repoName}:`, error);
            }
        }

        displayReleases(allReleases.filter(release => release !== undefined));
    }

    // Function to display releases in the downloads section
    function displayReleases(releases) {
        const downloadsList = document.querySelector('.downloads-list');
        downloadsList.innerHTML = ''; // Clear existing content

        releases.forEach(release => {
            const releaseItem = document.createElement('li');
            releaseItem.classList.add('download-item');
            releaseItem.innerHTML = `
                <h3>${release.name}</h3>
                <p>${release.published_at}</p>
                <p>${release.body}</p>
                <a href="${release.html_url}" target="_blank">View Release</a>
            `;
            downloadsList.appendChild(releaseItem);
        });
    }

    // Call the function to fetch and display the latest releases
    fetchLatestReleases();
});