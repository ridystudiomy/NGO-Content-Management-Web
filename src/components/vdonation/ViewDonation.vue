<template>
  <div class="view-Donation container">
      <div class="vld-parent" ref="formContainer">
                   <loading :active.sync="isLoading" 
        :can-cancel="true" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"></loading>
    <div v-if="vproject" class="card">


       <div class="card-image">
<div  v-if="vproject.ufacebook">
           <Fbvideo :sid="test"  :cname="colname" />
          
   </div>  
 <div  v-show="vproject.uyoutube" ><iframe  :src="vproject.uyoutube" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>
 <div  v-show="vproject.img" ><img :src="vproject.img" alt=""></div>
            <a href="" class="halfway-fab btn-floating pink pulse">
              <i class="material-icons">attach_money</i>
            </a>
            <div class="col s3"><span class="left"><i class="material-icons small">person</i> By:{{ vproject.name }} &nbsp;|</span></div>
             <div class="col s3"><span class="left"><i class="material-icons small">date_range</i>  {{ vproject.datecreate }}</span></div>
       </div>
            
            <div class="card-content">
      <h2 class="pink-text text-darken-4">{{ vproject.title }}</h2>
        <p>{{ vproject.descri}}</p>
       
      </div>
    </div>
    <div class="card-action">
      <p><b>Help Us to Give them Better Life </b></p>
         <div class="input-field">
          <input id="usermoney" type="number" class="validate" v-model="usermoney">
          <label for="usermoney">Input How Much You Want To Donate ,Currency USD.Example '6' </label>
          
        </div>
      <!-- Select payment gateway -->
     <select v-model="typepayment">
      <option value="" disabled selected>Choose Payment Method</option>
      <option value="paypal">Paypal[GLOBAL|Debit|Card Credit]</option>
      <option value="toyibb">Malaysia FPX</option>
    </select>
    <button v-show="typepayment=='paypal'" :class="btnhome" @click="showup()">Donate Now</button>
     <button v-show="typepayment=='toyibb'" :class="btnhome" @click="checkemailtoyib()">Donate Now</button>
     </div>
     <div v-show="seen">   
     <div class="mx-auto w-50" ref="paypal"></div>
    </div> 
  </div>
  </div>
</template>

<script>
 // eslint-disable-next-line no-unused-vars
import {ToyyibPay}  from "toyyibpay-nodejs"
import M from 'materialize-css'
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';
import Fbvideo from '@/components/layout/Fbvideo'
import db from '@/firebase/init'
 // eslint-disable-next-line no-unused-vars
import firebase from 'firebase'
export default {
  name: 'ViewDonation',
  
  data(){
    return{
      vproject: null,
      feedback: null,
      usermail:null,
      donatern:'anonymous',
      seen:false,
      usermoney:null,
      product:{
          description:"GWCQP PAYMENT",
          price:9.99

      },
      ids:"https://www.paypal.com/sdk/js?client-id=AWDBt_ZU08lIjE1zDgbe586ycMf4Mxsbqyje34QhnQeTO2lWUnlImocRWlFYFwxZeO6q1V4lzx8Pp8sp",
      currmoney:null,
      btnhome:'',
      currentuser:'anonymous',
      isLoading: false,
      fullPage: true,
       test:this.$route.params.id,
       colname:"donations",
       typepayment:'',
       tempsecret:"k3i7xhri-wxgq-89f7-5rr6-wt427en3z2a8",
       tempcode:"5cqcmg74"
   
      
    }
  },
components: {
            Loading,Fbvideo
        },
  created(){
      db.collection('webcomps').doc("CExOhwXUJq6e3BfBGYvv").get().then(doc =>{
        this.btnhome = doc.data().btnhome
     })

    let ref = db.collection('donations')
    ref.doc(this.$route.params.id).get()
    .then(donation => {
      this.vproject = donation.data()

     
     
    })
    let userid = firebase.auth().currentUser.uid
  if (userid != null) {
       db.collection('users').doc(userid).get().then(doc =>{
        this.currentuser = doc.data().name
     })
  }
      var takee=null
     let userdata = firebase.auth().currentUser;
      if (userdata != null) {
        userdata.providerData.forEach(function (profile) {
          takee=  profile.email
        });
        this.usermail=takee
        console.log(this.usermail)
      }

   
   
  },
  
      mounted: function() {
         M.AutoInit()
     db.collection('donations').doc(this.$route.params.id).get()
    .then(doc => {
      this.ids = "https://www.paypal.com/sdk/js?client-id="+doc.data().paypalid
      this.currmoney = doc.data().curfund
     
    })
    const script = document.createElement("script");
    script.src =
     this.ids
    script.addEventListener("load", this.setLoaded);
    document.body.appendChild(script);
  },
 methods: {

      async checkemailtoyib(){
        if(!this.usermail){
          const { value: formValues } = await  this.$swal.fire({
            title: 'Insert Your Email for Receipt',
            html:
              '<input id="swal-input1" placeholder="Email" class="swal2-input">',
            focusConfirm: false,
            preConfirm: () => {
              return [
                document.getElementById('swal-input1').value,
               
              ]
            }
          })

          if (formValues) {
         
             this.usermail=formValues[0]
             this.loadtoyib();
          }
        }else{
          this.loadtoyib();
        }

      },

      loadtoyib(){

            this.isLoading = true;
            const converttomyr =parseInt(this.usermoney*400)
            var extradata=this.$route.params.id+"&amount="+converttomyr+"&recieverid="+this.vproject.userid+"&pnm="+this.vproject.title

            let toyyib = ToyyibPay(this.tempsecret, { dev: true }); // For SandBox
            // let toyyib = ToyyibPay("v07srs0u-f6sf-5q72-al9e-q5nfy8sc1msh");
            toyyib
              .createBill({
                        userSecretKey:this.tempsecret,
                        categoryCode:this.tempcode,
                        billName:this.vproject.title,
                        billDescription:this.vproject.title + ' From GWCQP web',
                        billPriceSetting:1,
                        billPayorInfo:1,
                        billAmount:converttomyr,
                        billReturnUrl:'https://gwcqp-40547.web.app/toyibpay',
                        billCallbackUrl:'https://gwcqp-40547.web.app/toyibpay',
                        billExternalReferenceNo: extradata,
                        billTo:this.currentuser,
                        billEmail:this.usermail,
                        billPhone:'0194342411',
                        billSplitPayment:0,
                        billSplitPaymentArgs:'',
                        billPaymentChannel:'0',
                        billDisplayMerchant:1,
                        billContentEmail:'Thank you for purchasing our product!',
                        billChargeToCustomer:1   
              })
              .then(bill => {
                console.log(".getBank success");
                console.log(bill["data"][0]["BillCode"]);
                this.isLoading = false;
                var url = "https://dev.toyyibpay.com/"+bill["data"][0]["BillCode"];
                window.open(url, "_target");
              })
              // eslint-disable-next-line no-unused-vars
              .catch(e => {
                console.log(".getBank on error");
              });
            // eslint-disable-next-line no-unused-vars
 
        },

       doAjax() {
        this.isLoading = true;
                 
     },
   onCancel() {
              console.log('User cancelled the loader.')
    },

     showup(){
         this.product.price=this.usermoney
         console.log("price: "+this.product.price)
         this.seen=true
         
     },
 // eslint-disable-next-line no-unused-vars
         setLoaded: function(resp) {
      this.loaded = true;
      window.paypal
        .Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: this.product.description,
                  amount: {
                    currency_code: "USD",
                    value: this.product.price
                  }
                }
              ]
            });
          },
           // eslint-disable-next-line no-unused-vars
          onApprove: async (data, actions, resp) => {
            this.isLoading = true;
             // eslint-disable-next-line no-unused-vars
            const order = await actions.order.capture();
            this.data;
            this.paidFor = true; 
            var old =parseInt(this.currmoney) 
            var neww = parseInt(this.product.price) 
            let sum = old +  neww
            console.log(sum)
            db.collection('donations').doc(this.$route.params.id).update({
          
            curfund:sum
          
             })
          var dt = new Date();

          var simplifydt =`${
          (dt.getMonth()+1).toString().padStart(2, '0')}/${
          dt.getDate().toString().padStart(2, '0')}/${
          dt.getFullYear().toString().padStart(4, '0')} ${
          dt.getHours().toString().padStart(2, '0')}:${
          dt.getMinutes().toString().padStart(2, '0')}:${
          dt.getSeconds().toString().padStart(2, '0')}`
              if(this.currentuser){
                
                db.collection("transcations").add({
                  donatorid:"",
                  donatorname:this.currentuser,
                  plaform:"Paypal",
                  projectid:this.$route.params.id,
                  recieverid:this.vproject.userid,
                  time:simplifydt,
                  total:neww,
                  transid:data.orderID,
                  projectname:this.vproject.title,
                  status:"success"


                })

              this.$swal.fire(
                  'Transction ID: '+data.orderID+" Success",
                  "Thank You for your kindness "+ this.currentuser,
                  'success'
                )

              }else{
              this.$swal.fire(
                  'Transction ID '+data.orderID+" Success",
                   "Thank You for your kindness",
                  'success'
                )
              }
          
            this.isLoading = false;
            
           
            //this.$router.push({ name: 'Story' })
          },
          onError: err => {
            console.log(err);
                   var dt = new Date();

          var simplifydt =`${
          (dt.getMonth()+1).toString().padStart(2, '0')}/${
          dt.getDate().toString().padStart(2, '0')}/${
          dt.getFullYear().toString().padStart(4, '0')} ${
          dt.getHours().toString().padStart(2, '0')}:${
          dt.getMinutes().toString().padStart(2, '0')}:${
          dt.getSeconds().toString().padStart(2, '0')}`

          if(this.currentuser){
                let userid = firebase.auth().currentUser.uid
                db.collection("transcations").add({
                  donatorid:userid,
                  donatorname:this.currentuser,
                  plaform:"Paypal",
                  projectid:this.$route.params.id,
                  recieverid:this.vproject.userid,
                  time:simplifydt,
                  total:this.product.price,
                  transid:"-",
                  projectname:this.vproject.title,
                  status:"Field",
                  error:err
                })

              this.$swal.fire(
                  'Transction Failed',
                 ""+err,
                  'error'
                )

              }else{
                    this.$swal.fire(
                  'Transction Failed',
                  ""+err,
                  'error'
                )
                
              }
            this.isLoading = false;
          }
        })
        .render(this.$refs.paypal);
    }
    
  }
}
</script>


<style>
.view-Donation{
  margin-bottom: 60px;
  padding-bottom:100px ;
}
.view-Donation .btn{
  font-weight: bold;
}
.view-Donation .card{
  padding: 20px;
  margin-top: 100px;
}
.view-Donation h2{
  font-size: 2em;
  margin-top: 0;
}
.view-Donation li{
  padding: 10px;
  border-bottom: 1px solid #eee
}
.view-Donation h2{
  font-family: Franklin Gothic Medium;
  font-size: 3em;
  margin-top: 30px;
  border-bottom: 1em;
  text-align: center;
}
.view-Donation p{
  font-family: calibri;
  font-weight: bold;
  font-size: 1em;
  text-align: justify;
}
.view-Donation .card{
  max-width: 1200px;
  max-height: 720;
}
.view-Donation .card-content{
  padding-bottom: 50px;
}
.view-Donation .input-field{
    width: 550px;
    font-family: Arial;
    font-weight: bold;
}
.view-Donation img{
  height:670px ;
  width: 1080px;
}
.view-Donation iframe{
  height:670px ;
  width: 100%;
}
</style>