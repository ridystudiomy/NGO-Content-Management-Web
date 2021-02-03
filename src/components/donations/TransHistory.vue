<template>
 <div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div  class="transhistory">

    <div>
   <form class="card-panel z-depth-5">
      <div  id="printMe" >
       <h3 class="pink-text center">Transcation History</h3>
       <div>
         <p> <b>Project Name:</b>  {{donatedetail.title}} </p>
         <p> <b>Date:</b>  {{donatedetail.datecreate}} </p>
         <p> <b>Current Fund:</b>  {{donatedetail.curfund}}$ </p>
         <p> <b>Total Fund:</b>  {{donatedetail.fundneed}}$ </p>
        </div> 
            <table>
        <thead>
          <tr>
               <th>No</th>
             
               <th>Donater</th>
              <th>Amount $</th>
              <th>Time</th>
              <th>Transcation ID</th>
              <th>platform</th>
              <th>Status</th>
             
              
          </tr>
        </thead>

        <tbody>
          <tr  v-for="(part,index) in displayedPosts" :key="part.id">
            <td>{{index +1}}</td>
         
              <td>{{part.donatorname}}</td>
               <td>{{part.total}}</td>
               <td>{{part.time}}</td>
                <td>{{part.transid}}</td>
                 <td>{{part.plaform}}</td>
               <td  class="green-text" >{{part.status}}</td>
             
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
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
import db from '@/firebase/init'
export default {
  title: 'Transcation History',
  name: 'TransHistory',
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
      output:null,
      donatedetail:null
     
    }
  },
  methods: {
        print () {
      // Pass the element id here
      this.$htmlToPaper('printMe');
    },

  getPosts (){
     
         db.collection("transcations").where("projectid", "==", this.$route.params.id).orderBy('time')
    .get()
    .then(snapshot =>{
        snapshot.forEach(doc => {
           
           this.projectname = doc.data().projectname 
           let project=doc.data()
           project.id = doc.id
           
          
           this.posts.push(project)
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

        db.collection('donations').doc(this.$route.params.id).get().then(doc =>{
        this.donatedetail = doc.data()
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
.transhistory .card-panel{
  margin-top: 50px;
margin-left:125px ;
margin-right:100px ;

  

 
}
.transhistory form{
  margin-bottom: 50px; 
  margin-top: 100px;
  
}

.transhistory h2{
  font-size: 2.4em;
}
.transhistory .field{
  margin-bottom: 16px;
}
.transhistory .remove{
  color: red;
  cursor: pointer;
}
.transhistory .approve{
    color: green;
    cursor: pointer;
    font-size: 2rem;
}

.transhistory .reject{
    color: red;
    cursor: pointer;
    font-size: 2rem;
}

.transhistory p{
   font-size: 1.5rem;

}
</style>