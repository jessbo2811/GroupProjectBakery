window.addEventListener('load', function () {
    const form = document.querySelector('form');

    const email = form.querySelector('#email');
    const hintEmail = form.querySelector('#hint_email');
    const hintMenuChoice = form.querySelector('#hint_menuChoice');
    const hintDate = form.querySelector('#hint_date');
    const date = form.querySelector('#catering-date');
    const sendButton = form.querySelector('#send-enq');

    const now = new Date();
    renderCalendar(now.getFullYear(), now.getMonth());

    async function renderCalendar(year, month) {
        const monthStr = `${year}-${String(month + 1).padStart(2, '0')}`;

        let availability = {};
        try {
            const response = await fetch(`availability.php?month=${monthStr}`);
            console.log(response.headers);
            availability = await response.json();
        } catch (err) {
            console.error('Could not load availability:', err);
        }

        const container = document.getElementById('availability-calendar');
        if (!container) return;

        let firstDay = new Date(year, month, 1).getDay();
        if (firstDay == 0) {
            firstDay += 7;
        }
        firstDay -= 1;

        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date().toISOString().split('T')[0];

        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        let html = `
            <div class="cal-header">
                <button type="button" class="cal-nav" data-year="${year}" data-month="${month}" data-dir="-1">&#8249;</button>
                <h3>${monthNames[month]} ${year}</h3>
                <button type="button" class="cal-nav" data-year="${year}" data-month="${month}" data-dir="1">&#8250;</button>
            </div>
            <div class="cal-grid">
                <div class="cal-day-name">Mon</div>
                <div class="cal-day-name">Tue</div>
                <div class="cal-day-name">Wed</div>
                <div class="cal-day-name">Thu</div>
                <div class="cal-day-name">Fri</div>
                <div class="cal-day-name">Sat</div>
                <div class="cal-day-name">Sun</div>
        `;

        for (let i = 0; i < firstDay; i++) {
            html += `<div class="cal-day empty"></div>`;
        }

        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const info = availability[dateStr];
            const isPast = dateStr <= today;

            let cls = 'cal-day';
            let label = '';
            let clickAttr = '';

            if (isPast) {
                cls += ' past';
            } else if (info && Object.keys(availability).includes(dateStr)) {
                cls += ' booked';
                label = 'Booked';
            } else {
                cls += ' available';
                label = 'Available';
                clickAttr = `data-date="${dateStr}"`;
            }

            html += `
                <div class="${cls}" ${clickAttr}>
                    <span class="day-num">${d}</span>
                    <span class="day-label">${label}</span>
                </div>`;
        }

        html += `</div>
            <div class="cal-legend">
                <span class="legend-available">&#9632; Available</span>
                <span class="legend-booked">&#9632; Booked</span>
                <span class="legend-unavailable">&#9632; Unavailable</span>
            </div>`;

        container.innerHTML = html;

        container.querySelectorAll('.cal-nav').forEach(btn => {
            btn.addEventListener('click', function () {
                let newMonth = parseInt(this.dataset.month) + parseInt(this.dataset.dir);
                let newYear = parseInt(this.dataset.year);
                if (newMonth < 0)  { newMonth = 11; newYear--; }
                if (newMonth > 11) { newMonth = 0;  newYear++; }
                renderCalendar(newYear, newMonth);
            });
        });

        container.querySelectorAll('.cal-day.available').forEach(cell => {
            cell.addEventListener('click', function () {
                date.value = this.dataset.date;
                hintDate.style.display = 'none';
                container.querySelectorAll('.cal-day.selected')
                    .forEach(el => el.classList.remove('selected'));
                this.classList.add('selected');

                const display = document.getElementById('selected-date-display');
                if (display) {
                    const formatted = new Date(this.dataset.date + 'T00:00:00')
                        .toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
                    display.textContent = `Selected: ${formatted}`;
                }
            });
        });
    }

    sendButton.addEventListener('click', function (e) {
        e.preventDefault();

        const menuChoice = form.querySelector("input[name='menu-choice']:checked");

        const cateringEmail = email.value.trim();
        const selectedMenuChoice = menuChoice ? menuChoice.value : null;
        const cateringDate = date.value.trim();

        let fieldsOK = true;

        if (cateringEmail.length < 5 || cateringEmail.indexOf('@') < 0) {
            hintEmail.style.display = 'inline';
            fieldsOK = false;
        } else {
            hintEmail.style.display = 'none';
        }

        if (selectedMenuChoice == null) {
            hintMenuChoice.style.display = 'inline';
            fieldsOK = false;
        } else {
            hintMenuChoice.style.display = 'none';
        }

        if (cateringDate === '') {
            hintDate.style.display = 'inline';
            fieldsOK = false;
        } else {
            hintDate.style.display = 'none';
        }

        if (fieldsOK) {
            const formData = new FormData();
            formData.append('email', cateringEmail);
            formData.append('menu-choice', selectedMenuChoice);
            formData.append('catering-date', cateringDate);

            fetch('book-catering.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    form.reset();
                    document.getElementById('selected-date-display').textContent = 'Selected date: ';

                    const successMsg = document.createElement('p');
                    successMsg.textContent = '✓ Booking confirmed! We look forward to seeing you.';
                    successMsg.style.color = 'green';
                    successMsg.style.fontWeight = 'bold';
                    form.appendChild(successMsg);
                    setTimeout(() => successMsg.remove(), 5000);

                    renderCalendar(now.getFullYear(), now.getMonth());
                } else {
                    alert('Error: ' + data.message);
                }
            })
            .catch(err => console.error('Fetch error:', err));
        }
    });

});