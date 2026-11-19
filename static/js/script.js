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

// Product data sheet downloads, gated by an email address
(function () {
    const links = document.querySelectorAll('[data-gated-sheet]');
    const popupMain = document.querySelector('.popup-main');
    const popupForm = document.querySelector('.popup-js');
    if (!links.length || !popupMain || !popupForm) return;

    const form = popupForm.querySelector('.popup-form');
    const sheetName = document.querySelector('#popup-sheet-name');
    const successAlert = document.querySelector('.success-js');
    const successLink = document.querySelector('#success-link');
    const errorAlert = document.querySelector('.error-js');
    const STORAGE_KEY = 'nasaco-datasheet-email';
    let current = null;

    const storedEmail = () => {
        try { return sessionStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    };
    const storeEmail = (email) => {
        try { sessionStorage.setItem(STORAGE_KEY, email); } catch (e) { /* private mode: ask again next time */ }
    };

    const record = (email, link, keepalive) => {
        const data = new FormData(form);
        data.set('email', email);
        data.set('datasheet', link.dataset.gatedSheet);
        data.set('terms', 'on');
        return fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(data).toString(),
            keepalive: keepalive,
        }).then((response) => {
            if (!response.ok) throw new Error(response.statusText);
        });
    };

    const startDownload = (href) => {
        const a = document.createElement('a');
        a.href = href;
        a.download = '';
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    const hideAlerts = () => {
        successAlert.classList.remove('success-js-active');
        errorAlert.classList.remove('error-js-active');
    };

    const open = (link) => {
        current = link;
        hideAlerts();
        sheetName.textContent = link.dataset.gatedSheet;
        popupMain.classList.add('popup-main-active');
        popupForm.classList.add('popup-js-active');
        const email = form.querySelector('input[type=email]');
        if (email) email.focus();
    };

    const close = () => {
        popupMain.classList.remove('popup-main-active');
        popupForm.classList.remove('popup-js-active');
        if (current) current.focus();
    };

    links.forEach((link) => link.addEventListener('click', (e) => {
        const email = storedEmail();
        if (email) {
            // Already gave an email this visit: let the link open the PDF and record it in the background.
            record(email, link, true).catch(() => {});
            return;
        }
        e.preventDefault();
        open(link);
    }));

    popupForm.querySelectorAll('.popup-close').forEach((btn) => btn.addEventListener('click', close));
    popupMain.addEventListener('click', (e) => {
        if (e.target === popupMain) close();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupMain.classList.contains('popup-main-active')) close();
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        if (!current) return;
        const link = current;
        const email = form.querySelector('input[type=email]').value;
        record(email, link, false)
            .then(() => {
                storeEmail(email);
                close();
                successLink.href = link.href;
                successAlert.classList.add('success-js-active');
                startDownload(link.href);
            })
            .catch(() => {
                close();
                errorAlert.classList.add('error-js-active');
            });
    });

    document.querySelector('.success-js-cross')?.addEventListener('click', () => successAlert.classList.remove('success-js-active'));
    document.querySelector('.error-js-cross')?.addEventListener('click', () => errorAlert.classList.remove('error-js-active'));
})();
