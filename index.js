window.addEventListener('load', function() {
    const form = document.querySelector('form');

    const email = form.querySelector('#email');
    const hintEmail = form.querySelector('#hint_email');

    // const enquirySubject = form.querySelector('#enquiry-subject');
    const hintEnquirySubject = form.querySelector('#hint_enquirySubject');

    const enquiry = form.querySelector('#enquiry');
    const hintEnquiry = form.querySelector('#hint_enquiry');

    const sendButton = form.querySelector("#send-enq");

    sendButton.addEventListener('click', function (e) {

        e.preventDefault();

        const enquirySubject = form.querySelector("input[name='enquirysubject']:checked");

        const enquiryEmail = email.value.trim();
        const selectedEnquirySubject = enquirySubject ? enquirySubject.value : null;
        const enquiryText = enquiry.value.trim();

        let fieldsOK = true;

        if(enquiryEmail.length < 5 || enquiryEmail.indexOf('@') < 0) {
            hintEmail.style.display = 'inline';
            fieldsOK = false;
        } else {
            hintEmail.style.display = 'none';
        }

        if(selectedEnquirySubject == null) {
            hintEnquirySubject.style.display = 'inline';
            fieldsOK = false;
        } else {
            hintEnquirySubject.style.display = 'none';
        }

        if(enquiryText.length == 0) {
            hintEnquiry.style.display = 'inline';
            fieldsOK = false;
        } else {
            hintEnquiry.style.display = 'none';
        }

        if (fieldsOK) {
            const formData = new FormData();
            formData.append('email', enquiryEmail);
            formData.append('enquirysubject', selectedEnquirySubject);
            formData.append('enquiry', enquiryText);
            formData.append('send_enq', '1');

            fetch('contact.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.text())
            .then(data => {
                form.reset();
                const successMsg = document.createElement('p');
                successMsg.textContent = '✓ Your enquiry has been submitted! We\'ll be in touch soon.';
                successMsg.style.color = 'green';
                successMsg.style.fontWeight = 'bold';
                form.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 5000);
            })
            .catch(err => console.error('Fetch error:', err));
        }


    })
})