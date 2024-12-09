(() => {
    console.log('[Debug] Script is starting...');

    // Retrieve group_booking externalId
    const groupBookingExternalId = context["kobject.group_booking"].attributes?.externalId;
    console.log('[Debug] groupBookingExternalId:', groupBookingExternalId);

    if (!groupBookingExternalId) {
        console.error('[Debug] Group Booking External ID is missing.');
        return;
    }

    // Function to fetch reservations and render
    const fetchAndRenderReservations = async () => {
        console.log('[Debug] Fetching reservations for External ID:', groupBookingExternalId);

        try {
            const requestBody = {
                "and": [
                    {
                        "kobject_custom_reservation_groupParentStr": {
                            "equals": groupBookingExternalId
                        }
                    }
                ],
                "queryContext": "kobject_reservation",
                "timeZone": "America/Los_Angeles"
            };
            // console.log('[Debug] Request Body:',requestBody)

            KustomerRequest(
                {
                    url: '/v1/customers/search',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'// Ensures the server interprets the body as JSON
                    },
                    body: requestBody,
                })
                .then((response) => {
                    console.log(response.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.error('[Debug] Unexpected error:', error);
            renderMessage('Error loading reservations.');
        }
    };
    // Helper function to render a message
    const renderMessage = (message) => {
        Kustomer.render(React.createElement('div', null, message));
    };

    // Helper function to render the reservations table
    const renderReservationsTable = (reservations) => {
        Kustomer.render(
            React.createElement(
                'table',
                { style: { width: '100%', borderCollapse: 'collapse', marginTop: '10px' } },
                React.createElement(
                    'thead',
                    null,
                    React.createElement(
                        'tr',
                        null,
                        React.createElement(
                            'th',
                            { style: { padding: '8px', textAlign: 'left' } },
                            'Confirmation'
                        ),
                        React.createElement(
                            'th',
                            { style: { padding: '8px', textAlign: 'left' } },
                            'Name'
                        ),
                        React.createElement(
                            'th',
                            { style: { padding: '8px', textAlign: 'left' } },
                            'Unit'
                        )
                    )
                ),
                React.createElement(
                    'tbody',
                    null,
                    reservations.map((reservation) =>
                        React.createElement(
                            'tr',
                            { key: reservation.id },
                            React.createElement(
                                'td',
                                { style: { padding: '8px' } },
                                reservation.attributes.custom.confirmationCodeStr || 'N/A'
                            ),
                            React.createElement(
                                'td',
                                { style: { padding: '8px' } },
                                reservation.attributes.custom.guestNameStr || 'N/A'
                            ),
                            React.createElement(
                                'td',
                                { style: { padding: '8px' } },
                                reservation.attributes.custom.unitStr || 'N/A'
                            )
                        )
                    )
                )
            )
        );
    };
    // Start fetching and rendering
    fetchAndRenderReservations();
})();
