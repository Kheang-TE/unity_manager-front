<template>
  <div class="signup">
    <header class="container">
      <div class="row">
        <div class="col">
          <div class="logo-container">
            <img src="/img/unity_manager_logo.webp" alt="Unity Manager" title="Unity Manager" class="logo">
          </div>
          <h1>Create account</h1>
          <p>We will be happy to count you among us!</p>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="row justify-content-center">
        <div class="col-lg-7 col-">
          <div class="form-container">
            <div class="form-header">
              Please fill in all fields to register
            </div>
            <div class="form-body">
              <form action="" method="POST">
                <input type="text" class="form-control" name="lastname" placeholder="Lastname">
                <input type="text" class="form-control" name="firstname" placeholder="Firstname">
                <input type="email" class="form-control" name="email"  placeholder="Email">
                <input type="password" class="form-control" name="password" placeholder="Password">
                <input type="password" class="form-control" name="confirm_password" placeholder="Confirm password">
                <a href="/signin" class="float-start"><i class="fa"><font-awesome-icon :icon="['fas', 'arrow-left']" /></i>Sign in</a>
                <button type="submit" class="btn float-end">Create account</button>
              </form>
            </div>
            <div class="form-footer text-center">
              <a href="/"><i class="fa"><font-awesome-icon :icon="['fas', 'house']" /></i>Back to homepage</a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer>
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
  </div>
</template>

<script>
  export default{
    name: 'SignUp'
  }
</script>