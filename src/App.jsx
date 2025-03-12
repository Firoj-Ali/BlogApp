import { useState,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import {Outlet} from 'react-router-dom'
import {Header,Footer} from './components'
import {login,logout} from './store/authSlice'
import authService from './appwrite/auth'




function App() {
  const [loading,setLoading] = useState(true)
const dispatch = useDispatch();

useEffect(()=>{
  authService.getCurrentUser().then((userData)=>{
    if (userData) {
      dispatch(login({userData}))
    }else{
      dispatch(logout());
    }
  }).finally(()=>setLoading(false))
},[]);
  
  return !loading ? (
    <div className='min-h-screen bg-base-100 shadow-md felx flex-wrap justify-between  '>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet/>
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App