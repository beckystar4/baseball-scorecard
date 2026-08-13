import {
    pos,
    inningPositions
} from "./constants.js";

export function addInningPositions(scorecard) {

    const row = scorecard.querySelector(".playerRow");
    const playerRows = scorecard.querySelector(".playerRows");

    // Add the 12 inning position cells
    for (let i = 0; i < 12; i++) {

        const cell = document.createElement("td");

        cell.innerHTML = `
            <img 
                src="./assets/Initial.png"
                class="position-image"
                data-position="initial"
                alt="No base"
            >

            <select name="${inningPositions[i]}" class="pos">
                <option value="" disabled selected hidden></option>
                <option value="first">1B</option>
                <option value="second">2B</option>
                <option value="third">3B</option>
                <option value="homerun">HR</option>
                <option value="walk">BB</option>
                <option value="strikeOut">K</option>
                <option value="strikeOutLooking">ꓘ</option>
                <option value="fieldersChoice">FC</option>
                <option value="out">Out</option>
            </select>
            <input type="text" class="other" placeholder="Other">
        `;

        row.appendChild(cell);
    }

    for (let i = 0; i < pos.length; i++) {

        const newRow = row.cloneNode(true);

        newRow.draggable = true;

        newRow.querySelector(".player-po").innerHTML = `
            <span class="drag-handle">☰</span>
            ${pos[i]}
        `;

        playerRows.appendChild(newRow);
    }
}
