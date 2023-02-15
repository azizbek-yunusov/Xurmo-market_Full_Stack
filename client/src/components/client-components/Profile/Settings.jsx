import React from 'react'
import toast from 'react-hot-toast';
import { BiLogOut } from 'react-icons/bi';
import { MdLogout } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from '../../../redux/actions/authAction';
import LayoutP from './LayoutP'

const Settings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signOutHandle = () => {
    dispatch(signOut());
    navigate("/signin");
    toast.success("Sign out ");
  };
  return (
    <LayoutP>
      <div className="grid grid-cols-2 gap-8 mt-5 md:px-32">
        <div className="col-span-1 rounded-xl shadow-lg shadow-indigo-500/50 bg-purple-500 h-32">
          <Link to={"/myprofile/update"} className="text-xl w-full h-full flex_center text-gray-50">
            Edit
          </Link>
        </div>
        <div className="col-span-1 rounded-xl shadow-lg shadow-indigo-500/50 bg-purple-500 h-32">v</div>
        <div className="col-span-1 rounded-xl shadow-lg shadow-indigo-500/50 bg-purple-500 h-32">a</div>
        <div onClick={signOutHandle} className="col-span-1 cursor-pointer rounded-xl shadow-lg shadow-red-500/50 text-xl text-gray-50 bg-red-500 h-32 flex_center">
          <MdLogout className='text-2xl mr-2' />
          <span className="">Sign out</span>
        </div>
      </div>
    </LayoutP>
  )
}

export default Settings