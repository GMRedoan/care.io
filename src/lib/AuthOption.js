import { loginUser } from "../server/auth.service";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
            },
            async authorize(credentials, req) {
                const user = await loginUser(credentials)
                if (!user) {
                    throw new Error("Invalid email or password");
                }

                if(user.success === false) { 
                    throw new Error(user.message);
                }
 
                if (!user.isVerified) {
                    throw new Error("Please verify your email before logging in");
                }
                
                return user;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isExist = await dbConnect(collections.USER).findOne({
                email: user.email
            });
            if (isExist) {
                return true
            }
            const newUser = {
                provider: account.provider,
                nid: "",
                name: user.name,
                email: user.email,
                contact: "",
                isVerified: true,
                createdAt: new Date().toISOString()
            }
            const result = await dbConnect(collections.USER).insertOne(newUser)
            return result.acknowledged
        },
        async session({ session, user, token }) {
            if (token) {
                session.email = token?.email
            }
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                if (account.provider == "google") {
                    const dbUser = await dbConnect(collections.USER).findOne({ email: user.email })
                    token.email = dbUser?.email
                } else {
                    token.email = user?.email
                }
            }
            return token
        }
    }
}
