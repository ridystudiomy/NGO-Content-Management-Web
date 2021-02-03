<template>
<div  class="bgv" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div class="add-v container">
    <div class="card-panel z-depth-5">    
    <form>  
      <h2 class="center-align pink-text lighten 4">Add New volunteer Project</h2>
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
    <form @submit.prevent="checkerror">
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
        <label for="title">volunteer Project Title:</label>
        <input type="text" class="validate" required="" aria-required="true" name="title" v-model="title">
      </div>
      <div class="field">
          <textarea class="materialize-textarea validate" placeholder="Description" name="description" required="" aria-required="true" v-model="description" ></textarea>
          <label for="textarea1">Description</label>
        </div>
        <div >
        <datepicker :format="format" placeholder="Date Project" v-model="dateproject"></datepicker>
      </div>
        <div>
    <gmap-map ref="mymap" :center="position" :zoom="7" style="width: 100%; height: 300px">
        <gmap-marker :position="position" :draggable="true" :clickable="true"  @dragend="gMapFunc($event.latLng)" />
    </gmap-map>
    <p>Drag the marker on map to where you project will be</p>
     <div class="field">
        <label for="title">Name of the place</label>
        <input type="text" name="title" v-model="address" placeholder="Auto Generate, Drag the marker in the map">
      </div>
      
    </div>        
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink">Add Project</button>
      </div>
    </form>
    </div>
  </div>
</div> 
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import axios from 'axios'
import M from 'materialize-css'
 // eslint-disable-next-line no-unused-vars
import db from '@/firebase/init'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
 // eslint-disable-next-line no-unused-vars
import slugify from 'slugify'
 let ref = db.collection("my_collection").doc();
 const postid=ref.id
export default {
  title: 'Add Volunteer Project',
  name: 'AddVproject',
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
      imageData: null,
      picture: null,
      uploadValue: 0,
      typefile:'',
      uyoutube:null,
      ufacebook:null,
      stoid:null,
      image:'https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/palestine-women.jpg?alt=media&token=e1adaccd-ef86-45b8-8dad-5aa14f9f2237',
      coordinates: null,
      position: { lat:25.799891, lng:6.926008},
      address:null,
      finalylink:null,
      fbfinallink:null, 
      listuser:[],
      country:null,
      dateproject:null  
     
    }
  },
   components: {
    Datepicker
  },
   created(){
       db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
     })

      let usid = firebase.auth().currentUser.uid
     db.collection("users").doc(usid).get().then(doc => {
       this.country =doc.data().country
          db.collection('users').where('country','==',doc.data().country).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let donation = doc.data()
        donation.id = doc.id
        this.listuser.push(donation)
      })
    })       
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
    gMapFunc(evnt)  {
            this.coordinates = {
                lat: evnt.lat(),
                lng: evnt.lng(),
                
            };

            
        this.getadd(evnt.lat(),evnt.lng())
         
            
        },
      
    getadd(lat, long) {
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key=AIzaSyDb6wrasmzmdG4bVIhmduYs_9gTC5PT-Ic"
        )
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
            console.log(response.data.error_message);
          } else {
            this.address = response.data.results[0].formatted_address;
             console.log(response.data.results[0].formatted_address);
          }
          this.spinner = false;
        })
        .catch((error) => {
          this.error = error.message;
          this.spinner = false;
          console.log(error.message);
        });
    },
    checkerror(){
      var dt = new Date();

          var some=`${
          (dt.getMonth()+1).toString().padStart(2, '0')}/${
          dt.getDate().toString().padStart(2, '0')}/${
          dt.getFullYear().toString().padStart(4, '0')} ${
          dt.getHours().toString().padStart(2, '0')}:${
          dt.getMinutes().toString().padStart(2, '0')}:${
          dt.getSeconds().toString().padStart(2, '0')}`


      this.feedback = null
      if(this.address){
           this.$swal.fire({
            title: 'Do you want to Notify People Around Your Place',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Yes`,
            denyButtonText: `Don't Notify`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
             var i; 
            for (i = 0; i < this.listuser.length; i++) {
             
              db.collection("notifications").add({
                content:"New Volunteer Project Near to your place: "+ this.title ,
                contentid:postid,
                contentpic:"https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/volunteer.png?alt=media&token=8d7fb551-7312-4368-8eaa-7bc2a6ba32dd",
                page:"ViewVproject",
                time:some,
                touser:this.listuser[i].id
              })

              db.collection("users").doc(this.listuser[i].id).update({
                nnotification:firebase.firestore.FieldValue.increment(1)
              })

              this.addStory()
             
          }

            } else if (result.isDenied) {
              
               this.addStory()
            }
          })
      }else{
        this.feedback="Place Drag the marker to location of the volunteer project place"
      }
    } ,  
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
        
         
        //save data to firestore
        db.collection('vprojects').doc(postid).set({
          title: this.title,
          descri: this.description,
          slug: this.slug,
          name:doc.data().name,
          acctype:doc.data().acctype,
          userid:usid,
          datecreate:this.date,
          listvon:[],
          img:this.picture,
          uyoutube:this.finalylink,
          ufacebook:this.fbfinallink,
          projectid:postid,
          location:new firebase.firestore.GeoPoint(this.coordinates.lat, this.coordinates.lng),
          locationname:this.address,
          status:'incomplete',
          country:this.country,
          dateproject:this.dateproject         

        }).then(() => {
          this.$router.push({ name: 'ManageVproject' })
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
.bgv{
  padding-bottom:10px ;
  height:cover;
  background-size: cover;
 
}
.add-v .card-panel{
 
  margin-top: 10px;


 
}
.add-v h2{
  font-size: 2em;
  margin: 20px auto;
}
.add-v .field{
  margin: 20px auto;
  font-weight: bolder;
}

</style>
