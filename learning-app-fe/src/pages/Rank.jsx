import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; // Import biểu đồ Line từ react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import MainLayout from "../layouts/MainLayout.jsx";

import instance from '../utils/axiosRequest.js';

const Rank = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getUsers = async() => {
      try {
        const result = await instance.get('/users')
        setUsers(result?.data?.data?.users || [])
      } catch (error) {
        return error
      }
    }
    getUsers()
  },[])
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const sortUser = users && users.sort((a, b) => b.experiences - a.experiences);
  sortUser.forEach((player, index) => {
    player.rank = index + 1; 
  });
  const chartData = {
    labels: sortUser.map(user => user?.fullName),
    datasets: [
      {
        label: 'Kinh nghiệm',
        data: sortUser.map(user => user?.experiences), 
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        type: 'bar',
      }
    ],
  };

  return (
    <MainLayout>
      <div className="flex flex-col mx-auto mt-[5rem] md:absolute md:mt-0 md:top-[5rem] md:left-[5.5rem] lg:left-[17rem] w-[95%] md:w-[90vw] lg:w-[80vw] rounded-lg bg-white p-6 shadow-lg">
        <div className="hidden md:flex w-full mb-8">
          <Line className="w-full" data={chartData} options={{ responsive: true }} />
        </div>

        {/* Danh sách bảng xếp hạng */}
        <div className="mx-auto w-full flex flex-col justify-center items-center">
          {sortUser.map((user, index) => (
            <div
              key={user?._id}
              className={`flex items-center w-full md:w-1/2 justify-between py-4 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"} border-b`}
            >
              {/* Xếp hạng với icon */}
              <div className="flex items-center w-full">
                {user.rank === 1 && (
                  <span className="mr-4 text-3xl text-yellow-500 ">🥇</span>
                )}
                {user.rank === 2 && (
                  <span className="mr-4 text-3xl text-gray-400">🥈</span>
                )}
                {user.rank === 3 && (
                  <span className="text-bronze-400 mr-4 text-3xl">🥉</span>
                )}
                <img
                  src={user?.avatar ? user?.avatar : '/images/logo/profile.jfif'}
                  alt={user?.fullName}
                  className="h-12 w-12 rounded-full border-2 border-gray-300 object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-xl font-mono text-gray-800">{user?.fullName}</h3>
                  <p className="text-gray-600 font-mono">{user?.experiences} Kinh nghiệm</p>
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
