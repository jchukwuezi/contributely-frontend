import React from "react";
import OrgNavbar from "../../shared/navbar/OrgNavbar";
import AllInitiatives from "../intiative/AllInitiatives";
import AvailableSubscriptions from "../subscriptions/AvailableSubscriptions";

const OrgHomepage = () => {
    return (
        <div>
            <OrgNavbar/>
            <AllInitiatives />
            <AvailableSubscriptions />
        </div>
    );
}

export default OrgHomepage;