import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import User from "./models/UserSchema";
import connectMongoDB from "./config/mongodb";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (!credentials) return null;

                try {
                    connectMongoDB();
                    const user = await User.findOne({email: credentials.email}).lean();

                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isMatch) {
                            return {
                                id: user._id.toString(),
                                email: user.email,
                                name: user.username,
                            };
                        } else {
                            console.log("Email or password incorrect");
                            return null;
                        }
                    } else {
                        console.log("User not found");
                        return null;
                    }
                } catch (e: any) {
                    console.error("An authentication error occurred: ", e);
                    return null;
                }
            }
        })
    ]
})