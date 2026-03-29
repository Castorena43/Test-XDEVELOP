"use client"

import { useState } from "react";
import { useGetPosts } from "../hooks/useGetPosts";
import PostsFilter from "./PostsFilter";
import { PostsTable } from "./PostsTable";
import { Button } from "@/components/ui/button";
import { CreatePostModal } from "./CreatePostModal";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function PostsComponent () {
  const [userId, setUserId] = useState(0);
  const [open, setOpen] = useState(false);
  const { data: posts } = useGetPosts(userId);
  const { user } = useAuthStore();

  const handleFilter = (id: number) => {
    setUserId(id)
  }

  return (
    <>
      <PostsFilter emitFilter={handleFilter}/>
      {
        user?.role === 'admin' && (
          <div className="flex justify-end w-full">
            <Button onClick={() => setOpen(true)}>Crear nuevo</Button>
          </div>
        )
      }
      <PostsTable data={posts?.data ?? []} />
      <CreatePostModal
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}