
export function addRowsToScorecard(){
    const inningRow = document.getElementById("scoresRow");
    for(let i=0; i<12; i++){
        const cell = document.createElement("td");
        cell.innerHTML = `
            <div class="score-inputs">
                <input type="number" min="0" max="20" class="hits" placeholder="Hits">
                <input type="number" min="0" max="20" class="runs" placeholder="Runs">
            </div>
    `   ;
        const runsInput = cell.querySelector(".runs");
        runsInput.addEventListener("input", updateTotalRuns);
        inningRow.appendChild(cell);
    }
}

function updateTotalRuns(){
    const runsInput = document.querySelectorAll(".runs");
    const totalRuns = document.getElementById("totalRunsValue");
    let total = 0;
    runsInput.forEach(input => {
        total+=Number(input.value) || 0;
    });
    totalRuns.textContent = total;
}
