export function dragAndDropListener(){
    let draggedRow = null;

    // When dragging starts
    playerRows.addEventListener("dragstart", (e) => {

        draggedRow = e.target.closest("tr");

        if (!draggedRow) return;

        draggedRow.classList.add("dragging");

        e.dataTransfer.effectAllowed = "move";
    });


    // While dragging over another row
    playerRows.addEventListener("dragover", (e) => {

        e.preventDefault();

        const targetRow = e.target.closest("tr");

        if (!targetRow) return;
        if (targetRow === draggedRow) return;

        const rect = targetRow.getBoundingClientRect();

        const middle =
            rect.top + rect.height / 2;

        if (e.clientY < middle) {
            playerRows.insertBefore(
                draggedRow,
                targetRow
            );

        } else {
            playerRows.insertBefore(
                draggedRow,
                targetRow.nextSibling
            );
        }
    });

    // When dragging ends
    playerRows.addEventListener("dragend", () => {
        if (draggedRow) {
            draggedRow.classList.remove("dragging");
            draggedRow = null;
        }
    });


}