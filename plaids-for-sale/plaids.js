(() => {
  const forms = document.querySelectorAll('[data-plaid-form]');
  forms.forEach((form) => {
    const status = form.querySelector('[data-form-status]');
    const startedInput = form.querySelector('input[name="formStartedAt"]');
    if (startedInput) startedInput.value = String(Date.now());

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitButton = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      if (status) {
        status.textContent = 'Sending...';
        status.className = 'form-status';
      }
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
      }

      try {
        const response = await fetch('/api/plaid-lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || !result.ok) {
          throw new Error(result.error || 'Please try again.');
        }
        form.reset();
        if (startedInput) startedInput.value = String(Date.now());
        if (status) {
          status.textContent = result.mode === 'demo'
            ? 'Accepted in demo mode. Add email environment variables in Vercel to send real emails.'
            : 'Sent. I will text you back if it looks like a fit.';
          status.className = 'form-status is-success';
        }
      } catch (error) {
        if (status) {
          status.textContent = error.message || 'Something went wrong. Please try again.';
          status.className = 'form-status is-error';
        }
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.removeAttribute('aria-busy');
        }
      }
    });
  });

  document.querySelectorAll('[data-fill-listing]').forEach((link) => {
    link.addEventListener('click', () => {
      const listingInput = document.querySelector('#listing');
      if (listingInput) listingInput.value = link.getAttribute('data-fill-listing') || '';
      const intentSelect = document.querySelector('#leadIntent');
      if (intentSelect && !intentSelect.value) intentSelect.value = 'make_offer';
    });
  });
})();
