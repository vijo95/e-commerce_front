import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { customerOrder, addCouponOrder } from '../../../constants'
import { 
  MDBBtn, MDBModal, MDBModalHeader, 
  MDBModalFooter, MDBLink, MDBModalBody
} from 'mdbreact';
import ReservedItemCard from './ReservedItemCard'
import './CartModal.css'

class CartModal extends Component {
  
  state = {
    modal8: false,
    modal9: false,
    cookie: null,

    order_items_list: null,
    order: null,

    coupon_code: '',
  }

  componentDidMount(){
    const cookie = new Cookie();
    this.setState({
      cookie: cookie.get('e_26_customer_id')
    },this.getCustomerOrder(cookie.get('e_26_customer_id')))
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  getCustomerOrder = (cookie) => {
    axios.post(customerOrder, {
      customer_cookie_id: cookie
    })
    .then(res => {
      this.setState({
        order_items_list: res.data.order_items_list,
        order: res.data.order
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleCouponChange = (event) => {
    event.preventDefault()
    this.setState({
      coupon_code:event.target.value
    })
  }

  submitCouponOrder = (event) => {
    event.preventDefault()
    if(this.state.coupon_code === null || this.state.coupon_code === ''){
      return
    }
    axios.post(addCouponOrder, {
      order_id: this.state.order.id,
      code: this.state.coupon_code
    })
    .then(res => {
      if(res.data.message === "ok"){
        var couponSuccess = document.getElementById("code-success")
        var couponFail = document.getElementById("code-fail")
        if(couponSuccess !== null && couponFail !== null){
          couponSuccess.classList.remove("hideCouponMessage")
          couponFail.classList.add("hideCouponMessage")
        }
        const cookie = new Cookie();
        this.getCustomerOrder(cookie.get('e_26_customer_id'))
      }
    })
    .catch(err => {
      console.log(err);
      var couponSuccess = document.getElementById("code-success")
      var couponFail = document.getElementById("code-fail")
      if(couponSuccess !== null && couponFail !== null){
        couponSuccess.classList.add("hideCouponMessage")
        couponFail.classList.remove("hideCouponMessage")
      }
    })
  }

  render() {

    const {order_items_list, order, cookie ,coupon_code} = this.state

    return (
      <>
        <MDBLink to="#"
          style={{cursor:'pointer',color:'white'}}
          onClick={this.toggle(8)}>
          { order_items_list !== null ?
            <span className="badge badge-pill info-color ml-2 mr-1">
              {order_items_list.length}  
            </span> : null
          }
          <i className="fas fa-shopping-cart mr-1"></i>
          Carrito
        </MDBLink>
        <MDBModal
          className="cart-modal"
          isOpen={this.state.modal8} 
          toggle={this.toggle(8)} 
          fullHeight position="right">
          <MDBModalHeader toggle={this.toggle(8)}>
            Carrito
            { order_items_list !== null ?
              <span className="badge badge-pill info-color ml-2 mr-1">
                {order_items_list.length}  
              </span> : null
            }
          </MDBModalHeader>
          <MDBModalBody>
            { order_items_list !== null ?
                0 < order_items_list.length ?
                order_items_list.map((item,index) =>
                  <ReservedItemCard key={index}
                    item_name={item.name + " | " + item.size + " - " + item.color}
                    subtotal={item.total}
                    quantity={item.quantity}
                    imgURL={item.imgURL}
                    id={item.id}
                    cookie={cookie}
                    item_variation={item.item_variation}
                    order_id={order.id}
                  />
            ) : <h4 style={{textAlign:'center'}}>
                  Tu carrito está vacío
                  <i className="far fa-frown ml-2"></i>
                </h4> 
            : null}
          </MDBModalBody>
          <MDBModalFooter style={{margin:'auto'}}>
            <h5 
              id="code-fail" className="hideCouponMessage" 
              style={{margin:'auto',color:'#FF1744'}}>
              Este cupón no existe
            </h5>
            <h5 
              id="code-success" className="hideCouponMessage" 
              style={{margin:'auto',color:'#00BFA5'}}>
              Cupón añadido exitosamente
            </h5>
            <br/>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon">
                  <i className="fa fa-tag prefix"></i>
                </span>
              </div>
              <input
                onChange={this.handleCouponChange}
                type="text" className="form-control" 
                placeholder="Código" aria-label="code" 
                aria-describedby="basic-addon" 
                value={coupon_code}
              />
              <span
                onClick={this.submitCouponOrder}
                className="input-group-text add-coupon-btn ml-1" 
                id="basic-addon"
              >
                Agregar Cupón
              </span>
            </div>

            { order !== null ?
              <h3 style={{width:'100%', textAlign:'center', 
                fontWeight:'bolder'}}>
                Total:
                { order.coupon !== null ?
                  <span className="ml-2" style={{color:'#00B0FF'}}> 
                    ${(order.total * (1-order.coupon_percentage/100)).toFixed(2).toString().replace('.',',')}
                  </span> :
                  <span className="ml-2" style={{color:'#00B0FF'}}> 
                    ${order.total.toFixed(2).toString().replace('.',',')}
                  </span> 
                }
              </h3> :
              <h3 style={{width:'100%', textAlign:'center', fontWeight:'bolder'}}>
                Total: $ -
              </h3>
            }
            <div style={{width:'100%', textAlign:'center'}}>
              <MDBBtn color="warning" onClick={this.toggle(8)}>
                <i className="far fa-times-circle mr-2"></i> Cerrar
              </MDBBtn>
              <Link to="/checkout/">
                <MDBBtn color="default" onClick={this.toggle(8)}>
                  <i className="fas fa-handshake mr-2"></i>
                  Checkout
                </MDBBtn>
              </Link>
            </div>
          </MDBModalFooter>
        </MDBModal>
      </>
    );
  }
}

export default CartModal;