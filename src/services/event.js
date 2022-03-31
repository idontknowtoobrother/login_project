import api from './api'

export function getEvents(startDate, endDate){
    return api.get('/events', {
        params: {
            startDate: startDate,
            endDate: endDate
        }
    }) 
}