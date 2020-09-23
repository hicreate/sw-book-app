import axios from 'axios';

const apiClient = axios.create({
    baseURL:'http://localhost:3000/api/',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
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
    }

    // getTourDates(tourId) {
    //     return apiClient.get('dates', {
    //         params: {
    //             tourId: tourId
    //         },
    //         headers: {
    //             Authorization: `Bearer ` + token
    //         }
    //     })
    // }
}