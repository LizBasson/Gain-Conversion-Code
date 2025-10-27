// Remove original form
const form = document.querySelector('.contact-form__form.kam-world');
if (form) form.innerHTML = '';

// Create glass section
const glassSection = document.createElement('section');
glassSection.className = 'glass-section';
glassSection.innerHTML = `
  <h2>Let’s Work Together</h2>
  <p>We’re excited to help you grow. Reach out and let’s start the conversation.</p>
  <button id="openModal">Get in Touch</button>
`;
document.querySelector('.contact-form__form.kam-world')?.appendChild(glassSection);

// Create modal container
const modal = document.createElement('div');
modal.className = 'modal hidden';
modal.innerHTML = `
  <div class="modal-content">
    <div class="progress-bar">
      <div class="step active" data-step="1">1</div>
      <div class="step" data-step="2">2</div>
      <div class="step" data-step="3">3</div>
    </div>
    <form id="multiStepForm">
      <div class="form-step step-1">
        <input type="text" placeholder="First Name" required />
        <input type="text" placeholder="Last Name" required />
        <input type="email" placeholder="Email" required />
        <button type="button" class="next">Next</button>
      </div>
      <div class="form-step step-2 hidden">
        <textarea placeholder="How can we help you?" required></textarea>
        <label><input type="checkbox" required /> I agree to terms</label>
        <button type="button" class="prev">Back</button>
        <button type="submit">Submit</button>
      </div>
      <div class="form-step step-3 hidden">
        <p>Thank you! We’ll be in touch soon.</p>
        <button type="button" class="prev">Back</button>
      </div>
    </form>
  </div>
`;
document.body.appendChild(modal);

// Modal logic
document.getElementById('openModal').onclick = () => modal.classList.remove('hidden');
const steps = modal.querySelectorAll('.form-step');
const progress = modal.querySelectorAll('.step');
let currentStep = 0;

function updateStep(index) {
    steps.forEach((s, i) => s.classList.toggle('hidden', i !== index));
    progress.forEach((p, i) => {
        p.className = 'step';
        if (i < index) p.classList.add('complete');
        if (i === index) p.classList.add('active');
    });
    currentStep = index;
}

modal.querySelectorAll('.next').forEach(btn => {
    btn.onclick = () => {
        const inputs = steps[currentStep].querySelectorAll('input, textarea');
        const valid = [...inputs].every(i => i.checkValidity());
        if (valid) updateStep(currentStep + 1);
        else alert('Please complete all fields.');
    };
});

modal.querySelectorAll('.prev').forEach(btn => {
    btn.onclick = () => updateStep(currentStep - 1);
});

modal.querySelector('form').onsubmit = e => {
    e.preventDefault();
    updateStep(2);
};