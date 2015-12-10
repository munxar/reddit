///<reference path="../../../typings/tsd.d.ts"/>
import * as express from "express";
import {AccountService} from "../service/AccountService";
import {AccountController} from "../controller/AccountController";
import {secure} from "../util/secure";

// create auth endpoint
export var account = express.Router();

// create service and controller instances
var accountService = new AccountService();
var ctrl = new AccountController(accountService);

// get my account info
account.get("/", secure, ctrl.getAccount);
// register
account.post("/register", ctrl.register);
// login
account.post("/login", ctrl.login);
// update account
account.put("/", secure, ctrl.update);
// delete account
account.delete("/", secure, ctrl.remove);