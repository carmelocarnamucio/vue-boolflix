var app = new Vue({
  el: '#app',
  data: {
    searchInput: '',
    movies: [],
    series: [],
    moviesHome1: [],
    moviesHome2: [],
    pagesearch: '0',
    queryHome1: 'Harry Potter',
    queryHome2:'Il Signore Degli Anelli',
    query: '',
    overlayStatus: false,
    overlay: {
      poster_path: '',
      overview: '',
      original_language: '',
      vote_average: 0,
      genre: [],
    },
  },

  mounted: function() {
    this.home1();
    this.home2();
  },

  methods: {
    //funzione per la ricerca dei film e serie tv
    search:function() {
      this.getMovies();
      this.getSeries();
      this.query = this.searchInput;
      this.searchInput = '';
    },

    getMovies: function() {
      axios.get('https://api.themoviedb.org/3/search/movie', {
              params: {
                api_key: '7cef99d6f2b7da5c519fa01d79fc87e1',
                query: this.searchInput,
                language: 'it-IT',
              }
    })
      .then(result => this.movies = result.data.results )
      this.pagesearch = '1'
    },

    getSeries: function() {
      axios.get('https://api.themoviedb.org/3/search/tv', {
              params: {
                api_key: '7cef99d6f2b7da5c519fa01d79fc87e1',
                query: this.searchInput,
                language: 'it-IT',
              }
    })
      .then(result => this.series = result.data.results )
    },
    //funzione per convertire votazione in 5 stelle
    starRating: function(numRating) {
      return Math.ceil(numRating / 2);
    },
    //funzione per le copertine dei film e serie tv
    setPosterPath: function(path) {
      return `https://image.tmdb.org/t/p/w342/${path}`;
    },
    //funzione per la sezione "harry potter" nella home
    home1: function() {
      axios.get('https://api.themoviedb.org/3/search/movie', {
              params: {
                api_key: '7cef99d6f2b7da5c519fa01d79fc87e1',
                query: 'harry potter',
                language: 'it-IT',
              }
    })
      .then(result => this.moviesHome1 = result.data.results )
    },
    //funzione per la sezione "Il Signore Degli Anelli" nella home
    home2: function() {
      axios.get('https://api.themoviedb.org/3/search/movie', {
              params: {
                api_key: '7cef99d6f2b7da5c519fa01d79fc87e1',
                query: 'il signore degli anelli',
                language: 'it-IT',
              }
    })
      .then(result => this.moviesHome2 = result.data.results )
    },
    //funzione per far apparire una finestra al click del film e serie tv
    showOverlay: function(film) {
      this.overlayStatus = true;
    },

  }
});
