<template>
<div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div class="signup container">
    <form class="card-panel z-depth-5" @submit.prevent="signup">
      <h2 :class="headerdsv">Sign up</h2>
      <p>Want to be our branch?Please contact <b class="blue-text" >gwcqp@gmail.com</b>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" class="validate" required="" aria-required="true" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" class="validate" required="" aria-required="true" v-model="password">
      </div>
      <div class="field">
        <label for="name">Alias</label>
        <input id="name" type="text" class="validate" required="" aria-required="true" v-model="alias">
      </div>
        <div class="field">
    <select class="validate" required="" aria-required="true" v-model="gender">
      <option value="" disabled selected>Choose your Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
    
  </div>
       <div class="field">
        <label for="contact">Contact</label>
        <input id="contact" class="validate" required="" aria-required="true" type="text" v-model="contact">
      </div>
      <div>
        <country-select class="validate" required="" aria-required="true"  v-model="country" :country="country" topCountry="US" />
      </div> 
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field center">
        <button :class="btnhome">Signup</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import M from 'materialize-css'
import db from '@/firebase/init'
import firebase from 'firebase'

export default {
  title: 'Register',
  name: 'Signup',
   mounted () {
     M.AutoInit()
   },
  data(){
    return{
      email: null,
      password: null,
      alias: null,
      feedback: null,
      slug: null,
      contact:null,
      gender:null,
      image:'',
      headerdsv:'',
      btnhome:'',
      country:''
      }
  },
   created(){
       db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
         this.btnhome = doc.data().btnhome
        this.headerdsv = doc.data().headerdsv       
     })
  },
  methods: {
    signup(){
    
     
if(this.email && this.password){
  this.feedback = null
  firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(cred =>{
db.collection('users').doc(cred.user.uid).set({
  name: this.alias,
  sex: this.gender,
  address:'',
  contact:this.contact,
  tprojectjoin:0,
  acctype:'community',
  userid: cred.user.uid,
  profilepic:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/blank-profile-picture-973460_640.png?alt=media&token=9ddd6547-e1c9-4f8a-a157-b419cfcf6782',
  nnotification:null,
  point:500,
  TVol:null,
  TDon:null,
  fbpage:null,
  country:this.country,
  officialweb:"emtpy"

})
}).then(() => {
  
 this.$router.push({ name: 'Home' })

}).catch(err => {
          this.feedback = err.message
        })
}else{
   this.feedback = 'All field need to be fill in'
}


     
    }
  }
}
</script>

<style>
.bg{
  height: 1080px;
  background-size: cover;
 
}
.signup form{
margin-top:70px ;
margin-right:200px ;
margin-left:200px ;

position: relative;
}
.signup h2{
  font-size: 3.4em;
}
.signup .field{
  margin-bottom: 16px;
}


</style>