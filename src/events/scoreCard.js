
export function addRowsToScorecard(scorecard){
    const inningRow = scorecard.querySelector(".scoresRow");
    for(let i=0; i<12; i++){
        const cell = document.createElement("td");
        cell.innerHTML = `
            <div class="score-inputs">
                <input type="number" inputmode="numeric" pattern="[0-9]*" min="0" max="20" class="hits" placeholder="Hits">
                <input type="number" min="0" max="20" class="runs" placeholder="Runs">
            </div>
    `   ;
        const runsInput = cell.querySelector(".runs");
        runsInput.addEventListener("input", () => {updateTotalRuns(scorecard)});
        inningRow.appendChild(cell);
    }
}

function updateTotalRuns(scorecard){
    const runsInput = scorecard.querySelectorAll(".runs");
    const totalRuns = scorecard.querySelector(".totalRunsValue");
    let total = 0;
    runsInput.forEach(input => {
        total+=Number(input.value) || 0;
    });
    totalRuns.textContent = total;
}
