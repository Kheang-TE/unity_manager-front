<template>
  <nav class="home-navigation">
    <div class="container">
      <div class="row">
        <div class="col">
          <ul>
            <li><RouterLink to="/signup"><i class="fa"><font-awesome-icon :icon="['fas', 'right-to-bracket']" /></i>Sign Up</RouterLink></li>
            <li><RouterLink to="/signin"><i class="fa"><font-awesome-icon :icon="['fas', 'user']" /></i>Sign In</RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  export default {
    name: 'HomeNavigation'
  }
</script>