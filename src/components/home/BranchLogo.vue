<template>
  <div class="branchlogo container">
  <div class="card-image" v-for="logo in logos" :key="logo.id">
    <a  :href="logo.officialweb"><img :src="logo.profilepic" alt="GWCQP BRANCH" ></a>
  </div> 
  </div>
</template>

<script>
 // eslint-disable-next-line no-unused-vars
import db from '@/firebase/init'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
import M from 'materialize-css'
export default {
  name: 'BranchLogo',
      mounted () {
     M.AutoInit()
},
  data(){
    return{
        logos:[],

      
        
    }
  },
  created(){

 // eslint-disable-next-line no-unused-vars
   
       db.collection("users")
    // .where("acctype", "==", "branch")
    .get()
    .then(snapshot =>{
      
        snapshot.forEach(doc => {
           
          let logo=doc.data()
          logo.id = doc.id
         
           this.logos.push(logo)
            
       
        })
         
    })


  },
   methods: { 

   }
    

}
</script>

<style>
.branchlogo{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr  1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}
.branchlogo h2{
  font-size: 1.8em;
  text-align: center;
  margin-top: 0;
}
.branchlogo .descriptions{
  margin: 30px auto;
}
.branchlogo .card-image li{
  display: inline-block;
}

.branchlogo .card-image img{
  width:100px ;
  height:100px ;
  border-radius:50% ;
}
</style>