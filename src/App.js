import React, {Component} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import Layout from './container/pages/Layout'

import axios from 'axios'
import { newCustomer } from './constants'
import Cookie from 'universal-cookie'

import './App.css';

const alphanumeric = 'qwertyuiopasdfghjklzxcvbnm-0123456789'

export default class App extends Component {

  state = {
    cookie: null,
  }

  componentDidMount() {
    const cookie = new Cookie();
    const customer_cookie = localStorage.getItem("e_26_customer_id")
    if(customer_cookie !== null){
      cookie.set('e_26_customer_id', customer_cookie, {path:'/'})
      this.setState({
        cookie: customer_cookie
      })
    } else {
      var len = Math.floor(Math.random() * 33) + 32;
      cookie.set('e_26_customer_id', this.randomStr(len,alphanumeric), {path:'/'})
      this.setState({
        cookie: cookie.get('e_26_customer_id')
      }, this.createNewCustomer(cookie.get('e_26_customer_id')))
      localStorage.setItem("e_26_customer_id",cookie.get('e_26_customer_id'))
    }
  }

  createNewCustomer = (cookie) => {
    axios
      .post(newCustomer,{
        customer_cookie_id:cookie
      })
      .catch(err =>{
        console.log(err)
      })
  }

  randomStr(len, arr) { 
    var ans = ''; 
    for (var i = len; i > 0; i--) { 
        ans +=  
          arr[Math.floor(Math.random() * arr.length)]; 
    } 
    return ans; 
  }

  render() {
    return (
      <Router>
        <Layout>
          <BaseRouter />
        </Layout>
      </Router>
    )
  }
}

