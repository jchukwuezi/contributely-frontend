import {React, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, Tab } from "react-bootstrap";
import Interests from "./Interests";
import DonorNavbar from "../../shared/navbar/DonorNavbar";

const AccountTab = () => {

    return(
        <div>
            <DonorNavbar />    
            <Tabs>
                <Tab eventKey="interests" title="Interests">
                    <Interests />
                </Tab>
        </Tabs>
        </div>
    )

}

export default AccountTab;