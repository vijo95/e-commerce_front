const localhost = "http://localhost:8000"
//const realHost = "https://e-26-indumentaria.herokuapp.com"

const apiURL = "/api"

export const endpoint = `${localhost}${apiURL}`


export const newCustomer = `${endpoint}/new-customer/`

export const homeItems = `${endpoint}/home-items/`
export const allItems = `${endpoint}/all-items/`
export const categories = `${endpoint}/categories/`
export const itemVariations = `${endpoint}/item-variations/`

export const customerOrder = `${endpoint}/customer-order/`
export const addItemToCart = `${endpoint}/add-item-to-cart/`
export const deleteItemFromCart = `${endpoint}/delete-item-from-cart/`
export const addOneItem = `${endpoint}/add-one-item/`
export const deleteOneItem = `${endpoint}/delete-one-item/`

export const customerInfo = `${endpoint}/customer-info/`
export const submitCheckout = `${endpoint}/submit-checkout/`
export const submitPayment = `${endpoint}/submit-payment/`

export const addCouponOrder = `${endpoint}/add-coupon-order/`