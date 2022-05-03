import AvatarIcon from './view/avatar.js';
import NewNavMenu from './view/nav-menu.js';
import NewSort from './view/sort.js';
import NewFilms from './view/film-list.js';
import dayjs from 'dayjs';
import NewButtonShowMore from './view/button-show-more.js';
import NewFilmsRated from './view/films-rated.js';
import NewFilmsMostComment from './view/films-most-commented.js';
import { render } from './render.js';
import NewFilmsCatalog from './prisenter/movice-prisenter.js';
import NewFilmsCatalogRated from './prisenter/rated-movice-precenter.js';
import NewFilmsCatalogMostComment from './prisenter/most-comment-movice-prisenter.js';
import NewMovicCardModel from './model/movic-card-model.js';
import NewFilmPopup from './prisenter/popup-prisenter.js';
import NewComment from './model/movic-coment-model.js';
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer')
const filmsCatalog = new NewFilmsCatalog();
const filmsCatalogRated = new NewFilmsCatalogRated();
const filmsCatalogMostComment = new NewFilmsCatalogMostComment();
const moviceCardModel = new NewMovicCardModel()
const filmPopup = new NewFilmPopup()
const filmComment = new NewComment()
render( new AvatarIcon (), header);
render( new NewNavMenu(), main);
render(new NewSort(), main);
render(new NewFilms(), main);
const filmsContainer = main.querySelector('.films-list__container');
filmsCatalog.init(filmsContainer, moviceCardModel);
const films = main.querySelector('.films');
render(new NewButtonShowMore, films);
render(new NewFilmsRated, films);
render(new NewFilmsMostComment, films);
const topRated = main.querySelector('.rated');
//filmsCatalogRated.init(topRated);
const mostCommented = main.querySelector('.most_commented');
//filmsCatalogMostComment.init(mostCommented);
filmPopup.init(footer, moviceCardModel, filmComment);

