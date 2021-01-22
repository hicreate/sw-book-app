const express = require('express');
const TourCMSApi = require('tourcms');
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');

const app = express();

var whitelist = ['https://spiritjourneysworldwide.com', 'http://spiritworld.test'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};


// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET);

//Tour CMS Constants
const channelId = 10176;
const apiKey = process.env.TOUR_API_KEY;
const marketplaceId = 0;

const TourCMS = new TourCMSApi({
    channelId: channelId,
    apiKey: apiKey,
    marketplaceId: marketplaceId
});

app.use(cors(corsOptions));

//get tourCMS redirect URL
app.get('/api/redirect-tour', function (req, res) {
    const url = req.query.url;

    TourCMS.getBookingRedirectUrl({
        channelId: channelId,
        responseUrl: url,
        callback: function(response) {
            res.send(response.url.redirect_url);
            console.log(response)
        }
    });
});

//get tour availability dates
app.get('/api/dates', function (req, res) {
    const tourId = req.query.tourId;
    console.log(tourId);
    TourCMS.showTourDatesDeals({
        tourId: tourId,
        qs: {
            distinct_start_dates: 1
        },
        callback: function(response) {
            res.send(response.dates_and_prices.date);
        }
    });
});

//confirm date availability
app.get('/api/check-available', function (req, res) {
    const rate = req.query.tourRate;
    let qs = {};
    qs.tourId = req.query.tourId;
    qs.selectedDate = req.query.selectedDate;
    qs[rate] = req.query.numberTravellers;

    //console.log(tourId);
    TourCMS.checkTourAvailability({
        channelId: channelId,
        qs: qs,
        callback: function(response) {
            res.send(response);
            res.send(qs);
        }
    });
});

//start booking process
app.get('/api/start-booking', function (req, res) {
    const bookingKey = req.query.bookingKey;
    const componentKey = req.query.componentKey;
    const howMany = req.query.howMany;
    const customers = req.query.customers;
    const customer = [];
    const options = req.query.options;
    const option = [];

    //fomat the customers data for sending to Tour CMS
    function createCustomerStructure(){
        if(customers.length > 0){
            customers.forEach(c=>{
                customer.push(
                    JSON.parse(c)
                );
            })
        }
    }

    //format the customers data for sending to Tour CMS
    function createOptionStructure(){
        if(options){
            options.forEach(c=>{
                option.push(
                    JSON.parse(c)
                );
            })
        }
    }

    createCustomerStructure();
    createOptionStructure();
    console.log(customer);
    console.log(option);

    TourCMS.startNewBooking({
        channelId: channelId,
        booking: {
            booking_key: bookingKey,
            total_customers: howMany,
            components: {
                component: [
                    {
                        component_key: componentKey,
                        options: {
                            option: option
                        }
                    }
                ]
            },
            customers: {
                customer: customer
            },
        },
        callback: function(response) {
            res.send(response);
        }
    });
});

//commit temporary booking
app.get('/api/complete-booking', function (req, res) {
    const bookingId = req.query.bookingId;

    TourCMS.commitBooking({
        channelId: channelId,
        booking: {
            booking_id: bookingId,
            suppress_email: 0
        },
        callback: function(response) {
            res.send(response);
        }
    });
});

//get full tour details with options
app.get('/api/full-tour', function (req, res) {
    const tourId = req.query.tourId;

    TourCMS.showTour({
        channelId: channelId,
        tourId: tourId,
        qs: {
            show_options: 1,
        },
        callback: function(response) {
            res.send(response);
        }
    });
});

//register the completed booking payment
app.get('/api/commit-payment', function (req, res) {
    const bookingId = req.query.bookingId;
    const paymentValue = req.query.paymentValue;

    TourCMS.createPayment({
        channelId: channelId,
        payment: {
            booking_id: bookingId,
            payment_value: paymentValue
        },
        callback: function(response) {
            res.send(response);
        }
    });
});

//add a booking note with what rooms were booked
app.get('/api/room-note', function (req, res) {
    const bookingId = req.query.bookingId;
    const noteType = req.query.noteType;
    const bookingData = req.query.bookingData;

    TourCMS.addNoteToBooking({
        channelId: channelId,
        payment: {
            booking_id: bookingId,
            note: {
                type: noteType,
                text: bookingData
            }
        },
        callback: function(response) {
            res.send(response);
        }
    });
});

//generate payment intent
app.get('/api/payment-intent', async function (req, res) {
    const amount = req.query.tourValue;
    //console.log(amount);

    //get the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'gbp',
        // Verify your integration in this guide by including this parameter
        metadata: {integration_check: 'accept_a_payment'},
    });

    //return it to the frontend
    res.send(paymentIntent);
});

app.get('/api', function (req, res) {
    res.send('Hello World')
});

app.listen(3000);
