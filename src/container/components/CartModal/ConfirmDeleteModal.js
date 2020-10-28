import React, { Component } from 'react';
import axios from 'axios'
import { deleteItemFromCart } from '../../../constants'
import {
  MDBBtn, MDBModal, MDBModalBody, 
  MDBModalHeader, MDBModalFooter,
  MDBRow
} from 'mdbreact';

class ConfirmDelete extends Component {
  state={
    modal: false,
  }

  handleDeleteItem = () => {
    axios
    .post(deleteItemFromCart, {
      order_item_id: this.props.id,
      customer_cookie_id: this.props.cookie
    })
    .then(res => {
      console.log(res.data);
      window.location.reload('false')
    })
    .catch(err =>{
      console.log(err);
    })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const {item_name, imgURL} = this.props

    return (
      <>
        <i className="fas fa-times" onClick={this.toggle}
            style={{color:'red',float:'right', fontSize:'18px', cursor:'pointer'}}
        ></i>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle} side position="top-right" >
          <MDBModalHeader toggle={this.toggle}>{item_name}</MDBModalHeader>
          <MDBModalBody style={{textAlign:'center'}}>
            <MDBRow style={{margin:'10px'}}>
              <img
                style={{margin:'auto'}}
                alt=""
                width="100px"
                height="100px"
                src={imgURL}
              />
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter style={{margin:'auto'}}>
            <MDBBtn 
              style={{fontSize:'0.6rem',margin:'.275rem',padding:'0.64rem 1.14rem'}} 
              color="success">Continuar Viendo</MDBBtn>
              <MDBBtn onClick={() => {this.handleDeleteItem(); this.toggle()}}
                style={{fontSize:'0.6rem',margin:'.275rem',padding:'0.64rem 1.14rem'}} 
                type="submit" color="danger">
                  Eliminar Item
              </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </>
    );
  }
}

export default ConfirmDelete;