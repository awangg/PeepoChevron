<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/dashboard" name="Dashboard" icon="ti-panel" v-if="access == 1"/>
        <sidebar-link to="/outgoing" name="Outgoing Work Orders" icon="ti-pulse" v-if="access == 1" />
        <sidebar-link to="/workform" name="Submit New Work Order" icon="ti-support" v-if="access == 1" />
        <sidebar-link to="/stats" name="User Profile" icon="ti-user" v-if="access == 2"/>
        <sidebar-link to="/assignment" name="Job Assignment" icon="ti-hummer" v-if="access == 2"/>
        <sidebar-link to="/table-list" name="Table List" icon="ti-view-list-alt" v-if="access == 3"/>
        <sidebar-link to="/typography" name="Typography" icon="ti-text" v-if="access == 3"/>
        <sidebar-link to="/icons" name="Icons" icon="ti-pencil-alt2" v-if="access == 3"/>
        <sidebar-link to="/maps" name="Map" icon="ti-map" v-if="access == 3"/>
        <sidebar-link to="/notifications" name="Notifications" icon="ti-bell" v-if="access == 3"/>
        <p-button class="mt-3 mx-auto" type="dark"
            @click.native.prevent="deleteCookies">
            Logout
        </p-button>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  data() {
    return {
      access: -1
    }
  },
  mounted() {
    this.access = this.$cookies.get('access')
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    deleteCookies() {
      this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
      this.$router.push({ path: '/login' })
    }
  }
};
</script>
