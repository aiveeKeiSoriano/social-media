const axios = require("axios")

const sendOrderConfirmationEmail = async (order) => {
    const result = await axios.post(
        'https://a.klaviyo.com/api/track',
        {
            token: "QQ5ybK",
            event: 'Order Confirmation',
            customer_properties: {
              $email: order.email
            },
            properties: order
          },
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            }
          }
    )
    return result
}

const sendPaymentConfirmationEmail = async (email) => {
    const result = await axios.post(
        'https://a.klaviyo.com/api/track',
        {
            token: "QQ5ybK",
            event: 'Payment Confirmation',
            customer_properties: {
              $email: email
            }
        },
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }   
        }
    )
    return result
}

module.exports = {
    sendOrderConfirmationEmail,
    sendPaymentConfirmationEmail
}