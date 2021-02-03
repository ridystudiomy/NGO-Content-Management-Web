<template>
<div>
  <div v-if="inter=='web'">
  <div id="app">
    

     <Navbar/>
     

    <router-view />
    <Footer/>
      </div>
   
  </div>   
 <div v-else>
      <p>For stable version please downlaod mobile</p>
</div>
</div>  
</template>
<script>

import Navbar from  '@/components/layout/Navbar'
import Footer from  '@/components/layout/Footer'
export default {

  name:'App',
    data(){
    return {
      inter:'web'
      
    }
  },
   created(){
     if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
         console.log('mobile')
         this.inter='mobile'
        }else{
          console.log('web')
          this.inter='web'
        }
   },
    components:{
    Navbar,Footer
  }

}
</script>

<style >

</style>
