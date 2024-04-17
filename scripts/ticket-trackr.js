const seatSelect = document.getElementsByClassName("btn-seat");
const select = document.getElementById("selected");
let count = 0;
let availableSeat = 40;

for (const btn of seatSelect) {
  btn.addEventListener("click", function (e) {
    if (count >= 4) {
      alert("You can take maximum four seats");
      return;
    }

    count += 1;
    availableSeat = availableSeat - 1;
    btn.dataset.selected = "true";
    btn.style.backgroundColor = "#1DD100";
    select.classList.add("text-[#1DD100]");
    const seatNumber = e.target.innerText;

    const div = document.createElement("div");
    div.innerHTML = `
        <div class="flex justify-between">
        <p>${seatNumber}</p>
        <p>Economoy</p>
        <p>550</p>
        </div> `;
    setInnerText("seat-count", count);
    document.getElementById("seat-price").appendChild(div);

    const totalPrice = 550 * count;
    setInnerText("total-price", totalPrice);
    setInnerText("grand-total", totalPrice);
    setInnerText("total-seat", availableSeat);
  });
}

function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}
