import React from 'react';
import Logo from '../../Images/logo.png';

import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand
} from 'mdb-react-ui-kit';

export default function App() {
    return (
        <>
            <MDBNavbar light bgColor='light'>
                <MDBContainer className='container'>
                    <MDBNavbarBrand href='#' className='logo'>
                        <img
                            src={Logo}
                            height='150' width='100'
                            alt=''
                        // loading='lazy'
                        />

                        <h1><span>
                            IC<span>T</span>AK
                        </span> Curriculum Tracker</h1>

                    </MDBNavbarBrand>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}