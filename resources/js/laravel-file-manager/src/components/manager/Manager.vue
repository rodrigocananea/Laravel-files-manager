<template>
    <div class="fm-content d-flex flex-column" style="height: 70vh">
        <!-- <disk-list v-bind:manager="manager"></disk-list> -->
        <breadcrumb v-bind:manager="manager"></breadcrumb>
        <div class="fm-content-body">
            <table-view v-if="viewType === 'table'" v-bind:manager="manager"></table-view>
            <grid-view v-else v-bind:manager="manager"></grid-view>
        </div>
    </div>
</template>

<script>
// Components
import DiskList from './DiskList.vue';
import Breadcrumb from './Breadcrumb.vue';
import TableView from './TableView.vue';
import GridView from './GridView.vue';

export default {
  name: 'Manager',
  components: {
    DiskList,
    Breadcrumb,
    TableView,
    GridView,
  },
  props: {
    manager: { type: String, required: true },
  },
  computed: {
    /**
     * view type - grid or table
     * @returns {default.computed.viewType|(function())|string}
     */
    viewType() {
      return this.$store.state.fm[this.manager].viewType;
    },
  },
};
</script>

<style lang="scss">
    .fm-content {
        height: 100%;
        padding-left: 1rem;

        .fm-content-body {
            overflow: auto;
        }
    }
</style>
