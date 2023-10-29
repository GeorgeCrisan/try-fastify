import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fastify from "fastify";

import {
  runSelectQuery,
  combinedTransactions,
  singleTransaction,
} from "./execute-transaction.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("ce", __dirname);
const server = fastify({
  https: {
    key: fs.readFileSync(join(__dirname, "..", "certs", "server.key")),
    cert: fs.readFileSync(join(__dirname, "..", "certs", "server.crt")),
  },
});

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  [key: string]: string;
}

interface IReply {
  200: { success: boolean };
  302: { url: string };
  "4xx": { error: string };
}

server.get<{
  Querystring: IQuerystring;
  Headers: IHeaders;
  Reply: IReply;
}>("/auth", async (request: any, reply: any) => {
  const { username, password } = request.query;

  if (!username || !password) {
    throw new Error(
      "Add a username and a password as query parameters so I can demo to you"
    );
  }

  reply.code(200).send({ success: true, message: `${username} logged in` });
});

server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.get("/test-oracle-db", async (request, reply) => {
  const result = await runSelectQuery(`SELECT * FROM nodetab`);
  return result;
});

server.get("/create-mock-data", async (request, reply) => {
  await singleTransaction(`create table EMPLOYEES (
    empno number,
    name varchar2(50) not null,
    job varchar2(100),
    manager number,
    hiredate date,
    salary number(7,2),
    comission number(7,2),
    deptid number,
    constraint pk_employees primary key (empno),
    constraint fk_employees_deptid foreign key (deptid)
      references DEPARTMENTS (deptid)
)`);
  return "Done";
});

server.listen({ port: 8080 }, (error, address) => {
  if (error) {
    console.error("Fatal start up error. Fix your shit and try again.", error);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
