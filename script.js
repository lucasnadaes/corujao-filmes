import {urlApi} from './chaveUrl.js'

async function getPopularMovies(){
  const url = urlApi;
  const fetchApi = await fetch(url);
  const movieData = await fetchApi.json();

  async function renderMovie(movie) {
    const filmeElemento = document.createElement('div');
    filmeElemento.innerHTML = `<div class="corujao__conteudo__filme">
    <div class="corujao__conteudo__filme__img"><img src="https://image.tmdb.org/t/p/original${movie.poster_path}" alt="Filme"></div>
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

  movieData.results.forEach(movie => {
    renderMovie(movie)
  });
}
getPopularMovies()
