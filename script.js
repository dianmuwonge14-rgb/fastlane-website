document.addEventListener("DOMContentLoaded", () => {

    const faqs = document.querySelectorAll(".faq-item");
    const search = document.getElementById("faqSearch");

    // FAQ CLICK FUNCTION
    faqs.forEach(item => {
        item.addEventListener("click", () => {

            faqs.forEach(f => {
                if (f !== item) {
                    f.classList.remove("active");
                }
            });

            item.classList.toggle("active");
        });
    });

    // FAQ SEARCH FUNCTION
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

    // Add initial class
    animatedItems.forEach(el => el.classList.add("fade-in"));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, {
        threshold: 0.2
    });

    animatedItems.forEach(el => observer.observe(el));

});
// ===== BRAND FILTER (FOR CAR SECTION) =====
const brandCards = document.querySelectorAll(".brand-card");

brandCards.forEach(card => {
    card.addEventListener("click", () => {
        const brand = card.getAttribute("data-brand");

        // FUTURE: filter cars
        const cars = document.querySelectorAll(".car-card");

        cars.forEach(car => {
            if (brand === "all" || car.getAttribute("data-brand") === brand) {
                car.style.display = "block";
            } else {
                car.style.display = "none";
            }
        });

        console.log("Filtering by:", brand);
    });
});
// ===== SHOW ALL BUTTON =====
document.getElementById("showAllBtn").addEventListener("click", () => {
    document.querySelectorAll(".car-card").forEach(car => {
        car.style.display = "block";
    });

    document.querySelectorAll(".brand-card").forEach(b => b.classList.remove("active"));
});

// ===== ACTIVE BRAND + FILTER =====
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

// ===== BOOKING POPUP =====
const popup = document.getElementById("bookingPopup");
const closePopup = document.getElementById("closePopup");

document.querySelectorAll(".book-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        popup.style.display = "flex";
    });
});

closePopup.onclick = () => popup.style.display = "none";

// ===== WHATSAPP SEND =====
document.getElementById("sendBooking").addEventListener("click", () => {

    const inputs = document.querySelectorAll(".popup-content input, textarea");

    const message = `
Booking Request:
Name: ${inputs[0].value}
Phone: ${inputs[1].value}
Details: ${inputs[2].value}
    `;

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

    // CREATE DOTS
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

    // AUTO SLIDE
    setInterval(() => {
        index = (index + 1) % images.length;
        updateSlider();
    }, 3000);

});
