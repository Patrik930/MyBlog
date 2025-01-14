import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContext";
import { delPhoto, uploadFile } from "../utility/uploadFile";
import { BarLoader } from "react-spinners";
import { Toastify } from "../components/Toastify";
import { useEffect } from "react";
import { extractUrlAndId } from "../utility/utils";
import { confirm } from "material-ui-confirm";
import { useConfirm } from "material-ui-confirm";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const { user, updateCredentials, msg, deleteAccount, logOut } =
    useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const confirm = useConfirm();
  const navigate = useNavigate();

  useEffect(() => {
    !user && navigate("/");
  }, [user]);

  useEffect(() => {
    user?.photoURL && setAvatar(extractUrlAndId(user.photoURL).url);
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data);
    try {
      const file = data?.file ? data.file[0] : null;
      const { url, id } = file ? await uploadFile(file) : null;
      // const photoUrl = await uploadFile(file)
      // photoUrl && console.log(photoUrl);
      updateCredentials(data.displayName, url + "/" + id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await confirm({
        description: "Ez egy visszavonhatatlan művelet!",
        confirmationText: "Igen",
        cancellationText: "Mégsem",
        title: "Biztosan ki szeretnéd törölni a felhasználói fiókodat?",
      });
      await deleteAccount();
      logOut();
      delPhoto(user.photoURL.split("/").pop());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Felhasználói fiók beállítása
        </h3>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-lg font-semibold mb-2">
              Felhasználónév
            </label>
            <input
              {...register("displayName")}
              placeholder="Felhasználónév"
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Profilkép
            </label>
            <input
              type="file"
              {...register("file", {
                validate: (value) => {
                  if (!value[0]) return true;
                  const fileExtension = value[0]?.name
                    .split(".")
                    .pop()
                    .toLowerCase();
                  const acceptedFormats = ["jpg", "png"];
                  if (!acceptedFormats.includes(fileExtension))
                    return "Nem megfelelő formátum!";
                  if (value[0].size > 1 * 1000 * 1024)
                    return "Az engedélyezett fájl mérete 1MB";
                  return true;
                },
              })}
              onChange={(e) =>
                setAvatar(URL.createObjectURL(e.target.files[0]))
              }
              className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-red-500 mt-1">{errors?.file?.message}</p>
          </div>

          <input
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {loading && (
          <div className="flex justify-center mt-4">
            <BarLoader />
          </div>
        )}

        {msg && <Toastify {...msg} />}

        {avatar && (
          <div className="mt-6 flex justify-center">
            <img src={avatar} alt="Avatar" className="w-24 h-24 rounded-full" />
          </div>
        )}

        <button
          className="w-full mt-6 p-3 bg-red-500 text-white font-semibold rounded-md cursor-pointer hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={handleDelete}
        >
          Felhasználói fiók törlése
        </button>
      </div>
    </div>
  );
};
