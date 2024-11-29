import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout.jsx";

import instance from "../utils/axiosRequest.js";

const Rank = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const result = await instance.get("/users");
        setUsers(result?.data?.data?.users || []);
      } catch (error) {
        return error;
      }
    };
    getUsers();
  }, []);
  const sortUser = users && users.sort((a, b) => b.experiences - a.experiences);
  sortUser.forEach((player, index) => {
    player.rank = index + 1;
  });
  return (
    <MainLayout>
      <div className="font-noto mx-auto mt-[5rem] flex w-full flex-col rounded-lg bg-white p-6 pt-0 shadow-lg sm:w-[80%] md:absolute md:left-[10rem] md:top-[5rem] md:mt-0 lg:left-[20rem] lg:w-[60%] xl:left-[27rem]">
        <div className="flex flex-col items-center p-[1rem]">
          <h1 className="mb-2 text-center text-xl font-bold text-green-600">
            Xếp Hạng Người Chơi Theo Kinh Nghiệm
          </h1>
          <img
            src="/images/logo/rank-logo.svg lazyload"
            className="h-[5rem] md:h-[6rem]"
          />
          <div className="flex gap-5">
            <div className="relative h-[2.5rem] w-[2.5rem] md:h-[4.5rem] md:w-[4.5rem]">
              <img
                src={sortUser[2]?.avatar || "/images/logo/profile.jfif"} // Thay hình ảnh hoạt hình minh họa tại đây
                alt="Game Character"
                className="rounded-full shadow-lg lazyload"
              />
              <div className="absolute left-0 top-0 rounded-br-full bg-[#d3a67b] px-4 text-sm font-semibold text-white md:px-6 md:text-lg">
                3
              </div>
            </div>
            <div className="relative h-[4rem] w-[4rem] md:h-[6rem] md:w-[6rem]">
              <img
                src={sortUser[0]?.avatar || "/images/logo/profile.jfif"} // Thay hình ảnh hoạt hình minh họa tại đây
                alt="Game Character"
                className="rounded-full shadow-lg lazyload"
              />
              <div className="absolute left-0 top-0 rounded-br-full bg-[#feea66] px-4 text-sm font-semibold text-white md:px-6 md:text-lg">
                1
              </div>
            </div>
            <div className="relative h-[3rem] w-[3rem] md:h-[5rem] md:w-[5rem]">
              <img
                src={sortUser[1]?.avatar || "/images/logo/profile.jfif"} // Thay hình ảnh hoạt hình minh họa tại đây
                alt="Game Character"
                className="rounded-full shadow-lg lazyload"
              />
              <div className="absolute left-0 top-0 rounded-br-full bg-[#d6e4ef] px-4 text-sm font-semibold text-white md:px-6 md:text-lg">
                2
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4"></div>
        </div>
        <div className="h-[100vh] w-full overflow-y-scroll scrollbar-none">
          {sortUser.map((user, index) => (
            <div
              key={user?._id}
              className={`flex w-full items-center justify-between py-4 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}
            >
              <div className="flex w-full items-center">
                {user.rank === 1 && (
                  <span className="mr-4 text-3xl text-yellow-500">🥇</span>
                )}
                {user.rank === 2 && (
                  <span className="mr-4 text-3xl text-gray-400">🥈</span>
                )}
                {user.rank === 3 && (
                  <span className="text-bronze-400 mr-4 text-3xl">🥉</span>
                )}
                <img
                  src={
                    user?.avatar ? user?.avatar : "/images/logo/profile.jfif"
                  }
                  alt={user?.fullName}
                  className="h-12 w-12 rounded-full border-2 border-gray-300 object-cover lazyload"
                />
                <div className="ml-4 w-full justify-between pr-6 text-sm sm:flex md:text-lg">
                  <h3 className="font-bold text-gray-800">{user?.fullName}</h3>
                  <p className="text-gray-600">
                    {user?.experiences} Kinh nghiệm
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Rank;
