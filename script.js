import { collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";
import { db } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {

    // ===== FAQ =====
    const faqs = document.querySelectorAll(".faq-item");
    const search = document.getElementById("faqSearch");

    faqs.forEach(item => {
        item.addEventListener("click", () => {
            faqs.forEach(f => {
                if (f !== item) f.classList.remove("active");
            });
            item.classList.toggle("active");
        });
    });

    if (search) {
        search.addEventListener("keyup", () => {
            const value = search.value.toLowerCase();
            faqs.forEach(item => {
                const text = item.innerText.toLowerCase();
                item.style.display = text.includes(value) ? "block" : "none";
            });
        });
    }

    // ===== SCROLL ANIMATION =====
    const animatedItems = document.querySelectorAll(
        ".why-card, .testimonial-card, .faq-item, .hero h1, .brand-card, .car-card"
    );

    animatedItems.forEach(el => el.classList.add("fade-in"));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("show");
        });
    }, { threshold: 0.2 });

    animatedItems.forEach(el => observer.observe(el));

    // ===== BRAND FILTER =====
    const brandCards = document.querySelectorAll(".brand-card");

    brandCards.forEach(card => {
        card.addEventListener("click", () => {
            brandCards.forEach(b => b.classList.remove("active"));
            card.classList.add("active");

            const brand = card.getAttribute("data-brand");

            document.querySelectorAll(".car-card").forEach(car => {
                car.style.display =
                    car.getAttribute("data-brand") === brand ? "block" : "none";
            });
        });
    });

    // ===== SHOW ALL =====
    const showAllBtn = document.getElementById("showAllBtn");
    if (showAllBtn) {
        showAllBtn.addEventListener("click", () => {
            document.querySelectorAll(".car-card").forEach(car => {
                car.style.display = "block";
            });
            brandCards.forEach(b => b.classList.remove("active"));
        });
    }

    // ===== PRICE FILTER =====
    const priceFilter = document.getElementById("priceFilter");
    if (priceFilter) {
        priceFilter.addEventListener("change", e => {
            const value = e.target.value;

            document.querySelectorAll(".car-card").forEach(car => {
                const price = parseInt(car.innerText.replace(/[^0-9]/g, ""));

                if (
                    value === "low" && price < 250000 ||
                    value === "mid" && price >= 250000 && price <= 500000 ||
                    value === "high" && price > 500000 ||
                    value === "all"
                ) {
                    car.style.display = "block";
                } else {
                    car.style.display = "none";
                }
            });
        });
    }

    // ===== BOOKING POPUP =====
    const popup = document.getElementById("bookingPopup");
    const closePopup = document.getElementById("closePopup");
    const carTitle = document.getElementById("carTitle");

    let selectedCar = "";

    function attachBooking(button, name) {
        button.addEventListener("click", () => {
            selectedCar = name;
            carTitle.innerText = "Book " + name;
            popup.style.display = "flex";
        });
    }

    document.querySelectorAll(".book-btn").forEach(btn => {
        const name = btn.closest(".car-card").querySelector("h3").innerText;
        attachBooking(btn, name);
    });

    if (closePopup) {
        closePopup.onclick = () => popup.style.display = "none";
    }

    // ===== WHATSAPP BOOKING =====
    const sendBooking = document.getElementById("sendBooking");

    if (sendBooking) {
        sendBooking.addEventListener("click", () => {

            const name = document.getElementById("userName").value;
            const phone = document.getElementById("userPhone").value;
            const type = document.getElementById("rentalType").value;
            const start = document.getElementById("startDate").value;
            const end = document.getElementById("endDate").value;
            const location = document.getElementById("pickupLocation").value;
            const details = document.getElementById("tripDetails").value;

            if (!name || !phone || !type || !start || !end || !location) {
                alert("Please fill all fields");
                return;
            }

            const message = `🚗 Booking Request
Car: ${selectedCar}
Name: ${name}
Phone: ${phone}
Rental Type: ${type}
Start Date: ${start}
End Date: ${end}
Pickup Location: ${location}
Details: ${details}`;

            window.open(`https://wa.me/256775607625?text=${encodeURIComponent(message)}`, "_blank");
        });
    }

    // ===== FILE NAME DISPLAY =====
    const fileInput = document.getElementById("carImage");
    const fileNameText = document.getElementById("fileName");

    if (fileInput && fileNameText) {
        fileInput.addEventListener("change", () => {
            fileNameText.textContent = fileInput.files[0]
                ? fileInput.files[0].name
                : "No file chosen";
        });
    }

   // ===== ADD CAR TO FIREBASE =====
const addCarBtn = document.getElementById("addCarBtn");

if (addCarBtn) {
    addCarBtn.addEventListener("click", async () => {

        const name = document.getElementById("carName").value;
        const price = document.getElementById("carPrice").value;
        const imageInput = document.getElementById("carImage");

        const image = imageInput.files[0]
            ? URL.createObjectURL(imageInput.files[0])
            : "";

        if (!name || !price) {
            alert("Please fill all fields");
            return;
        }

        try {
            await addDoc(collection(db, "cars"), {
                name: name,
                price: price,
                image: image,
                createdAt: new Date()
            });

            alert("Car uploaded successfully ✅");

            document.getElementById("carName").value = "";
            document.getElementById("carPrice").value = "";
            document.getElementById("carImage").value = "";

        } catch (error) {
    console.error(error);
    alert("Upload failed ❌");
}
});
}

});
