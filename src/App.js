import React, { useState } from "react";
import "./App.css";

const SERVER = "https://5e96-168-91-200-234.ngrok.io";
const FRONTEND = ""

const postChoices = (first, second, third, onFinish, onReject) => {
  fetch(
    `http://localhost:8000/menu?first=${encodeURIComponent(
      first
    )}&second=${encodeURIComponent(second)}&third=${encodeURIComponent(third)}`
  )
    .then(onFinish)
    .error(onReject)
    .catch(onReject);
};

const options = [
  {
    label: "Heritage Caviar Restaurant & Bar",
    location: "Ukrainian Village",
    price: "$75",
    note: "must be seated by 3-3:30pm",
    menu: "https://tinyurl.com/heritagooo",
  },
  {
    label: "Tortoise Supper Club",
    location: "River North",
    price: "Varies by plate",
    menu: "https://tortoisesupperclub.com/menus/dinner/",
  },
  {
    label: "Segnatore",
    location: "Ukrainian Village",
    price: "$85",
    menu: "https://tinyurl.com/segnatorooo",
  },
  {
    label: "Siena Tavern",
    location: "River North",
    price: "$90",
    menu: "https://tinyurl.com/sienaooo",
  },
  {
    label: "RPM Tavern",
    location: "River North",
    price: "$95",
    menu: "https://tinyurl.com/rpmooo",
  },
  {
    label: "Osteria Via Stato",
    location: "River North",
    price: "$75",
    menu: "https://tinyurl.com/osteriaviastatooo",
  },
];

const Choice = ({
  setSelected,
  selected,
  disabled,
  label,
  location,
  price,
  menu,
  note = null,
}) => (
  <div
    className="choice"
    style={{
      display: "flex",
      flexDirection: "row",
      margin: "1rem",
      alignItems: "center",
    }}
  >
    <button
      className="choiceButton"
      disabled={disabled}
      type="button"
      onClick={() => setSelected(label)}
      style={{
        display: "inline-flex",
        borderRadius: "50%",
        flexGrow: 0,
        margin: "0.5rem",
        width: 40,
        height: 40,
        border: "5px pink solid",
        backgroundColor: selected ? "blue" : undefined,
      }}
    />
    <div style={{ margin: "auto 0", fontSize: 12 }}>
      <div style={{ fontWeight: "bold", fontSize: 18 }}>{label}</div>
      <a href={menu} target="_blank" rel="noopener noreferer">
        Menu
      </a>
      {` - ${price} - ${location}`}
      {note && <div>{note}</div>}
    </div>
  </div>
);

function App() {
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);

  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted)
    return (
      <div className="App">
        <h1>tybb</h1>
      </div>
    );

  if (error)
    return (
      <div className="App">
        <h1>oops</h1>
        <div>{error}</div>
      </div>
    );

  return (
    <div className="App">
      <h1>12/24 Dinner</h1>
      <div>
        <h2>First choice</h2>
        {options.map((o) => (
          <Choice
            key={o.label}
            {...o}
            selected={first === o.label}
            setSelected={setFirst}
            disabled={second === o.label || third === o.label}
          />
        ))}
      </div>
      <div>
        <h2>Second choice</h2>
        {options.map((o) => (
          <Choice
            key={o.label}
            {...o}
            selected={second === o.label}
            setSelected={setSecond}
            disabled={first === o.label || third === o.label}
          />
        ))}
      </div>
      <div>
        <h2>Third choice</h2>
        {options.map((o) => (
          <Choice
            key={o.label}
            {...o}
            selected={third === o.label}
            setSelected={setThird}
            disabled={second === o.label || first === o.label}
          />
        ))}
      </div>
      <button
        type="button"
        disabled={!(first && second && third)}
        style={{
          fontSize: 24,
          fontWeight: "bold",
          borderRadius: "1rem",
          width: "100%",
          margin: "1rem",
          padding: "1rem",
          border: "5px pink solid",
        }}
        onClick={() => {
          postChoices(
            first,
            second,
            third,
            () => setSubmitted(true),
            () => setError(true)
          );
        }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
