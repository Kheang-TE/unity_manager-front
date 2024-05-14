<template>
  <HomeHeader />
  <main>
    <section class="unity-manager">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h1><img src="/img/unity_manager_logo.webp" alt="Unity Manager" title="Unity Manager" class="logo"></h1>
            <h2>The Most Impressive Way To Manage Your Projects</h2>
            <div class="sign">
              <a href="/signup" title="Sign Up" class="btn-link"><i class="fa"><font-awesome-icon :icon="['fas', 'right-to-bracket']" /></i>Sign Up</a>
              <a href="/signin" title="Sign In" class="btn-link"><i class="fa"><font-awesome-icon :icon="['fas', 'user']" /></i>Sign In</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="parallax"></section>

    <section class="introduce">
      <div class="container">
        <div class="row introduce-content">
          <div class="col-6 introduce-text">
          <p>
            Unity Manager is an application that focuses on centralizing project management and optimizing workflow. Thanks to a simple and ergonomic interface, the development team wishes to improve the efficiency and flexibility of the organization of production processes. An interactive chat is integrated into the application system, which will facilitate and optimize communication between all employees.
          </p>
          <p>
            In addition, Unity Manager wants to be a simple, clean, effective application that brings together the necessary tools for better project management for all its consumers and their employees.
          </p>
        </div>
        <div class="col-6 introduce-img">
        </div>
        </div>
      </div>
    </section>
  </main>
  <HomeFooter />
</template>

<script>
  import HomeHeader from '@/components/HomeHeader.vue'
  import HomeFooter from '@/components/HomeFooter.vue'
  export default{
    name: 'Home',
    components: {
      HomeHeader,
      HomeFooter
    }
  }
</script>