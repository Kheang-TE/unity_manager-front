<template>
  <div class="signup">
    <header class="container">
      <div class="row">
        <div class="col">
          <div class="logo_container">
            <img src="/img/unity_manager_logo.webp" alt="Unity Manager" title="Unity Manager" class="logo">
          </div>
          <h1>Create account</h1>
          <p>We will be happy to count you among us!</p>
        </div>
      </div>
    </header>

    <main class="container">
      <div class="row">
        <div class="col">
          <div class="form-container">
            <div class="form-header">
              Please fill in all fields to register
            </div>
            <div class="form-body">
              <form action="" method="POST">
                <input type="text" class="form-control mb" name="lastname" placeholder="Nom">
                <input type="text" class="form-control mb" name="firstname" placeholder="Prénom">
                <input type="email" class="form-control mb" name="email"  placeholder="Email">
                <input type="password" class="form-control mb" name="password" placeholder="Mot de passe">
                <input type="password" class="form-control mb" name="confirm_password" placeholder="Confirmation du mot de passe">
                <button type="submit" class="btn">Create account</button>
              </form>
            </div>
            <div class="form-footer">
              <a href="/login">Sign in<i class="fa-solid fa-arrow-right-long"></i></a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default{
    name: 'SignUp'
  }
</script>