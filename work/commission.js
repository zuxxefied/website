document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("41riFln0VrQezQCLO"); // Your EmailJS public key

    loadPortfolioItems('all');
    setupServiceOptions();
    setupPricingButtons();
    setupFaqAccordion();
    setupImageViewerControls();
    setupFormSubmission();
    setupSectionAnimations();
});

// ---------------- Portfolio ----------------
const portfolioItems = [
    {
        id: 1,
        category: "posters",
        image: "../work/posters/Deadpool And Wolverine.png",
        title: "Movie Poster Design",
        description: "Deadpool and Wolverine Movie Poster Design"
    },
    {
        id: 2,
        category: "posters",
        image: "../work/posters/Prime Enegry Drink.png",
        title: "Prime Energy Drink Poster",
        description: "Refreshing Prime Energy Drink Poster"
    },
    {
        id: 3,
        category: "advertisements",
        image: "../work/Advertisments/New Balance 550.png",
        title: "New Balance 550 Advertisement",
        description: "Clean and modern Shoe advertisement"
    },
    {
        id: 4,
        category: "advertisements",
        image: "../work/Advertisments/Fire Chips.png",
        title: "Brand Campaign",
        description: "Bold brand awareness campaign"
    },
    {
        id: 5,
        category: "thumbnails",
        image: "../work/thumbnails/Poppy Playtime.png",
        title: "Video Thumbnail",
        description: "Eye-catching video thumbnail design"
    },
    {
        id: 6,
        category: "thumbnails",
        image: "../work/thumbnails/UNO Thumbnail.png",
        title: "Content Thumbnail",
        description: "Engaging content thumbnail"
    }
];

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

    document.querySelectorAll('.portfolio-img').forEach(img => {
        img.addEventListener('click', function () {
            openImageViewer(this.getAttribute('src'), this.alt, this.getAttribute('data-id'));
        });

        img.onerror = function () {
            this.src = '/api/placeholder/400/320';
            console.error(`Failed to load image: ${this.src}`);
        };
    });
}

document.querySelectorAll('.portfolio-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.portfolio-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        loadPortfolioItems(this.getAttribute('data-category'));
    });
});

// ---------------- Service Options ----------------
function setupServiceOptions() {
    document.querySelectorAll('.service-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            document.getElementById('serviceType').value = this.getAttribute('data-service');
        });
    });
}

// ---------------- Pricing Package Buttons ----------------
function setupPricingButtons() {
    document.querySelectorAll('.request-btn').forEach(button => {
        button.addEventListener('click', function () {
            const packageType = this.getAttribute('data-package');
            document.getElementById('package').value = packageType;
            document.getElementById('requestForm').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ---------------- FAQ Accordion ----------------
function setupFaqAccordion() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function () {
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

// ---------------- Image Viewer ----------------
function setupImageViewerControls() {
    const imageViewer = document.getElementById('imageViewer');
    const fullImage = document.getElementById('fullImage');
    const imageCaption = document.getElementById('imageCaption');
    const prevButton = document.getElementById('prevImage');
    const nextButton = document.getElementById('nextImage');
    const closeButton = document.getElementById('imageClose');

    let currentImageId = 0;

    closeButton.addEventListener('click', function () {
        imageViewer.classList.remove('show');
    });

    prevButton.addEventListener('click', function () {
        navigateImages(-1);
    });

    nextButton.addEventListener('click', function () {
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

    document.addEventListener('keydown', function (e) {
        if (!imageViewer.classList.contains('show')) return;

        if (e.key === 'Escape') imageViewer.classList.remove('show');
        else if (e.key === 'ArrowLeft') navigateImages(-1);
        else if (e.key === 'ArrowRight') navigateImages(1);
    });

    function openImageViewer(src, title, id) {
        fullImage.src = src;
        imageCaption.textContent = title;
        currentImageId = parseInt(id);
        imageViewer.classList.add('show');

        fullImage.onerror = function () {
            fullImage.src = '/api/placeholder/600/400';
            console.error(`Failed to load full image: ${src}`);
        };
    }
}

// ---------------- EmailJS Form Submission ----------------
function setupFormSubmission() {
    const form = document.getElementById('commissionForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const serviceType = document.getElementById('serviceType').value;
        if (!serviceType) {
            showModal('Missing Information', 'Please select a service type for your commission.');
            return;
        }

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service_type: serviceType,
            package: document.getElementById('package').value,
            description: document.getElementById('description').value,
            deadline: document.getElementById('deadline').value || 'No specific deadline',
            reference: document.getElementById('reference').value || 'No references provided'
        };

        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;

        submitButton.textContent = "Sending...";
        submitButton.disabled = true;

        emailjs.send("service_9jaijii", "template_6bya9am", formData)
            .then(function () {
                successMessage.style.display = "block";
                errorMessage.style.display = "none";
                form.reset();
                document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('selected'));
                setTimeout(() => successMessage.style.display = "none", 5000);
            })
            .catch(function (error) {
                console.error("FAILED...", error);
                errorMessage.style.display = "block";
                successMessage.style.display = "none";
            })
            .finally(function () {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
}

// ---------------- Simple Section Animation ----------------
function setupSectionAnimations() {
    const sections = document.querySelectorAll('.section-transition');

    function handleScroll() {
        const windowHeight = window.innerHeight;
        sections.forEach(section => {
            const position = section.getBoundingClientRect().top;
            if (position < windowHeight - 100) {
                section.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
}

// ---------------- Modal Helper ----------------
function showModal(title, message) {
    const modal = document.getElementById("alertModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalContent = document.getElementById("modalContent");
    const modalClose = document.getElementById("modalClose");

    modalTitle.textContent = title;
    modalContent.innerHTML = `<p>${message}</p>`;
    modal.classList.add("show");

    modalClose.onclick = function () {
        modal.classList.remove("show");
    };
}
