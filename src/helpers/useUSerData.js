import { useQuery } from "react-query";

// Access User data in entire app
export function useUserData(userId) {
   const userData = useQuery(
      // when userId changed, refetch data
      ["users", userId],
      () => fetch(`/api/users/${userId}`).then(res => res.json()),
   );

   return userData;
}