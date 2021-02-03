<template>
<div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
    <div class="verify container">

        <div class="card-panel">
             <div  v-show="emailVerified"  class="center-align" ><img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/verify.png?alt=media&token=48b32c64-428c-4302-8806-991925a70bff" alt=""></div>
              <div  v-show="!emailVerified&&!emailsent"  class="center-align" ><img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/notverify.png?alt=media&token=ffe5d44d-96b6-402a-8053-52e872f7e40b" alt=""></div>
              <div  v-show="emailsent"  class="center-align" ><img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/sentemail.png?alt=media&token=c6bc9f3b-a83f-4d50-a931-1eded635ad97" alt=""></div>
             <h5  v-show="!emailVerified&&!emailsent"  >Please Verify your Email:<a>{{this.useremail}}</a> to continue use this platfom</h5>
              <h5  v-show="emailVerified" >Great your account have been verified! </h5>
              <h5  v-show="emailsent" >Email Verification success sent,please check your email</h5>
             <p  v-show="!emailVerified&&!emailsent" class="center-align"><a class="btn-large white-text" @click.prevent="sentemail()">Sent verification</a></p>
    
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
  title: 'Email Verification',
      name: 'VerifyEmail',
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
.verify .card-panel{
  margin-top: 100px;  
}

.verify img{
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