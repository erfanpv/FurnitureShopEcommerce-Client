import React, { useState } from 'react';

function Counter() {
  
  const [count, setCount] = useState({ num: 0 });

  const handleClick = () => {
    setCount(prevCount => ({
      num: prevCount.num + 1
    }));
    console.log(count);
  };

  return (
    <div>
      <h1>{count.num}</h1>
      <button onClick={handleClick}>Click</button>
    </div>
  );
}

export default Counter;


// const dummyCart = [
//   {
//     id: 1,
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     price: 10.9,
//     quantity: 2,
//     deliveryDate: "Tuesday, June 21",
//     image: Slide1,
//   },
//   {
//     id: 2,
//     name: "Intermediate Size Basketball",
//     price: 20.95,
//     quantity: 1,
//     deliveryDate: "Wednesday, June 15",
//     image: Slide2,
//   },
// ];