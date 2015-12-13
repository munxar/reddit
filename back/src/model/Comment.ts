///<reference path="../../../typings/tsd.d.ts"/>
import {Document, model, Schema, Model, Types} from "mongoose";
import {IAccount} from "./Account";
import {ITopic} from "./Topic";

// interface for a comment
export interface IComment extends Document {
    content: string;

    topic: ITopic | Types.ObjectId;

    parent?: Types.ObjectId;

    creator: IAccount;
    creationDate: Date;

    votes: Types.ObjectId[];
}

// mongoose schema for comment
export var CommentSchema = new Schema({
    // comment content
    content: {type: String, required: true},

    // a comment belongs to a topic
    topic: {type: Schema.Types.ObjectId, required: true, ref: "Topic"},

    // optional parent, to structure comments as tree
    parent: {type: Schema.Types.ObjectId},

    // account id of creator
    creator: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
    // timestamp
    creationDate: {type: Date, required: true, "default": Date.now},

    // up votes
    votes: [{type: Schema.Types.ObjectId}],
});

// create comment model
export var Comment = model<IComment>("Comment", CommentSchema);
