<template>
<div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div class="userprofile container">
     <div class="card-panel  z-depth-5">
        <h1 :class="headerdsv" >About {{info.name}}</h1>
        <button :class="btnhome"><router-link class="black-text" :to="{ name: 'Profile', params: {id: info.userid}}">View Profile</router-link></button>
         <div class="row">
           
             <div  v-if="info" class="col s6 kiri"><img  class="center-align" :src="info.profilepic" alt="">
              
             <form  @submit.prevent="edit">
        <ul class="row">
             
        <li class="col s6">Account Type:</li>
        <li class="col s6  blue-text ">{{info.acctype}}</li>
        <li class="col s6 ">Name:</li>
        <li class="col s6  blue-text">{{info.name}}</li>
        <li class="col s6 ">Sex:</li>
        <li class="col s6  blue-text">{{info.sex}}</li>
        <li class="col s6 ">Address:</li>
        <li class="col s6  blue-text">{{info.address}}</li>
        <li class="col s6  ">Contact:</li>
        <li class="col s6  blue-text">{{info.contact}}</li>
        </ul>
          <button :class="btnhome"><router-link class="black-text" :to="{ name: 'UpdateProfile', params: {id: info.userid}}">Edit Profile</router-link></button>
         
    </form>
             
             </div>
             
            <div class="col s6 kanan" >
              <h2>Current Point:<b class="green-text">{{info.point}}</b></h2>
              <h2 v-if="admin||branch" >List Completed Volunteer Projects</h2>
              <h2 v-else >List of project joined</h2>
                  <ul v-for="(vproject,index) in vprojects" :key="vproject.id" >
                      <li>{{index+1}}.<router-link class="blue-text" :to="{ name: 'ViewVproject', params: {id: vproject.id}}">{{vproject.title}}</router-link></li>
                  </ul>
               
            
            
            </div>
         </div>  
     </div> 
  </div>
</div>  
</template>

<script>

import db from '@/firebase/init'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
export default {
  title: 'Manage Profile',
  name: 'UserProfile',

  data(){
    return{
      info:null,
      image:'',
      vprojects:[],
      headerdsv:null,
      btnhome:null


    }
  },
  created(){
      db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
        this.headerdsv = doc.data().headerdsv
         this.btnhome = doc.data().btnhome       
     })
   
     db.collection('users').doc(this.$route.params.id).get().then(doc =>{
        this.info = doc.data()
     })

     //get 
           
    var userid = firebase.auth().currentUser.uid


       db.collection("users").doc(userid).get().then(doc =>{
    
     if(doc.data().acctype=='branch'|| doc.data().acctype=='admin'){
       if(doc.data().acctype=='admin'){
            this.branch=true
            this.admin=true
            console.log('admin')
            db.collection('vprojects').orderBy('datecreate','desc').where('acctype', '==','admin').get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                // check which project status
                if(doc.data().status =='complete'){
                  let vproject = doc.data()
                  vproject.id = doc.id
                 this.vprojects.push(vproject)

                }
              
      })
    })
       

       }else{
          this.branch=true
        console.log('branch')
       }
       
     }else{
       this.branch=false
       this.admin=false
        console.log('community') 
        //find doc in participants which have current user
                db.collection('participants').where('userid', '==', userid).get()
         //snapshot mean take all the documents       
    .then(snapshot => {
      //loop each document
      snapshot.forEach(doc => {
        //let the pink hold the currrent doc
        let pink=doc.id
      //get the volunteer project which have list of the particpant doc = pink
             db.collection('vprojects').orderBy('datecreate','desc').where('listvon', 'array-contains', pink).get()
             //snapshot= take all the documents
    .then(snapshot => {
      // loop to check either the project already complete or not
      snapshot.forEach(doc => {
        //if complete push the doc detail in volunteer project local variable loop again 
      if(doc.data().status =='complete'){
                  let vproject = doc.data()
                  vproject.id = doc.id
                 this.vprojects.push(vproject)

                }
        
      })
    })
      })
    })
     }
    
    })

  },

  methods: {
    login(){
      
    }
  }
}
</script>

<style>
.userprofile form{
padding-left: 10px;  
margin-top:100px ;
margin-bottom:100px ;
width: auto;
}
.userprofile h1{
  font-size: 4.4em;
  font-weight:bolder;
}
.userprofile .field{
  margin-bottom: 16px;
}
.userprofile li {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: larger;
}
.kiri img{
  width: 350px;
  height: 350px;
}

.kanan h2{
  font-weight:bold;
  font-size: 2em;
   
}

</style>