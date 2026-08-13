import { baseUpdater } from "./events/baseUpdater.js";
import {addInningPositions} from "./initialState.js";
import { navigationListener } from "./events/navigation.js";
import { dragAndDropListener } from "./events/reorder.js";
import { addRowsToScorecard } from "./events/scoreCard.js";

const scorecards = document.querySelectorAll(".scorecard");

scorecards.forEach(scorecard => {
    addInningPositions(scorecard);
    dragAndDropListener(scorecard);
    addRowsToScorecard(scorecard);
    baseUpdater(scorecard);
});
navigationListener();
