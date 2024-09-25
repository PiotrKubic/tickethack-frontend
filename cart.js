const backendURL = "http://localhost:3000";

displayCart();

async function displayCart() {
  const response = await fetch(`${backendURL}/cart`);
  const data = await response.json();
  const noTrip = document.querySelector("#no-trip");
  const bottomContainer = document.querySelector("#bottom-container");
  // console.log(data);
  if (data.result === false) {
    noTrip.style.display = "flex";
    bottomContainer.style.display = "none";
    return;
  }
  noTrip.style.display = "none";
  bottomContainer.style.display = "flex";
  document.querySelector(
    "#bottom-top-container"
  ).innerHTML += `<div id="Cart">My cart</div>`;
  for (let trips of data.carts) {
    const { departure, arrival, date, price, _id } = trips.tripId;
    document.querySelector("#bottom-top-container").innerHTML += `
          <div id="${_id}" class="trips">
            <div id="da"><span id="departure">${departure}</span>><span id="arrival">${arrival}</span></div>
            <div id="departureTime">${date.slice(11, 16)}</div>
            <div id="price">${price}€</div>
            <button class="delete">X</button>
          </div>`;
  }
  const allPrice = data.carts.map((e) => e.tripId.price);
  calculateTotal(allPrice);
  purchase();
  deleteTrip();
}

function deleteTrip() {
  let allDeleteBtn = document.querySelectorAll(".delete");
  for (let singleDelete of allDeleteBtn) {
    singleDelete.addEventListener("click", async function () {
      const id = this.parentNode.id;
      console.log(id);
      await fetch(`${backendURL}/cart/delete`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      this.parentNode.remove();
    });
  }
}

function calculateTotal(allPrice) {
  let total = 0;
  allPrice.forEach((sum) => (total += sum));
  document.querySelector("#total").textContent = total;
}

async function purchase() {
  const purchaseBtn = document.querySelector("#purchase");
  purchaseBtn.addEventListener("click", async function () {
    await fetch(`${backendURL}/bookings/book-all`, {
      method: "POST",
    });
    window.location.href = "./bookings.html";
  });
}
