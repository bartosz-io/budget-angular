import * as jsonServer from 'json-server';
import * as rewrite from "express-urlrewrite";
import * as path from 'path';
import * as fs from 'fs';

export default (inputDb = 'db.json') => {

  const dbFile = path.join(__dirname, inputDb);
  const rewritesFile = path.join(__dirname, 'rewrites.json');

  const db = JSON.parse(fs.readFileSync(dbFile, 'utf8'));
  const rewrites = JSON.parse(fs.readFileSync(rewritesFile, 'utf8'));

  const server = jsonServer.create();
  const router = jsonServer.router(db);

  Object.keys(rewrites).forEach((key) => {
    server.use(rewrite(key, rewrites[key]));
  })
  server.use(jsonServer.defaults());
  server.use(router);

  return server;
}
