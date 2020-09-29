<template>
  <main>
    <router-view/>
  </main>

  <footer>
    <span>© 2020 - Made with love by </span>
    <a href="https://www.linkedin.com/in/jackcres" target="_blank" rel="noopener noreferrer">Omar Crespo</a>
  </footer>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 1rem;
  padding: 1rem 0;
  height: calc(100% - 2rem);

  * {
    font-family: 'Comic Neue', Avenir, cursive !important;
  }
}

html, body {
  margin: 0;
  height: 100%;
}

footer {
  a {
    color: #777;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
