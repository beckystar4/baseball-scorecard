export function saveGame() {

    const scorecards =
        document.querySelectorAll(".scorecard");

    const gameData = {
        date: new Date().toISOString(),
        teams: []
    };

    scorecards.forEach(scorecard => {
        const team = {
            name:
                scorecard
                    .querySelector(".team-name")
                    ?.value || "",

            players: [],
            innings: []
        };

        const rows =
            scorecard.querySelectorAll(
                ".playerRows tr"
            );

            rows.forEach(row => {

                const playerName = row.querySelector(".player-name")?.value || "";

                const position = row.querySelector(".player-po")?.textContent.trim() || "";

                const innings = [];

                row.querySelectorAll("td").forEach(
                    (cell, index) => {

                        const select = cell.querySelector(".pos");

                        const image = cell.querySelector(".position-image");

                        const other = cell.querySelector(".other");

                        if (!select) return;

                        innings.push({
                            position:select.value || "",
                            image: image?.dataset.position || "initial",
                            other: other?.value || ""
                        });

                    }
                );


                team.players.push({
                    name: playerName,
                    position,
                    innings
                });

            });

        scorecard
            .querySelectorAll(".runs")
            .forEach((input, index) => {

                const hitsInput = scorecard.querySelectorAll(".hits")[index];

                team.innings.push({
                    inning: index + 1,
                    hits:
                        hitsInput?.value || "",
                    runs:
                        input.value || ""
                });
            });
        gameData.teams.push(team);

    });

    const json = JSON.stringify(gameData, null,2);

    const blob =
        new Blob(
            [json],
            {
                type: "application/json"
            }
        );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
        `baseball-scorebook-${new Date()
            .toISOString()
            .slice(0, 10)}.json`;

    link.click();

    URL.revokeObjectURL(url);
}