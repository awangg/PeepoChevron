<template>
  <card class="card" title="Edit Profile">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-5">
            <fg-input type="text"
                      label="Company"
                      :disabled="true"
                      placeholder="Chevron"
                      v-model="user.company">
            </fg-input>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="First Name"
                      placeholder="First Name"
                      v-model="user.name">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Last Name"
                      placeholder="Last Name"
                      v-model="user.lastName">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <fg-input type="text"
                      label="Shift Start"
                      v-model="user.shiftStart">
            </fg-input>
          </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Shift End"
                      v-model="user.shiftEnd">
            </fg-input>
          </div>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        company: "Chevron",
        name: "",
        shiftStart: "",
        shiftEnd: "",
        busy: ""
      }
    };
  },
  async mounted() {
    await axios.get(`http://localhost:3000/api/v1/tech/${this.$cookies.get('id')}`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token')}` 
      }
    }).then( (response) => {
      let body = response.data
      this.user.name = body.name
      this.user.shiftStart = this.secondsToTime(body.shift.start)
      this.user.shiftEnd = this.secondsToTime(body.shift.end)
      this.user.busy = body.busy
    })
  },
  methods: {
    secondsToTime(seconds) {
      console.log(seconds)
      let temp = parseInt(seconds)
      console.log(temp)
      let hours = temp / 60 / 60
      temp -= hours * 60 * 60
      let mins = temp / 60
      temp -= mins * 60
      return this.padTime(hours, mins, temp)
    },
    padTime(h, m, s) {
      let strHours = ""
      let strMins = ""
      let strSecs = ""
      if (h < 10)
        strHours = "0" + h
      else strHours = "" + h
      if (m < 10)
        strMins = "0" + m
      else strMins = "" + m
      if (s < 10)
        strSecs = "0" + s
      else strSecs = "" + s
      return strHours + ":" +strMins + ":" + strSecs
    }
  }
};
</script>
<style>
</style>
