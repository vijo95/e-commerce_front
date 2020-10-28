import React,{Component} from 'react';
import axios from 'axios'
import { addOneItem, deleteOneItem } from '../../../constants'
import { 
  MDBCard, MDBCardBody, MDBCardTitle, 
  MDBCardText, MDBCardHeader, 
  MDBContainer, MDBCardFooter, MDBRow,
} from "mdbreact";
import ConfirmDeleteModal from './ConfirmDeleteModal'


class ReservedItemCard extends Component {

  handleAddOneItem = (id) => {
    axios.post(addOneItem, {
      order_item_id: this.props.id,
      item_variation_id: this.props.item_variation,
      order_id: this.props.order_id
    })
    .then(res =>{
      if(res.data.message === "no stock"){
        var element = document.getElementById(id + "order_item")
        if(element !== null){
          element.classList.remove("hideNoStockMessge")
        }
      } else if (res.data.message === "ok"){
        window.location.reload('false')
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleDelteOneItem = () => {
    axios.post(deleteOneItem, {
      order_item_id: this.props.id,
      item_variation_id: this.props.item_variation,
      order_id: this.props.order_id
    })
    .then(res => {
      if(res.data.message === "ok"){
        window.location.reload('false')
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  render() {

    const { 
      item_name, subtotal, quantity, 
      imgURL, id, cookie
    } = this.props

    return (
      <MDBContainer>
        <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
          <h5 id={id + "order_item"} className="no-stock-message hideNoStockMessge">
            No hay más stock
          </h5>
          <MDBCardHeader>
            {item_name}
            <ConfirmDeleteModal 
              id={id}
              item_name={item_name}
              imgURL={imgURL}
              cookie={cookie}
            />
          </MDBCardHeader>
          <MDBCardBody>
            <MDBRow style={{margin:'10px'}}>
              <div>
                <MDBCardTitle>${(subtotal/quantity).toFixed(2).toString().replace('.',',')}</MDBCardTitle>
                <MDBCardText>
                  Cantidad: {quantity}<br/>
                  <i onClick={() => this.handleDelteOneItem()}
                    style={{color:'#FF1744', fontSize:'20px', cursor:'pointer'}} 
                    className="fas fa-minus mr-3"></i>
                  <i onClick={() => this.handleAddOneItem(id)}
                    style={{color:'#00E676', fontSize:'20px', cursor:'pointer'}}
                    className="fas fa-plus ml-3"></i>
                </MDBCardText>
              </div>
              <img
                style={{margin:'0px 0px 0px auto'}}
                alt=""
                width="80px"
                height="80px"
                src={imgURL}
              />
            </MDBRow>
          </MDBCardBody>
          <MDBCardFooter>
           <span>Subtotal: <strong>${subtotal.toFixed(2).toString().replace('.',',')}</strong></span>
          </MDBCardFooter>
        </MDBCard>
      </MDBContainer>
      )
  }
}

export default ReservedItemCard;