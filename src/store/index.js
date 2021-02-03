import Vue from 'vue'
Vue.config.silent = true
import Vuex from 'vuex'

        // eslint-disable-next-line no-unused-vars
import db from '@/firebase/init'


Vue.use(Vuex)

export const store = new Vuex.Store({
	
	state: {
		transactions: [],
		storys:[],
		vprojects:[],
		woi:'something',
		test:[]
		
	},
	mutations: {
		loadTransactions(state, payload) { state.transactions = payload },
		loadStorys(state, payload) { state.storys = payload },
		loadVprojects(state, payload) { state.vprojects = payload }
	},
	actions: {
		
		loadTransactions(context){
		console.log('load donation')
	  var donations =[];
      db.collection('donations').orderBy('datecreate','desc').where('userid', '==',this.state.woi).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
		  let donation = doc.data();
		  donation.id = doc.id
		  donations.push(donation)
		 
        })
      })
      context.commit('loadTransactions', donations)
		},
		loadStorys(context){
			var storys =[];
			db.collection('storys').orderBy('datecreate','desc').where('userid', '==',this.state.woi).get()
			.then(snapshot => {
			  snapshot.forEach(doc => {
				let story = doc.data();
				story.id = doc.id
				storys.push(story)
				
			  })
			})
			context.commit('loadStorys', storys)
			  },
			  loadVprojects(context){
				var vprojects =[];
				db.collection('vprojects').orderBy('datecreate','desc').where('userid', '==',this.state.woi).get()
				.then(snapshot => {
				  snapshot.forEach(doc => {
					let story = doc.data();
					story.id = doc.id
					vprojects.push(story)
					
				  })
				})
				context.commit('loadVprojects', vprojects)
				  }
	},
	getters: {
		trans: state => state.transactions,
		sons: state => state.storys,
		vpro: state => state.vprojects

	}
})