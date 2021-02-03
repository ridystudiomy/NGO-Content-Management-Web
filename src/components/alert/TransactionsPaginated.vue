<template>
  <div>
		<h2>pagination boodooooo</h2>
		<div>
          <div class="Donation container">
    <div class="card" v-for="(transaction, index) in paginatedData" :key="index">
       <div class="card-image">
          <img :src="transaction.img" alt="">
            <a href="" class="halfway-fab btn-floating pink pulse">
              <i class="material-icons">attach_money</i>
            </a>
            <div class="col s3"><span class="left"><i class="material-icons tiny">person</i> By:{{ transaction.name }} &nbsp;|</span></div>
             <div class="col s3"><span class="left"><i class="material-icons tiny">date_range</i> {{ transaction.datecreate }}</span></div>
       </div>
      <div class="card-content">
        
        <span class="card-title" >{{ transaction.title }}</span>
        <p>{{ transaction.descri | snippet }}</p>
         
      </div>
        <div class="card-action">
        <button class="btn light-blue left cbutton">{{transaction.curfund}}/{{transaction.fundneed}} USD</button>
          <button class="btn pink lighten-4 right"><router-link :to="{ name: 'ViewDonation', params: { id: transaction.proid }}" class="blue-text" >View More</router-link></button>
          <div class="row left">
    
    
     
    </div>
          </div>
    </div>
  </div>
		</div>

		<ul class="pagination center" v-if="data.length > 5 || currentPage > 1">
        <li class="pagination-item" >
          <button class="btn pink lighten-4" @click="onClickFirstPage" :disabled="isInFirstPage">
            <i class="material-icons">chevron_left</i><i class="material-icons">chevron_left</i>
          </button>
        </li>

        <li class="pagination-item">
          <button  @click="onClickPreviousPage" :disabled="isInFirstPage">
            <i class="material-icons">chevron_left</i>
          </button>
        </li>

        <li class="btn pink lighten-4" v-for="(page, index) in pages" :key="index">
          <button 
          
          type="button" 
          @click="onClickPage(page.number)" 
          :disabled="page.isDisabled" 
          :class="{ active: isPageActive(page.number) }">
            {{ page.number }}
          </button>
        </li>

        <li class="pagination-item" >
          <button class="btn pink lighten-4" @click="onClickNextPage" :disabled="isInLastPage">
           <i class="material-icons">chevron_right</i>
          </button>
        </li>
        <li class="pagination-item" >
          <button class="btn pink lighten-4" @click="onClickLastPage" :disabled="isInLastPage">
             <i class="material-icons">chevron_right</i><i class="material-icons">chevron_right</i>
          </button>
        </li>
      </ul>
	</div>
</template>

<script>
        // eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'transactions-paginated',
  props: {
    data: {
      type: Array,
      required: true
    },
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
  },
  computed: {
    paginatedData(){
      let start = (this.currentPage - 1) * this.perPage, end = start + this.perPage
      return this.data.slice(start, end)
    },
    startPage() {
      if (this.currentPage === 1) return 1
      if (this.currentPage === this.totalPages) return this.totalPages - this.maxVisibleButtons + (this.maxVisibleButtons -1)
      return this.currentPage - 1
    },
    endPage() { return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages) },
    pages() {
      let range = []
      for (let i = this.startPage; i <= this.endPage; i+= 1 ) {
        range.push({
          number: i,
          isDisabled: i === this.currentPage 
        });
      }
      return range
    },
    isInFirstPage() { return this.currentPage === 1 },
    isInLastPage() { return this.currentPage === this.totalPages },
  },
  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1)
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1)
    },
    onClickPage(page) {
      this.$emit('pagechanged', page)
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1)
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);   
    },
    isPageActive(page) {
      return this.currentPage === page
    },
    
    onPageChange(page) {
      this.currentPage = page;
    }
  },
}
</script>

<style>
.Donation{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.Donation h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.Donation .descriptions{
  margin: 30px auto;
}
.Donation .descriptions li{
  display: inline-block;
}
.Donation .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
.Donation .btn{
  font-weight:600;
}
.Donation .card-title {
font-weight:normal;
color:rgb(165, 86, 99);

}
.Donation .card-action{
    margin-bottom: 50px;
}
.Donation .cbutton{
    font-weight: bold;
    color: whitesmoke;
    width: 150px;
}
.Donation img{
  height:250px ;
  width: 300px;
}

</style>


