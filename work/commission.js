// Initialize EmailJS
(function() {
    // Replace with your EmailJS user ID
    emailjs.init("HriZKuHYDSzvKnppaHBXm");
})();

// Portfolio items data - you can replace with actual data
const portfolioItems = [
    {
        id: 1,
        category: "posters",
        image: "../work/posters/Deadpool And Wolverine.png", // Update with actual path
        title: "Movie Poster Design",
        description: "Deadpool and Wolverine Movie Poster Design"
    },
    {
        id: 2,
        category: "posters",
        image: "../work/posters/Prime Enegry Drink.png", // Update with actual path
        title: "Prime Energy Drink Poster",
        description: "Refreshing Prime Energy Drink Poster"
    },
    {
        id: 3,
        category: "advertisements",
        image: "../work/Advertisments/New Balance 550.png", // Update with actual path
        title: "New Balance 550 Advertisement",
        description: "Clean and modern Shoe advertisement"
    },
    {
        id: 4,
        category: "advertisements",
        image: "../work/Advertisments/Fire Chips.png", // Update with actual path
        title: "Brand Campaign",
        description: "Bold brand awareness campaign"
    },
    {
        id: 5,
        category: "thumbnails",
        image: "../work/thumbnails/Poppy Playtime.png", // Update with actual path
        title: "Video Thumbnail",
        description: "Eye-catching video thumbnail design"
    },
    {
        id: 6,
        category: "thumbnails",
        image: "../work/thumbnails/UNO Thumbnail.png", // Update with actual path
        title: "Content Thumbnail",
        description: "Engaging content thumbnail"
    }
    // Add more items as needed
];

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadPortfolioItems('all');
    setupServiceOptions();
    setupPricingButtons();
    setupFaqAccordion();
    setupImageViewerControls();
    setupFormSubmission();
    setupSectionAnimations();
});

// Load portfolio items based on selected category
function loadPortfolioItems(category) {
    const portfolioGrid = document.getElementById('portfolioGrid');
    portfolioGrid.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? portfolioItems 
        : portfolioItems.filter(item => item.category === category);
    
    filteredItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        portfolioItem.style.setProperty('--delay', index);
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="portfolio-img" data-id="${item.id}">
            <div class="portfolio-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
    
    // Add event listeners to the newly created images
    document.querySelectorAll('.portfolio-img').forEach(img => {
        img.addEventListener('click', function() {
            openImageViewer(this.getAttribute('src'), this.alt, this.getAttribute('data-id'));
        });
        
        // Add error handler for images
        img.onerror = function() {
            this.src = '/api/placeholder/400/320'; // Fallback placeholder
            console.error(`Failed to load image: ${this.src}`);
        };
    });
}

// Setup category tab functionality
document.querySelectorAll('.portfolio-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.portfolio-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        loadPortfolioItems(this.getAttribute('data-category'));
    });
});

// Setup service option selection
function setupServiceOptions() {
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('serviceType').value = this.getAttribute('data-service');
        });
    });
}

// Setup pricing buttons
function setupPricingButtons() {
    document.querySelectorAll('.request-btn').forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.getAttribute('data-package');
            document.getElementById('package').value = packageType;
            document.getElementById('requestForm').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Setup FAQ accordion functionality
function setupFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            faqItem.classList.toggle('active');
        });
    });
}

// Image viewer functionality
function setupImageViewerControls() {
    const imageViewer = document.getElementById('imageViewer');
    const fullImage = document.getElementById('fullImage');
    const imageCaption = document.getElementById('imageCaption');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    const closeButton = document.getElementById('imageClose');
    
    let currentImageId = 0;
    
    closeButton.addEventListener('click', function() {
        imageViewer.classList.remove('show');
    });
    
    prevButton.addEventListener('click', function() {
        navigateImages(-1);
    });
    
    nextButton.addEventListener('click', function() {
        navigateImages(1);
    });
    
    function navigateImages(direction) {
        let nextIndex = -1;
        const ids = portfolioItems.map(item => item.id);
        const currentIndex = ids.indexOf(parseInt(currentImageId));
        
        if (direction > 0) {
            nextIndex = (currentIndex + 1) % ids.length;
        } else {
            nextIndex = (currentIndex - 1 + ids.length) % ids.length;
        }
        
        const nextItem = portfolioItems.find(item => item.id === ids[nextIndex]);
        if (nextItem) {
            openImageViewer(nextItem.image, nextItem.title, nextItem.id);
        }
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!imageViewer.classList.contains('show')) return;
        
        if (e.key === 'Escape') {
            imageViewer.classList.remove('show');
        } else if (e.key === 'ArrowLeft') {
            navigateImages(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImages(1);
        }
    });
}

// Open image viewer with the selected image
function openImageViewer(src, title, id) {
    const imageViewer = document.getElementById('imageViewer');
    const fullImage = document.getElementById('fullImage');
    const imageCaption = document.getElementById('imageCaption');
    
    fullImage.src = src;
    imageCaption.textContent = title;
    currentImageId = parseInt(id);
    
    imageViewer.classList.add('show');
    
    // Add error handler for the full image
    fullImage.onerror = function() {
        fullImage.src = '/api/placeholder/600/400'; // Fallback placeholder
        console.error(`Failed to load fullsize image: ${src}`);
    };
}

// Form submission with EmailJS
function setupFormSubmission() {
    const form = document.getElementById('commissionForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Make sure a service type is selected
            const serviceType = document.getElementById('serviceType').value;
            if (!serviceType) {
                showModal('Missing Information', 'Please select a service type for your commission.');
                return;
            }
            
            // Collect form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                serviceType: serviceType,
                package: document.getElementById('package').value,
                description: document.getElementById('description').value,
                deadline: document.getElementById('deadline').value || 'No specific deadline',
                reference: document.getElementById('reference').value || 'No references provided'
            };
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Send the email using EmailJS
            emailjs.send(
                'service_ju4p16o', // Replace with your EmailJS service ID
                'template_wxcsu9l', // Replace with your EmailJS template ID
                formData
            )
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                form.reset();
                document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('selected'));
                successMessage.style.display = 'block';
                errorMessage.style.display = 'none';
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                errorMessage.style.display = 'block';
                successMessage.style.display = 'none';
            })
            .finally(function() {
                // Reset button state
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
}

// Show modal with custom message
function showModal(title, message) {
    const modal = document.getElementById('alertModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    
    modalTitle.textContent = title;
    modalContent.textContent = message;
    modal.classList.add('show');
    
    document.getElementById('modalClose').addEventListener('click', function() {
        modal.classList.remove('show');
    });
}

// Setup section animations on scroll
function setupSectionAnimations() {
    const sections = document.querySelectorAll('.section-transition');
    
    // Initial check for elements in viewport
    checkSections();
    
    // Check sections on scroll
    window.addEventListener('scroll', checkSections);
    
    function checkSections() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.classList.add('visible');
            }
        });
    }
}