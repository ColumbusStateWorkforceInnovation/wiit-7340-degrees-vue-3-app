<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/menu">Menu</router-link> |
        <router-link to="/categories">Menu Categories</router-link> |
        <router-link to="/items">Menu Items</router-link> |
        <router-link to="/about">About</router-link>
    </div>

</template>

<script>
export default {
  name: 'NavBar',
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
