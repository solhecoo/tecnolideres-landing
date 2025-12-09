/**
 * TECNOLÍDERES - Main JavaScript
 * Landing Page Interactivity & Animations
 */

// ====================================
// Wait for DOM to be ready
// ====================================
document.addEventListener('DOMContentLoaded', function() {

    // ====================================
    // Initialize AOS (Animate On Scroll)
    // ====================================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    // ====================================
    // Header Scroll Effect
    // ====================================
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ====================================
    // Mobile Menu Toggle
    // ====================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');

            // Toggle icon between hamburger and X
            const icon = mobileMenuBtn.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            } else {
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
            }
        });

        // Close mobile menu when clicking a link
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('svg');
                icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>';
            });
        });
    }

    // ====================================
    // Smooth Scroll for Anchor Links
    // ====================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            // Skip if it's just "#"
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====================================
    // Counter Animation
    // ====================================
    const counters = document.querySelectorAll('.counter');
    let countersAnimated = false;

    function animateCounters() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix') || '';
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };

            updateCounter();
        });
    }

    // Intersection Observer for counter animation
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ====================================
    // Form Handling
    // ====================================
    const form = document.getElementById('volunteer-form');
    const submitBtn = document.getElementById('submit-btn');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');

    // Form validation
    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const orgType = document.getElementById('org-type').value;
        const volunteerTypes = document.querySelectorAll('input[name="volunteer-type"]:checked');

        if (!name || !email || !orgType || volunteerTypes.length === 0) {
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }

        return true;
    }

    // Checkbox styling
    document.querySelectorAll('.volunteer-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('label');
            if (this.checked) {
                label.classList.add('border-electric-blue', 'bg-blue-50');
                label.classList.remove('border-gray-300');
            } else {
                label.classList.remove('border-electric-blue', 'bg-blue-50');
                label.classList.add('border-gray-300');
            }
        });
    });

    // Form submission
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            if (!validateForm()) {
                // Show validation error
                const invalidFields = form.querySelectorAll(':invalid');
                invalidFields.forEach(field => {
                    field.classList.add('border-red-500');
                });
                return;
            }

            // Show loading state
            const originalBtnContent = submitBtn.innerHTML;
            submitBtn.innerHTML = '<div class="spinner mx-auto"></div>';
            submitBtn.disabled = true;

            // Collect form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                orgType: document.getElementById('org-type').value,
                volunteerTypes: Array.from(document.querySelectorAll('input[name="volunteer-type"]:checked')).map(cb => cb.value),
                message: document.getElementById('message').value.trim(),
                timestamp: new Date().toISOString()
            };

            try {
                // Send to Google Sheets
                const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby1PL_cw3UuBUtVyFlDMu8wNV3lsfgMjlFAOwvU3DdnNYUjETJprCnQGanLQNPZvostTA/exec';

                // Enviar datos a Google Sheets
                await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                // Show success message
                successMessage.classList.remove('hidden');
                errorMessage.classList.add('hidden');
                form.reset();

                // Reset checkbox styles
                document.querySelectorAll('.volunteer-checkbox').forEach(label => {
                    label.classList.remove('border-electric-blue', 'bg-blue-50');
                    label.classList.add('border-gray-300');
                });

                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

            } catch (error) {
                console.error('Form submission error:', error);
                errorMessage.classList.remove('hidden');
                successMessage.classList.add('hidden');
            } finally {
                // Reset button
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
            }
        });

        // Remove error styling on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', function() {
                this.classList.remove('border-red-500');
            });
        });
    }

    // ====================================
    // Intersection Observer for Animations
    // ====================================
    const animateElements = document.querySelectorAll('[data-animate]');

    if (animateElements.length > 0) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    animationObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(el => {
            animationObserver.observe(el);
        });
    }

    // ====================================
    // Parallax Effect for Hero
    // ====================================
    const heroSection = document.getElementById('inicio');
    const floatingElements = document.querySelectorAll('.floating, .floating-slow, .floating-fast');

    if (heroSection && floatingElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (scrolled < window.innerHeight) {
                floatingElements.forEach((el, index) => {
                    const direction = index % 2 === 0 ? 1 : -1;
                    el.style.transform = `translateY(${rate * direction * 0.5}px)`;
                });
            }
        });
    }

    // ====================================
    // Card Tilt Effect (Optional)
    // ====================================
    const cards = document.querySelectorAll('[data-tilt]');

    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ====================================
    // Console Easter Egg
    // ====================================
    console.log('%c🚀 Tecnolíderes', 'font-size: 24px; font-weight: bold; color: #3B82F6;');
    console.log('%c¿Te interesa la tecnología? ¡Únete a nuestra comunidad!', 'font-size: 14px; color: #8B5CF6;');
    console.log('%chttps://tecnolideres.org', 'font-size: 12px; color: #06B6D4;');

}); // End DOMContentLoaded

// ====================================
// Preloader (Optional)
// ====================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
