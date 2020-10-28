import React from 'react';
import axios from 'axios'
import { submitPayment } from '../../../constants'
import Cards from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import { 
  MDBRow, MDBCol, MDBInput, MDBBtn
} from 'mdbreact';


class CheckoutForm extends React.Component {
  
  state = {
    card_number: '',
    cardholderName: '',
    cardExpirationMonth: '',
    cardExpirationYear: '',
    cvc:'',
    docNumber: '',
    focus: '',
  };

  componentDidMount(){
    const {
      customer_cookie_id,
      amount,
      order_id
    } = this.props

    console.log(customer_cookie_id);
    console.log(amount);
    console.log(order_id);

    // Agrega clave pública
    window.Mercadopago.setPublishableKey("TEST-b4596bbd-e6bb-4cc4-8cf7-0dbd2cc78f66");

    // Obtener tipo de documento
    window.Mercadopago.getIdentificationTypes();

    // Obtener método de pago de la tarjeta
    document.getElementById('cardNumber').addEventListener('keyup', guessPaymentMethod);
    document.getElementById('cardNumber').addEventListener('change', guessPaymentMethod);

    function guessPaymentMethod(event) {
      let cardnumber = document.getElementById("cardNumber").value;
      if (cardnumber.length >= 6) {
          let bin = cardnumber.substring(0,6);
          window.Mercadopago.getPaymentMethod({
              "bin": bin
          }, setPaymentMethod);
      }
    };

    // Setear el payment_method
    function setPaymentMethod(status, response) {
      if (status === 200) {
          let paymentMethodId = response[0].id;
          let element = document.getElementById('payment_method_id');
          element.value = paymentMethodId;
          getInstallments();
      } else {
          alert(`payment method info error: ${response}`);
      }
    }

    // Obtener cantidad de Cuotas
    function getInstallments(){
      window.Mercadopago.getInstallments({
          "payment_method_id": document.getElementById('payment_method_id').value,
          "amount": amount

      }, function (status, response) {
          if (status === 200) {
              document.getElementById('installments').options.length = 0;
              response[0].payer_costs.forEach( installment => {
                  let opt = document.createElement('option');
                  opt.text = installment.recommended_message;
                  opt.value = installment.installments;
                  document.getElementById('installments').appendChild(opt);
              });
          } else {
              alert(`installments method info error: ${response}`);
          }
      });
    }

    // Crea el token de la tarjeta
    var doSubmit = false;
    document.querySelector('#pay').addEventListener('submit', doPay);
    function doPay(event){
      event.preventDefault();
      if(!doSubmit){
          var $form = document.querySelector('#pay');
          window.Mercadopago.createToken($form,sdkResponseHandler)
          return false;
      }
    };

    function sdkResponseHandler(status, response) {
      if (status !== 200 && status !== 201) {
          console.log(response)
          alert("Verifique los datos ingresados");
      }else{
          var form = document.querySelector('#pay')
          var card = document.createElement('input');
          card.setAttribute('name', 'token')
          card.setAttribute('type', 'hidden')
          card.setAttribute('value', response.id)
          form.appendChild(card)
          doSubmit=true
          console.log(form)
          submitHandler(response.id)
          //form.submit()
      }
    };

    function submitHandler(token){
      console.log(token);
      var loader = document.getElementById('payment-loader')
      var form = document.getElementById('payment-form')
      var payment_method_id = document.getElementById('payment_method_id')
      var installments = document.getElementById('installments')

      form.classList.add('hideLoader')
      loader.classList.remove('hideLoader')

      axios
        .post(submitPayment, {
          customer_cookie_id: customer_cookie_id,
          order_id: parseInt(order_id),
          amount: parseFloat(amount),
          token: token,
          payment_method_id: payment_method_id.value,
          installments: parseInt(installments.value)
        })
        .then(res => {
          if(res.data.message === 'ok'){
            window.location.href = "/payment-success/";
          } else if(res.data.message === 'pending'){
            window.location.href = "/payment-pending/";
          } else if(res.data.message === 'call_for_authorize'){
            window.location.href = "/payment-rejected/"
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  verifyFields = (event) => {
    event.preventDefault();
    event.target.className += ' was-validated'
  }

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFocusChange = (event) => {
    this.setState({
        focus : event.target.name
    })
  }

  isEmptySpaceOrNull = (string) => {
    return string === '' || string.trim() === '' || string === null
  }

  render() {

    return (
      <>
        <div id="payment-loader" className="loader hideLoader"></div>
        <div id="payment-form">
          <h4 style={{margin:'20px',color:'#40C4FF'}}>Datos del Titular de la Tarjeta</h4>
          <Cards 
            number={this.state.card_number}
            name={this.state.cardholderName}
            expiry={this.state.cardExpirationMonth + this.state.cardExpirationYear}
            cvc={this.state.cvc}
            focused={this.state.focus}
          />
          <form
            action=""
            id="pay" 
            name="pay"
            className='needs-validation'
            onSubmit={this.verifyFields}
            noValidate
            style={{padding:'15px'}}
          >
            <MDBRow>
              <MDBCol md='6'>
                <MDBInput
                  icon='credit-card'
                  value={this.state.card_number}
                  name='card_number'
                  onChange={this.changeHandler}
                  onFocus={this.handleFocusChange}
                  type='text'
                  id='cardNumber'
                  label='Número de la tarjeta'
                  required
                  maxLength="16"
                  data-checkout="cardNumber"
                  pattern="\d*"
                >
                  <div className='invalid-feedback ml-3 pl-3'>
                    Por favor ingrese el número de la tarjeta.
                  </div>
                  <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput
                  icon='user'
                  value={this.state.cardholderName}
                  name='cardholderName'
                  onChange={this.changeHandler}
                  onFocus={this.handleFocusChange}
                  type='text'
                  id='cardholderName'
                  label='Titular de la tarjeta'
                  required
                  data-checkout="cardholderName"
                >
                  <div className='invalid-feedback ml-3 pl-3'>
                    Por favor ingrese el titular de la tarjeta.
                  </div>
                  <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='6'>
                <MDBInput
                  icon='calendar-alt'
                  value={this.state.cardExpirationMonth}
                  onChange={this.changeHandler}
                  onFocus={this.handleFocusChange}
                  type='text'
                  id='cardExpirationMonth'
                  name='cardExpirationMonth'
                  label='Mes de vencimiento'
                  required
                  maxLength="2"
                  data-checkout="cardExpirationMonth"
                  pattern="\d*"
                >
                  <div className='invalid-feedback ml-3 pl-3'>
                    Por favor ingrese el mes de vencimiento
                  </div>
                  <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput
                  icon='calendar'
                  value={this.state.cardExpirationYear}
                  onChange={this.changeHandler}
                  onFocus={this.handleFocusChange}
                  type='text'
                  id='cardExpirationYear'
                  name='cardExpirationYear'
                  label='Año de vencimiento'
                  required
                  maxLength="2"
                  data-checkout="cardExpirationYear"
                  pattern="\d*"
                >
                  <div className='invalid-feedback ml-3 pl-3'>
                    Por favor ingrese el año de vencimiento
                  </div>
                  <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='6'>
                <MDBInput
                  icon='unlock-alt'
                  value={this.state.cvc}
                  onChange={this.changeHandler}
                  onFocus={this.handleFocusChange}
                  type='text'
                  id='securityCode'
                  name='cvc'
                  label='Código de seguridad'
                  required
                  data-checkout="securityCode"
                  maxLength="4"
                  pattern="\d*"
                >
                  <div className='invalid-feedback ml-3 pl-3'>
                    Por favor ingrese el código de seguridad.
                  </div>
                  <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md='6'>
                <div className="md-form md-outline">
                  <i className="fas fa-dollar-sign prefix"></i>
                  <select
                    style={{borderRadius:'4px', width:'92%',float:'right'}}
                    id="installments" 
                    name="installments"
                    className="form-control" >
                  </select>
                </div>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='6'>
                <div className="md-form md-outline">
                  <i className="fas fa-id-card prefix"></i>
                  <select
                    style={{borderRadius:'4px', width:'90%',float:'right'}}
                    id="docType"
                    className="form-control"
                    data-checkout="docType">
                  </select>
                </div>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput
                  icon='id-card'
                  value={this.state.docNumber}
                  onChange={this.changeHandler}
                  onFocus={this.handleFocusChange}
                  type='text'
                  id='docNumber'
                  name='docNumber'
                  label='Número de Documento'
                  required
                  maxLength="16"
                  data-checkout="docNumber"
                >
                  <div className='invalid-feedback ml-3 pl-3'>
                    Por favor ingrese el código de seguridad.
                  </div>
                  <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBCol style={{textAlign:'center'}}>
              <input type="hidden" name="payment_method_id" id="payment_method_id"/>
              <MDBBtn 
                style={{borderRadius:'5rem'}} color='info' type='submit'>
                Pagar 
                <span 
                  className="ml-3" 
                  style={{fontWeight:'bold'}}>
                  $ {this.props.amount.toFixed(2).toString().replace('.',',')}
                </span>
              </MDBBtn>
            </MDBCol>
          </form>
        </div>
      </>
    );
  }
}

export default CheckoutForm;