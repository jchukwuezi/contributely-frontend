import {React} from "react";
import {Button, Modal, Badge, Stack} from "react-bootstrap";

const GlobalGivingInterestModal = (props) =>{
    const {show, onClose, country, title, mission, themes,url} = props;
    const openInNewTab = (link) =>{
        const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
        if(newWindow) newWindow.opener = null;
    }

    return(
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{mission}</Modal.Body>
            <Modal.Body>
                <Stack className="mt-2" direction="horizontal" gap="2">
                    <Badge>{themes}</Badge>
                    <Badge>{country}</Badge>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=> openInNewTab(url)}>Open on the Web</Button>
                <Button variant="primary">Add To Collection</Button>
            </Modal.Footer>
        </Modal>
    )
}


export default GlobalGivingInterestModal;