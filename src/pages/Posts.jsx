import React, { useEffect } from "react";
import { readPosts } from "../utility/crudUtility";
import { useState } from "react";
import { useContext } from "react";
import { CategContext } from "../context/CategContext";
import { Categories } from "../components/Categories";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Posts = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [posts, setPosts] = useState([]);
  const [selCateg,setSelCateg] = useState(searchParams.get('ctg') ? [searchParams.get('ctg') ]: [])
  console.log('url paraméter' + searchParams.get('ctg') ? searchParams.get('ctg') : []);
  
  

  useEffect(() => {
    readPosts(setPosts,selCateg);
  }, [selCateg]);

  


  console.log(selCateg);
  
  

  return (

    <div>
      
          <Categories selCateg={selCateg} setSelCateg={setSelCateg}/>
  
      
      
      {posts?.length > 0 &&
        posts.map(key => 
          <div key={key.id} className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
              <div className="relative h-56 m-2.5 overflow-hidden text-white rounded-md">
                <img
                  src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                  alt="card-image"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h6 className="mb-2 text-slate-800 text-xl font-semibold">
                  Author : {key.author}<br></br>
                  Title : {key.title}
                </h6>
                <p className="text-slate-600 leading-normal font-light">
                  {key.story}<br></br><br></br>
                </p>
              </div>
              <div className="px-4 pb-4 pt-0 mt-2">
                <button
                onClick={()=>navigate('/detail/'+key.id)}
                  className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        )}
      ;
    </div>
  );
};
