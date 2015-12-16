///<reference path="../../../typings/tsd.d.ts"/>
import {Document, model, Schema, Model, Types} from "mongoose";
import {IAccount} from "./Account";
import {CommentSchema, IComment} from "./Comment";

// interface for a topic
export interface ITopic extends Document {
    title: string;
    type: string;
    content: string;

    creator: IAccount;
    creationDate: Date;

    votes: Types.ObjectId[];

    comments: IComment[];
}

// mongoose schema for topic
var TopicSchema = new Schema({
    // title of the topic
    title: {type: String, required: true, minlength: 0, maxlength: 255},
    // type of topic
    type: {type: String, "enum": ["url", "text"], require: true, "default": "url"},
    // url if type == url, or text if type == text
    content: {type: String, required: true, minlength: 0, maxlength: 255},

    // account id of creator
    creator: {type: Schema.Types.ObjectId, ref: "Account"},
    // timestamp
    creationDate: {type: Date, required: true, "default": Date.now},

    // we us two array to keep track of up and down votes.
    votes: [{type: Schema.Types.ObjectId}],

    // comments
    comments: [CommentSchema]
});

// create topic model
export var Topic = model<ITopic>("Topic", TopicSchema);
