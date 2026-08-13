import {
    positionImages,
    baseProgression
} from "../constants.js";

export function baseUpdater(){
    playerRows.addEventListener("change", (event) => {

        if (!event.target.classList.contains("pos")) {
            return;
        }

        const select = event.target;
        const position = select.value;

        const cell = select.closest("td");

        const image = cell.querySelector(".position-image");

        const imageData = positionImages[position];

        if (!imageData) {
            return;
        }

        image.src = imageData.src;
        image.alt = imageData.alt;
        image.dataset.position = position;
    });

    playerRows.addEventListener("click", (event) => {

        if (!event.target.classList.contains("position-image")) {
            return;
        }

        const image = event.target;

        const currentPosition = image.dataset.position;

        // If they're starting from initial, go to first
        if (currentPosition === "initial") {

            updatePositionImage(image, "first");

            return;
        }

        if(currentPosition === "walk"){
            updatePositionImage(image, "second");
            return;
        }

        // Find current position in progression
        const currentIndex =
            baseProgression.indexOf(currentPosition);

        // If we can't find it, do nothing
        if (currentIndex === -1) {
            return;
        }

        // Move to next base
        const nextIndex = currentIndex + 1;

        // If we've reached HR, stop
        if (nextIndex >= baseProgression.length) {
            return;
        }

        const nextPosition =
            baseProgression[nextIndex];

        updatePositionImage(image, nextPosition);
    });

    function updatePositionImage(image, position) {

        const imageData = positionImages[position];

        if (!imageData) {
            return;
        }

        image.src = imageData.src;
        image.alt = imageData.alt;
        image.dataset.position = position;
    }

}
