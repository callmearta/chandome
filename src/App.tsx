import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import { UnlistenFn, listen } from '@tauri-apps/api/event'

function App() {
  const [date, setDate] = useState<Date>(new Date());
  const weekday = useMemo(() => date.toLocaleDateString('fa-IR', { weekday: "long" }), [date]);
  const year = useMemo(() => date.toLocaleDateString('fa-IR', { year: 'numeric' }), [date]);
  const day = useMemo(() => date.toLocaleDateString('fa-IR', { day: 'numeric' }), [date]);
  const month = useMemo(() => date.toLocaleDateString('fa-IR', { month: 'long' }), [date]);
  const listenerRef = useRef<UnlistenFn>();

  const listenForDateChange = async () => {
    if (listenerRef.current) return;
    listenerRef.current = await listen('date-changed', () => {
      setDate(new Date());
    })
  }

  useEffect(() => {
    if (listenerRef.current)
      listenerRef.current();

    listenForDateChange();

    return () => {
      if (listenerRef.current)
        listenerRef.current();
    };
  }, [listenerRef]);


  return (
    <div className="container">
      <p className="weekday">{weekday}</p>
      <h1 className="day">{day}</h1>
      <h3 className="month">{month}</h3>
      <p className="year"><small>{year}</small></p>
    </div>
  );
}

export default App;
