
import AbstractView from '../framework/view/abstract-view.js';
const getDomAvatar = () =>
  `<section class="header__profile profile">
<p class="profile__rating"> Piter Grifin</p>
<img class="profile__avatar" src="images/bitmap.png" alt="Avatar" width="35" height="35">
</section>`;
export default class AvatarIcon extends AbstractView {
  get template() {
    return getDomAvatar ();
  }
}
