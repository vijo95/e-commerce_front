import React, { Component } from 'react'

import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer/Footer'
import HelpBubble from '../components/HelpBuble/HelpBubble'

export default class Layout extends Component {
  render() {

    return (
      <div style={{backgroundColor:'#ECEFF1'}}>
        <Navbar/>

        {this.props.children}
        
        <HelpBubble />

        <Footer />
      </div>
    )
  }
}
