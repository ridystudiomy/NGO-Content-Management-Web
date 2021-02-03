<template>
<div  class="bgv" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div class="edit-story container">
   <div class="card-panel z-depth-5">
        <h2 class="center-align pink-text lighten 4">Edit Volunteer Project</h2>
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
       <span class="red-text">Choose image and click upload first</span>
      <p>Progress: {{uploadValue.toFixed()+"%"}}
      <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
    </div>

      
</div>
<br>
<br>
     </form>
      <div v-if="info">
    <form >
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
        <div >
        <datepicker format="yyyy-MM-dd" placeholder="Date Project" v-model="dateconvert"></datepicker>
      </div>
       <div class="field">
        <label for="title">Description:</label>
        <textarea class="materialize-textarea" name="title" v-model="info.descri"></textarea>
      </div>
              <div>
    <gmap-map ref="mymap" :center="position" :zoom="7" style="width: 100%; height: 300px">
        <gmap-marker :position="position" :draggable="true" :clickable="true"  @dragend="gMapFunc($event.latLng)" />
    </gmap-map>
    <p>Drag the marker on map to where you project will be</p>
     <div  class="field">
        <label for="title">Name of the place</label>
        <input type="text" name="title" v-model="info.locationname">
      </div>
      
    </div> 
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{ feedback }}</p>
        <button class="btn pink" @click.prevent="editProfile">Update Project</button>
      </div>
        </form>
       </div>
  
   </div>
  </div>
 </div> 
</template>

<script>
import moment from 'moment';
import Datepicker from 'vuejs-datepicker';
import axios from 'axios'
import M from 'materialize-css'
 // eslint-disable-next-line no-unused-vars
import db from '@/firebase/init'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
 // eslint-disable-next-line no-unused-vars
import slugify from 'slugify'
import Fbvideo from '@/components/layout/Fbvideo'
export default {
  title: 'Edit project',
  name: 'EditVproject',
      mounted () {
    var elems = document.querySelectorAll('.datepicker');
     // eslint-disable-next-line no-unused-vars
    var instances = M.Datepicker.init(elems);
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
      colname:'vprojects',
      coordinates: null,
      position: { lat:20.799891, lng:6.926008},
      address:'',
      dateconvert:''
    
    }
  },
  components: {
    Fbvideo,Datepicker
  },  
created(){

   db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
     })
   
    let ref = db.collection('vprojects')
    ref.doc(this.$route.params.id).get()
    .then(doc => {
      var dt=new Date(doc.data().dateproject.seconds*1000)
      this.dateconvert =moment(dt).format('YYYY/MM/DD')
      this.position = { lat:doc.data().location.latitude, lng:doc.data().location.longitude}
      this.coordinates = { lat:doc.data().location.latitude, lng:doc.data().location.longitude}
      this.getadd(doc.data().location.latitude, doc.data().location.longitude)
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
            "&key=api key here"
        )
        .then((response) => {
          if (response.data.error_message) {
            this.error = response.data.error_message;
            console.log(response.data.error_message);
          } else {
            this.info.locationname = response.data.results[0].formatted_address;
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

    removeimage(picurl,youtubleurl,fburl){

        if(picurl){
                 console.log("deleting.."+picurl)
       firebase.storage().refFromURL(picurl).delete().then(()=>{
         db.collection('vprojects').doc(this.$route.params.id).update({
          img:null
        }).then(() => {
            this.$router.go()
        })
         }).catch(function(error) {
          console.log(error)
        }); 
            
        }else if(youtubleurl){
                        console.log("deleting.."+youtubleurl)
      db.collection('vprojects').doc(this.$route.params.id).update({
           uyoutube:null
        }).then(() => {
            this.$router.go()
        })     
        }else{
                           console.log("deleting.."+fburl)
      db.collection('vprojects').doc(this.$route.params.id).update({
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
      checktimeformat(){
        console.log(new Date(this.dateconvert))
         
      },

      editProfile(){
              const newdate = new Date(this.dateconvert)
              if(this.picture){
                this.uyoutube=null
                this.ufacebook=null
                  if(this.info.img){
                     firebase.storage().refFromURL(this.info.img).delete()
                      this.addtofirebase()
                  }else{
                    this.addtofirebase()
                  }
              }else if(this.uyoutube){
                   this.picture=null
                   this.ufacebook=null
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
                      this.uyoutube=null
                      this.picture=null
                      if(this.info.img){
                          firebase.storage().refFromURL(this.info.img).delete()
                        }
                      var regExpf = /\w\w\w\w\w\w\w\w\w+/gm
                      var matchs = this.ufacebook.match(regExpf);
                      console.log(matchs)
                      var result1 =matchs[0];
                      var result2 =matchs[1];
                      console.log(result2)
                      if(result1 && result2){
                          this.fbfinallink=this.ufacebook
                          this.addtofirebase()
                      }else{
                        this.feedback ="Please enter the corret facebook format"
                      }
                                 
                 
               
              }else{
                   db.collection('vprojects').doc(this.$route.params.id).update({
                    title: this.info.title,
                    descri: this.info.descri,
                    img:this.info.img,
                    uyoutube:this.info.uyoutube,
                    locationname: this.info.locationname,
                    ufacebook:this.info.ufacebook,
                    location:new firebase.firestore.GeoPoint(this.coordinates.lat, this.coordinates.lng),
                    dateproject:newdate
                  }).then(() => {
                    this.$router.push({ name: 'ManageVproject' })
                  }).catch(err => {
                  this.feedback=err
                  })                
              }    
          
      },
      addtofirebase(){
                const newdate = new Date(this.dateconvert)
                  db.collection('vprojects').doc(this.$route.params.id).update({
                  title: this.info.title,
                  descri: this.info.descri,
                  img:this.picture,
                  uyoutube:this.finalylink,
                  ufacebook:this.fbfinallink,
                  location:new firebase.firestore.GeoPoint(this.coordinates.lat, this.coordinates.lng),
                   locationname:this.info.locationname,
                   dateproject:newdate
                }).then(() => {
                  this.$router.push({ name: 'ManageVproject' })
                }).catch(err => {
                this.feedback=err
                })  
      }
  }
}
</script>

<style>


.modal-content img{
    height:700px ;
  width: 1000px;
}


</style>
