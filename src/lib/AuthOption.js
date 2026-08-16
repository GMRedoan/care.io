import { loginUser } from "../server/auth.service";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { collections, dbConnect } from "./dbConnect";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const user = await loginUser(credentials);
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
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (!user?.email) {
          return false;
        }

        const userCollection = dbConnect(collections.USER);

        const existingUser = await userCollection.findOne({
          email: user.email,
        });

        // Existing user
        if (existingUser) {
          return true;
        }

        // New Google user
        const newUser = {
          provider: account?.provider || "google",
          name: user.name || "",
          email: user.email,
          image: user.image || "",
          contact: "",
          nid: "",
          role: "user",
          status: "active",
          isVerified: true,
          createdAt: new Date(),
        };

        await userCollection.insertOne(newUser);

        return true;
      } catch (error) {
        console.error("Google sign-in error:", error);
        return false;
      }
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
        status: token.status,
      };

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      const dbUser = await dbConnect(collections.USER).findOne({
        email: token.email,
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
    },
  },
};
