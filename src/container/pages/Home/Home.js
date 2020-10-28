import React, { Component } from 'react'
import HomeCarousel from '../../components/HomeCarousel/HomeCarousel'
import ProductsCarousel from '../../components/ProdductsCarousel/ProductsCarousel'
import { Link } from 'react-router-dom'
import './Home.css'

export default class Home extends Component {
  render() {
    return (
      <div className="fade-in">
        <HomeCarousel />
        <ProductsCarousel />
        <Link to="/products/">
          <div className="all-div mt-4 mb-4" style={{textAlign:'center'}}>
            <span className="all">
              Mirá todos nuestros productos
              <i className="fas fa-angle-double-right ml-2"></i>
            </span>
          </div>
        </Link>
      </div>
    )
  }
}
