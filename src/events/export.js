export function printScorebook() {

    const scorebook = document.querySelector(".scorebook");

    if (!scorebook) {
        return;
    }

    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Baseball Scorebook</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    color: #222;
                    margin: 20px;
                }

                h1 {
                    color: #1d3557;
                }

                .scorecard {
                    display: block !important;
                    margin-bottom: 40px;
                    page-break-inside: avoid;
                }

                .team-tabs,
                .scorebook-actions {
                    display: none;
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }

                th,
                td {
                    border: 1px solid #555;
                    padding: 5px;
                    text-align: center;
                }

                th {
                    background: #1d3557;
                    color: white;
                }

                input,
                select {
                    border: none;
                    background: transparent;
                    text-align: center;
                }

                .position-image {
                    width: 35px;
                    height: 35px;
                }

                @media print {

                    body {
                        margin: 0;
                    }

                    .scorecard {
                        page-break-after: always;
                    }

                }

            </style>

        </head>

        <body>
            <h1>⚾ Baseball Scorebook ⚾</h1>
            ${scorebook.innerHTML}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}
