<template>
  <div class="social">
    <div class="container">
      <div class="row">
        <div class="col">
          <ul class="social-list">
            <li><font-awesome-icon :icon="['fab', 'linkedin-in']" /></li>
            <li><font-awesome-icon :icon="['fab', 'facebook-f']" /></li>
            <li><font-awesome-icon :icon="['fab', 'x-twitter']" /></li>
            <li><font-awesome-icon :icon="['fab', 'discord']" /></li>
            <li><font-awesome-icon :icon="['fab', 'tiktok']" /></li>
            <li><font-awesome-icon :icon="['fab', 'twitch']" /></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <footer class="home-footer">
    <div class="container">
      <div class="row">
        <div class="col-12 col-sm-6 text-center text-sm-start">
          <p>Copyrights &copy; 2024</p>
        </div>
        <div class="col-12 col-sm-6 text-center text-sm-end">
          <p>Powered by <a href="https://oclock.io/" target="_blank" title="O'clock">O'clock</a></p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'HomeFooter'
  }
</script>