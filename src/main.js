import AvatarIcon from './view/avatar.js';
import NewNavMenu from './view/nav-menu.js';
import NewSort from './view/sort.js';
import NewFilms from './view/film-list.js';
import NewFilmCard from './view/film-card.js';
import { render } from './render.js';
import NewButtonShowMore from './view/button-show-more.js';
import NewFilmsRated from './view/films-rated.js';
import NewFilmsMostComment from './view/films-most-commented.js';
const MOVIE_CARD = 6;
const EXTRA_MOVIE_CARD = 3;

const header = document.querySelector('.header');
const main = document.querySelector('.main');
render( new AvatarIcon (), header);
render( new NewNavMenu(), main);
render(new NewSort(), main);
render(new NewFilms(), main);
const filmsContainer = main.querySelector('.films-list__container');
for(let i = 1; i<MOVIE_CARD; i++){
  render(new NewFilmCard(), filmsContainer);
}
const films = main.querySelector('.films');
render(new NewButtonShowMore, films);
render(new NewFilmsRated(), films);
render(new NewFilmsMostComment, films);
const topRated = main.querySelector('.rated');
for(let i = 1; i<EXTRA_MOVIE_CARD; i++){
  render(new NewFilmCard(), topRated);
}
const mostCommented = main.querySelector('.most_commented');
for(let i = 1; i<EXTRA_MOVIE_CARD; i++){
  render(new NewFilmCard(), mostCommented);
}

