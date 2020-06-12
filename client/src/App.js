import React,{useEffect, createContext,useReducer,useContext} from 'react';
import Navbar from './components/navbar'
import "./App.css"
import {BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Home from './components/screens/Home'
import Profile from './components/screens/Profile'
import Signin from './components/screens/Signin'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost'
import {reducer,initialState} from './reducers/userReducer'
import UserProfile from './components/screens/UserProfile'
import SubscribedUserPosts from './components/screens/SubscribedUserPosts'
import NewPassword from './components/screens/Newpassword'
import Reset from './components/screens/Reset'
export const UserContext =createContext()

const Routing=()=>{
  const history=useHistory()
  const {state,dispatch} = useContext(UserContext)
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      if(!history.location.pathname.startsWith('/reset'))
           history.push('/signin')
    }
  },[])
  return(
    <Switch>
            <Route exact path ="/">
              <Home />
        </Route>
        <Route path ="/signin">
              <Signin />
        </Route>
        <Route exact path ="/profile">
              <Profile />
        </Route>
        <Route path ="/profile/:userid">
              <UserProfile />
        </Route>
        <Route path ="/signup">
              <Signup />
        </Route>
        <Route path ="/create">
              <CreatePost />
        </Route>
      })
     < Route path="/myfollowingpost">
        <SubscribedUserPosts />
      </Route>
      <Route exact path="/reset">
        <Reset/>
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
      </Route>
        </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
        <Navbar  />
        <Routing />

 </BrowserRouter>
 </UserContext.Provider>
  );
}

export default App;
