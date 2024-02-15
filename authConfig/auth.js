import GoogleProvider from 'next-auth/providers/google';
import clientPromise from './mongoDBPromise';
import { decode, encode } from 'next-auth/jwt';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { Hash } from 'crypto';
const mongoDBAdapter = MongoDBAdapter(clientPromise,{ databaseName: "nextstore", collections: "users",accounts: null, })
export const authConfig = {
  // adapter: MongoDBAdapter(clientPromise,{ databaseName: "nextstore", collections: "users" }),
  theme: {
    colorScheme: 'dark'
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl: process.env.NEXTAUTH_URL + "/api/auth/callback/google",
    }),
   CredentialsProvider({
      name: "credentials",
     credentials: {
        username: {label: 'username', type: "text", placeholder: "enter your username"},
      email: {label: "email", type:"email", placeholder: "enter your email"},
       password: { label: "password", type: "password", placeholder: "******" },
      actions: '',
     },
     async authorize(credentials) {
       const { action } = credentials;
       
       if (action === 'signup') {
        const existingUser = await mongoDBAdapter.getUserByEmail(credentials.email);
        if (!existingUser) {
          const newUser = await mongoDBAdapter.createUser({
            provider: 'credentials',
            email: credentials.email,
            name: '',
            image: '',
            reviews: [],
            bought: [],
            password: credentials.password,
            username: credentials.username,
            emailVerified: false,
          });
          console.log("New user added to MongoDB:", newUser);
          return newUser;
        } else {
          throw new Error('User with this email already exists');
          return null 
        }
      } else if (action === 'signin') {
        const existingUser = await mongoDBAdapter.getUserByEmail(credentials.email);
  
        if (existingUser && existingUser.email === credentials.email && existingUser.password === credentials.password) {
          return existingUser;
        } else {
          return null
        }
      }
  
      return null;
    }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ credentials, user, account, profile }) {
      try {
          // google
          const existingUser = await mongoDBAdapter.getUserByEmail(user.email);
          if (!existingUser) {
            const newUser = await mongoDBAdapter.createUser({
              provider: account.provider,
              email: user.email,
              name: user.name,
              image: user.image,
              reviews: [],
              bought: [],
              username: profile.given_name,
              emailVerified: profile.email_verified || false,
            });
            console.log("New user added to MongoDB:", newUser);
          }
      } catch (error) {
        console.error("Error during sign-in process:", error);
      }
      return user;
    },
    async session({ user, session, trigger }) {
      if (session) {
        try {
          const userFromDB = await mongoDBAdapter.getUserByEmail(session.user.email);
          if (userFromDB) {
            session.user = userFromDB
          }
        } catch (error) {
          console.error("Error fetching user from MongoDB:", error);
        }
      }
      return session;
    },
  },
}
