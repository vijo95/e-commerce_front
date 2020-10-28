import React, { Component } from 'react'
import './ProductItem.css'
export default class ProductItem extends Component {
  
  render() {

    const {name,price,discount_price,imgURL,label} = this.props

    return (
        <div className="clothCard" >
          
          {/* Card image */}
          <div style={{padding:'0px',cursor:'pointer', overflow: 'hidden'}} className="overlay container">
            <img
              src={imgURL} 
              className="card-img-top" 
              alt={name}/>
            <div style={{position: 'absolute', top: '1px', right: '10px'}}>
              { label !== null ?
                  label === 'D' ?
                    <span className="badge badge-pill danger-color">
                      {Math.round((1-(discount_price/price))*100)}% OFF
                      </span> :
                  label === 'N' ?
                    <span className="badge badge-pill primary-color">Nuevo</span> :
                  null : null
              }
            </div>

          </div>
          {/* Card image */}

          {/* Card Content */}
          <div 
            className="card-body text-left" 
            style={{backgroundColor:''}}
          >
            <h5>
              <strong style={{color:'black'}}>
                {name}
              </strong>
            </h5>
            <h6 className="font-weight-bold blue-text">
              <strong>
                { discount_price === null ? 
                  <span style={{color:'#00B8D4'}}>
                    <strong>${price.toFixed(2).toString().replace('.',',')}</strong>
                  </span> :
                  <>
                    <del style={{color:'#9E9E9E'}} className="mr-1">${price.toFixed(2).toString().replace('.',',')}</del> 
                    <span style={{color:'#00B8D4'}}>
                      <strong>${discount_price.toFixed(2).toString().replace('.',',')}</strong>
                    </span>
                  </>
                }
              </strong>
            </h6>
          </div>
          {/* Card Content */}

        </div>
    )
  }
}
