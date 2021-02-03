<template>
    <!-- Page Layout here -->
    <div class="row">


      <div class="col l10">
        <!-- Teal page content  -->
    <div class="transstory">
    <div class="card" v-for="donation in paginatedData" :key="donation.id">
       <div class="card-image">
           
<div class="fbframe" v-if="donation.ufacebook">
           <Fbvideo :sid="donation.id" :cname="colname"/>
          
   </div>
 <div  v-show="donation.uyoutube" ><iframe  :src="donation.uyoutube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div  v-show="donation.img" ><img :src="donation.img" alt=""></div>
            
            <p class=""><i class="material-icons tiny">person</i> By:{{ donation.name }}|<i class="material-icons tiny">date_range</i> {{ donation.datecreate }}</p>
            
            
       </div>
      <div class="card-content">
        
        <span class="card-title" >{{ donation.title }}</span>
        <p>{{ donation.descri | snippet }}</p>
         
      </div>
        <div class="card-action">
        <button class="btn light-blue left cbutton" >{{donation.curfund}}/{{donation.fundneed}} USD</button>
     
          <button class="btn pink lighten-4 right"><router-link :to="{ name: 'ViewDonation', params: { id: donation.id }}" class="blue-text" >View More</router-link></button>
          <div class="row left">
    
    
     
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

    </div>
</template>
<script>

        // eslint-disable-next-line no-unused-vars
import { mapActions, mapGetters } from 'vuex'
import Fbvideo from '@/components/layout/Fbvideo'
export default {
 
  name: 'TransDonate',
      data(){
    return{
       colname:'donations'            
    }
  },
  components: {
    Fbvideo
  },
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
    ,
    del(id){
          this.data = this.data.filter(donation => {
        return donation.id != id
      })
    }
  },
}
</script>

<style >



.Donate{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
grid-gap: 30px;
  margin-top: 10px;
}
.Donate .card{
  width: 420px;
  height:550;
 
}
.Donate h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.Donate .card-content{
  margin-top: 19px;
}


.Donate .cbutton{
    font-weight: bold;
    color: whitesmoke;
    width: 150px;
    
}
.Donate .right{
  font-weight: bold;
}

.Donate img{
  height:250px ;
  width: 300px;
}

.Donate iframe{
  height:250px ;
  width: 100%;
}

.Donate .fbframe{
  padding-top:30px ;
  height:350px !important ;
  width: 100%;
   overflow: hidden;
}



</style>