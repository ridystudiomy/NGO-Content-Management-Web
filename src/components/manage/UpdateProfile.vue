<template>
<div  class="bgv" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div v-if="info" class="updateprofile">
   <div class="card">
     <form v-show="info.profilepic" class="center-align">
        <h2 class="pink-text center-align" >Edit {{ info.name }} Profile</h2>
      <img v-show="info.profilepic" :src="info.profilepic" alt="">
       <p>Current Image</p>
       </form>     
  
    <form>
        
                  <div class="file-field input-field">
                     <p>Upload Image Profile</p>
       <div  class="btn-small" > 
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
 </form>
<br>
<br>
 <form  @submit.prevent="checkerror">
      <div class="field title">
        <label for="title">Name:</label>
        <input type="text" name="title" v-model="info.name">
      </div>
       <div class="field">
        <label for="title">Address:</label>
        <input type="text" name="title" v-model="info.address">
      </div>
       <div class="field">
        <label for="title">Contact:</label>
        <input type="text" name="title" v-model="info.contact">
      </div>
      <div class="field">
        <label for="title">Facebook Page:</label>
        <input type="text" name="fbpage" v-model="info.fbpage">
      </div>
            <div v-show="info.officialweb !=='empty'" class="field">
        <label for="title">Official website:</label>
        <input type="text" name="officialweb" v-model="info.officialweb">
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Update Profile</button>
      </div>
    </form>
       </div>
  </div>
</div> 
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
export default {
   title: 'Update Profile',
  name: 'UpdateProfile',
  data(){
    return{
      info: null,
      feedback:null,
      imageData: null,
      picture: null,
      uploadValue: 0,
      image:''
      
    }
  },
  created(){
      db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
     })
   
    let ref = db.collection('users')
    ref.doc(this.$route.params.id).get()
    .then(doc => {
      this.info = doc.data()
      this.picture=doc.data().profilepic
    })
  },
  watch: {
    imageData(){
      this.onUpload();
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

    checkerror(){
      if(this.info.name.length >4){
        this.editProfile()
      }else{
        this.feedback ="Name must have at least 5 character"
      }
      
    },
  
      editProfile(){

         if(this.info.profilepic){

           if(this.picture){
             if(!this.info.officialweb){
               this.info.officialweb=null
             }
          db.collection("users").doc(this.$route.params.id).update({
              name: this.info.name,
              address: this.info.address,
              contact: this.info.contact,
              profilepic:this.picture,
              fbpage:this.info.fbpage,
              officialweb:this.info.officialweb
              }).then(() => {
              this.$router.push({ name: 'UserProfile', params: { id: this.$route.params.id }})
              }).catch(err => {
              this.feedback=err
        })
          
        
             
           }else{
          db.collection("users").doc(this.$route.params.id).update({
              name: this.info.name,
              address: this.info.address,
              contact: this.info.contact,
              profilepic:this.info.picture,
              fbpage:this.info.fbpage,
              officialweb:this.info.officialweb              
              }).then(() => {
              this.$router.push({ name: 'UserProfile', params: { id: this.$route.params.id }})
              }).catch(err => {
              this.feedback=err
        })

           }
    
           
         }else{
          db.collection('users').doc(this.$route.params.id).update({
          name: this.info.name,
          address: this.info.address,
          contact: this.info.contact,
          profilepic:this.picture,
          fbpage:this.info.fbpage,
          officialweb:this.info.officialweb         
          
        }).then(() => {
          this.$router.push({ name: 'UserProfile', params: { id: this.$route.params.id }})
        }).catch(err => {
         this.feedback=err
        })

         }

          
      }
  }
}
</script>
 
<style>
.updateprofile  .card{

  margin-left: 100px;
  margin-top: 10px;
 margin-right: 100px;
 padding: 2%;

}
.updateprofiler h2{
  font-size: 2em;
  margin: 20px auto;
}
.updateprofile .field{
  margin: 20px auto;
  font-weight: bolder;
}

.updateprofile img{
  width: 150px;
  height: 150px;
}
 
</style>
 