<template>
  <div id="app">
    <div class="menu">
      <v-app-bar class="navbar" dense dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>
          <router-link
            :to="{
              name: 'Home',
              params: { listefilms: listefilms },
            }"
            >Home</router-link
          >
          <router-link :to="{ name: 'Admin' }">Admin</router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu left bottom> </v-menu>
      </v-app-bar>
    </div>
    <v-app>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",

  data: function () {
    return {
      listefilms: [
        {
          id: 1,
          title: "Titanic",
          genres: ["comedy", "drama", "thriller"],
          rating: 9,
          review: "The most beautiful romantic movie",
          description: "top",
          picture:
            "https://m.media-amazon.com/images/I/71kfzNYWKxL._AC_SY606_.jpg",
        },
        {
          id: 2,
          title: "Thelma et Louise",
          genres: ["drama", "thriller"],
          rating: 8,
          review: "American thriller",
          description: "cool",
          picture:
            "https://www.telerama.fr/sites/tr_master/files/41a10de0-0349-42ac-8c9c-82abd214bc4d_2.jpg",
        },
        {
          id: 3,
          title: "Retour vers le futur",
          genres: ["comedy", "drama", "thriller"],
          rating: 10,
          review: "Best movie",
          description: "nice",
          picture:
            "https://images.affiches-et-posters.com//albums/3/2614/2614-affiche-film-retour-vers-le-futur-2.jpg",
        },
      ],
    };
  },

  computed: {
    allgenres: function () {
      let newGenres = [];
      this.listeMovies.forEach((movie) => {
        movie.genres.forEach((genre) => {
          if (!newGenres.includes(genre)) {
            newGenres.push(genre);
          }
        });
      });
      return newGenres;
    },
  },

  // watch: {
  //   listefilms: function (newValue, oldValue) {
  //     console.log("new", newValue, "old", oldValue);
  //     // if(newValue.length > oldValue.length)
  //   },
  // },

  methods: {
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
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Stick+No+Bills:wght@800&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100&family=Stick+No+Bills:wght@800&display=swap");

$back-color: #000000;
$back-button: #dc143c;
$text-color: #6642f5;
$darker-color: darken($text-color, 20%);

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}

h1 {
  color: $darker-color;
  font-family: "Stick No Bills", sans-serif;
  font-size: 80px;
}
.affiche {
  color: white;
  font-family: "Stick No Bills", sans-serif;
  font-size: 40px;
}

body {
  background-color: $back-color;
}

.imgaffiche {
  width: 300px;
  height: 450px;
  border-radius: 5%;
}

#app select {
  color: 1px border solid white;
  background-color: white;
}

.menu .navbar a {
  color: white;
  padding: 5px;
}
</style>
