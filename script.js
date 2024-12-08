// Initialize Three.js scene for geometric shapes
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector('.geometric-shapes').appendChild(renderer.domElement);

// Create geometric shapes
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ 
    color: 0x64ffda,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Smooth scrolling for all navigation links and scroll icon
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerOffset = 100;
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            const offsetPosition = targetElement.offsetTop - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0)';
    } else {
        navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// Typing animation for subtitle
const subtitle = document.querySelector('.subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing animation when the element is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter();
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(subtitle);
}

// Scroll animations for sections
const sections = document.querySelectorAll('section');
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            sectionObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    section.classList.add('fade-in');
    sectionObserver.observe(section);
});

// Skill cards animation
document.querySelectorAll('.skill-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
                cardObserver.unobserve(card);
            }
        });
    }, { threshold: 0.2 });

    cardObserver.observe(card);
});

// Mouse parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach(shape => {
        const speed = shape.getAttribute('data-speed') || 2;
        const xOffset = (x - 0.5) * speed;
        const yOffset = (y - 0.5) * speed;
        shape.style.transform = `translate(${xOffset}rem, ${yOffset}rem)`;
    });
});

// SVG scroll to expertise section
const scrollSvg = document.querySelector('.scroll-link svg');
scrollSvg.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('expertise').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Form animations and validation
const formGroups = document.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    input.addEventListener('focus', () => {
        label.classList.add('active');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            label.classList.remove('active');
        }
    });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        this.querySelectorAll('input, textarea').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.parentElement.classList.add('error');
            } else {
                field.parentElement.classList.remove('error');
            }
        });

        if (isValid) {
            const button = this.querySelector('.btn');
            button.classList.add('success');
            button.textContent = 'Message Sent!';
            
            setTimeout(() => {
                this.reset();
                button.classList.remove('success');
                button.textContent = 'Send Message';
                formGroups.forEach(group => {
                    group.querySelector('label').classList.remove('active');
                });
            }, 2000);
        }
    });
}

// Update active navigation link on scroll
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const fromTop = window.scrollY + 150;

    navLinks.forEach(link => {
        const section = document.querySelector(link.hash);
        
        if (section.offsetTop <= fromTop && 
            section.offsetTop + section.offsetHeight > fromTop) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// Scroll button animation
const scrollButton = document.querySelector('.mouse');
let hasAnimated = false;

window.addEventListener('scroll', () => {
    if (!hasAnimated && window.scrollY > 50) {
        scrollButton.classList.add('animate');
        hasAnimated = true;
    }
});

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
    });
    scrollButton.classList.add('animate');
    hasAnimated = true;
}); 