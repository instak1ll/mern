import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PopularPosts } from "../components/PopularPosts";
import { PostItem } from "../components/PostItem";
import { getAllPosts } from "../redux/features/post/postSlice";

export const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, popularPosts } = useSelector((state) => state.post);

  console.log(popularPosts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (!posts.length) {
    return (
      <div className="text-xl text-center text-white py-10">
        No hay publicaciones disponibles.
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10 p-4">
      <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:gap-8">
        <div className="flex flex-col gap-10">
          {posts?.map((post, idx) => (
            <PostItem key={idx} post={post} />
          ))}
        </div>
        <div className="mt-10 sm:mt-0">
          <div className="text-xs uppercase text-white hidden sm:block">
            Populares:
          </div>

          <div className="hidden sm:block">
            {popularPosts?.map((post, idx) => (
              <PopularPosts key={idx} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
