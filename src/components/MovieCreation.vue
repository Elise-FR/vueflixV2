<template>
  <div id="moviecreation">
    <router-link :to="{ name: 'Home', params: { listefilms: listefilms } }">
      <button class="back">Back</button>
    </router-link>
    <br />
    <h2 class="affiche">Ajouter un film</h2>

    <input id="id" type="number" placeholder="ID Movie" v-model="forms.id" />
    <br />

    <input
      id="title"
      type="text"
      placeholder="Title"
      v-model="forms.title"
      required
    />
    <br />

    <input
      id="overview"
      type="text"
      placeholder="Overview"
      v-model="forms.overview"
    />
    <br />

    <input
      id="description"
      type="text"
      placeholder="Description"
      v-model="forms.description"
    /><br />

    <input
      id="picture"
      type="text"
      placeholder="Picture"
      v-model="forms.poster_path"
    /><br />

    <label for="genres"> Genres :</label>

    <div class="" v-for="(genre, index) in searchGenres" :key="index">
      <input
        type="checkbox"
        id="genres"
        :value="genre.id"
        :label="genre.name"
        v-model="forms.genre_ids"
      />

      {{ genre.name }}
    </div>

    <v-rating
      v-model="forms.vote_average"
      hover
      length="10"
      size="20"
      background-color="orange lighten-3"
      color="orange"
    ></v-rating>

    <button class="buttonAddMovie" @click="emitAddMovie">
      Ajouter un Film
    </button>

    <v-textarea
      label="searchMovies"
      auto-grow
      outLined
      row="1"
      row-height="5"
      @keyup="getResult"
      v-model="searchmyMovie"
    ></v-textarea>

    <v-list-item v-for="movie in searchMovies" :key="movie.id">
      {{ movie.title }}
      <button class="buttonAddMovie" @click="storeNewMovie(movie)">
        Ajouter
      </button>
    </v-list-item>
  </div>
</template>
<script>
import EventBus from "@/event-bus";
import axios from "axios";
export default {
  name: "MovieCreation",

  props: {
    listefilms: Array,
  },

  data: function () {
    return {
      forms: {
        id: 0,
        title: "",
        genre_ids: [],
        vote_average: 0,
        overview: "",
        description: "",
        poster_path: "",
      },

      searchMovies: [],
      searchGenres: [],
      searchmyMovie: "",
      movieAdded: false,
    };
  },

  methods: {
    emitAddMovie() {
      let newMovie = {
        id: this.forms.id,
        title: this.forms.title,
        genres: this.forms.genre_ids,
        rating: this.forms.vote_average,
        review: this.forms.overview,
        description: this.forms.description,
        picture: this.forms.poster_path,
      };
      console.log("data film avant emit : " + newMovie.title);
      EventBus.$emit("add-new-movie", newMovie); // EventBus nous permet d'émettre un événement dans un composant et d'écouter cet événement dans un autre.
    },

    getResult() {
      if (this.searchmyMovie !== "") {
        axios

          .get(
            "https://api.themoviedb.org/3/search/movie?api_key=80d0dd074cbffeb2db4b0123882c7f44&query=" +
              this.searchmyMovie +
              "&page=1"
          )
          .then((response) => {
            this.searchMovies = response.data.results;
          })

          .catch((error) => {
            this.error = error;
          });
      }
    },

    storeNewMovie(movie) {
      this.movieAdded = true;
      this.forms = movie;
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
    alertinfo: function (message) {
      this.$toastr.e(message);
    },
  },

  watch: {
    movieAdded: function (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.alertinfo("Votre formulaire est bien rempli!");
      }
    },
  },

  // created() {
  //   console.log("je suis créé!");
  // },
  mounted() {
    console.log("je suis affiché!");
    this.getGenres();
  },

  destroyed() {
    console.log("je suis détruis");
  },
};
</script>
<style lang="scss">
$back-color: #000000;
$back-button: #dc143c;
$darker-color: darken($back-color, 80%);
@import url("https://fonts.googleapis.com/css2?family=Stick+No+Bills:wght@800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Stick+No+Bills:wght@800&display=swap");

input[placeholder] {
  border: 1px solid black;
  color: black;
  background-color: white;
}

.buttonAddMovie {
  background-color: $back-color;
  color: white;
  font-family: "Stick No Bills", sans-serif;
  border: 2px solid red;
  border-radius: 12px;
  font-size: 20px;
  &:hover {
    background-color: $back-button;
  }
}
.back {
  background-color: $back-color;
  color: white;
  font-family: "Stick No Bills", sans-serif;
  border: 2px solid red;
  border-radius: 12px;
  font-size: 20px;
  &:hover {
    background-color: $back-button;
  }
}
</style>
