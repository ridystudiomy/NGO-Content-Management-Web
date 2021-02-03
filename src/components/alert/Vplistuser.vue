<template>
  <div class="Vplistuser container">
      
         <form class="card-panel" >

         <!-- <iframe src="https://drive.google.com/embeddedfolderview?id=1fUF1UPrO6DY8YYWy1eNRNxOCeACAlouI#grid" style="width:100%; height:600px; border:0;"></iframe> -->


    </form>
    
  </div>
</template>

<script>
 // eslint-disable-next-line no-unused-vars
import db from '@/firebase/init'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
export default {
  name: 'Vplistuser',
  data(){
    return{
        projects:[],
        parts:[],
        co:1,
        output:null,
         output2:null,
        url:null
    }
  },
  created(){

   this.updatefield()


  },
   methods: {
     updatefield(){
              db.collection("donations")
    .get()
    .then(snapshot =>{
        snapshot.forEach(doc => {


             db.collection("donations").doc(doc.id).update({
                tcatecode:"5cqcmg74",
                tsecret:"k3i7xhri-wxgq-89f7-5rr6-wt427en3z2a8",
           })
          
            

        })
        
    }) 
     }
   
   }

}
</script>

<style>
.Vplistuser{
  max-width: 1000px;
  height: 500px;
  margin-top: 100px;
}
.Vplistuser h2{
  font-size: 2.0em;
}
.Vplistuser .field{
  margin-bottom: 16px;
}
.Vplistuser h2{
  font-family: Helvetica;
  font-size: 1.6em;
  color:rgb(165, 86, 99);
}
.SuccesVp span{
  font-weight: bold;
  font-size: 1.3em;
}
.Vplistuser h1{
  font-family: Helvetica;
  font-size: 3.89em;
  color:rgb(165, 86, 99);
}
.Vplistuser .delete{
  color: #ff0000;
  cursor: pointer;
 
}
</style>