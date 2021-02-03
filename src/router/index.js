
import Router from 'vue-router'
import Home from '../views/Home'
import Signup from '@/components/auth/Signup'
import Login from '@/components/auth/Login'
import Story from '@/components/posts/Story'
import Vproject from '@/components/posts/Vproject'
import ViewStory from '@/components/vstory/ViewStory'
import ViewVproject from '@/components/vvproject/ViewVproject'
import ManageStory from '@/components/manage/ManageStory'
import ManageVproject from '@/components/manage/ManageVproject'
import AddStory from '@/components/manage/AddStory'
import AddVproject from '@/components/manage/AddVproject'
import SuccesVp from '@/components/alert/SuccesVp'
import Vplistuser from '@/components/alert/Vplistuser'
import Donation from '@/components/donations/Donation'
import ViewDonation from '@/components/vdonation/ViewDonation'
import AddDonation from '@/components/manage/AddDonation'
import ManageDonation from '@/components/manage/ManageDonation'
import UserProfile from '@/components/manage/UserProfile'
import UpdateProfile from '@/components/manage/UpdateProfile'
import ManageUser from '@/components/manager/ManageUser'
import ManageVoucher from '@/components/manage/ManageVoucher'
import Testing from '@/components/alert/Testing'
import EditDonation from '@/components/manage/EditDonation'
import EditVproject from '@/components/manage/EditVproject'
import EditStory from '@/components/manage/EditStory'
import AddVoucher from '@/components/manage/AddVoucher'
import ManagePart from '@/components/manage/ManagePart'
import ManageWeb from '@/components/manage/ManageWeb'
import GMap from '@/components/home/GMap'
import Profile from '@/components/home/Profile'
import Testing3 from '@/components/home/Testing3'
import VerifyEmail from '@/components/alert/VerifyEmail'
import TransHistory from '@/components/donations/TransHistory'
import TransactionResult from '@/components/vdonation/TransactionResult'
import Coupun from '@/components/voucher/Coupun'
import EditVoucher from '@/components/manage/EditVoucher'
import Toyibpay from '@/components/alert/Toyibpay'
import ErrorPage from '@/components/alert/ErrorPage'
import firebase from 'firebase'



const router = new Router({
  mode:'history',
routes : [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
  },
  {
    path:'/signup',
    name: 'Signup',
    component:Signup

  }
  ,
  {
    path:'/login',
    name: 'Login',
    component:Login

  },
  {
    path:'/story',
    name: 'Story',
    component:Story

  },
  {
    path:'/managestory',
    name: 'ManageStory',
    component:ManageStory,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/managevproject',
    name: 'ManageVproject',
    component:ManageVproject,
    meta:{
      requiresAuth:true
    }
    
  },
  {
    path:'/vstory/:id',
    name: 'ViewStory',
    component:ViewStory
  },
  {
    path:'/addstory',
    name: 'AddStory',
    component:AddStory,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/addvproject',
    name: 'AddVproject',
    component:AddVproject,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/vproject',
    name: 'Vproject',
    component:Vproject
  },
  {
    path:'/vvproject/:id',
    name: 'ViewVproject',
    component:ViewVproject

  },
  {
    path:'/succesvp',
    name:SuccesVp,
    component:SuccesVp

  },
  {
    path:'/vplistuser',
    name:'Vplistuser',
    component:Vplistuser

  },
  {
    path:'/donation',
    name:'Donation',
    component:Donation
  },{
    path:'/vdonation/:id',
    name: 'ViewDonation',
    component:ViewDonation
  },
  {
    path:'/adddonation',
    name: 'AddDonation',
    component:AddDonation,
    meta:{
      requiresAuth:true
    }
    
  },
  {
    path:'/managedonation',
    name: 'ManageDonation',
    component:ManageDonation,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/userprofile/:id',
    name: 'UserProfile',
    component:UserProfile,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/updateprofile/:id',
    name: 'UpdateProfile',
    component:UpdateProfile,
   
  },
  {
    path:'/manageuser',
    name: 'ManageUser',
    component:ManageUser,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/testing',
    name: 'Testing',
    component:Testing,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/editdonation/:id',
    name: 'EditDonation',
    component:EditDonation,
    meta:{
      requiresAuth:true
    }
  },
  {
    
    path:'/managepart/:id',
    name: 'ManagePart',
    component:ManagePart,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/editstory/:id',
    name: 'EditStory',
    component:EditStory,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/editvproject/:id',
    name: 'EditVproject',
    component:EditVproject,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/ManageWeb',
    name: 'ManageWeb',
    component:ManageWeb,
    meta:{
      requiresAuth:true
    }
  },
  {
    path:'/aboutus',
    name: 'GMap',
    component:GMap
  },
  {
    path:'/verifyemail',
    name: 'VerifyEmail',
    component:VerifyEmail
  },
  {
    path:'/profile/:id',
    name: 'Profile',
    component:Profile
  },
  {
    path:'/testing3',
    name: 'Testing3',
    component:Testing3
  },
  { 
    path:'/result',
    name: 'TransactionResult',
    component:TransactionResult
  },
  { 
    path:'/transhistory/:id',
    name: 'TransHistory',
    component:TransHistory,
    meta:{
      requiresAuth:true
    }
  },
  { 
    path:'/redeem',
    name: 'Coupun',
    component:Coupun,
    meta:{
      requiresAuth:true
    }
  },
  { 
    path:'/managevaucher',
    name: 'ManageVoucher',
    component:ManageVoucher,
    meta:{
      requiresAuth:true
    }
  },
  { 
    path:'/addvoucher',
    name: 'AddVoucher',
    component:AddVoucher,
    meta:{
      requiresAuth:true
    }
  },
  { 
    path:'/editvoucher/:id',
    name: 'EditVoucher',
    component:EditVoucher,
    meta:{
      requiresAuth:true
    }
  },
  { 
    path:'/toyibpay',
    name: 'Toyibpay',
    component:Toyibpay,
  },
  { 
    path:'/error404',
    name: 'ErrorPage',
    component:ErrorPage
  }
]

})
// router guards
router.beforeEach((to, from, next) => {
  // check to see if route has auth guard
  if(to.matched.some(rec => rec.meta.requiresAuth)){
    // check auth state of user
    let user = firebase.auth().currentUser
    if (user) {
        if(user.emailVerified){
          next()
        }else{
          next({
            name: 'VerifyEmail'
          })

        }
    } else {
      // No user is signed in. Redirect to login
      next({
        name: 'Login'
      })
    }
  } else {
    // if route is not guarded by auth, proceed
    next()
  }
})

export default router
