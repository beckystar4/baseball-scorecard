export function dragAndDropListener(scorecard) {

    // Find the player rows belonging ONLY to this scorecard
    const playerRows = scorecard.querySelector(".playerRows");

    if (!playerRows) {
        console.error("Could not find .playerRows in scorecard");
        return;
    }

    let draggedRow = null;
    
    playerRows.addEventListener("dragstart", (e) => {

        const row = e.target.closest("tr");

        if (!row) return;

        draggedRow = row;

        draggedRow.classList.add("dragging");

        e.dataTransfer.effectAllowed = "move";

        // Required by some browsers
        e.dataTransfer.setData("text/plain", "");
    });

    playerRows.addEventListener("dragover", (e) => {
        e.preventDefault();
        if (!draggedRow) return;
        const targetRow = e.target.closest("tr");
        if (!targetRow) return;
        // Don't move a row onto itself
        if (targetRow === draggedRow) return;
        // Make sure we're only moving rows
        // within this scorecard
        if (targetRow.parentElement !== playerRows) {
            return;
        }

        const rect = targetRow.getBoundingClientRect();
        const middle = rect.top + rect.height / 2;

        // Dragging above the middle
        if (e.clientY < middle) {
            playerRows.insertBefore(
                draggedRow,
                targetRow
            );
        }

        // Dragging below the middle
        else {
            playerRows.insertBefore(
                draggedRow,
                targetRow.nextSibling
            );
        }
    });

    playerRows.addEventListener("dragend", () => {
        if (!draggedRow) return;
        draggedRow.classList.remove("dragging");
        draggedRow = null;
    });
}
