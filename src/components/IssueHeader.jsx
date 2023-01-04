import React from 'react';

import { possibleStatus } from "../helpers/defaultData";
import { useUserData } from "../helpers/useUSerData";
import { relativeDate } from "../helpers/relativeDate";

function IssueHeader({
   title, number, status = "todo", createdBy, createdDate, comments
}) {
   const statusObject = possibleStatus.find(pStatus => pStatus?.id === status)
   const createdUser = useUserData(createdBy);

   return (
      <header>
         <h2>{title} <span>#{number}</span></h2>

         <div>
            <span className={
               status === "done" || status === "cancelled" ? "closed" : "open"
            }>
               <i className="ri-information-line icon-normal"></i>
               {statusObject.label}
            </span>
            <span className='created-by'>
               {createdUser.isLoading ? "..." : createdUser.data?.name}
            </span>{" "}
            opened this issue {relativeDate(createdDate)} . {comments.length} comments
         </div>
      </header>
   )
}

export default IssueHeader