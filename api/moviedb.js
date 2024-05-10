import axios from 'axios'
import { apiKey } from '../src/constants'

//endpoints

const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoints = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upComingMoviesEndpoints = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndpoints = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndpoint =  `${apiBaseUrl}/search/movie?api_key=${apiKey}`

//dynamic endpoints 
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`



export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null

export const fallbackMoviePoster = 'https://t1.pixers.pics/img-1fb6f67c/posterler-film-seridi.jpg?H4sIAAAAAAAAA3VOWW7DIBC9Dki2ZzAQGw6Q3xzBwhinbr0gIG3U03esKJ_VaLYnvQUee3ZzAB_2EhJsyzStAeZlpS_bFPLyGxhWWhtuCV0ZInJ7fIfk0xFZrbGqVV9dBFK33P44Im4ufbGPUmK2AFk2cXmSGi2fwW8ZWhQdYA_a9Ma1c2tQ9WKIdS5un1yaSPWpsYn7vcKz-DuIQqzUGaCkZWOU6CCvwj7jncM_fq8biAXXGzlCj2AkCDyh4XqjDGikwGEyWl2M8MJpJbtu7FChH2mMPsjZhYZc_gAtRdUFLgEAAA=='
export const fallbackPersonPoster = 'https://polisci.uccs.edu/sites/default/files/2020-07/person-placeholder-2.jpg'


const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }
    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log(error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoints)
}

export const fetchupComingMovies = () => {
    return apiCall(upComingMoviesEndpoints)
}

export const fetchtopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoints)
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}

export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}

export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id))
}

export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id))
}

export const fetchSearchMovies = params => {
    return apiCall(searchMoviesEndpoint, params)
}
