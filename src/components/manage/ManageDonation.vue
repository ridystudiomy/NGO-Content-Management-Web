<template>
 <div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div  class="Donations">
      <!-- <div class="row">
        <div class="col s9"><a class="btn-floating btn-large waves-effect waves-light red right pulse"><i class="material-icons">add</i></a></div>
      </div> -->
   
    
     
     
      <div class="fixed-action-btn">
  <a class="btn-floating btn-large waves-effect waves-light red right pulse">
    <router-link :to="{ name: 'AddDonation' }">
    <i class="large material-icons">add</i>
       </router-link>
    </a>

</div>
    <div>
   <form class="card-panel z-depth-5">
       <h3 class="pink-text center">Manage Donation</h3>
              <div  v-show="admin" class="input-field col s12">
    <select  v-model="typeacc" >
      <option value="" disabled selected>Choose your option</option>
      <option value="branch">Branches</option>
       <option value="admin">Admin</option>
    </select>
    <label>Select type of user</label>
    <button class="btn pink right" @click.prevent="getlist(typeacc)">Show list</button>
  </div>
            <table>
        <thead>
          <tr>
               <th>No</th>
              <th>Name Donation Projects</th>
              <th>Date Project</th>
              <th>View Project</th>
              <th>Edit Project</th>
              <th>Transcation History</th>
              <th>Remove Project</th>
              
          </tr>
        </thead>

        <tbody>
          <tr  v-for="(donation,index) in displayedPosts" :key="donation.id">
            <td>{{index +1}}</td>
             <td>{{donation.title}}</td>
              <td>{{donation.datecreate}}</td>
              <td><a><router-link :to="{ name: 'ViewDonation', params: { id: donation.id }}">View Project</router-link></a></td>
              <td><a><router-link class="orange-text text-darken-4" :to="{ name: 'EditDonation', params: { id: donation.id }}">Edit Project</router-link></a></td>
              <td><a><router-link  class="green-text text-darken-2" :to="{ name: 'TransHistory', params: { id: donation.id }}">View Transcations</router-link></a></td>
              <td><a class="remove" @click.prevent="checkdeleteDonation(donation.id,donation.img)" >Delete Project</a></td>
          </tr>
        </tbody>
      </table>
    		<ul class="pagination right-align">
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
    
    </form>
  </div>
  </div>
 </div> 
</template>

<script>
import M from 'materialize-css'
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
    title: 'Manage Donation',
  name: 'ManageDonation',
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
      typeuser:'',
      typeacc:'',
      branch:null,
      admin:null,
      image:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/palestine-women.jpg?alt=media&token=e1adaccd-ef86-45b8-8dad-5aa14f9f2237'
     
    }
  },
  methods: {
        getlist(typeac){
       this.dell=null
      this.typeacc=typeac
      if(this.typeacc=='branch'){
              this.posts=[]
         db.collection('donations').where('acctype', '==', 'branch').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let story = doc.data()
        story.id = doc.id
        this.posts.push(story)
        
      })
    })

      }else if(this.typeacc=='admin'){
         this.posts=[]
                 db.collection('donations').where('acctype', '==', 'admin').get()
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
    db.collection('donations').orderBy('datecreate','desc').get()
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
    db.collection('donations').orderBy('datecreate','desc').where('userid', '==', userid).get()
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
        

     }
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
    checkdeleteDonation(id,img){
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
              this.deleteDonation(id,img)
              this.$swal.fire(
                'Deleted!',
                'Your data has been deleted.',
                'success'
              )
            }
          })       
    },
    deleteDonation(id,img){

      if(img){
          firebase.storage().refFromURL(img).delete().then(()=>{

           db.collection("donations").doc(id).delete().then(()=> {
            this.posts = this.posts.filter(donation => {
              return donation.id != id
                })
              })
      
         }).catch(function(error) {
          console.log(error)
           this.$router.push({ name: 'ErrorPage' })
        });
   

      }else{
                 db.collection("donations").doc(id).delete().then(()=> {
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
      
      this.setPages();
			
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
.Donations .card-panel{
  margin-top: 50px;
margin-left:125px ;
margin-right:100px ;

 
}
.Donations form{
  margin-bottom: 50px; 
  margin-top: 100px;


 
}

.Donations h2{
  font-size: 2.4em;
}
.Donations .field{
  margin-bottom: 16px;
}
.Donations .remove{
  color: red;
  cursor: pointer;
}
</style>