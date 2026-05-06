const form = document.querySelector('#signatureForm');
const message = document.querySelector('#formMessage');

function setMessage(text, type = '') {
  message.textContent = text;
  message.className = `form-message ${type}`.trim();
}

function serialize(formEl) {
  const data = new FormData(formEl);
  return Object.fromEntries(data.entries());
}

form?.addEventListener('submit', async (event) => {
  event.preventDefault();

  const submitButton = form.querySelector('button[type="submit"]');
  submitButton.disabled = true;
  setMessage('Submitting acknowledgement...');

  try {
    const body = serialize(form);
    body.pageUrl = window.location.href;

    const response = await fetch('/api/sign-success-fee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok || !result.ok) {
      throw new Error(result.error || 'Submission failed.');
    }

    setMessage('Acknowledgement submitted. Adam now has the email record.', 'ok');
    form.reset();
  } catch (error) {
    setMessage(error.message || 'Something went wrong. Try again.', 'error');
  } finally {
    submitButton.disabled = false;
  }
});
