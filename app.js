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
setOpenHandler((payload, cb) => {

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

    showModal("Select Action", renderUI(layout), cb)

});
