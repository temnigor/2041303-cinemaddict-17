import AvatarIcon from './view/avatar.js';
import { render } from './framework/render.js';
import FilmList from './view/film-list.js';
import FilmsRated from './view/films-rated.js';
import FilmsMostComment from './view/films-most-commented.js';
import FilmsCatalogPrisenter from './prisenter/films-catalog-prisenter.js';
import RatedFilmsPrisenter from './prisenter/rated-films-precenter.js';
import MostCommentFilmsPrisenter from './prisenter/most-comment-films-prisenter.js';
import FilmCardModel from './model/film-card-model.js';
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const body = document.querySelector('body');
const filmsCatalogPrisenter = new FilmsCatalogPrisenter();
const filmsCatalogRatedPrisenter = new RatedFilmsPrisenter();
const filmsCatalogMostCommentPrisenter = new MostCommentFilmsPrisenter();
const filmsCardModel = new FilmCardModel();
render( new AvatarIcon (), header);
render(new FilmList(), main);
const filmsContainer = main.querySelector('.films-list__container');
filmsCatalogPrisenter.init(filmsContainer, filmsCardModel, body);
const films = main.querySelector('.films');
render(new FilmsRated, films);
render(new FilmsMostComment, films);
const topRated = main.querySelector('.rated');
filmsCatalogRatedPrisenter.init(topRated, filmsCardModel);
const mostCommented = main.querySelector('.most_commented');
filmsCatalogMostCommentPrisenter.init(mostCommented, filmsCardModel);


