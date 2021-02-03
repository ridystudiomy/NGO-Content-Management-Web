<template>
 <div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div  class="Mparti">

    <div>
   <form class="card-panel z-depth-5">
      <div  id="printMe" >
       <h3 class="pink-text center">Manage {{projectname}} Participants </h3>
       
            <table>
        <thead>
          <tr>
               <th>No</th>
              <th>Name Participant</th>
              <th>Contact</th>
              <th>View Participant</th>
              <th>Status</th>
             
              
          </tr>
        </thead>

        <tbody>
          <tr  v-for="(part,index) in displayedPosts" :key="part.id">
            <td>{{index +1}}</td>
             <td>{{part.name}}</td>
              <td>{{part.contact}}</td>
              <td><a><router-link :to="{ name: 'UserProfile', params: { id: part.userid }}">View User</router-link></a></td>
              <td v-if="part.status=='approve'" class="green-text">Approved</td>
              <td v-else-if="part.status=='reject'" class="red-text">Rejected</td>
             <td v-else><i @click.prevent="approve(part.id,part.name,part.contact,part.userid)" class="material-icons approve">check</i> <i @click.prevent="reject(part.id)" class="material-icons reject">clear</i></td>
          </tr>
        </tbody>
      </table>
      <br>
      <br>
      </div>
      <div class="center">
      <button class="btn" @click="print">Print</button>
       </div>
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
import db from '@/firebase/init'
export default {
  title: 'Manage Participants',
  name: 'ManagePart',
  mounted () {
     M.AutoInit()
},
  data(){
    return{
      projectname:'',
      parts:[],
      status:'',
      posts: [],
      page: 1,
			perPage: 6,
      pages: [],
      dell:'no',
      image:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/palestine-women.jpg?alt=media&token=e1adaccd-ef86-45b8-8dad-5aa14f9f2237',
      output:null
     
    }
  },
  methods: {
        print () {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    },
 // eslint-disable-next-line no-unused-vars
      approve(id,newname,newcontact,newuserid){
         
            db.collection('participants').doc(id).update({
           status:'approve'
         }).then(()=>{
          this.posts = this.posts.filter(item => {
              return item.id != id
            }) 
           this.posts.push({
                            name:newname,
                            contact:newcontact,
                            status:"approve",
                            id:id,
                            userid:newuserid
                        }) 
         })
        

      },
      
      reject(id,newname,newcontact,newuserid){
            
            db.collection('participants').doc(id).update({
           status:'reject'
         }).then(()=>{
          this.posts = this.posts.filter(item => {
              return item.id != id
            }) 
           this.posts.push({
                            name:newname,
                            contact:newcontact,
                            status:"reject",
                            id:id,
                            userid:newuserid
                        }) 
         })
        
      },
       getPosts (){
         
      db.collection('vprojects').doc(this.$route.params.id).get()
    .then(doc => {
        this.projectname=doc.data().title
         let part=doc.data().listvon
         console.log()
            for(let i=0 ; i<part.length;i++){
                    db.collection("participants").doc(part[i]).get().then(doc =>{
                        this.posts.push({
                            name:doc.data().name,
                            contact:doc.data().contact,
                            status:doc.data().status,
                            id:doc.id,
                            userid:doc.data().userid


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
.Mparti .card-panel{
  margin-top: 50px;
margin-left:125px ;
margin-right:100px ;

  

 
}
.Mparti form{
  margin-bottom: 50px; 
  margin-top: 100px;
  
}

.Mparti h2{
  font-size: 2.4em;
}
.Mparti .field{
  margin-bottom: 16px;
}
.Mparti .remove{
  color: red;
  cursor: pointer;
}
.Mparti .approve{
    color: green;
    cursor: pointer;
    font-size: 2rem;
}

.Mparti .reject{
    color: red;
    cursor: pointer;
    font-size: 2rem;
}
</style>