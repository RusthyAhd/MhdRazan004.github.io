// ===== SMOOTH SCROLLING & NAVBAR HIGHLIGHTING =====
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
    });

    // Close menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
        });
    });

    // Navbar highlighting on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// ===== PARTICLE ANIMATION ENHANCEMENT =====
function createFloatingParticles() {
    const container = document.querySelector('.floating-particles');
    if (!container) return;

    // Animate particles continuously
    setInterval(() => {
        const particles = container.querySelectorAll('.particle');
        particles.forEach(particle => {
            const randomX = Math.random() * 200 - 100;
            const randomY = Math.random() * 200 - 100;
            particle.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    }, 5000);
}

// ===== GLOWING ORB ENHANCED ANIMATION =====
function enhanceOrbAnimation() {
    const orb = document.querySelector('.glowing-orb');
    if (!orb) return;

    document.addEventListener('mousemove', (e) => {
        const rect = orb.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        if (distance < 300) {
            const angle = Math.atan2(y, x);
            const offsetX = Math.cos(angle) * 10;
            const offsetY = Math.sin(angle) * 10;
            orb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        }
    });
}

// ===== SCROLL REVEAL ANIMATIONS =====
function setupScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.about-text, .feature-card, .skill-category, .timeline-content, .project-card, .education-card, .contact-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Add CSS animation for reveal
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// ===== COUNTER ANIMATION =====
function animateCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                const targetText = entry.target.textContent;
                const targetValue = parseInt(targetText);
                const duration = 2000;
                const steps = 60;
                const increment = targetValue / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetValue) {
                        entry.target.textContent = targetText;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current) + '+';
                    }
                }, duration / steps);
            }
        });
    });

    statNumbers.forEach(stat => observer.observe(stat));
}

// ===== FORM SUBMISSION =====
function setupFormSubmission() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const inputs = form.querySelectorAll('input, textarea');
        let formData = {};
        inputs.forEach(input => {
            formData[input.name || input.placeholder] = input.value;
        });

        // Show success message
        const button = form.querySelector('button');
        const originalText = button.textContent;
        button.textContent = 'Message Sent Successfully! ✓';
        button.style.background = 'var(--accent-color)';
        button.style.color = 'var(--darker-bg)';

        // Reset form
        form.reset();

        // Restore button
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.style.color = '';
        }, 3000);

        console.log('Form submitted:', formData);
    });
}

// ===== SKILL TAGS INTERACTION =====
function setupSkillTags() {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

// ===== PARALLAX EFFECT =====
function setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const scrollPosition = window.pageYOffset;
            const elementOffset = el.offsetTop;
            const distance = scrollPosition - elementOffset;
            el.style.transform = `translateY(${distance * 0.5}px)`;
        });
    });
}

// ===== TYPING ANIMATION FOR HERO SUBTITLE =====
function setupTypingAnimation() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;

    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    let index = 0;
    function typeWriter() {
        if (index < originalText.length) {
            subtitle.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing when page loads
    setTimeout(typeWriter, 500);
}

// ===== CURSOR GLOW EFFECT =====
function setupCursorGlow() {
    const cursorGlow = document.createElement('div');
    cursorGlow.className = 'cursor-glow';
    cursorGlow.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid rgba(0, 212, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 15px rgba(0, 212, 255, 0.3);
        display: none;
        z-index: 9999;
    `;
    document.body.appendChild(cursorGlow);

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.display = 'block';
            cursorGlow.style.left = e.clientX - 15 + 'px';
            cursorGlow.style.top = e.clientY - 15 + 'px';
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.style.display = 'none';
        });
    }
}

// ===== ENHANCE MOBILE MENU =====
function enhanceMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        hamburger.style.transition = 'transform 0.3s ease';
        
        if (navMenu.classList.contains('active')) {
            hamburger.querySelectorAll('span').forEach((span, index) => {
                span.style.transform = '';
            });
        } else {
            hamburger.querySelectorAll('span').forEach((span, index) => {
                if (index === 0) span.style.transform = 'rotate(45deg) translateY(10px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-10px)';
            });
        }
    });
}

// ===== ADD GLOW TO INTERACTIVE ELEMENTS ON HOVER =====
function setupInteractiveGlow() {
    const glowElements = document.querySelectorAll('.btn, .nav-link, .skill-tag, .project-card, .feature-card');

    glowElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    createFloatingParticles();
    enhanceOrbAnimation();
    setupScrollReveal();
    animateCounters();
    setupFormSubmission();
    setupSkillTags();
    setupParallax();
    setupTypingAnimation();
    setupCursorGlow();
    enhanceMobileMenu();
    setupInteractiveGlow();

    // Add smooth scroll to buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

// ===== HANDLE PAGE VISIBILITY =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.filter = 'brightness(0.7)';
    } else {
        document.body.style.filter = 'brightness(1)';
    }
});

// ===== PERFORMANCE: Lazy load images =====
function lazyLoadImages() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.5s ease';
                entry.target.style.opacity = '1';
                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach(img => {
        img.style.opacity = '0';
        imageObserver.observe(img);
    });
}

window.addEventListener('load', () => {
    lazyLoadImages();
});

// ===== DEVICE ORIENTATION CHANGE =====
window.addEventListener('orientationchange', () => {
    window.scrollTo(0, 0);
});

console.log('🚀 Mohamed Razan Portfolio Loaded Successfully!');
console.log('✨ Supernatural space theme activated!');
