import React from 'react';
import {Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation } from 'swiper/modules'
import { FaUser } from "react-icons/fa";
import { RxBarChart } from "react-icons/rx";

const FarmerDashboardBoxes = () => {
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
            <div className='p-4 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <FaUser className='text-[30px] text-indigo-500'/>
                <div className='info w-[70%] pl-15'>
                    <h3>Total Users</h3>
                    <b>440</b>
                </div>
                <RxBarChart className='text-[50px] text-indigo-500' />
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className='box p-4 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <div className='info w-[70%]'>
                    <h3>Total Farmers</h3>
                    <b>436</b>
                </div>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className='box p-4 cursor-pointer hover:bg-[#f1f1f1] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
                <div className='info w-[70%]'>
                    <h3>Total Exporters</h3>
                    <b>4</b>
                </div>
            </div>
        </SwiperSlide>
   
    </Swiper>
    </>
  )
}

export default FarmerDashboardBoxes;
