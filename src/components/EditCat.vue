<template>
    <div class="ml-3">
        <div v-if="category.id">
            <div class="form-group row">
                <label for="categoryIdField" class="col-sm-2 col-form-label">ID:</label>
                <div class="col-sm-10">
                    <input type="text" readonly class="form-control-plaintext" id="categoryIdField" v-model="category.id"/>
                </div>
            </div>
        </div>

        <div class="form-group row">
            <label for="categoryTitle" v-bind:class="{'col-sm-2 col-form-label':true, 'text-danger' : titleInvalid}">Title:</label>
            <div class="col-sm-10">
                <input type="text" v-bind:class="{'form-control':true, 'is-invalid' : titleInvalid}" id="categoryTitle" minlength="80" maxlength="80" v-model="category.categoryTitle"/>
            </div>
        </div>

        <div class="form-group row">
            <label for="categoryNotes" class="col-sm-2 col-form-label">Notes:</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="categoryNotes" v-model="category.categoryNotes"/>
            </div>
        </div>

        <div class="form-group row">
            <label for="sortOrder" class="col-sm-2 col-form-label">Sort Order:</label>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="sortOrder" v-model="category.sortOrder"/>
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
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      titleInvalid: false,
    };
  },
  name: 'EditCat',
  props: {
    category: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    ...mapActions(['updateCategoryAction', 'createCategoryAction']),
    cancelChanges() {
      this.$router.push({ name: 'Categories' });
    },
    saveChanges() {
      if (this.isValid()) {
        if (this.category.id === 0) {
          this.createCategoryAction({ category: this.category, auth: this.$auth.getAccessToken() });
        } else {
          this.updateCategoryAction({ category: this.category, auth: this.$auth.getAccessToken() });
        }
        this.$router.push({ name: 'Categories' });
      }
    },
    isValid() {
      this.titleInvalid = !this.category.categoryTitle.length > 0;
      return !this.titleInvalid;
    },
  },
};

</script>

<style scoped>

</style>
