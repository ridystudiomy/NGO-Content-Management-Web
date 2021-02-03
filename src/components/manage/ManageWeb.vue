<template>
<div  class="bg" :style="{ backgroundImage: 'url(' + image + ')' }">>
  <div class="manageweb">
    <div class="card-panel  z-depth-5">
        <h2 class="pink-text">Edit Website {{typefile}}</h2>
         <select v-model="typefile">
      <option value="" disabled selected>Choose type of file</option>
      <option value="logo">Logo</option>
      <option value="slider">Slider</option>
      <option value="background">Background</option>
      <option value="color">Main Color</option>
       <option value="apage">Main Text</option>
    </select>
    
        <div v-show="typefile == 'logo'" class="card">
         <div class="row">
          <div class="col s6"> <h5>Current Image</h5><img :src="logo" alt=""></div>
          <div class="col s6">
      <select v-model="chose">
      <option value="" disabled selected>Choose file</option>
      <option value="newimage">New Image</option>
      <option  value="oldimage">Old Images</option>
    </select>
     <div v-show="chose == 'newimage'" class="file-field input-field">
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

      <button class="btn" @click.prevent="onUpload">Upload</button>
      </div>
       <div v-show="chose == 'oldimage'" class="thumb center" >
           <div class="card1" v-for="story in displayedPosts" :key="story.ids">
               <img :src="story.u" alt="">
               <div v-if="selected" class="">
               <span class="left-align"><a class="btn-small white-text" @click.prevent="soldimg(story,story.u)" >Select</a></span>&nbsp;
               <span class="left-align"><a class="btn-small  red darken-4 white-text" @click.prevent="del(story.u,story.ids)" >Delete</a></span>
               </div>
               <div v-else>
                <span class="left-align"><a class="btn-small green darken-3 white-text" >Selected</a></span>
                </div> 
           </div> 
                
      </div> 
    </div>
    </div>
<div class="center-align">
 <a class="waves-effect waves-light btn-large white-text mar" @click.prevent="updatelogo()" >Update</a>
</div>
      </div>
      <div v-show="typefile == 'slider'" class="card">
                  <div class="row">
                    
          <div class="col s6"> 
            <select v-model="chosecaro">
            <option value="" disabled selected>Choose Slide</option>
            <option value="c1">Slide 1</option>
            <option value="c2">Slide 2</option>
            <option value="c3">Slide 3</option>
            <option value="c4">Slide 4</option>
            </select>  
            <div v-show="chosecaro=='c1'">  
            <img :src="caro1" alt="">
             <!-- <div class="row" > 
                     <label class="col s3 pink-text">
                      <input name="group1" type="radio" checked value="slide1"  v-model="warrange"/>
                      <span>Slide 1</span>
                    </label >
                     <label class="col s3">
                      <input name="group1" type="radio" value="slide2"  v-model="warrange" />
                      <span>Slide 2</span>
                    </label>                    
                    <label class="col s3">
                      <input name="group1" type="radio" value="slide3"  v-model="warrange" />
                      <span>Slide 3</span>
                    </label>  
                    <label class="col s3">
                      <input name="group1" type="radio" value="slide4"  v-model="warrange" />
                      <span>Slide 4</span>
                    </label>                     
             </div> -->
            </div>
            <div v-show="chosecaro=='c2'">  
            <img :src="caro2" alt="">
            </div> 
            <div v-show="chosecaro=='c3'">  
            <img :src="caro3" alt="">
            </div> 
            <div v-show="chosecaro=='c4'">  
            <img :src="caro4" alt="">
            </div>   
          </div>
          <div class="col s6">
      <select v-model="chose">
      <option value="" disabled selected>Choose file</option>
      <option value="newimage">New Image</option>
      <option  value="oldimage">Old Images</option>
    </select>
     <div v-show="chose == 'newimage'" class="file-field input-field">
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

      <button class="btn" @click.prevent="onUpload">Upload</button>
      </div>
       <div v-show="chose == 'oldimage'" class="thumb center">
           <div class="card1" v-for="story in displayedPosts" :key="story.ids">
               <img :src="story.u" alt="">
               <div v-if="selected" class="">
               <span class="left-align"><a class="btn-small white-text" @click.prevent="soldimg(story,story.u)" >Select</a></span>&nbsp;
               <span class="left-align"><a class="btn-small  red darken-4 white-text" @click.prevent="soldimg(story,story.u)" >Delete</a></span>
               </div>
               <div v-else>
                <span class="left-align"><a class="btn-small green darken-3 white-text" >Selected</a></span>
                </div> 
           </div> 
             
      </div> 
    </div>
    </div>
<div class="center-align">
 <a class="waves-effect waves-light btn-large white-text mar" @click.prevent="updatelogo()" >Update</a>
</div>
      </div>
      <div v-show="typefile == 'background'" class="card">
                 <div class="row">
          <div class="col s6"> <img :src="image" alt=""></div>
          <div class="col s6">
      <select v-model="chose">
      <option value="" disabled selected>Choose file</option>
      <option value="newimage">New Image</option>
      <option  value="oldimage">Old Images</option>
    </select>
     <div v-show="chose == 'newimage'" class="file-field input-field">
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

      <button class="btn" @click.prevent="onUpload">Upload</button>
      </div>
       <div v-show="chose == 'oldimage'" class="thumb center">
           <div class="card1" v-for="story in displayedPosts" :key="story.ids">
               <img :src="story.u" alt="">
               <div v-if="selected" class="">
               <span class="left-align"><a class="btn-small white-text" @click.prevent="soldimg(story,story.u)" >Select</a></span>&nbsp;
               <span class="left-align"><a class="btn-small  red darken-4 white-text" @click.prevent="soldimg(story,story.u)" >Delete</a></span>
               </div>
               <div v-else>
                <span class="left-align"><a class="btn-small green darken-3 white-text" >Selected</a></span>
                </div> 
           </div> 
               
      </div> 
    </div>
    </div>
<div class="center-align">
 <a class="waves-effect waves-light btn-large white-text mar" @click.prevent="updatelogo()" >Update</a>
</div>
      </div>
          <!-- color section red-->
       <div v-show="typefile == 'color'" class="card">
         <div class="row">
        <div :class="currentcolor"><p><b>Current Color</b></p><br><br></div>
        <div class="col s6">
         <select v-model="chosecolor">
          <option value="" disabled selected>Choose Color</option>
           <!-- color  red-->
           <option  value="red"><p class= "red">red</p></option>
           <option  value="pink"><p class= "pink">pink</p></option> 
           <option  value="purple"><p class= "purple">purple</p></option>
           <option  value="indigo"><p class= "indigo">indigo</p></option> 
           <option  value="blue"><p class= "blue">blue</p></option>
           <option  value="cyan"><p class= "cyan">cyan</p></option> 
           <option  value="teal"><p class= "teal">teal</p></option>
           <option  value="green"><p class= "green">green</p></option> 
           <option  value="yellow"><p class= "yellow">yellow</p></option> 
           <option  value="amber"><p class= "amber">amber</p></option>
           <option  value="orange"><p class= "orange">orange</p></option>  
           <option  value="brown"><p class= "brown">brown</p></option>
           <option  value="grey"><p class= "grey">grey</p></option>                                             
        </select>
    

        </div>
         </div>
         <div class="center-align">
 <a class="waves-effect waves-light btn-large white-text mar" @click.prevent="updatecolor()" >Update</a>
</div>
       </div> 
       <div v-show="typefile == 'apage'" class="card">
         <div class="row">
       <div class="field title">
        <label for="title">About Us Description:</label>
        <input type="text" name="abouttext" v-model="abouttext" class="validate" required="" aria-required="true">
      </div>
       <div class="field title">
        <label for="title">Facebook link:</label>
        <input type="email" name="email" v-model="fblinkl" class="validate" required="" aria-required="true">
      </div> 
       <div class="field title">
        <label for="title">Youtube link:</label>
        <input type="email" name="email" v-model="youtubelink" class="validate" required="" aria-required="true">
      </div>       
       <div class="field title">
        <label for="title">Email Footer:</label>
        <input type="email" name="email" v-model="email" class="validate" required="" aria-required="true">
      </div>                    
        <div class="col s6">

    

        </div>
         </div>
         <div class="center-align">
 <a class="waves-effect waves-light btn-large white-text mar" @click.prevent="updatemaintext()" >Update</a>
</div>
       </div>        
            		<ul class="pagination right-align">
				<li class="waves-effect">
					<a class="page-link" v-if="page != 1" @click="page--"> <i class="material-icons">chevron_left</i> </a>
				</li>
				<li class="waves-effect">
					<a  class="page-link" v-for="(pageNumber,index) in pages.slice(page-1, page+5)" @click="page = pageNumber" :key="index"> {{pageNumber}}</a>
				</li>
				<li class="waves-effect">
					<a   @click="page++" v-if="page < pages.length"> <i class="material-icons">chevron_right</i> </a>
				</li>
			</ul>
    </div>
  </div>
</div> 
</template>

<script>

import M from 'materialize-css'
// eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
import db from '@/firebase/init'


export default {
      title: 'Manage Web Componets',
  name: 'ManageWeb',
mounted () {
     M.AutoInit()
},
 
  data(){
    return{
     allurl:null,
     selectedold:null,
     typefile:'',
     redcolor:'',
     chose:'',
     chosecolor:'',
     image:'',
     caro1:'',
     caro2:'',
     caro3:'',
     caro4:'',
     logo:'',
     imageData: null,
    picture: null,
    uploadValue: 0,
    find:'',
    chosecaro:'',
    warrange:'',
    posts : [''],
	  page: 1,
		perPage: 6,
    pages: [],
    dell:'mo',
    selected:'select',
    currentcolor:'',
    fblinkl:'',
    email:"",
    youtubelink:'',
    abouttext:''

 
    }
  },

  methods: {
    del(picurl,ids){
     
     firebase.storage().refFromURL(picurl).delete().then(()=>{
       this.posts =this.posts.filter(story => {
              return story.ids != ids
           })
     })
      

    },

    getPosts (){
           
    // we'll create a Reference to that folder:
    var storageRef = firebase.storage().ref("web comps");


    // Now we get the references of these images
    storageRef.listAll().then(function(result) {
      result.items.forEach(function(imageRef) {
         
        // And finally display them
        displayImage(imageRef);
      });
      // eslint-disable-next-line no-unused-vars
    }).catch(function(error) {
      // Handle any errors
    });
     var fileURLs = []
     var id=0
    function displayImage(imageRef) {
       // eslint-disable-next-line no-unused-vars
      imageRef.getDownloadURL().then(url => {  
           id +=1
           let story = {ids:id,u:url}
       fileURLs.push(story);
        // eslint-disable-next-line no-unused-vars
      }).catch(function(error) {
        // Handle any errors
      });
    }
   
     this.posts=fileURLs
    
    },
     setPages () {
       this.pages= []
			let numberOfPages = Math.ceil(this.posts.length / this.perPage);
			for (let index = 1; index <= numberOfPages; index++) {
				this.pages.push(index);
			}
		},
		paginate (posts) {

			let page = this.page;
			let perPage = this.perPage;
			let from = (page * perPage) - perPage;
			let to = (page * perPage);
			return  posts.slice(from, to);
		},    
    

    soldimg(story,surl){
      
     this.selectedold=surl
        var ali=[story]
     this.posts=ali
     this.page=1;
     this.selected=null
     
      },

      updatemaintext(){
        db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").update({
            fblinkl:this.fblinkl,
            email:this.email,
            youtubelink:this.youtubelink,
            abouttext:this.abouttext
        }).then(()=>{
          this.$router.go()
        })
      },

      updatelogo(){
          
          // eslint-disable-next-line no-unused-vars
          let reff = db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv")

          if(this.chosecaro=='c1' && this.typefile=='slider'){
              console.log('saya gay 1')
                reff.update({
                 caro1:this.selectedold
                }).then(()=>{
                this.$router.go()
                })              
          }else if(this.chosecaro=='c2' && this.typefile=='slider'){
               console.log('saya gay 2')
                reff.update({
                 caro2:this.selectedold
                }).then(()=>{
                this.$router.go()
                })               
          }else if(this.chosecaro=='c3' && this.typefile=='slider'){
               console.log('saya gay 3')
                reff.update({
                 caro3:this.selectedold
                }).then(()=>{
                this.$router.go()
                })               
          }else if(this.chosecaro=='c4' && this.typefile=='slider'){
               console.log('saya gay 4')
                reff.update({
                 caro4:this.selectedold
                }).then(()=>{
                this.$router.go()
                })
          }else if(this.typefile=='logo'){
               console.log('logo')
                reff.update({
                 logo:this.selectedold
                }).then(()=>{
                this.$router.go()
                })  
          }else if(this.typefile=='background'){
               console.log('background')  
                reff.update({
                 bgimg:this.selectedold
                }).then(()=>{
                this.$router.go()
                })                  
          }else{
              console.log('error noob')
          }
          /*
          console.log(this.selectedold)
           db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").update({
               logo:this.selectedold
           }).then(()=>{
          this.$router.go()
         })
         */
      },
         
    previewImage(event) {
      this.uploadValue=0;
      this.picture=null;
      this.imageData = event.target.files[0];
    },

    onUpload(){
      this.picture=null;
      const storageRef=firebase.storage().ref(`web comps/${this.imageData.name}`).put(this.imageData);
      storageRef.on(`state_changed`,snapshot=>{
        this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, error=>{console.log(error.message)},
      ()=>{this.uploadValue=100;
        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
          console.log(url)
          this.selectedold =url;
        });
      }
      );
    },
    updatecolor(){
      console.log(this.chosecolor)

      var newbtndsv='btn '+this.chosecolor+" lighten-4 right"
      var newbtnhome='btn '+this.chosecolor+" lighten-3"
      var newfooter='page-footer '+this.chosecolor+" lighten-4"
      var newheaderdsv=this.chosecolor+"-text center"
      var newnvcolour=this.chosecolor+" lighten-4"
      var newtitledsv =this.chosecolor+"-text titles"
      var newuserprofilename=this.chosecolor+"-text name"
      var newuserprofileside='col l2 '+this.chosecolor+" lighten-5"
      var newcurrentcolor ='col s6 '+this.chosecolor+" lighten-5"

        db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").update({
               btndsv:newbtndsv,
               btnhome:newbtnhome,
               footer:newfooter,
               headerdsv:newheaderdsv,
               nvcolour:newnvcolour,
               titledsv:newtitledsv,
               userprofilename:newuserprofilename,
               userprofileside:newuserprofileside,
               currentcolor:newcurrentcolor

           }).then(()=>{
          this.$router.go()
         })

      
    }
  },
  	computed: {
		displayedPosts () {
			return this.paginate(this.posts);
		}
	},
	watch: {
		posts () {
      if(this.dell){
        this.setPages();
      }else{
        console.log('masuk x')
      }
			
		}
  }, 
	created(){
    db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
        this.caro1 = doc.data().caro1
        this.caro2 = doc.data().caro2
        this.caro3 = doc.data().caro3
        this.caro4 = doc.data().caro4
        this.logo = doc.data().logo
        this.currentcolor = doc.data().currentcolor
        this.email = doc.data().email
        this.youtubelink = doc.data().youtubelink
        this.fblinkl = doc.data().fblinkl
        this.abouttext=doc.data().abouttext
     })


		this.getPosts();
	},
	filters: {
		trimWords(value){
			return value.split(" ").splice(0,20).join(" ") + '...';
		}
	}   
}
</script>

<style>
.bg{
  height: 1080px;
  background-size: cover;
 
 
}

.manageweb .card-panel{
  margin-top: 50px;
margin-left:125px ;
margin-right:100px ;

 
}
.manageweb form{

  margin-bottom: 50px; 
  margin-top: 50px;
}

.manageweb h2{
  font-size: 2.4em;
  text-align: center;
}
.manageweb .field{
  margin-bottom: 16px;
}
.thumb{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  
  
}
.thumb img{
 height: 100px ;
 width: cover;
margin-top: 10px;
}

.card .mar{
 margin-bottom: 20px;  
 font-weight: bold;

}
</style>