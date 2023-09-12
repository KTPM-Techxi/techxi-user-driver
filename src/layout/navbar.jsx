import React, { useState } from 'react';
import { Navbar, Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faChartColumn, faExternalLinkAlt, faHome, faList, faStar, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../app/reducers/authSlice';
import axios from 'axios';

function NavList({ handleLogout }) {
  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <ul className="justify-between my-1 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 ">
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        <Link to={'/'} className="flex items-center hover:text-[#00B14F] text-black">
          <FontAwesomeIcon icon={faHome} className="mr-1" />
          Home
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        <Link to={'/map'} className="flex items-center hover:text-[#00B14F] text-black">
          <FontAwesomeIcon icon={faCar} className="mr-1" />
          Booking
        </Link>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        <a href="/statistics" className="flex items-center hover:text-[#00B14F] text-black">
          <FontAwesomeIcon icon={faChartColumn} className="mr-1" />
          Statistics
        </a>
      </Typography>
      <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
        {!isUserLoggedIn ? (
          <Link to={'/login'} className="flex items-center hover:text-[#00B14F] text-black">
            <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="flex items-center hover:text-[#00B14F] text-black">
            <FontAwesomeIcon icon={faExternalLinkAlt} className="mr-1" />
            Log out
          </button>
        )}
      </Typography>
    </ul>
  );
}

export default function NavigationBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout(e) {
    e.preventDefault();
    try {
      await axios.post('/users/logout', {
        withCredentials: true,
      });
      localStorage.removeItem('user');
      dispatch(logoutSuccess());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  const handleWindowResize = () => window.innerWidth >= 960;

  React.useEffect(() => {
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 py-3 bg-[#00B14F]">
      <Navbar className="w-1/2 mx-auto max-w-screen-xl px-3 py-2 rounded-full bg-white">
        <div className="items-center justify-between text-blue-gray-900">
          <div className="hidden lg:block">
            <NavList handleLogout={handleLogout} />
          </div>
        </div>
      </Navbar>
    </div>
  );
}
