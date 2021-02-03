<template>
<div  class="bgv" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div class="add-storys container">
   <div class="card-panel z-depth-5">
  <form>
         
      <h2 class="center-align pink-text lighten 4">Add  New Story</h2>
          <div class="field">
            <p class="red-text">you only can choose either to upload own image,video from youtube or facebook</p>
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
    <form @submit.prevent="addStory">
      <div  v-show="typefile === 'youtube'" class="field">
        <label for="uyoutube">Youtube URL</label>
        <input id="uyoutube" type="text" v-model="uyoutube">
      </div>
      <div  v-show="typefile === 'facebook'" class="field">
        <label for="ufacebook">Facebook URL</label>
        <input id="ufacebook" type="text" v-model="ufacebook">
      </div>
        <div class="file-field input-field">
    </div>
      <div class="field title">
        <label for="title">Story title:</label>
        <input type="text" name="title" v-model="title" class="validate" required="" aria-required="true">
      </div>
      <div class="field">
          <textarea class="materialize-textarea validate" placeholder="Description" name="description" required="" aria-required="true" v-model="description" ></textarea>
          <label for="textarea1">Description</label>
        </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Story</button>
      </div>
    </form>
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
export default {
  title: 'Add Story',
  name: 'AddStory',
      mounted () {
     M.AutoInit()
},
  data(){
    return{
      title: null,
      description: null,
      feedback: null,
      slug: null,
      date:null,
      ttlike:['sdfsdf343434'],
      imageData: null,
      picture: null,
      uploadValue: 0,
      typefile:'',
      uyoutube:null,
      ufacebook:null,
      stoid:null,
      finalylink:null,
      fbfinallink:null,
      image:null,
      country:null


     
    }
  },
 created(){
       db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
     })

         let usid = firebase.auth().currentUser.uid
     db.collection("users").doc(usid).get().then(doc => {
       this.country=doc.data().country
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
         
          this.picture =url;
        });
      }
      );
    },
    addStory(){
      this.feedback = null
     if(this.title && this.description){  
        
    if(this.uyoutube){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = this.uyoutube.match(regExp);
    var idutube=(match&&match[7].length==11)? match[7] : false
    this.finalylink ="https://www.youtube.com/embed/"+idutube
    if(idutube){
      this.addtofirebase()
    }else{
      this.feedback ="Please enter the corret youtube format"
    }
    
    }
   
    else if(this.ufacebook){
                // eslint-disable-next-line
       var regExp = /\w\w\w\w\w\w\w\w\w+/gm
       var matchs = this.ufacebook.match(regExp);
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
    }
     

     else if(this.picture){
       this.addtofirebase()
     }else{
       this.feedback = 'invalid image'
     }
     }
     else{
        this.feedback = 'Title & Deescription need to fill in'
     }
    },
    addtofirebase(){
              let dateTime= new Date();
        
        this.date =dateTime.toJSON().slice(0,10).replace(/-/g,'/');
       
        
      let usid = firebase.auth().currentUser.uid
       
      db.collection('users').doc(usid).get().then(doc =>{
         

           if(this.title && this.description){
        this.feedback = null
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
      
        //generataautoid
         let ref = db.collection("storys").doc();
         const postid=ref.id
         
        //save data to firestore with set 
        db.collection('storys').doc(postid).set({
          title: this.title,
          descri: this.description,
          slug: this.slug,
          name:doc.data().name,
          acctype:doc.data().acctype,
          userid:usid,
          datecreate:this.date,
          tlike:this.ttlike,
          totlike:0,
          tcomment:0,
          img:this.picture,
          uyoutube:this.finalylink,
          ufacebook:this.fbfinallink,
          storyid:postid,
          country:this.country
         

        }).then(() => {
          console.log("succes add data")
          this.$router.push({ name: 'ManageStory' })
        })
      } else {
        this.feedback = 'Title & Deescription need to fill in'
      } 
      })

    }
  }
}
</script>

<style>

.add-storys  .card-panel{

  margin-top: 10px;

 
}
.add-storys h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-storys .field{
  margin: 20px auto;
  font-weight: bolder;
}


</style>
