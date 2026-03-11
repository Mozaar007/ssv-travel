// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHeroParticles();
    initScrollAnimations();
    initCounters();
    injectTestimonials();
    initCarousel();
    initForm();
    initSmoothScroll();
    initDatePicker();
    initLanguageSwitcher();
});

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ===== HERO PARTICLES =====
function initHeroParticles() {
    const container = document.getElementById('heroParticles');
    const count = 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(particle);
    }
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// ===== COUNTERS =====
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    let animated = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => animateCounter(counter));
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observer.observe(statsSection);
}

function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            el.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = target.toLocaleString('fr-FR');
        }
    };

    requestAnimationFrame(updateCounter);
}

// ===== DYNAMIC TESTIMONIALS =====
function injectTestimonials() {
    const clients = [
        "Ngue Charles", "Saurel Mozaar", "Danielle DeLylle", "Reine De LaBité", "Thim Boros", "Albert Yves", "jean Paul N", "Brice Bernardo", "Merlin Mom", "Urielle Bayack", "Tchoffo Chanceline", "Tchena Jean", "Mireille Kenfack", "Nadeige Oloa", "Mbida Judith", "Mfegue Sandrine", "Eric Boum", "Martin Tussel", "Gérémie NADADJEU", "Louis Séba", "Elize N", "Megaptche Louise", "Chekem Basile", "Kom Martine", "Annette James", "Mickael Barnett", "Geremie Donfouet", "Nicolas Takou", "Guy Tchankeu", "Serges Wonssi", "Sosthène Mbazoa", "Prince Kennett Kenyui", "Agbor Valery", "Kristin Azi'i", "Alenyui Valentine", "Blessing Opara", "Precious Mbalawi"
    ];

    const messages = {
        fr: [
            "Service impeccable, je recommande vivement SSV Travel !",
            "Très bonne agence, des prix vraiment compétitifs.",
            "Merci pour cet accompagnement de qualité. Super voyage.",
            "Une assistance au top. Le meilleur choix pour voyager !",
            "Réservation rapide et personnel très réactif.",
            "Agence sérieuse et à l'écoute des clients.",
            "Meilleurs prix sur le marché. J'ai été très satisfait."
        ],
        en: [
            "Impeccable service, I highly recommend SSV Travel!",
            "Very good agency, really competitive prices.",
            "Thanks for this quality support. Great trip.",
            "Top-notch assistance. The best choice for traveling!",
            "Fast booking and very responsive staff.",
            "Serious agency that listens to its customers.",
            "Best prices on the market. I was very satisfied."
        ]
    };

    const track = document.getElementById('carouselTrack');
    if (!track) return;

    clients.forEach((name, index) => {
        const msgIndex = index % messages.fr.length;
        const nameParts = name.trim().split(' ').filter(n => n.length > 0);
        let initials = nameParts[0][0];
        if (nameParts.length > 1) initials += nameParts[nameParts.length - 1][0];
        initials = initials.toUpperCase();

        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `
            <div class="testimonial-stars">★★★★★</div>
            <p class="testimonial-text dyn-test" data-fr="${messages.fr[msgIndex]}" data-en="${messages.en[msgIndex]}">"${messages.fr[msgIndex]}"</p>
            <div class="testimonial-author">
                <div class="author-avatar">${initials}</div>
                <div class="author-info">
                    <strong>${name}</strong>
                    <span class="dyn-test-client" data-fr="Client Satisfait" data-en="Satisfied Client">Client Satisfait</span>
                </div>
            </div>
        `;
        track.appendChild(card);
    });
}

// ===== CAROUSEL =====
function initCarousel() {
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dotsContainer = document.getElementById('carouselDots');

    if (!track) return;

    const slides = track.children;
    const totalSlides = slides.length;
    let currentSlide = 0;
    let autoPlayInterval;

    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    }

    function goToSlide(index) {
        currentSlide = index;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateDots();
    }

    function updateDots() {
        dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % totalSlides);
    }

    function prevSlide() {
        goToSlide((currentSlide - 1 + totalSlides) % totalSlides);
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay();

    // Touch support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
            resetAutoPlay();
        }
    }, { passive: true });
}

// ===== LANGUAGE SWITCHER =====
function initLanguageSwitcher() {
    const langBtns = document.querySelectorAll('.lang-btn');
    const currentLang = localStorage.getItem('ssv_travel_lang') || 'fr';

    // Set initial active state
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
    });

    // Initial translation
    if (currentLang !== 'fr') {
        updateContent(currentLang);
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const selectedLang = btn.getAttribute('data-lang');

            // Avoid redundant updates
            if (localStorage.getItem('ssv_travel_lang') === selectedLang) return;

            // Update UI state
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Save preference
            localStorage.setItem('ssv_travel_lang', selectedLang);

            // Translate
            updateContent(selectedLang);

            // Update date picker locale
            initDatePicker();
        });
    });
}

function updateContent(lang) {
    if (!TRANSLATIONS || !TRANSLATIONS[lang]) return;

    const translateDict = TRANSLATIONS[lang];

    // Select all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translateDict[key]) {
            // Check if element has span (like in headers) or if it's a simple text element
            if (el.children.length === 0 || el.tagName === 'SPAN') {
                el.textContent = translateDict[key];
            } else {
                // For elements with nested tags (gradient-text etc), we might need a more complex mapping
                // But for this project, the data-i18n is placed on the spans specifically
                el.textContent = translateDict[key];
            }
        }
    });

    // Update placeholders separately
    const messageField = document.getElementById('message');
    if (messageField && translateDict.form_message_placeholder) {
        messageField.placeholder = translateDict.form_message_placeholder;
    }

    // Update dynamic testimonials
    document.querySelectorAll('.dyn-test').forEach(el => {
        el.textContent = '"' + el.getAttribute(`data-${lang}`) + '"';
    });
    document.querySelectorAll('.dyn-test-client').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Update document title and lang attribute
    document.documentElement.lang = lang;
    document.title = lang === 'en'
        ? "SSV Travel | Travel Without Limits From Cameroon ✈️"
        : "SSV Travel | Voyagez Sans Limites Depuis le Cameroun ✈️";
}

// ===== FORM =====
function initForm() {
    const form = document.getElementById('contactForm');
    const modal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Collect data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            destination: document.getElementById('destination').value.trim(),
            departureDate: document.getElementById('departureDate').value,
            message: document.getElementById('message').value.trim(),
        };

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.phone || !formData.destination || !formData.departureDate) {
            shakeButton();
            return;
        }

        const currentLang = localStorage.getItem('ssv_travel_lang') || 'fr';

        // Format date nicely based on language
        const dateObj = new Date(formData.departureDate + 'T00:00:00');
        const dateFormatted = dateObj.toLocaleDateString(currentLang === 'en' ? 'en-US' : 'fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        // Language specific labels for WhatsApp
        const labels = currentLang === 'en' ? {
            header: "✈️ *NEW QUOTE REQUEST — SSV Travel*",
            name: "Full Name",
            email: "Email",
            phone: "Phone",
            dest: "Destination",
            date: "Departure Date",
            msg: "Message",
            footer: "_Sent from SSV Travel website_"
        } : {
            header: "✈️ *NOUVELLE DEMANDE DE DEVIS — SSV Travel*",
            name: "Nom complet",
            email: "Email",
            phone: "Téléphone",
            dest: "Destination",
            date: "Date de départ",
            msg: "Message",
            footer: "_Envoyé depuis le site SSV Travel_"
        };

        // Build WhatsApp message
        const whatsappMessage =
            `${labels.header}
━━━━━━━━━━━━━━━━━━━━━

👤 *${labels.name} :* ${formData.fullName}
📧 *${labels.email} :* ${formData.email}
📞 *${labels.phone} :* ${formData.phone}
🌍 *${labels.dest} :* ${formData.destination}
📅 *${labels.date} :* ${dateFormatted}
${formData.message ? `💬 *${labels.msg} :* ${formData.message}` : ''}

━━━━━━━━━━━━━━━━━━━━━
${labels.footer}`;

        // Get WhatsApp link from config
        const waLink = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.whatsappLien)
            ? SITE_CONFIG.whatsappLien
            : 'https://wa.me/237656979239';

        // Open WhatsApp with message
        const encodedMessage = encodeURIComponent(whatsappMessage);
        window.open(`${waLink}?text=${encodedMessage}`, '_blank');

        // Also store locally as backup
        const leads = JSON.parse(localStorage.getItem('ssv_travel_leads') || '[]');
        leads.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('ssv_travel_leads', JSON.stringify(leads));

        // Show success modal
        modal.classList.add('active');

        // Reset form
        form.reset();
    });

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

function shakeButton() {
    const btn = document.getElementById('submitBtn');
    btn.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
        btn.style.animation = '';
    }, 500);
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== DATE PICKER =====
function initDatePicker() {
    const dateInput = document.getElementById('departureDate');
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate() + 1).padStart(2, '0');
        dateInput.min = `${yyyy}-${mm}-${dd}`;
    }
}

/**
 * Dynamic Pricing Logic
 * Simulates daily price updates to present the lowest market prices.
 * Uses a daily seed to ensure consistency for the user on a single day.
 */
function updateDynamicPricing() {
    const today = new Date();
    const seed = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate();

    // Simple pseudo-random function
    const seededRandom = (s) => {
        const x = Math.sin(s) * 10000;
        return x - Math.floor(x);
    };

    document.querySelectorAll('.price-value[data-base-price]').forEach(el => {
        const basePrice = parseInt(el.getAttribute('data-base-price'));
        const variation = (seededRandom(seed + basePrice) * 0.05) - 0.02; // -2% to +3% variation
        const finalPrice = Math.floor((basePrice * (1 + variation)) / 100) * 100; // Round to nearest 100

        el.textContent = finalPrice.toLocaleString('fr-FR') + ' FCFA';
    });
}

// Run dynamic pricing after translations and on load
document.addEventListener('DOMContentLoaded', () => {
    // Small delay to ensure translations are applied if any
    setTimeout(updateDynamicPricing, 100);
});
