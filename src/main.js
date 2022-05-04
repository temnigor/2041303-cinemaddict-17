import AvatarIcon from './view/avatar.js';
import NewNavMenu from './view/nav-menu.js';
import NewSort from './view/sort.js';
import NewFilms from './view/film-list.js';
import NewFilmsRated from './view/films-rated.js';
import NewFilmsMostComment from './view/films-most-commented.js';
import { render } from './render.js';
import NewFilmsCatalog from './prisenter/films-prisenter.js';
import NewFilmsCatalogRated from './prisenter/rated-films-precenter.js';
import NewFilmsCatalogMostComment from './prisenter/most-comment-films-prisenter.js';
import NewFilmCardModel from './model/film-card-model.js';
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const body = document.querySelector('body');
const filmsCatalogPrisenter = new NewFilmsCatalog();
const filmsCatalogRatedPrisenter = new NewFilmsCatalogRated();
const filmsCatalogMostCommentPrisenter = new NewFilmsCatalogMostComment();
const filmsCardModel = new NewFilmCardModel();
render( new AvatarIcon (), header);
render( new NewNavMenu(), main);
render(new NewSort(), main);
render(new NewFilms(), main);
const filmsContainer = main.querySelector('.films-list__container');
filmsCatalogPrisenter.init(filmsContainer, filmsCardModel, body);
const films = main.querySelector('.films');
render(new NewFilmsRated, films);
render(new NewFilmsMostComment, films);
const topRated = main.querySelector('.rated');
filmsCatalogRatedPrisenter.init(topRated, filmsCardModel);
const mostCommented = main.querySelector('.most_commented');
filmsCatalogMostCommentPrisenter.init(mostCommented, filmsCardModel);


