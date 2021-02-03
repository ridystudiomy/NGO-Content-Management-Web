<template>
<div  class="bgv" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div class="add-d container">
    <div class="card-panel z-depth-5">
    <form>
      <h2 class="center-align pink-text lighten 4">Add New Donation Project</h2>
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
       <span class="red-text">Choose image from you computer</span>
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
      <div class="field title">
        <label for="title">Donation Project Title:</label>
        <input type="text" class="validate" required="" aria-required="true" name="title" v-model="title">
      </div>
        <div class="input-field">
        <label for="amount">Amount Need</label>
        <input type="number" class="validate" required="" aria-required="true" name="title" v-model="amount">
      </div>
          <a class=" btn white-text modal-trigger" href="#modal22">View Example ToyyibPay Detail</a>
        <!-- Modal Structure -->
  <div id="modal22" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4><b>Example ToyyibPay Detail</b></h4>
         <img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/toyibsecret.JPG?alt=media&token=43de76ad-dd62-4239-85a2-f7c04c301587" alt="" >
          <img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/toyibcategory.JPG?alt=media&token=17866604-fb69-42ee-9ff7-ed8eb76b4815" alt="" >
    
    </div>
    <div class="modal-footer">
     <a class="modal-action modal-close waves-effect waves-green btn-flat ">Understand</a>
    </div>
  </div>      
        <div v-show="country == 'MY'" class="field">
        <label for="secrect">Key Secret  Toyib Pay </label>
        <input type="text"  name="Secrect" v-model="tsecret">
      </div>
              <div v-show="country == 'MY'" class="field">
        <label for="category">Key Category Toyib Pay </label>
        <input type="text"  name="Category" v-model="tcatecode">
      </div> 
                  <div class="field">
        <label for="category">Paypal Secret  Key </label>
        <input type="text"  name="psecret" v-model="psecret">
      </div>       
           <div class="field">
        <label for="pid">Paypal ID</label>
        <input type="text" name="pid" v-model="pid">
        <a class=" btn white-text modal-trigger" href="#modal2">View Example Paypal Detail</a>
        <!-- Modal Structure -->
  <div id="modal2" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4><b>Example Paypal Detail</b></h4>
         <img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/paypal.JPG?alt=media&token=259e3b07-8d32-4977-90a4-cb6223d1a323" alt="" >
    
    </div>
    <div class="modal-footer">
     <a class="modal-action modal-close waves-effect waves-green btn-flat ">Understand</a>
    </div>
  </div>

      </div>
      <div class="field">
          <textarea class="materialize-textarea validate"  placeholder="Description" name="description" required="" aria-required="true" v-model="description" ></textarea>
          <label for="textarea1">Description</label>
        </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Donation</button>
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
  title: 'Add Donation',
  name: 'AddDonation',
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
      amount:null,
      pid:null,
      imageData: null,
      picture: null,
      uploadValue: 0,
      typefile:'',
      uyoutube:null,
      ufacebook:null,
      stoid:null,
      image:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/palestine-women.jpg?alt=media&token=e1adaccd-ef86-45b8-8dad-5aa14f9f2237',
       finalylink:null,
      fbfinallink:null,
      country:null,
      tcatecode:null,
      tsecret:null,
      psecret:null,


      
     
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
          console.log(url)
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


           if(this.title){
        this.feedback = null
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
  
        //generate auto id and store in postid
         let ref = db.collection("my_collection").doc();
         const postid=ref.id
         
        //save data to firestore
        db.collection('donations').doc(postid).set({
          title: this.title,
          descri: this.description,
          slug: this.slug,
          name:doc.data().name,
          acctype:doc.data().acctype,
          userid:usid,
          datecreate:this.date,
          fundneed:this.amount,
          paypalid:this.pid,
          curfund:0,
          img:this.picture,
          uyoutube:this.finalylink,
          ufacebook:this.fbfinallink,
          projectid:postid,
          tcatecode:this.tcatecode,
          tsecret:this.tsecret,
          psecret:this.psecret,
          country:this.country
      
          
         

        }).then(() => {
          this.$router.push({ name: 'ManageDonation' })
        })
      } else {
        this.feedback = 'You must enter a  title'
      } 
      })
    }
  }
}
</script>

<style>

.add-d .card-panel{

  margin-top: 10px;


 
}
.add-d h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-d .field{
  margin: 20px auto;
  font-weight: bolder;
}

</style>
