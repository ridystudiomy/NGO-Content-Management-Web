<template>
  <div class="navbar">
    <nav  :class="nvcolour">
      <div >
         <router-link :to="{ name: 'Home' }" class="brand-logo "><img class="imgicon" :src="logo"></router-link>
      
        <ul class="right">
          <li v-if="!user" ><router-link class="blue-text" :to="{ name: 'Signup' }">Signup</router-link></li>
          <li v-if="!user"><router-link class="blue-text" :to="{ name: 'Login' }">Login</router-link></li>
           <li v-if="user"><a class="blue-text"><span class="black-text text-darken-3">Welcome: </span>{{ names }}</a></li>
          <li id="menu12" v-show="user" data-target="slide-out1" class="sidenav-trigger poing"><i @click.prevent="showinfo" class="material-icons">menu</i></li>
        <a v-show="user" class='dropdown-trigger btn noty' @click.prevent="pressnoti()" data-target='dropdown100'>
           <i id="notication" class="material-icons">notifications</i>
           <div class="centered">{{nnotification}}</div>
         </a>
  <ul id='dropdown100' class='dropdown-content'>
    <ul class="notications collection">  
         <li v-for="noti in notications" :key="noti.contentid" >
           
           <div class="row">
             <router-link  :to="{ name: noti.page , params: { id: noti.contentid } }">
                <div class="col s2 notipic">
                <a href="#user"><img class="circle" :src="noti.contentpic" alt=""></a>
                </div>  
               <div class="col s8">
                <div class="notipart"> <span class="black-text text-darken-2 komcon1">{{noti.content}}</span></div>
                <div class="blue-text text-darken-2 notidate">{{noti.time}}</div>
                 
              </div>
              </router-link> 
            </div>  
            
        </li>              
        </ul>  
  </ul>

       </ul> 
       
      <div class="row ">
    <div class="col s12 wow">
      <ul class="tabs">
        <li class="col s1"></li>
        <li target="_self" class="tab col s2 "><router-link class="blue-text" :to="{ name: 'Donation' }"><b>Donation</b></router-link></li>
        <li target="_self" class="tab col s2"><router-link    class="blue-text" :to="{ name: 'Story' }"><b>Stories</b></router-link></li>
        <li target="_self" class="tab col s2"><router-link class="blue-text" :to="{ name: 'Vproject' }"><b>Volunteer Project</b></router-link></li>
        <li target="_self" class="tab col s2"><router-link class="blue-text" :to="{ name: 'Coupun' }"><b>Redeem Voucher</b></router-link></li>        
        <li target="_self" class="tab col s2"><router-link class="blue-text" :to="{ name: 'GMap' }"><b>About Us</b></router-link></li>
        <li class="col s1"></li>
      </ul>
    </div>
   
  </div>
   
      </div>
    </nav>
    <template>
    <ul id="slide-out1" class="sidenav">
    <li><div class="user-view">
      <div class="background">
        <img src="https://materializecss.com/images/office.jpg">
      </div>
      <a href="#user"><img v-if="detail" class="circle" :src="detail.profilepic" alt=""></a>
      <a v-if="detail" ><span class="white-text name">{{detail.name}}</span></a>
    </div></li>
    <li id="mweb" v-show="admin&&branch"><router-link class="blue-text" :to="{ name: 'ManageWeb' }">Manage Website</router-link></li>
    <li><div class="divider"></div></li>
    <li id="mprofile" ><router-link class="blue-text"   :to="{ name: 'UserProfile', params: {id:profileid}}">Manage Profile</router-link></li>
     <li id="mdonation" v-show="branch" ><router-link class="blue-text" :to="{ name: 'ManageDonation' }">Manage Donation</router-link></li>
    <li id="mstory" ><router-link class="blue-text" :to="{ name: 'ManageStory' }">Manage Stories</router-link></li>
    <li id="mvp" ><router-link class="blue-text" :to="{ name: 'ManageVproject' }">Manage Volunteer Projects</router-link></li>
    <li id="mv" v-show="branch" ><router-link class="blue-text" :to="{ name: 'ManageVoucher' }">Manage Voucher</router-link></li>
    <li id="muser" v-show="admin&&branch"><router-link  class="blue-text" :to="{ name: 'ManageUser' }">Manage User</router-link></li>
    <li  id="gout" ><a @click="logout" class="waves-effect red-text">Logout</a></li>
  </ul>
    </template>
  
   
  </div>
</template>

<script>
import M from 'materialize-css'
import firebase from 'firebase'
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'Navbar',

    mounted () {
     M.AutoInit()
},
  data(){
    return{
      user: null,
      profileid:null,
      branch:null,
      admin:null,
      detail:null,
      inf:false,
      logo:null,
      names:null,
      nvcolour:"",
      notications:[],
      nnotification:null
      

    }
  },
  created(){

     db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.logo = doc.data().logo
        this.nvcolour =doc.data().nvcolour
     })
  

    let userid = firebase.auth().currentUser.uid
    this.profileid=userid

    db.collection("users").doc(this.profileid).get().then(doc =>{
      this.names=doc.data().name
    
     if(doc.data().acctype=='branch'|| doc.data().acctype=='admin'){
       if(doc.data().acctype=='admin'){
            this.branch=true
            this.admin=true
            console.log('admin')
       

       }else{
          this.branch=true
        console.log('branch')
       }
       
     }else{
       this.branch=false
       this.admin=false
        console.log('community') 
     }
    
    })

    db.collection("users").doc(this.profileid)
    .onSnapshot((doc) => {
        this.nnotification=doc.data().nnotification
    });

            db.collection('notifications').orderBy('time').where('touser', '==', this.profileid)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(change => {
        let start =change.doc.data().time
        var result = moment(start).fromNow();
       
        if(change.type == 'added'){
          this.notications.unshift({
            page:change.doc.data().page,
            contentid: change.doc.data().contentid,
            content: change.doc.data().content,
            contentpic:change.doc.data().contentpic,
            time:result
          })
        }
      })
    }) 
   firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.user = user
      } else {
        this.user = null
      }
    })

    
  },
  methods: {

     pressnoti(){
        db.collection("users").doc(this.profileid).update({
          nnotification:null
        })
     },
     
    logout(){
      firebase.auth().signOut().then(() => {
        this.$router.push({ name: 'Login' })
      })
    },
    showinfo(){
      db.collection("users").doc(this.profileid).get().then(doc =>{
       this.detail=doc.data()

        })
        this.inf=true
    }
  },
}
</script>

<style>
.navbar .imgicon{
  height: 90px;
  width:cover ;
}
.navbar nav{
  padding-bottom: 100px;
}
.navbar .wow{
 margin-top: 25px;
}

.navbar .brand-logo{
  margin-top: 2px;
   margin-left: 100px;
   font-weight: bolder;
}
.navbar .right{
  margin-top: 10px;
  margin-right: 80px;
  font-weight:bolder;
}
.navbar .circle{
  margin-top:5px ;
 cursor: pointer;
}
.navbar .poing{
  cursor: pointer;
}
.navbar .s3{
  font-weight: bolder;

}

.noty{
  position: relative;
  text-align: center;
 
}

.centered {
  color: rgb(255, 255, 255);
  font-family: Roboto;
  font-weight:1000;
  position: absolute;
 bottom: 8px;
  right: 4px;
}


.dropdown-content li{
   width:cover !important;
}
.dropdown-content{
  width:670px !important;
 
}

.notipic img{
  margin-top:8px ;
  height:50px ;
  width: 100px;
}
.notipart{
  padding: 4px;
  width: cover;
  background: rgb(238, 238, 238);
  border-radius: 20px
}

.notipart .komcon1{
  font-size:0.9rem;
}

.notidate{
margin-top:2px ;
font-style: italic;
}


</style>
