<template>
  <div class="home">
    <h1>Welcome to my cinema</h1>

    <img alt="cinema" src="../assets/cinema.jpg" /> <br />

    <select name="categories" id="categories" v-model="selectCategory">
      <option value="">Choisir la categorie</option>

      <option v-for="genre in searchGenres" :key="genre.id" :value="genre.id">
        {{ genre.name }}
      </option>
    </select>
    <br />

    <h2 class="affiche">A l'affiche : {{ moviesfilter.length }}</h2>
    <h2>Nombres de films : {{ moviesfilter.length }}</h2>
    <Movie
      v-for="movie in moviesfilter"
      :key="movie.id"
      :movie="movie"
      :displayAll="false"
    >
    </Movie>
  </div>
</template>
<script>
import Movie from "./Movie.vue";
import EventBus from "../event-bus";
import axios from "axios";
export default {
  name: "Home",
  components: {
    Movie,
  },

  props: {
    listefilms: Array,
  },

  data: function () {
    return {
      selectCategory: "",
      searchGenres: [],
    };
  },

  methods: {
    addNewMovie: function (movie) {
      console.log("newmovie avant push : " + movie.title);

      this.listefilms.push(movie);
    },

    getGenres() {
      axios
        .get(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=80d0dd074cbffeb2db4b0123882c7f44&language=en-US"
        )

        .then((response) => {
          this.searchGenres = response.data.genres;
        })

        .catch((error) => {
          this.error = error;
        });
    },
  },
  computed: {
    moviesfilter: function () {
      if (this.selectCategory === "") {
        return this.listefilms;
      }
      return this.listefilms.filter((movie) =>
        movie.genres.includes(this.selectCategory)
      );
    },
  },
  created() {
    this.getGenres();
  },

  mounted() {
    EventBus.$on("add-new-movie", (payLoad) => {
      console.log("payload", payLoad);
      this.addNewMovie(payLoad);
    });

    // this.getGenres();
  },
};
</script>
<style lang="scss">
</style>