<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |&nbsp;
        <router-link to="/menu">Menu</router-link> |&nbsp;
        <span v-if='authState && authState.isAuthenticated'><router-link to="/categories">Menu Categories</router-link> |&nbsp;</span>
        <span v-if='authState && authState.isAuthenticated'><router-link to="/items">Menu Items</router-link> |&nbsp;</span>
        <router-link to="/about">About</router-link> |&nbsp;
        <span v-if='authState && authState.isAuthenticated' v-on:click='logout'><strong>Logout</strong></span>
        <span v-else v-on:click='login'><strong>Login</strong></span>
    </div>

</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    async login() {
      await this.$auth.signInWithRedirect();
    },
    async logout() {
      await this.$auth.signOut();
    },
  },
};
</script>

<style scoped>

    #nav {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding: 30px;
    }

    #nav a {
        font-weight: bold;
        color: #2c3e50;
    }

    #nav a.router-link-exact-active {
        color: #42b983;
    }

</style>
