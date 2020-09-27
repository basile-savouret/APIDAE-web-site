import {CreateUserCommand} from "model/User"
import mongoose, {Schema, Document} from "mongoose";

export interface UserDocument extends CreateUserCommand, Document {
    loginToken: string
}

const UserSchema: Schema = new Schema({
    email: {type: Schema.Types.String, required: true, unique: true},
    firstname: {type: Schema.Types.String, required: true},
    lastname: {type: Schema.Types.String, required: true},
    roles: {type: Schema.Types.Array, required: true},
    loginToken: {type: Schema.Types.String, required: true},
});

export default mongoose.model<UserDocument>('users', UserSchema);