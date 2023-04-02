import { useState, Suspense } from "react";
import "./App.css";

const Html = ({ children, assets }) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href={assets["main.css"]}></link>
      <title>react-simple-ssr</title>
    </head>
    <body>{children}</body>
  </html>
);

const App = ({ assets, data }) => {
  const { posts } = data;
  console.log({ posts });
  const [count, setCount] = useState(0);
  return (
    <Html assets={assets}>
      <main>
        <h1>counter: {count}</h1>
        <button onClick={() => setCount(count + 1)}>+</button>
        {/* <Suspense fallback={() => (<div>"loading..."</div>)}>
        {
          posts.map(p => (
            <div key={p.id}>{p.id}</div>
          ))
        }
        </Suspense> */}
      </main>
    </Html>
  );
};

export default App;
