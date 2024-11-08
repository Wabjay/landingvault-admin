import { fetchTemplates, fetchPitches } from "@/actions/createData"
import { useQuery } from "@tanstack/react-query"

// export function useGetPosts() {
//   return useQuery({
//     queryFn: async () => fetchPosts(),
//     queryKey: ["posts"],
//   })
// }


export function useGetPitches() {
  return useQuery({
    queryFn: async () => fetchPitches(),
    queryKey: ["pitches"],
  })
}


export function useGetTemplates() {
  return useQuery({
    queryFn: async () => fetchTemplates(),
    queryKey: ["templates"],
  })
}