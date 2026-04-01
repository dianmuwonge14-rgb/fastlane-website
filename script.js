document.addEventListener("DOMContentLoaded", () => {

    const faqs = document.querySelectorAll(".faq-item");
    const search = document.getElementById("faqSearch");

    // ===== FAQ =====
    faqs.forEach(item => {
        item.addEventListener("click", () => {
            faqs.forEach(f => {
                if (f !== item) f.classList.remove("active");
            });
            item.classList.toggle("active");
        });
    });

    search.addEventListener("keyup", () => {
        const value = search.value.toLowerCase();
        faqs.forEach(item => {
            const text = item.innerText.toLowerCase();
            item.style.display = text.includes(value) ? "block" : "none";
        });
    });

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

    // ===== BRAND FILTER + ACTIVE =====
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
    document.getElementById("showAllBtn").addEventListener("click", () => {
        document.querySelectorAll(".car-card").forEach(car => {
            car.style.display = "block";
        });
        brandCards.forEach(b => b.classList.remove("active"));
    });

    // ===== PRICE FILTER =====
    document.getElementById("priceFilter").addEventListener("change", e => {
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

    // ===== SMART BOOKING POPUP =====
    const popup = document.getElementById("bookingPopup");
    const closePopup = document.getElementById("closePopup");
    const carTitle = document.getElementById("carTitle");

    let selectedCar = "";

    document.querySelectorAll(".book-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            const card = btn.closest(".car-card");
            selectedCar = card.querySelector("h3").innerText;

            carTitle.innerText = "Book " + selectedCar;

            popup.style.display = "flex";
        });
    });

    closePopup.onclick = () => popup.style.display = "none";

    document.getElementById("sendBooking").addEventListener("click", () => {

        const name = document.getElementById("userName").value;
        const phone = document.getElementById("userPhone").value;
        const type = document.getElementById("rentalType").value;
        const start = document.getElementById("startDate").value;
        const end = document.getElementById("endDate").value;
        const location = document.getElementById("pickupLocation").value;
        const details = document.getElementById("tripDetails").value;

        const message = `🚗 Booking Request
Car: ${selectedCar}
Name: ${name}
Phone: ${phone}
Rental Type: ${type}
Start Date: ${start}
End Date: ${end}
Pickup Location: ${location}
Details: ${details}`;

        const url = `https://wa.me/256775607625?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
    });

    // ===== ADVANCED SLIDER =====
    document.querySelectorAll(".car-slider").forEach(slider => {

        const slides = slider.querySelector(".slides");
        const images = slides.querySelectorAll("img");
        const prev = slider.querySelector(".prev");
        const next = slider.querySelector(".next");
        const dotsContainer = slider.querySelector(".dots");

        let index = 0;

        images.forEach((_, i) => {
            const dot = document.createElement("span");
            if (i === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {
                index = i;
                updateSlider();
            });

            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll("span");

        function updateSlider() {
            slides.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(d => d.classList.remove("active"));
            dots[index].classList.add("active");
        }

        next.addEventListener("click", () => {
            index = (index + 1) % images.length;
            updateSlider();
        });

        prev.addEventListener("click", () => {
            index = (index - 1 + images.length) % images.length;
            updateSlider();
        });

        setInterval(() => {
            index = (index + 1) % images.length;
            updateSlider();
        }, 3000);

    });

});
