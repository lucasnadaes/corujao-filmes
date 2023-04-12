'use strict'
import {apiKey} from './chaveUrl.js'

const input = document.querySelector('input');
const buttonBusca = document.querySelector('.search__button');
const conteudoFilme = document.querySelector('.corujao__conteudo');
const tituloInicial = document.querySelector('.corujao__inicial__titulo')

tituloInicial.addEventListener('click', getPopularMovies)

buttonBusca.addEventListener('click', searchMovie);

input.addEventListener('keyup', function(event) {
  console.log(event.key)
  if (event.key === 'enter') {
    searchMovie()
    return
  }
})

async function searchMovie(event) {
  const inputValue = input.value
  event.preventDefault()
  if (inputValue != '') {
    cleanAllMovies()
    const movies = await searchMovieByName(inputValue)
    movies.forEach(movie => renderMovie(movie))
  }
}

function cleanAllMovies() {
  conteudoFilme.innerHTML = '';
}

async function getPopularMovies() {
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  const fetchApi = await fetch(url);
  if (fetchApi.status === 200) {
    const {results} = await fetchApi.json();
    return results
  } else {
    const filmeElemento = document.createElement('div');
  filmeElemento.innerHTML = `<div class="corujao__conteudo__filme">
  <div class="corujao__conteudo__filme__img">Error ${fetchApi.status} !</div>
  <div class="corujao__conteudo__filme__info">
    <h2 class="corujao__conteudo__filme__name">Error ${fetchApi.status}! Ocorreu um erro de comunicação com o servidor. Por favor tente novamente! </h2>
  </div>
  </div>`;
  document.querySelector('.corujao__conteudo').appendChild(filmeElemento);
  }
}

async function searchMovieByName(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&language=en-US&page=1`;
  const fetchMovie = await fetch(url);
  if (fetchMovie.status === 200) {
    const {results} = await fetchMovie.json();
    return results
  }
}

function favorited(event, movie) {
  const favoriteState = {
    favorited: 'public/img/heart-full.svg',
    notFavorited: 'public/img/heart-empty.svg'
  }

  if(event.target.src.includes(favoriteState.notFavorited)) {
    // aqui ele será favoritado
    event.target.src = favoriteState.favorited
    saveToLocalStorage(movie)
  } else {
    // aqui ele será desfavoritado
    event.target.src = favoriteState.notFavorited
    removeFromLocalStorage(movie.id)
  }
}

function getFavoriteMovies() {
  return JSON.parse(localStorage.getItem('favoriteMovies'));
}

function saveToLocalStorage(movie) {
  const movies = getFavoriteMovies() || []
  movies.push(movie)
  const moviesJSON = JSON.stringify(movies)
  localStorage.setItem('favoriteMovies', moviesJSON)
}

function checkMovieIsFavorited(id) {
  const movies = getFavoriteMovies() || []
  return movies.find(movie => movie.id == id);
}

function removeFromLocalStorage(id) {
  const movies = getFavoriteMovies() || []
  const findMovie = movies.find(movie => movie.id == id)
  const newMovies = movies.filter(movie => movie.id != findMovie.id)
  localStorage.setItem('favoriteMovies', JSON.stringify(newMovies))
}

async function getAllPopularMovies() {
  const movies = await getPopularMovies();
  movies.forEach((movie) => renderMovie(movie));
}

window.onload = function() {
  getAllPopularMovies()
}

function renderMovie(movie) {
  const {id, title, poster_path, vote_average, release_date, overview} = movie
  const isFavorited = checkMovieIsFavorited(id)

  const filmeElemento = document.createElement('div');

  filmeElemento.innerHTML = `<div class="corujao__conteudo__filme" id="${id}">
  <div class="corujao__conteudo__filme__img"><img src="https://image.tmdb.org/t/p/w500${poster_path}" alt="${title}"></div>
  <div class="corujao__conteudo__filme__info">
    <h2 class="corujao__conteudo__filme__name">${title} <span class="filme__year">(${release_date.substr(0,4)})</span></h2>
    <div class="corujao__conteudo__filme__info__favorito">
      <span class="filme__rating"><img src="public/img/Star.svg" alt="Avaliação Filme"> ${vote_average.toFixed(1)}</span>
      <span class="filme__favorito"><img src="public/img/heart-empty.svg" alt="Favoritar">Favoritar</span>
    </div>
  </div>
  <div class="corujao__conteudo__filme__descricao">
    <p class="filme__descricao">${overview}</p>
  </div>
  </div>`;
  document.querySelector('.corujao__conteudo').appendChild(filmeElemento);

  const filmeFavorito = document.querySelector('.filme__favorito img')
  filmeFavorito.src = isFavorited ? 'public/img/heart-full.svg' : 'public/img/heart-empty.svg';
  filmeFavorito.addEventListener('click', (event) => favorited(event, movie))
}
