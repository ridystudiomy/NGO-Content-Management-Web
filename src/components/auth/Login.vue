<template>
<div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div class="login container">
    <form class="card-panel  z-depth-5" @submit.prevent="login">
      <h2 :class="headerdsv">Login</h2>
      <div class="field">
        <label for="email">Email</label>
        <input id="email" type="email" v-model="email">
      </div>
      <div class="field">
        <label for="password">Password</label>
        <input id="password" type="password" v-model="password">
      </div>
      <p v-if="feedback" class="red-text center">{{ feedback }}</p>
      <div class="field">
        <div class="center"> <button :class="btnhome" >Login</button> </div>
         <a @click.prevent="resetpass()" class="red-text right" >Forgot Password ?,click here to reset</a>
      </div>
       <div class="field left">
       
      </div>
    </form>
  </div>
</div> 
</template>

<script>
import firebase from 'firebase'
import db from '@/firebase/init'


export default {
  title: 'Login',
  name: 'Login',
 
  data(){
    return{
      email: null,
      password: null,
      feedback: null,
      image:'',
      btnhome:'',
      headerdsv:''
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
    login(){
      if(this.email && this.password){
        this.feedback = null
        
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        // eslint-disable-next-line no-unused-vars
        .then(cred => {
          this.$router.push({ name: 'Home' })
        }).catch(err => {
          this.feedback = err.message
        })
      } else {
        this.feedback = 'Please fill in both fields'
      }
    },
    resetpass(){

          this.$swal.fire({
          title: 'Enter Your Email',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Sent',
          showLoaderOnConfirm: true,
          preConfirm: (email) => {
            return   firebase.auth().sendPasswordResetEmail(email)
              .then(() => {
                
                console.log(" Email sent.")
              })
              .catch(error => {
               this.$swal.showValidationMessage(
                  `Request failed: ${error}`
                )
              })
          },
          allowOutsideClick: () => this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire({
               title: 'Success sent password reset  ,please check your email',
               icon: 'success'
              
            })
          }
        })
        

    }
  }
}
</script>

<style>
.bg{
  height: 1080px;
  background-size: cover;
 
}
.login .card-panel{
  max-width: 800px;
  margin-top: 150px;
 margin-left:220px ;
  margin-right:220px ;
 
}

.login h2{
  font-size: 2.4em;
}
.login .field{
  margin-bottom: 16px;
}

.login a{
  cursor: pointer;
}
</style>