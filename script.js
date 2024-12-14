// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
                hamburger.classList.remove('active');
            }
        }
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');

function sendEmail(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    const mailtoLink = `mailto:drakshayani.rcsm@gmail.com?subject=Contact Form Submission from ${name}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    
    window.location.href = mailtoLink;
}

contactForm.addEventListener('submit', sendEmail);

// Clear form after submission
document.getElementById('contact-form').addEventListener('submit', function() {
    setTimeout(() => {
        this.reset();
    }, 1000);
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animate Services Cards on Scroll
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            menuOpen = false;
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Handle touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;

    document.addEventListener('touchstart', e => {
        touchStartY = e.touches[0].clientY;
    }, false);

    document.addEventListener('touchmove', e => {
        if (menuOpen) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchend', e => {
        touchEndY = e.changedTouches[0].clientY;
        if (menuOpen && touchStartY - touchEndY > 50) {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            menuOpen = false;
        }
    }, false);
});

// Chatbot functionality
const chatbotHTML = `
    <div id="chatbot" class="chatbot-container">
        <div class="chatbot-header">
            <h3>Chat with us</h3>
            <button id="close-chat">×</button>
        </div>
        <div id="chat-messages" class="chat-messages"></div>
        <div class="chat-input-container">
            <input type="text" id="chat-input" placeholder="Type your message...">
            <button id="send-message">Send</button>
        </div>
    </div>
    <button id="chat-toggle" class="chat-toggle">
        <i class="fas fa-comments"></i>
    </button>
`;

// Add chatbot HTML to the body
document.body.insertAdjacentHTML('beforeend', chatbotHTML);

// Chatbot functionality
const chatbot = {
    messages: [],
    responses: {
        greeting: ["Hello! How can I help you today?", "Hi there! What can I do for you?"],
        services: ["We offer various security services including Static Security, Escort Security, Event Security, Corporate Security, Manpower Services, and Housekeeping Services. Which one would you like to know more about?"],
        contact: ["You can reach us at +91 8073246094 or email us at drakshayani.rcsm@gmail.com"],
        location: ["We are located in Akshay nagar, Rammurthy nagar, Bengaluru"],
        default: ["I'm here to help! Please ask about our services, contact information, or location."],
        thanks: ["You're welcome! Is there anything else I can help you with?"],
        bye: ["Goodbye! Have a great day!", "Thank you for chatting with us!"]
    },

    processMessage(message) {
        message = message.toLowerCase();
        
        if (message.includes('hi') || message.includes('hello')) {
            return this.getRandomResponse('greeting');
        } else if (message.includes('service') || message.includes('security')) {
            return this.getRandomResponse('services');
        } else if (message.includes('contact') || message.includes('phone') || message.includes('email')) {
            return this.getRandomResponse('contact');
        } else if (message.includes('location') || message.includes('address') || message.includes('where')) {
            return this.getRandomResponse('location');
        } else if (message.includes('thank')) {
            return this.getRandomResponse('thanks');
        } else if (message.includes('bye') || message.includes('goodbye')) {
            return this.getRandomResponse('bye');
        }
        return this.getRandomResponse('default');
    },

    getRandomResponse(type) {
        const responses = this.responses[type];
        return responses[Math.floor(Math.random() * responses.length)];
    },

    addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
        messageDiv.textContent = message;
        document.getElementById('chat-messages').appendChild(messageDiv);
        document.getElementById('chat-messages').scrollTop = document.getElementById('chat-messages').scrollHeight;
    }
};

// Enhanced Contact Form with dynamic validation and submission
const contactForm = document.getElementById('contact-form');
const formInputs = contactForm.querySelectorAll('input, textarea');

formInputs.forEach(input => {
    input.addEventListener('input', function() {
        validateInput(this);
    });
});

function validateInput(input) {
    const errorClass = 'input-error';
    input.classList.remove(errorClass);
    
    if (input.value.trim() === '') {
        input.classList.add(errorClass);
        return false;
    }
    
    if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
            input.classList.add(errorClass);
            return false;
        }
    }
    
    if (input.id === 'phone') {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(input.value)) {
            input.classList.add(errorClass);
            return false;
        }
    }
    
    return true;
}

async function sendEmail(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    // Validate all inputs
    let isValid = true;
    formInputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Please fill all fields correctly', 'error');
        return;
    }

    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Simulate sending email (replace with actual email service)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Create mailto link as fallback
        const mailtoLink = `mailto:drakshayani.rcsm@gmail.com?subject=Contact Form Submission from ${formData.name}&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0APhone: ${formData.phone}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`;
        window.location.href = mailtoLink;

        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }, 100);
}

// Chatbot Event Listeners
document.getElementById('chat-toggle').addEventListener('click', function() {
    const chatbot = document.getElementById('chatbot');
    chatbot.classList.toggle('open');
    if (chatbot.classList.contains('open')) {
        document.getElementById('chat-input').focus();
    }
});

document.getElementById('close-chat').addEventListener('click', function() {
    document.getElementById('chatbot').classList.remove('open');
});

document.getElementById('send-message').addEventListener('click', sendChatMessage);
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendChatMessage();
    }
});

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        chatbot.addMessage(message, true);
        input.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = chatbot.processMessage(message);
            chatbot.addMessage(response);
        }, 500);
    }
}
