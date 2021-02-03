<template>
<div>
    
    <h2 :class="headerdsv"> About Us</h2>
     <div class="aboutbg"><img  :src="bgimg" alt>
   <div class="centeredd"><img class="z-depth-5" :src="logo" width="500px"> <br>{{abouttext}}</div>
   </div>


 </div>
</template>

<script>

import db from '@/firebase/init'
import M from 'materialize-css'
export default {
  title: 'About Us',
  name: 'GMap',

      mounted () {
      M.AutoInit()
      },
    
  data() {
    return {
      center: { lat: 30.883369, lng:36.483598 },
      mapTypeId: "terrain",
      markers: [],
      headerdsv:null,
      logo:'',
      bgimg:'',
      abouttext:'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilis' 
     
    };
  },
    created () {


    db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.headerdsv = doc.data().headerdsv
         this.logo = doc.data().logo
          this.bgimg = doc.data().bgimg
        
     })    

},
  methods: {
    show(ids){
       this.$router.push({ name: 'ViewVproject', params: { id: ids }})
    }


  }
}
</script>

<style>
.vue-map-container {
 
  
  height: 550px;
  width: 100%;
}
.map h2{
  font-size: 3.8em;
  text-align: center;
  margin-top: 0;
}

.aboutbg{
  position: relative;
  text-align: center;
  
 
}

.aboutbg img{

height: 50%;
width: 100%;  
 
}

.centeredd {
  color: rgb(255, 255, 255);
  font-family: Roboto;
  font-weight:1000;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>