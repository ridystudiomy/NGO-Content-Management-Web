<template>
 
  <div>
       <div class="fixed-action-btn">
  <a v-show="user" class="btn-floating tooltipped btn-large waves-effect waves-light red right pulse" data-position="left" data-tooltip="Add a Story">
    <router-link :to="{ name: 'AddStory' }">
    <i class="large material-icons">add</i>
       </router-link>
    </a>
</div>
<h2 :class="headerdsv">Stories</h2>
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
    <div class="story">
    <div class="card" v-for="story in displayedPosts" :key="story.id">
       <div class="card-image">
<div class="fbframe" v-if="story.ufacebook">
          <Fbvideo :sid="story.id" :cname="colname"/> <country-flag class="flag" :country="story.country" size='big'/>
          
   </div> 
 <div  v-show="story.uyoutube"  class="youtube" ><country-flag class="flag" :country="story.country" size='big'/><iframe  :src="story.uyoutube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div class="youtube" v-show="story.img" ><img :src="story.img" alt=""> <country-flag class="flag" :country="story.country" size='big'/></div>
            <a class="halfway-fab btn-floating pink">
              <i class="material-icons" @click.prevent="addLike(story.id)">thumb_up</i>
            </a>
            <div class="col s3"><span class="left"><i class="material-icons tiny">person</i><router-link class="blue-text" :to="{ name: 'Profile', params: {id: story.userid}}"> By:{{ story.name }} &nbsp;|</router-link> </span></div>
             <div class="col s3"><span class="left"><i class="material-icons tiny">date_range</i> {{ story.datecreate }}</span></div>
       </div>
      <div class="card-content">
  
        <span :class="titledsv"  >{{ story.title }}</span>
        <p>{{ story.descri | snippet }}</p>
         
      </div>
        <div class="card-action">
       
          <button :class="btndsv"><router-link :to="{ name: 'ViewStory', params: { id: story.id }}" class="blue-text" >View More</router-link></button>
          <div class="row left">
      <div class="col s3"><span class="right"><i class="material-icons tiny">thumb_up</i>{{ story.totlike }}</span></div>
      <div class="col"><span class="right"> | </span></div>
      <div class="col s3"><span class="right"><i class="material-icons tiny">comment</i>{{ story.tcomment }}</span></div>
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
import db from '@/firebase/init'
import firebase from 'firebase'
import M from 'materialize-css'
import Fbvideo from '@/components/layout/Fbvideo'
export default {
  title: 'Stories',
  name: 'Story',
 mounted () {
     M.AutoInit()
  
},
  data(){
    return{
      storys: [],
      posts: [],
      page: 1,
			perPage: 6,
      pages: [],
      dell:'no',
      btndsv:'' ,
      headerdsv:null,
      titledsv:'',
      user:null,
       test:null,
       colname:'storys',
       visible: false,
       typefilter:"" ,
       country:"SG"          
    }
  },
  components: {
    Fbvideo
  },
  methods: { 

    addLike(storyid){

      db.collection('storys').doc(storyid).get().then(doc =>{
        var clikes =doc.data().tlike
        let ussid = firebase.auth().currentUser.uid
        if(clikes.includes(ussid)){
          this.$swal.fire(
          '!',
          'You Already Liked!',
          'error'
        )
        }else{
       
          const newposts = this.posts.map(obj =>
          obj.id === storyid ? { ...obj, totlike: clikes.length } : obj
          );
          this.posts=newposts 
             
      
          clikes.push(ussid)
       
        db.collection('storys').doc(storyid).update({
          tlike:clikes,
          totlike:clikes.length
          
        })

        }
      })


    },

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
      this.$router.push({ name: 'ViewStory', params: {id: result.id}})
    },
    getPosts (){   
    // fetch data from firestore
    db.collection('storys').orderBy('datecreate','desc').get()
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
      this.user= firebase.auth().currentUser
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
  },


}
</script>

<style>

.story{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
  margin-left: 60px;
  margin-right: 60px;
}
.story h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.story .descriptions{
  margin: 30px auto;
}
.story .descriptions li{
  display: inline-block;
}
.story .delete{
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}
.story .btn{
  font-weight:600;
}
.story .card-title {
font-weight:normal;
color:rgb(165, 86, 99);

}
.story img{
  height:350px ;
  width: 300px;
}
.story .card-image{
  background:black ;
  
}
.story iframe{
  height:350px ;
  width: 100%;
}

.story .fbframe{
  position: relative;
  padding-top:30px ;
  height:350px !important ;
  width: 100%;
   overflow: hidden;
}

.filter .autocomplete  {
 width: 300px;
 

  
}
.filter .search{
  cursor: pointer;
  right: 140px;
  position: absolute; 
}

.youtube{
 position: relative;
}

.flag{
    position: absolute;
  top: 0px;
  right: -4px;
}

.story .card-content{
  min-height: 140px;
}


</style>