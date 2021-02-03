<template>
  <div id="test" class="row">
   
      <div :class="userprofileside">
        <!-- Grey navigation panel -->
            <ul class="profile  sideleft loft">
    <li><div class="user-view">
      <div class="background">
    
      </div>
      <a href="#user"><img class="circle" :src="info.profilepic" alt=""></a>
      <br>
      <br>
      <span :class="userprofilename">{{info.name}}</span>
    </div></li>
   
    <li><div class="divider"></div></li>
    <li><a @click.prevent="checkpage('userpofile')" >View Profile</a></li>
      <li><a @click.prevent="checkpage('stor')" >Stories</a></li>
    <li v-show="admin||branch"><a @click.prevent="checkpage('vpo')" > Volunteer Projects</a></li>
     <li v-show="admin||branch"><a @click.prevent="checkpage('donate')" >Donation</a></li>
     <li><img  @click.prevent="checkpage('facebook')" src="https://firebasestorage.googleapis.com/v0/b/gwcqp-40547.appspot.com/o/logo-01-01.png?alt=media&token=7b3924dd-2f46-4422-a397-d19d52ea791b"></li>

     
      
    
    
  </ul>
   
      </div>
          <div  v-if="selected=='userpofile'" class="prof col l10">
             <div  v-if="info" class="col s6 kiri"><img  class="center-align" :src="info.profilepic" alt="">
             <form  @submit.prevent="edit">
        <ul class="row">
             
        <li class="col s6">Account Type:</li>
        <li class="col s6  blue-text ">{{info.acctype}}</li>
        <li class="col s6 ">Name:</li>
        <li class="col s6  blue-text">{{info.name}}</li>
        <li class="col s6 ">Sex:</li>
        <li class="col s6  blue-text">{{info.sex}}</li>
        <li class="col s6 ">Address:</li>
        <li class="col s6  blue-text">{{info.address}}</li>
        <li class="col s6  ">Contact:</li>
        <li class="col s6  blue-text">{{info.contact}}</li>
        </ul>
            
                 
          
    </form>
             
             </div>
             
            <div class="col s6 kanan" >
             
              <h2 v-if="admin||branch" >List Completed Volunteer Projects</h2>
              <h2 v-else >List of project joined</h2>
                  <ul v-for="(vproject,index) in vprojects" :key="vproject.id" >
                      <li>{{index+1}}.<router-link class="blue-text" :to="{ name: 'ViewVproject', params: {id: vproject.id}}">{{vproject.title}}</router-link></li>
                  </ul>
               
            
            
            </div>
         </div>
         <div  v-if="selected=='facebook'" class="col l10">
           <Testing3 :sid="test" />
          
        </div>   
                 <div  v-if="selected=='ig'" class="col l10">
           <h3>ig</h3>
          
        </div>  
        <TransStory
         v-if="selected=='stor'"
					:data="sons"
					:total-pages="Math.ceil(sons.length / 6)"
					:total="sons.length"
					:per-page="6"
					:current-page="currentPage"
					@pagechanged="onPageChange"
				/>

        <TransVpo
         v-if="selected=='vpo'"
					:data="vpro"
					:total-pages="Math.ceil(vpro.length / 6)"
					:total="vpro.length"
					:per-page="6"
					:current-page="currentPage"
					@pagechanged="onPageChange"
				/>

    <TransDonate
          v-if="selected=='donate'"
					:data="trans"
					:total-pages="Math.ceil(trans.length / 6)"
					:total="trans.length"
					:per-page="6"
					:current-page="currentPage"
					@pagechanged="onPageChange"
				/>
  </div>
</template>

<script>
import M from 'materialize-css'
import db from '@/firebase/init'
import TransStory from './TransStory'
import TransVpo from './TransVpo'
import TransDonate from './TransDonate'
import Testing3 from '@/components/home/Testing3'
import { mapGetters, mapActions } from 'vuex'

export default {
  title: 'Profile',
  name: 'Profile',
  mounted(){
     M.AutoInit()
    
    
  },
  data(){
    return {
      info:null,
      currentPage: 1,
      selected:'userpofile',
       vprojects:[],
       branch:'',
       admin:'',
       test:this.$route.params.id,
       userprofileside:null,
       userprofilename:null
       
    }
  },
  created(){
    console.log(this.test)
      db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.image = doc.data().bgimg
         this.userprofileside = doc.data().userprofileside
         this.userprofilename = doc.data().userprofilename         
     })
   
     db.collection('users').doc(this.$route.params.id).get().then(doc =>{
        this.info = doc.data()
     })

     //get 
           
    var userid = this.$route.params.id


       db.collection("users").doc(userid).get().then(doc =>{
    
     if(doc.data().acctype=='branch'|| doc.data().acctype=='admin'){
       if(doc.data().acctype=='admin'){
            this.branch=true
            this.admin=true
            console.log('admin')
            db.collection('vprojects').orderBy('datecreate','desc').where('acctype', '==','admin').get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                // check which project status
                if(doc.data().status =='complete'){
                  let vproject = doc.data()
                  vproject.id = doc.id
                 this.vprojects.push(vproject)

                }
              
      })
    })
       

       }else{
          this.branch=true
        console.log('branch')
       }
       
     }else{
       this.branch=false
       this.admin=false
        console.log('community') 
                db.collection('participants').where('userid', '==', userid).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let pink=doc.id
      
             db.collection('vprojects').orderBy('datecreate','desc').where('listvon', 'array-contains', pink).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
      if(doc.data().status =='complete'){
                  let vproject = doc.data()
                  vproject.id = doc.id
                 this.vprojects.push(vproject)

                }
        
      })
    })
      })
    })
     }
    
    })

  },
  methods: {
      checkpage(l){
          console.log(l)
          if(l=='stor'){
             this.selected=l
              this.$store.state.woi=this.$route.params.id;
             this.loadStorys()
          }else if(l=='vpo'){
             this.selected=l
              this.$store.state.woi=this.$route.params.id;
               this.loadVprojects()
          }else if(l=='donate'){
             this.selected=l
              this.$store.state.woi=this.$route.params.id;
               this.loadTransactions()
          }else{
             this.selected=l
          }

      },

		...mapActions(['loadStorys','loadTransactions','loadVprojects']),
    onPageChange(page) {
      this.currentPage = page;
    },
    
  },
  computed: {
     ...mapGetters(['sons']),
    ...mapGetters(['vpro']),
      ...mapGetters(['trans'])
  },
  components: {
    TransStory,TransVpo,TransDonate,Testing3
  }
}
</script>

<style>
.row .sideleft{
 height:195vh
  
}
.sideleft li{
  margin-left: 30px;
 margin-top:40px ;
 font-weight: bold;
 
}

.col-s3{
  margin-top: 300px;
  background: blue;
}

.loft a{

  font-weight: bolder;
  cursor: pointer;

}
.name{
  font-size: 2rem;
}

.prof li{
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.ikon img{
 width: 60px;
 height:50px ;
}

.loft .circle{
  width:180px ;
  height:180px ;
}

.loft img{
cursor: pointer;
}
</style>