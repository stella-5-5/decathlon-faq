document.addEventListener("DOMContentLoaded", () => {
    // FAQ answers 
    document.querySelectorAll(".faq-question").forEach(question => {
        question.addEventListener("click", () => {
            const parent = question.parentElement;
            const answer = parent.querySelector(".faq-answer");
            const isActive = parent.classList.toggle("active");

            if (isActive) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.opacity = "1";
                answer.style.transition = "max-height 0.3s ease-out, opacity 0.3s ease-out";
            } else {
                answer.style.maxHeight = "0";
                answer.style.opacity = "0";
                answer.style.transition = "max-height 0.3s ease-in, opacity 0.2s ease-in";
            }
        });
    });

    // Search Function
    const searchInput = document.getElementById("search-input");
    const noResultsMessage = document.getElementById("no-results");
    
    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();
        const faqItems = document.querySelectorAll(".faq-item");
        let hasResults = false;

        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question");
            const answer = item.querySelector(".faq-answer");
            const questionText = question.innerText.toLowerCase();
            const answerText = answer.innerText.toLowerCase();

            if (questionText.includes(query) || answerText.includes(query)) {
                item.classList.remove("hidden");
                highlightText(question, query);
                highlightText(answer, query);
                hasResults = true;
            } else {
                item.classList.add("hidden");
                resetText(question);
                resetText(answer);
            }
        });

        noResultsMessage.style.display = hasResults ? "none" : "block";
    });

    // Highlight matching text in the FAQ
    function highlightText(element, query) {
        if (!query) return;
        const regex = new RegExp(`(${query})`, "gi");
        element.innerHTML = element.textContent.replace(regex, "<span class='highlight'>$1</span>");
    }

    // Reset text back to original without highlight
    function resetText(element) {
        element.innerHTML = element.textContent;
    }
});
