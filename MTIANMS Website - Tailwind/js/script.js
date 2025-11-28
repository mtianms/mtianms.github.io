// ===== TYPING ANIMATION =====
let typingText;
const texts = ['Video Editor', 'Motion Graphic Designer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;
let isFirstLoad = true;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    typingText = document.getElementById('typing-text');

    // Set initial text immediately
    if (typingText) {
        typingText.textContent = 'Video Editor';
    }
});

function typeText() {
    const currentText = texts[textIndex];

    // Update gradient color based on current text
    // const gradientTextElement = typingText.parentElement;
    // if (textIndex === 1) {
    //     // Motion Graphic Designer - pink gradient
    //     gradientTextElement.classList.add('pink');
    // } else {
    //     // Video Editor - blue gradient
    //     gradientTextElement.classList.remove('pink');
    // }

    // On first load, show "Video Editor" immediately
    if (isFirstLoad) {
        typingText.textContent = texts[0];
        charIndex = texts[0].length;
        isFirstLoad = false;
        typingSpeed = 2000; // Pause before starting to delete
        isDeleting = true;
        setTimeout(typeText, typingSpeed);
        return;
    }

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 30;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentText.length) {
        // Pause at end
        typingSpeed = 1200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 300;
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation after page load
window.addEventListener('load', () => {
    setTimeout(typeText, 1000);
});

// ===== SMOOTH SCROLL BEHAVIOR =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== BUTTON INTERACTION EFFECTS =====
const ctaButton = document.querySelector('.cta-button');

if (ctaButton) {
    // Add ripple effect on click
    ctaButton.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        setTimeout(() => ripple.remove(), 600);
    });
}

// ===== SCROLL REVEAL ANIMATION =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.hero-content').forEach(el => {
    observer.observe(el);
});

// ===== PERFORMANCE: REDUCE MOTION FOR ACCESSIBILITY =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--transition-smooth', 'none');
}

// ===== DYNAMIC GRADIENT BACKGROUND =====
const bgGradients = document.querySelectorAll('.bg-gradient-1, .bg-gradient-2, .bg-gradient-3');

function updateGradientPositions() {
    const scrollY = window.scrollY;
    bgGradients.forEach((gradient, index) => {
        const speed = (index + 1) * 0.05;
        gradient.style.transform = `translateY(${scrollY * speed}px)`;
    });
}

// Throttle scroll event for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateGradientPositions();
            ticking = false;
        });
        ticking = true;
    }
});

// ===== LOADING ANIMATION =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #ff6b9d;');
console.log('%cLooking for something? Feel free to reach out!', 'font-size: 14px; color: #c084fc;');
console.log('%c✨ Built with passion by Tian', 'font-size: 12px; color: #60a5fa;');
