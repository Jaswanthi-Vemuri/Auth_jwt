import React, { useEffect, useState } from "react";
import API from "../api/api";
import { handleError, handleSuccess } from "../utils";

function Marketplace() {
  const [slots, setSlots] = useState([]);
  const [mySlots, setMySlots] = useState([]);
  const [modalSlot, setModalSlot] = useState(null);

  useEffect(() => {
    API.get("/swappable-slots").then(res => setSlots(res.data));
    API.get("/events").then(res => setMySlots(res.data.filter(s => s.status === "SWAPPABLE")));
  }, []);

  const requestSwap = (theirSlotId, mySlotId) => {
    API.post("/swap-request", { theirSlotId, mySlotId })
      .then(() => { handleSuccess("Swap requested!"); setModalSlot(null); })
      .catch(() => handleError("Swap failed"));
  };

  return (
    <div>
      <h2>Marketplace</h2>
      <ul>
        {slots.map(slot => (
          <li key={slot._id}>
            <b>{slot.title}</b> [{new Date(slot.startTime).toLocaleString()}]
            <button onClick={() => setModalSlot(slot._id)}>Request Swap</button>
          </li>
        ))}
      </ul>
      {modalSlot &&
        <div style={{ background: "#eee", padding: 10, borderRadius: 5 }}>
          <h4>Offer one of your slots:</h4>
          {mySlots.length === 0 && "No swappable slots."}
          {mySlots.map(slot =>
            <button key={slot._id} style={{ margin: 5 }} onClick={() => requestSwap(modalSlot, slot._id)}>
              {slot.title} [{new Date(slot.startTime).toLocaleString()}]
            </button>
          )}
          <button onClick={() => setModalSlot(null)} style={{ marginLeft: 10 }}>Cancel</button>
        </div>
      }
    </div>
  );
}
export default Marketplace;
