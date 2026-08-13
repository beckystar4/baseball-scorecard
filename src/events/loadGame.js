import { positionImages } from "../constants.js";

export function loadGame() {
    const fileInput = document.getElementById("gameFile");
    if (!fileInput) { console.error("Could not find #gameFile"); return; }
    fileInput.value = "";
    fileInput.click();
    fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        try {
            const text = await file.text();
            const gameData = JSON.parse(text);
            restoreGame(gameData);
        } catch (error) {
            console.error("Error loading game:", error);
            alert("Unable to load the game file. Make sure it is a valid Scorebook JSON file.");
        }
    };
}

function restoreGame(gameData) {
    if (!gameData || !Array.isArray(gameData.teams)) throw new Error("Invalid Scorebook file.");
    const scorecards = document.querySelectorAll(".scorecard");
    scorecards.forEach((scorecard, index) => {
        const teamData = gameData.teams.find(team => team.team === scorecard.dataset.team) || gameData.teams[index];
        if (teamData) restoreTeam(scorecard, teamData);
    });
    alert("Game loaded successfully!");
}

function restoreTeam(scorecard, teamData) {
    const teamName = scorecard.querySelector(".team-name");
    if (teamName) teamName.value = teamData.name || "";
    const rows = scorecard.querySelectorAll(".playerRows .playerRow");
    if (Array.isArray(teamData.players)) teamData.players.forEach((playerData, index) => { if (rows[index]) restorePlayer(rows[index], playerData); });
    if (Array.isArray(teamData.innings)) restoreInningTotals(scorecard, teamData.innings);
}

function restorePlayer(row, playerData) {
    const playerName = row.querySelector(".player-name");
    if (playerName) playerName.value = playerData.name || "";
    const playerPO = row.querySelector(".player-po");
    if (playerPO) {
        let position = (playerData.position || "").replace("☰", "").trim();
        playerPO.innerHTML = `<span class="drag-handle">☰</span>${position}`;
    }
    if (!Array.isArray(playerData.innings)) return;
    const inningCells = row.querySelectorAll("td");
    playerData.innings.forEach((inningData, index) => {
        const cell = inningCells[index + 2];
        if (!cell) return;
        const select = cell.querySelector(".pos");
        if (select) select.value = inningData.position || "";
        const image = cell.querySelector(".position-image");
        if (image) restorePositionImage(image, inningData.image || "initial");
        const other = cell.querySelector(".other");
        if (other) other.value = inningData.other || "";
    });
}

function restorePositionImage(image, position) {
    const imageData = positionImages[position];
    if (!imageData) return;
    image.src = imageData.src;
    image.alt = imageData.alt;
    image.dataset.position = position;
}

function restoreInningTotals(scorecard, innings) {
    const hitsInputs = scorecard.querySelectorAll(".hits");
    const runsInputs = scorecard.querySelectorAll(".runs");
    let total = 0;
    innings.forEach((inning, index) => {
        if (hitsInputs[index]) hitsInputs[index].value = inning.hits ?? "";
        if (runsInputs[index]) {
            runsInputs[index].value = inning.runs ?? "";
            total += Number(inning.runs) || 0;
        }
    });
    const totalRuns = scorecard.querySelector(".totalRunsValue");
    if (totalRuns) totalRuns.textContent = total;
}
