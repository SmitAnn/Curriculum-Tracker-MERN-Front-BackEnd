import React, { useEffect, useState } from "react";
import Requirement_Dash from '../requirements/dashboard/Requirement_Dash'
import Curriculum_Dash from '../curriculum/dashboard/Curriculum_Dash';
import Sidebar from '../Sidebar/Sidebar';
import RightSide from '../RightSide/RightSide';

const Notification = () => {
    const [visible, setVisible] = useState(true);
    useEffect(() => {

        var userType = sessionStorage.getItem("userType");
        if (userType === 'user') {
            //  setHeading("New requirements");
            setVisible(true);
        }
        else {
            // setHeading("Waiting for approval")
            setVisible(false);
        }

    }, [])

    return (
        <div className="App">
            <div className="AppGlass">
                <Sidebar />
                {visible && <Requirement_Dash />}
                {!visible && <Curriculum_Dash />}
                <RightSide />
            </div>
        </div>
    )
}

export default Notification