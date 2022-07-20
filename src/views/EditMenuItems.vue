<template>
    <div>
        <Alerts/>
        <div v-if="menuItems">
            <div v-for="menuItem in menuItems" :key="menuItem.id">
                <EditItem :menuItem="menuItem"/>
            </div>
        </div>
    </div>

</template>

<script>
import { mapActions } from 'vuex';
import { dataService } from '../shared';
import Alerts from '../components/Alerts.vue';
import EditItem from '../components/EditItem.vue';

export default {
  name: 'EditMenuItem',
  components: { EditItem, Alerts },
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      menuItems: [],
    };
  },
  async created() {
    await this.loadMenuItems();
  },
  methods: {
    ...mapActions(['clearFlashMessagesAction', 'setFlashMessageAction']),
    async loadMenuItems() {
      if (this.id === 0) {
        this.menuItems = [
          {
            id: 0,
            menuCategory: {},
            name: '',
            description: '',
            price: '',
            sortOrder: 0,
          },
        ];
      } else {
        this.menuItems = [];
        this.setFlashMessageAction('Loading .....');
        this.menuItems = await dataService.getMenuItemById(this.id);
        this.clearFlashMessagesAction();
      }
    },
  },
  watch: {
    async $route() {
      await this.loadMenuItems();
    },
  },
};
</script>

<style scoped>

</style>
