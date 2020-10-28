import React, { Component } from 'react'
import ProductList from '../../components/ProductList/ProductList'
import FilterNav from '../../components/FilterNav/FilterNav'

export default class Products extends Component {
  
  state = {
    filter: null,
    order: null,
    search: null,
  }
  
  changeFilter = (filter) => {
    this.setState({
      filter: filter,
      search: null,
    })
  }

  changeSearch = (search) => {
    this.setState({
      search: search,
      filter: null,
    })
  }

  changeOrder = (order) => {
    this.setState({
      order: order
    })
  }

  render() {

    const { filter, order, search } = this.state

    return (
      <div 
        className="container fade-in"
        style={{paddingTop:'90px'}}>

        <FilterNav 
          changeFilter={this.changeFilter}
          changeOrder={this.changeOrder}
          changeSearch={this.changeSearch}
        /> 

        <ProductList 
          filter={filter}
          order={order}
          search={search}
        />
      </div>
    )
  }
}
