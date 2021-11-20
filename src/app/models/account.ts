import { Id } from "./types";
import { User } from "./user";

export class Account {
  constructor(public id: Id, users: User[] = []) {}
}
