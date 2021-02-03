<template>
 <div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
   <div class="vld-parent" ref="formContainer">
                   <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
  <div  class="mstory">
     
      <div v-show="admin||branch"  class="fixed-action-btn">
  <a class="btn-floating btn-large waves-effect waves-light red right pulse">
    <router-link :to="{ name: 'AddVproject' }">
    <i class="large material-icons">add</i>
       </router-link>
    </a>

</div>
    <div>
   <form class="card-panel z-depth-5" @submit.prevent="getlist(typeacc)">

<h3 class="pink-text center">Manage Volunteer Project</h3>
      


       <h5 v-show="!branch&&!admin" class="red-text">You only can join 3 projects at the same time</h5>
       <div  v-show="admin" class="input-field col s12">
    <select  v-model="typeacc" >
      <option value="" disabled selected>Choose your option</option>
      <option value="branch">Branches</option>
       <option value="admin">Admin</option>
    </select>
    <label>Select type of user</label>
    <button class="btn pink right">Show list</button>
  </div>
              <table v-if="admin||branch" > 
                
        <thead>
          <tr>
               <th>No</th>
              <th>Name  Projects</th>
              <th>Date Project</th>
              <th>Manage Project</th>
              <th >Manage Participant</th>
               <th >Project Status</th>
             
              
          </tr>
        </thead>

        <tbody>
          <tr  v-for="(vproject,index) in displayedPosts" :key="index">
            <td>{{index +1}}</td>
             <td>{{vproject.title}}</td>
              <td>{{vproject.datecreate}}</td>
              <td><a><router-link :to="{ name: 'ViewVproject', params: { id: vproject.id }}">View Project</router-link></a><br>
              <a><router-link  class="orange-text text-darken-4" :to="{ name: 'EditVproject', params: { id: vproject.id }}">Edit Project</router-link></a><br>
              <a class="remove red-text" @click.prevent="checkdeletestory(vproject.id,vproject.img)" >Delete Project</a></td>
              <td><a><router-link  class="btn small white-text" :to="{ name: 'ManagePart', params: { id: vproject.id }}">Manage Participants</router-link></a></td>
              <td v-if="vproject.status=='incomplete'" ><a class="remove green-text" @click.prevent="complete(vproject.id)" >Click to Complete project</a></td>
              <td v-else class="red-text">Project Complete</td>

              
          </tr>
        </tbody>
      </table>
     
      
              <table v-if="!admin&&!branch" > 
        <thead>
          <tr>
               <th>No</th>
              <th>Name  Projects</th>
              <th>Date Project</th>
              <th>View Project</th>
              <th >Status Project Project</th>
              <th>Withdraw Project</th>
              
          </tr>
        </thead>

        <tbody>
          <tr  v-for="(vproject,index) in displayedPosts" :key="vproject.id">
            <td>{{index +1}}</td>
             <td>{{vproject.title}}</td>
              <td>{{vproject.datecreate}}</td>
              <td><a><router-link :to="{ name: 'ViewVproject', params: { id: vproject.id }}">View Project</router-link></a></td>
              <td v-if="vproject.status=='approve'" class="green-text">Approved</td>
              <td v-else-if="vproject.status=='pending'" class="blue-text">Pending</td>
              <td v-else-if="vproject.status=='complete'" class="red-text">Project Complete</td>
              <td v-else class="red-text">Rejected</td>
              <td><a class="remove red-text" @click.prevent="confirm(vproject.id,vproject.pid,vproject.pjoin)" >Withdraw Project</a></td>
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
 </div> 
</template>


<script>
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import M from 'materialize-css'
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
    title: 'Manage Volunteer Projects',
  name: 'ManageVproject',
   mounted () {
     M.AutoInit()
},
  data(){
    return{
      vprojects: [],
      posts: [],
      page: 1,
			perPage: 6,
      pages: [],
      dell:'no',
      typeuser:'',
      typeacc:'',
      projectids:[],
      branch:null,
      admin:null,
      image:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/palestine-women.jpg?alt=media&token=e1adaccd-ef86-45b8-8dad-5aa14f9f2237',
      isLoading: false,
      fullPage: true 
     
    }
  },
   components: {
            Loading
        }, 
  methods: {
     doAjax() {
        this.isLoading = true;
                 
     },
   onCancel() {
              console.log('User cancelled the loader.')
    },
        complete(id){

      this.isLoading = true;
      var listpar;
      
         db.collection('vprojects').doc(id).update({
        status:'complete'
       }).then(()=>{
              db.collection('vprojects').doc(id).get().then(doc =>{
             listpar=doc.data().listvon
       }).then(()=> {
             for(let i=0 ; i<listpar.length;i++){
                 
                 db.collection('participants').doc(listpar[i]).update({
                  status:'complete'
                })
                  db.collection('participants').doc(listpar[i]).get().then(doc =>{
                   
                   db.collection('users').doc(doc.data().userid).update({
                      point:firebase.firestore.FieldValue.increment(100)
                    })
                  }) 
             }
              this.isLoading = false; 
        
  
            })
            
          
       })
           
    },
    confirm(id,pid,pjoin){

          this.$swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, withdraw!'
          }).then((result) => {
            if (result.isConfirmed) {
              this.withdraw(id,pid,pjoin)
              this.$swal.fire(
                'Deleted!',
                'Succes Withdraw.',
                'success'
              )
            }
          })      
        
    },
        withdraw(id,pid,pjoin){
         
      let userid = firebase.auth().currentUser.uid
      var newpjoin =pjoin-1
       db.collection('users').doc(userid).update({
         tprojectjoin:newpjoin
       })

       db.collection('vprojects').doc(id).update({
         listvon: firebase.firestore.FieldValue.arrayRemove(pid)
       })
       
       db.collection('participants').doc(pid).delete().then(() =>{
           this.posts =this.posts.filter(vproject => {
              return vproject.id != id
           })

         })
            

    },

    getlist(typeac){
       this.dell=null
      this.typeacc=typeac
      if(this.typeacc=='branch'){
              this.posts=[]
         db.collection('vprojects').where('acctype', '==', 'branch').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let story = doc.data()
        story.id = doc.id
        this.posts.push(story)
        
      })
    })

      }else if(this.typeacc=='admin'){
         this.posts=[]
                 db.collection('vprojects').where('acctype', '==', 'admin').get()
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
           
                // fetch data from firestore
     const unlisten = db.collection("vprojects").orderBy('datecreate','desc').onSnapshot(querySnapshot => {
    const allvouchers = querySnapshot
                    .docs.map((doc)=>({
                      id:doc.id,
                      ...doc.data(),
                    }));
                    
                    
                 this.posts=allvouchers
  })
   return ()  => unlisten()
       

       }else{
          this.branch=true
       
                        // fetch data from firestore
    // db.collection('vprojects').orderBy('datecreate','desc').where('userid', '==', userid).get()
    // .then(snapshot => {
    //   snapshot.forEach(doc => {
    //     let story = doc.data()
    //     story.id = doc.id
    //     this.posts.push(story)
    //   })
    // })
       

  const unlisten = db.collection("vprojects").orderBy('datecreate','desc').where('userid', '==', userid).onSnapshot(querySnapshot => {
    const allvouchers = querySnapshot
                    .docs.map((doc)=>({
                      id:doc.id,
                      ...doc.data(),
                    }));
                    
                    
                 this.posts=allvouchers
  })
   return ()  => unlisten()

       }
       
     }else{
       this.branch=false
       this.admin=false
       
        
       db.collection("users").doc(userid).get().then(doc =>{
      var totaljoin=doc.data().tprojectjoin
        console.log('community')
        db.collection('participants').where('userid', '==', userid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let partdocid=doc.id
        let getstatus=doc.data().status
             db.collection('vprojects').orderBy('datecreate','desc').where('listvon', 'array-contains', partdocid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let vproject = doc.data()
        
        vproject.id = doc.id
         vproject.status = getstatus
         vproject.pid=partdocid
          vproject.pjoin=totaljoin

        this.posts.push(vproject)
        
        
      })
    })
      })
    })
    })
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

           db.collection("vprojects").doc(id).delete().then(()=> {
            this.posts = this.posts.filter(donation => {
              return donation.id != id
                })
              })
      
         }).catch(function(error) {
          console.log(error)
           this.$router.push({ name: 'ErrorPage' })
        });
   

      }else{
                 db.collection("vprojects").doc(id).delete().then(()=> {
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
</style>