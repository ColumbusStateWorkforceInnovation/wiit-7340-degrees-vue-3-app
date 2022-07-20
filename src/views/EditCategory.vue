<template>
    <div>
        <Alerts/>
        <div v-if="categories">
            <div v-for="category in categories" :key="category.id">
                <EditCat :category="category"/>
            </div>
        </div>
    </div>

</template>

<script>
import { mapActions } from 'vuex';
import { dataService } from '../shared';
import Alerts from '../components/Alerts.vue';
import EditCat from '../components/EditCat.vue';

export default {
  name: 'EditCategory',
  components: { EditCat, Alerts },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      categories: [],
    };
  },
  async created() {
    await this.loadCategories();
  },
  methods: {
    ...mapActions(['clearFlashMessagesAction', 'setFlashMessageAction']),
    async loadCategories() {
      if (this.id === 0) {
        this.categories = [
          {
            id: 0,
            categoryTitle: '',
            categoryNotes: '',
            sortOrder: 0,
          },
        ];
      } else {
        this.categories = [];
        this.setFlashMessageAction('Loading .....');
        this.categories = await dataService.getCategoryById(this.id);
        this.clearFlashMessagesAction();
      }
    },
  },
  watch: {
    async $route() {
      await this.loadCategories();
    },
  },
};
</script>

<style scoped>

</style>
