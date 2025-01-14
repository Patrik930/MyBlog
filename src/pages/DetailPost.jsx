import React from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deletePost,
  readLikes,
  ReadPost,
  toggleLike,
} from "../utility/crudUtility";
import { useState } from "react";
import parse from "html-react-parser";
import { FaTrashCan } from "react-icons/fa6";
import { useConfirm } from "material-ui-confirm";
import { delPhoto } from "../utility/uploadFile";
import { Button } from "reactstrap";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Alerts } from "../components/Alerts";

export const DetailPost = () => {
  const { user } = useContext(UserContext);

  const [post, setPost] = useState(null);

  const [txt, setText] = useState(null);

  const params = useParams();

  const confirm = useConfirm();

  const navigate = useNavigate();

  console.log(params.id);

  useEffect(() => {
    ReadPost(params.id, setPost);
  }, []);

  const handleDelete = async () => {
    try {
      await confirm({
        description: "Ez egy visszavonhatatlan művelet!",
        confirmationText: "Igen",
        cancellationText: "Mégsem",
        title: "Biztosan ki szeretnéd törölni a felhasználói fiókodat?",
      });
      deletePost(post.id);
      delPhoto(post.photo.id);
      navigate("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLikes = async () => {
    if (!user) setText("Csak bejelentkezett felhasználók likeolhatnak");
    else {
      await toggleLike(user.uid, post.id);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 mt-12">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {post && (
          <>
            <img
              src={post.photo["url"]}
              alt={post.title}
              className="max-w-full h-auto rounded-lg mb-4"
              style={{ maxWidth: "200px" }}
            />
            <p className="text-gray-700 text-lg mb-4">{parse(post.story)}</p>
          </>
        )}

        <div className="flex items-center justify-between mb-4">
          <button
            className="btn btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/posts")}
          >
            Vissza
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <button
            className="text-xl text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition"
            onClick={handleLikes}
          >
            Kedvelés👍
          </button>

          {post && (
            <span className="text-gray-700">
              Kedvelések száma: {post.likes.length}
            </span>
          )}
        </div>

        {user && post && user.uid === post.userId && (
          <div className="flex space-x-4">
            <button
              onClick={handleDelete}
              className="btn btn-danger px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <FaTrashCan />
            </button>
            <button
              onClick={() => navigate("/update/" + post.id)}
              className="btn btn-secondary px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
            >
              ✏️
            </button>
          </div>
        )}

        {txt && <Alerts txt={txt} err={false} />}
      </div>
    </div>
  );
};
