import { useState, useEffect } from 'react'

function useTime() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
      const id = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }, []);
    return time;
}

function Clock({ color, time }:any) {
    return (
      <h1 style={{ color: color }}>
        {time}
      </h1>
    );
}

function App() {
    const time = useTime();
    const [color, setColor] = useState('lightcoral');
    return (
      <div>
        <p>
          Pick a color:{' '}
          <select value={color} onChange={e => setColor(e.target.value)}>
            <option value="lightcoral">lightcoral</option>
            <option value="midnightblue">midnightblue</option>
            <option value="rebeccapurple">rebeccapurple</option>
          </select>
        </p>
        <Clock color={color} time={time.toLocaleTimeString()} />
      </div>
    )
}

export default App
