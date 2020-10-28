import React, { Component } from "react";
import './QuantityInput.css'

class QuantityInput extends Component {
  state = {
    value: 0,
    max_quantity: null,
  }

  decrease = () => {
    if(0 < this.state.value){
      this.setState({ 
        value: this.state.value - 1 
      },this.props.handleQuantityChange(this.state.value - 1))
    }
  }

  increase = (max_quantity) => {
    if(this.state.value < max_quantity){
      this.setState({ 
        value: this.state.value + 1 
      },this.props.handleQuantityChange(this.state.value + 1));
    } else if( max_quantity < this.state.value){
      this.setState({ 
        value: 1 
      },this.props.handleQuantityChange(max_quantity));
    }
  }

  handleValueChange = (event) => {
    this.setState({
      value:parseInt(event.target.value)
    },this.props.handleQuantityChange(parseInt(event.target.value)))
  }

  render() {

    const {item_variations,color,size} = this.props
    
    var max_quantity = 0
    if(item_variations !== null && color !== null && size !== null){
      item_variations.forEach(item => {
        if(item.color_name === color && item.size === size){
          max_quantity = item.stock
        }
      });
    }

    return (
        <div className="def-number-input number-input mt-2" style={{margin:'auto'}}>
          <button onClick={this.decrease} className="minus"></button>
          <input 
            className="quantity" 
            name="quantity"
            value={max_quantity < this.state.value ? 0 : this.state.value} 
            onChange={this.handleValueChange}
            type="number"
            pattern="\d*"
          />
          <button onClick={() => this.increase(max_quantity)} className="plus"></button>
        </div>
      );
  }
}

export default QuantityInput;