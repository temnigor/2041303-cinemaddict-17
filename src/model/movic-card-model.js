import { getSomeFilm } from "./fish-movic-card.js";
export default class NewMovicCardModel {
movice = Array.from({length:5}, getSomeFilm)
getMovice = () => this.movice;
}
