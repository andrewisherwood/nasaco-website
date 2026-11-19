// Mobile navigation
(function () {
    const toggle = document.querySelector('.nav-js');
    const nav = document.querySelector('.mobile-nav');
    const body = document.querySelector('.body-js');
    if (!toggle || !nav) return;

    const setOpen = (open) => {
        nav.classList.toggle('mobile-nav-active', open);
        body.classList.toggle('body-active', open);
        toggle.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.querySelector('span').textContent = open ? 'Close' : 'Menu';
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('mobile-nav-active')));

    // Same-page links such as /#contact leave the menu open otherwise.
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('mobile-nav-active')) {
            setOpen(false);
            toggle.focus();
        }
    });

    window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
        if (e.matches) setOpen(false);
    });
})();

// Product data sheet download dialog
(function () {
    const openButton = document.querySelector('#pdf-button-js');
    const popupMain = document.querySelector('.popup-main');
    const popupForm = document.querySelector('.popup-js');
    if (!openButton || !popupMain || !popupForm) return;

    const form = popupForm.querySelector('.popup-form');
    const successAlert = document.querySelector('.success-js');
    const errorAlert = document.querySelector('.error-js');

    const open = () => {
        popupMain.classList.add('popup-main-active');
        popupForm.classList.add('popup-js-active');
        const firstField = popupForm.querySelector('input:not([type=hidden])');
        if (firstField) firstField.focus();
    };

    const close = () => {
        popupMain.classList.remove('popup-main-active');
        popupForm.classList.remove('popup-js-active');
        openButton.focus();
    };

    openButton.addEventListener('click', open);
    popupForm.querySelectorAll('.popup-close').forEach((btn) => btn.addEventListener('click', close));

    popupMain.addEventListener('click', (e) => {
        if (e.target === popupMain) close();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupMain.classList.contains('popup-main-active')) close();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(new FormData(form)).toString(),
        })
            .then((response) => {
                if (!response.ok) throw new Error(response.statusText);
                close();
                successAlert.classList.add('success-js-active');
                form.reset();
            })
            .catch(() => {
                close();
                errorAlert.classList.add('error-js-active');
            });
    });

    document.querySelector('.success-js-cross')?.addEventListener('click', () => successAlert.classList.remove('success-js-active'));
    document.querySelector('.error-js-cross')?.addEventListener('click', () => errorAlert.classList.remove('error-js-active'));
})();
