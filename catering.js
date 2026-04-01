window.addEventListener('load', function() {
    const form = document.querySelector('form');

    const email = form.querySelector('#email');
    const hintEmail = form.querySelector('#hint_email');

    const hintMenuChoice = form.querySelector('#hint_menuChoice');

    const date = form.querySelector('#catering-date');
    const hintDate = form.querySelector('#hint_date');

    const sendButton = form.querySelector("#send-enq");

    sendButton.addEventListener('click', function (e) {

        e.preventDefault();

        const menuChoice = form.querySelector("input[name='menu-choice']:checked");

        const cateringEmail = email.value.trim();
        const selectedMenuChoice = menuChoice ? menuChoice.value : null;
        const cateringDate = date.value.trim();

        const selectedCateringDate = new Date(cateringDate);
        let today = new Date();

        let fieldsOK = true;

        if(cateringEmail.length < 5 || cateringEmail.indexOf('@') < 0) {
            hintEmail.style.display = 'inline';
            fieldsOK = false;
        } else {
            hintEmail.style.display = 'none';
        }

        if(selectedMenuChoice == null) {
            hintMenuChoice.style.display = 'inline';
            fieldsOK = false;
        } else {
            hintMenuChoice.style.display = 'none';
        }

        if(cateringDate == '' || selectedCateringDate <= today) {
            hintDate.style.display = 'inline';
            fieldsOK = false;
        } else {
            hintDate.style.display = 'none';
        }

        if(fieldsOK) {
            console.log('Email: ' + cateringEmail);
            console.log('Menu Choice: ' + selectedMenuChoice);
            console.log('Date: ' + cateringDate);
        }


    })
})