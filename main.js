import {apiKey} from './dev/chaveUrl.js'

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

async function renderMovie(movie) {
  const filmeElemento = document.createElement('div');
  filmeElemento.innerHTML = `<div class="corujao__conteudo__filme">
  <div class="corujao__conteudo__filme__img"><img src="https://image.tmdb.org/t/p/w780${movie.poster_path}" alt="Filme"></div>
  <div class="corujao__conteudo__filme__info">
    <h2 class="corujao__conteudo__filme__name">${movie.original_title} <span class="filme__year">(${movie.release_date.substr(0,4)})</span></h2>
    <div>
      <span class="filme__rating"><img src="public/img/Star.svg" alt="Avaliação Filme"> ${movie.vote_average.toFixed(1)}</span>
      <span><img src="public/img/heart-empty.svg" alt="Favorito">Favoritar</span>
    </div>
  </div>
  <div class="corujao__conteudo__filme__descricao">
    <p class="filme__descricao">${movie.overview}</p>
  </div>
  </div>`;
  document.querySelector('.corujao__conteudo').appendChild(filmeElemento);
}

window.onload = async function() {
  const movies = await getPopularMovies()
  movies.forEach(movie => renderMovie(movie))
}