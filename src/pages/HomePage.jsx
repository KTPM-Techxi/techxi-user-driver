import React, { useEffect, useState } from 'react';
import Map from '../components/Map/Map';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faChartColumn, faExternalLinkAlt, faList, faStar, faUser } from '@fortawesome/free-solid-svg-icons';


export const HomePage = () => {
  // states goes here
  const [isPlaying, setIsPlaying] = useState(true);

  // useEffect goes here
  useEffect(() => {
    if (isPlaying) {
      document.querySelector('video').play();
    } else {
      document.querySelector('video').pause();
    }
    return () => {};
  }, [isPlaying]);

  // functions goes here
  const togglePlayingVideo = (e) => {
    setIsPlaying(!isPlaying);
  };

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div className="relative h-full w-full overflow-x-hidden">
      <video
        className="w-full h-50 top-0 left-0 z-0"
        autoPlay
        muted
        loop
        onClick={toggleOverlay}
      >
        <source src="https://assets.grab.com/wp-content/uploads/media/videos/hero_banner_singapore_q50_mobile.webm" type="video/mp4" />
      </video>
        <div className="absolute top-0 left-0 w-full h-full flex mt-20 justify-center">
          {/* Your overlay content goes here */}
          <div className="w-1/3 h-48 text-center bg-white bg-opacity-90 text-white p-4 rounded-md">
            
            <div className="flex item-left">
              <img className="mr-2 mt-1 h-8 w-auto" src="https://companieslogo.com/img/orig/GRAB-e42c2148.png?t=1643541585" alt="Your Company" />
              <Link to={'/'} as="a" variant="h6" className="mr-4 cursor-pointer py-1.5 text-[#00B14F] font-bold text-lg">
                Welcome!
              </Link>
            </div>
            <div className='flex justify-around mt-8'>
              <div className='border-2 border-slate-200 w-1/3 rounded-md bg-green-500 my-auto'>
                    <div className="p-1 font-medium mx-auto my-auto">
                      <Link to={'/map'} className="flex items-center text-white">
                        <FontAwesomeIcon icon={faCar} className="mx-2" />
                        Book A Ride
                      </Link>
                  </div>
              </div>
              <div className='border-2 border-slate-200 w-1/3 rounded-md bg-green-500 my-auto'>
                    <div className="p-1 font-medium mx-auto my-auto">
                      <Link to={'/statistics'} className="flex items-center text-white">
                        <FontAwesomeIcon icon={faChartColumn} className="mx-2" />
                        My Statistics
                      </Link>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
