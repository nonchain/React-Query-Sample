import { useState } from "react";
import IssuesList from "../components/IssuesList";
import LabelList from "../components/LabelList";
import StatusSelected from "../components/StatusSelected";
export default function Issues() {
  const [labels, setLabels] = useState([]);
  const [status, setStatus] = useState("");

  return (
    <div>
      <main>
        <section>
          <h1>Issues</h1>
          <IssuesList labels={labels} status={status}/>
        </section>
        <aside>
          <LabelList
            selectedLabel={labels}
            toggle={(label) => 
              setLabels(currentLabels => 
                currentLabels.includes(label) ?
              currentLabels.filter(currentLabel => currentLabel !== label) : currentLabels.concat(label))
            } />

            <h3>Status</h3>
            <StatusSelected 
            value={status}
            onChange={(e) => setStatus(e?.target?.value)}/>
        </aside>
      </main>
    </div>
  );
}
