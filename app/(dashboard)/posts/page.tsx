import PostsComponent from "@/features/posts/components/PostsComponent";

export default function postsPage () {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Publicaciones</h1>
      </div>

      <PostsComponent />
    </div>
  )
}