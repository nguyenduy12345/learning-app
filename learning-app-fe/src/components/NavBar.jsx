import { useContext, useState} from "react"
import { Link, NavLink } from "react-router-dom"

import { UserInfo} from "../stores/user.store.jsx"
const NavBar = () => {
  const { profile } = useContext(UserInfo)
  const [smallNav, setSmallNav] = useState(false)
  const handleUserLogOut = () => {
    localStorage.removeItem('Token');
    window.location.href = "http://localhost:5173/login";
  }
  return (
    <>
    <ul className="flex z-20 h-[3.8rem] text-[#777777] justify-evenly w-full py-[3px] border-t-2 border-[#e5e5e5] fixed md:top-0 md:pt-[4rem] lg:pt-[1rem] bottom-0 bg-[#f3f8f9] md:bg-white xl:px-6 md:fixed md:w-auto lg:w-[17rem] md:h-screen md:justify-start md:border-t-0 md:flex-col md:gap-2 md:border-r-[3px] md:border-r-[#eeeeee]" >
      <Link to='/home' className="hidden md:flex items-center justify-center">
        <img src="/images/logo/cat-black.png" className="w-10 mr-1" />
        <h2 className="hidden lg:flex font-bold text-3xl py-2 justify-center text-red-400 cursor-pointer font-mono">Duylingo</h2>
      </Link>
      <NavLink className={({ isActive }) => (isActive ? " md:bg-[#ddf4ff] p-1 lg:p-0 border-[1px] border-blue-300 rounded-lg text-blue-400 flex items-center justify-center" : "flex items-center justify-center")} to="/learning">
      <li className="lg:w-full h-[2.5rem] px-[2px] md:h-[3.5rem] flex items-center w-auto cursor-pointer md:mb-1 md:hover:bg-[#ddf4ff] md:px-3 md:py-1 md:rounded-lg">
        <img src="/images/logo/home.png" className="w-10" />
        <p className="hidden lg:block ml-5 text-lg font-mono font-black">Học tập</p>
      </li>
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? "md:bg-[#ddf4ff] p-1 lg:p-0 border-[1px] border-blue-300 rounded-lg text-blue-400 flex items-center justify-center" : "flex items-center justify-center")} to="/courses">
      <li className="lg:w-full h-[2.5rem] px-[2px] md:h-[3.5rem] flex items-center w-auto cursor-pointer md:mb-1 md:hover:bg-[#ddf4ff] md:px-3 md:py-1 md:rounded-lg">
        <img src="/images/logo/courses-img.png" className="w-10" />
        <p className="hidden lg:block ml-5 text-lg font-mono font-black">Khóa học</p>
      </li>
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? " md:bg-[#ddf4ff] p-1 lg:p-0 border-[1px] border-blue-300 rounded-lg text-blue-400 hidden md:flex" : "hidden md:flex")} to="/alphabet">
      <li className="lg:w-full h-[2.5rem] px-[2px] md:h-[3.5rem] flex items-center md:flex cursor-pointer md:mb-1 md:hover:bg-[#ddf4ff] md:px-3 md:py-1 md:rounded-lg">
        <img src="/images/logo/pngtree-alphabet.png" className="w-8 md:w-10" />
        <p className="hidden lg:block ml-5 text-lg font-mono font-black">Bảng chữ cái</p>
      </li>
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? " md:bg-[#ddf4ff] p-1 lg:p-0 border-[1px] border-blue-300 rounded-lg text-blue-400 hidden md:flex" : "hidden md:flex")} to="/missons">
      <li className="lg:w-full h-[2.5rem] px-[2px] md:h-[3.5rem] flex items-center md:flex cursor-pointer md:mb-1 md:hover:bg-[#ddf4ff] md:px-3 md:py-1 md:rounded-lg">
        <img src="/images/logo/pngtree-task-img.png" className="w-8 md:w-10 " />
        <p className="hidden lg:block ml-5 text-lg font-mono font-black">Nhiệm vụ</p>
      </li>
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? " md:bg-[#ddf4ff] p-1 lg:p-0 border-[1px] border-blue-300 rounded-lg text-blue-400 flex items-center justify-center" : "flex items-center justify-center")} to="/rank">
      <li className="lg:w-full h-[2.5rem] px-[2px] md:h-[3.5rem] flex items-center cursor-pointer md:mb-1 md:hover:bg-[#ddf4ff] md:px-3 md:py-1 md:rounded-lg">
        <img src="/images/logo/rank-ranking-img.webp" className="w-8 md:w-10" />
        <p className="hidden lg:block ml-5 text-lg font-mono font-black">Xếp hạng</p>
      </li>
      </NavLink>
      <NavLink className={({ isActive }) => (isActive ? " md:bg-[#ddf4ff] p-1 lg:p-0 border-[1px] border-blue-300 rounded-lg text-blue-400 flex items-center justify-center" : "flex items-center justify-center")} to="/profile">
      <li className="lg:w-full h-[2.5rem] px-[2px] md:h-[3.5rem] flex items-center cursor-pointer md:mb-1 md:hover:bg-[#ddf4ff] md:px-3 md:py-1 md:rounded-lg">
        {profile.avatar ? <img src={profile.avatar} className="w-8 md:w-10 rounded-[50%] object-cover" /> : <img src="/images/logo/person-default.png" className="w-10" />}
        <p className="hidden lg:block ml-5 text-lg font-mono font-black">{profile.fullName ? profile.fullName : "Tài khoản" }</p>
      </li>
      </NavLink>
      <li onClick={handleUserLogOut} className="lg:w-full h-[2.5rem] px-[2px] md:h-[3.5rem] hidden cursor-pointer md:flex items-center justify-center lg:justify-start rounded-lg md:px-3 md:py-1 md:rounded-lg md:ml-2">
        <img src="/images/logo/logout.jpg" className="w-8" />
        <p className="hidden lg:block ml-5 text-lg font-mono font-black">Đăng Xuất</p>
      </li>
      <li onClick={() => setSmallNav(!smallNav)} className="flex items-center cursor-pointer md:hidden">
        <img src="/images/logo/three-dots.png" className="w-8 md:w-10" />
      </li>
      {
        smallNav && 
        <ul className="translate-x-0 ease-linear duration-1000 absolute bottom-[3.7rem] h-[9rem] right-[0.7rem] z-20 px-[8px] py-2 bg-white border-2 border-[#e5e5e5] rounded-lg flex flex-col justify-between md:hidden"> 
        <li className="flex justify-center items-center">
        <NavLink to="/alphabet">
          <img src="/images/logo/words.jpg" className="w-[2rem] h-[2rem]" />
        </NavLink>
        </li>
        <li className="flex justify-center items-center">
        <NavLink to="/missons">
          <img src="/images/logo/task.png" className="w-[2rem] h-[2rem]" />
        </NavLink>
        </li>
        <li onClick={handleUserLogOut} className="flex cursor-pointer justify-center items-center">
          <img src="/images/logo/logout.jpg" className="w-[1.7rem] h-[1.7rem]" />
        </li>
      </ul>
      }
    </ul>
    </>
  )
}

export default NavBar
