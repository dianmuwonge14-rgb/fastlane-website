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

    document.querySelectorAll(".book-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            const card = btn.closest(".car-card");
            selectedCar = card.querySelector("h3").innerText;

            carTitle.innerText = "Book " + selectedCar;
            popup.style.display = "flex";
        });
    });

    if (closePopup) {
        closePopup.onclick = () => popup.style.display = "none";
    }

    // ===== VALIDATED BOOKING =====
    const sendBooking = document.getElementById("sendBooking");

    if (sendBooking) {
        sendBooking.addEventListener("click", () => {

            const name = document.getElementById("userName");
            const phone = document.getElementById("userPhone");
            const type = document.getElementById("rentalType");
            const start = document.getElementById("startDate");
            const end = document.getElementById("endDate");
            const location = document.getElementById("pickupLocation");

            [name, phone, type, start, end, location].forEach(input => {
                input.classList.remove("input-error");
            });

            let valid = true;

            if (name.value.trim() === "") {
                name.classList.add("input-error");
                valid = false;
            }

            if (phone.value.trim() === "") {
                phone.classList.add("input-error");
                valid = false;
            }

            if (type.value === "") {
                type.classList.add("input-error");
                valid = false;
            }

            if (start.value === "") {
                start.classList.add("input-error");
                valid = false;
            }

            if (end.value === "") {
                end.classList.add("input-error");
                valid = false;
            }

            if (location.value.trim() === "") {
                location.classList.add("input-error");
                valid = false;
            }

            if (!valid) {
                alert("Please fill in all required fields.");
                return;
            }

            const details = document.getElementById("tripDetails").value;

            const message = `🚗 Booking Request
Car: ${selectedCar}
Name: ${name.value}
Phone: ${phone.value}
Rental Type: ${type.value}
Start Date: ${start.value}
End Date: ${end.value}
Pickup Location: ${location.value}
Details: ${details}`;

            const url = `https://wa.me/256775607625?text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        });
    }

    // ===== FILE UPLOAD NAME DISPLAY =====
    const fileInput = document.getElementById("carImage");
    const fileNameText = document.getElementById("fileName");

    if (fileInput && fileNameText) {
        fileInput.addEventListener("change", () => {
            fileNameText.textContent = fileInput.files[0]
                ? fileInput.files[0].name
                : "No file chosen";
        });
    }

    // ===== SLIDER =====
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
