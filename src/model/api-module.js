/* eslint-disable camelcase */
import ApiService from '../framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE:'DELETE'
};

export default class Api extends ApiService {

  get films () {

    return this._load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  updateFilms = async (movies) => {
    const response = await this._load({
      url: `movies/${movies.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.adaptFilmToServer( movies)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parseResponse =  ApiService.parseResponse(response);
    return parseResponse;
  };

  getComments = (filmId) => this._load({url: `/comments/${filmId}`}).then(ApiService.parseResponse);

  updateComments = async (comment) => {
    const response = await this._load({
      url: `comments/: film_${comment.id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parseResponse =  ApiService.parseResponse(response);
    return parseResponse;
  };

  deleteComments = async (comment) => {
    const response = await this._load({
      url: `comments/: film_${comment.id}`,
      method: Method.DELETE,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    const parseResponse =  ApiService.parseResponse(response);
    return parseResponse;
  };

  adaptFilmToServer =(film)=>{
    const adaptFilm =  {...film,
      film_info: film.filmInfo,
      user_details: film.userDetails,
    };
    adaptFilm.film_info = {...adaptFilm.film_info,
      alternative_title: adaptFilm.film_info.alternativeTitle,
      age_rating:adaptFilm.film_info.ageRating,
      total_rating:adaptFilm.film_info.totalRating,
      release : { date:adaptFilm.film_info.release.date, release_country: adaptFilm.film_info.release.releaseCountry}
    };
    adaptFilm.user_details= {...adaptFilm.user_details,
      watch_list:adaptFilm.user_details.watchList,
      already_watched:adaptFilm.user_details.alreadyWatched
    };
    delete adaptFilm.film_info.alternativeTitle;
    delete  adaptFilm.film_info.ageRating;
    delete adaptFilm.film_info.totalRating;
    delete adaptFilm.film_info.release.releaseCountry;
    delete adaptFilm.user_details.watchList;
    delete adaptFilm.user_details.alreadyWatched;
    delete adaptFilm.filmInfo;
    delete adaptFilm.userDetails;
    return adaptFilm;
  };

}
