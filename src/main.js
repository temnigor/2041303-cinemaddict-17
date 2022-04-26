import AvatarIcon from "./view/avatar.js";
import NewNavMenu from "./view/nav-menu.js";
import NewSort from "./view/sort.js";
import NewFilms from "./view/film-list.js";
import NewFilmCard from "./view/film-card.js";
import { render } from "./render.js";
const MOVIE_CARD = 5;

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

