import { useQuery } from "react-query";

export function useLabelsData() {
   const labelsQuery = useQuery(
      ["labels"],
      () => fetch("/api/labels").then(res => res.json()),
      {
         staleTime: 5 * 60 * 1000 // 5 minutes
      }
   );

   return labelsQuery;
}