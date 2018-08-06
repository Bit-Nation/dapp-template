import pangea from 'pangea-sdk'

const {
    setOpenHandler,
    newModalUIID,
    renderModal,
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
