import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

function IndexPost() {
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();

  async function getPosts() {
    try {
      console.log("fetch data here");
      const response = await axios.get("/api/posts");
      console.log(response);
      setPosts(response.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);
  console.log(posts);
  return (
    <div className="my-32">
      <h1 className="flex justify-center mb-8 text-large font-extrabold leading-none tracking-tight text-lime-900 md:text-5xl lg:text-6xl">
        Tweet-a-sec
      </h1>
      <div id="posts">
        {posts.map((post, i) => (
          <div
            key={i}
            className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 "
          >
            <Link
              to={`/${post._id}`}
              className="hover:underline text-lime-500 cursor-pointer"
            >
              <h2 className="mb-2 text-3xl font-bold text-lime-500 ">
                {post.title}
              </h2>
            </Link>
          </div>
        ))}
      </div>
      <button
        className="mt-6 bg-lime-600 inline-block w-full rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#00FF00 ] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] "
        onClick={() => navigate("/new")}
      >
        NEW POST
      </button>
    </div>
  );
}

export default IndexPost;
