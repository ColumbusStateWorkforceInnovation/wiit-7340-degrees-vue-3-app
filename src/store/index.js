import { createStore } from 'vuex';
import { dataService } from '@/shared';

export default createStore({
  state: {
    menus: [],
    categories: [],
    menuItems: [],
    flashMessages: [],
  },
  getters: {
    getFlashMessages: (state) => state.flashMessages,
    getCategoryById: (state) => (id) => state.categories.find((h) => h.id === id),
  },
  mutations: {
    getMenus(state, menus) {
      state.menus = menus;
    },
    getCategories(state, categories) {
      state.categories = categories.sort((a, b) => a.id - b.id);
    },
    getItems(state, menuItems) {
      state.menuItems = menuItems.sort((a, b) => a.id - b.id);
    },
    addFlashMessage(state, message) {
      state.flashMessages = [{ id: 0, message }];
    },
    clearFlashMessages(state) {
      state.flashMessages = [];
    },
    updateCategories(state, category) {
      const index = state.categories.findIndex((h) => h.id === category.id);
      state.categories.splice(index, 1, category);
      state.categories = [...state.categories];
    },
    addCategory(state, category) {
      state.categories.unshift(category);
      state.categories = state.categories.sort((a, b) => a.id - b.id);
    },
    deleteCategory(state, categoryId) {
      state.categories = [...state.categories.filter((p) => p.id !== categoryId)];
    },
    updateMenuItem(state, menuItem) {
      const index = state.menuItems.findIndex((h) => h.id === menuItem.id);
      state.menuItems.splice(index, 1, menuItem);
      state.menuItems = [...state.menuItems];
    },
    addMenuItem(state, menuItem) {
      state.menuItems.unshift(menuItem);
      state.menuItems = state.menuItems.sort((a, b) => a.id - b.id);
    },
    deleteMenuItem(state, menuItemId) {
      state.menuItems = [...state.menuItems.filter((p) => p.id !== menuItemId)];
    },
  },
  actions: {
    async getMenusAction({ commit }) {
      const menus = await dataService.getMenus();
      commit('getMenus', menus);
    },
    async getCategoriesAction({ commit }) {
      if (this.state.categories.length === 0) {
        const categories = await dataService.getCategories();
        commit('getCategories', categories);
      }
    },
    async getMenuItemsAction({ commit }) {
      if (this.state.menuItems.length === 0) {
        const menuItems = await dataService.getItems();
        commit('getItems', menuItems);
      }
    },
    clearFlashMessagesAction({ commit }) {
      commit('clearFlashMessages');
    },
    setFlashMessageAction({ commit }, message) {
      commit('addFlashMessage', message);
    },
    async updateCategoryAction({ commit }, request) {
      commit('addFlashMessage', 'Saving Changes .....');
      const statusData = await dataService.updateCategory(request.category, request.auth);
      if (statusData.statusCode === 204) {
        commit('addFlashMessage', 'Category updated');
        commit('updateCategories', request.category);
      } else {
        commit('addFlashMessage', `Update failed: ${statusData.statusCode} - ${statusData.statusMessage}`);
      }
    },
    async createCategoryAction({ commit }, request) {
      commit('addFlashMessage', 'Saving Changes .....');
      const statusData = await dataService.createCategory(request.category, request.auth);
      if (statusData.statusCode === 200 || statusData.statusCode === 201) {
        commit('addFlashMessage', 'New category created');
        commit('addCategory', statusData.data);
      } else {
        commit('addFlashMessage', `Create failed: ${statusData.statusCode} - ${statusData.statusMessage}`);
      }
    },
    async deleteCategoryAction({ commit }, request) {
      commit('addFlashMessage', 'Saving Changes .....');
      const statusData = await dataService.deleteCategory(request.id, request.auth);
      if (statusData.statusCode === 204) {
        commit('addFlashMessage', 'Category deleted');
        commit('deleteCategory', request.id);
      } else {
        commit('addFlashMessage', `Delete failed: ${statusData.statusCode} - ${statusData.statusMessage}`);
      }
    },
    async updateMenuItemAction({ commit }, request) {
      commit('addFlashMessage', 'Saving Changes .....');
      const statusData = await dataService.updateMenuItem(request.menuItem, request.auth);
      if (statusData.statusCode === 204) {
        commit('updateMenuItem', request.menuItem);
        commit('addFlashMessage', 'Menu item updated');
      } else {
        commit('addFlashMessage', `Update failed: ${statusData.statusCode} - ${statusData.statusMessage}`);
      }
    },
    async createMenuItemAction({ commit }, request) {
      commit('addFlashMessage', 'Saving Changes .....');
      const statusData = await dataService.createMenuItem(request.menuItem, request.auth);
      if (statusData.statusCode === 200 || statusData.statusCode === 201) {
        commit('addFlashMessage', 'New menu item created');
        commit('addMenuItem', statusData.data);
      } else {
        commit('addFlashMessage', `Create failed: ${statusData.statusCode} - ${statusData.statusMessage}`);
      }
    },
    async deleteMenuItemAction({ commit }, request) {
      commit('addFlashMessage', 'Saving Changes .....');
      const statusData = await dataService.deleteMenuItem(request.id, request.auth);
      if (statusData.statusCode === 204) {
        commit('addFlashMessage', 'Menu item deleted');
        commit('deleteMenuItem', request.id);
      } else {
        commit('addFlashMessage', `Delete failed: ${statusData.statusCode} - ${statusData.statusMessage}`);
      }
    },
  },
  modules: {
  },
});
