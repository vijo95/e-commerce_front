import React, { Component } from 'react'

import axios from 'axios'
import Cookie from 'universal-cookie'
import { itemVariations, addItemToCart } from '../../../constants'

import QuantityInput from './QuantityInput'
import SizeSelect from './SizeSelect'
import { MDBRow, MDBBtn } from 'mdbreact'

import './Options.css'

export default class Options extends Component {

  state = {
    item_variations: null,
    color_hex: null,
    color_id: null,
    size: null,
    quantity: 0,
    customer_cookie_id: null,

    loading: false,
  }

  componentDidMount(){
    const cookie = new Cookie();
    this.setState({
      customer_cookie_id: cookie.get('e_26_customer_id')
    })
    axios.post(itemVariations, {
      item_id: this.props.id
    })
    .then(res => {
      this.setState({
        item_variations: res.data.item_variations,
        color_hex: res.data.item_variations[0].color_name,
        color_id: res.data.item_variations[0].color,
        size: res.data.item_variations[0].size_name,
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  handleColorchange = (color,hex,id) => {
    this.setState({
      color_hex:hex,
      color_id:id,
      quantity: 0
    })
    for (let i = 0; i < 10; i++) {
      var element = document.getElementById(i)
      if(element !== null){
        element.style.border = "3px solid white"
      }
    }
    var selected = document.getElementById(color)

    var colorRGB = selected.style.backgroundColor.replace('rgb(','').replace(')','').split(',')
    var selectedColors = this.getRGBColorBorder(colorRGB[0],colorRGB[1],colorRGB[2])

    selected.style.border = `4px solid rgb(${selectedColors[0]},${selectedColors[1]},${selectedColors[2]})` 
  }

  handleSizeChange = (size) => {
    this.setState({
      size:size
    })
  }

  handleQuantityChange = (quantity) => {
    this.setState({
      quantity: quantity
    })
  }

  includesColor = (hex,id,colors) => {
    for (let i = 0; i < colors.length; i++) {
      if(colors[i].hex === hex && colors[i].id === id){
        return true
      }
    }
    return false
  }

  handleAddToCart = () => {
    const {color_id,size,quantity} = this.state
    if(quantity <= 0 || size === null || color_id === null){
      return
    }
    this.setState({
      loading: true
    })
    axios.post(addItemToCart, {
      customer_cookie_id: this.state.customer_cookie_id,
      item_id: this.props.id,
      color: this.state.color_id,
      size: this.state.size,
      quantity: this.state.quantity
    })
    .then(res => {
      window.location.reload('false')
    })
    .catch(err => {
      console.log(err);
    })
  }

  getRGBColorBorder = (r,g,b) =>{
    var max = Math.max(
      parseInt(r),
      parseInt(g),
      parseInt(b)
    )
    if(205 <= max){
      return [
        Math.floor(r*0.9),
        Math.floor(g*0.9),
        Math.floor(b*0.9)
      ]
    }
    else if(155 <=  max && max < 204){
      var t = 255/max
      return [
        Math.ceil(r*t),
        Math.ceil(g*t),
        Math.ceil(b*t)
      ]
    } else if(100 <= max && max <= 154) {
      return [
        Math.ceil(r*1.6),
        Math.ceil(g*1.6),
        Math.ceil(b*1.6)
      ]
    } else if(1 <= max && max <= 99) {
      return [
        Math.ceil(r*1.9),
        Math.ceil(g*1.9),
        Math.ceil(b*1.9)
      ]
    } else {
      return [
        Math.ceil((r+100)),
        Math.ceil((g+100)),
        Math.ceil((b+100))
      ]
    }
  }

  render() {

    const {item_variations, color_hex, size, loading} = this.state

    var colors = []
    if(item_variations !== null){
      for (let i = 0; i < item_variations.length; i++) {
        if(!this.includesColor(item_variations[i].color_name,item_variations[i].color,colors)){
          colors.push({
            hex: item_variations[i].color_name,
            id: item_variations[i].color
          })
        }
      }
    }

    return (
      <div>
        { !loading ?
          <>
            <MDBRow style={{margin:'auto'}}>
              <p className="mr-2">Elige un color</p>
              { colors.map((color,index) => 
                <div
                  key={index}
                  id={index}
                  onClick={() => this.handleColorchange(index,color.hex,color.id)}
                  className="color"
                  style={{backgroundColor:`#${color.hex}`}}
                >
                  </div>
              )}
            </MDBRow>

            <SizeSelect 
              item_variations={item_variations}
              color={color_hex}
              handleSizeChange={this.handleSizeChange}
            />

            <QuantityInput 
              item_variations={item_variations}
              color={color_hex}
              size={size}
              handleQuantityChange={this.handleQuantityChange}
            />

            <div style={{textAlign:'center'}}>
              <MDBBtn color="primary" onClick={this.handleAddToCart}>
                <i style={{fontSize:'18px'}} className="fas fa-cart-plus mr-2"></i>
                Añadir al carrito
              </MDBBtn>
            </div>
          </> : <div className="loader"></div> 
        }
      </div>
    )
  }
}
