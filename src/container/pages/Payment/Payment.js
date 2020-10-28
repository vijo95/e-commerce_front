import React, { Component } from 'react'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { customerOrder } from '../../../constants'
import { Redirect } from 'react-router-dom'
import PaymentForm from './PaymentForm'
import { 
  MDBCard, MDBCardBody, MDBCol,
  MDBListGroup, MDBListGroupItem
} from 'mdbreact';
import './Payment.css'


export default class Payment extends Component {

  state = {
    order: null,
    order_items_list: null,
    customer_cookie_id: null,
  }

  componentDidMount(){
    const cookie = new Cookie();
    this.setState({
      customer_cookie_id: cookie.get('e_26_customer_id')
    },this.getCustomerOrder(cookie.get('e_26_customer_id')))
  }

  getCustomerOrder = (cookie) => {
    axios.post(customerOrder, {
      customer_cookie_id: cookie
    })
    .then(res => {
      this.setState({
        order: res.data.order,
        order_items_list: res.data.order_items_list,
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {

    const { order, order_items_list,customer_cookie_id } = this.state

    if(order_items_list !== null){
      if(order_items_list.length <= 0){
        return <Redirect to="/" />
      }
    }

    return (
      <>
        { order !== null && order_items_list !== null ?
          <div className="fade-in" 
            style={{padding:'120px 0px 60px 0px', backgroundColor:'rgba(225, 245, 254,0.5)',}}>
            <h1 
              style={{
                textAlign:'center', 
                marginBottom:'30px',
                color:'#40C4FF',
                fontWeight:'bold'}}>
              Pago
            </h1>
            <MDBCol>
              <MDBCard className="form-card-payment">
                <MDBCardBody style={{backgroundColor:'white'}}>
                  <PaymentForm
                    amount={order.coupon === null ? order.total : (order.total * (1-order.coupon_percentage/100))}
                    customer_cookie_id={customer_cookie_id}
                    order_id={order.id}
                  />
                </MDBCardBody>
              </MDBCard>
              <MDBCard className="form-card-payment" style={{marginTop:'15px'}}>
                <MDBListGroup>
                  {order_items_list.map((item,index) => 
                    <MDBListGroupItem key={index}>
                      <div>
                        <h6 className="my-0">{item.name} | {item.size} - {item.color}</h6>
                        <small style={{color:'#26C6DA'}}>
                          Cantidad: {item.quantity}
                        </small>
                        <span style={{float:'right',color:'#424242',fontSize:'1.05rem'}}>
                          Subtotal: ${item.total.toFixed(2).toString().replace('.',',')}
                        </span>
                      </div>
                    </MDBListGroupItem>
                  )}
                  <hr style={{margin:'0px',padding:'0px',backgroundColor:'#90A4AE'}} />
                  <MDBListGroupItem>
                    <span style={{fontWeight:'bold',fontSize:'1.2rem'}}>Total</span>
                    { order.coupon !== null ?
                      <span style={{fontWeight:'bold',float:'right',fontSize:'1.2rem'}}>
                        ${(order.total * (1-order.coupon_percentage/100)).toFixed(2).toString().replace('.',',')}
                      </span> :
                      <span style={{fontWeight:'bold',float:'right',fontSize:'1.2rem'}}>
                        ${order.total.toFixed(2).toString().replace('.',',')}
                      </span> 
                    }
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCard>
            </MDBCol>
          </div> : null 
        }
      </>
    )
  }
}
