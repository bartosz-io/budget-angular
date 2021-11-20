import { User } from "@models/user";

export const users: User[] = [
  {
    id: "1",
    accountId: "1",
    email: "bartosz@app.com",
    role: "OWNER",
    confirmed: true,
  },
  {
    id: "2",
    accountId: "2",
    email: "john@app.com",
    role: "OWNER",
    confirmed: true,
  },
  {
    id: "3",
    accountId: "2",
    email: "mike@app.com",
    role: "READER",
    confirmed: true,
  },
];

export const tokens = {
  "bartosz@app.com":
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJpZCI6IjEiLCJhY2NvdW50SWQiOiIxIiwiZW1haWwiOiJiYXJ0b3N6QGFwcC5jb20iLCJyb2xlIjoiT1dORVIiLCJpYXQiOjE1ODQ2MTUzOTMsImV4cCI6MTU4NDYxNTk5M30=." +
    "mock-signature",

  "john@app.com":
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJpZCI6IjIiLCJhY2NvdW50SWQiOiIyIiwiZW1haWwiOiJqb2huQGFwcC5jb20iLCJyb2xlIjoiT1dORVIiLCJpYXQiOjE1ODQ2MTU5NDIsImV4cCI6MTU4NDYxNjU0Mn0=." +
    "mock-signature",

  "mike@app.com":
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
    "eyJpZCI6IjMiLCJhY2NvdW50SWQiOiIyIiwiZW1haWwiOiJtaWtlQGFwcC5jb20iLCJyb2xlIjoiUkVBREVSIiwiaWF0IjoxNTg0NjE1OTQyLCJleHAiOjE1ODQ2MTY1NDJ9." +
    "mock-signature",
};
