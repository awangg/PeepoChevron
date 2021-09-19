<template>
  <div>
    <div class="row mb-4">
      <p-button class="mx-1" @click.native.prevent="sortByDate">Sort By Submission Date</p-button>
      <p-button class="mx-1" @click.native.prevent="sortByPriority">Sort By Priority</p-button>
    </div>
    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6" v-for="order in outgoing" :key="order._id">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${order.priority}`" slot="header">
            <i class="ti-control-record" v-bind:class="[order.priority >= 4 ? 'text-danger' : order.priority >= 2 ? 'text-warning' : 'text-success']"></i>
          </div>
          <div class="numbers" slot="content">
            <div class="row">
              <div class="col">
                <p>Priority</p>
                <span v-if="order.priority >= 4" class="text-danger">High</span>
                <span v-if="order.priority >= 2 && order.priority < 4" class="text-warning">Medium</span>
                <span v-if="order.priority < 2" class="text-success">Low</span>
              </div>
              <div class="col">
                <p>Equipment ID</p>
                {{order.equipment.id}}
              </div>
              <div class="col">
                <p>Estimated TTC</p>
                {{order.completion}} Hours
              </div>
            </div>
          </div>
          <div class="stats" slot="footer">
            <i class="ti-reload"></i> Updated now. Submitted {{order.submission_time}}
          </div>
        </stats-card>
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import { StatsCard, ChartCard } from "@/components/index";

export default {
  components: {
    StatsCard,
    ChartCard
  },
  data() {
    return {
      outgoing: [],
      outgoing_date: [],
      outgoing_prio: []
    };
  },
  async mounted() {
    await axios.get(`http://localhost:3000/api/v1/facility/${this.$cookies.get('id')}/orders`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token')}` 
      }
    }).then( (response) => {
      let body = response.data
      for (let order of body) {
        order.submission_time = moment(order.submission_time).format("MMMM Do YYYY, h:mm a")
        this.outgoing.push(order)
      }

      let clonedArray = JSON.parse(JSON.stringify(this.outgoing))
      this.outgoing_date = clonedArray.sort(function(a,b){
        return new Date(b.submission_time) - new Date(a.submission_time);
      });

      let clonedArray2 = JSON.parse(JSON.stringify(this.outgoing))
      this.outgoing_prio = clonedArray2.slice().sort(function(a,b){
        return b.priority - a.priority;
      });
    })
  },
  methods: {
    sortByDate() {
      this.outgoing = this.outgoing_date
    },
    sortByPriority() {
      this.outgoing = this.outgoing_prio
    }
  }
};
</script>
<style>
</style>
