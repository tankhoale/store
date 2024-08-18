<template>
  <div class="login-body">
    <div class="box">
      <form>
        <h1>FTC</h1>

        <div class="input-box">
          <input type="text" placeholder="Username" v-model="username" required @keydown.enter="submitForm()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          </svg>
        </div>

        <div class="input-box">
          <input type="password" placeholder="Password" v-model="password" required @keydown.enter="submitForm()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-lock-fill" viewBox="0 0 16 16">
            <path
              d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg>
        </div>

        <button class="btn-submit" :class="{ loading: isLoading }" @click.prevent="submitForm()">
          <span class="btn-text">Login</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      isLoading: false,
      accounts: [],
      username: '',
      password: '',
      error: false
    }
  },
  methods: {
    submitForm () {
      this.login()
    },
    // login () {
    //   this.$router.push('/management-details')
    // },
    async login () {
      this.isLoading = true
      this.error = false
      /* eslint-disable */
      let response = null
      let validate = false

      try {
          response = await axios.post('https://dacntt2.onrender.com/api/login', {
            email: this.username,
            password: this.password
          })
          validate = true
      }  catch (error) {
        this.$showError('Invalid Login Credentials')
      }

      if(validate) {
        this.$store.state.isLoggedIn = true
        this.$store.state.role = response.data.user.role
        this.$store.state.user = response.data.user.email
        console.log(response.data.token)
        this.$store.dispatch('initializeAxios', response.data.token)
        this.$router.push('/management-details')
      } else {
        this.error = true
        this.username = ''
        this.password = ''
      }
      // this.$store.state.isLoggedIn = response.data.authenticated
      this.isLoading = false
      console.log(this.$store.state.role)
    }
  },
  mounted: function () {
    this.$store.state.isLoggedIn = false
  }
}
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #021725;
}

.box {
  width: 470px;
  height: 510px;
  border: 2px solid rgba(255, 255, 255, .2);
  box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  color: #fff;
  border-radius: 15px;
  padding: 30px 60px;
  background-image: linear-gradient(to right bottom, #015d7b, #05526f, #074764, #083d58, #08334c, #0b304c, #102e4b, #142b4a, #212e53, #2f305a, #3f3261, #4f3265);
}

@import url('https://fonts.googleapis.com/css2?family=Protest+Guerrilla&display=swap');

.box h1 {
  font-size: 36px;
  text-align: center;
  font-family: "Protest Guerrilla", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.input-box {
  position: relative;
  width: 100%;
  height: 70px;
}

.input-box {
  margin: 40px 0;
}

.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border: 2px solid rgba(255, 255, 255, .2);
  border-radius: 5px;
  font-size: 18px;
  color: #fff;
  padding: 5px 0px;
  padding-left: 7px;
}

.input-box input::placeholder {
  color: #fff;
}

.input-box svg {
  position: absolute;
  margin-right: 5px;
  right: 20px;
  top: 48%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
}

.box .btn-submit {
  position: relative;
  width: 100%;
  height: 60px;
  background-image: linear-gradient(to right bottom, #02c8ff, #00c1ff, #00baff, #00b3ff, #00acff, #00a7ff, #00a2ff, #0e9cff, #0e98ff, #1294ff, #188fff, #208bfe);
  border: none;
  outline: none;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, .1);
  cursor: pointer;
  font-size: 20px;
  color: #FFF;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  padding: 12px 0;
  margin-top: 15px;
}

.loading .btn-text {
  opacity: 0;
  visibility: hidden;
}

.box .loading::after {
  content: '';
  position: absolute;
  width: 35px;
  height: 35px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 7px solid transparent;
  border-top-color: #ffffff;
  border-left-color: #ffffff;
  border-radius: 50%;
  animation: loading 1s linear infinite;
}

@keyframes loading {
  from {
    transform: rotate(0turn);
  }

  to {
    transform: rotate(1turn);
  }
}
</style>
