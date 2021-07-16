<template>
  <b-container>
    <b-row class="py-3" align-h="center">
      <b-col cols="2">
        <b-btn @click="handleClick('login')">
          Log In
        </b-btn>
      </b-col>
      <b-col cols="2">
        <b-btn @click="handleClick('signup')">
          Register
        </b-btn>
      </b-col>
    </b-row>
    <b-container v-if="login" class="py-3">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="input-group-login-1"
          label="Email"
          label-for="input-login-1"
        >
          <b-form-input
            id="input-login-1"
            v-model="inputForm.email"
            type="email"
            placeholder="Email"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-login-2"
          label="Password"
          label-for="input-login-2"
        >
          <b-form-input
            id="input-login-2"
            v-model="inputForm.password"
            type="password"
            placeholder="Password"
            required
          />
        </b-form-group>
        <b-button type="submit" variant="primary">
          Log in
        </b-button>
        <b-button type="reset" variant="danger">
          Delete
        </b-button>
      </b-form>
    </b-container>
    <b-container v-if="signup" class="py-3">
      <b-form @submit="onSubmitSignup" @reset="onReset">
        <b-form-group
          id="input-group-1"
          label="Email"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Email"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label="Name"
          label-for="input-2"
        >
          <b-form-input
            id="input-2"
            v-model="form.name"
            placeholder="Name"
            required
          />
        </b-form-group>
        <b-form-group
          id="input-group-3"
          label="Password"
          label-for="input-3"
        >
          <b-form-input
            id="input-3"
            v-model="form.password"
            placeholder="Password"
            required
            type="password"
          />
        </b-form-group>
        <b-form-group
          id="input-group-4"
          label="Confirm password"
          label-for="input-4"
        >
          <b-form-input
            id="input-4"
            v-model="form.confirmPassword"
            placeholder="Confirm password"
            required
            type="password"
          />
        </b-form-group>
        <b-button type="submit" variant="primary">
          Register
        </b-button>
        <b-button type="reset" variant="danger">
          Delete
        </b-button>
      </b-form>
    </b-container>
  </b-container>
</template>

<script>
import Swal from 'sweetalert2'
import Auth from '../services/auth'

export default {
  layout: 'index',
  data () {
    return {
      login: false,
      signup: false,
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      inputForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onReset (event) {
      event.preventDefault()
      this.form.email = ''
      this.form.name = ''
      this.form.password = ''
      this.form.confirmPassword = ''
      this.signup = false
      this.login = false
      this.$nextTick(() => {
        this.signup = true
        this.login = true
      })
    },
    onSubmit (event) {
      event.preventDefault()
      Auth.login(this.inputForm)
        .then((res) => {
          Swal.fire({
            title: 'Exito',
            text: 'Ingreso exitoso',
            icon: 'success'
          })
          this.$router.push('/consulta')
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error'
          })
        })
    },
    onSubmitSignup (event) {
      event.preventDefault()
      Auth.signUp(this.form)
        .then((res) => {
          Swal.fire({
            title: 'Exito',
            text: 'Registrado correctamente, revise su correo',
            icon: 'success'
          })
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error'
          })
        })
      this.signup = false
      this.onReset()
    },
    handleClick (btn) {
      if (btn === 'signup') {
        this.signup = true
        this.login = false
      } else {
        this.login = true
        this.signup = false
      }
    }
  }
}
</script>
