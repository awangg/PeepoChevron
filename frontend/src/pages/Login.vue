<template>
  <div class="wrapper">
    <div class="row">
      <img :src="require('@/assets/img/biglogo.png')" class="img-fluid" />
    </div>
    <div class="row">
    <card class="card text-center" id="logincard">
      <b-tabs content-class="mt-3" justified>
        <b-tab title="Facility" active>
          <div class="row">
            <div class="col-12">
              <label for="select">Name</label>
              <b-form-select class="mock-fg mb-3" id="select"
                             v-model="facility.name"
                             :options="facilities">
              </b-form-select>
            </div>
            <div class="col-12">
              <fg-input type="password"
                        label="Password"
                        placeholder="abcde"
                        v-model="facility.password">
              </fg-input>
            </div>
            <div class="col-12 text-center mt-4">
              <p-button type="info"
                        round
                        @click.native.prevent="loginFacility">
                Login as Facility
              </p-button>
            </div>
          </div>
        </b-tab>
        <b-tab title="Technician">
          <div class="row">
            <div class="col-12">
              <fg-input type="text"
                        label="Name"
                        placeholder="Bob"
                        v-model="tech.name">
              </fg-input>
            </div>
            <div class="col-12">
              <fg-input type="password"
                        label="Password"
                        placeholder="abcde"
                        v-model="tech.password">
              </fg-input>
            </div>
            <div class="col-12 text-center mt-4">
              <p-button type="info"
                        round
                        @click.native.prevent="loginTechnician">
                Login as Technician
              </p-button>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </card>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      facilities: [],
      facility: {
        name: "",
        password: ""
      },
      tech: {
        name: "",
        password: ""
      }
    }
  },
  async created() {
    if(this.$cookies.get('token')) {
      let access = this.$cookies.get('access')
      if(access == 1) this.$router.push({ name: 'dashboard' })
      else if(access == 2) this.$router.push({ name: 'stats' })
    } else {
      await axios.get("http://localhost:3000/api/v1/facility").then( (response) => {
        let body = response.data
        for (let facility of body)
          this.facilities.push(facility.facility)
      })
    }
  },
  methods: {
    loginFacility() {
      axios.post("http://localhost:3000/api/v1/facility/login", {
        name: this.facility.name,
        password: this.facility.password
      }).then( (response) => {
        let body = response.data
        if (body) {
          this.$cookies.set('access', body.access)
          this.$cookies.set('facility', body.facility)
          this.$cookies.set('id', body.id)
          this.$cookies.set('token', body.token)

          this.$router.push({ name: 'dashboard' })
        }
      })
    },
    loginTechnician() {
      axios.post("http://localhost:3000/api/v1/tech/login", {
        name: this.tech.name,
        password: this.tech.password
      }).then( (response) => {
        let body = response.data
        if (body) {
          this.$cookies.set('access', body.access)
          this.$cookies.set('name', body.facility)
          this.$cookies.set('id', body.id)
          this.$cookies.set('token', body.token)

          this.$router.push({ name: 'stats' })
        }
      })
    }
  }
}
</script>
<style scoped>
.wrapper {
  background-color: #f4f3ef;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mock-fg {
  background-color: #fffcf5;
}

#logincard {
  min-width: 50rem;
}
</style>
