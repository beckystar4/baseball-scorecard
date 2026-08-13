export function navigationListener() {

    const tabs = document.querySelectorAll(".team-tab");
    const scorecards = document.querySelectorAll(".scorecard");

    tabs.forEach(tab => {

        tab.addEventListener("click", () => {

            const team = tab.dataset.team;

            // Update tabs
            tabs.forEach(t => {
                t.classList.remove("active");
            });

            tab.classList.add("active");

            // Update scorecards
            scorecards.forEach(scorecard => {
                scorecard.classList.remove("active");
            });

            const activeScorecard =
                document.querySelector(
                    `.scorecard[data-team="${team}"]`
                );

            activeScorecard.classList.add("active");
        });

    });
}
