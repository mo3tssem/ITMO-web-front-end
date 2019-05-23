import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/movies";

/*
export function getMovies() {
  fetch("http://apiEndpoint:4000/lista")
    .then(response => {
      return response.json();
    })
    .then(({ data }) => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });

  //  http.get(apiEndpoint);
}
*/

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieID) {
  return http.get(movieUrl(movieID));
}

export function saveMovie(movie) {
  if (movie._id) {
    //update
    const body = { ...movie };
    delete body._id;

    return http.put(movieUrl(movie._id), body);
  }
  return http.post(apiEndpoint, movie);
}
export function deleteMovie(movieId) {
  http.delete(movieUrl(movieId));
}
