<template>
    <div class="ml-3">
        <div v-if="menuItem.id">
            <div class="form-group row">
                <label for="menuItemIdField" class="col-sm-2 col-form-label">ID:</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="menuItemIdField" v-model="menuItem.id"/>
                </div>
            </div>
        </div>

        <div class="form-group row">
            <label for="menuItemName" v-bind:class="{'col-sm-2 col-form-label':true, 'text-danger' : nameInvalid}">Name:</label>
            <div class="col-sm-10">
                <input type="text" v-bind:class="{'form-control':true, 'is-invalid' : nameInvalid}" id="menuItemName" minlength="80" maxlength="80" v-model="menuItem.name"/>
            </div>
        </div>

        <div class="form-group row">
            <label for="menuItemDescription" class="col-sm-2 col-form-label">Description:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="menuItemDescription" v-model="menuItem.description"/>
            </div>
        </div>

        <div class="form-group row">
            <label for="menuItemPrice" v-bind:class="{'col-sm-2 col-form-label':true, 'text-danger' : priceInvalid}">Price:</label>
            <div class="col-sm-10">
                <input type="text" v-bind:class="{'form-control':true, 'is-invalid' : priceInvalid}" id="menuItemPrice" minlength="80" maxlength="80" v-model="menuItem.price"/>
            </div>
        </div>

        <div class="form-group row">
            <label for="itemCategory" v-bind:class="{'col-sm-2 col-form-label':true, 'text-danger' : categoryInvalid}">Category:</label>
            <div class="col-sm-10">
                <select id="itemCategory" class="custom-select" v-model="menuItem.menuCategory">
                    <option v-for="category in categories" v-bind:key="category.id" v-bind:value="category">
                        {{category.categoryTitle}}
                    </option>
                </select>
            </div>
        </div>

        <div class="form-group row">
            <label for="sortOrder" class="col-sm-2 col-form-label">Sort Order:</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="sortOrder" v-model="menuItem.sortOrder"/>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-10 text-center">
                <button class="btn btn-primary m-3" @click="saveChanges()">
                    <span class="far fa-save mr-2"></span>
                    <span class="d-none d-md-inline">Save Changes</span>
                </button>

                <button class="btn btn-secondary m-3" @click="cancelChanges()">
                    <span class="fa fa-times mr-2"></span>
                    <span class="d-none d-md-inline">Cancel Changes</span>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      nameInvalid: false,
      priceInvalid: false,
      categoryInvalid: false,
    };
  },
  name: 'EditCat',
  props: {
    menuItem: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState(['categories']),
  },
  methods: {
    ...mapActions(['updateMenuItemAction', 'createMenuItemAction']),
    cancelChanges() {
      this.$router.push({ name: 'MenuItems' });
    },
    saveChanges() {
      if (this.isValid()) {
        if (this.menuItem.id === 0) {
          this.createMenuItemAction(this.menuItem);
        } else {
          this.updateMenuItemAction(this.menuItem);
        }
        this.$router.push({ name: 'MenuItems' });
      }
    },
    isValid() {
      this.nameInvalid = !this.menuItem.name.length > 0;
      this.priceInvalid = !this.menuItem.price.length > 0;
      this.categoryInvalid = !this.menuItem.menuCategory.id > 0;
      return !this.nameInvalid && !this.categoryInvalid && !this.priceInvalid;
    },
  },
};

</script>

<style scoped>

</style>
