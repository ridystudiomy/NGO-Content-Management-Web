<template>
<div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
    <div class="error container center-align">

       
            
              <div  ><img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/erorr404-01.png?alt=media&token=a5ad22b6-250d-4361-9e38-31bc2c7d78e8" alt=""></div>
             <button class="btn" ><router-link class="white-text" :to="{ name: 'Home' }">Back To Home</router-link></button>
              
    
        
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
  title: 'Error 404',
name: 'ErrorPage',
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
  
}
</script>

<style>


.error img{
    height: 500px;
    width: 500px;
}



</style>