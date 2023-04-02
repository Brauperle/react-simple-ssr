import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from "express";
import { renderToPipeableStream } from "react-dom/server";

import App from "./App";
import assetsMap from '../dist/public/manifest.json';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 1234;

app.get("/", async (req, res) => {
  try {
    const postsRAW = await fetch("https://jsonplaceholder.typicode.com/posts");
    await new Promise(resolve => setTimeout(resolve, 3000));
    const postsJSON = await postsRAW.json();
  
    const { pipe } = renderToPipeableStream(
      <App
        assets={assetsMap}
        data={{ posts: postsJSON }}
      />,
      {
        bootstrapScriptContent: `
          window.assets = ${JSON.stringify(assetsMap)};
          window.data = ${JSON.stringify({ posts: postsJSON })};
        `,
        bootstrapScripts: [assetsMap["main.js"]],
        onShellReady() {
          res.setHeader("content-type", "text/html");
          pipe(res);
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(join(__dirname, '../dist/public')));
// app.use(express.static(publicPathname));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
