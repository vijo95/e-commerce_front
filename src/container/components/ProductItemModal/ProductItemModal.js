import React, { Component } from 'react';
import { 
   MDBModal,
   MDBModalHeader,
   MDBRow, MDBModalBody
} from 'mdbreact';
import './ProductItemModal.css'

import ProductItem from '../ProductItem/ProductItem'

import Options from './Options'

class PrudctItemModal extends Component {
  state = {
    modal13: false,
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  onClick = nr => () => {
    this.setState({
      accordion: nr
    });
  }

  render() {

    const {name,price,discount_price,imgURL,label,description,id } = this.props

    return (
        <>
          <div className="col-lg-3 col-md-6 mb-4"
            onClick={this.toggle(13)}>
            <ProductItem
            name={name}
            price={price}
            discount_price={discount_price}
            imgURL={imgURL}
            label={label}
            />
          </div>
          <MDBModal 
            className="product-item-modal"
            size="lg" isOpen={this.state.modal13} 
            toggle={this.toggle(13)}>
            <MDBModalHeader className="text-center" titleClass="w-100" tag="p" toggle={this.toggle(13)}>
              <img
                style={{borderRadius:'50%'}}
                height="40px"
                width="40px"
                alt="logo"
                src="https://instagram.fcor2-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/116873690_701306380424441_6737339810149447843_n.jpg?_nc_ht=instagram.fcor2-2.fna.fbcdn.net&_nc_cat=105&_nc_ohc=aXMiLpmNhQIAX8MnKgZ&oh=174ecd6e8124d161fde5661cafc5c26a&oe=5F4E6F99"
              />
            </MDBModalHeader>
            <MDBModalBody>
              <MDBRow>
                <div className="img-container">
                  <img
                    alt=""
                    className="img-modal"
                    src={imgURL}
                  />
                </div>

                <div className="product-detail">
                    { label !== null ?
                        label === 'D' ?
                          <span className="badge badge-pill danger-color">
                            {Math.round((1-(discount_price/price))*100)}% OFF
                            </span> :
                        label === 'N' ?
                          <span className="badge badge-pill primary-color">Nuevo</span> :
                        null : null
                    }
                  <h2 className="h2-responsive product-name">
                    <strong>{name}</strong>
                  </h2>
                  <h4 className="h4-responsive">
                    <strong>
                      { discount_price === null ? 
                        <span style={{color:'#00B8D4'}}>
                          <strong>${price.toFixed(2).toString().replace('.',',')}</strong>
                        </span> :
                        <>
                          <del className="mr-2" style={{color:'#9E9E9E'}}>
                            ${price.toFixed(2).toString().replace('.',',')}
                          </del> 
                          <span style={{color:'#00B8D4'}}>
                            <strong>${discount_price.toFixed(2).toString().replace('.',',')}</strong>
                          </span>
                        </>
                      }
                    </strong>
                  </h4>
                  <p style={{width:'220px'}}>
                   {description}
                  </p>
                  <Options 
                    id={id}
                  />
                </div>

              </MDBRow>
            </MDBModalBody>
          </MDBModal>
        </>
      );
    }
}

export default PrudctItemModal;

