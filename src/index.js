import { baseUpdater } from "./events/baseUpdater.js";
import {addInningPositions} from "./initialState.js";
import { navigationListener } from "./events/navigation.js";
import { dragAndDropListener } from "./events/reorder.js";
import { addRowsToScorecard } from "../scoreCard.js";

// Add inning positions to the original DH row
addInningPositions();
dragAndDropListener();
navigationListener();
addRowsToScorecard();
baseUpdater();
