import React, { useEffect, useState } from "react";
import API from "../api/api";
import { handleError, handleSuccess } from "../utils";

// Stateless component for rendering a swap request row (outgoing)
function SwapRow({ request }) {
  return (
    <li key={request._id}>
      Req: my {request.mySlotId} {" ⇄ "} their {request.theirSlotId} : {request.status}
    </li>
  );
}

function SwapRequests() {
  const [requests, setRequests] = useState({ incoming: [], outgoing: [] });

  const fetch = () =>
    API.get("/requests")
      .then(res => setRequests(res.data))
      .catch(() => setRequests({ incoming: [], outgoing: [] }));

  useEffect(() => {
    fetch();
  }, []);

  const respond = (reqId, accepted) => {
    API.post(`/swap-response/${reqId}`, { accepted })
      .then(() => {
        handleSuccess(accepted ? "Swap Accepted" : "Rejected");
        fetch();
      })
      .catch(() => handleError("Action failed"));
  };

  return (
    <div>
      <h2>Swap Requests</h2>
      <div>
        <b>Incoming (respond):</b>
        <ul>
          {requests.incoming
            .filter(r => r.status === "PENDING")
            .map(r => (
              <li key={r._id}>
                You received swap for slot {r.theirSlotId} (offer: {r.mySlotId})
                <button onClick={() => respond(r._id, true)}>Accept</button>
                <button onClick={() => respond(r._id, false)}>Reject</button>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <b>Outgoing:</b>
        <ul>
          {requests.outgoing.map(r => (
            <SwapRow key={r._id} request={r} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SwapRequests;
