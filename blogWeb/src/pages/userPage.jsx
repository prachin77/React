import ReactTagInput from '@pathofdev/react-tag-input';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateBlog from '../components/createBlog';

const initialState = {
  title: "",
  tags: [],
  category: "",
  description: ""
}

const categoryOptions = [
  "Technology",
  "Sports",
  "Philosophy",
  "Politics",
  "Mythological",
  "History",
  "Food",
  "Education",
  "Travel",
  "Other"
]

const UserPage = ({ user }) => {
  // const userid = user?.uid;
  const username = user?.displayName;
  const profilePhoto = "https://cdn-icons-png.flaticon.com/128/1144/1144760.png";
  // console.log("user id from userpage = ",userid );
  console.log("username from userpage = ", username);

  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const { title, tags, category, description } = form;
  const [inCreateBlog, setInCreateBlog] = useState(false);
  const handleChange = (event) => {

  }
  const handleTags = (event) => {

  }
  const onCategoryChange = (event) => {

  }
  return (
    <>
      <div>
        {/* side bar */}
        <div className="top-20 h-screen fixed left-0 border-r border-gray-300"
          style={{ width: '350px' }}
        >
          <div className="text-center">
            <img className="rounded-full mx-auto mt-4" src={profilePhoto} alt={username}
              style={{ width: '150px', height: '150px' }} />
            <h1 className="p-2 mt-5 ">{username}</h1>
          </div>
          {/* <Link to='/userpage'>
            <div className="text-center p-2 mt-4 flex items-center justify-center hover:bg-gray-300 hover:text-black" >
              <h2>userpage</h2>
            </div>
          </Link> */}

          <div className="text-center p-2 mt-4 flex items-center justify-center hover:bg-gray-300 hover:text-black" >
            <h2 className="mr-2">create blogs</h2>
            <button
              className="bg-black text-white rounded-full px-4 py-2"
              onClick={() => setInCreateBlog(true)}
            >
              +
            </button>
          </div>
        </div>
        {/* side bar */}
        {/* ---------------------------------------------- */}
        <div 
          // className='border-2 border-black'
          style={{ marginLeft: '220px', width: '1120px', height: '580px', marginTop: '60px' }}
        >
          {inCreateBlog === true ? (
            <CreateBlog user={user}/>
          ) : (
            <h1>in profile</h1>
          )}
        </div>
      </div>
    </>

  );
};

export default UserPage;
