<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Menu Items</h2>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <Alerts/>
                <p class="lead text-center">
                    <router-link class="btn btn-outline-primary btn-lg" :to="{ name: 'edit-item', params: { id: 0 } }">Create a new menu item</router-link>
                </p>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="menuItem in menuItems" :key="menuItem.id">
                        <td>{{ menuItem.id}}</td>
                        <td>{{ menuItem.name }}</td>
                        <td>{{ menuItem.description }}</td>
                        <td>{{ menuItem.price }}</td>
                        <td class="row">
                            <button type="button" class="btn btn-outline-dark mr-1" data-toggle="modal" data-target="#exampleModal" @click="askToDelete(menuItem)">
                                <i class="fas fa-trash"></i>
                            </button>
                            <router-link class="btn btn-outline-dark" :to="{ name: 'edit-item', params: { id: menuItem.id } }">
                                <i class="fa fa-pen"></i>
                            </router-link>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <Modal
                        :message="modalMessage"
                        :isOpen="showModal"
                        @handleNo="closeModal"
                        @handleYes="deleteMenuItem"
                >
                </Modal>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Modal from '@/components/Modal.vue';
import Alerts from '../components/Alerts.vue';

export default {
  name: 'MenuItems',
  data() {
    return {
      itemToDelete: null,
      showModal: false,
      authenticated: false,
    };
  },
  components: {
    Alerts,
    Modal,
  },
  props: {
    displayAll: {
      type: Boolean,
      default: false,
    },
  },
  async created() {
    await this.loadMenuItems();
  },
  methods: {
    ...mapActions(['getMenuItemsAction', 'deleteMenuItemAction', 'getCategoriesAction']),
    async loadMenuItems() {
      await this.getMenuItemsAction();
      await this.getCategoriesAction();
    },
    askToDelete(menuItem) {
      this.itemToDelete = menuItem;
      // eslint-disable-next-line no-console
      console.log('ASK TO DELETE');
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteMenuItem() {
      this.closeModal();
      if (this.itemToDelete) {
        await this.deleteMenuItemAction({ id: this.itemToDelete.id, auth: this.$auth.getAccessToken() });
      }
      /** The loadMenuItems is not needed,
                 *  but it's nice to query the database
                 * in case any other changes were made by other users
                 */
      await this.loadMenuItems();
    },
  },
  computed: {
    ...mapState(['menuItems']),
    modalMessage() {
      const modalMessage = this.itemToDelete && this.itemToDelete.title
        ? this.itemToDelete.title
        : '';
      return `Would you like to delete ${modalMessage} ?`;
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
    h2 {
        font-size: 72px;
        font-weight: 700;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: 6px;
        text-align: center;
        color: #0077a0;
        text-transform: uppercase;
    }

</style>
