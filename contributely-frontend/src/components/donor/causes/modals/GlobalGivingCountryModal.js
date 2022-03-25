import {React} from "react";
import {Button, Modal, Badge, Stack} from "react-bootstrap";

const GlobalGivingCountryModal = (props) =>{
    const {show, onClose, goal, title, impact, themes,url} = props;
    const openInNewTab = (link) =>{
        const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
        if(newWindow) newWindow.opener = null;
    }

    return(
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{impact}</Modal.Body>
            <Modal.Body>
                Goal Amount: €{goal}
                <Stack className="mt-2" direction="horizontal" gap="2">
                    <Badge>{themes}</Badge>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=> openInNewTab(url)}>Open on the Web</Button>
                <Button variant="primary">Add To Collection</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default GlobalGivingCountryModal;