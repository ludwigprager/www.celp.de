<template>

<div>
    <loading :loading="loading" />

    <navbar :light-theme="lightNavbar" />

    <div class="page page-sections">

    <section id="headerSection"
             data-section="home"
             class="header-section dark-gradient fullpage-section">
      <v-container v-if="!loading"
                   class="fill-height pt-12"
                   :class="{'align-center': isPhone}"
      >

          <h1 class="strong-text--text" >
            <vue-typer :repeat="0"
                      :text="$t('sections.1.text')"/>
          </h1>
          <h2 class="text--text mt-5" style="text-align: left;"
          >
            <vue-typer :repeat="0"
                      :pre-type-delay='2000'
                      :text="$t('sections.2.text')"/>
            <div>
              <vue-typer :repeat="0"
                        :pre-type-delay='4000'
                        :text="$t('sections.3.text')"/>
            </div>

            <div>
              <vue-typer :repeat="0"
                        :pre-type-delay='6000'
                        :text="$t('sections.4.text')"/>
            </div>

            <div>
              <vue-typer :repeat="0"
                        :pre-type-delay='8000'
                        :text="$t('sections.5.text')"/>
            </div>
          </h2>
      </v-container>

    </section>

    <my-section id="productsSection"
               data-section="products"
               background="light"
               :headline="$t('products.title')"
               :subtitle="$t('products.subtitle')"
               light>
    <services data-aos="fade-up" :data-aos-duration="800" />
    </my-section>

  <my-section id="referencesSection"
              data-section="references"
              divider
              :headline="$t('references.title')"
              :subtitle="$t('references.subtitle')"
              light>
    <references data-aos="fade-up" :data-aos-duration="800" />
  </my-section>

    <MyFooter />
    <scroll-to-top />

  </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

import ScrollToTop from '@/components/ScrollToTop'
import MySection from '@/components/MySection'
import MyFooter from '@/components/MyFooter'
import References from '@/components/References'
import Services from '@/components/Services'

import GlobalComputed from '@/helpers/global-computed'
import GlobalMethods from '@/helpers/global-methods'
import Navbar from '@/components/Navbar'
import Loading from '@/components/Loading'

import { VueTyper } from 'vue-typer'
import { onMounted } from '@vue/composition-api'
//import { play }  from '../audio.ts';


export default {
  setup() {
    onMounted(() => {

      /*
      // after 1 Sec
      setTimeout(function(){
        play('type2');
      }, 1000);

      // after 3 Sec
      setTimeout(function(){
        play('type1');
      }, 3000);
      */

    })
  },
  
    name: "HomeView",
    components: {
        ScrollToTop,
        References,
        Services,
        MySection,
        MyFooter,
        Navbar,
        Loading,
        VueTyper
    },
    data(){
        return {
            showSection1Actions: false,
            currentScrollTop: 0,

        }
    },
    computed: {
        ...GlobalComputed,

    },
    methods: {
        ...GlobalMethods,
        scrollToSection(n){
            let i = n-1,
                element = document.querySelectorAll('.page-sections section')[i];
            if (element){
                this.scrollToElement(element);
            }
        },
        scrollObserver(){
            window.addEventListener('scroll', ()=>{
                this.currentScrollTop = document.documentElement.scrollTop;
//console.log('scrollObserver sections: ' + JSON.stringify(this.currentScrollTop));
            })
        },

        handleScrollChange(scrollTop){
            const sections = document.querySelectorAll('.page-sections section');
//console.log('handleScrollChange sections length: ' + JSON.stringify(sections));
console.log('handleScrollChange sections: ' + JSON.stringify(sections));
            sections.forEach(section => {
                let offsetTop = section.offsetTop - this.navbarHeight, // decrease navbarHeight
                    offsetBottom = offsetTop + section.offsetHeight;

console.log('handleScrollChange scrollTop: %d section.offsetTop: %d, offsetBottom: %d: ', scrollTop, section.offsetTop, offsetBottom);
                if (scrollTop >= offsetTop && scrollTop < offsetBottom){
                    let sectionName = section.getAttribute('data-section');
                    if(sectionName){
                        this.$store.commit('SET_ACTIVE_SECTION', sectionName)
                    }
                    // section is visible...
                    if (section.getAttribute('data-theme') === 'light'){
                        
                        if (!this.lightNavbar){
                            this.$store.commit('SET_LIGHT_NAVBAR', true);
                        }
                    }else{
                        if (this.lightNavbar){
                            this.$store.commit('SET_LIGHT_NAVBAR', false);
                        }
                    }
                }
            })

        },

        ...GlobalMethods
    },
    watch: {
        currentScrollTop(top){
            this.handleScrollChange(top);
        }
    },

    mounted(){
        // console.error('test');
        this.scrollObserver();
        AOS.init({container: document.documentElement, once: true, easing: 'ease'});
    }
};
</script>

<style lang="scss" scoped>

.vue-typer {
  text-align: left;
}

section{
  .container {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;

    &, *{
                z-index: 1;
    }
  }

  &.header-section{
    color: white;
  }

  h1 {
    font-size: 4rem;
    font-weight: 300;

    @media(max-width: 960px) {
      text-align: center;
      font-size: 1.7rem;
      line-height: 2.4rem;
      font-weight: 400;
    }
  }

  h2 {
    font-size: 2.75rem;
    word-break: break-word!important;
    font-weight: 200;

    @media(max-width: 960px) {
      text-align: center;
      font-size: 1.3rem;
      font-weight: 300;
    }
  }
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

html, body {
  overflow: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
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
.container {
  &:not(.container--fluid){
    @media(min-width: 1264px){
      max-width: 1185px;
    }
    @media(min-width: 1904px){
      max-width: 1290px;
    }
    @media(max-width: 960px){
      padding: 16px;
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
