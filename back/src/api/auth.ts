///<reference path="../../../typings/tsd.d.ts"/>
import * as express from "express";
import {AuthService} from "../service/AuthService";
import {AuthCtrl} from "../controller/AuthCtrl";

// create auth endpoint
export var auth = express.Router();

// create service and controller instances
var authService = new AuthService();
var ctrl = new AuthCtrl(authService);

// map routes to controller methods
auth.post("/register", ctrl.register);
