import React from "react";

export const Homepage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        
        <div className="relative grid h-[35rem] max-w-lg flex-col items-end justify-center overflow-hidden rounded-lg bg-white">
          <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"></div>
          </div>
          <div className="relative text-center p-6 px-6 py-14 md:px-12">
            <h2 className="mb-6 text-3xl font-medium text-white">
              Filmek
            </h2>
            <img
              alt="Filmek"
              src="https://media.istockphoto.com/id/1642381175/hu/vektor/mozi.jpg?s=612x612&w=0&k=20&c=EH7vclFStxlKCk8aCZdP-s-sh0h6c3frVSQXYwDeXDQ="
              className="relative inline-block h-32 w-32 rounded-full border border-white"
            />
          </div>
        </div>

        <div className="relative grid h-[35rem] max-w-lg flex-col items-end justify-center overflow-hidden rounded-lg bg-white">
          <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://plus.unsplash.com/premium_photo-1661301057249-bd008eebd06a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"></div>
          </div>
          <div className="relative text-center p-6 px-6 py-14 md:px-12">
            <h2 className="mb-6 text-3xl font-medium text-white">
              Edzés
            </h2>
            <img
              alt="Edzés"
              src="https://media.istockphoto.com/id/1331186720/vector/dumbbell.jpg?s=612x612&w=0&k=20&c=ztAKf6ZaSrWTBQVW7Nj2yrEbGM0FxitFrze39W-HdMs="
              className="relative inline-block h-32 w-32 rounded-full border border-white"
            />
          </div>
        </div>

        <div className="relative grid h-[35rem] max-w-lg flex-col items-end justify-center overflow-hidden rounded-lg bg-white">
          <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://plus.unsplash.com/premium_photo-1679830513886-e09cd6dc3137?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center">
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"></div>
          </div>
          <div className="relative text-center p-6 px-6 py-14 md:px-12">
            <h2 className="mb-6 text-3xl font-medium text-white">
              Utazás
            </h2>
            <img
              alt="Utazás"
              src="https://media.istockphoto.com/id/1137971264/hu/vektor/rep%C3%BCl%C5%91g%C3%A9p-rep%C3%BCl-ki-log%C3%B3-a-g%C3%A9p-stiliz%C3%A1lt-t%C3%A1bl%C3%A1r%C3%B3l-sz%C3%A1ll-fel.jpg?s=612x612&w=0&k=20&c=IUeYutW3HuExqAnsrMPce9pTuU2TZDbnq9VmylHeX5g="
              className="relative inline-block h-32 w-32 rounded-full border border-white"
            />
          </div>
        </div>

        <div className="relative grid h-[35rem] max-w-lg flex-col items-end justify-center overflow-hidden rounded-lg bg-white">
          <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://images.unsplash.com/photo-1657695721053-54b2df2fb5f3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8czEwMDBycnxlbnwwfHwwfHx8MA%3D%3D')] bg-cover bg-center">
            <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50"></div>
          </div>
          <div className="relative text-center p-6 px-6 py-14 md:px-12">
            <h2 className="mb-6 text-3xl font-medium text-white">
              Motorozás
            </h2>
            <img
              alt="Motorozás"
              src="https://media.istockphoto.com/id/1304506730/hu/vektor/motorker%C3%A9kp%C3%A1r-versenyz%C3%A9s-absztrakt-vektor-sziluett-oldaln%C3%A9zet-k%C3%B6z%C3%BAti-motorker%C3%A9kp%C3%A1r.jpg?s=612x612&w=0&k=20&c=RBKRjwroiUr0rIWfS0NcnodvBumAaxWBepsiGTg-83U="
              className="relative inline-block h-32 w-32 rounded-full border border-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
