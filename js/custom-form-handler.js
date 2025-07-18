document.addEventListener('DOMContentLoaded', function() {
    const newEndpoint = 'https://script.google.com/macros/s/AKfycbwieKpPvNnWQLNMwyHwxJXWGQ0aiAJh64I57qb7YlKyIceFF8Z5JbV-zQuJGYBqb4pE/exec';

    document.body.addEventListener('submit', function(event) {
        const form = event.target;
        if (form.tagName === 'FORM' && form.closest('.r')) {
            event.preventDefault();

            const formData = new FormData(form);
            const successBox = form.closest('.r').querySelector('.t-form__successbox');
            const errorBox = form.querySelector('.t-form__errorbox-middle');
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton ? submitButton.textContent : '';

            if (submitButton) {
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
            }

            fetch(newEndpoint, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            })
            .then(response => {
                console.log('Form submission request sent.');
                if (successBox) {
                    const formWrapper = form.querySelector('.t-form__inputsbox');
                    if (formWrapper) {
                       form.style.display = 'none';
                    }
                    successBox.style.display = 'block';
                }
                form.reset();
            })
            .catch(error => {
                console.error('Error submitting form:', error);
                if (errorBox) {
                    const errorMessages = errorBox.querySelector('.t-form__errorbox-text');
                    if (errorMessages) {
                        errorMessages.innerHTML = '<p>An error occurred. Please try again later.</p>';
                    }
                    errorBox.style.display = 'block';
                }
            })
            .finally(() => {
                if (submitButton) {
                    submitButton.textContent = originalButtonText;
                    submitButton.disabled = false;
                }
            });
        }
    }, true);
});
