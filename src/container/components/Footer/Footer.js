import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter color="black" className="font-small pt-2 mt-2">
      <div className="text-center">
        <a
          href="https://www.instagram.com/e26.indumentaria/"
          target="_blank" rel="noopener noreferrer"
          style={{fontSize:'28px'}} 
          className="btn-floating btn-sm btn-dribbble mx-1">
          <i className="fab fa-instagram"> </i>
        </a>
      </div>
      <div className="footer-copyright text-center py-2">
        <MDBContainer fluid>
        Copyright {new Date().getFullYear()} © E-26 Indumentaria
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default Footer;