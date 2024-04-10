// Load reservations from JSON file
let reservations = [];
// Function to delete a reservation
const deleteReservation = (index) => {
    const url = 'http://localhost:3000/res/';
    fetch(`${url}${reservations[index].id}`, {
        method: 'DELETE'
    })
    .then(() => {
        reservations.splice(index, 1);
        renderReservations(reservations);
    })
    .catch(error => console.error('Error deleting reservation:', error));
};

const editReservation = (index) => {
    const reservation = reservations[index];
    const url = 'http://localhost:3000/res/';

    document.getElementById('name').value = reservation.name;
    document.getElementById('date').value = reservation.date;
    document.getElementById('time').value = reservation.time;
    document.getElementById('details').value = reservation.details;
    document.getElementById('reservationFormContainer').classList.remove('hidden');
    
    document.getElementById('submitEdit').addEventListener('click', () => {
        const newName = document.getElementById('name').value.trim();
        const newDate = document.getElementById('date').value.trim();
        const newTime = document.getElementById('time').value.trim();
        const newDetails = document.getElementById('details').value.trim();

        if (newName && newDate && newTime && newDetails) {
            const updatedReservation = {
                ...reservation,
                name: newName,
                date: newDate,
                time: newTime,
                details: newDetails
            };

            fetch(`${url}${reservation.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedReservation)
            })
            .then(() => {
                reservations[index] = updatedReservation;
                renderReservations(reservations);
                alert('Reservation updated successfully');
            })
            .catch(error => console.error('Error updating reservation:', error));
        } else {
            alert('Please fill in all fields');
        }
    });
};


document.addEventListener('DOMContentLoaded', () => {
    const url = 'http://localhost:3000/res/';

    // Fetch reservations
    const fetchReservations = () => {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                reservations = data;
                renderReservations(reservations);
            })
            .catch(error => console.error('Error fetching reservations:', error));
    };

    // Function to render reservations
    const renderReservations = (reservations) => {
        const reservationList = document.getElementById('reservationList');
        reservationList.innerHTML = '';

        reservations.forEach((reservation, index) => {
            const reservationItem = document.createElement('div');
            reservationItem.className = 'border-2 border-black p-4 m-4 rounded';
            reservationItem.innerHTML = `
                <h2 class="text-2xl font-bold mb-4">${reservation.name}</h2>
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
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reservation)
            })
            .then(response => response.json())
            .then(data => {
                reservations.push(data);
                renderReservations(reservations);
                alert('Reservation made successfully');
            })
            .catch(error => console.error('Error submitting reservation:', error));
        } else {
            alert('Please fill in all fields');
        }
    };
    // Event listener for reservation form submission
    document.getElementById('submitReservation').addEventListener('click', submitReservation);

    // Function to show reservation form
    document.getElementById('reservationButton').addEventListener('click', () => {
        document.getElementById('reservationFormContainer').classList.remove('hidden');
    });

    // Function to cancel reservation
    document.getElementById('cancelReservation').addEventListener('click', () => {
        document.getElementById('reservationFormContainer').classList.add('hidden');
    });

    // Fetch reservations on page load
    fetchReservations();
    
})
