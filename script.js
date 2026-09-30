const WHATSAPP_NUMBER = "923266822623";

let selectedPackage = "";
let selectedPrice = "";

const selectedName = document.getElementById("selectedName");
const selectedPriceEl = document.getElementById("selectedPrice");
const form = document.getElementById("orderForm");
const toast = document.getElementById("toast");

document.querySelectorAll(".choose").forEach(button => {
  button.addEventListener("click", () => {
    selectedPackage = button.dataset.package;
    selectedPrice = button.dataset.price;

    selectedName.textContent = selectedPackage;
    selectedPriceEl.textContent = `Rs. ${Number(selectedPrice).toLocaleString("en-PK")}`;

    document.getElementById("order").scrollIntoView({ behavior: "smooth" });
    showToast(`${selectedPackage} selected`);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!selectedPackage) {
    showToast("Pehle package select karein.");
    document.getElementById("packages").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const city = document.getElementById("city").value.trim();
  const payment = document.getElementById("payment").value;
  const address = document.getElementById("address").value.trim();

  const delivery = payment === "Advance Payment" ? "1 Day" : "3 Days";

  const message =
`TAQI STORE — NEW GTA V ORDER

Package: ${selectedPackage}
Price: Rs. ${Number(selectedPrice).toLocaleString("en-PK")}

Customer Name: ${name}
Phone: ${phone}
City: ${city}
Address: ${address}

Payment Method: ${payment}
Expected Delivery: ${delivery}`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2400);
}
