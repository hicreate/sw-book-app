const express = require('express');
const app = express();
const TourCMSApi = require('tourcms');

var TourCMS = new TourCMSApi({
    channelId: 10176,
    apiKey: '9dca85ec869f',
    marketplaceId: 0
});

TourCMS.showChannel({
    callback: function(response) {
        console.log(response);
    }
})

app.get('/api', function (req, res) {
    res.send('Hello World')
});

app.listen(3000);