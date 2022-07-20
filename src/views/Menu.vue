<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <h2>Menu</h2>
            </div>
        </div>

        <div class="row">

            <div class="col-sm-6" v-for="record in menus" :key="record.menuCategory.id">
                <div>
                    <h3>{{record.menuCategory.categoryTitle}}</h3>
                    <hr />
                    <p v-if="record.menuCategory.categoryNotes" class="categoryNotes">{{record.menuCategory.categoryNotes}}</p>

                    <div class="row" v-for="menuItem in record.menuItemList" :key="menuItem.id">
                        <div>
                            <div class="col">
                                <h4>{{menuItem.name}} &mdash; {{menuItem.price}}</h4>
                                <p v-if="menuItem.description">{{ $filters.capitalize(menuItem.description) }}</p>
                                <p v-else>&nbsp;</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="row mt-3">
            <div class="col">
                <p class="text-muted text-justify">*Consuming raw or undercooked meats, seafood or eggs may increase your risk of foodborne illness.
                    Please inform your server if a person in your party has a food allergy or special dietary need
                    (e.g. gluten intolerance). While we will do our best to accommodate your needs, please be aware
                    our restaurant uses ingredients that contain all the major FDA allergens (peanuts, tree nuts, eggs,
                    fish, shellfish, milk, soy & wheat). We offer gluten-free friendly options, however our kitchen
                    is not completely gluten free.</p>
            </div>
        </div>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Menu',
  data() {
    return {
      message: '',
    };
  },
  async created() {
    await this.loadMenus();
  },
  methods: {
    ...mapActions(['getMenusAction']),
    async loadMenus() {
      this.message = 'Loading Menus ...';
      await this.getMenusAction();
      this.message = '';
    },
  },
  computed: {
    ...mapState(['menus']),
  },
};
</script>

<style scoped>

    .categoryNotes {
        color: #0077a0;
    }

    h2 {
        font-size: 72px;
        font-weight: 700;
        font-stretch: normal;
        font-style: normal;
        letter-spacing: 6px;
        text-align: center;
        color: #0077a0;
        text-transform: uppercase;
        margin-bottom: 4rem!important;
    }

    h3 {
        font-family: 'Source Sans Pro',sans-serif;
        font-size: 18px;
        font-weight: 700;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.5;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: #0077a0;
    }

    hr {
        width: 100%;
        border-top: 3px solid;
        border-color: #f4b332;
        margin-top: 0;
        margin-bottom: 2rem;
    }

    h4 {
        text-transform: uppercase;
        font-size: 16px;
        font-weight: 700;
        color: #283138;
        margin-bottom: 0;
    }

</style>
