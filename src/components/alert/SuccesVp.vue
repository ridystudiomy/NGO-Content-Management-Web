<template>
  <div class="map container">
    <gmap-map
      :center="center"
      :zoom="3"
     
    >
      
      <gmap-marker
        id="marker1"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="{ url: require('../../assets/mred.png')}" 
        @click="toggleInfoWindow(m,index)">
      </gmap-marker>

            
      <gmap-marker
        id="marker2"
        :key="index"
        v-for="(m, index) in markers2"
        :position="m.position"
        :icon="{ url: require('../../assets/mgreen.png')}" 
        @click="toggleInfoWindow(m,index)">
      </gmap-marker>

      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>

    </gmap-map>
  </div>
</template>

<script>
import db from '@/firebase/init'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
  export default {
    name: "SuccesVp",
    data() {
      return {
        //a default center for the map
        center: {lat: 41.015137, lng: 41.015137},
        map: null,
        infoContent: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        currentMidx: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        markers: [
          {
            title: "House of Aleida Greve",
            name: "description 1",
           date: "",
            position: {lat: 41.015137, lng: 28.979530}
          },
          
        ],
        markers2: [

        ],        
      };
    },
    mounted() {
      //set bounds of the map
      this.$refs.gmap.$mapPromise.then((map) => {
        const bounds = new window.google.maps.LatLngBounds()
        for (let m of this.markers) {
          bounds.extend(m.position)
        }
        map.fitBounds(bounds);
      });
    },
    created(){
               db.collection('vprojects').get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              let story = doc.data()
              if(story.status=="complete"){
                this.markers.push({ position: { lat: story.location.latitude, lng: story.location.longitude},id:doc.id,title:story.title,name:story.name,date:story.datecreate,img:story.img})
              }else{
                   this.markers2.push({ position: { lat: story.location.latitude, lng: story.location.longitude},id:doc.id,title:story.title,name:story.name,date:story.datecreate,img:story.img})
              }
              
            })
          })
    },
    methods: {
      toggleInfoWindow: function (marker, idx) {
        this.infoWindowPos = marker.position;
        this.infoContent = this.getInfoWindowContent(marker);
        

        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
          this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = true;
          this.currentMidx = idx;
        }
      },

      getInfoWindowContent (marker) {
        return (`<div class="card">
  <div class="card-image">
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <p class="title black-text"><b>Title</b> :${marker.title}</p>
      </div>
    </div>

    <div class="content">
      <b>By: </b> ${marker.name}
      <br>
      <time datetime="2016-1-1"><b>Date</b>${marker.date}</time>
      <br>
      <button class="waves-effect waves-light btn-small"  onclick="location.href = 'vvproject/${marker.id}'">View Project</button>
    </div>
  </div>
</div>`);
      },
      goproject(){
        console.log("ditekan")
      }
    }
  };
</script>

<style>

</style>