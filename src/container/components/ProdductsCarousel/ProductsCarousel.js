import React, { Component } from "react";

import axios from 'axios'
import { homeItems } from '../../../constants'

import { MDBCarousel, MDBCarouselInner, 
  MDBCarouselItem, MDBRow
} from "mdbreact";

import ProductItemModal from '../ProductItemModal/ProductItemModal'
import './ProductCarousel.css'

class ProductsCarousel extends Component {
  
  state = {
    product_list: null
  }

  componentDidMount(){
    axios.get(homeItems)
      .then(res => {
        this.setState({
          product_list: res.data.home_item_list
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render(){

    const {product_list} = this.state

    var first_4 = []
    var second_4 = []
    var third_4 = []
    if(product_list !== null){
      for (let i = 0; i < 4; i++) {
        first_4.push(product_list[i])
      }
      for (let i = 4; i < 8; i++) {
        second_4.push(product_list[i])
      }
      for (let i = 8; i < 12; i++) {
        third_4.push(product_list[i])
      }
    }

    return (
      <>
        <MDBCarousel 
          activeItem={1} 
          length={1} 
          slide={true} 
          showControls={false} 
          showIndicators={true} 
          multiItem
          interval={2000}
        >
          { product_list !== null ?
            <MDBCarouselInner>
              <MDBRow>
                <MDBCarouselItem itemId="1">
                  <MDBRow className="products-row">
                  { first_4.map((product,index) => 
                    product !== undefined ?
                      <ProductItemModal 
                        key={index}
                        name={product.name}
                        price={product.price}
                        discount_price={product.discount_price}
                        imgURL={product.imageURL1}
                        label={product.label}
                        description={product.description}
                        id={product.id}
                      /> : null
                  )}
                  </MDBRow>
                </MDBCarouselItem>
              </MDBRow>
            </MDBCarouselInner> : <div className="loader"></div>
          }
        </MDBCarousel> 
      </>
    )
  }
}

export default ProductsCarousel;