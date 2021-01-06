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
    windowStatus: false,
    movieSelect: "",
    moviesGenres: [],
    moviesCast:[]
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
    //funzioni per far apparire al click una finestra con informazioni aggiountive
    details: function(index) {
      this.windowStatus = true;
      if (this.pagesearch === '0') {
        this.movieSelect = this.moviesHome1[index]
      } else if (this.pagesearch === '1') {
        this.movieSelect = this.movies[index]
      }
    },

    details2: function(index) {
      this.windowStatus = true;
      if (this.pagesearch === '0') {
        this.movieSelect = this.moviesHome2[index];
      } else if (this.pagesearch === '1') {
        this.movieSelect = this.series[index]
      }
    },
    //funzione per estrarre i generi dei film
    movieGen: function (idFilm) {
      this.moviesGenres = []
      axios.get('https://api.themoviedb.org/3/movie/' + idFilm + '?api_key=7cef99d6f2b7da5c519fa01d79fc87e1&language=it-IT')
      .then(response => {
        let gen = response.data.genres
        for (var i = 0; i < gen.length; i++) {
          this.moviesGenres.push(gen[i].name);
        }
      })
    },
    //funzione per estrarre i generi delle serie tv
    serieGen: function (idTv) {
      this.moviesGenres = []
      axios.get('https://api.themoviedb.org/3/tv/' + idTv + '?api_key=7cef99d6f2b7da5c519fa01d79fc87e1&language=it-IT')
      .then(response => {
        let gen = response.data.genres
        for (var i = 0; i < gen.length; i++) {
          this.moviesGenres.push(gen[i].name);

        }
      })
    },
    //funzione per richiamare 5 attori del cast (film)
    movieCast: function (idFilm) {
      this.moviesCast = []
      axios.get('https://api.themoviedb.org/3/movie/' + idFilm + '/credits?api_key=7cef99d6f2b7da5c519fa01d79fc87e1&language=it-IT')
      .then(response => {
        let actor = response.data.cast
        for (var i = 0; i < 5; i++) {
          this.moviesCast.push(actor[i].name);
        }
      })
    },
    //funzione per richiamare 5 attori del cast (serie tv)
    serieCast: function (idTv) {
      this.moviesCast = []
      axios.get('https://api.themoviedb.org/3/tv/' + idTv + '/credits?api_key=7cef99d6f2b7da5c519fa01d79fc87e1&language=it-IT')
      .then(response => {
        let actor = response.data.cast
        for (var i = 0; i < 5; i++) {
          this.moviesCast.push(actor[i].name);
        }
      })
    }

  }
});
