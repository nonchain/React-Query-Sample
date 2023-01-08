import React from 'react'
import { useUserData } from '../helpers/useUSerData';
import { relativeDate } from '../helpers/relativeDate';

function Comment({ comment, createdBy, createdDate }) {
   const userQuery = useUserData(createdBy);

   if (userQuery.isLoading) return <div className="comment">
      <div>
         <div className="comment-header">
            Loading...
         </div>
      </div>
   </div>

   return (
      <div className="comment">
         <img src={userQuery?.data?.profilePictureUrl} alt="comment avatar" />

         <div>
            <div className="comment-header">
               <span>
                  {userQuery?.data?.name} commented <span>{relativeDate(createdDate)}</span>
               </span>
            </div>

            <div className='comment-body'>{comment}</div>
         </div>
      </div>
   )
}

export default Comment