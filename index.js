import { baseUpdater } from "./src/baseUpdater.js";
import {addInningPositions} from "./src/initialState.js";
import { navigationListener } from "./src/navigation.js";
import { dragAndDropListener } from "./src/reorder.js";
import { addRowsToScorecard } from "./scoreCard.js";

// Add inning positions to the original DH row
addInningPositions();
dragAndDropListener();
navigationListener();
addRowsToScorecard();
baseUpdater();
