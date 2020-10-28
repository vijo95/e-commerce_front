import React from 'react';
import { MDBCard, MDBCardBody, MDBCol } from 'mdbreact';
import CheckoutForm from './CheckoutForm'
import './Checkout.css'

const Checkout = () => {
  return (
    <div className="fade-in" 
      style={{
        padding:'120px 0px 60px 0px', 
        backgroundColor:'rgba(225, 245, 254,0.5)', 
      }}>
      <h1 style={{
        textAlign:'center',marginBottom:'30px',
        color:'#40C4FF',fontWeight:'bold'
      }}>
        Checkout
      </h1>
      <MDBCol>
        <MDBCard className="form-card-checkout">
          <MDBCardBody style={{backgroundColor:'white'}}>
            <CheckoutForm />
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </div>
  )
}

export default Checkout;