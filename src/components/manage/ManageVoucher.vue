<template>
 <div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div  class="managevoucher">
      <!-- <div class="row">
        <div class="col s9"><a class="btn-floating btn-large waves-effect waves-light red right pulse"><i class="material-icons">add</i></a></div>
      </div> -->
   
    
     
     
      <div class="fixed-action-btn">
  <a class="btn-floating btn-large waves-effect waves-light red right pulse">
    <router-link :to="{ name: 'AddVoucher' }">
    <i class="large material-icons">add</i>
       </router-link>
    </a>

</div>
    <div>
   <form class="card-panel z-depth-5">
       <h3 class="pink-text center">Manage Vouchers</h3>
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
              <th>Name Vouchers</th>
              <th>Date Expired</th>
              <th>Total Vouchers</th>
              <th>Require Point</th>
              <th>Edit Vouchers</th>
              <th>Remove Vouchers</th>
              
          </tr>
        </thead>

        <tbody>
          <tr  v-for="(voucher,index) in displayedPosts" :key="voucher.id">
            <td>{{index +1}}</td>
             <td>{{voucher.namev}}</td>
              <td>{{voucher.expired}}</td>
              <td>{{voucher.totalv}}</td>
              <td>{{voucher.reqpoint}}</td>
              <td><a><router-link :to="{ name: 'EditVoucher', params: { id: voucher.id }}">Edit Voucher</router-link></a></td>
              <td><a class="remove" @click.prevent="checkdeleteVoucher(voucher.id)" >Delete Voucher</a></td>
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
    title: 'Manage Voucher',
  name: 'ManageVoucher',
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
         const unlisten = db.collection("vouchers").orderBy('expired','desc').where('acctype', '==', 'branch').onSnapshot(querySnapshot => {
    const allvouchers = querySnapshot
                    .docs.map((doc)=>({
                      id:doc.id,
                      ...doc.data(),
                    }));
                    
                    
                 this.posts=allvouchers
  })
   return ()  => unlisten()

      }else if(this.typeacc=='admin'){
         this.posts=[]
         const unlisten = db.collection("vouchers").orderBy('expired','desc').where('acctype', '==', 'admin').onSnapshot(querySnapshot => {
    const allvouchers = querySnapshot
                    .docs.map((doc)=>({
                      id:doc.id,
                      ...doc.data(),
                    }));
                    
                    
                 this.posts=allvouchers
  })
   return ()  => unlisten()

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
         const unlisten = db.collection("vouchers").orderBy('expired','desc').onSnapshot(querySnapshot => {
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
        console.log('branch')
                        // fetch realtime data from firestore
         const unlisten = db.collection("vouchers").orderBy('expired','desc').where('userid', '==', userid).onSnapshot(querySnapshot => {
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
  checkdeleteVoucher(id){
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
              this.deleteVoucher(id)
              this.$swal.fire(
                'Deleted!',
                'Your data has been deleted.',
                'success'
              )
            }
          }) 
  },
    deleteVoucher(id){

       db.collection("vouchers").doc(id).delete().then(()=> {
            this.posts = this.posts.filter(donation => {
              return donation.id != id
                })
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
.managevoucher .card-panel{
  margin-top: 50px;
margin-left:125px ;
margin-right:100px ;

 
}
.managevoucher form{
  margin-bottom: 50px; 
  margin-top: 100px;


 
}

.managevoucher h2{
  font-size: 2.4em;
}
.managevoucher .field{
  margin-bottom: 16px;
}
.managevoucher .remove{
  color: red;
  cursor: pointer;
}
</style>