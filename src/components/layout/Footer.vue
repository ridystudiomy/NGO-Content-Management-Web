<template>
          <footer :class="footer">
          <div class="foo container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="black-text">Contact Us</h5>
                <p class="black-text text-lighten-4">Email: <b>{{email}}</b></p>
              </div>
              <div class="col l4 offset-l2 s12">
                <h5 class="black-text">Social Media</h5>
                <ul class="iconfooter">
                  <li><a :href="fblinkl" ><img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/193-02.png?alt=media&token=eebf66b4-a980-4786-b45e-a3836afcf996"></a></li>
                  <li><a :href="youtubelink" ><img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/193-03.png?alt=media&token=61965589-421a-41f7-9fb9-0b3fc920dd76"></a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="black-text container">
            © 2020 Copyright GWCQP
            
            </div>
          </div>
        </footer>
</template>

<script>
import M from 'materialize-css'
import db from '@/firebase/init'
export default {
    name:'Footer',
     mounted () {
     M.AutoInit()
},
  data(){
    return{
      nvcolour:"",
      footer:"",
      email:'',
      youtubelink:'',
      fblinkl:""

    }
  },
  created(){

     db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.nvcolour =doc.data().nvcolour
        this.footer =doc.data().footer
        this.email =doc.data().email
        this.fblinkl =doc.data().fblinkl
        this.youtubelink =doc.data().youtubelink                        
     })
  }   


}
</script>
<style>
.iconfooter img{
  height:50px ;
  width:50px ;
}

.foo h5{
 
  font-weight: bold;
}
</style>