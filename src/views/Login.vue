<template>
  <b-container>
    <b-row align-h="center">
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <b-card
          title="Login"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem"
          class="mb-2"
        >
          <b-card-text>
            <div style="text-align: justify">
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                  id="input-group-1"
                  label="Email"
                  label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  id="input-group-2"
                  label="Password"
                  label-for="input-2"
                >
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    placeholder="Enter Password"
                    type="password"
                    required
                  ></b-form-input>
                </b-form-group>

                <b-button type="reset" variant="danger">Reset</b-button>
                <b-button type="submit" variant="primary" class="m-2"
                  >Login</b-button
                >
              </b-form>
            </div>
            {{ $store.state.auth.isLogin }}
          </b-card-text>
        </b-card>
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      // alert(JSON.stringify(this.form))
      this.$store.dispatch('auth/login')
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
