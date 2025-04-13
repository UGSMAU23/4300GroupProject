import { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    session: {
        strategy: "jwt",
    },
    providers: [],
    pages: {
        signIn: "/login"
    }
};