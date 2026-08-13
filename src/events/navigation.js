export function navigationListener() {

    const tabs = document.querySelectorAll(".team-tab");
    const scorecards = document.querySelectorAll(".scorecard");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const team = tab.dataset.team;

            // Update tabs
            tabs.forEach(t => {
                t.classList.toggle(
                    "active",
                    t === tab
                );
            });

            // Update scorecards
            scorecards.forEach(scorecard => {
                scorecard.classList.toggle(
                    "active",
                    scorecard.dataset.team === team
                );
            });

        });

    });
}
