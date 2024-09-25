const backendURL = "http://localhost:3000";

getBookings();

async function getBookings() {
  const bookingsResponse = await fetch(`${backendURL}/bookings/`);
  const bookings = await bookingsResponse.json();
  if (bookings.bookings.length === 0) {
    return;
  } else {
    displayBookings(bookings.bookings);
  }
}

function displayBookings(bookings) {
  bookings = bookings
    .map((e) => e.tripId)
    .sort((a, b) => moment.utc(a.date) - moment.utc(b.date));
  const bookingContainer = document.querySelector("#bookings-container");
  const myBookings = document.querySelector("#my-bookings-title");
  const noBookings = document.querySelector("#no-bookings");
  const planMessage = document.querySelector("#plan-message");
  const separator = document.querySelector("#separator");
  const enjoyMessage = document.querySelector("#enjoy-message");
  noBookings.style.display = "none";
  planMessage.style.display = "none";
  myBookings.style.display = "block";
  enjoyMessage.style.display = "block";
  separator.style.display = "block";
  for (let booking of bookings) {
    const time = moment.utc(booking.date).format("HH:mm");
    const timeUntilDeparture = getTimeUntilDeparture(booking.date);
    bookingContainer.innerHTML += `<div class="booking-container" id="${booking._id}">
  <div class="trip">${booking.departure} > ${booking.arrival}</div>
  <div class="time">${time}</div>
  <div class="price">${booking.price}€</div>
  <div class="timeUntilDeparture">${timeUntilDeparture}</div>
  </div>`;
  }
}

function getTimeUntilDeparture(dateTime) {
  const timeNow = moment.utc();
  const departureTime = moment.utc(dateTime);
  const timeUntilDeparture = Math.round((departureTime - timeNow) / 1000 / 60);
  if (timeUntilDeparture < 0) {
    return "Departed";
  } else if (timeUntilDeparture < 60) {
    return `Departure in ${timeUntilDeparture} minutes`;
  } else if (timeUntilDeparture < 24 * 60) {
    return `Departure in ${Math.round(timeUntilDeparture / 60)} hours`;
  } else {
    return `Departure in ${Math.round(timeUntilDeparture / 60 / 24)} days`;
  }
}
