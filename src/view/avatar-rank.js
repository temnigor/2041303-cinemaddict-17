
import AbstractView from '../framework/view/abstract-view.js';
const getDomAvatar = (avatarRank) =>
  `<section class="header__profile profile">
<p class="profile__rating">${avatarRank}</p>
<img class="profile__avatar" src="images/bitmap.png" alt="Avatar" width="35" height="35">
</section>`;

export default class AvatarRank extends AbstractView {
  #avatarRank;
  constructor(avatarRank) {
    super();
    this.#avatarRank = avatarRank;
  }

  get template() {
    return getDomAvatar (this.#avatarRank);
  }
}
