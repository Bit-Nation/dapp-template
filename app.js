import pangea from 'pangea-sdk'

const {
    setOpenHandler,
    newModalUIID,
    renderModal,
    renderMessage,
    setMessageRenderer,
    Modal,
    Container
} = pangea;


class DemoModal extends Modal {
    render(){
        return (
            <Text>Hi there</Text>
        )
    }
}

function DemoMessage(props) {
    return (
        <Text>I am a message</Text>
    )
}

setOpenHandler((cb) => {

    // obtain a new modal id
    newModalUIID((error, modalUIID) => {

        if (error){
            return cb(error)
        }

        renderModal(<DemoModal container={new Container(modalUIID)}/>, () => {
            // once the modal got rendered, we can "close" the open process
            cb()
        })

    })

});

/**
 * @desc set out message handler
 */
setMessageRenderer((payload, cb) => {

    const {message} = payload;

    renderMessage(<DemoMessage/>, (jsx) => {
        cb(null, jsx)
    })

});
