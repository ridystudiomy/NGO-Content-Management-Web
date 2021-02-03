<template>

 <div class="home">
   
  <div id="carouselContainer" class="carousel carousel-slider center">
    <div class="carousel-fixed-item center white-text">
      <div class="center-align mor">
      
        <h1>Join Our Community </h1>
        <h4 class="center">To Give Palestine Better Life</h4>
       <a :class="btnhome"><router-link class="white-text" :to="{ name: 'Signup' }">Sign up Now</router-link></a>
      </div>
       
    </div>
    <div class="carousel-item white-text" href="#two">
      <img :src="webcom1">
    </div>
    <div class="carousel-item white-text" href="#four">
      <img :src="webcom2">
    </div>
    <div class="carousel-item white-text" href="#three">
      <img :src="webcom3">
    </div>
    <div class="carousel-item white-text" href="#one">
      <img :src="webcom4">
    </div>
  </div>

    <h3 :class="headerdsv"> <b>Donation campaigns</b></h3>
   <div  class="center-align">
   <img  src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/title-bottom.png?alt=media&token=fa054aca-29ef-4b82-a40a-7f9493d05bfb" alt>
   <p><b>Fundraising Project from our organization</b></p>
   </div>
    <div class="Donationmain">
    <div class="card" v-for="donation in donations.slice(0, 3)" :key="donation.id">
       <div class="card-image">
 <div v-show="donation.ufacebook" ><iframe  :src="donation.ufacebook" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div class="youtube" v-show="donation.uyoutube" ><country-flag class="flag" :country="donation.country" size='big'/><iframe  :src="donation.uyoutube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div class="youtube" v-show="donation.img" ><img :src="donation.img" alt=""><country-flag class="flag" :country="donation.country" size='big'/></div>
            <a href="" class="halfway-fab btn-floating pink pulse">
              <i class="material-icons">attach_money</i>
            </a>
            <div class="col s3"><span class="left"><i class="material-icons tiny">person</i><router-link class="blue-text" :to="{ name: 'Profile', params: {id: donation.userid}}"> By:{{ donation.name }} &nbsp;|</router-link> </span></div>
             <div class="col s3"><span class="left"><i class="material-icons tiny">date_range</i> {{ donation.datecreate }}</span></div>
       </div>
      <div class="card-content">
        
        <span :class="titledsv"  >{{ donation.title }}</span>
        <p>{{ donation.descri | snippet }}</p>
         
      </div>
        <div class="card-action">
        <button class="btn light-blue left cbutton">{{donation.curfund}}/{{donation.fundneed}} USD</button>
          <button :class="btndsv"><router-link :to="{ name: 'ViewDonation', params: { id: donation.id }}" class="blue-text" >Read More</router-link></button>
          <div class="row left">
    
    
     
    </div>
          </div>
    </div>


  </div>  
       <div class="center"><button class="waves-effect waves-light btn-large"><router-link class="white-text" :to="{ name: 'Donation' }">View More</router-link></button></div>
   <h3 :class="headerdsv"> <b>STORIES</b></h3>
   <div  class="center-align">
   <img  src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/title-bottom.png?alt=media&token=fa054aca-29ef-4b82-a40a-7f9493d05bfb" alt>
   <p><b>Place where you can share thought or anything related to Al-Quds and Palestine</b></p>
   </div>
  <div class="story">
        <div class="card" v-for="story in storys.slice(0, 3)" :key="story.id">
       <div class="card-image">
 <div v-show="story.ufacebook" ><iframe  :src="story.ufacebook" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div  class="youtube" v-show="story.uyoutube" ><country-flag class="flag" :country="story.country" size='big'/><iframe  :src="story.uyoutube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div class="youtube"  v-show="story.img" ><img :src="story.img" alt=""><country-flag class="flag" :country="story.country" size='big'/></div>
            <a href="" class="halfway-fab btn-floating pink pulse">
              <i class="material-icons">thumb_up</i>
            </a>
            <div class="col s3"><span class="left"><i class="material-icons tiny">person</i><router-link class="blue-text" :to="{ name: 'Profile', params: {id: story.userid}}"> By:{{ story.name }} &nbsp;|</router-link> </span></div>
             <div class="col s3"><span class="left"><i class="material-icons tiny">date_range</i> {{ story.datecreate }}</span></div>
       </div>
      <div class="card-content">
  
        <span :class="titledsv"  >{{ story.title }}</span>
        <p>{{ story.descri | snippet }}</p>
         
      </div>
        <div class="card-action">
       
          <button :class="btndsv"><router-link :to="{ name: 'ViewStory', params: { id: story.id }}" class="blue-text" >Read More</router-link></button>
          <div class="row left">
      <div class="col s3"><span class="right"><i class="material-icons tiny">thumb_up</i>{{ story.totlike }}</span></div>
      <div class="col"><span class="right"> | </span></div>
      <div class="col s3"><span class="right"><i class="material-icons tiny">comment</i>{{ story.tcomment }}</span></div>
    </div>
          </div>
    </div>
  </div>  
   <div class="center"><button class="waves-effect waves-light btn-large"><router-link class="white-text" :to="{ name: 'Story' }">View More</router-link></button></div>
   <h3 :class="headerdsv"> <b>Volunteer Project</b></h3>
   <div  class="center-align">
   <img  src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/title-bottom.png?alt=media&token=fa054aca-29ef-4b82-a40a-7f9493d05bfb" alt>
   <p><b>Place where you can join our volunteer program and earn point to claim vouchers</b></p>
   </div>
<div class="mvproject">
    <div class="card" v-for="vproject in vprojects.slice(0, 3)" :key="vproject.id">
       <div class="card-image">
 <div v-show="vproject.ufacebook" ><iframe  :src="vproject.ufacebook" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div class="youtube" v-show="vproject.uyoutube" ><country-flag class="flag" :country="vproject.country" size='big'/><iframe  :src="vproject.uyoutube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div class="youtube" v-show="vproject.img" ><img :src="vproject.img" alt=""><country-flag class="flag" :country="vproject.country" size='big'/></div>
            <a href="" class="halfway-fab btn-floating pink pulse">
              <i class="material-icons">pan_tool</i>
            </a>
            <div class="col s3"><span class="left"><i class="material-icons tiny">person</i><router-link class="blue-text" :to="{ name: 'Profile', params: {id: vproject.userid}}"> By:{{ vproject.name }} &nbsp;|</router-link> </span></div>
             <div class="col s3"><span class="left"><i class="material-icons tiny">date_range</i> {{ vproject.datecreate }}</span></div>
       </div>
      <div class="card-content">
         
        <span :class="titledsv" >{{ vproject.title }}</span>
        <p>{{ vproject.descri | snippet }}</p>
         
      </div>
        <div class="card-action">
          <button :class="btndsv"><router-link :to="{ name: 'ViewVproject', params: { id: vproject.id }}" class="blue-text" >Read More</router-link></button>
          </div>
    </div>
  </div>   
     <div class="center"><button class="waves-effect waves-light btn-large"><router-link class="white-text" :to="{ name: 'Vproject' }">View More</router-link></button></div>
  <br>
    <h3 :class="headerdsv"> <b>Our Project</b></h3>  
 <SuccesVp/>
    <h3 :class="headerdsv"> <b>Our Branches</b></h3>    
 <BranchLogo/>  
 <br> 
</div>

</template>

<script>
import SuccesVp from '@/components/alert/SuccesVp'
import BranchLogo from '@/components/home/BranchLogo'
import db from '@/firebase/init'
import M from 'materialize-css'
export default {
  title: 'Home',
   name: 'Home',
    data(){
     return{
        donations: [],
        storys: [],
        vprojects: [],
        webcom1:null,
        webcom2:null,
        webcom3:null,
        webcom4:null,
        btnhome:'',
        btndsv:'' ,
        headerdsv:null,
        titledsv:'',        
     }
    
   },
    components:{
      BranchLogo,SuccesVp
  },
    mounted() {
       
  initCarousel('.carousel', {
    fullWidth: true,
    indicators: true,
    autoScroll: 5000 // time in ms - custom
  });


// This is a wrapper function for setting up carousels with autoplay
// elms - string or array<string> for the elements to initialize. Use #carousel_id for an element. Use .carousel-class for class
// opts - object with the options to initialize all instances with
// returns a carousel instance or Array<carousel> instances
function initCarousel(elms, opts) {
  if (!window || !document) return null;

  const instances = M.Carousel.init(getElements(elms), opts);

  if (Array.isArray(instances)) {
    for (let i = 0; i < instances.length; ++i) {
      addAutoScroll(instances[i]);
    }
  } else {
    addAutoScroll(instances);
  }

  return instances;
}

// wrapper function for removing the custom event listeners and destroy method
 // eslint-disable-next-line no-unused-vars
function destroyCarousel(instances) {
  if (!window || !document) return null;

  if (Array.isArray(instances)) {
    for (let i = 0; i < instances.length; ++i) {
      removeAutoScroll(instances[i]);
      instances[i].destroy();
    }
  } else {
    removeAutoScroll(instances);
    instances.destroy();
  }
}

// Adds the autoscroll ability
function addAutoScroll(instance) {
  if (!instance.options.autoScroll) return;

  instance.autoScrollIntervalId = window.setInterval(() => {
    instance.next();
  }, instance.options.autoScroll);

}

// removes the autoscroll ability
function removeAutoScroll(instance) {
  if (instance.autoScrollIntervalId) {
    window.clearInterval(instance.autoScrollIntervalId);
    instance.autoScrollIntervalId = undefined;
  }
}

// if searching for an element by id, insert a # in front of the passed in id
function getElements(elms) {
  if (elms.charAt(0) === "#") {
    elms = elms.replace("#", "");
    return document.getElementById(elms);
  }

  return document.querySelectorAll(elms);
}

    

    },
   
  

   created(){
     db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.webcom1 = doc.data().caro1
        this.webcom2 = doc.data().caro2
        this.webcom3 = doc.data().caro3
        this.webcom4 = doc.data().caro4
        this.btnhome = doc.data().btnhome   
        this.btndsv = doc.data().btndsv
        this.headerdsv = doc.data().headerdsv
        this.titledsv = doc.data().titledsv     
        
     })

         db.collection('storys').orderBy('datecreate','desc').limit(10).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.data().img || doc.data().uyoutube){
           let donation = doc.data()
        donation.id = doc.id
        this.storys.push(donation)
        }
      })
    }) 
    
          db.collection('donations').orderBy('datecreate','desc').limit(10).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.data().img || doc.data().uyoutube){
           let donation = doc.data()
        donation.id = doc.id
        this.donations.push(donation)
        }
      })
    })     

          db.collection('vprojects').orderBy('datecreate','desc').limit(10).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if(doc.data().img || doc.data().uyoutube){
           let donation = doc.data()
        donation.id = doc.id
        this.vprojects.push(donation)
        }
      })
    })
   },

   methods: {
       

   }
  
   
     
}
</script>

<style>
.carousel.carousel-slider{
  margin-top: 100px;
  height: 800px; 
}
.home h2{
  padding-top: 60px;
  font-size: 3.5rem;
  font-weight: bolder;
  text-align: center
}
.home .mor{
color: white;
  text-shadow: 2px 2px 4px #000000;
  margin-bottom: 50px;
 
  
}

.carousel img{
  height: 700px;
}

</style>