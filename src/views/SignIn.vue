<template>
  <div class="signin">
    <header class="container">
      <div class="row">
        <div class="col">
          <div class="logo-container">
            <img src="/img/unity_manager_logo.webp" alt="Unity Manager" title="Unity Manager" class="logo">
          </div>
          <h1>Connect</h1>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-">
          <div class="form-container">
            <div class="form-header">
              Log in to access your projects 
            </div>
            <div class="form-body">
              <form action="" method="POST">
                <input type="email" class="form-control" name="email"  placeholder="Email">
                <input type="password" class="form-control" name="password" placeholder="Password">
                <a href="/signup" class="float-start"><i class="fa"><font-awesome-icon :icon="['fas', 'arrow-left']" /></i>Create account</a>
                <button type="submit" class="btn float-end">Connect</button>
              </form>
            </div>
            <div class="form-footer">
              <a href="/"><i class="fa"><font-awesome-icon :icon="['fas', 'house']" /></i>Back to homepage</a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="container">
        <div class="row">
          <div class="col">
            <p>Copyrights &copy; 2024</p>
          </div>
          <div class="col text-end">
            <p>Powered by <a href="https://oclock.io/" target="_blank" title="O'clock">O'clock</a></p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
  export default{
    name: 'SignUp'
  }
</script>