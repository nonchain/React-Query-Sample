import React from 'react';
import { Link } from "react-router-dom";
import { relativeDate } from '../helpers/relativeDate';
import { useUserData } from '../helpers/useUserData';
import Label from './Label';

function IssueItem({
   title,
   number,
   assignee,
   createdBy,
   createdDate,
   commentCount,
   labels,
   status,
}) {
   // we have handle state for each of them (isLoading, ...)
   const assigneeUser = useUserData(assignee);
   const createdByUser = useUserData(createdBy);

   return (
      <li>
         <div>
            <i className="ri-information-line icon-normal icon-done"></i>
         </div>
         <div className='issue-content'>
            <span>
               <Link to={`/issue/${number}`}>{title}</Link>
               {labels.map(label => (
                  <Label key={label} label={label} />
               ))}
            </span>
            <small>
               #{number} opened {relativeDate(createdDate)} {createdByUser.isSuccess ? `by ${createdByUser.data.name}` : ''}
            </small>
         </div>
         {assignee ? <img src={assigneeUser.isSuccess ? assigneeUser?.data?.profilePictureUrl : ""} className="assigned-to" alt='image'/> : null}
         <div>
            <span className='comment-count'>
               <i className="ri-chat-4-line icon-small "></i>
               {commentCount}
            </span>
         </div>
      </li>
   )
}

export default IssueItem