<template>
  <div>
    <div v-if="order._id">
      <div class="row">
        <div class="col-12">
          <stats-card>
            <div class="icon-big text-center" :class="`icon-${order.priority}`" slot="header">
              <i class="ti-control-record" v-bind:class="[order.priority >= 4 ? 'text-danger' : order.priority >= 2 ? 'text-warning' : 'text-success']"></i>
            </div>
            <div class="numbers" slot="content">
              <div class="row">
                <div class="col">
                  <p>Facility</p>
                  {{order.facility}}
                </div>
                <div class="col">
                  <p>Priority</p>
                  <span v-if="order.priority >= 4" class="text-danger">High</span>
                  <span v-if="order.priority >= 2 && order.priority < 4" class="text-warning">Medium</span>
                  <span v-if="order.priority < 2" class="text-success">Low</span>
                </div>
                <div class="col">
                  <p>{{order.equipment.equipment_type}}</p>
                  {{order.equipment.id}}
                </div>
                <div class="col">
                  <p>Estimated TTC</p>
                  {{order.completion}} Hours
                </div>
              </div>
            </div>
            <div class="stats d-flex justify-content-center" slot="footer">
              <p-button class="bg-danger" @click.native.prevent="completeWork">Complete Work Order</p-button>
            </div>
          </stats-card>
        </div>
      </div>
    </div>
    
    <div v-if="!order._id && !betweenJobs">
      <h1> No Job Assigned. </h1>
    </div>

    <div v-if="!order._id && betweenJobs">
      <h1> Awaiting next job... </h1>
    </div>

    <card class="card-map" v-if="order._id">
      <div class="map mb-4">
        <div id="map"></div>
      </div>
    </card>

  </div>
</template>
<script>
import axios from 'axios';
import { StatsCard, ChartCard } from "@/components/index";

export default {
  components: {
    StatsCard,
    ChartCard
  },
  data() {
    return {
      order: {},
      location: {},
      betweenJobs: false
    };
  },
  async mounted() {
    await axios.get(`http://localhost:3000/api/v1/tech/${this.$cookies.get('id')}/order`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token')}` 
      }
    }).then( (response) => {
      let body = response.data
      console.log(body)
      this.order = body.details
      this.location = body.location
    })
  },
  updated() {
    this.initMap(this.location.lat, this.location.long)
  },
  methods: {
    sortByDate() {
      this.outgoing = this.outgoing_date
    },
    sortByPriority() {
      this.outgoing = this.outgoing_prio
    },
    initMap(lat, lng) {
      var myLatlng = new window.google.maps.LatLng(lat, lng);
      var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, // we disable de scroll over the map, it is a really annoing when you scroll through page
        styles: [
          {
            featureType: "water",
            stylers: [{ saturation: 43 }, { lightness: -11 }, { hue: "#0088ff" }]
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [{ hue: "#ff0000" }, { saturation: -100 }, { lightness: 99 }]
          },
          {
            featureType: "road",
            elementType: "geometry.stroke",
            stylers: [{ color: "#808080" }, { lightness: 54 }]
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry.fill",
            stylers: [{ color: "#ece2d9" }]
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [{ color: "#ccdca1" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [{ color: "#767676" }]
          },
          {
            featureType: "road",
            elementType: "labels.text.stroke",
            stylers: [{ color: "#ffffff" }]
          },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          {
            featureType: "landscape.natural",
            elementType: "geometry.fill",
            stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
          },
          { featureType: "poi.park", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "on" }]
          },
          { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
          {
            featureType: "poi.business",
            stylers: [{ visibility: "simplified" }]
          }
        ]
      };
      var map = new window.google.maps.Map(
        document.getElementById("map"),
        mapOptions
      );

      var marker = new window.google.maps.Marker({
        position: myLatlng,
        title: "Hello World!"
      });

      // To add the marker to the map, call setMap();
      marker.setMap(map);
    },
    async completeWork() {
      let temp = this.order._id
      this.betweenJobs = true
      this.order = {}
      await axios.get(`http://localhost:3000/api/v1/tech/${this.$cookies.get('id')}/${temp}/complete`, {
        headers: {
          Authorization: `Bearer ${this.$cookies.get('token')}` 
        }
      }).then( (response) => {
        let body = response.data
        this.order = body
      })
    }
  }
};
</script>
<style>
</style>
