const movies = [
  {
    image: 'https://img.elo7.com.br/product/original/3FBA809/big-poster-filme-batman-2022-90x60-cm-lo002-poster-batman.jpg',
    title: 'Batman',
    rating: 9.2,
    year: 2022,
    description: "Após dois anos espreitando as ruas como Batman, Bruce Wayne se encontra nas profundezas mais sombrias de Gotham City. Com poucos aliados confiáveis, o vigilante solitário se estabelece como a personificação da vingança para a população.",
    isFavorited: true,
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/pt/thumb/9/9b/Avengers_Endgame.jpg/250px-Avengers_Endgame.jpg',
    title: 'Vingadores: Ultimato',
    rating: 9.2,
    year: 2019,
    description: "Após Thanos eliminar metade das criaturas vivas, os Vingadores têm de lidar com a perda de amigos e entes queridos. Com Tony Stark vagando perdido no espaço sem água e comida, Steve Rogers e Natasha Romanov lideram a resistência contra o titã louco.",
    isFavorited: false
  },
  {
    image: 'https://upload.wikimedia.org/wikipedia/en/1/17/Doctor_Strange_in_the_Multiverse_of_Madness_poster.jpg',
    title: 'Doutor Estranho no Multiverso da Loucura',
    rating: 9.2,
    year: 2022,
    description: "O aguardado filme trata da jornada do Doutor Estranho rumo ao desconhecido. Além de receber ajuda de novos aliados místicos e outros já conhecidos do público, o personagem atravessa as realidades alternativas incompreensíveis e perigosas do Multiverso para enfrentar um novo e misterioso adversário.",
    isFavorited: false
  },
]

function renderMovie(movies) {
  const filmeElemento = document.createElement('div');
  filmeElemento.innerHTML = `<div class="corujao__conteudo__filme">
  <div class="corujao__conteudo__filme__img"><img src="${movies.image}" alt="Filme"></div>
  <div class="corujao__conteudo__filme__info">
    <h2 class="corujao__conteudo__filme__name">${movies.title} <span class="filme__year">(${movies.year})</span></h2>
    <div>
      <span class="filme__rating"><img src="public/img/Star.svg" alt="Avaliação Filme"> ${movies.rating}</span>
      <span><img src="public/img/heart-empty.svg" alt="Favorito">Favoritar</span>
    </div>
  </div>
  <div class="corujao__conteudo__filme__descricao">
    <p class="filme__descricao">${movies.description}</p>
  </div>
</div>`;
  document.querySelector('.corujao__conteudo').appendChild(filmeElemento);
}

movies.forEach(movie => {
  renderMovie(movie)
})