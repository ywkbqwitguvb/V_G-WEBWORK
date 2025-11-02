// Add smooth scroll behavior
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add fade-in animation for main content
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        setTimeout(() => {
            hero.style.transition = 'opacity 1s ease-in-out';
            hero.style.opacity = '1';
        }, 100);
    }

    // Intercept contact form submit and open Gmail compose with prefilled fields
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const form = e.currentTarget;
            const name = (form.querySelector('input[name="name"]') || {}).value || '';
            const email = (form.querySelector('input[name="email"]') || {}).value || '';
            const message = (form.querySelector('textarea[name="message"]') || {}).value || '';

            const to = 'vgwebworks2025@gmail.com';
            const subject = encodeURIComponent(`New message from V&G WebWorks site${name ? ' — ' + name : ''}`);
            const bodyLines = [];
            if (name) bodyLines.push(`Name: ${name}`);
            if (email) bodyLines.push(`Email: ${email}`);
            if (message) bodyLines.push('\nMessage:\n' + message);
            bodyLines.push('\n\n---\nThis message was composed via the site contact form.');
            const body = encodeURIComponent(bodyLines.join('\n'));

            // Gmail web compose URL
            const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`;

            // Open Gmail compose in a new tab/window
            window.open(gmailUrl, '_blank');

            // Optional: give visual feedback to the user
            // You can replace this with a nicer UI (toast/modal) if desired
            alert('A Gmail compose window has been opened. Please review and click Send to deliver your message.');
        });
    }
});