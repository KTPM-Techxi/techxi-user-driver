import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailed } from '../../app/reducers/authSlice';
import axios from 'axios';

const LoginPage = ({ user, setUser, evetns, setEvents }) => {
  const userRef = useRef();
  const errorRef = useRef();

  const isUserLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    console.log(data);
    try {
      const response = await axios.post('/users/login', data, {
        withCredentials: true,
      });
      console.log('Login response', response);
      if (response.status === 200) {
        dispatch(loginSuccess(response.data));
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
        return response.data;
      } else {
        dispatch(loginFailed('Login failed'));
      }
      console.log(response);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.log(error.response.data.message);
      } else {
        console.log('Login failed');
      }
      dispatch(loginFailed('Login failed happened in the catch block'));
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      dispatch(loginSuccess(userData));
    }
  }, []);

  useEffect(() => {
    console.log('Login page', user);
    console.log('Login evetns', evetns);
  }, [user, evetns]);

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/');
    }
  }, [isUserLoggedIn]);

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="https://companieslogo.com/img/orig/GRAB-e42c2148.png?t=1643541585" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Log in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input id="email" {...register('email', { required: true })} type="email" autoComplete="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 p-2" />
                {errors.email && <span className="text-red-500 text-sm">Please enter your email address.</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-[#00B14F] hover:text-[#00B14F]">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input id="password" {...register('password', { required: true })} name="password" type="password" autoComplete="current-password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#00B14F] sm:text-sm sm:leading-6 outline-none p-2" />
                {errors.password && <span className="text-red-500 text-sm">Please enter your password.</span>}
              </div>
            </div>

            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-[#00B14F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#00B14F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B14F]">
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member yet ?{' '}
            <Link to="/register" className="font-semibold leading-6 text-[#00B14F] hover:text-[#00B14F]">
              Start your drive now !
            </Link>
          </p>
          <p className="mt-10 text-center text-sm text-gray-500">
            {evetns.map((event, i) => {
              const { fullDocument } = event;
              return (
                <>
                  <p key={i}>{fullDocument.call_center_agents_id}</p>
                  <p key={i}>{fullDocument.customer_id}</p>
                  <p key={i}>{fullDocument.destination.latitude}</p>
                  <p key={i}>{fullDocument.destination_address}</p>
                  <p key={i}>{fullDocument.driver_id}</p>
                  <p key={i}>{fullDocument.pickup_address}</p>
                </>
              );
            })}

            <Link to="/register" className="font-semibold leading-6 text-[#00B14F] hover:text-[#00B14F]">
              Event
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
