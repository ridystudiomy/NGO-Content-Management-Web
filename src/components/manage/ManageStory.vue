<template>
 <div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div  class="mstory">
      <!-- <div class="row">
        <div class="col s9"><a class="btn-floating btn-large waves-effect waves-light red right pulse"><i class="material-icons">add</i></a></div>
      </div> -->
   
    
     
     
     
     
      <div class="fixed-action-btn">
  <a  class="btn-floating btn-large waves-effect waves-light red right pulse">
    <router-link :to="{ name: 'AddStory' }">
    <i class="large material-icons">add</i>
       </router-link>
    </a>

</div>

    <div>
   <form class="card-panel z-depth-5">
       <h3 class="pink-text center">Manage Stories</h3>
              <div  v-show="admin" class="input-field col s12">
    <select  v-model="typeacc" >
      <option value="" disabled selected>Choose your option</option>
      <option value="all">All User</option>
        <option value="com">Communities</option>
      <option value="branch">Branches</option>
       <option value="admin">Admin</option>
    </select>
        <label>Select type of user</label>
    <button class="btn pink right"  @click.prevent=" getlist(typeacc)">Show list</button>
  </div>
            <table>
        <thead>
          <tr>
               <th>No</th>
              <th>Name Stories</th>
              <th>Date</th>
              <th>View Story</th>
              <th>Edit Story</th>
              <th>Remove Story</th>
              
          </tr>
        </thead>

        <tbody>
          <tr  v-for="(story,index) in displayedPosts" :key="story.id">
            <td>{{index +1}}</td>
             <td>{{story.title}}</td>
              <td>{{story.datecreate}}</td>
              <td><a><router-link :to="{ name: 'ViewStory', params: { id: story.id }}">View Story</router-link></a></td>
              <td><a><router-link  class="orange-text text-darken-4" :to="{ name: 'EditStory', params: { id: story.id }}">Edit Story</router-link></a></td>
              <td><a class="remove" @click.prevent="checkdeletestory(story.id,story.img)" >Delete Story</a></td>
          </tr>
        </tbody>
      </table>
      		<ul class="pagination  right-align">
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
      
    
    </form>//
  </div>
  </div>
 </div> 
</template>

<script>
import M from 'materialize-css'
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
  title: 'Manage Stories',
  name: 'ManageStory',
     mounted () {
     M.AutoInit()
},
  data(){
    return{
      posts: [],
      branch:null,
      admin:null,
      	page: 1,
			perPage: 6,
      pages: [],
      dell:'no',
      typeacc:'',	
      image:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/palestine-women.jpg?alt=media&token=e1adaccd-ef86-45b8-8dad-5aa14f9f2237'
     
    }
  },
  methods: {

    getlist(typeac){
       this.dell=null
      this.typeacc=typeac
      if(this.typeacc=='branch'){
              this.posts=[]
         db.collection('storys').where('acctype', '==', 'branch').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let story = doc.data()
        story.id = doc.id
        this.posts.push(story)
        
      })
    })

      }else if(this.typeacc=='admin'){
         this.posts=[]
                 db.collection('storys').where('acctype', '==', 'admin').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let story = doc.data()
        story.id = doc.id
        this.posts.push(story)
        
      })
    })

      }else if(this.typeacc=='com'){
         this.posts=[]
                 db.collection('storys').where('acctype', '==', 'community').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let story = doc.data()
        story.id = doc.id
        this.posts.push(story)
        
      })
    })
 

      }else{
         this.posts=[]
          db.collection('storys').orderBy('datecreate','desc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let story = doc.data()
        story.id = doc.id
        this.posts.push(story)
      })
    })

      }

    },

    getPosts (){   
  
        //check who user and fetch
    let userid = firebase.auth().currentUser.uid
        db.collection("users").doc(userid).get().then(doc =>{
     if(doc.data().acctype=='branch'|| doc.data().acctype=='admin'){
       if(doc.data().acctype=='admin'){
            this.branch=true
            this.admin=true
            console.log('admin')
                // fetch data from firestore
    db.collection('storys').orderBy('datecreate','desc').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let story = doc.data()
        story.id = doc.id
        this.posts.push(story)
      })
    })
       

       }else{
          this.branch=true
        console.log('branch')
                        // fetch data from firestore
    db.collection('storys').orderBy('datecreate','desc').where('userid', '==', userid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let story = doc.data()
        story.id = doc.id
        this.posts.push(story)
      })
    })
       
       }
       
     }else{
       this.branch=false
       this.admin=false
        console.log('community')
             db.collection('storys').orderBy('datecreate','desc').where('userid', '==', userid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let story = doc.data()
        story.id = doc.id
        this.posts.push(story)
      })
    }) 
     }
    })      

    },
    		setPages () {
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
    
        checkdeletestory(id,img){
          this.$swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.deletestory(id,img)
              this.$swal.fire(
                'Deleted!',
                'Your data has been deleted.',
                'success'
              )
            }
          })    
    },
    deletestory(id,img){

      if(img){
          firebase.storage().refFromURL(img).delete().then(()=>{

           db.collection("storys").doc(id).delete().then(()=> {
            this.posts = this.posts.filter(donation => {
              return donation.id != id
                })
              })
      
         }).catch(function(error) {
          console.log(error)
           this.$router.push({ name: 'ErrorPage' })
        });
   

      }else{
                 db.collection("storys").doc(id).delete().then(()=> {
            this.posts = this.posts.filter(donation => {
              return donation.id != id
                })
              }).catch(function(error) {
          console.log(error)
           this.$router.push({ name: 'ErrorPage' })
        });
      }
  
    }
  },
  	computed: {
		displayedPosts () {
			return this.paginate(this.posts);
		}
	},
	watch: {
		posts () {
      if(this.dell){
        this.setPages();
      }else{
        console.log(this.dell)
      }
			
		}
	},
	created(){
      db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
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
.bg{
  height: 1150px;
  background-size: cover;
 
}

.mstory .card-panel{
  margin-top: 50px;
margin-left:125px ;
margin-right:100px ;

 
}
.mstory form{
  margin-bottom: 50px; 
  margin-top: 100px;


 
}


.mstory h2{
  font-size: 2.4em;
}
.mstory .field{
  margin-bottom: 16px;
}
.mstory .remove{
  color: red;
  cursor: pointer;
}


button.page-link {
   margin: 1px;
    font-size: 20px;
    color:rgb(1, 0, 65);
    cursor: pointer;
}
.offset{
  width: 500px !important;
  margin: 20px auto;  
}



</style>