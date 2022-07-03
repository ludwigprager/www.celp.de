<template>
<div>
      <v-row class="flex-wrap justify-center">
        <v-col v-for="(project, i) in projects"
               :key="i"
               :cols="isPc ? 4 : 12">
<!--
               :cols="4">
isPc: {{ isPc }}
-->
          <v-card v-ripple="project.href ? {class: 'soft-ripple'} : false"
                  data-aos="fade-up"
                  :data-aos-duration="800"
                  :data-aos-delay="400*i"
                  class="card-shadow fill-height"
                  :href="project.href ? project.href : ''"
                  :target="project.href ? '_blank' : ''">
            <v-img :src="project.image" cover height="250" />
            <div class="py-1 px-3">
              <v-card-title class="primary--text mb-1">{{$t('projects.' + project.id + '.title')}}</v-card-title>
              <v-card-subtitle>{{$t('projects.' + project.id + '.subtitle')}}</v-card-subtitle>
            </div>
          </v-card>
        </v-col>
      </v-row>
</div>

</template>

<script>

import GlobalComputed from '@/helpers/global-computed'
//import MySection from '@/components/MySection'

export default {
name: 'Services',
  components: {
    //MySection,
  },

  computed: {
    ...GlobalComputed,
      bgImage() {
                return this.isLandscape ? this.bgImageMobile : this.bgImageDesktop;
            },
        },

  setup() {
    const projects = 
            [
                {
                    image: '/img/cloud.png',
                    id: 'p1'
                },
                {
                    image: '/img/devops.png',
                    id: 'p2'
                },
                {
                    image: '/img/sw.png',
                    id: 'p3'
                },
            ];


    return {
      projects
    }
  }
}

</script>

/*
view-source:http://michalsnik.github.io/aos/
view-source:http://michalsnik.github.io/aos/dist/css/styles.css
*/

<style lang="scss" scoped>

.karte {
  width: 40%;
  clear: both;
  background: #FFF;
  padding: 2vh;
}

/* must be 'hidden' here.
   Otherwise, layout doesn't work on android
*/
.karte--right {
  margin: 0vh 5vh 0vh 0vh;
  float: right;
  overflow: hidden;
}
.karte--left {
  margin: 0vh 0vh 0vh 5vh;
  float: left;
}
section{



} /* section */

.fade-out-enter, .fade-out-leave{
  opacity: 1;
}
.fade-out-leave-to{
  opacity: 0;
}
.fade-out-enter-active, .fade-out-leave-active{
  transition: opacity 0.4s ease-in-out;
}

.dark-gradient{
  background-color: #050a19!important;
  background: linear-gradient(125deg, rgba(5,10,25,1) 45%, rgb(3, 16, 53) 100%)!important;
}


.fullpage-section{
  height: 100vh;
  position: relative;
}

.soft-ripple{
  color: rgba(0,0,0, .2)!important;
}

.v-card{
  &.card-shadow{
            box-shadow: 0 1px 4px 0 rgba(0,0,0, .1)!important;
            transition: 0.15s ease-in-out all;
            
            @media(min-width: 960px){
                &:hover{
                    box-shadow: 0 3px 15px 0 rgba(0,0,0, .08)!important;
                    transform: translateY(-6px);
                }
  }
  &.v-card--link{
                &:before{
                    opacity: 0!important;
                }
                &:active{
                    transform: translateY(1px);
                    box-shadow: 0 1px 3px 0 rgba(0,0,0, .1)!important;
                }
            }
  }
}

    
  /* transitions */
  .delay-500ms {
        transition-delay: 0.5s!important;
  }

  .delay-1s{
        transition-delay: 1s!important;
  }

  .delay-2s{
        transition-delay: 2s!important;
  }

  .delay-3s{
        transition-delay: 3s!important;
  }

  .delay-4s{
        transition-delay: 4s!important;
  }

  .fade-up-off{
        opacity: 0;
        transform: translateY(200px);
  }

  .fade-up-on{
        opacity: 1;
        transform: none;
        transition: opacity 1s ease-in, transform 0.5s ease-out;
  }


</style>
