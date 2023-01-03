import React from 'react'

const possibleStatus = [
   { id: "backlog", label: "Backlog"},
   { id: "todo", label: "To-Do"},
   { id: "inProgress", label: "In Progress"},
   { id: "done", label: "Done"},
   { id: "cancelled", label: "Cancelled"},
];

function StatusSelected({value, onChange}) {
  return (
    <select name="status" id="status" value={value} onChange={onChange} className="status-select">
      <option value="">Select a status to filter</option>
      {
         possibleStatus?.map(status => (
            <option value={status.id} id={status.id} key={status.id}>
               {status.label}
            </option>
         ))
      }
    </select>
  )
}

export default StatusSelected