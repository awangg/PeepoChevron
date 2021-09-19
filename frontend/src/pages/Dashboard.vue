<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <card class="card-map">
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
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      facilityInfo: {
        name: "",
        location: {
          lat: "",
          long: ""
        },
        outgoingOrders: "",
        equipmentCount: "",
        maxEngineers: ""
      },
      statsCards: [],
    };
  },
  async mounted() {
    await axios.get(`http://localhost:3000/api/v1/facility/${this.$cookies.get('id')}`, {
      headers: {
        Authorization: `Bearer ${this.$cookies.get('token')}` 
      }
    }).then( (response) => {
      let body = response.data
      let _this = this
      this.statsCards = [
        {
          type: "warning",
          icon: "ti-truck",
          title: "Facility Name",
          value: body.facility,
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-hummer",
          title: "Equipment",
          value: _this.getEquipmentCount(body.equipment),
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Work Orders",
          value: body.work_orders.length,
          footerText: "Updated now",
          footerIcon: "ti-reload"
        },
        {
          type: "info",
          icon: "ti-user",
          title: "Max Occupancy",
          value: body.max_occupancy,
          footerText: "Updated now",
          footerIcon: "ti-reload"
        }
      ]
      this.facilityInfo.lat = body.location.lat
      this.facilityInfo.long = body.location.long
      this.initMap(body.location.lat, body.location.long)
    })
  },
  methods: {
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
    getEquipmentCount(equipmentList) {
      let count = 0
      for (let equipment of equipmentList)
        count += equipment.quantity
      
      return count
    }
  }
};
</script>
<style>
</style>
