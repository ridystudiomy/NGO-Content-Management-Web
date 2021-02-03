<template>
<div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
    <div class="tresult container">

        <div class="card-panel">

        </div>
    </div>
        
</div> 
</template>


<script>
import M from 'materialize-css'
 // eslint-disable-next-line no-unused-vars
import db from '@/firebase/init'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
export default {
  title: 'Transaction Result',
      name: 'TransactionResult',
            mounted () {
     M.AutoInit()

    },

   
 
  data(){
    return{
      emailVerified:'',
      useremail:'',
      emailsent:'',
      image:''

     
    }
  },
  
  created(){
       db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
     })
     var user = firebase.auth().currentUser;
     this.useremail=user.email
     if(user.emailVerified){
       console.log('verified')
       this.emailVerified=user.emailVerified
     }else{
       console.log("pls verify u email")
     }
  },
  methods: {
      sentemail(){
          this.emailsent='sending'
           var user = firebase.auth().currentUser;
          console.log('sending email verification')
            user.sendEmailVerification().then(function(){

          console.log("email verification sent to user");
        });
      }

  }
}
</script>

<style>
.tresult .card-panel{
  margin-top: 100px;  
}

.tresult img{
    height: 300px;
    width: 300px;
}

.card-panel a{
   font-weight:bold;
   
}

.card-panel h5{
   font-weight:bold;
  text-align: center;
}

</style>