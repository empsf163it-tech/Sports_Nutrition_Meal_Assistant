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

let currentPlanMode = "training";

const plansData = {
    training: {
        target: "Target: 2,450 kcal",
        protein: "165g Protein",
        focus: "Optimized for Workout Performance & Glycogen Synthesis",
        eyebrow: "DAILY MEAL SCHEDULE · TRAINING DAY",
        desc: "Organize your daily intake around your workouts. Easily swap meals if your schedule or food preferences change.",
        items: [
            { stage: "07:30 · Breakfast", name: "Rolled Oats & Greek Yogurt", desc: "Complex carbs + 28g protein to prime your morning energy.", protein: "28g protein", calories: "420 kcal" },
            { stage: "12:30 · Lunch", name: "Chicken & Quinoa Bowl", desc: "Lean chicken breast, quinoa, avocado, and steamed greens.", protein: "45g protein", calories: "680 kcal" },
            { stage: "16:30 · Pre-Workout", name: "Banana, Berries & Chia", desc: "Fast-acting carbohydrate fuel 60-90 mins before training.", protein: "15g protein", calories: "380 kcal" },
            { stage: "20:00 · Post-Workout", name: "Grilled Salmon & Sweet Potato", desc: "Protein recovery plate with roasted sweet potatoes & broccoli.", protein: "42g protein", calories: "620 kcal" }
        ],
        schedule: [
            { slot: "Breakfast", time: "07:30 AM", title: "Rolled Oats & Berry Bowl", desc: "50g Oats + 200g Greek Yogurt + Honey + 15g Chia Seeds (420 kcal, 28g Protein)" },
            { slot: "Lunch", time: "12:30 PM", title: "Chicken Breast & Quinoa Bowl", desc: "180g Chicken Breast + 150g Quinoa + Avocado + Steamed Broccoli (680 kcal, 45g Protein)" },
            { slot: "Pre-Workout", time: "04:30 PM", title: "Banana & Almond Butter Toast", desc: "1 Large Banana + 2 Slices Sourdough + 15g Almond Butter (380 kcal, 15g Protein)" },
            { slot: "Post-Workout", time: "08:00 PM", title: "Salmon & Sweet Potato Recovery Plate", desc: "200g Salmon Fillet + 200g Sweet Potato + Roasted Asparagus (620 kcal, 42g Protein)" }
        ],
        swaps: {
            breakfast: [
                { title: "Rolled Oats & Berry Bowl", desc: "50g Oats + 200g Greek Yogurt + Honey + 15g Chia Seeds (420 kcal, 28g Protein)" },
                { title: "Eggs & Avocado Toast", desc: "3 Scrambled Eggs + 2 Slices Sourdough + 1/2 Avocado (450 kcal, 26g Protein)" },
                { title: "Protein Berry Smoothie", desc: "1 Scoop Whey + 200ml Almond Milk + 1 Banana + 100g Berries (340 kcal, 30g Protein)" }
            ],
            lunch: [
                { title: "Chicken Breast & Quinoa Bowl", desc: "180g Chicken Breast + 150g Quinoa + Avocado + Steamed Broccoli (680 kcal, 45g Protein)" },
                { title: "Turkey & Quinoa Wrap", desc: "150g Turkey Breast + Whole Grain Wrap + Spinach + Hummus (580 kcal, 42g Protein)" },
                { title: "Tuna & Brown Rice Bowl", desc: "1 Can Tuna + 150g Brown Rice + Cucumber + Olive Oil (520 kcal, 38g Protein)" }
            ],
            preworkout: [
                { title: "Banana & Almond Butter Toast", desc: "1 Large Banana + 2 Slices Sourdough + 15g Almond Butter (380 kcal, 15g Protein)" },
                { title: "Rice Cakes & Peanut Butter", desc: "3 Brown Rice Cakes + 20g Peanut Butter + Sliced Strawberry (280 kcal, 10g Protein)" },
                { title: "Apple & Honey Greek Yogurt", desc: "1 Sliced Crisp Apple + 150g Greek Yogurt + Honey Drizzle (240 kcal, 18g Protein)" }
            ],
            postworkout: [
                { title: "Salmon & Sweet Potato Recovery Plate", desc: "200g Salmon Fillet + 200g Sweet Potato + Roasted Asparagus (620 kcal, 42g Protein)" },
                { title: "Sirloin Steak & Roasted Potatoes", desc: "180g Sirloin Steak + 200g Baby Potatoes + Asparagus (650 kcal, 48g Protein)" },
                { title: "Tofu & Veggie Power Stir-Fry", desc: "250g Firm Tofu + Jasmine Rice + Mixed Peppers & Sesame (510 kcal, 30g Protein)" }
            ]
        }
    },
    rest: {
        target: "Target: 1,950 kcal",
        protein: "145g Protein",
        focus: "High Healthy Fats & Active Tissue Muscle Repair",
        eyebrow: "DAILY MEAL SCHEDULE · REST DAY RECOVERY",
        desc: "Moderate carb intake with sustained amino acid release to maximize muscle recovery without excess calories.",
        items: [
            { stage: "08:00 · Breakfast", name: "Veggie Omelet & Whole Toast", desc: "3 egg omelet with spinach, mushrooms, and avocado.", protein: "26g protein", calories: "380 kcal" },
            { stage: "13:00 · Lunch", name: "Turkey & Hummus Wrap", desc: "Whole grain wrap with sliced turkey, fresh greens, and veggies.", protein: "36g protein", calories: "520 kcal" },
            { stage: "16:30 · Afternoon Snack", name: "Greek Yogurt & Almond Bowl", desc: "Plain Greek yogurt topped with raw almonds & blueberries.", protein: "24g protein", calories: "310 kcal" },
            { stage: "19:30 · Dinner", name: "Lean Steak & Roasted Veggies", desc: "Sustained amino acid release for muscle repair overnight.", protein: "42g protein", calories: "580 kcal" }
        ],
        schedule: [
            { slot: "Breakfast", time: "08:00 AM", title: "Veggie Omelet & Whole Toast", desc: "3 Eggs + Baby Spinach + Mushrooms + 1 Slice Whole Grain Toast (380 kcal, 26g Protein)" },
            { slot: "Lunch", time: "01:00 PM", title: "Turkey & Hummus Wrap", desc: "150g Sliced Turkey + Whole Wheat Wrap + Hummus + Cucumbers (520 kcal, 36g Protein)" },
            { slot: "Afternoon Snack", time: "04:30 PM", title: "Greek Yogurt & Almond Bowl", desc: "180g Greek Yogurt + 15g Almonds + Fresh Blueberries (310 kcal, 24g Protein)" },
            { slot: "Dinner", time: "07:30 PM", title: "Lean Steak & Roasted Veggies", desc: "180g Sirloin Steak + Roasted Broccoli + Zucchini + Olive Oil (580 kcal, 42g Protein)" }
        ],
        swaps: {
            breakfast: [
                { title: "Veggie Omelet & Whole Toast", desc: "3 Eggs + Baby Spinach + Mushrooms + 1 Slice Whole Grain Toast (380 kcal, 26g Protein)" },
                { title: "Cottage Cheese & Walnut Bowl", desc: "200g Low-Fat Cottage Cheese + 20g Walnuts + Fresh Berries (320 kcal, 28g Protein)" },
                { title: "Avocado & Smoked Salmon Toast", desc: "100g Smoked Salmon + 1/2 Avocado + Whole Grain Toast (410 kcal, 25g Protein)" }
            ],
            lunch: [
                { title: "Turkey & Hummus Wrap", desc: "150g Sliced Turkey + Whole Wheat Wrap + Hummus + Cucumbers (520 kcal, 36g Protein)" },
                { title: "Grilled Chicken Mediterranean Salad", desc: "180g Chicken Breast + Feta + Olives + Mixed Greens + Olive Oil (490 kcal, 40g Protein)" },
                { title: "Egg Salad & Seeded Bread", desc: "3 Hard Boiled Eggs + Greek Yogurt Dressing + Seeded Bread (460 kcal, 24g Protein)" }
            ],
            preworkout: [
                { title: "Greek Yogurt & Almond Bowl", desc: "180g Greek Yogurt + 15g Almonds + Fresh Blueberries (310 kcal, 24g Protein)" },
                { title: "Handful Almonds & Green Apple", desc: "30g Raw Almonds + 1 Granny Smith Apple (230 kcal, 6g Protein)" },
                { title: "Cottage Cheese & Cucumber Slices", desc: "150g Cottage Cheese + Sliced Cucumber + Black Pepper (170 kcal, 18g Protein)" }
            ],
            postworkout: [
                { title: "Lean Steak & Roasted Veggies", desc: "180g Sirloin Steak + Roasted Broccoli + Zucchini + Olive Oil (580 kcal, 42g Protein)" },
                { title: "Baked Cod & Mediterranean Greens", desc: "220g Wild Cod + Roasted Tomatoes + Capers + Steamed Asparagus (420 kcal, 44g Protein)" },
                { title: "Grilled Pork Tenderloin & Salad", desc: "180g Pork Tenderloin + Roasted Carrots + Mixed Herb Salad (490 kcal, 39g Protein)" }
            ]
        }
    },
    quick: {
        target: "Target: 2,150 kcal",
        protein: "150g Protein",
        focus: "Rapid High-Protein Meals Ready in Under 15 Minutes",
        eyebrow: "DAILY MEAL SCHEDULE · QUICK & EASY PREP",
        desc: "Speed-focused meals engineered for busy athletes needing minimal preparation and fast cleanup.",
        items: [
            { stage: "07:30 · Breakfast", name: "5-Min Whey Protein Smoothie", desc: "Whey protein, frozen berries, banana, and almond milk.", protein: "30g protein", calories: "350 kcal" },
            { stage: "12:30 · Lunch", name: "Canned Tuna & Jasmine Rice", desc: "Pre-cooked jasmine rice, olive oil, tuna, and cherry tomatoes.", protein: "38g protein", calories: "510 kcal" },
            { stage: "16:00 · Quick Fuel", name: "High-Protein Energy Wrap", desc: "Whole wheat wrap with sliced turkey, spinach, and hummus.", protein: "32g protein", calories: "480 kcal" },
            { stage: "19:30 · Dinner", name: "Sheet-Pan Baked Chicken Thighs", desc: "Minimal effort oven bake with mixed vegetables.", protein: "44g protein", calories: "610 kcal" }
        ],
        schedule: [
            { slot: "Breakfast", time: "07:30 AM", title: "5-Min Whey Protein Smoothie", desc: "1 Scoop Whey + 1 Banana + 100g Frozen Berries + Almond Milk (350 kcal, 30g Protein)" },
            { slot: "Lunch", time: "12:30 PM", title: "Canned Tuna & Jasmine Rice Bowl", desc: "1 Can Tuna + 150g Microwave Rice + Olive Oil + Cherry Tomatoes (510 kcal, 38g Protein)" },
            { slot: "Quick Fuel", time: "04:00 PM", title: "High-Protein Energy Wrap", desc: "1 Whole Wheat Wrap + 100g Turkey Slices + Hummus + Spinach (480 kcal, 32g Protein)" },
            { slot: "Dinner", time: "07:30 PM", title: "Sheet-Pan Baked Chicken Thighs", desc: "200g Boneless Chicken Thighs + Mixed Frozen Veggies + Olive Oil (610 kcal, 44g Protein)" }
        ],
        swaps: {
            breakfast: [
                { title: "5-Min Whey Protein Smoothie", desc: "1 Scoop Whey + 1 Banana + 100g Frozen Berries + Almond Milk (350 kcal, 30g Protein)" },
                { title: "Microwave PB & Oats Bowl", desc: "50g Instant Oats + 1 Scoop Protein + 15g Peanut Butter (390 kcal, 27g Protein)" },
                { title: "Quick Scrambled Eggs & Pita", desc: "3 Eggs + Whole Wheat Pita + Salsa (360 kcal, 24g Protein)" }
            ],
            lunch: [
                { title: "Canned Tuna & Jasmine Rice Bowl", desc: "1 Can Tuna + 150g Microwave Rice + Olive Oil + Cherry Tomatoes (510 kcal, 38g Protein)" },
                { title: "Pre-Cooked Chicken & Couscous", desc: "150g Roasted Chicken Strips + Instant Couscous + Spinach (540 kcal, 41g Protein)" },
                { title: "Quick Salmon Salad Bowl", desc: "1 Can Salmon + Mixed Salad Greens + Pumpkin Seeds + Vinaigrette (470 kcal, 34g Protein)" }
            ],
            preworkout: [
                { title: "High-Protein Energy Wrap", desc: "1 Whole Wheat Wrap + 100g Turkey Slices + Hummus + Spinach (480 kcal, 32g Protein)" },
                { title: "Rice Cakes & Peanut Butter", desc: "3 Rice Cakes + 25g Peanut Butter + Honey Drizzle (290 kcal, 9g Protein)" },
                { title: "Greek Yogurt & Honey Pot", desc: "200g Greek Yogurt + 1 Tbsp Honey (220 kcal, 20g Protein)" }
            ],
            postworkout: [
                { title: "Sheet-Pan Baked Chicken Thighs", desc: "200g Boneless Chicken Thighs + Mixed Frozen Veggies + Olive Oil (610 kcal, 44g Protein)" },
                { title: "10-Min Shrimp Stir-Fry", desc: "200g Frozen Shrimp + Pre-cut Stir Fry Veggies + Microwave Rice (520 kcal, 40g Protein)" },
                { title: "Quick Beef & Egg Rice Bowl", desc: "150g Extra Lean Ground Beef + 1 Fried Egg + Microwave Rice (590 kcal, 45g Protein)" }
            ]
        }
    }
};

window.swapMeal = function (mealType) {
    const activePlanData = plansData[currentPlanMode] || plansData.training;
    const options = activePlanData.swaps[mealType];
    if (!options) return;

    const titleElem = document.getElementById(`meal-${mealType}-title`);
    const descElem = document.getElementById(`meal-${mealType}-desc`);

    if (titleElem && descElem) {
        let currentTitle = titleElem.textContent;
        let choices = options.filter(o => o.title !== currentTitle);
        let next = choices[Math.floor(Math.random() * choices.length)] || options[0];

        titleElem.textContent = next.title;
        descElem.textContent = next.desc;
    }
};

function renderPlanMode(planType) {
    currentPlanMode = planType;
    const plan = plansData[planType] || plansData.training;

    // 1. Update Summary Bar
    const summaryBar = document.getElementById("plan-summary-bar");
    if (summaryBar) {
        summaryBar.innerHTML = `
            <span class="summary-pill">${plan.target}</span>
            <span class="summary-pill">${plan.protein}</span>
            <span class="summary-pill focus">${plan.focus}</span>
        `;
    }

    // 2. Update Plan Structure Step Cards
    const planStructure = document.getElementById("plan-structure");
    if (planStructure) {
        planStructure.innerHTML = plan.items.map(item => `
            <div class="step-card">
                <small>${item.stage}</small>
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                <div class="step-meta">
                    <span class="tag">💪 ${item.protein}</span>
                    <span class="tag">⚡ ${item.calories}</span>
                </div>
            </div>
        `).join('');
    }

    // 3. Update Daily Schedule Section
    const eyebrow = document.getElementById("schedule-eyebrow");
    const desc = document.getElementById("schedule-desc");
    if (eyebrow) eyebrow.textContent = plan.eyebrow;
    if (desc) desc.textContent = plan.desc;

    // 4. Update Schedule Grid Cards
    const slots = ["breakfast", "lunch", "preworkout", "postworkout"];
    plan.schedule.forEach((sch, idx) => {
        const slotKey = slots[idx];
        const slotLabel = document.getElementById(`schedule-slot-${idx + 1}`);
        const titleElem = document.getElementById(`meal-${slotKey}-title`);
        const descElem = document.getElementById(`meal-${slotKey}-desc`);

        if (slotLabel) slotLabel.textContent = sch.slot;
        if (titleElem) titleElem.textContent = sch.title;
        if (descElem) descElem.textContent = sch.desc;
    });
}

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

    if (planTabBtns.length > 0) {
        planTabBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                planTabBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const planType = btn.dataset.plan;
                renderPlanMode(planType);
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
