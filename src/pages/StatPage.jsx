import { useState } from 'react';
import InputUserInforForm from '../components/CallCenter/InputUserInforForm';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Number of Rides Monthly',
    },
  },
};

export const StackOptions = {
  plugins: {
    title: {
      display: true,
      text: 'Monthly Comparison',
    },
    legend: {
      display: false, // Set this to false to hide the labels
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  
  datasets: [
    {
      label: 'Car',
      data: labels.map(() => faker.datatype.number({ min: 400, max: 1000 })),
      borderColor: 'rgba(75, 250, 72, 0.5)', 
        backgroundColor: 'rgba(75, 250, 72,0.8)',
    },
    {
      label: 'Bike',
      data: labels.map(() => faker.datatype.number({ min: 200, max: 1000 })),
      borderColor: 'rgba(75, 200, 72, 0.5)', 
        backgroundColor: 'rgba(75, 200, 72,0.8)',
    },
    {
      label: 'Delivery',
      data: labels.map(() => faker.datatype.number({ min: 100, max: 500 })),
      borderColor: 'rgba(75, 150, 72, 0.5)', 
        backgroundColor: 'rgba(75, 150, 72,0.8)',
    },
  ],
};

const pieOptions = {
  plugins: {
    legend: {
      display: false, // Set this to false to hide the labels
    },
    title: {
      display: true,
      text: 'Number of Vehicles',
    },
  },
};

export const pieData = {
  labels: ['Car', 'Bike', 'Delivery'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 7],
      backgroundColor: [
        'rgba(75, 250, 72, 0.8)',
        'rgba(75, 200, 72, 0.8)',
        'rgba(75, 150, 72, 0.8)',
      ],
      borderColor: [
        'rgba(75, 220, 72, 0.5)',
        'rgba(75, 130, 72, 0.5)',
        'rgba(75, 100, 72, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};

const StatPage = () => {
  return (
    <div className="p-4 flex">
      <div className="mx-auto w-2/3 shadow-md">
        <div className='w-full flex justify-around bg-slate-100 p-3'>
            <div className='w-1/3 h-16 bg-white flex rounded-xl shadow-md'>
                <img className="p-2 ml-2 aspect-square" src="https://cdn-icons-png.flaticon.com/512/8922/8922324.png" alt="revenue" />
                <div className='my-auto ml-4'>
                    <div className='font-bold text-sm'>Total Money</div>
                    <div className='text-green-600'>$123</div>
                </div>
            </div>
            <div className='w-1/3 h-16 bg-white flex rounded-xl shadow-md mx-3'>
                <img className="p-2 ml-2 aspect-square" src="https://cdn-icons-png.flaticon.com/512/4088/4088042.png" alt="booking" />
                <div className='my-auto ml-4'>
                    <div className='font-bold text-sm'>Total Rides</div>
                    <div className='text-green-600'>36</div>
                </div>
            </div>
            <div className='w-1/3 h-16 bg-white flex rounded-xl shadow-md'>
                <img className="p-2 ml-2 aspect-square" src="https://cdn-icons-png.flaticon.com/512/5900/5900214.png" alt="driver" />
                <div className='my-auto ml-4'>
                    <div className='font-bold text-sm'>Total Kms</div>
                    <div className='text-green-600'>120</div>
                </div>
            </div>
        </div>

        <div className='w-full flex justify-around bg-slate-100 p-3'>
            <Line className='bg-white shadow-md p-4' options={options} data={data} />
        </div>

        <div className='w-full flex justify-around bg-slate-100 p-3'>
            <div className='w-1/3'>
              <Pie className='p-4 ' options={pieOptions} data={pieData} />
            </div>
            <div className='w-2/3'>
             <Bar className='p-4' options={StackOptions} data={data} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default StatPage;
