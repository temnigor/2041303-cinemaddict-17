function randomFromUserDetails(min, max) {
  const mainNum = Math.floor(Math.random() * (max - min + 1) + min);
  const result = !(mainNum <5);
  return result;
}
const getSomeFilm = ()=> ({
  'id': '0',
  'comments': [
    42, 34
  ],
  'filmInfo': {
    'title': 'A Little Pony Without The Carpet',
    'alternativeTitle': 'Laziness Who Sold Themselves',
    'totalRating': 5.3,
    'poster': 'images/posters/the-dance-of-life.jpg',
    'ageRating': 0,
    'director': 'Tom Ford',
    'writers': [
      'Takeshi Kitano',
      'Takeshi Kitano'
    ],
    'actors': [
      'Morgan Freeman',
      'Morgan Freeman',
      'Morgan Freeman'
    ],
    'release': {
      'date': '2019-05-11T00:00:00.000Z',
      'releaseCountry': 'Finland'
    },
    'runtime': 77,
    'genre': ['Comedy','Horor','Horor'],
    'description': 'Oscar-winning film, a war drama about two young people, from the creators of timeless classic "Nu, Pogodi!" and "Alice in Wonderland", with the best fight scenes since Bruce Lee.'
  },
  'userDetails': {
    'watchlist': randomFromUserDetails(1,10),
    'already_watched': randomFromUserDetails(1,10),
    'watching_date': '2019-04-12T16:12:32.554Z',
    'favorite': randomFromUserDetails(1,10)
  }
});
export {getSomeFilm};
