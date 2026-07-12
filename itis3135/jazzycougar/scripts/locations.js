const locations = {
    "shop-one": {
        name: "Jazzy Cougar Tobacco Shop 1",
        address: "123 ABC Street",
        phone: "(555) 123-1000",
        description: "Our flagship tobacco shop features rich mahogany "
            + "interiors, attentive table service, and live jazz on "
            + "select evenings."
    },

    "shop-two": {
        name: "Jazzy Cougar Tobacco Shop 2",
        address: "456 DEF Avenue",
        phone: "(555) 456-2000",
        description: "Tobacco Shop 2 offers billiard-green seating, game "
            + "tables, and a relaxed atmosphere for browsing and enjoying "
            + "our tobacco selection."
    },

    "shop-three": {
        name: "Jazzy Cougar Tobacco Shop 3",
        address: "789 GHI Boulevard",
        phone: "(555) 789-3000",
        description: "Tobacco Shop 3 combines burgundy furnishings, private "
            + "tobacco lockers, and a refined late-night lounge setting."
    }
};

const locationMarkers = document.querySelectorAll(".map-marker");
const locationName = document.querySelector("#location-name");
const locationAddress = document.querySelector("#location-address");
const locationPhone = document.querySelector("#location-phone");
const locationDescription = document.querySelector("#location-description");

function displayLocation(locationKey) {
    const selectedLocation = locations[locationKey];

    if (!selectedLocation) {
        return;
    }

    locationName.textContent = selectedLocation.name;
    locationAddress.textContent = selectedLocation.address;
    locationPhone.textContent = selectedLocation.phone;
    locationDescription.textContent = selectedLocation.description;

    locationMarkers.forEach((marker) => {
        const isSelected = marker.dataset.location === locationKey;

        marker.classList.toggle("active", isSelected);
        marker.setAttribute("aria-pressed", isSelected);
    });
}

locationMarkers.forEach((marker) => {
    marker.addEventListener("click", () => {
        displayLocation(marker.dataset.location);
    });
});

displayLocation("shop-one");