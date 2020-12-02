var app = new Vue({
  el: '#app',
  data: {
    searchInput: '',
    movies: [],
    series: []
  },
  methods: {
    search:function() {
      this.getMovies();
      this.getSeries();
    },
    getMovies: function() {
        axios.get("https://api.themoviedb.org/3/search/movie?api_key=7cef99d6f2b7da5c519fa01d79fc87e1&query=" + this.searchInput)
          .then(result => this.movies = result.data.results )
    },
    getSeries: function() {
        axios.get("https://api.themoviedb.org/3/search/tv?api_key=7cef99d6f2b7da5c519fa01d79fc87e1&query=" + this.searchInput)
          .then(result => this.series = result.data.results )
    },
    starRating: function(numRating) {
      return Math.ceil(numRating / 2);
    }
  }
});
