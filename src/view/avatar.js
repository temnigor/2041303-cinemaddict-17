import { createElement } from '../render.js';

const getDomAvatar = () => '<section class="header__profile profile"><p class="profile__rating"> Piter Grifin</p><img class="profile__avatar" src="images/bitmap.png" alt="Avatar" width="35" height="35"></section>';
export default class AvatarIcon {
  #element = null;
  get domElement() {
    return getDomAvatar ();
  }

  get element () {
    if(!this.#element){
      this.#element = createElement(this.domElement);
    }
    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
