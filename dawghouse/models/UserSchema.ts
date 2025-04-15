import mongoose, {Document, Schema, Model} from "mongoose";

export interface User extends Document {
    username: String;
    email: String;
    password: String;
    answers: Array<String>;
}

const UserSchema = new Schema<User>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    answers: {type: [String]}
});

const User: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default User;