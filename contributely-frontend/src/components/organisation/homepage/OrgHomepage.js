import React from "react";
import OrgNavbar from "../../shared/navbar/OrgNavbar";
import AllInitiatives from "../intiative/AllInitiatives";

const OrgHomepage = () => {
    return (
        <div>
            <OrgNavbar/>
            <AllInitiatives />
        </div>
    );
}

export default OrgHomepage;