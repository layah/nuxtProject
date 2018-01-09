<template>

</template>

<script>
    export default {
      asyncData() {
        return new Promise((resolve) => {
          setTimeout(function () {
            resolve({})
          }, 2000)
        })
      },
       name: "index"
    }
</script>
<style>
  .main{
    display: block;
    background: red;
  }
</style>
