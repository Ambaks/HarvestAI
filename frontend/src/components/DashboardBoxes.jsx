import React from 'react';
import {Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Pagination } from '@mui/material';
import {Navigation } from 'swiper/modules'
import { FaUser } from "react-icons/fa";
import { RxBarChart } from "react-icons/rx";

const DashboardBoxes = () => {
  return (
    <>
    <Swiper
    slidesPerView={3}
    spaceBetween={30}
    navigation={true}
    modules={[Navigation]}
    className='dashboardBoxesSlider'
    >
        <SwiperSlide>
        <div>
        <div className='p-4 cursor-pointer bg-[#fff] hover:bg-[#f1f1f1] shadow-lg rounded-2xl border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <FaUser className='text-[30px] text-green-500'/>
                <div className='info w-[70%] pl-15'>
                    <h3>Total Users</h3>
                    <b>440</b>
                </div>
                <RxBarChart className='text-[50px] text-green-500'/>
            </div>
        </div>
        </SwiperSlide>

        <SwiperSlide>
        <div>
        <div className='overflow-visible p-4 cursor-pointer bg-white hover:bg-[#f1f1f1] shadow-lg rounded-2xl border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
            <div className='info w-[70%]'>
                    <h3>Total Farmers</h3>
                    <b>436</b>
                </div>
            </div>
        </div>
        </SwiperSlide>

        <SwiperSlide>
        <div>
        <div className='overflow-visible p-4 cursor-pointer bg-[#fff] hover:bg-[#f1f1f1] shadow-lg rounded-2xl border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
            <div className='info w-[70%]'>
                    <h3>Total Exporters</h3>
                    <b>4</b>
                </div>
            </div>
        </div>
        </SwiperSlide>
   
    </Swiper>
    </>
  )
}

export default DashboardBoxes;
