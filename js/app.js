// Global functions for inline onclick handlers
window.addWater = function (amountMl) {
    const counterElem = document.getElementById("water-counter");
    const progressBar = document.getElementById("water-progress-bar");
    if (!counterElem || !progressBar) return;

    let currentMl = parseInt(counterElem.textContent.replace(/,/g, "")) || 2100;
    let newMl = Math.min(3000, currentMl + amountMl);
    counterElem.textContent = newMl.toLocaleString();

    let percent = Math.round((newMl / 3000) * 100);
    progressBar.style.width = percent + "%";

    if (newMl >= 3000) {
        alert("🎉 Congratulations! You have reached your 3,000ml daily hydration target.");
    }
};

window.swapMeal = function (mealType) {
    const swaps = {
        breakfast: [
            { title: "Eggs & Avocado Toast", desc: "3 Scrambled Eggs + 2 Slices Sourdough + 1/2 Avocado (450 kcal, 26g Protein)" },
            { title: "Protein Berry Smoothie", desc: "1 Scoop Whey + 200ml Almond Milk + 1 Banana + 100g Berries (340 kcal, 30g Protein)" },
            { title: "Rolled Oats & Berry Bowl", desc: "50g Oats + 200g Greek Yogurt + Honey + 15g Chia Seeds (320 kcal, 28g Protein)" }
        ],
        lunch: [
            { title: "Turkey & Quinoa Wrap", desc: "150g Turkey Breast + Whole Grain Wrap + Spinach + Hummus (580 kcal, 42g Protein)" },
            { title: "Tuna & Brown Rice Bowl", desc: "1 Can Tuna + 150g Brown Rice + Cucumber + Olive Oil (520 kcal, 38g Protein)" },
            { title: "Chicken Breast & Quinoa Bowl", desc: "180g Chicken Breast + 150g Quinoa + Avocado + Steamed Broccoli (680 kcal, 45g Protein)" }
        ],
        preworkout: [
            { title: "Rice Cakes & Peanut Butter", desc: "3 Brown Rice Cakes + 20g Peanut Butter + Sliced Strawberry (280 kcal, 10g Protein)" },
            { title: "Apple & Honey Greek Yogurt", desc: "1 Sliced Crisp Apple + 150g Greek Yogurt + Honey Drizzle (240 kcal, 18g Protein)" },
            { title: "Banana & Almond Butter Toast", desc: "1 Large Banana + 2 Slices Sourdough + 15g Almond Butter (380 kcal, 14g Protein)" }
        ],
        postworkout: [
            { title: "Sirloin Steak & Roasted Potatoes", desc: "180g Sirloin Steak + 200g Baby Potatoes + Asparagus (650 kcal, 48g Protein)" },
            { title: "Tofu & Veggie Stir-Fry", desc: "250g Firm Tofu + Jasmine Rice + Mixed Peppers & Sesame (510 kcal, 30g Protein)" },
            { title: "Salmon & Sweet Potato Recovery Plate", desc: "200g Salmon Fillet + 200g Sweet Potato + Roasted Asparagus (620 kcal, 42g Protein)" }
        ]
    };

    const options = swaps[mealType];
    if (!options) return;

    const titleElem = document.getElementById(`meal-${mealType}-title`);
    const descElem = document.getElementById(`meal-${mealType}-desc`);

    if (titleElem && descElem) {
        // Pick a random alternative different from current
        let currentTitle = titleElem.textContent;
        let choices = options.filter(o => o.title !== currentTitle);
        let next = choices[Math.floor(Math.random() * choices.length)] || options[0];

        titleElem.textContent = next.title;
        descElem.textContent = next.desc;
    }
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Toggle
    const menuBtn = document.querySelector(".menu");
    const navLinks = document.querySelector(".navlinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.contains("open");
            if (isOpen) {
                navLinks.classList.remove("open");
                navLinks.style.display = "none";
            } else {
                navLinks.classList.add("open");
                navLinks.style.display = "flex";
                navLinks.style.position = "absolute";
                navLinks.style.top = "68px";
                navLinks.style.left = "14px";
                navLinks.style.right = "14px";
                navLinks.style.padding = "20px";
                navLinks.style.background = "white";
                navLinks.style.border = "1px solid #e1e6df";
                navLinks.style.borderRadius = "18px";
                navLinks.style.flexDirection = "column";
                navLinks.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                if (window.innerWidth <= 680) {
                    navLinks.style.display = "none";
                    navLinks.classList.remove("open");
                }
            });
        });
    }

    // 2. Active Page Link Highlighting
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const allNavLinks = document.querySelectorAll(".navlinks a, .nav-cta, .mobilebar a");

    allNavLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPath || (currentPath === "" && linkPath === "index.html")) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // 3. Grocery List Copy Button
    const copyGroceryBtn = document.getElementById("copy-grocery-btn");
    if (copyGroceryBtn) {
        copyGroceryBtn.addEventListener("click", () => {
            const checkedItems = Array.from(document.querySelectorAll('.grocery-item input[type="checkbox"]:checked'))
                .map(input => `• ${input.parentElement.textContent.trim()}`)
                .join("\n");

            if (navigator.clipboard && checkedItems) {
                navigator.clipboard.writeText(`FuelForm Athlete Grocery Checklist:\n${checkedItems}`);
            }
            alert("Athlete grocery shopping list copied to clipboard!");
        });
    }

    // 4. Simple Personal Plan Builder Interaction
    const planTabBtns = document.querySelectorAll(".plan-tab-btn");
    const planStructure = document.getElementById("plan-structure");

    const plansData = {
        training: [
            { stage: "07:30 · Breakfast", name: "Rolled Oats & Greek Yogurt", desc: "Complex carbs + 28g protein to prime your morning energy." },
            { stage: "12:30 · Lunch", name: "Chicken & Quinoa Bowl", desc: "Lean chicken breast, quinoa, avocado, and steamed greens (45g protein)." },
            { stage: "16:30 · Pre-Workout", name: "Banana, Berries & Chia", desc: "Fast-acting carbohydrate fuel 60-90 mins before training." },
            { stage: "20:00 · Post-Workout", name: "Grilled Salmon & Potatoes", desc: "Protein recovery plate with roasted sweet potatoes & broccoli (42g protein)." }
        ],
        rest: [
            { stage: "08:00 · Breakfast", name: "Veggie Omelet & Whole Toast", desc: "3 egg omelet with spinach, mushrooms, and avocado (24g protein)." },
            { stage: "13:00 · Lunch", name: "Turkey & Hummus Wrap", desc: "Whole grain wrap with sliced turkey, fresh greens, and veggies (35g protein)." },
            { stage: "16:30 · Afternoon Snack", name: "Handful Almonds & Apple", desc: "Healthy fats and fiber to keep blood sugar stable on non-training days." },
            { stage: "19:30 · Dinner", name: "Lean Steak & Roasted Veggies", desc: "Sustained amino acid release for muscle repair overnight (40g protein)." }
        ],
        quick: [
            { stage: "07:30 · Breakfast", name: "5-Min Whey Protein Smoothie", desc: "Whey protein, frozen berries, banana, and almond milk (30g protein)." },
            { stage: "12:30 · Lunch", name: "Canned Tuna & Rice Bowl", desc: "Pre-cooked jasmine rice, olive oil, tuna, and cherry tomatoes (38g protein)." },
            { stage: "16:00 · Quick Fuel", name: "Rice Cakes & Peanut Butter", desc: "Instant 2-minute snack for rapid glycogen replenishment." },
            { stage: "19:30 · Dinner", name: "Sheet-Pan Baked Chicken Thighs", desc: "Minimal effort 20-min oven bake with mixed vegetables (44g protein)." }
        ]
    };

    if (planTabBtns.length > 0 && planStructure) {
        planTabBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                planTabBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const planType = btn.dataset.plan;
                const selectedPlan = plansData[planType] || plansData.training;

                planStructure.innerHTML = selectedPlan.map(item => `
                    <div class="step-card">
                        <small>${item.stage}</small>
                        <h4>${item.name}</h4>
                        <p>${item.desc}</p>
                    </div>
                `).join('');
            });
        });
    }

    // 5. Contact Form Feedback
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you! Your message has been sent directly to Alex Carter.");
            contactForm.reset();
        });
    }

    // 6. Newsletter Form Feedback
    const newsletterForm = document.getElementById("newsletter-form");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Thank you for subscribing to weekly FuelForm tips!");
            newsletterForm.reset();
        });
    }

    // 7. Back to Top Button Functionality
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 250) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
