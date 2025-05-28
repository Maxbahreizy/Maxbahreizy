// script.js

// Header Toggle Menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
});

nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
            menuToggle.textContent = '☰';
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Intersection Observer untuk Animasi Saat Elemen Masuk Viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Hentikan observasi setelah elemen terlihat
        }
    });
}, observerOptions);

// Terapkan observer ke elemen dengan class 'animate-on-scroll'
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    observer.observe(element);
});

// Modal Functionality
const projectButtons = document.querySelectorAll('.project-btn');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-btn');

projectButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = button.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        modal.style.display = 'flex';
        // Animasi tambahan untuk modal saat muncul
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
            modal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    });
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        modals.forEach(modal => {
            modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
            modal.querySelector('.modal-content').style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Sesuaikan dengan durasi animasi CSS
        });
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        modals.forEach(modal => {
            modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
            modal.querySelector('.modal-content').style.opacity = '0';
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Sesuaikan dengan durasi animasi CSS
        });
    }
});

// Animasi Parallax untuk Home Section
const homeSection = document.querySelector('#home');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    homeSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`; // Efek parallax
});

// Animasi untuk Social Icons (Pulsate on Hover)
const socialIcons = document.querySelectorAll('.social-icons a');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'pulsate 0.5s ease-in-out';
    });
    icon.addEventListener('animationend', () => {
        icon.style.animation = ''; // Reset animasi setelah selesai
    });
});

// Smooth Scroll untuk Nav Links (Override CSS Smooth Scroll untuk Efek Lebih Halus)
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 80, // Sesuaikan dengan tinggi header
            behavior: 'smooth'
        });
    });
});