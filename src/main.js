import AvatarIcon from './view/avatar.js';
import { render } from './framework/render.js';
import FilmList from './view/film-list.js';
import FilmsRated from './view/films-rated.js';
import FilmsMostComment from './view/films-most-commented.js';
import FilmsCatalogPresenter from './presenter/films-catalog-presenter.js';
import RatedFilmsPresenter from './presenter/rated-films-presenter.js';
import MostCommentFilmsPresenter from './presenter/most-comment-films-presenter.js';
import FilmCardModel from './model/film-card-model.js';
import FilmCommentModel from './model/film-comment-model.js';
import Api from './model/api-module.js';

const AUTHORIZATION = 'Basic fkjlosfdgjkl';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const body = document.querySelector('body');
const filmsCatalogRatedPresenter = new RatedFilmsPresenter();
const filmsCatalogMostCommentPresenter = new MostCommentFilmsPresenter();
const api = new Api(END_POINT, AUTHORIZATION);
const filmsCardModel = new FilmCardModel(api);
const filmsComment = new FilmCommentModel (api);
render( new AvatarIcon (), header);
render(new FilmList(), main);
const filmsContainer = main.querySelector('.films-list__container');
filmsCardModel.init();
const filmsCatalogPresenter = new FilmsCatalogPresenter(filmsContainer, filmsCardModel, body, filmsComment);
filmsCatalogPresenter.init();
const films = main.querySelector('.films');
render(new FilmsRated, films);
render(new FilmsMostComment, films);
const topRated = main.querySelector('.rated');
filmsCatalogRatedPresenter.init(topRated, filmsCardModel);
const mostCommented = main.querySelector('.most_commented');
filmsCatalogMostCommentPresenter.init(mostCommented, filmsCardModel);


