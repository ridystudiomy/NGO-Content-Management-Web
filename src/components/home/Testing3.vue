<template>
       
        <div v-if="adata">
        <div id="fb-root"></div>
        <div class="fb-page" :data-href="adata" data-tabs="timeline" data-width="500" data-height="1000" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote :cite="adata" class="fb-xfbml-parse-ignore"><a :href="adata">Malaysian Women’s Coalition for Al-Quds and Palestine</a></blockquote></div>
        </div>    
 
</template>
<script>
import db from '@/firebase/init'
export default {
       props:['sid'],
  name: 'Testing3',
      mounted () {
         console.log(this.sid)
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
      console.log(this.sid +"ni haa")
      db.collection("users").doc(this.sid).get().then(doc =>{
                this.adata=doc.data().fbpage
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
.testing3{

    height: 800px;

}

</style>