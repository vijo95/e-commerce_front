import React, { Component } from 'react'
import './HelpBubble.css'

export default class HelpBubble extends Component {
  render() {
    return (
      <div>
        <div className="messenger-help">
          <a 
            rel="noopener noreferrer"
            href="https://m.me/victor.joaquin.77/" 
            target="_blank">
            <i className="fab fa-facebook-messenger"></i>
            <span><strong>¿Podemos ayudar?</strong></span>
          </a>
        </div>

        <div className="whatsapp-help">
          <a className="mobile" 
            rel="noopener noreferrer"
            href="https://api.whatsapp.com/send?phone=5493517197471&amp;text=" 
            target="_blank">
            <i className="fab fa-whatsapp"></i>
            <span><strong>¿Necesitás ayuda?</strong></span>
          </a>
          <a className="desktop" 
            rel="noopener noreferrer"
            href="https://web.whatsapp.com/send?phone=5493517197471&amp;text=" 
            target="_blank">
            <i className="fab fa-whatsapp"></i>
            <span><strong>¿Necesitás ayuda?</strong></span>
          </a>
        </div>
        
      </div>
    )
  }
}
