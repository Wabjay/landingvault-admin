"use server"

import axios from "@/lib/axios"
// import { revalidatePath } from "next/cache"
import { createSafeActionClient } from "next-safe-action"
import { store } from "@/stores/store";
// import { auth } from "@/server/auth"

export const action = createSafeActionClient()

// export const createPost = action(formSchema, async ({ content }) => {
//   const session = await auth()
//   console.log(session?.user?.id)
//   if (!content || !session?.user?.id) return { error: "Something went wrong" }
//   const newPost = await db.insert(posts).values({
//     content,
//     user_id: session.user.id,
//   })
//   revalidatePath("/")
//   if (!newPost) return { error: "Could not create post" }
//   if (newPost[0]) return { success: "Post Created" }
// })



// export const fetchPosts = async () => {
//   const posts = await db.query.posts.findMany({
//     with: {
//       author: true,
//       likes: true,
//     },
//     orderBy: (posts, { desc }) => [desc(posts.timestamp)],
//   })
//   if (!posts) return { error: "No posts 😓" }
//   if (posts) return { success: posts }
// }
const { pitches, fetchPitches, setIsLoading } = store();

export const deletePost =()=>{
  // Reload after deleted successfully
  try {
    axios.get('/pitch/getAll')
      .then(function (response) {
        fetchPitches(response.data.pitchDecks)
        setIsLoading(false);
      })

  } catch (error) {
    console.error('Error fetching data:', error);
    setIsLoading(false);
  }
}
