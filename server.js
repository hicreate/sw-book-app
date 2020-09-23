const express = require('express');
const TourCMSApi = require('tourcms');
//const cors = require('cors');

const app = express();

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


app.get('/api', function (req, res) {
    res.send('Hello World')
});

app.listen(3000);