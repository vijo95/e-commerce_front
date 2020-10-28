import React from 'react';
import axios from 'axios'
import { submitCheckout, customerInfo } from '../../../constants'
import Cookie from 'universal-cookie'
import { MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';

class CheckoutForm extends React.Component {
  state = {
    customer_cookie_id: '',

    fname: '',
    lname: '',
    email: '',
    phone: '',

    shipping_street_name: '',
    shipping_street_number: '',
    shipping_floor: '',
    shipping_apartment: '',

    billing_street_name: '',
    billing_street_number: '',
    billing_floor: '',
    billing_apartment: '',

    use_default_shipping: false,
    use_default_billing: false,
    use_billing_same_shipping: false,

    default_shipping_address: null,
    default_billing_address: null,

    loading: false,
  };

  componentDidMount(){
    const cookie = new Cookie();
    this.setState({
      customer_cookie_id: cookie.get('e_26_customer_id')
    })
    axios.post(customerInfo, {
      customer_cookie_id: cookie.get('e_26_customer_id')
    })
    .then(res => {
      this.setState({
        default_shipping_address: res.data.default_shipping_address,
        default_billing_address: res.data.default_billing_address
      })
    })
    .catch(err =>{
      console.log(err);
    })
  }

  submitHandler = event => {
    event.preventDefault();
    this.setState({
      loading:true
    })
    event.target.className += ' was-validated';
    const {
      fname,lname,
      email, phone,
      customer_cookie_id,

      shipping_street_name,
      shipping_street_number,
      shipping_floor,
      shipping_apartment,

      billing_street_name,
      billing_street_number,
      billing_floor,
      billing_apartment,

      use_default_shipping,
      use_default_billing,
      use_billing_same_shipping,
    } = this.state

    if(this.isEmptyOrSpace(fname) || this.isEmptyOrSpace(lname) ||
    this.isEmptyOrSpace(email) || this.isEmptyOrSpace(phone) || 
    this.isEmptyOrSpace(customer_cookie_id) ||
    this.isEmptyOrSpace(shipping_street_name) ||
    this.isEmptyOrSpace(shipping_street_number)){
    this.setState({
      loading:false
    })
      return
    }

    if(this.isEmptyOrSpace(billing_street_name) ||
      this.isEmptyOrSpace(billing_street_number) ){
      if(!use_billing_same_shipping){
        this.setState({
          loading:false
        })
        return
      } else {
        axios
        .post(submitCheckout,{
          customer_cookie_id: customer_cookie_id,
          
          name: fname,
          last_name: lname,
          phone: phone,
          email: email,

          shipping_street_name: shipping_street_name,
          shipping_street_number: shipping_street_number,
          shipping_floor: shipping_floor === '' ? null : shipping_floor,
          shipping_apartment: shipping_apartment === '' ? null : shipping_apartment,

          billing_street_name: shipping_street_name,
          billing_street_number: shipping_street_number,
          billing_floor: shipping_floor === '' ? null : shipping_floor,
          billing_apartment: shipping_apartment === '' ? null : shipping_apartment,

          use_default_shipping: use_default_shipping,
          use_default_billing: use_default_billing,
          use_billing_same_shipping: use_billing_same_shipping,
        })
        .then(res => {
          if(res.data.message === "ok"){
            window.location.href = "/payment/";
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading:false
          })
        })
      }
    } else {
      axios
        .post(submitCheckout,{
          customer_cookie_id: customer_cookie_id,
          
          name: fname,
          last_name: lname,
          phone: phone,
          email: email,

          shipping_street_name: shipping_street_name,
          shipping_street_number: shipping_street_number,
          shipping_floor: shipping_floor,
          shipping_apartment: shipping_apartment,

          billing_street_name: billing_street_name,
          billing_street_number: billing_street_number,
          billing_floor: billing_floor === '' ? null : billing_floor,
          billing_apartment: billing_apartment === '' ? null : billing_apartment,

          use_default_shipping: use_default_shipping,
          use_default_billing: use_default_billing,
          use_billing_same_shipping: use_billing_same_shipping,
        })
        .then(res => {
          if(res.data.message === "ok"){
            window.location.href = "/payment/";
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            loading:false
          })
        })
    }
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  isEmptyOrSpace = (string) => {
    return string === '' || string.trim() === ''
  }

  handleCheckbox = (event) => {
    const value = event.target.checked
    const name = event.target.name
    this.setState({
      [name]: value
    },this.setShippingAddress(event.target.name))
  }

  setShippingAddress = (option) => {
    const {default_shipping_address, default_billing_address} = this.state
    switch(option){
      case "use_default_shipping":
        this.setState({
          shipping_street_name: default_shipping_address.street_name,
          shipping_street_number: default_shipping_address.street_number,
          shipping_floor: default_shipping_address.floor === null ? '' : default_shipping_address.floor,
          shipping_apartment: default_shipping_address.apartment === null ? '' : default_shipping_address.apartment,
        })
        break
      case "use_default_billing":
        this.setState({
          billing_street_name: default_billing_address.street_name,
          billing_street_number: default_billing_address.street_number,
          billing_floor: default_billing_address.floor === null ? '' : default_billing_address.floor,
          billing_apartment: default_billing_address.apartment === null ? '' : default_billing_address.apartment,
        })
        break
      default: return
    }
  }

  render() {

    const { 
      loading, 
      default_shipping_address,
      default_billing_address,
      use_default_shipping,
      use_default_billing,
      use_billing_same_shipping,
    } = this.state

    return (
      <div>
        { loading ? <div className="loader"></div> :
          <form
            className='needs-validation'
            onSubmit={this.submitHandler}
            noValidate
            style={{padding:'15px'}}
          >
            {/* Personal Info */}
            <h3>Datos Personales</h3>
            <MDBRow>
              <MDBCol md='6'>
                <MDBInput
                  icon='user'
                  value={this.state.fname}
                  name='fname'
                  onChange={this.changeHandler}
                  type='text'
                  id='materialFormRegisterNameEx'
                  label='Nombre(s)'
                  outline
                  required
                >
                  <div className='invalid-feedback ml-3 pl-3'>
                    Por favor ingrese su nombre.
                  </div>
                  <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput
                  icon='address-card'
                  value={this.state.lname}
                  name='lname'
                  onChange={this.changeHandler}
                  type='text'
                  id='materialFormRegisterEmailEx2'
                  label='Apellido(s)'
                  outline
                  required
                >
                  <div className='invalid-feedback ml-3 pl-3'>
                    Por favor ingrese su apellido.
                  </div>
                  <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                </MDBInput>
              </MDBCol>
            </MDBRow>
            <MDBRow>
              <MDBCol md='6'>
                <MDBInput
                  icon='at'
                  value={this.state.email}
                  onChange={this.changeHandler}
                  type='email'
                  id='materialFormRegisterConfirmEx3'
                  name='email'
                  label='E-mail'
                  outline
                  required
                >
                  <div className='invalid-feedback ml-3 pl-3'>
                    Por favor ingrese una dirección de e-mail.
                  </div>
                  <small id='emailHelp' className='form-text text-muted'>
                    A este e-mail le enviaremos los detalles de la reserva
                  </small>
                  <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                </MDBInput>
              </MDBCol>
              <MDBCol md='6'>
                <MDBInput
                  icon='mobile-alt'
                  value={this.state.phone}
                  onChange={this.changeHandler}
                  type='text'
                  id='materialFormRegisterPasswordEx4'
                  name='phone'
                  label='Número de teléfono móvil o fijo'
                  outline
                  required
                >
                  <div className='invalid-feedback ml-3 pl-3'>
                    Por favor ingrese su número de teléfono móvil o fijo.
                  </div>
                  <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                </MDBInput>
              </MDBCol>
            </MDBRow>
            
            {/* Shipping Address Info */}
            <h3 className="mt-5">Domicilio de Envío</h3>
            { default_shipping_address !== null ?
              <div className="custom-control custom-checkbox">
                <input
                  checked={use_default_shipping}
                  onChange={this.handleCheckbox}
                  type="checkbox" className="custom-control-input" 
                  id="use_default_shipping"
                  name="use_default_shipping" />
                <label className="custom-control-label" htmlFor="use_default_shipping">
                  Usar último domcilio de envío: <strong>
                    {default_shipping_address.street_name + " " + default_shipping_address.street_number}
                  </strong>
                </label>
              </div> : null
            }
            { !use_default_shipping ?
              <div>
                <MDBRow>
                  <MDBCol md='6'>
                    <MDBInput
                      icon='road'
                      value={this.state.shipping_street_name}
                      name='shipping_street_name'
                      onChange={this.changeHandler}
                      type='text'
                      id='shipping_street_name'
                      label='Nombre de la calle'
                      outline
                      required
                    >
                      <div className='invalid-feedback ml-3 pl-3'>
                        Por favor el nombre de la calle.
                      </div>
                      <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                    </MDBInput>
                  </MDBCol>
                  <MDBCol md='6'>
                    <MDBInput
                      icon='sort-numeric-down'
                      value={this.state.shipping_street_number}
                      name='shipping_street_number'
                      onChange={this.changeHandler}
                      type='text'
                      id='shipping_street_number'
                      label='Número de la calle'
                      outline
                      required
                    >
                      <div className='invalid-feedback ml-3 pl-3'>
                        Por favor ingrese el número de la calle.
                      </div>
                      <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                    </MDBInput>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol md='6'>
                    <MDBInput
                      icon='building'
                      value={this.state.shipping_floor}
                      name='shipping_floor'
                      onChange={this.changeHandler}
                      type='text'
                      id='shipping_floor'
                      label='Piso'
                      outline
                      required
                    >
                      <small id='emailHelp' className='form-text text-muted'>
                        Dejar en blanco si no vive en un departamento
                      </small>
                    </MDBInput>
                  </MDBCol>
                  <MDBCol md='6'>
                    <MDBInput
                      icon='building'
                      value={this.state.shipping_apartment}
                      name='shipping_apartment'
                      onChange={this.changeHandler}
                      type='text'
                      id='shipping_apartment'
                      label='departamento'
                      outline
                      required
                    >
                    <small id='emailHelp' className='form-text text-muted'>
                      Dejar en blanco si no vive en un departamento
                    </small>
                    </MDBInput>
                  </MDBCol>
                </MDBRow>
              </div> : null
            }

            {/* Billing is same as Shipping */}
            <div className="custom-control custom-checkbox mt-2">
              <input
                checked={use_billing_same_shipping}
                onChange={this.handleCheckbox}
                type="checkbox" className="custom-control-input"
                name="use_billing_same_shipping"
                id="use_billing_same_shipping" />
              <label className="custom-control-label" htmlFor="use_billing_same_shipping">
                <strong>Domicilio de facturación es el mismo</strong>
              </label>
            </div>

            {/* Billing Address Info */}
            { !use_billing_same_shipping ? 
              <div>
                <h3 className="mt-5">Domicilio de Facturación</h3>
                { default_billing_address !== null ?
                  <div className="custom-control custom-checkbox">
                    <input
                      checked={use_default_billing}
                      onChange={this.handleCheckbox}
                      type="checkbox" className="custom-control-input" 
                      id="use_default_billing"
                      name="use_default_billing"  />
                    <label className="custom-control-label" htmlFor="use_default_billing">
                      Usar último domcilio de facturación: <strong>
                        {default_billing_address.street_name + " " + default_billing_address.street_number}
                      </strong>
                    </label>
                  </div> : null
                }
                { !use_default_billing ?
                  <div>
                    <MDBRow>
                      <MDBCol md='6'>
                        <MDBInput
                          icon='road'
                          value={this.state.billing_street_name}
                          name='billing_street_name'
                          onChange={this.changeHandler}
                          type='text'
                          id='billing_street_name'
                          label='Nombre de la calle'
                          outline
                          required
                        >
                          <div className='invalid-feedback ml-3 pl-3'>
                            Por favor el nombre de la calle.
                          </div>
                          <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                        </MDBInput>
                      </MDBCol>
                      <MDBCol md='6'>
                        <MDBInput
                          icon='sort-numeric-down'
                          value={this.state.billing_street_number}
                          name='billing_street_number'
                          onChange={this.changeHandler}
                          type='text'
                          id='billing_street_number'
                          label='Número de la calle'
                          outline
                          required
                        >
                          <div className='invalid-feedback ml-3 pl-3'>
                            Por favor ingrese el número de la calle.
                          </div>
                          <div className='valid-feedback ml-3 pl-3'>Tiene buena pinta</div>
                        </MDBInput>
                      </MDBCol>
                    </MDBRow>
                    <MDBRow>
                    <MDBCol md='6'>
                      <MDBInput
                        icon='building'
                        value={this.state.billing_floor}
                        name='billing_floor'
                        onChange={this.changeHandler}
                        type='text'
                        id='billing_floor'
                        label='Piso'
                        outline
                        required
                      >
                        <small id='emailHelp' className='form-text text-muted'>
                          Dejar en blanco si no vive en un departamento
                        </small>
                      </MDBInput>
                    </MDBCol>
                    <MDBCol md='6'>
                      <MDBInput
                        icon='building'
                        value={this.state.billing_apartment}
                        name='billing_apartment'
                        onChange={this.changeHandler}
                        type='text'
                        id='billing_apartment'
                        label='departamento'
                        outline
                        required
                      >
                      <small id='emailHelp' className='form-text text-muted'>
                        Dejar en blanco si no vive en un departamento
                      </small>
                      </MDBInput>
                    </MDBCol>
                  </MDBRow>
                  </div> : null
                }
              </div> : null 
            }
            {/* Payment Button */}
            <MDBCol style={{textAlign:'center',margin:'20px 0px 20px 0px'}}>
              <MDBBtn style={{borderRadius:'5rem'}} color='info' type='submit'>
              <i className="fas fa-dollar-sign mr-2"></i>
                Continuar al Pago
              </MDBBtn>
            </MDBCol>
          </form>
        }
      </div>
    );
  }
}

export default CheckoutForm;