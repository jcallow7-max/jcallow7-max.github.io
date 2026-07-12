// Product information used by the Find Your Blend recommendation tool.
const blendProducts = [
    {
        name: "Golden Hour",
        strength: "mild",
        format: "cigarette",
        occasions: ["afternoon", "evening"],
        description: "A lighter aromatic cigarette with a mellow character.",
        reason: "Its lighter flavor and relaxed character make it a natural "
            + "choice for slower moments."
    },
    {
        name: "House Blend",
        strength: "medium",
        format: "cigarette",
        occasions: ["afternoon", "evening"],
        description: "A smooth, balanced cigarette prepared in small batches.",
        reason: "Its balanced construction makes it a versatile everyday "
            + "selection."
    },
    {
        name: "After Hours",
        strength: "bold",
        format: "cigarette",
        occasions: ["evening", "special"],
        description: "A rich hand-rolled cigarette with a bold, lingering finish.",
        reason: "Its stronger flavor is best suited to late evenings and "
            + "memorable occasions."
    },
    {
        name: "House Reserve Cigar",
        strength: "medium",
        format: "cigar",
        occasions: ["afternoon", "evening"],
        description: "A medium-bodied cigar with warm, earthy notes.",
        reason: "Its medium body provides a refined experience without becoming "
            + "overpowering."
    },
    {
        name: "Burgundy No. 5",
        strength: "bold",
        format: "cigar",
        occasions: ["evening", "special"],
        description: "A full-bodied cigar with a deep and refined character.",
        reason: "Its bold profile and polished presentation make it ideal for "
            + "evenings and celebrations."
    },
    {
        name: "JC's Private Selection",
        strength: "bold",
        format: "cigar",
        occasions: ["special"],
        description: "A premium cigar selected for exceptional occasions.",
        reason: "It is reserved for customers looking for JC's most distinctive "
            + "and carefully chosen cigar."
    },
    {
        name: "Mellow Leaf",
        strength: "mild",
        format: "loose",
        occasions: ["afternoon"],
        description: "A gentle loose-leaf tobacco with a soft aromatic finish.",
        reason: "Its mild character makes it especially suited to an unhurried "
            + "afternoon."
    },
    {
        name: "Loose House Blend",
        strength: "medium",
        format: "loose",
        occasions: ["afternoon", "evening"],
        description: "Jazzy Cougar's balanced signature loose-tobacco blend.",
        reason: "Its flexible medium profile works well across different times "
            + "and preferences."
    },
    {
        name: "Midnight Cut",
        strength: "bold",
        format: "loose",
        occasions: ["evening", "special"],
        description: "A dark loose-leaf blend with a rich and lasting finish.",
        reason: "Its deeper character is designed for experienced customers and "
            + "later occasions."
    }
];

const strengthSelect = document.querySelector("#strength-select");
const formatSelect = document.querySelector("#format-select");
const occasionSelect = document.querySelector("#occasion-select");
const recommendationButton = document.querySelector("#recommendation-button");
const recommendationPanel = document.querySelector("#recommendation-panel");
const recommendationName = document.querySelector("#recommendation-name");
const recommendationDescription = document.querySelector(
    "#recommendation-description"
);
const recommendationReason = document.querySelector("#recommendation-reason");
const recommendationError = document.querySelector("#recommendation-error");

function findBestBlend(strength, format, occasion) {
    let bestProduct = null;
    let highestScore = -1;

    blendProducts.forEach((product) => {
        let score = 0;

        if (product.strength === strength) {
            score += 3;
        }

        if (product.format === format) {
            score += 3;
        }

        if (product.occasions.includes(occasion)) {
            score += 2;
        }

        if (score > highestScore) {
            highestScore = score;
            bestProduct = product;
        }
    });

    return bestProduct;
}

function displayRecommendation() {
    const strength = strengthSelect.value;
    const format = formatSelect.value;
    const occasion = occasionSelect.value;

    recommendationError.textContent = "";

    if (!strength || !format || !occasion) {
        recommendationPanel.hidden = true;
        recommendationError.textContent = "Please answer all three questions "
            + "before requesting a recommendation.";
        return;
    }

    const recommendedProduct = findBestBlend(strength, format, occasion);

    recommendationName.textContent = recommendedProduct.name;
    recommendationDescription.textContent = recommendedProduct.description;
    recommendationReason.textContent = recommendedProduct.reason;
    recommendationPanel.hidden = false;
}

recommendationButton.addEventListener("click", displayRecommendation);