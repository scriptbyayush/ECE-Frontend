// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');
const backToTop = document.getElementById('backToTop');
const facultySlider = document.getElementById('facultySlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('active') && 
        !e.target.closest('.nav-menu') && 
        !e.target.closest('.mobile-menu-btn')) {
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
            
            // Get header height for offset
            const headerHeight = document.querySelector('.header').offsetHeight;
            
            // Scroll to target with offset
            window.scrollTo({
                top: targetElement.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button visibility
window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    // Add animation to elements when they come into view
    document.querySelectorAll('.fade-in').forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight - 100) {
            element.classList.add('visible');
        }
    });
});

// Back to top functionality
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize stats counter animation
function animateCounter() {
    document.querySelectorAll('.count').forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = Math.trunc(target / 100);
        
        if (count < target) {
            counter.innerText = count + increment;
            setTimeout(animateCounter, 30);
        } else {
            counter.innerText = target;
        }
    });
}

// Faculty slider functionality
if (facultySlider) {
    const cardWidth = 280 + 20; // card width + gap
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            facultySlider.scrollLeft -= cardWidth;
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            facultySlider.scrollLeft += cardWidth;
        });
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Trigger fade-in for elements above the fold
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight) {
                element.classList.add('visible');
            }
        });
    }, 300);
    
    // Initialize the counter animation when stats section is in view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});