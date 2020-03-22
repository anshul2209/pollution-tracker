var express = require('express');
var router = express.Router();
const axios = require("axios");
// axios.interceptors.request.use(request => {
// 	console.log('Starting Request', request)
// 	return request
// })

// axios.interceptors.response.use(response => {
// 	console.log('Response:', response)
// 	return response
// })

var twilio = require('twilio');
var accountSid = 'AC480c71bee445284fc77bb79ab79e7b05'; // Your Account SID from www.twilio.com/console
var authToken = '251513ad19e14f27282ebaaa444676ae';   // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

const pollution_url = 'https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69'
const pollution_api_config = {
    'api-key': '579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b',
    'format': 'json',
    'offset': 0,
    'limit': 10,
    'filters[station]': 'Sector-51, Gurugram - HSPCB',
    // 'filters[pollutant_id]': 'PM10'
};

const sendSms = function (data) {
    client.messages.create({
        body: `The response is${JSON.stringify(data[0])}`,
        to: '+919873371430',  // Text this number
        from: '+12062223024' // From a valid Twilio number
    })
        .then((message) => console.log(message.sid))
        .catch(err => console.log('err', err));
}


const getFilterParams = params => {
    const param = {};

    Object.keys(params)
        .filter(key => params[key])
        .forEach(key => {
            param[[`filters[${key}]`]] = params[key]
        });
    return param;
};

router.get('/pollution', function (req, res, next) {
    const queryParams = { ...pollution_api_config, ...getFilterParams(req.query) }

    try {
        axios.get(pollution_url, { params: queryParams })
            .then(response => {
                // sendSms(response.data.records);

                res.send(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    catch (err) {
        console.error("GG", err);
    }
})

module.exports = router;
