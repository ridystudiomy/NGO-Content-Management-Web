<template>
<div  class="bgv" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div class="add-voucher container">
   <div class="card-panel z-depth-5">
  <form>
         
      <h2 class="center-align pink-text lighten 4">Add  New voucher</h2>
          <div class="field">
            <p class="red-text">you only can choose either to upload own image or from url</p>
                    <a class=" btn white-text modal-trigger" href="#modal1">View guidelines for getting image url </a>
        <!-- Modal Structure -->
  <div id="modal1" class="modal modal-fixed-footer">
    <div class="modal-content">
      <h4><b>Example URL</b></h4>
         <img src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/urll.png?alt=media&token=861ac6e9-dd80-42dc-9c6f-ad6538ee1f44" alt="" >
         
    </div>   
    <div class="modal-footer">
      <a class="modal-action modal-close waves-effect waves-green btn-flat ">Understand</a>
    </div>
  </div>
    <select v-model="typefile">
      <option value="" disabled selected>Choose type of file</option>
      <option value="image">Image</option>
      <option value="url">URL</option>
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
    <form @submit.prevent="addVoucher">
      <div  v-show="typefile === 'url'" class="field">
        <label for="uyoutube">Image URL</label>
        <input id="urll" type="text" class="validate" required="" aria-required="true" v-model="picture">
      </div>
        <div class="file-field input-field">
    </div>
      <div class="field title">
        <label for="title">voucher name:</label>
        <input type="text" name="name" class="validate" required="" aria-required="true" v-model="name">
      </div>   
    <div class="field title">
        <label for="title">voucher Title:</label>
        <input type="text" name="title" class="validate" required="" aria-required="true" v-model="title">
      </div>               
      <div class="field">
          <textarea class="materialize-textarea validate" placeholder="Description" name="description" required="" aria-required="true" v-model="description" ></textarea>
          <label for="textarea1">Description</label>
        </div>
    <div class="field title">
        <label for="title">voucher code:</label>
        <input type="text" name="code" class="validate" required="" aria-required="true" v-model="code">
      </div>
    <div class="field title">
        <label for="title">voucher expired:</label>
        <input type="text" name="expired" class="validate" required="" aria-required="true" v-model="expired">
      </div>  

    <div class="field">
        <label for="title">voucher Require Point:</label>
        <input type="number" name="reqpoint" class="validate" required="" aria-required="true" v-model="reqpoint">
      </div>   
    <div class="field">
        <label for="title">voucher Total:</label>
        <input type="number" name="totalv" class="validate" required="" aria-required="true" v-model="totalv">
      </div>                   
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Voucher</button>
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
  title: 'Add Voucher',
  name: 'AddVoucher',
      mounted () {
     M.AutoInit()
},
  data(){
    return{
        name:null,
        title:null,
        description:null,
        code:null,
        expired:null,
        reqpoint:100,
        totalv:1,
      feedback: null,
      slug: null,
      date:null,
      ttlike:['sdfsdf343434'],
      imageData: null,
      picture: null,
      uploadValue: 0,
      typefile:'',
      urll:null,
      stoid:null,
      image:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/palestine-women.jpg?alt=media&token=e1adaccd-ef86-45b8-8dad-5aa14f9f2237'
     
    }
  },
 created(){
       db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
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
         
          this.picture =url;
        });
      }
      );
    },
    addVoucher(){
       this.feedback = null
       if(this.title && this.description && this.code && this.expired && this.name && this.reqpoint && this.totalv){
         this.addtofirebase();
       } else{
         this.feedback = 'All field need to be filled in'
       }
      
     
    },
    addtofirebase(){
       var pointreq =parseInt(this.reqpoint) 
       var vtotal =parseInt(this.totalv)  
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
               
        //save data to firestore with set 
        db.collection('vouchers').add({
          userid:doc.data().userid,
          title: this.title,
          descri: this.description,
          slug: this.slug,
          acctype:doc.data().acctype,
          code:this.code,
          expired:this.expired,
          imgv:this.picture,
          namev:this.name,
          reqpoint:pointreq,
          totalv:vtotal,

        }).then(() => {
          
          this.$router.push({ name: 'ManageVoucher' })
        }).catch( () => {
          this.feedback = 'Unexpected Error Occured, Please try again or contact adminstrator'
        }) 
      } else {
        this.feedback = 'You must enter  properly'
      } 
      })

    }
  }
}
</script>

<style>
.add-voucher  .card-panel{


  margin-top: 10px;


}
.add-voucher h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-voucher .field{
  margin: 20px auto;
  font-weight: bolder;
}


</style>
