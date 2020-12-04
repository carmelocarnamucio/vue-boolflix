const urlmovie= 'https://api.themoviedb.org/3/search/movie'
const urltv= 'https://api.themoviedb.org/3/search/tv'

var app = new Vue({
  el: '#app',
  data: {
    searchInput: '',
    movies: [],
    series: [],
    moviesHome1: [],
    moviesHome2: [],
    pagesearch: '0',
    query: '',
  },

  mounted: function() {
    this.home1();
    this.home2();
  },

  methods: {
    search:function() {
      this.getMovies();
      this.getSeries();
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
    starRating: function(numRating) {
      return Math.ceil(numRating / 2);
    },
    setPosterPath: function(path) {
      return `https://image.tmdb.org/t/p/w342/${path}`;
    },
    home1: function() {
      axios.get(urlmovie, {
              params: {
                api_key: '7cef99d6f2b7da5c519fa01d79fc87e1',
                query: 'harry potter',
                language: 'it-IT',
              }
    })
        .then(result => this.moviesHome1 = result.data.results )

    },
    home2: function() {
      axios.get(urlmovie, {
              params: {
                api_key: '7cef99d6f2b7da5c519fa01d79fc87e1',
                query: 'il signore degli anelli',
                language: 'it-IT',
              }
    })
        .then(result => this.moviesHome2 = result.data.results )

    },
  }
});
