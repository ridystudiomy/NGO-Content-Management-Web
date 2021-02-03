<template>
  <div id="test">
    <transactions-paginated
					:data="sons"
					:total-pages="Math.ceil(sons.length / 4)"
					:total="sons.length"
					:per-page="4"
					:current-page="currentPage"
					@pagechanged="onPageChange"
				/>
  </div>
</template>

<script>
import TransactionsPaginated from './TransactionsPaginated.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Testing',
  mounted(){
    this.loadStorys()
  },
  data(){
    return {
			currentPage: 1,
    }
  },
  methods: {
		...mapActions(['loadStorys']),
    onPageChange(page) {
      this.currentPage = page;
		},
  },
  computed: {
    ...mapGetters(['sons'])
  },
  components: {
    TransactionsPaginated
  }
}
</script>

<style>


</style>