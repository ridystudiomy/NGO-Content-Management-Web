<template>
       
        <div class=" center-align" v-if="adata">
        <div class="fb-video"
            :data-href="adata"
            data-width="auto"
            data-show-captions="false">
        </div>
        </div>
</template>
<script>
import db from '@/firebase/init'
export default {
       props:['sid','cname'],
  name: 'Fbvideo',
      mounted () {
        
         if(this.sid){
           this.runfb()
         }

},
  data(){
    return{
      adata:null
    
    }
},
 methods: {
    runfb(){
     
      db.collection(this.cname).doc(this.sid).get().then(doc =>{
                this.adata=doc.data().ufacebook
            }) .then(() => {
     
      window.FB.XFBML.parse();
    })
    .catch(() => {
      console.log("script fail load")
    });
    }
 }
}
</script>
<style>


</style>