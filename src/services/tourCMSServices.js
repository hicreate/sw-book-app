import axios from 'axios';

const apiClient = axios.create({
    baseURL:'https://api.spiritjourneysworldwide.com/api/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Content-Type' : 'application/json'
    }
});

export default {

    //get the available booking dates for a specific tour
    getTourDates(tourId) {
        return apiClient.get('dates', {
            params: {
                tourId: tourId
            },
        })
    },

    //get the tour details including options
    getTourDetails(tourId) {
        return apiClient.get('full-tour', {
            params: {
                tourId: tourId
            },
        })
    },

    //get the tour component key
    getTourComponentKey(tourId, selectedDate, numberTravellers, tourRate) {
        return apiClient.get('check-available', {
            params: {
                tourId: tourId,
                selectedDate: selectedDate,
                numberTravellers: numberTravellers,
                tourRate: tourRate
            },
        })
    },

    //get the tour component key
    startBooking(bookingKey, componentKey, howMany, customers, options) {
        return apiClient.get('start-booking', {
            params: {
                bookingKey: bookingKey,
                componentKey: componentKey,
                howMany: howMany,
                customers: customers,
                options: options
            },
        })
    },

    //commit the booking
    completeBooking(bookingId) {
        return apiClient.get('complete-booking', {
            params: {
                bookingId: bookingId,
            },
        })
    },

    //commit the payment
    //get the tour component key
    commitPayment(bookingId, paymentValue) {
        return apiClient.get('commit-payment', {
            params: {
                bookingId: bookingId,
                paymentValue: paymentValue
            },
        })
    },

    //get the tour details including options
    getRedirect(url) {
        return apiClient.get('redirect-tour', {
            params: {
                url: url
            },
        })
    },

    //get the available booking dates for a specific tour
    getIntent(value) {
        return apiClient.get('payment-intent', {
            params: {
                tourValue: value
            },
        })
    },
}