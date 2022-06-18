import Observable from '../framework/observable.js';
import { UpdateType } from '../utils/filters.js';

export default class FilmCardModel extends Observable {
  #films = [];
  #apiServes = null;
  constructor(apiClass){
    super();
    this.#apiServes = apiClass;
  }

  get films  () {
    return this.#films;
  }

  init = async () =>{
    try{
      const films = await this.#apiServes.films;
      this.#films = films.map(this.#adaptToClient);
    } catch (err) {
      this.#films =[];
    }
    this._notify(UpdateType.INIT);
  };

  #adaptToClient =(films)=>{
    const adaptFilm =  {...films,
      filmInfo: films.film_info,
      userDetails: films.user_details,
    };
    adaptFilm.filmInfo = {...adaptFilm.filmInfo,
      alternativeTitle: adaptFilm.filmInfo.alternative_title,
      ageRating: adaptFilm.filmInfo.age_rating,
      totalRating: adaptFilm.filmInfo.total_rating,
      release : {date:adaptFilm.filmInfo.release.date, releaseCountry: adaptFilm.filmInfo.release.release_country}
    };
    adaptFilm.userDetails= {...adaptFilm.userDetails,
      watchList:adaptFilm.userDetails.watch_list,
      alreadyWatched:adaptFilm.userDetails.already_watched
    };
    delete adaptFilm.filmInfo.alternative_title;
    delete  adaptFilm.filmInfo.age_rating;
    delete adaptFilm.filmInfo.total_rating;
    delete adaptFilm.filmInfo.release.release_country;
    delete adaptFilm.userDetails.watch_list;
    delete adaptFilm.userDetails.already_watched;
    delete adaptFilm.film_info;
    delete adaptFilm.user_details;
    return adaptFilm;
  };

  updateFilms = async (updateType, update) => {
    const index = this.#films.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexciting task');
    }
    try{

      const response = await this.#apiServes.updateFilms(update);
      const updateFilms = this.#adaptToClient(response);

      this.#films = [
        ...this.#films.slice(0, index),
        updateFilms,
        ...this.#films.slice(index + 1),
      ];
      this._notify(updateType, updateFilms);
    }catch(err){
      throw new Error('Не получилось обновить');
    }
  };

}
