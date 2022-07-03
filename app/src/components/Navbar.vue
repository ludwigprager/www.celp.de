<template>
  <v-app-bar :light="light"
             :height="scrolled ? this.navbarHeight : (isPc ? 130 : 100)"
             class="navbar"
             :class="{'blank': !scrolled & !light, 'soft-shadow': light, 'dark-gradient': scrolled && !light}"
             :flat="!light"
             fixed
             :color="light ? 'white' : 'dark'"
             :dark="!light">
    <v-container class="d-flex align-center">
      <v-slide-x-reverse-transition appear>
        <div class="d-flex">
          <div v-if="isPc" class="d-flex align-center">
            <v-btn v-for="link in links"
                   :color="activeSection === link.name ? 'secondary' : undefined"
                   :outlined="activeSection === link.name"
                   :key="link.name"
                   large tile :text="activeSection !== link.name"
                   class="ms-2"
                   @click="navigateToLink(link.ref)">{{ $t(`links.${link.name}`)}}</v-btn>
          </div>

          <div class="d-flex align-center ms-8">
            <locale-button :large="isPc" />
          </div>

          <v-menu v-if="! isPc"
                  right
                  bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-format-align-justify</v-icon>
                </v-btn>
            </template>

            <v-list>
              <!-- TODO optionen kopiert. uberpruefen ! -->
              <v-list-item v-for="link in links"
                           :key="link.name"
                           :color="activeSection === link.name ? 'secondary' : undefined"
                           :outlined="activeSection === link.name"
                           large tile :text="activeSection !== link.name"
                           class="ms-2"
                           @click="navigateToLink(link.ref)">
                {{ $t(`links.${link.name}`)}}
              </v-list-item>
            </v-list>
          </v-menu>

        </div>
      </v-slide-x-reverse-transition>
    </v-container>
  </v-app-bar>
</template>

<script>

import LocaleButton from '@/components/LocaleButton'
import GlobalComputed from '@/helpers/global-computed'
import GlobalMethods from '@/helpers/global-methods'
import links from '@/helpers/links'

export default {
    name: 'navbar',
    components: {
      LocaleButton
    },
    props: {
      lightTheme: {
        type: Boolean,
        default: false,
      }
    },
    data(){
        return {
            scrolled: false,
            links,
        }
    },
    computed: {
        light(){
            return this.lightTheme && this.scrolled
        },
        activeSection(){
            return this.$store.state.activeSection;
        },
        ...GlobalComputed
    },
    methods: {
        handleScroll(){
            this.scrolled = window.scrollY > 0;
        },

        ...GlobalMethods
    },
    mounted(){
        window.addEventListener('scroll', this.handleScroll);
        this.handleScroll();
    }
}
</script>

<style lang="scss" scoped>
  .v-application .navbar{
    &, .v-toolbar__content{
      transition: height 0.2s ease-out, background-color 0.1s linear!important;
    }
    &.soft-shadow{
      box-shadow: 0 0 transparent, 0 0 transparent, 0 5px 5px -4px rgba(0, 0, 0, 0.10)!important;
    }
    &.dark-gradient{
      box-shadow: 0 1px 8px 0px rgba(0,0,0, .2)!important;
    }
    &.blank{
      &, .v-toolbar__content{
        background: none!important;
        border: none!important;
        box-shadow: none!important;
      }
    }
    .v-btn{
        font-weight: normal!important;
        text-transform: capitalize;
        letter-spacing: 1.1px;
    }
  }
</style>
