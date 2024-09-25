const backendURL = "http://localhost:3000";

getBookings();

async function getBookings() {
  const bookingsResponse = await fetch(`${backendURL}/bookings/`);
  const bookings = await bookingsResponse.json();
  displayBookings(bookings.bookings);
}

function displayBookings(bookings) {
  bookings = bookings.map((e) => e.tripId);
  const resultContainer = document.querySelector("#result-container");
  const noBookings = document.querySelector("#no-bookings");
  const planMessage = document.querySelector("#plan-message");
  for (let booking of bookings) {
    const time = moment.utc(booking.date).format("HH:mm");
    const timeUntilDeparture = getTimeUntilDeparture(booking.date);
    noBookings.style.display = "none";
    planMessage.style.display = "none";
    resultContainer.innerHTML += `<div class="booking-container" id="${booking._id}">
  <div class="trip">${booking.departure} > ${booking.arrival}</div>
  <div class="time">${time}</div>
  <div class="price">${booking.price}€</div>
  </div>`;
  }
}

function getTimeUntilDeparture(dateTime) {
  const timeNow = moment.utc();
  console.log(timeNow);
  const departureTime = moment.utc(dateTime);
  console.log(departureTime);
  const timeUntilDeparture = departureTime - timeNow;
  console.log(timeUntilDeparture);
  if (timeUntilDeparture < 0) {
    return "Departed";
  }
}
