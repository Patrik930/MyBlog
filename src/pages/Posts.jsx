import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { readPosts } from "../utility/crudUtility";
import { CategContext } from "../context/CategContext";
import { Categories } from "../components/Categories";
import { SearchBox } from "../components/SearchBar";

export const Posts = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [selCateg, setSelCateg] = useState(
    searchParams.get("ctg") ? [searchParams.get("ctg")] : []
  );

  useEffect(() => {
    readPosts(setPosts, selCateg);
  }, [selCateg]);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4 mb-4">
          <Categories selCateg={selCateg} setSelCateg={setSelCateg} />
        </div>
        <div className="mb-6 flex justify-center">
          {posts && (
            <SearchBox
              items={posts.map((obj) => ({ id: obj.id, name: obj.title }))}
            />
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts?.length > 0 &&
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.photo.url}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h6 className="text-lg font-semibold text-gray-800 mb-2">
                    {post.title}
                  </h6>
                  <p className="text-sm text-gray-600 mb-4">
                    Feltöltő: {post.author}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {post.story}
                  </p>
                </div>
                <div className="p-4 border-t border-gray-200">
                  <button
                    onClick={() => navigate(`/detail/${post.id}`)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm hover:bg-blue-700 transition duration-300"
                  >
                    Tudj meg többet
                  </button>
                </div>
              </div>
            ))}
        </div>

        {posts?.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            Nem található poszt! Válassz másik kategóriát!
          </div>
        )}
      </div>
    </div>
  );
};
