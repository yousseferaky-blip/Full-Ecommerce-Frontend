import React, { useEffect, useState } from 'react'
import DashboardNavbar from '../components/Navbar/DashboardNavbar'
import Sidebar from '../components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = () => {
  const [active, setActive] = useState(false)
  useEffect(()=>{
    if(window.innerWidth  > 500 ){
      setActive(false)
    }else{
      setActive(true)
    }
  },[])
  return (
    <section>
        <DashboardNavbar active={active} setActive={setActive}/>

        <div className="relative flex-1">
          <Sidebar active={active} />
          <main className="px-4 md:px-[4vw] lg:px-[5vw] py-[1rem]">
            <Outlet />
          </main>
      </div>
    </section>
  )
}

export default DashboardLayout