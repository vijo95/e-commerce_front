import React from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink } from 'mdbreact';
import CartModal from '../CartModal/CartModal'

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {

    return (
      <MDBNavbar 
        style={{backgroundColor:'rgba(0,0,0,0.65)'}}
        fixed="top" dark expand="md" scrolling transparent>
        <MDBNavbarBrand href="/">
          <img
            style={{borderRadius:'50%'}}
            width="40px"
            height="40px"
            alt="logo"
            src="https://instagram.fcor2-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/116873690_701306380424441_6737339810149447843_n.jpg?_nc_ht=instagram.fcor2-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=aXMiLpmNhQIAX8MnKgZ&oh=174ecd6e8124d161fde5661cafc5c26a&oe=5F4E6F99"
          />
        </MDBNavbarBrand>
        {!this.state.isWideEnough && <MDBNavbarToggler onClick={this.onClick} />}
        <MDBCollapse isOpen={this.state.collapse} navbar>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBNavLink to="/checkout/">
                <i className="fas fa-handshake ml-2 mr-1"></i>
                Checkout
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/products/">
                <i className="fas fa-tshirt ml-2 mr-1"></i>
                Nuestros Productos
              </MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <CartModal 
              
              />
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default Navbar;