document.addEventListener('DOMContentLoaded', function() {
    const newEndpoint = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhLOZ5S2ZBENfXzA78AHFQa3KgQHXsUVzhmiM9NGwZIm88Xs8hUDVmJJ2ELiHp58JG_i5ZLkvX0CVcyIvfchQR6URWBSNNVFlnbZYv8dgU2TGfMYWZOGqumEhMGssX4czPXPPNntFPde2D1L8ZzZleqCE8StwxqCoCnTviW1eWqn-5PFhoBGKP4mk5mbzHvD3WxSW7o_0wdkLO_CWtduTo8mRbyVMgeFvew0UT2WWVNn2iiT_EGQeyiEu6D0mMaUqoRtNUEeVaE5vt_Op1YNERVor6LqQ&lib=MK7LzoLag-LySUGtoYyCVBGAGFOlNCMp3';

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
