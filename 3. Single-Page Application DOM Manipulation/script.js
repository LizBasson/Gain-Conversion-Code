(function () {
    const valuePropText = 'Liftmap helps experimentation and CRO managers scale their testing programs. Start today to prioritize ideas, improve collaboration, report on program results, share insights company-wide, and more!';
    const bulletPoints = [
        'Increase conversion rates across your website',
        'Iterative site redesign',
        'Improve ROAS efficiency',
        'Standing or scaling an experimentation program',
        'Advanced customer research'
    ];

    function applyChanges() {
        const h1 = document.querySelector('h1');
        if (h1 && h1.textContent !== 'We are the best experimentation agency in the world') {
            h1.textContent = 'We are the best experimentation agency in the world';

            // Inject value proposition paragraph
            if (!document.querySelector('.custom-value-prop')) {
                const para = document.createElement('p');
                para.className = 'custom-value-prop';
                para.textContent = valuePropText;
                h1.insertAdjacentElement('afterend', para);
            }

            // Inject bullet list
            if (!document.querySelector('.custom-bullet-list')) {
                const ul = document.createElement('ul');
                ul.className = 'custom-bullet-list';
                bulletPoints.forEach(text => {
                    const li = document.createElement('li');
                    li.textContent = text;
                    ul.appendChild(li);
                });
                h1.nextElementSibling.insertAdjacentElement('afterend', ul);
            }
        }

        // Update button text
        const demoBtn = Array.from(document.querySelectorAll('button, a')).find(el => el.textContent.trim() === 'Request a demo');
        if (demoBtn) demoBtn.textContent = 'Contact us';

        // Modify "Why Liftmap?" link
        const whySection = document.querySelector('.lm-why');
        if (whySection) {
            whySection.id = 'whyLiftmap';
        }

        const videobtn = document.querySelector('.btn.btn-video');
        if (videobtn) {
            videobtn.remove();
        }
        // Add "Why Liftmap?" button in hero section
        const buttonsContainer = document.querySelector('.lm-hero__buttons');
        if (buttonsContainer && !buttonsContainer.querySelector('.btn-lift-link')) {
            const button = document.createElement('button');
            button.className = 'btn btn-lift-link';
            button.textContent = 'Why Liftmap?';
            button.style.cursor = 'pointer';

            button.addEventListener('click', () => {
                const targetSection = document.querySelector('#whyLiftmap');
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.hash = '#whyLiftmap';
                }
            });

            buttonsContainer.appendChild(button);
        }


    }

    // Observe SPA route changes
    const observer = new MutationObserver(() => {
        applyChanges();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Initial run
    applyChanges();
})();