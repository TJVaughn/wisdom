import React from 'react';
import './App.css';
import Quote from './Quote';

function App() {
  return (
    <div className="App">
      {/* <h1>Wisd.io</h1>$53 */}
      <h1>AncientQuote.com</h1>
      <h3>Your Daily Dose Of Ancient Wisdom</h3>
      <h5>Today's Quote: </h5>
      <Quote />
      <h2>Quote's in your inbox</h2>
      <p>
        Get the quote of the day automatically in your inbox every day!
      </p>
      <p>
        
      </p>
      <form>
        <label>email</label><br />
        <input /><br />
        We will never spam you or anything weird, just quotes!<br />
        <button>submit</button>
      </form>
    </div>
  );
}

export default App;
