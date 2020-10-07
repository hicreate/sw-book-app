const express = require('express');
const TourCMSApi = require('tourcms');
//const cors = require('cors');

const app = express();

// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('sk_test_iDx65MNZx4rJnWc27w9CSfDq00Too0SLqs');

//Tour CMS Constants
const channelId = 10176;
const apiKey = '9dca85ec869f';
const marketplaceId = 0;

//app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://spiritworld.test"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const TourCMS = new TourCMSApi({
    channelId: channelId,
    apiKey: apiKey,
    marketplaceId: marketplaceId
});

//get tourCMS redirect URL
app.get('/api/redirect-tour', function (req, res) {
    const url = req.query.url;

    TourCMS.getBookingRedirectUrl({
        channelId: channelId,
        responseUrl: url,
        callback: function(response) {
            res.send(response.url.redirect_url);
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

//generate payment intent
app.get('/api/payment-intent', async function (req, res) {

    console.log(req.query);

    //get the payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.query.tourValue,
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