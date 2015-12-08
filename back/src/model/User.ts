///<reference path="../../../typings/tsd.d.ts"/>
import {Document, model, Schema} from "mongoose";

interface IUser extends Document {
    username: string;
    password: string;
}

var UserSchema = new Schema({
    username: {type: String, required: true},
    password: String
});

export var User = model<IUser>("User", UserSchema);
