const seatSelect = document.getElementsByClassName("btn-seat");
const select = document.getElementById("selected");
let count = 0;
let availableSeat = 40;
let grandPrice = 0;
let totalDiscount = 0;

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

    // coupon area
    if (count == 4) {
      const applyCoupon = document.getElementById("applyCoupon");
      applyCoupon.removeAttribute("disabled");
      applyCoupon.style.backgroundColor = "#1DD100";

      applyCoupon.addEventListener("click", function () {
        const inputField = document.getElementById("input-field").value;
        if (inputField == "NEW15") {
          totalDiscount = totalPrice * 0.15;
          grandPrice = totalPrice * 0.85;
          document.getElementById("coupon-area").classList.add("hidden");
        } else if (inputField == "Couple 20") {
          totalDiscount = totalPrice * 0.2;
          grandPrice = totalPrice * 0.8;
          document.getElementById("coupon-area").classList.add("hidden");
        } else {
          alert("Invalid Coupon Code");
          document.getElementById("input-field").value = "";
          document.getElementById("total-discount").removeChild(div);
        }
        setInnerText("grand-total", grandPrice);

        const div = document.createElement("div");

        div.innerHTML = `<div class="flex justify-between mt-2">
          <p>Discount Price</p>
          <p>BDT <span id="total-price">${totalDiscount}</span></p>
          </div>`;

        document.getElementById("total-discount").appendChild(div);
      });
    }

    const phoneNumberInput = document.getElementById("phoneNumber");
    const btnNext = document.getElementById("next");
    const popUp = document.getElementById("popUp");

    function nextButton() {
      const phoneNumber = phoneNumberInput.value;

      if (count >= 1 && phoneNumber.trim() !== "") {
        btnNext.removeAttribute("disabled");
        btnNext.style.backgroundColor = "#1DD100";

        if (!btnNext.hasListener) {
          btnNext.addEventListener("click", function () {
            popUp.showModal();
          });
          btnNext.hasListener = true;
        }
      } else {
        btnNext.setAttribute("disabled", true);
        btnNext.style.backgroundColor = "";
      }
    }

    nextButton();

    phoneNumberInput.addEventListener("input", nextButton);
    const closePopUp = document.getElementById("closePopUp");
    closePopUp.addEventListener("click", function () {
      popUp.close();
    });
  });
}

function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}
