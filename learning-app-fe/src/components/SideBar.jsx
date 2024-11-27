import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserInfo } from "../stores/user.store";
const SideBar = () => {
  const { profile } = useContext(UserInfo)
  return (
    <div className="fixed z-10 top-[7rem] text-[#777777] right-[1.5rem] hidden h-screen flex-col gap-4 md:flex md:w-[35vw] lg:w-[30vw] xl:w-[28vw]">
      <div className="h-[9rem] w-full rounded-2xl bg-white py-6 px-2 border-[2px] border-[#e5e5e5]">
        <h4 className="ml-4 text-xl font-black text-black font-mono">Số ngày hoạt động</h4>
        <ul className="mt-4 flex justify-center items-center pl-2">
          <li className="relative ml-1 mt-2 h-6 w-full rounded-xl bg-green-400">
            <div className="h-6 w-[0%] rounded-xl bg-red-600 transition ease-linear"></div>
            <p className="absolute left-[40%] -top-[0px] text-md text-white">{profile?.dayStreak} ngày</p>
          </li>
          <li>
            <img src="/images/logo/daygo.webp" className="ml-4 h-12 w-16" />
          </li>
        </ul>
      </div>
      <div className="h-[13.5rem] w-full truncate rounded-2xl bg-white p-6 border-[2px] border-[#e5e5e5] py-6 px-2">
        <div className="flex justify-between pr-4">
          <h4 className="ml-4 text-xl font-black text-black font-mono">Nhiệm vụ</h4>
          <Link
            to="/missons"
            className="cursor-pointer font-mono text-md text-blue-500"
          >
            Xem thêm
          </Link>
        </div>
        <ul className="mt-2 flex flex-col gap-3 text-md rounded-2xl">
          <li className="flex w-full">
            <ul className="flex-grow items-start pl-2">
              <li className="pl-2">Hoàn thành 3 bài học</li>
              <li className="relative ml-1 mt-2 h-6 w-full rounded-xl bg-[#e5e5e5]">
                <div className="h-6 w-[0%] rounded-xl bg-red-600 transition ease-linear"></div>
                <p className="absolute left-[40%] top-0">0 / 3</p>
              </li>
            </ul>
            <div className="ml-4 flex items-end">
              <img src="/images/logo/treasure-chest.webp" className="h-9 w-9" />
            </div>
          </li>
          <li className="flex w-full">
            <ul className="flex-grow items-start pl-2">
              <li className="pl-2">Đúng liên tiếp 6 câu </li>
              <li className="relative ml-1 mt-2 h-6 w-full rounded-xl bg-[#e5e5e5]">
                <div className="h-6 w-[0%] rounded-xl bg-red-600 transition ease-linear"></div>
                <p className="absolute left-[40%] top-0">0 / 6</p>
              </li>
            </ul>
            <div className="ml-4 flex items-end">
              <img src="/images/logo/treasure-chest.webp" className="h-9 w-9" />
            </div>
          </li>
        </ul>
      </div>
      <ul className="flex flex-wrap justify-center items-center gap-3 m-2 mt-0 text-[#afafaf] uppercase font-bold text-sm">
        <li className="cursor-pointer hover:text-green-500"><Link to="">About</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Blog</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Store</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Efficacy</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Careers</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">INVESTORS</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Terms</Link></li>
        <li className="cursor-pointer hover:text-green-500"><Link to="">Privacy</Link></li>
      </ul>
    </div>
  );
};

export default SideBar;
