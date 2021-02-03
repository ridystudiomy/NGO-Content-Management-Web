<template>
  <div class="SuccesVp container">
          <div class="vld-parent" ref="formContainer">
                   <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
      
          </div>   
           <div class="card-panel">
             <div  v-if="this.$route.query.status_id==1"  class="center-align" ><img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/donatecucess-01.png?alt=media&token=1aeaed5e-d9b1-4bb8-ba5a-99cb3f5c9f91" alt=""></div>
              <div  v-else class="center-align" ><img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/donationfail)-01.png?alt=media&token=10d2513b-60fb-4e14-8556-56dce502ddbb" alt=""></div>
            <h5 v-if="this.$route.query.status_id==1" >Thank You For Your kindness , Transction Detail will be email at you shortly</h5>
            <h5  v-else >Thank You For Your kindness , Please Try Again</h5>
           
             
             
    
        </div>       
  </div>
</template>

<script>
import M from 'materialize-css'
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
 // eslint-disable-next-line no-unused-vars
import {ToyyibPay}  from "toyyibpay-nodejs"
 // eslint-disable-next-line no-unused-vars
import db from '@/firebase/init'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
export default {
  name: 'Toyibpay',
 mounted () {
     M.AutoInit()

    },
  data(){
    return{
      isLoading: false,
      fullPage: true,
      currentuser:'anonymous',
      transactiond:null,
      posts:null,
      projectname:null,
      userid:null
    }
  },
 components: {
            Loading
        }, 
  created(){
    this.userid = firebase.auth().currentUser.uid
  this.time()
  },
   methods: {
    time(){
       db.collection("transcations").doc(this.$route.query.transaction_id).get().then(doc =>{
        if(doc.data().status){
        this.$router.push({ name: 'ErrorPage' })
        }else{
          console.log("yeay")
        }

    }).catch(()=>{
      this.sentdata()
    })
  
      
    },

    check(posts){
      if(posts){
          this.$router.push({ name: 'ManageStory' })
      }else{
          console.log("fakkkk")
      }

    },
   doAjax() {
        this.isLoading = true;
                 
     },
   onCancel() {
              console.log('User cancelled the loader.')
    },     
  
      sentdata(){
        this.isLoading = true;
           const transid = this.$route.query.transaction_id
           var dt = new Date();

          var simplifydt =`${
          (dt.getMonth()+1).toString().padStart(2, '0')}/${
          dt.getDate().toString().padStart(2, '0')}/${
          dt.getFullYear().toString().padStart(4, '0')} ${
          dt.getHours().toString().padStart(2, '0')}:${
          dt.getMinutes().toString().padStart(2, '0')}:${
          dt.getSeconds().toString().padStart(2, '0')}`

            if(this.$route.query.status_id==1){
              const money=parseInt(this.$route.query.amount/400)
            db.collection('donations').doc(this.$route.query.order_id).update({
            curfund:firebase.firestore.FieldValue.increment(money)
             })
              console.log("lulus")
                
                if(this.userid){
                db.collection('users').doc(this.userid).get().then(doc =>{
                this.currentuser= doc.data().name
               
                db.collection("transcations").doc(transid).set({
                  donatorid:this.userid,
                  donatorname:doc.data().name,
                  plaform:"Toyyib Pay",
                  projectid:this.$route.query.order_id,
                  time:simplifydt,
                  total:money,
                  transid:this.$route.query.transaction_id,
                  status:"success"


                })
              })
              // thank user

              }else{

                
                db.collection("transcations").doc(transid).set({
                  donatorid:'',
                  donatorname:this.currentuser,
                  plaform:"Toyyib Pay",
                  projectid:this.$route.query.order_id,
                  time:simplifydt,
                  total:money,
                  transid:this.$route.query.transaction_id,
                  status:"success"


                })
                  //thank anonymous 
              }

            }else{
               console.log("fail byr")
            }
            
             this.isLoading = false;        
      }



   }
    

}
</script>

<style>

.SuccesVp h2{
  font-size: 2.0em;
}
.SuccesVp .field{
  margin-bottom: 16px;
}
.SuccesVp h2{
  font-family: Helvetica;
  font-size: 1.6em;
  color:rgb(165, 86, 99);
}
.SuccesVp span{
  font-weight: bold;
  font-size: 1.3em;
}
.SuccesVp h1{
  font-family: Helvetica;
  font-size: 3.89em;
  color:rgb(165, 86, 99);
}
.SuccesVp .delete{
  color: #ff0000;
  cursor: pointer;
 
}
</style>