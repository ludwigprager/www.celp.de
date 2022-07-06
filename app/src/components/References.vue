<template>


<div>
    <div v-for="(item, i) in items" :key="i">
      <div v-if="i%2 === 0"
           class="karte karte--left"
           data-aos="flip-right"
           data-aos-duration="2500"
      >
        <h1>{{ item }}</h1>
      </div>
      <div v-if="i%2 === 1"
           class="karte karte--right"
           data-aos="flip-left"
           data-aos-duration="1500"
      >
        <h1>{{ item }}</h1>
      </div>
    </div>
</div>

</template>

<script>

// eslint-disable-next-line no-unused-vars
import MySection from '@/components/MySection'

export default {
name: 'References',
    components: {
// eslint-disable-next-line vue/no-unused-components
        MySection,
    
  },

  setup() {
    const items = [
                   'Allianz Technology',
                   'Blaupunkt',
                   'BMW Forschung und Technik',
                   'Burda Medien',
                   'Chemiepark Linz',
                   'Cisco',
                   'Flughafen München',
                   'Fraunhofer Institut',
                   'Giesecke & Devrient',
                   'HTC',
                   'Huawei Forschungszentrum München',
                   'Klinik Vogtareuth',
                   'Knorr-Bremse Systeme für Schienenfahrzeuge GmbH',
                   'Kontron GmbH',
//                 'KVB',
                   'Landesamt für Digitalisierung, Breitband und Vermessung Bayern',
                   'Micronas AG',
                   'Münchener Hypothekenbank e.G.',
                   'Nokia-Siemens',
                   'Rohde & Schwarz',
                   'RWE Supply & Trading',
                   'Siemens AG', 
                   'Sky Deutschland',
                   'SoftM AG', 
                   'TransnetBW GmbH',
                   'Vorwerk Deutschland Stiftung & Co. KG',
                   'Winter AG',
                   '4tiitoo'
                  ];

    return {
      items
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

</style>
