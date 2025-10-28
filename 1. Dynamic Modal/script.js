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
const form = document.querySelector('.hbspt-form');

if (form) {
  // Create modal wrapper
  const modal = document.createElement('div');
  modal.id = 'customModal';
  modal.className = 'modal hidden';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  const closeButton = document.createElement('span');
  closeButton.className = 'close-button';
  closeButton.innerHTML = '&times;';



  // Move form into modal content
  form.parentNode.insertBefore(modal, form); // Insert modal before form
  modalContent.appendChild(closeButton);
  modalContent.appendChild(form); // Move form inside modal content
  modal.appendChild(modalContent);



  // Progress Section
  const progressSect = document.createElement('div');
  progressSect.className = 'progress-container';
  progressSect.innerHTML = `
  <div class="progress-bar">
    <div class="progress" id="progress"></div>
    <div class="step active"><div>1</div> <p>User Information</p></div>
    <div class="step"><div>2</div><p>Inquiry</p></div>
    <div class="step"><div>3</div><p>Complete</p></div>
  </div>

  <div class="step-content">
    <div class="content active" id="content-1">
      <p>Enter your name, email, and contact details.</p>
    </div>
    <div class="content" id="content-2">
      <p>Select your preferences and interests.</p>
    </div>
    <div class="content" id="content-3">
      <p>Thank you for your submission.</p>
    </div>
  </div>

  <div class="buttons">
    <button id="back" disabled>Back</button>
    <button id="next">Next</button>
  </div>
  `;

  document.querySelector('.modal-content')?.insertBefore(progressSect, form);

  const progress = document.getElementById('progress');
  const steps = document.querySelectorAll('.step');
  const contents = document.querySelectorAll('.content');
  const nextBtn = document.getElementById('next');
  const backBtn = document.getElementById('back');

  let currentStep = 1;

  nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length) {
      currentStep++;
      updateUI();
    }
  });

  backBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      updateUI();
    }
  });

  function updateUI() {
    steps.forEach((step, index) => {
      step.classList.toggle('active', index < currentStep);
    });

    progress.style.width = `${(currentStep - 1) / (steps.length - 1) * 100}%`;

    contents.forEach((content, index) => {
      content.classList.toggle('active', index === currentStep - 1);
    });

    backBtn.disabled = currentStep === 1;
    nextBtn.disabled = currentStep === steps.length;
  }





  document.getElementById('openModal')?.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  // Close modal on button click
  closeButton.addEventListener('click', () => {
    modal.classList.add('hidden');
  });




}



