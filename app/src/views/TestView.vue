<!--
https://vuejs.org/api/composition-api-setup.html#basic-usage
-->

<!--

<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>”

-->

<template>
  <div>
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'


export default {
  name: 'TestView',
  setup() {
    const count = ref(0)
    let fepState = ref('');


    // expose to template and other options API hooks
    return {
      fepState,
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
</script>

<!--
<template>
<div>
<div src="@/generated/a.html">
</div>
</div>
</template>

<style src="@/css/style.css"></style>
<style src="@/css/hljs-github.css"></style>
<style src="@/css/CC Starter CSS"></style>
<style src="@/css/index.css"></style>
<style src="@/css/water.css"></style>
<style src="@/css/hljs-github.css"></style>
<style src="@/css/index.css"></style>
<style src="@/css/notes"></style>
<style src="@/css/ui-monospace.css"></style>
<style src="@/css/pure-min.css"></style>
<style src="@/css/sanitize.css"></style>
<style src="@/css/style.css"></style>
<style src="@/css/typography.css"></style>
<style src="@/css/water.css"></style>
<style src="@/css/reduce-motion.css"></style>
<style src="@/css/pure-min.css"></style>

-->
<style src="@/css/water.css"></style>

<template/>

<!--
<template src="@/generated/a.html"></template>

<template>
  <div>test

    <section v-if="fepState === 'START_A'"
             class="playerdiv">
bla
    </section>


  <button @click="count++">{{ count }}</button>
</div>
</template>
-->
