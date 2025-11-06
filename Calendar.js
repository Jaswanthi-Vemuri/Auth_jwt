import React, { useEffect, useState } from "react";
import API from "../api/api";
import { handleError, handleSuccess } from "../utils";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", startTime: "", endTime: "" });

  const fetchEvents = () => API.get("/events").then(res => setEvents(res.data)).catch(() => setEvents([]));

  useEffect(() => { fetchEvents(); }, []);

  const handleStatus = (id, status) => {
    API.patch(`/events/${id}`, { status })
      .then(() => { handleSuccess("Updated!"); fetchEvents(); })
      .catch(() => handleError("Error updating"));
  };

  const createEvent = (e) => {
    e.preventDefault();
    API.post("/events", form)
      .then(() => { handleSuccess("Created!"); fetchEvents(); setForm({ title: "", startTime: "", endTime: "" }) })
      .catch(() => handleError("Error creating"));
  };

  return (
    <div>
      <h2>Your Events</h2>
      <form onSubmit={createEvent}>
        <input required placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
        <input required type="datetime-local" value={form.startTime} onChange={e => setForm(f => ({ ...f, startTime: e.target.value }))} />
        <input required type="datetime-local" value={form.endTime} onChange={e => setForm(f => ({ ...f, endTime: e.target.value }))} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {events.map(evt => (
          <li key={evt._id}>
            <b>{evt.title}</b> ({evt.status}) {new Date(evt.startTime).toLocaleString()} - {new Date(evt.endTime).toLocaleString()}
            {" "}
            {evt.status === "BUSY" && <button onClick={() => handleStatus(evt._id, "SWAPPABLE")}>Make Swappable</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Calendar;
