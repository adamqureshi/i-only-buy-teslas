const leadForm = document.getElementById('lead-form');
const formStatus = document.getElementById('form-status');
const submitButton = document.getElementById('submit-button');
const year = document.getElementById('year');
const phoneInput = document.getElementById('phone');
const startedAtInput = document.getElementById('formStartedAt');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (startedAtInput) {
  startedAtInput.value = String(Date.now());
}

const setStatus = (message, type = '') => {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.className = 'form-status';

  if (type) {
    formStatus.classList.add(`is-${type}`);
  }
};

const normalizePhone = (value) => {
  const digits = String(value).replace(/\D/g, '');

  if (digits.length > 10 && digits.startsWith('1')) {
    return digits.slice(1, 11);
  }

  return digits.slice(0, 10);
};

const formatPhone = (value) => {
  const localDigits = normalizePhone(value);

  if (localDigits.length === 0) return '';
  if (localDigits.length <= 3) return `(${localDigits}`;
  if (localDigits.length <= 6) return `(${localDigits.slice(0, 3)}) ${localDigits.slice(3)}`;
  return `(${localDigits.slice(0, 3)}) ${localDigits.slice(3, 6)}-${localDigits.slice(6, 10)}`;
};

if (phoneInput) {
  const syncPhoneField = () => {
    phoneInput.value = formatPhone(phoneInput.value);
  };

  phoneInput.addEventListener('input', syncPhoneField);
  phoneInput.addEventListener('blur', syncPhoneField);
  phoneInput.addEventListener('paste', () => {
    requestAnimationFrame(syncPhoneField);
  });
}

if (leadForm) {
  leadForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');

    const formData = new FormData(leadForm);
    const payload = Object.fromEntries(formData.entries());
    const normalizedDigits = normalizePhone(payload.phone || '');

    if (!payload.fullName || payload.fullName.trim().length < 2) {
      setStatus('Please enter your full name.', 'error');
      document.getElementById('fullName')?.focus();
      return;
    }

    if (normalizedDigits.length < 10) {
      setStatus('Please enter a valid mobile number.', 'error');
      phoneInput?.focus();
      return;
    }

    if (!payload.service) {
      setStatus('Please choose the type of help you need.', 'error');
      document.getElementById('service')?.focus();
      return;
    }

    payload.phone = phoneInput ? phoneInput.value : payload.phone;

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    setStatus('Sending your request…');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      leadForm.reset();

      if (startedAtInput) {
        startedAtInput.value = String(Date.now());
      }

      if (data.mode === 'demo') {
        setStatus(
          'Your request was accepted in demo mode only. Add the email environment variables before going live.',
          'warning',
        );
        return;
      }

      setStatus('Thanks — I got your request and will text you back if it looks like a fit.', 'success');
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : 'The form could not send right now. Please try again in a moment.',
        'error',
      );
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
    }
  });
}
