<template>
  <div class="table-wrapper wf-section">
    <div class="container">
      <div class="table">
        <div class="table__menu">
          <div class="fw-500">Browse other carbon tubes</div>
          <div class="table__tabs">
            <div class="table__tabs-item active" @click="tabChange('Square Carbon fibre tube')">
              <img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b47dd0687945841ba3_table-square.svg"
                loading="lazy"
                alt=""
                class="table__item-ico"
              />
              <div>Square Carbon fibre tubes</div>
            </div>
            <div class="table__tabs-item" @click="tabChange('Rectangular Carbon Boom')">
              <img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b385472b53f5e5ee9b_table-rectungular.svg"
                loading="lazy"
                alt=""
                class="table__item-ico"
              />
              <div>Rectangular Carbon Booms</div>
            </div>
            <div class="table__tabs-item" @click="tabChange('Round Carbon tube')">
              <img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b41fb86f2c19576c17_table-round.svg"
                loading="lazy"
                alt=""
                class="table__item-ico"
              />
              <div>Round carbon tube</div>
            </div>
            <div class="table__tabs-item" @click="tabChange('D-shaped carbon tube')">
              <img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b4717f4045b12a1973_table-d-shaped.svg"
                loading="lazy"
                alt=""
                class="table__item-ico"
              />
              <div>D-shaped carbon tube</div>
            </div>
            <div class="table__tabs-item" @click="tabChange('Oval & carbon tube')">
              <img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b4a26e66678eab422b_table-oval.svg"
                loading="lazy"
                alt=""
                class="table__item-ico"
              />
              <div>Oval &amp; carbon tube</div>
            </div>
          </div>
          <div class="fw-500">Other links</div>
          <div class="mt--20">
            <a href="#" class="table__tabs-item w-inline-block"
              ><img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b4125cfceba68271fb_table-about.svg"
                loading="lazy"
                alt=""
                class="table__item-ico"
              />
              <div>About C-tech</div></a
            ><a href="#" class="table__tabs-item w-inline-block"
              ><img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b4e5d13478c7491af1_table-surface.svg"
                loading="lazy"
                alt=""
                class="table__item-ico"
              />
              <div>Surface finishes</div></a
            ><a href="#" class="table__tabs-item w-inline-block"
              ><img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b4c2d609d51ae21e02_table-shipping.svg"
                loading="lazy"
                alt=""
                class="table__item-ico"
              />
              <div>Shipping &amp; delivery</div></a
            ><a href="#" class="table__tabs-item w-inline-block"
              ><img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b414b00e7ec3da5cf7_table-faq.svg"
                loading="lazy"
                alt=""
                class="table__item-ico"
              />
              <div>FAQs</div></a
            >
          </div>
        </div>
        <div class="table__content">
          <div class="table__content-head">
            <div></div>
            <div>Showing {{ paginatedData.length }} of {{ tableItems ? tableItems.length : '' }} Items</div>
          </div>
          <div class="table__content-info">
            <div class="table__th">
              <div class="table__th-item"><div>Product</div></div>
              <div class="table__th-item">
                <div>Internal Diameter (mm)</div>
              </div>
              <div class="table__th-item"><div>Wall (mm)</div></div>
              <div class="table__th-item"><div>Price Range/m</div></div>
              <div class="table__th-item"><div>Weight per meter</div></div>
              <div class="table__th-item center"><div>Action</div></div>
            </div>
            <div class="table__tb">

              <!-- Item -->
              <h1 v-if="!tableItems">loading</h1>
              <div
                v-else
                v-for="item in paginatedData"
                :key="item"
                class="table__tb-item"
              >
                <div class="table__th-item"><div>{{ item.fields['Product Type'] }}</div></div>
                <div class="table__th-item"><div>{{ item.fields['ID (All)'] }}</div></div>
                <div class="table__th-item"><div>{{ item.fields['OD (All)'] }}</div></div>
                <div class="table__th-item"><div>{{ item.fields['Price (NZD)'] }}</div></div>
                <div class="table__th-item"><div>{{ item.fields['Weight (All)'] }}</div></div>
                <div class="table__th-item center btn"><div>{{ item.fields['Action'] }}</div></div>
              </div>
              <!-- /Item -->

            </div>
          </div>
          <div class="table__pagination" v-show="paginatedData.length">
            <div class="table__arrow" @click="backPage">
              <img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b3134114d64c7ef6d8_table-arrow-left.svg"
                loading="lazy"
                alt=""
                class="table__arrow-ico"
              />
              <div>Previous</div>
            </div>
            <div class="table__pagination-numbers">
              <div
                class="table__numbers-btn"
                v-for="item in Math.ceil(tableItems.length / perPage)"
                :key="item"
                @click="goToPage(item)"
                :class="item === page ? 'active' : ''"
              >{{ item }}</div>
            </div>
            <div class="table__arrow" @click="nextPage">
              <div>Next</div>
              <img
                src="https://assets.website-files.com/61b8adc853887c7e8a0e1d78/61f300b392aaf7f52fc30682_table-arrow-right.svg"
                loading="lazy"
                alt=""
                class="table__arrow-ico v2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fetchItems: [],
      offset: null,

      tableItems: [],
      tabItems: [],
      perPage: 100,
      page: 1
    }
  },

  created() {
    this.fetchData()
  },

  computed: {
    paginatedData() {
      return this.tableItems.slice((this.page - 1) * this.perPage, this.page * this.perPage)
    }
  },

  methods: {
    async fetchData() {
      const api =
        `https://api.airtable.com/v0/appHkRvpA0XNVEQ8f/dmitry_table`
          + `?view=Grid%20view`
          + `&offset=${this.offset ? this.offset : ''}`
      
      const res = await fetch(api, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer keyEP1Ky8tJP7sodr',
        }
      })

      if (res.ok) {
        res.json().then(data => {
          if (data.offset !== undefined) {
            this.fetchItems.push(data.records)
            this.offset = data.offset
            this.fetchData()
          } else {
            this.fetchItems.push(data.records)
            this.getAllData()
            this.paginatedData
            return false
          }
        })
      }

    },

    nextPage() {
      if (this.page !== Math.ceil(this.tableItems.length / this.perPage)) {
        this.page += 1
      }
    },

    backPage() {
      if (this.page !== 1) {
        this.page -= 1;
      }
    },

    goToPage(numPage) {
      this.page = numPage
    },

    getAllData() {
      this.tableItems = [].concat.apply([], this.fetchItems)
    },

    tabChange(val) {
      this.getAllData()
      const result = this.tableItems.filter(item => item.fields['Product Type'] == val)
      this.tableItems = result
    }
  },
}
</script>

<style>
@import url('https://assets.website-files.com/61b8adc853887c7e8a0e1d78/css/ctech-dev.webflow.a62615f18.css');
.table__tb .table__th-item:nth-child(2n + 1) {
  background-color: white;
}
</style>
