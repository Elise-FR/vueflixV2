<template>
  <div id="movie">
    <h2>{{ movie.title }}</h2>
    <img :src="movie.picture" alt="affiche" class="imgaffiche" />

    <v-rating
      readonly
      v-model="movie.rating"
      hover
      length="10"
      size="64"
      background-color="orange lighten-3"
      color="orange"
    ></v-rating>
    <h3>Categories:</h3>
    <ul class="listeul">
      <li
        class="liste"
        v-for="(genre, index) in movie.genres"
        :key="index"
        :value="genre"
      >
        {{ genre }}
      </li>
      <h3 v-show="displayAllDetails">Description:</h3>
      <li class="liste" v-show="displayAllDetails">
        {{ movie.description }}
      </li>
      <h3 v-show="displayAllDetails">Review :</h3>
      <li class="liste" v-show="displayAllDetails">{{ movie.review }}</li>
      <router-link
        :to="{
          name: 'Movie',
          params: {
            id: movie.id,
            movie: movie,
            displayAllDetails: true,
          },
        }"
      >
        <button class="bdisplay">Détails</button>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Movie",

  props: {
    movie: Object,
    displayAllDetails: Boolean,
  },

  data: function () {
    return {};
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Stick+No+Bills:wght@800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Stick+No+Bills:wght@800&display=swap");

$back-color: #000000;
$back-button: #dc143c;
$text-color: #6642f5;
$darker-color: darken($text-color, 30%);

.listeul {
  padding: 0;
}
.liste {
  list-style: none;
}
.bdisplay {
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