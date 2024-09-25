const backendURL = "http://localhost:3000";

async function displayCart() {
  const response = await fetch(`${backendURL}/cart`);
  const data = await response.json();
  console.log(data);

  for (let trips of data.carts) {
    const { departure, arrival, date, price, _id } = trips.tripId;
    document.querySelector("#bottom-top-container").innerHTML += `
          <div id="${_id}">
            <span id="departure">${departure}</span>><span id="arrival">${arrival}</span>
            <div id="departureTime">${date.slice(11, 16)}</div>
            <div id="price">${price}€</div>
            <button class="delete">X</button>
          </div>`;
    // console.log(typeof document.querySelector("#price").textContent);
  }
  const allPrice = data.carts.map((e) => e.tripId.price);
  calculateTotal(allPrice);
  deleteTrip();
}

displayCart();

function deleteTrip() {
  let allDeleteBtn = document.querySelectorAll(".delete");
  for (let singleDelete of allDeleteBtn) {
    singleDelete.addEventListener("click", callDelete);
  }
}

function callDelete() {
  this.parentNode.remove();
  //! call display cart
}

function calculateTotal(allPrice) {
  let total = 0;
  allPrice.forEach((sum) => (total += sum));
  document.querySelector("#total").textContent = total;
}
