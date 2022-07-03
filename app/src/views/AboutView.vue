<!--
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
  <VueTyper :array="['Hello World']" />
-->

<template>

  <vueTyper text='Hello World! I was registered locally!'/>
</template>

<script>
//import VueWriter from 'vue-writer'
import { VueTyper } from 'vue-typer'
export default {
  components: {VueTyper}
}
</script>
