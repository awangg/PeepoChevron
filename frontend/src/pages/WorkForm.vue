<template>
  <card class="card" title="Submit New Work Order">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-16">
              <label for="select">Equipment Type</label>
              <b-form-select class="mock-fg mb-2" id="select"
                             v-model="form.equipment.equipment_type"
                             :options="equipment">
              </b-form-select>
            </div>
          <div class="col-md-6">
            <fg-input type="text"
                      label="Equipment ID"
                      placeholder="X123"
                      v-model="form.equipment.id">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <label for="select2">Priority</label>
              <b-form-select class="mock-fg mb-2" id="select2"
                             v-model="form.priority"
                             :options="priorities">
              </b-form-select>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <fg-input type="number"
                      label="Estimated Completion Time"
                      v-model="form.completion">
            </fg-input>
          </div>
        </div>
        <div class="col-12 text-center mt-4">
          <p-button type="info"
                    round
                    @click.native.prevent="submitForm">
            Submit Work Order
          </p-button>
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
      form: {
        facility: "",
        equipment: {
          equipment_type: "",
          id: ""
        },
        priority: "",
        completion: "",
        submission_time: ""
      },
      equipment: [
        "Pump",
        "Compressor",
        "Seperator",
        "Sensor",
        "Security",
        "Electricity",
        "Networking",
        "Vehicle",
        "HVAC",
        "Conveyor"
      ],
      priorities: [
        1, 2, 3, 4, 5
      ]
    }
  },
  updated() {
    this.form.facility = this.$cookies.get('facility')
  },
  methods: {
    async submitForm() {
      this.form.submission_time = new Date()
      await axios({
        method: 'post',
        url: `http://localhost:3000/api/v1/facility/${this.$cookies.get('id')}`,
        headers: {
          Authorization: `Bearer ${this.$cookies.get('token')}` 
        },
        data: {
          workOrder: this.form
        }
      }).then( (response) => {
        let body = response.data
        console.log(body)
        this.$router.push({ name: 'outgoing orders' })
      })
    }
  }
}
</script>
<style scoped>
.mock-fg {
  background-color: #fffcf5;
}
</style>