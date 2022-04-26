import { createElement } from "../render.js";

const avatar = () => '<section class="header__profile profile"><p class="profile__rating"> Piter Grifin</p><img class="profile__avatar" src="images/bitmap.png" alt="Avatar" width="35" height="35"></section>'
export default class AvatarIcon {
  createAvatarIcon (){
    return avatar ();
  }
  getElement () {
    if(!this.element){
      this.element = createElement(this.createAvatarIcon())
    }
    return this.element;
  }
  removeElement () {
    this.element = null;
  }
}
