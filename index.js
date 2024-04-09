// Load reservations from JSON file
let reservations = [];

// Function to fetch reservations
const fetchReservations = () => {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            reservations = data;
            renderReservations();
        })
        .catch(error => console.error('Error fetching reservations:', error));
};

// Function to render reservations
const renderReservations = () => {
    const reservationList = document.getElementById('reservationList');
    reservationList.innerHTML = '';
    reservations.forEach((reservation, index) => {
        const reservationItem = document.createElement('div');
        reservationItem.className = 'border p-4 mb-4';
        reservationItem.innerHTML = `
            <p><strong>Name:</strong> ${reservation.name}</p>
            <p><strong>Date:</strong> ${reservation.date}</p>
            <p><strong>Time:</strong> ${reservation.time}</p>
            <p><strong>Details:</strong> ${reservation.details}</p>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="deleteReservation(${index})">Delete</button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="editReservation(${index})">Edit</button>
        `;
        reservationList.appendChild(reservationItem);
    });
};

// Function to handle reservation form submission
const submitReservation = () => {
    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value.trim();
    const time = document.getElementById('time').value.trim();
    const details = document.getElementById('details').value.trim();

    if (name && date && time && details) {
        const reservation = {
            name,
            date,
            time,
            details
        };
        reservations.push(reservation);
        saveReservations();
        renderReservations();
        document.getElementById('reservationForm').reset();
        document.getElementById('reservationFormContainer').classList.add('hidden');
        alert('Reservation made successfully');
    } else {
        alert('Please fill in all fields');
    }
};

// Function to delete a reservation
const deleteReservation = (index) => {
    reservations.splice(index, 1);
    saveReservations();
    renderReservations();
};

// Function to save reservations to JSON file
const saveReservations = () => {
    fetch('reservations.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reservations)
    })
    .catch(error => console.error('Error saving reservations:', error));
};

// Function to show reservation form
document.getElementById('reservationButton').addEventListener('click', () => {
    document.getElementById('reservationFormContainer').classList.remove('hidden');
});

// Function to cancel reservation
document.getElementById('cancelReservation').addEventListener('click', () => {
    document.getElementById('reservationFormContainer').classList.add('hidden');
});

// Function to handle reservation form submission
document.getElementById('submitReservation').addEventListener('click', submitReservation);

// Fetch reservations when the page loads
fetchReservations();
