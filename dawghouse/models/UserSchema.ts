import mongoose, {Document, Schema, Model} from "mongoose";

export interface User extends Document {
    username: String;
    email: String;
    password: String;
    answers?: string[];
    scores?: {
        age: number;
        gender: number;
        living: number;
        personality: number;
        substances: number;
        locations: string[];
      }
    hashEmail: String;
    description: String;
}

const UserSchema = new Schema<User>({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    answers: { type: [String], default: [] },
    hashEmail: {type: String},
    description: {type: String},
    scores: {
        age: { type: Number, default: 0 },
        gender: { type: Number, default: 50 },
        living: { type: Number, default: 50 },
        personality: { type: Number, default: 50 },
        substances: { type: Number, default: 50 },
        genderPreference: { type: Number, default: 50 },
        locations: { type: [String], default: [] }
      }
});

const User: Model<User> = mongoose.models.User || mongoose.model<User>("User", UserSchema);
export default User;