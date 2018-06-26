import pangea from 'pangea-sdk'

const {
    renderUI,
    View,
    Text,
    setOpenHandler,
    setMessageHandler,
    showModal,
} = pangea;

// this handler will be called
// when the user opens your DApp
setOpenHandler((context) => {

    // layout that will be rendered
    const layout = new View(
        {},
        [
            new Text(
                {},
                "Hi there"
            ),
            new Text(
                {},
                "This is the Pange VM"
            )
        ]
    );

    // show a modal with "Select Action" as the title
    // and the rendered layout
    showModal("Select Action", renderUI(layout))

});

// handle message rendering
setMessageHandler((dAppMessage, context, cb) => {

    if (dAppMessage.type === "SEND_MONEY") {

        // create layout
        const layout = new View(
            {},
            [
                new Text(
                    {},
                    "This is a send money Message"
                )
            ]
        );

        // render layout
        return cb(null, layout.toJSON())

    }

});
