const { sendOrderConfirmationEmail, sendPaymentConfirmationEmail } = require("../adapter/klaviyo.adapter");

const sendOrderConfirmation = async (data) => {
  return sendOrderConfirmationEmail(data);
};

const sendPaymentConfirmation = async ({email}) => {
  return sendPaymentConfirmationEmail(email);
};

module.exports = {
  sendOrderConfirmation,
  sendPaymentConfirmation
};
