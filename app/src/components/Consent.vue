<template>

<div>

    <!-- scoped-slot Versuch
    -->
    <cookie-law
                position="top" 
                transitionName="slideFromBottom"
                buttonDecline="true"
                :buttonDeclineText="$t('gdpr.reject')"
                :buttonText="$t('gdpr.accept')"
                v-on:accept="enableTracking()"
    >
      <div slot="message">
        {{$t('gdpr.subtitle')}}
      </div>
    </cookie-law>


</div>

</template>

<script>

import CookieLaw from 'vue-cookie-law'		

export default {
 // name: 'Consent',
  setup() {
  },

  components: { CookieLaw }

/*
    return {
      items
    }
*/
}
</script>


<style lang="scss" scoped>
</style>
