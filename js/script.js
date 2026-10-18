// ==========================================
// TUSHARANSHU KUMAR - PORTFOLIO SCRIPTS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== TYPED.JS INITIALIZATION =====
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-element', {
            strings: [
                'Software Developer',
                'Data Scientist',
                'Python Developer',
                'Full Stack Developer',
                'Web Developer',
                'Django Expert'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            cursorChar: '|'
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Header background on scroll
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to top visibility
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll position
        updateActiveNav();
    });

    // ===== MOBILE NAVIGATION =====
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.getElementById('navbar');

    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    // ===== ACTIVE NAVIGATION UPDATE =====
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // ===== SCROLL ANIMATIONS (Intersection Observer) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Animate skill bars when visible
                if (entry.target.closest('.skills-category')) {
                    animateSkillBars(entry.target);
                }

                // Animate stat counters
                if (entry.target.closest('.about-stats')) {
                    animateCounters(entry.target);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // ===== SKILL BAR ANIMATION =====
    let skillsAnimated = false;
    function animateSkillBars(container) {
        if (skillsAnimated) return;
        skillsAnimated = true;

        const bars = document.querySelectorAll('.skill-progress');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                bar.classList.add('animated');
            }, index * 100);
        });
    }

    // ===== COUNTER ANIMATION =====
    let countersAnimated = false;
    function animateCounters(container) {
        if (countersAnimated) return;
        countersAnimated = true;

        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // ===== PARTICLE EFFECT =====
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        createParticles();
    }

    function createParticles() {
        const count = 30;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
            particle.style.animationDelay = (Math.random() * 8) + 's';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;

            // Alternate between cyan and purple
            if (Math.random() > 0.5) {
                particle.style.background = '#00d4ff';
                particle.style.boxShadow = '0 0 6px rgba(0, 212, 255, 0.5)';
            } else {
                particle.style.background = '#7c3aed';
                particle.style.boxShadow = '0 0 6px rgba(124, 58, 237, 0.5)';
            }

            particlesContainer.appendChild(particle);
        }
    }

    // ===== SMOOTH SCROLL FOR NAV LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== TRIGGER HERO ANIMATIONS ON LOAD =====
    setTimeout(() => {
        document.querySelectorAll('.hero .animate-on-scroll').forEach(el => {
            el.classList.add('visible');
        });
    }, 200);

});
