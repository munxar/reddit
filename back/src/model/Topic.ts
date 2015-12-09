///<reference path="../../../typings/tsd.d.ts"/>
import {Document, model, Schema, Model, Types} from "mongoose";
import {IAccount} from "./Account";

// interface for a topic
export interface ITopic extends Document {
    title: string;
    type: string;
    content: string;

    creator: IAccount | string;
    creationDate: Date;

    upVotes: Types.ObjectId[];
    downVotes: Types.ObjectId[];
}

// mongoose schema for topic
var TopicSchema = new Schema({
    // title of the topic
    title: {type: String, required: true},
    // type of topic
    type: {type: String, "enum": ["url", "text"], require: true, "default": "url"},
    // url if type == url, or text if type == text
    content: {type: String, required: true},

    // account id of creator
    creator: {type: Schema.Types.ObjectId, required: true, ref: "Account"},
    // timestamp
    creationDate: {type: Date, required: true, "default": new Date()},

    // we us two array to keep track of up and down votes.
    // we store the account._id in the array, so we know which user voted.
    // a combination of $addToSet and $pull can now be used to make on up- or down vote per
    // topic per user.
    upVotes: [{type: Schema.Types.ObjectId}],
    downVotes: [{type: Schema.Types.ObjectId}]
});

// create topic model
export var Topic = model<ITopic>("Topic", TopicSchema);
