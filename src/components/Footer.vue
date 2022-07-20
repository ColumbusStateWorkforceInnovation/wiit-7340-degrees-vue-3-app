<template>
    <div class="mt-2">
        <p class="font-weight-lighter text-center">
          &copy; {{ copyYear }} Columbus State Community College
        </p>
    </div>

</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      copyYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>

</style>
