<template>
  <div class="view-Vproject container">
     <div class="vld-parent" ref="formContainer">
                   <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
    <div v-if="vproject" class="card">

       <div class="card-image">
        
<div  v-if="vproject.ufacebook">
           <Fbvideo :sid="test"  :cname="colname" />
          
   </div>    
 <div  v-show="vproject.uyoutube" ><iframe  :src="vproject.uyoutube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div  v-show="vproject.img" ><img :src="vproject.img" alt=""></div>
            <a href="" class="halfway-fab btn-floating pink pulse">
              <i class="material-icons">pan_tool</i>
            </a>
            <div class="col s3"><span class="left"><i class="material-icons small">person</i> By:{{ vproject.name }} &nbsp;|</span></div>
             <div class="col s3"><span class="left"><i class="material-icons small">date_range</i>  {{ vproject.datecreate }}</span></div>
       </div>
            
            <div class="card-content">
      <h2 class="pink-text text-darken-4">{{ vproject.title }}</h2>
        <p class="locationname">Location: <b class="blue-text" >{{vproject.locationname}}</b> </p>
        <p class="locationname">Date Project: <b class="blue-text"  >{{dateconvert}}</b></p>
        <br>
        <p>{{ vproject.descri}}</p>
      </div>
    </div>
                             <!-- Modal Trigger -->
  <a v-show="vproject.status =='incomplete'&&emverified"  :class="btnhome"  @click.prevent="JoinProject()">Join Project</a>
  <br>
  <br>

 

     </div>
  </div>
</template>

<script>
 // eslint-disable-next-line no-unused-vars
import moment from 'moment';
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import M from 'materialize-css'
import db from '@/firebase/init'
import Fbvideo from '@/components/layout/Fbvideo'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
export default {
  name: 'ViewVproject',
        mounted () {
          
     M.AutoInit()
},
  data(){
    return{
      vproject: null,
      feedback: null,
      count:0,
      ayat:null,
      idd:[],
      duplicate:null,
      emverified:null,
      btnhome:'',
      isLoading: false,
      fullPage: true,
      test:this.$route.params.id,
      colname:'vprojects' ,
      dateconvert:null 
      
    }
  },
   components: {
            Loading,Fbvideo
        }, 
  created(){
          db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.btnhome = doc.data().btnhome
     })
  
    let ref = db.collection('vprojects')
    ref.doc(this.$route.params.id).get()
    .then(vproject => {
      var dt=new Date(vproject.data().dateproject.seconds*1000)
       this.dateconvert =moment(dt).format('DD/MM/YYYY')
      this.vproject = vproject.data()
     
    })
  let userids = firebase.auth().currentUser.uid
    db.collection('participants').where('projectid', '==', this.$route.params.id).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.data().userid==userids){
          this.duplicate=true
        }else{
          this.duplicate=null
        }
      })   
    })
     
   let user = firebase.auth().currentUser
   if(user.emailVerified){
      this.emverified=true
   }

   
  },
 methods: {
   JoinProject(){
     this.$swal.fire({
  title: 'Are sure you want to join?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: `Yes`,
  denyButtonText: `Don't save`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
      let usersd =firebase.auth().currentUser
      if(usersd){
        
      //get number of project that user join
        db.collection('vprojects').doc(this.$route.params.id).get().then(doc => {
     this.idd=doc.data().listvon
     console.log('von'+this.idd)
    })
      let usid = firebase.auth().currentUser.uid
     
       db.collection('users').doc(usid).get().then(doc =>{
        if(doc.data().tprojectjoin<3){
            if(!this.duplicate){

             let ref = db.collection("my_collection").doc();
         const postid=ref.id
            db.collection('participants').doc(postid).set({
              name:doc.data().name,
              contact:doc.data().contact,
              status:'pending',
              userid:usid,
              projectid:this.$route.params.id


            })
              this.idd.push(postid)
                db.collection('vprojects').doc(this.$route.params.id).update({
          listvon:this.idd
        
        })
         
        .then(() => {
          this.$swal.fire('Success request to join the project,The organization will contact you when your request approve !', '', 'success')
        
        })
        let addpro =doc.data().tprojectjoin +1;
         db.collection('users').doc(usid).update({
           tprojectjoin:addpro
         })
            }else{
               this.$swal.fire('You already joined this project!', '', 'error')
            }
      }else{
         
         this.$swal.fire('Fail Join the project,You only can join 3 project at the same time,Please Unjoin/withdraw request at the Manage Volunteer menu !', '', 'error')
          
        }
       })

      }else{
        this.$router.push({ name: 'Login' })

      }

    
  } else if (result.isDenied) {
     this.$swal.fire('Changes are not saved', '', 'info')
  }
})



   }
    
  }
}
</script>


<style>
.view-Vproject{
  margin-bottom: 60px;

}
.view-Vproject .btn{
  font-weight: bold;
}
.view-Vproject .card{
  padding: 20px;
  margin-top: 100px;
}
.view-Vproject h2{
  font-size: 2em;
  margin-top: 0;
}
.view-Vproject li{
  padding: 10px;
  border-bottom: 1px solid #eee
}
.view-Vproject h2{
  font-family: Franklin Gothic Medium;
  font-size: 3em;
  margin-top: 30px;
  border-bottom: 1em;
  text-align: center;
}
.view-Vproject p{
  font-family: calibri;
  font-weight: bold;
  font-size: 1em;
  text-align: justify;
}
.view-Vproject .card-content{
  padding-bottom: 50px;
}
.view-Vproject img{
  height:670px ;
  width: 1080px;
}
.view-Vproject iframe{
  height:670px ;
  width: 100%;
}


</style>