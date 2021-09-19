const config = require('../../config')

const accountSid = config.twilio.sid;
const authToken = config.twilio.auth;

const client = require('twilio')(accountSid, authToken);

const sendAssignment = (orderDetails) => {
  const priorityStr = orderDetails.priority >= 4 ? 'HIGH' : orderDetails.priority >= 2 ? 'MEDIUM' : 'LOW'

  client.messages
  .create({
     body: `You\'ve been assigned ${priorityStr} priority work at ${orderDetails.facility}. It is on ${orderDetails.equipment.equipment_type} equipment and estimated to take ${orderDetails.completion} hours to complete.`,
     from: '+15022097047',
     to: '+15083338371'
   })
  .then(message => console.log(message.sid));
}

module.exports = {
  sendAssignment: sendAssignment
}