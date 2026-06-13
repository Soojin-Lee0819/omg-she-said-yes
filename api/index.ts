// Vercel Serverless Function entry point.
//
// We import the Express `app` (NOT artifacts/api-server/src/index.ts). The
// index.ts module calls app.listen() and requires PORT — that's the persistent
// server model, which Vercel does not run. Importing app.ts gives us the bare
// request handler instead. An Express app IS a (req, res) handler, which is
// exactly what Vercel's Node runtime invokes per request.
import app from "../artifacts/api-server/src/app";

export default app;
