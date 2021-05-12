<template>
  <mcv-topbar></mcv-topbar>
  <router-view></router-view>
</template>

<script>

  import McvTopbar from '@/components/TopbarComponent';
  import {actionTypes} from "@/store/modules/auth";

  export default {
    name: 'McvApp',
    components: {
      McvTopbar
    },
    mounted() {
      this.$store.dispatch(actionTypes.getCurrentUser);
    }
  }
</script>
