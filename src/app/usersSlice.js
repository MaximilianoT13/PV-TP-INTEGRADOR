import { createSlice } from "@reduxjs/toolkit"


const getUser=()=>{
    const user=localStorage.getItem("users")
    return user ? JSON.parse(user) : []
}
const getSession=()=>{
    const session=localStorage.getItem("session")
    return session ? JSON.parse(session) : null
}


const initialState={
    users: getUser(),
    sessionUser: getSession(),
    error: ""
}
const usersSlice=createSlice({
    name: "auth",
    initialState,
    reducers:{
    addUser: (state,action)=>{
        const exist=state.users.some(e => e.email.toLowerCase() === action.payload.email.toLowerCase())
        if(!exist){
            state.users.push({...action.payload,favorites: []}) 
            localStorage.setItem('users',JSON.stringify(state.users))
            state.error=""
        }
        else 
            state.error="el email ya está registrado"

    },
    loginSession: (state,action)=>{
        const {email,password} = action.payload
        const usr = state.users.find(e => e.email===email && e.password === password)
        if(usr)
        {
            state.sessionUser= {email: usr.email,favorites: usr.favorites}
            localStorage.setItem("session",JSON.stringify(state.sessionUser))
            state.error=""
        }
        else 
            state.error="DATOS INVALIDOS"
    },
    logoutSession: (state)=>{
        const i = state.users.findIndex(e => e.email === state.sessionUser.email)

        state.users[i].favorites=[...state.sessionUser.favorites]
        
        localStorage.setItem("users",JSON.stringify(state.users))
        

        state.sessionUser=null
        localStorage.removeItem("session")
    },
    toggleUserFavorites: (state,action)=>{
        const productID = action.payload
        const favIndex = state.sessionUser.favorites.indexOf(productID)
        if(favIndex===-1)
            state.sessionUser.favorites.push(productID)
        else 
            state.sessionUser.favorites.splice(favIndex,1)
        localStorage.setItem("session",JSON.stringify(state.sessionUser))
    },
    clearError: (state)=>{
        state.error=""
    }
    }
})
export const { addUser, loginSession, logoutSession, toggleUserFavorites, clearError } = usersSlice.actions
export default usersSlice.reducer