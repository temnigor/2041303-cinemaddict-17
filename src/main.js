import AvatarRankPresenter from './presenter/avatar-rank-presenter.js';
import { render } from './framework/render.js';
import FilmList from './view/film-list.js';
import FilmsCatalogPresenter from './presenter/films-catalog-presenter.js';
import FilmCardModel from './model/film-card-model.js';
import FilmCommentModel from './model/film-comment-model.js';
import Api from './model/api-module.js';

const AUTHORIZATION = 'Basic fkjlosfdgjkl';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';
const header = document.querySelector('.header');
const avatarRankPresenter = new AvatarRankPresenter(header);
const main = document.querySelector('.main');
const body = document.querySelector('body');
const api = new Api(END_POINT, AUTHORIZATION);
const filmsCardModel = new FilmCardModel(api);
const filmsComment = new FilmCommentModel (api);
filmsCardModel.init();
render(new FilmList(), main);
const filmsContainer = main.querySelector('.films-list__container');
const filmsCatalogPresenter = new FilmsCatalogPresenter(filmsContainer, filmsCardModel, body, filmsComment, avatarRankPresenter);
filmsCatalogPresenter.init();


