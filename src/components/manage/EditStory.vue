<template>
<div  class="bgv" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div class="edit-story container">
   <div class="card-panel z-depth-5">
        <h2 class="center-align pink-text lighten 4">Edit Story</h2>
         <div v-if="info">
           <span>Current Media</span>
     <form  v-show="info.ufacebook||info.uyoutube||info.img">
<div  class="fbframe" v-if="info.ufacebook">
           <Fbvideo :sid="test"  :cname="colname" />
          
   </div>       
 <div  v-show="info.uyoutube" ><iframe  :src="info.uyoutube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div  v-show="info.img" ><img :src="info.img" alt=""></div>
           
           
       </form>
 </div>  
                 <div class="field">
            
 <a class=" btn white-text modal-trigger" href="#modal1">View guidelines for getting youtube or facebook video url </a>
        <!-- Modal Structure -->
  <div id="modal1" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4><b>Example Youtube URL</b></h4>
         <img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/youtubeinsta.jpg?alt=media&token=3bb1b9a2-f800-4fb5-95b3-bfe3b83d5dbf" alt="" >
     <h4><b>Example Facebook URL</b></h4>    
        <img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/facebookinstra.jpg?alt=media&token=b5caf618-396e-471c-b6ca-5e6678c41faf" alt="" >
    </div>
    <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat ">Understand</a>
    </div>
  </div>

    <select v-model="typefile">
      <option value="" disabled selected>Choose type of file</option>
      <option value="image">Image</option>
      <option value="youtube">Youtube Video</option>
      <option value="facebook">Facebook Video</option>
    </select>
    
  </div>
  <form>   
     

       <div v-show="typefile === 'image'" class="file-field input-field">
       <div  class="btn" > 
         <span>Choose Image</span>
      <input type="file" @change="previewImage" accept="image/*" >
    </div>
    <div class="file-path-wrapper">
        <input class="file-path validate" type="text">
      </div>
    <div>
      <p>Progress: {{uploadValue.toFixed()+"%"}}
      <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
    </div>

      
</div>
<br>
<br>
     </form>
      <div v-if="info">
    <form>
      <div  v-show="typefile === 'youtube'" class="field">
        <label for="uyoutube">Youtube URL</label>
        <input id="uyoutube" type="text" v-model="uyoutube">
      </div>
      <div  v-show="typefile === 'facebook'" class="field">
        <label for="ufacebook">Facebook URL</label>
        <input id="ufacebook" type="text" v-model="ufacebook">
      </div>
    <div class="field title">
        <label for="title">Title:</label>
        <input type="text" name="title" v-model="info.title">
      </div>
       <div class="field">
        <label for="title">Description:</label>
        <textarea class="materialize-textarea" name="title" v-model="info.descri"></textarea>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink"  @click.prevent="editProfile" >Update Project</button>
      </div>
        </form>
       </div>
  
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
 // eslint-disable-next-line no-unused-vars
import slugify from 'slugify'
import Fbvideo from '@/components/layout/Fbvideo'
export default {
   title: 'Edit Story',
  name: 'EditStory',
      mounted () {
     M.AutoInit()
},
  data(){
    return{
      info:null,
      imageData: null,
      picture: null,
      uploadValue: 0,
      typefile:'',
      uyoutube:null,
      ufacebook:null,
      feedback:'',
      image:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/palestine-women.jpg?alt=media&token=e1adaccd-ef86-45b8-8dad-5aa14f9f2237',
      fbfinallink:null,
      finalylink:null,
      test:this.$route.params.id,
      colname:'storys'    
    
    }
  },
    components: {
    Fbvideo
  },
created(){
   
    db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
     })
    let ref = db.collection('storys')
    ref.doc(this.$route.params.id).get()
    .then(doc => {
      this.info = doc.data()
    })
  },
  watch: {
    imageData(){
      this.onUpload();
    },
        typefile(){
      if(this.image){
        this.uyoutube=null
        this.ufacebook=null
      }else if(this.uyoutube){
         this.image=null
        this.ufacebook=null
      }else{
        this.image=null
        this.uyoutube=null
      }
    }

  },   
  methods: {

    removeimage(picurl,youtubleurl,fburl){

        if(picurl){
                 console.log("deleting.."+picurl)
       firebase.storage().refFromURL(picurl).delete().then(()=>{
         db.collection('storys').doc(this.$route.params.id).update({
          img:null
        }).then(() => {
            this.$router.go()
        })
         }).catch(function(error) {
          console.log(error)
        }); 
            
        }else if(youtubleurl){
                        console.log("deleting.."+youtubleurl)
      db.collection('storys').doc(this.$route.params.id).update({
           uyoutube:null
        }).then(() => {
            this.$router.go()
        })     
        }else{
                           console.log("deleting.."+fburl)
      db.collection('storys').doc(this.$route.params.id).update({
           ufacebook:null
        }).then(() => {
            this.$router.go()
        })  
               
        }
        
          
    },
     
    previewImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
    },

    onUpload(){
      this.picture=null;
      const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          console.log(url)
          this.picture =url;
        });
      }
      );
    },
      editProfile(){
              this.feedback = null
              if(this.picture){
                  if(this.info.img){
                     firebase.storage().refFromURL(this.info.img).delete()
                      this.addtofirebase()
                  }else{
                    this.feedback ="Invalid Image Please Try Again"
                  }
                db.collection('storys').doc(this.$route.params.id).update({
                  title: this.info.title,
                  descri: this.info.descri,
                  img:this.picture,
                  uyoutube:this.finalylink,
                  ufacebook:this.fbfinallink
                  
                }).then(() => {
                  this.$router.push({ name: 'ManageStory' })
                }).catch(err => {
                this.feedback=err
                })
              }else if(this.uyoutube){
                var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
                var match = this.uyoutube.match(regExp);
                var idutube=(match&&match[7].length==11)? match[7] : false
                this.finalylink ="https://www.youtube.com/embed/"+idutube
                  if(this.info.img){
                     firebase.storage().refFromURL(this.info.img).delete()
                  }              
                    if(idutube){
                      this.addtofirebase()
                    }else{
                      this.feedback ="Please enter the corret youtube format"
                    }                 
              }else if(this.ufacebook){
 
                      if(this.info.img){
                          firebase.storage().refFromURL(this.info.img).delete()
                        }
                      var regExpf = /\w\w\w\w\w\w\w\w\w+/gm
                      var matchs = this.ufacebook.match(regExpf);
                      if(!matchs){
                          this.feedback ="Please enter the corret facebook format"
                      }
                      var result1 =matchs[0];
                      var result2 =matchs[1];
                  
                      if(result1 && result2){
                          this.fbfinallink=this.ufacebook
                          this.addtofirebase()
                      }else{
                        this.feedback ="Please enter the corret facebook format"
                      }
                                 
                
              }else{
                   db.collection('storys').doc(this.$route.params.id).update({
                    title: this.info.title,
                    descri: this.info.descri,
                    img:this.info.img,
                    uyoutube:this.info.uyoutube,
                    ufacebook:this.info.ufacebook
                    
                  }).then(() => {
                    this.$router.push({ name: 'ManageStory' })
                  }).catch(err => {
                  this.feedback=err
                  })                
              }      
      },
      addtofirebase(){
                db.collection('storys').doc(this.$route.params.id).update({
                  title: this.info.title,
                  descri: this.info.descri,
                  img:this.picture,
                  uyoutube:this.finalylink,
                  ufacebook:this.fbfinallink
                  
                }).then(() => {
                  this.$router.push({ name: 'ManageStory' })
                }).catch(err => {
                this.feedback=err
                })  
      }
  }
}
</script>

<style>


.add-story  .card-panel{
 
  margin-top: 10px;

 
}
.edit-story h2{
  font-size: 3rem;
  margin: 20px auto;
}
.edit-story .field{
  margin: 20px auto;
  font-weight: bolder;
}

.edit-story img{
  height:200px ;
  width: 240px;
}

.edit-story iframe{
  height:200px ;
  width: 250px;
}

.modal-content img{
    height:700px ;
  width: 1000px;
}

</style>
