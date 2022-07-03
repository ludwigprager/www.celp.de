<template>
  <footer class="myfooter footer-bg strong-text--text">

<!--
  <footer class="myfooter footer-bg strong-text--text" :class="{'phone': isPhone}">
<div>
{{isPhone}}
</div>
<div>
{{mdAndUp}}
{{isPc}}
</div>
-->


    <v-container data-aos="fade-up" data-aos-duration="600" class="row-container text--text py-10">
      <v-row>
<!--
        <v-col :cols="isPc ? 4 : 12"
               class="pe-lg-12"
               :class="{'d-flex text-center justify-center align-center flex-column': isPhone}">
          <div class="footer-content mt-6 mt-lg-10">
                          {{$t('footer.description')}}
          </div>
        </v-col>
        <template v-if="isPc">
-->
        <template>
          <v-col :cols="isPc ? 6 : 12"
                 v-if="isPc"
                 class="px-lg-12">
            <v-subheader class="text--text"> {{$t('footer.links')}} </v-subheader>
            <v-list color="footer-bg" dark>
              <v-list-item v-for="link in links"
                           :key="link.name" large tile text class="ms-2"
                           @click="navigateToLink(link.ref)">
                <v-list-item-title class="strong-text--text">{{$t(`links.${link.name}`)}}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>
          <v-col :cols="isPc ? 6 : 12" class="ps-lg-12">
            <v-subheader class="text--text"> {{$t('footer.contact.subheader')}} </v-subheader>
            <v-list color="footer-bg" dark class="text--text" two-line>
              <v-list-item v-for="item in contactItems"
                           :key="item.name"
                           :target="item.href ? '_blank' : ''"
                           :href="item.href ? item.href : (item.name === 'email' ? `mailto:${item.value}` : '')">
                <v-list-item-icon>
                  <v-icon :color="item.color">{{item.icon}}</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-subtitle class="mb-2">{{$t('footer.contact.' + item.name)}}</v-list-item-subtitle>
                  <v-list-item-title>{{item.value}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
        </template>

      </v-row>
    </v-container>

    <v-spacer />

    <div class="footer-watermark flex-column">
      <v-container class="text-center py-0">
        <div>Dipl.-Inform. Ludwig Prager</div>
        <div>Gschwendt 1 / 84559 Kraiburg / 08630 9865874</div>
        <div>München / 089 760 20 75</div>
      </v-container>
    </div>

    <!--
    <Consent/>
    -->

  </footer>
</template>

<script>

import GlobalComputed from '@/helpers/global-computed'
import GlobalMethods from '@/helpers/global-methods'
import links from '@/helpers/links'
//import Consent from '@/components/Consent'

export default {
    name: 'MyFooter',
    props: {
        light: {
            type: Boolean,
            default: false,
        }
    },

    components: {
//    Consent
    },

  data(){
    return {
      links,
      contactItems: [
        {name: 'email', icon: 'mdi-email', value: 'lp@celp.de', color: 'white'},
        {name: 'linkedin', icon: 'mdi-linkedin', value: 'ludwig-prager-a90a7588', color: 'blue', href: 'https://www.linkedin.com/in/ludwig-prager-a90a7588/'},
        {name: 'website', icon: 'mdi-web', value: 'www.celp.de', color: 'text', href: 'https://www.celp.de'},
        {name: 'github', icon: 'mdi-github', value: 'github', color: 'text', href: 'https://github.com/ludwigprager'},
            ],
        }
    },
    computed: {
        ...GlobalComputed,
    },
    methods: {
        
        ...GlobalMethods,
    enableTracking() {
      this.$ga.enable();
      console.log('tracking enabled');
    }     
  },

}
</script>

<style lang="scss" scoped>

.myfooter{
  min-height: 500px;
  display: flex;
  justify-content: center;
  align-content: stretch;
  flex-direction: column;

  &.phone{
    min-height: 400px;
  }

  .footer-watermark{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0, .3);
    line-height: 1.6rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 2rem 0;
  }
  .row-container{
    line-height: 1.9rem;
  }
}

</style>
