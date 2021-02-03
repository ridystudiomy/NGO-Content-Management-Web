<template>
  <div class="view-story container">
    <div v-if="story" class="card">

       <div class="card-image">
<div  v-if="story.ufacebook">
           <Fbvideo id="fbplayer" :sid="test"  :cname="colname" />
          
   </div>          
 <div  v-show="story.uyoutube" ><iframe  :src="story.uyoutube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div  v-show="story.img" ><img :src="story.img" alt=""></div>
            <a href="" class="halfway-fab btn-floating pink pulse">
              <i class="material-icons" @click.prevent="addLike()">thumb_up</i>
            </a>
            <div class="col s3"><span class="left"><i class="material-icons small">person</i> By:{{ story.name }} &nbsp;|</span></div>
             <div class="col s3"><span class="left"><i class="material-icons small">date_range</i>  {{ story.datecreate }}</span></div>
       </div>
            
            <div class="card-content">
      <h2 class="pink-text text-darken-4">{{ story.title }}</h2>
        <p>{{ story.descri}}</p>
        <div class="col s3"><span class="left"><i class="material-icons small">thumb_up</i> {{ttlikes.length }} </span></div>
             <div class="col s3"><span class="left"><i class="material-icons small">comment</i> {{displayedPosts.length }} </span></div>
             
      </div>
           <ul class="comments collection">
        
         <li v-for="(comment, index) in displayedPosts" :key="index"> 
           <div class="row">
                <div class="col s1 gambarkomen">
                <a href="#user"><img class="circle" :src="comment.profilepic" alt=""></a>
                </div>  
               <div class="col s8">
                <div class="commentpart"> <span class="deep-purple-text komname">{{ comment.from }}</span><br><span class="black-text text-darken-2 komcon">{{ comment.content }}</span></div>
                <div class="blue-text text-darken-2 komdate">{{ comment.time }}</div>
                 
              </div>
            </div>  
            
        </li> 
         
    		<ul class="pagination commentspage center">
				<li class="waves-effect nok">
					<a class="page-link" v-if="page != 1" @click="page--"> <i class="material-icons">chevron_left</i> </a>
				</li>
				<li class="waves-effect nok">
					<a  class="page-link" v-for="(pageNumber,index) in pages.slice(page-1, page+5)" @click="page = pageNumber" :key="index"> {{pageNumber}}</a>
				</li>
				<li class="waves-effect nok">
					<a   @click="page++" v-if="page < pages.length"> <i class="material-icons">chevron_right</i> </a>
				</li>
			</ul>
     
      </ul>
          
      <form @submit.prevent="addComment">
        <div class="field">
          <label for="comment">Add a comment</label>
          <input  placeholder="You can add comments here and press Enter" type="text" name="comment" v-model="newComment">
          <p v-if="feedback" class="red-text center">{{ feedback }}</p>
        </div>
      </form>
    </div>

  </div>
</template>

<script>

import M from 'materialize-css'
import db from '@/firebase/init'
import firebase from 'firebase'
import Fbvideo from '@/components/layout/Fbvideo'
 // eslint-disable-next-line no-unused-vars
import moment from 'moment'
export default {
   title: 'Read More',
  name: 'ViewStory',
      mounted () {
     M.AutoInit()
     
},
  data(){
    return{
      story: null,
      newComment: null,
      feedback: null,
      comments: [],
      ttlikes:[],
      totcom:0,
      posts : [],
	  page: 1,
		perPage: 6,
    pages: [],
    dell:'mo',
    peoplecomments:[],
    test:this.$route.params.id,
    colname:'storys'
   
     
    }
  },
    components: {
    Fbvideo
  },

 methods: {

    getPosts (){
      var listu=[];
        db.collection('comments').orderBy('time').where('to', '==', this.$route.params.id)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(change => {
        let start =change.doc.data().time
        var result = moment(start).fromNow();
        listu.push({id:change.doc.data().userid,name:change.doc.data().from})
        if(change.type == 'added'){
          this.posts.unshift({
            from: change.doc.data().from,
            content: change.doc.data().content,
            profilepic:change.doc.data().profilepic,
            time:result
            
            
          })
          this.totcom +=1
  
        }
      })
       db.collection('storys').doc(this.$route.params.id).update({
          
          tcomment:this.totcom
        })
          this.getlistcomment(listu);
    }) 
  
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
      
    getlistcomment(listu){
        var things=listu
        const uniqueArray = things.filter((thing, index) => {
          const _thing = JSON.stringify(thing);
          return index === things.findIndex(obj => {
            return JSON.stringify(obj) === _thing;
          });
        });
       
        this.peoplecomments=uniqueArray

    },

    addComment(){

      let usersd =firebase.auth().currentUser
    if(usersd){
      //getdateandtime
           var dt = new Date();

          var some=`${
          (dt.getMonth()+1).toString().padStart(2, '0')}/${
          dt.getDate().toString().padStart(2, '0')}/${
          dt.getFullYear().toString().padStart(4, '0')} ${
          dt.getHours().toString().padStart(2, '0')}:${
          dt.getMinutes().toString().padStart(2, '0')}:${
          dt.getSeconds().toString().padStart(2, '0')}`

 
    
      //getcurrentuserid
      let usid = firebase.auth().currentUser.uid
      db.collection('users').doc(usid).get().then(doc =>{

      if(this.newComment){
         
        this.feedback = null
        db.collection('comments').add({
          to: this.$route.params.id,
          from: doc.data().name,
          content: this.newComment,
          time:some,
          profilepic:doc.data().profilepic,
          userid:usid
         
         
        }).then(() => {
          this.newComment = null
          var i;
          for (i = 0; i < this.peoplecomments.length; i++) {
             
              db.collection("notifications").add({
                content:doc.data().name + " Commend On " + this.story.name + " post",
                contentid:this.$route.params.id,
                contentpic:doc.data().profilepic,
                page:"ViewStory",
                time:some,
                touser:this.peoplecomments[i].id
              })

              db.collection("users").doc(this.peoplecomments[i].id).update({
                nnotification:firebase.firestore.FieldValue.increment(1)
              })
             
          }
                    
          
        })
      } else {
        this.feedback = 'You must enter a comment to add it'
      }
       })
       
    }else{
      this.$router.push({ name: 'Login' })
    }
      
    },
    addLike(){
      
      db.collection('storys').doc(this.$route.params.id).get().then(doc =>{
        var clikes =doc.data().tlike
        let ussid = firebase.auth().currentUser.uid
        if(clikes.includes(ussid)){
          this.$swal.fire(
          '!',
          'You Already Liked!',
          'error'
        )
        }else{
             
      
        this.ttlikes.push(ussid)
       
        db.collection('storys').doc(this.$route.params.id).update({
          tlike:this.ttlikes,
          totlike:this.ttlikes.length
          
        })

        }
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
   
    
        let ref = db.collection('storys')
    ref.doc(this.$route.params.id).get()
    .then(story => {
      this.story = story.data()
    })
       db.collection('storys').doc(this.$route.params.id).get().then(doc => {
      
        this.ttlikes = doc.data().tlike
    })


    this.getPosts()
    
	},
	filters: {
		trimWords(value){
			return value.split(" ").splice(0,20).join(" ") + '...';
		}
	}  
}
</script>


<style>
.view-story .card{
  padding: 20px;
  margin-top: 100px;
}
.view-story h2{
  font-size: 2em;
  margin-top: 0;
}
.view-story li{
  padding: 10px;
  border-bottom: 1px solid #eee
}
.view-story h2{
  font-family: Franklin Gothic Medium;
  font-size: 3em;
  margin-top: 30px;
  border-bottom: 1em;
  text-align: center;
}
.view-story p{
  font-family: calibri;
  font-weight: bold;
  font-size: 1em;
  text-align: justify;
}
.view-story .card{
  max-width: 1200px;
  max-height: 720;
}
.view-story .card-content{
  padding-bottom: 50px;
}
.view-story img{
  height:670px ;
  width: 1080px;
}
.view-story iframe{
  height:670px ;
  width: 100%;
}

.gambarkomen img{
  margin-top:8px ;
  height:50px ;
  width: 50px;
}
.commentpart{
  padding: 4px;
  width: cover;
  background: rgb(238, 238, 238);
  border-radius: 20px
}

.commentpart .komname{
font-size: 1rem;
font-weight: bolder;
}

.commentpart .komcon{
  font-size:0.9rem;
}

.komdate{
margin-top:2px ;
font-style: italic;
}
.commentspage .nok{
  margin-top: 10px;
 height:50px;
}

</style>