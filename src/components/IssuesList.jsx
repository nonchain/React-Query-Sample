import React, { useState } from "react";
import { useQuery } from "react-query";

import IssueItem from "./IssueItem";
import fetchWithError from "../helpers/fetchWithError";

export default function IssuesList({ labels, status }) {
  const [searchValue, setSearchValue] = useState('');
  const issuesQuery = useQuery(
    ['issues', { labels, status }],
    () => {
      const statusString = status ? `&status=${status}` : '';
      const labelString = labels.map(label => `labels[]=${label}`).join("&");
      return fetchWithError(`/api/issues?${labelString}${statusString}`, {
        headers: {
          "x-error": true
        }
      });
    }
  );

  const searchQuery = useQuery(
    ["issues", "search", searchValue],
    () => fetch(`/api/search/issues?q=${searchValue}`).then(res => res.json()),
    {
      enabled: searchValue.length > 0
    }
  )

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSearchValue(e?.target?.elements?.search?.value);
  }

  const onSearchChangeHandler = (event) => {
    if (event.target?.value.length === 0) return setSearchValue("");
  }

  return (
    <div>
      <form action="" onSubmit={onSubmitHandler}>
        <label htmlFor="search">Search Issue</label>
        <input
          type="search"
          placeholder="Search"
          name="search"
          id="search"
          onChange={onSearchChangeHandler} />
      </form>
      <h2 >Issues List</h2 >
      {issuesQuery.isError && <p>{issuesQuery.error.message}</p>}
      {issuesQuery.isLoading ? (
        <p>Loading...</p>
      ) : searchQuery.fetchStatus === 'idle' && searchQuery.isLoading ? ( // idle means there is no new data to fetch - isLoading means there is no data currently
        <ul className="issues-list">
          {issuesQuery?.data?.map(issue => <IssueItem
            key={issue?.id}
            title={issue?.title}
            number={issue?.number}
            assignee={issue?.assignee}
            createdBy={issue?.createdBy}
            createdDate={issue?.createdDate}
            commentCount={issue?.comments?.length}
            labels={issue?.labels}
            status={issue.status} />
          )}
        </ul>
      ) : (
        <React.Fragment>
          <h2>Search Result</h2>
          {
            searchQuery.isLoading ? <p>Loading</p> :
              <div>
                <p>{searchQuery.data.count} Results</p>
                <ul className="issues-list">
                  {searchQuery.data.items.map(issue => 
                    <IssueItem
                      key={issue?.id}
                      title={issue?.title}
                      number={issue?.number}
                      assignee={issue?.assignee}
                      createdBy={issue?.createdBy}
                      createdDate={issue?.createdDate}
                      commentCount={issue?.comments?.length}
                      labels={issue?.labels}
                      status={issue.status} />
                  )}
                </ul>
              </div>
          }
        </React.Fragment>
      )}
    </div>
  );
}
