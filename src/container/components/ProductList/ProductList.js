import React, { Component } from 'react'

import axios from 'axios'
import { allItems } from '../../../constants'

import ProductItemModal from '../ProductItemModal/ProductItemModal'


export default class ProductList extends Component {

  state = {
    all_items: null
  }

  componentDidMount(){
    axios.get(allItems)
      .then(res => {
        this.setState({
          all_items:res.data.all_item_list
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  includesCaseInsensitive = (string,array) => {
    var list = array.split(" ")
    for (let i = 0; i < list.length; i++) {
      if(string.toLowerCase().includes(list[i].toLowerCase())){
        return true
      } 
    }
    return false
  }

  render() {

    const { all_items } = this.state
    const { filter, order, search  } = this.props

    if(order !== null && all_items !== null){
      if(order === 1){
        all_items.sort(function(a, b) {
          return parseFloat(b.price) - parseFloat(a.price);
        });
      } else if (order === 2) {
        all_items.sort(function(a, b) {
          return parseFloat(a.price) - parseFloat(b.price);
        });
      } else {
        all_items.sort(function(a, b) {
          if(b.label < a.label){
            return -1;
          } else if(a.label < b.label){
            return 1;
          } else if(b.label === null){
            return -1
          } else if(a.label === null){
            return 1
          } else {
            return 0
          }
        });
      }
    }

    return (
      <section className="mb-4">
        <div className="row wow fadeIn">
          { all_items !== null ? 
            all_items.map((product,index) =>
              filter === 'H' ?
                product.gender === 'H' ?
                  <ProductItemModal 
                    key={index}
                    name={product.name}
                    price={product.price}
                    discount_price={product.discount_price}
                    imgURL={product.imageURL1}
                    label={product.label}
                    description={product.description}
                    id={product.id}
                  /> : null :
              filter === 'M' ?
                product.gender === 'M' ?
                  <ProductItemModal 
                    key={index}
                    name={product.name}
                    price={product.price}
                    discount_price={product.discount_price}
                    imgURL={product.imageURL1}
                    label={product.label}
                    description={product.description}
                    id={product.id}
                  /> : null :
              filter === 'N' ?
                product.label === 'N' ?
                  <ProductItemModal 
                    key={index}
                    name={product.name}
                    price={product.price}
                    discount_price={product.discount_price}
                    imgURL={product.imageURL1}
                    label={product.label}
                    description={product.description}
                    id={product.id}
                  /> : null :
              filter === 'D' ?
                product.label === 'D' ?
                  <ProductItemModal 
                    key={index}
                    name={product.name}
                    price={product.price}
                    discount_price={product.discount_price}
                    imgURL={product.imageURL1}
                    label={product.label}
                    description={product.description}
                    id={product.id}
                  /> : null :
              search !== null ?
                this.includesCaseInsensitive(product.name,search) ?
                  <ProductItemModal 
                    key={index}
                    name={product.name}
                    price={product.price}
                    discount_price={product.discount_price}
                    imgURL={product.imageURL1}
                    label={product.label}
                    description={product.description}
                    id={product.id}
                  /> : null :
              product.category === filter || filter === null || filter === 0 ?
                <ProductItemModal 
                  key={index}
                  name={product.name}
                  price={product.price}
                  discount_price={product.discount_price}
                  imgURL={product.imageURL1}
                  label={product.label}
                  description={product.description}
                  id={product.id}
                /> :  null
          ) : <div className="loader"></div> }
        </div>
      </section>
    )
  }
}
