import React, { Component } from 'react';


class SizeSelect extends Component {

  handleSizeChangeEvent = (event) => {
    this.props.handleSizeChange(parseInt(event.target.value))
  }

  render () {

    const {item_variations, color} = this.props

    return(
      <div className="mb-2 mt-2">
        <select className="browser-default custom-select"
         onChange={this.handleSizeChangeEvent}>
          <option>Talle</option>
          { item_variations !== null && 0 < item_variations.length  ?
              item_variations.map((item,index) => 
                item.color_name === color ?
                  <option value={item.size} key={index}>
                {item.size_name}
                  </option>: null) : <option value='0'>No hay talle</option>
          }
        </select>
      </div>
    );
  }
}

export default SizeSelect;