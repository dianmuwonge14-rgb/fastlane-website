document.addEventListener("DOMContentLoaded", () => {

    const faqs = document.querySelectorAll(".faq-item");
    const search = document.getElementById("faqSearch");

    // CLICK FUNCTION
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

    // SEARCH FUNCTION
    search.addEventListener("keyup", () => {
        const value = search.value.toLowerCase();

        faqs.forEach(item => {
            const text = item.innerText.toLowerCase();

            item.style.display = text.includes(value) ? "block" : "none";
        });
    });

});
