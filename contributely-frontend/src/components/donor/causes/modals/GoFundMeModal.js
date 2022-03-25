import {React} from "react";
import {Button, Modal, Badge, Stack} from "react-bootstrap";

const GoFundMeModal = (props) =>{
   const {show, onClose, goalAmount, url, title, categories} = props;

   const openInNewTab = (link) =>{
       const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
       if(newWindow) newWindow.opener = null;
   }

    return(
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Goal Amount: {goalAmount}
                <Stack className="mt-2" direction="horizontal" gap="2">
                    <Badge>{categories}</Badge>
                </Stack>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=> openInNewTab(url)}>Open on the Web</Button>
                <Button variant="primary">Add To Collection</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default GoFundMeModal;