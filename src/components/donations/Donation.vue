<template>
 
<div>
      <!-- <div class="row">
        <div class="col s9"><a class="btn-floating btn-large waves-effect waves-light red right pulse"><i class="material-icons">add</i></a></div>
      </div> -->
<h2 :class="headerdsv"> Donation Projects</h2>
     <div class="filter row "> 
       <div class="col s8"> 
       </div>
       <div class="col s4  center-align"> <i @click="toggleVisible" class="medium material-icons search">search</i>
         <autocomplete 
     v-show="visible"      
     class="autocomplete"     
    :search="search"
    placeholder="Search for a title"
    aria-label="Search for a title"
    :get-result-value="getResultValue"
     @submit="onSubmit"
  ></autocomplete>
  </div>
     </div>
    <div class="Donationmain">
    <div class="card" v-for="donation in displayedPosts" :key="donation.id">
       <div class="card-image">
<div class="fbframe" v-if="donation.ufacebook">
           <Fbvideo :sid="donation.id" :cname="colname"/><country-flag class="flag" :country="donation.country" size='big'/>
          
   </div> 
 <div  class="youtube"  v-show="donation.uyoutube" ><country-flag class="flag" :country="donation.country" size='big'/><iframe  :src="donation.uyoutube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div  class="youtube"  v-show="donation.img" ><img :src="donation.img" alt=""><country-flag class="flag" :country="donation.country" size='big'/></div>
            <a href="" class="halfway-fab btn-floating pink">
              <i class="material-icons"><router-link :to="{ name: 'ViewDonation', params: { id: donation.id }}" class="white-text" >attach_money</router-link></i>
            </a>
            <div class="col s3"><span class="left"><i class="material-icons tiny">person</i><router-link class="blue-text" :to="{ name: 'Profile', params: {id: donation.userid}}"> By:{{ donation.name }} &nbsp;|</router-link> </span></div>
             <div class="col s3"><span class="left"><i class="material-icons tiny">date_range</i> {{ donation.datecreate }}</span></div>
       </div>
      <div class="card-content">
        
        <span :class="titledsv"  >{{ donation.title }}</span>
        <p>{{ donation.descri | snippet }}</p>
         
      </div>
        <div class="card-action">
        <button class="btn-small light-blue left cbutton">{{donation.curfund}}/{{donation.fundneed}} USD</button>
          <button :class="btndsv"><router-link :to="{ name: 'ViewDonation', params: { id: donation.id }}" class="blue-text" >View More</router-link></button>
          <div class="row left">
    
    
     
    </div>
          </div>
    </div>


  </div>
  <div>
    		<ul class="pagination center-align">
				<li class="waves-effect">
					<a class="page-link" v-if="page != 1" @click="page--"> <i class="material-icons">chevron_left</i> </a>
				</li>
				<li class="waves-effect">
					<a  class="page-link" v-for="(pageNumber,index) in pages.slice(page-1, page+5)" @click="page = pageNumber" :key="index"> {{pageNumber}}</a>
				</li>
				<li class="waves-effect">
					<a   @click="page++" v-if="page < pages.length"> <i class="material-icons">chevron_right</i> </a>
				</li>
			</ul>
   </div>   
  </div>
</template>

<script>
import M from 'materialize-css'
import db from '@/firebase/init'
import Fbvideo from '@/components/layout/Fbvideo'
export default {
 title: 'Donations',
  name: 'Donation',
   mounted () {
     M.AutoInit()
  
},
  data(){
    return{
      donations: [],
      posts: [],
      page: 1,
			perPage: 6,
      pages: [],
      dell:'no',
      btndsv:'' ,
      headerdsv:'',
      titledsv:'',  
      test:null,
       colname:'donations' ,
       country:"MY",
        visible: false, 
    }
  },
    components: {
    Fbvideo
  },
  methods: { 
           toggleVisible() {
        this.visible = !this.visible
        },

       search(input) {
      if (input.length < 1) { return [] }
      return this.posts.filter(item => {
        return item.title.toLowerCase()
          .startsWith(input.toLowerCase())
      })
    },
    getResultValue(result) {
      return result.title
    },

    onSubmit(result) {
      this.$router.push({ name: 'ViewDonation', params: {id: result.id}})
    },
    getPosts (){   
    // fetch data from firestore
    db.collection('donations').orderBy('datecreate','desc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let donation = doc.data()
        donation.id = doc.id
        this.posts.push(donation)
      })
    })      
   
    },
    		setPages () {
          	this.pages= []
			let numberOfPages = Math.ceil(this.posts.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (posts) {
			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  posts.slice(from, to);
		},
 
    deleteStory(id){
      this.storys = this.storys.filter(story => {
        return story.id != id
      })
    }
  },
  	computed: {
		displayedPosts () {
			return this.paginate(this.posts);
		}
	},
	watch: {
		posts () {
      
      this.setPages();
			
		}
	},
	created(){
      db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.btndsv = doc.data().btndsv
        this.headerdsv = doc.data().headerdsv
        this.titledsv = doc.data().titledsv
     })
		this.getPosts();
	},
	filters: {
		trimWords(value){
			return value.split(" ").splice(0,20).join(" ") + '...';
		}
	}

}
</script>

<style>


.Donationmain{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
    margin-left: 60px;
  margin-right: 60px;
}

.Donationmain .card{
  width: auto;

}
.Donationmain h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.Donationmain .descriptions{
  margin: 30px auto;
}
.Donationmain .descriptions li{
  display: inline-block;
}
.Donationmain .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
.Donationmain .btn{
  font-weight:600;
}
.Donationmain .card-title {
font-weight:normal;
color:rgb(165, 86, 99);

}
.Donationmain .card-action{
    margin-bottom: 50px;
}
.Donationmain .cbutton{
    font-weight: bold;
    color: whitesmoke;
    width: 150px;
}
.Donationmain img{
  height:350px ;
  width: 500px;
}

.Donationmain iframe{
  height:350px ;
  width: 100%;
}

.Donationmain .fbframe{
  padding-top:30px ;
  height:350px !important ;
  width: 100%;
   overflow: hidden;
}
.Donationmain .card-image{
  background:black ;
  
}

.Donationmain .card-content{
  min-height: 140px;
}

</style>