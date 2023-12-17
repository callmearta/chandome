import "./App.css";

function App() {
  const weekday = new Date().toLocaleDateString('fa-IR', { weekday: "long" });
  const year = new Date().toLocaleDateString('fa-IR', { year: 'numeric' });
  const day = new Date().toLocaleDateString('fa-IR', { day: 'numeric' });
  const month = new Date().toLocaleDateString('fa-IR', { month: 'long'});


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
