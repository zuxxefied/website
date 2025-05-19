// Initialize EmailJS once the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Replace this with your actual EmailJS public key
    emailjs.init("41riFln0VrQezQCLO");
    
    // Elements
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const discordButton = document.getElementById('discordButton');
    const modal = document.getElementById('alertModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send email using EmailJS
            emailjs.send('dservice_9jaijii', 'template_6bya9amm', {
                from_name: formData.name,
                reply_to: formData.email,
                subject: formData.subject,
                message: formData.message
            })
            .then(function() {
                // Success
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(function() {
                    successMessage.style.display = 'none';
                }, 5000);
            })
            .catch(function(error) {
                // Error
                console.error('EmailJS error:', error);
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
                
                // Hide error message after 5 seconds
                setTimeout(function() {
                    errorMessage.style.display = 'none';
                }, 5000);
            })
            .finally(function() {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
    
    // Discord button functionality
    if (discordButton) {
        discordButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Show modal with Discord information
            showModal('Join My Discord', `
                <p>Thanks for your interest in joining my Discord community!</p>
                <p>Here's my Discord invite link: <a href="https://discord.gg/A8XFN64TDN" target="_blank" style="color: #7289DA; text-decoration: underline;">https://discord.gg/A8XFN64TDN</a></p>
                <p>You can also add me directly: <strong>zuxxie</strong></p>
                <p style="margin-top: 20px; font-size: 0.9rem; color: rgba(255,255,255,0.7);">I look forward to connecting with you there!</p>
            `);
        });
    }
    
    // Modal functionality
    function showModal(title, content) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modal.classList.add('show');
        
        // Disable scrolling on body
        document.body.style.overflow = 'hidden';
    }
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
    
    function closeModal() {
        modal.classList.remove('show');
        // Re-enable scrolling
        document.body.style.overflow = '';
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Form field animations and validation
    const formControls = document.querySelectorAll('.form-control');
    if (formControls) {
        formControls.forEach(control => {
            // Add focus effect
            control.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            control.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                
                // Simple validation
                if (this.value.trim() === '') {
                    this.classList.add('invalid');
                } else {
                    this.classList.remove('invalid');
                }
            });
            
            // Remove invalid class when typing
            control.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.remove('invalid');
                }
            });
        });
    }
    
    // Add floating animations to UI elements
    function addFloatingAnimation() {
        const contactInfo = document.querySelector('.contact-info');
        const contactForm = document.querySelector('.contact-form');
        
        if (contactInfo && contactForm) {
            // Subtle floating animation for the contact boxes
            let floatY = 0;
            let direction = 1;
            
            function floatAnimation() {
                floatY += 0.05 * direction;
                
                if (floatY > 5) direction = -1;
                if (floatY < 0) direction = 1;
                
                contactInfo.style.transform = `translateY(${floatY * 0.3}px)`;
                contactForm.style.transform = `translateY(${-floatY * 0.2}px)`;
                
                requestAnimationFrame(floatAnimation);
            }
            
            // Only start animation on desktop
            if (window.innerWidth > 768) {
                requestAnimationFrame(floatAnimation);
            }
        }
    }
    
    // Intersection Observer for scroll animations
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.contact-info, .contact-form-container');
        animatedElements.forEach(el => observer.observe(el));
    }
    
    // Parallax effect for background circles
    function setupParallax() {
        const circles = document.querySelectorAll('.blurred-circle');
        
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            circles.forEach((circle, index) => {
                const speed = index === 0 ? 30 : 20;
                circle.style.transform = `translate(${x * speed - speed/2}px, ${y * speed - speed/2}px)`;
            });
        });
    }
    
    // Initialize all animations
    addFloatingAnimation();
    setupScrollAnimations();
    setupParallax();
    
    // Form input enhancement
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        // Add active class to parent when input has value
        input.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
        
        // Check initial state (in case of browser autofill)
        if (input.value) {
            input.classList.add('has-value');
        }
    });
});