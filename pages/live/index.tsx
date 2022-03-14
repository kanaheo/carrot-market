import type { NextPage } from "next";

const Live: NextPage = () => {
  return (
    <div className="py-10 divide-y-2 space-y-4">
      {new Array(5).fill(1).map((_, i) => {
        return (
          <div className="pt-4 px-4" key={i}>
            <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video " />
            <h3 className=" text-gray-700 text-lg mt-2">Let&#39;s try !</h3>
          </div>
        );
      })}
      <button className="fixed hover:bg-orange-500 transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-orange-400 rounded-full p-4 border-transparent text-white transform">
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Live;
