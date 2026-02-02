document.addEventListener('DOMContentLoaded', () => {
    // --- I18n Logic ---
    const langToggle = document.getElementById('langToggle');
    const body = document.body;

    // 1. Check Preference or Auto-detect
    const savedLang = localStorage.getItem('lang');
    const browserLang = navigator.language || navigator.userLanguage;
    const initialLang = savedLang ? savedLang : (browserLang.includes('ko') ? 'ko' : 'en');

    setLanguage(initialLang);

    // 2. Toggle Event
    langToggle.addEventListener('click', () => {
        const current = body.getAttribute('data-lang');
        const next = current === 'en' ? 'ko' : 'en';
        setLanguage(next);
    });

    function setLanguage(lang) {
        body.setAttribute('data-lang', lang);
        localStorage.setItem('lang', lang);
        console.log(`Language set to: ${lang}`);
    }

    // --- Modal Logic ---
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.getElementById('closeModal');

    window.openModal = function (elementId) {
        const dataDiv = document.getElementById(elementId);
        if (!dataDiv) return;

        // Clone content to avoid moving it from original DOM
        modalBody.innerHTML = dataDiv.innerHTML;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    function hideModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) hideModal();
    });
});
