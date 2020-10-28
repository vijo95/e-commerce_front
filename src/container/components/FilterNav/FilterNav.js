import React, { Component } from "react";
import axios from 'axios'
import { categories } from '../../../constants'
import { 
  MDBNavbar, MDBNavbarNav, MDBNavItem, 
  MDBNavbarToggler, MDBCollapse,
} from "mdbreact";

import './FilterNav.css'

class NavbarPage extends Component {
  state = {
    collapseID: "",
    categories: null,
  };

  componentDidMount(){
    axios.get(categories)
      .then(res => {
        this.setState({
          categories: res.data.categories
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  handleFilterClick = (filter) => {
    this.props.changeFilter(filter)
  }

  handleSearch = (event) => {
    event.preventDefault()
    var search = document.getElementById('search').value
    this.props.changeSearch(search)
  }

  handleOrderClick = (order) => {
    this.props.changeOrder(order)
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
    collapseID: prevState.collapseID !== collapseID ? collapseID : ""
  }));

  render() {
    
    const { categories } = this.state
    
    return (
       <MDBNavbar 
        light expand="md" 
        style={{ 
          marginBottom: "20px", borderRadius:'5px', 
          backgroundColor:'white',boxShadow:'none',
        }}>
          <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item all-btn">
                <p 
                  onClick={() => this.handleFilterClick(0)}
                  className="nav-link" 
                  style={{margin:'0px', cursor:'pointer'}}>
                  <i className="fas fa-globe mr-2"></i>Todo
                </p>
              </li>

              <li className="dropbtn nav-item">
                <p className="nav-link">
                  <i className="fas fa-male mr-2"></i>Hombres
                </p>
                <div className="dropdown-content">
                  <p onClick={() => this.handleFilterClick("H")}>
                    Todo Hombres
                  </p>
                  { categories !== null ?
                    categories.map((cat,index)=> 
                      cat.gender === 1 ? 
                      <p key={index} onClick={() => this.handleFilterClick(cat.id)}>
                        {cat.name}
                      </p>:null
                  ):null}
                </div>
              </li>

              <li className="dropbtn nav-item">
                <p className="nav-link">
                  <i className="fas fa-male mr-2"></i>Mujeres
                </p>
                <div className="dropdown-content">
                  <p onClick={() => this.handleFilterClick("M")}>
                    Todo Mujeres
                  </p>
                  { categories !== null ?
                    categories.map((cat,index)=> 
                      cat.gender === 2 ? 
                      <p key={index} onClick={() => this.handleFilterClick(cat.id)}>
                        {cat.name}
                      </p>:null
                  ):null}
                </div>
              </li>
              
              <li className="new-off nav-item">
                <p
                  onClick={() => this.handleFilterClick('N')} 
                  className="nav-link">
                  <span className="badge badge-pill primary-color">
                    Nuevo
                  </span>
                </p>
              </li>
              <li className="new-off nav-item">
                <p 
                   onClick={() => this.handleFilterClick('D')}
                  className="nav-link">
                  <span className="badge badge-pill danger-color">%OFF</span>
                </p>
              </li>

              <li className="dropbtn nav-item">
                <p className="nav-link">
                  <i className="fas fa-sort mr-2"></i>
                  Ordenar
                </p>
                <div className="dropdown-content">
                  <p onClick={() => this.handleOrderClick(0)}>
                    <i className="fas fa-fire mr-2"></i>
                    Más relevante
                  </p>
                  <p onClick={() => this.handleOrderClick(1)}>
                    <i className="fas fa-sort-amount-down mr-2"></i>
                    Precio: mayor a menor
                  </p>
                  <p onClick={() => this.handleOrderClick(2)}>
                    <i className="fas fa-sort-amount-down-alt mr-2"></i>
                    Precio: menor a mayor
                  </p>
                </div>
              </li>
            </ul>

            <MDBNavbarNav right>
              <MDBNavItem>
                <form
                  style={{width:'90%'}}
                  className="md-form my-0"
                  onSubmit={this.handleSearch}>
                  <label>
                    <i className="fas fa-search"></i>
                  </label>
                  <input
                    className="form-control mr-sm-2 ml-4" 
                    type="text" 
                    id="search"
                    placeholder="Buscar..."
                    aria-label="Search"
                  />
                </form>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>

    );
  }
}

export default NavbarPage;