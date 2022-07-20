<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Menu Categories</h2>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <Alerts/>
                <p class="lead text-center">
                    <router-link class="btn btn-outline-primary btn-lg" :to="{ name: 'edit-category', params: { id: 0 } }">Create a New category</router-link>
                </p>
                <table class="table">
                    <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Title</th>
                        <th scope="col">Notes</th>
                        <th scope="col">Order</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="category in categories" :key="category.id">
                        <td>{{ category.id}}</td>
                        <td>{{ category.categoryTitle }}</td>
                        <td>{{ category.categoryNotes }}</td>
                        <td>{{ category.sortOrder }}</td>
                        <td class="row">
                            <button type="button" class="btn btn-outline-dark mr-1" data-toggle="modal" data-target="#exampleModal" @click="askToDelete(category)">
                                <i class="fas fa-trash"></i>
                            </button>
                            <router-link class="btn btn-outline-dark" :to="{ name: 'edit-category', params: { id: category.id } }">
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
                        @handleYes="deleteCategory"
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
  name: 'Categories',
  data() {
    return {
      categoryToDelete: null,
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
    await this.loadCategories();
  },
  methods: {
    ...mapActions(['getCategoriesAction', 'deleteCategoryAction']),
    async loadCategories() {
      await this.getCategoriesAction();
    },
    askToDelete(category) {
      this.categoryToDelete = category;
      // eslint-disable-next-line no-console
      console.log('ASK TO DELETE');
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deleteCategory() {
      this.closeModal();
      if (this.categoryToDelete) {
        await this.deleteCategoryAction(this.categoryToDelete.id);
      }
      /** The loadCategories is not needed,
                 *  but it's nice to query the database
                 * in case any other changes were made by other users
                 */
      await this.loadCategories();
    },
  },
  computed: {
    ...mapState(['categories']),
    modalMessage() {
      const modalMessage = this.categoryToDelete && this.categoryToDelete.categoryTitle
        ? this.categoryToDelete.categoryTitle
        : '';
      return `Would you like to delete ${modalMessage} ?`;
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
