import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import IssueHeader from "./IssueHeader";
import Comment from "./Comment";

function useIssueData(issueNumber) {
  return useQuery(
    ["issues", issueNumber],
    () => fetch(`/api/issues/${issueNumber}`).then(res => res.json())
  )
}

export function useIssueComment(issueNumber) {
  const userData = useQuery(
    ["issues", issueNumber, "comments"],
    () => fetch(`/api/issues/${issueNumber}/comments`).then(res => res.json())
  );

  return userData;
}

export default function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssueData(number);
  const commentsQuery = useIssueComment(number);

  return <div className="issue-details">
    {
      issueQuery.isLoading ? <p>Loading...</p> : <React.Fragment>
        <IssueHeader {...issueQuery.data} />
        <main>
          <section>
            {commentsQuery.isLoading ?
              <p>Loading...</p> :
              commentsQuery?.data?.map(comment =>
                <Comment key={comment?.id} {...comment} />
              )
            }
          </section>
          <aside>
            
          </aside>
        </main>
      </React.Fragment>
    }
  </div>;
}
