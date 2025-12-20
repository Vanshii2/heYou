// zustand store is like a box , store bunch of different things
import {create} from 'zustand'

export const useAuthStore = create((set)=>({
    authUser: {name:"gola",_id:25,age:1 },
    isLoading: false,
    isLoggedIn:false,


    login:()=>{
        console.log("We just logged in")
        set({isLoggedIn:true})
    },
}))