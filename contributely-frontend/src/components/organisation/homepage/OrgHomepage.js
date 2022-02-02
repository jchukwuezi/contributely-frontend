import React from "react";
import OrgNavbar from "../../shared/navbar/OrgNavbar";
import ViewAllInitiatives from "../intiative/ViewAllInitiatives";

const OrgHomepage = () => {
    return (
        <div>
            <OrgNavbar/>
            <ViewAllInitiatives />
        </div>
    );
}

export default OrgHomepage;