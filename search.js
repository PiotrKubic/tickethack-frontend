const backendURL = "http://localhost:3000";

searchEventListener();

async function searchEventListener() {
  const searchButton = document.querySelector("#search");
  searchButton.addEventListener("click", async () => {
    const departure = document.querySelector("#departure").value;
    const arrival = document.querySelector("#arrival").value;
    const date = document.querySelector("#date").value;
    const request = { departure, arrival, date };
    const tripsResponse = await fetch(`${backendURL}/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const trips = await tripsResponse.json();
    displayTrips(trips);
  });
}

function displayTrips(trips) {
  const resultContainer = document.querySelector("#result-container");
  const resultLogo = document.querySelector("#result-logo");
  const notFoundLogo = document.querySelector("#notFound-logo");
  const resultMessage = document.querySelector("#result-message");
  const separator = document.querySelector("#separator");
  if (trips.result === false) {
    const tripContainers = document.querySelectorAll(".trip-container");
    for (let tripContainer of tripContainers) {
      tripContainer.remove();
    }
    resultLogo.style.display = "none";
    notFoundLogo.style.display = "block";
    resultMessage.textContent = "No trip found.";
    return;
  }
  resultLogo.style.display = "none";
  separator.style.display = "none";
  for (let trip of trips.trips) {
    const time = moment.utc(trip.date).format("HH:mm");
    resultContainer.innerHTML += `<div class="trip-container" id="${trip._id}">
        <div class="trip">${trip.departure} > ${trip.arrival}</div>
        <div class="time">${time}</div>
        <div class="price">${trip.price}€</div>
        <button class="bookButton">Book</button>
      </div>`;
  }
}
