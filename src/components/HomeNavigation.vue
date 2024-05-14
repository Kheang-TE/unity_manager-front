<template>
  <nav class="home-navigation">
    <div class="container">
      <div class="row">
        <div class="col">
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/signup">Sign Up</RouterLink></li>
            <li><RouterLink to="/signin">Sign In</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
    
  </nav>
</template>

<script>
  export default {
    name: 'HomeNavigation'
  }
</script>