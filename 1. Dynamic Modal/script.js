// Create the overlay div
const overlay = document.createElement('div');
overlay.id = 'custom-overlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100vw';
overlay.style.height = '100vh';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; // semi-transparent black
overlay.style.zIndex = '9999'; // ensure it's on top
overlay.style.display = 'flex';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';

// Append to body
document.body.appendChild(overlay);


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
const fieldsets = form.querySelectorAll('fieldset');

if (fieldsets.length > 0) {
  fieldsets[0].classList.add('active');
}
if (fieldsets.length > 1) {
  fieldsets[1].classList.add('active');
}





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

  // Thank you message
  const thankYouMessage = document.createElement('div');
  thankYouMessage.className = 'thank-you-message';
  thankYouMessage.innerHTML = `
    <h2>Thank You for Your Submission!</h2>
    <p>We appreciate your time and will be in touch soon.</p>
  `;
  form.appendChild(thankYouMessage);


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

  <div class="buttons">
    <button id="back" disabled>Back</button>
    <button id="next">Next</button>
  </div>
  `;

  document.querySelector('.modal-content')?.insertBefore(progressSect, form);

  const progress = document.getElementById('progress');
  const steps = document.querySelectorAll('.step');
  // const contents = document.querySelectorAll('#fieldset');
  const nextBtn = document.getElementById('next');
  const backBtn = document.getElementById('back');

  let currentStep = 1;

  nextBtn.addEventListener('click', () => {
    if (currentStep < steps.length) {
      currentStep++;
      updateUI();
    }
    else {
      // Final step reached — close modal
      modal.classList.add('hidden');
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




    fieldsets.forEach((fs, index) => {
      fs.classList.remove('active');
    });

    // Step 1: show first two fieldsets
    if (currentStep === 1) {
      for (let i = 0; i < 2 && i < fieldsets.length; i++) {
        fieldsets[i].classList.add('active');
      }
      form.querySelector('.hs_recaptcha')?.classList.remove('active');
      form.querySelector('.hs_submit')?.classList.remove('active');
    }

    // Step 2: show all remaining fieldsets
    if (currentStep === 2) {
      for (let i = 2; i < fieldsets.length; i++) {
        fieldsets[i].classList.add('active');
      }

      // Show recaptcha and submit
      form.querySelector('.hs_recaptcha')?.classList.add('active');
      form.querySelector('.hs_submit')?.classList.add('active');
    } else {
      // Hide recaptcha and submit if not on step 2
      form.querySelector('.hs_recaptcha')?.classList.remove('active');
      form.querySelector('.hs_submit')?.classList.remove('active');
    }

    // Step 3: show thank you message
    if (currentStep === 3) {
      // Show recaptcha and submit
      form.querySelector('.thank-you-message')?.classList.add('active');
    } else {
      // Hide recaptcha and submit if not on step 2
      form.querySelector('.thank-you-message')?.classList.remove('active');
    }




    backBtn.disabled = currentStep === 1;
  }



  fieldsets.forEach((fieldset, index) => {
    fieldset.id = `fieldset-${index + 1}`;
  });




  document.getElementById('openModal')?.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  // Close modal on button click
  closeButton.addEventListener('click', () => {
    modal.classList.add('hidden');
  });




}



