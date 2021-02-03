<template>
<div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div v-show="iamadmin" class="manageuser">
   <div class="vld-parent" ref="formContainer">
                   <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
       
      
         <form class="card-panel"  @submit.prevent="getlist(typeacc)">
             <h1 class="pink-text center" >Manage Users</h1>
   <div class="row bat">                                   <!-- Modal Trigger -->
  <a class="btn pink lighten-4  waves-effect waves-light btn-small modal-trigger" href="#modal1">Add Admin/Branch</a>

   </div>
    <div id="modal1" class="modal">
    <div class="modal-content">
      <form class="card-panel" @submit.prevent="addacc">
      <h1 class="center pink-text">Add Branch</h1>
        <div class="field">
    <select v-model="typeaccs">
      <option value="" disabled selected>Choose type account</option>
      <option value="admins">Admin</option>
      <option value="branchs">Branch</option>
    </select>
    
  </div>      
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <div class="field">
        <label for="name">Alias</label>
        <input id="name" type="text" v-model="alias">
      </div>
        <div class="field">
    <select v-model="gender">
      <option value="" disabled selected>Choose your Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    
  </div>
       <div class="field">
        <label for="contact">Contact</label>
        <input id="contact" type="text" v-model="contact">
      </div>
            <div>
        <country-select class="validate" required="" aria-required="true"  v-model="country" :country="country" topCountry="US" />
      </div> 
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button class="btn pink">Add Branch</button>
      </div>
    </form>
    </div>
    <div class="modal-footer">
     
    </div>
  </div>

   
             
               
                <div class="card">
                  
               <div class="card-title">
         
                </div>
                <div class="card-content">
                  <span>List Of User</span>
                          <div class="input-field">
    <select v-model="typeacc">
      <option value="" disabled selected>Choose Account Type</option>
      <option value="community">Community</option>
      <option value="branch">Branch</option>
     <option value="admin">Admin</option>
    </select>
    <label>Acctype</label>
     <button class="btn pink right">Show Users</button>
  </div>

      <table>
        <thead>
          <tr>
               <th>No</th>
              <th>Name User</th>
              <th>Type of Account</th>
              <th>View User</th>
              <th>Delete User User</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(project,index) in displayedPosts" :key="project.userid">
            <td>{{index +1}}</td>
             <td>{{project.name}}</td>
              <td>{{project.acctype}}</td>
              <td><a><router-link :to="{ name: 'Profile', params: {id:project.userid}}">View User</router-link></a></td>
                            <td><i class="material-icons delete" @click.prevent="checkdeleteUser(project.userid,project.name)" >delete</i></td>
          </tr>
        </tbody>
      </table>
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
              </div>   

    </form>
   </div> //sini
  </div>
</div>  
</template>

<script>
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import M from 'materialize-css'
 // eslint-disable-next-line no-unused-vars
import db from '@/firebase/init'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
 // eslint-disable-next-line no-unused-vars
import functions from 'firebase/functions'


export default {
    title: 'Manage Users',
  name: 'ManagerUser',
  
    mounted () {
     M.AutoInit()
},
  data(){
    return{
        projects:[],
        tproject:null,
        typeacc:null,
        image:'',
       posts: [],
      page: 1,
			perPage: 6,
      pages: [],
      dell:'no',
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null,
      contact:null,
      gender:null,
      emailadmin:null,
      typeaccs:'',
      emailbranch:null,
      iamadmin:false,
      isLoading: false,
      fullPage: true,
      country:''
        
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
    setbranch(emailbranch){
       
      let addBranchRole = firebase.functions().httpsCallable('addBranchRole')
      addBranchRole({email:emailbranch}).then(result => {
        console.log(result)
      })
      
    

    },    
    setadmin(emailadmin){
      
      let addAdminRole = firebase.functions().httpsCallable('addAdminRole')
      addAdminRole({email:emailadmin}).then(result => {
        console.log(result)
      })
    

    },
    makebranch(emailbranch){
       
      let addBranchRole = firebase.functions().httpsCallable('addBranchRole')
      addBranchRole({email:emailbranch}).then(result => {
        console.log(result)
      })
    

    },    
    makeadmin(emailadmin){
      
      let addAdminRole = firebase.functions().httpsCallable('addAdminRole')
      addAdminRole({email:emailadmin}).then(result => {
        console.log(result)
      })
    

    },
    checkdeleteUser(userid,name){
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
              this.deleteUser(userid,name)
              this.$swal.fire(
                'Deleted!',
                'Your user has been deleted.',
                'success'
              )
            }
          })  
    },
     // eslint-disable-next-line no-unused-vars
    deleteUser(userid,name){
      this.isLoading = true; 
        let deleteUsers = firebase.functions().httpsCallable('deleteUsers')
      deleteUsers({uid:userid}).then(() => {
         this.posts =this.posts.filter(story => {
              return story.userid != userid
           })
      }).catch(err =>{
        this.isLoading = false;
       this.$swal.fire(  'Fail deleted '+err+' Account',
                      '',
                      'success')        
      })
     db.collection('users').doc(userid).delete().then(()=>{
       this.isLoading = false;
       this.$swal.fire(  'Success deleted '+name+' Account',
                      '',
                      'success')
     })
    

    },
    
     addacc(){
      this.isLoading = true;
        let createUser = firebase.functions().httpsCallable('createUser')
        if(this.typeaccs=='admins'){
          createUser({email:this.email,password:this.password}).then(result => {
            db.collection('users').doc(result.data.message).set({
                  name: this.alias,
                  sex: this.gender,
                  address:'',
                  contact:this.contact,
                  tprojectjoin:0,
                  acctype:'admin',
                  userid:result.data.message,
                  profilepic:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/blank-profile-picture-973460_640.png?alt=media&token=9ddd6547-e1c9-4f8a-a157-b419cfcf6782',
                  fbpage:'',
                  officialweb:'',
                  country:this.country,
                  nnotification:null,
                  point:500,
                  TVol:null,
                  TDon:null,

                }).then(
                  //setaccesstokenofadmin
                  this.makeadmin(result.data.emails),
                  this.isLoading = false,
                  this.$swal.fire(  'Success create Admin Account',
                      'success')

                )       
             })
        }else{
          createUser({email:this.email,password:this.password}).then(result => {
            db.collection('users').doc(result.data.message).set({
                  name: this.alias,
                  sex: this.gender,
                  address:'',
                  contact:this.contact,
                  tprojectjoin:0,
                  acctype:'branch',
                  userid: result.data.message,
                  profilepic:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/blank-profile-picture-973460_640.png?alt=media&token=9ddd6547-e1c9-4f8a-a157-b419cfcf6782',
                  officialweb:'',
                  fbpage:'',
                  country:this.country,
                  nnotification:null,
                  point:500,
                  TVol:null,
                  TDon:null,                  

                }).then(
                  this.makebranch(result.data.emails),
                  this.isLoading = false,
                  this.$swal.fire(  'Success create Branch Account',
                      '',
                      'success')
                )       
             })
          
        }       
    },


        getlist(typeac){
       this.dell=null
      this.typeacc=typeac
      if(this.typeacc=='admin'){
              this.posts=[]
    db.collection('users').where('acctype', '==', 'admin').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let story = doc.data()
        story.id = doc.id
         console.log(story)
        this.posts.push(story)
        console.log()
        
      })
    })

      }else if(this.typeacc=='branch'){
         this.posts=[]
    db.collection("users").where("acctype", "==",'branch').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let donation = doc.data()
        this.posts.push(donation)
      })
    })    

      }else{
        this.posts=[]
            db.collection("users").where("acctype", "==",'community').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let donation = doc.data()
        this.posts.push(donation)
      })
    })    

      }

    },
    
    getPosts (){   
    // fetch data from firestore
    db.collection("users").get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let donation = doc.data()
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
      let user = firebase.auth().currentUser
      user.getIdTokenResult().then(idTokenResult => {
       this.iamadmin=idTokenResult.claims.admin
      })
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

.manageuser .card-panel{
  margin-top: 50px;
margin-left:125px ;
margin-right:100px ;

 
}
.manageuser form{

  margin-bottom: 50px; 
  margin-top: 100px;
}
.manageuser h2{
  font-size: 2.0em;
}
.manageuser .field{
  margin-bottom: 16px;
}
.manageuser h2{
  font-family: Helvetica;
  font-size: 1.6em;

}
.manageuser span{
  font-weight: bold;
  font-size: 1.3em;
}
.manageuser h1{
  font-family: Helvetica;
  font-size: 3.89em;

}
.manageuser .delete{
  color: #ff0000;
  cursor: pointer;
 
}
.manageuser  .input-field{
    width:cover;
}
.bat .btn{
  margin: 10px;
}
</style>