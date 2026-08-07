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

                if (user.success === false) {
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
        async signIn({ user, account }) {
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
                image: user.image,
                role: "user",
                status: "active",
                isVerified: true,
                createdAt: new Date().toISOString()
            }

            const result = await dbConnect(collections.USER).insertOne(newUser)
            return result.acknowledged
        },
        async session({ session, token }) {

            session.user = {
                id: token.id,
                name: token.name,
                email: token.email,
                image: token.image,
                role: token.role,
                contact: token.contact,
                nid: token.nid,
                status: token.status
            };

            return session;
        },

        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
            }
            const dbUser = await dbConnect(collections.USER).findOne({
                email: token.email
            });
            if (dbUser) {
                token.id = dbUser?._id?.toString();
                token.name = dbUser?.name;
                token.email = dbUser?.email;
                token.image = dbUser?.image || null;
                token.role = dbUser?.role;
                token.status = dbUser.status;
                token.contact = dbUser?.contact;
                token.nid = dbUser?.nid;
            }
            return token;
        }
    }
}
