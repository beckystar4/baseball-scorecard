import { baseUpdater } from "./events/baseUpdater.js";
import {addInningPositions} from "./initialState.js";
import { navigationListener } from "./events/navigation.js";
import { dragAndDropListener } from "./events/reorder.js";
import { addRowsToScorecard } from "./events/scoreCard.js";
import { saveGame } from "./events/save.js";
import { loadGame } from "./events/loadGame.js";
import { printScorebook } from "./events/export.js";

const scorecards = document.querySelectorAll(".scorecard");

scorecards.forEach(scorecard => {
    addInningPositions(scorecard);
    dragAndDropListener(scorecard);
    addRowsToScorecard(scorecard);
    baseUpdater(scorecard);
});
navigationListener();

document.getElementById("saveGame").addEventListener("click", saveGame);
document.getElementById("loadGame").addEventListener("click", loadGame);
document.getElementById("exportGame").addEventListener("click", printScorebook);