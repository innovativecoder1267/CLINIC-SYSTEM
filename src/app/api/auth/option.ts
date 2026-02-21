import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { UserModel } from "@/app/schemas/User.schema";
import { NextAuthOptions } from "next-auth";
import DbConnection from "@/lib/db/database";
export const  Options:NextAuthOptions={

providers:[
CredentialsProvider({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
    role: { label: "Role", type: "text" }
  },

  async authorize(credentials) {
    await DbConnection();
    if (!credentials?.email || !credentials?.password) {
      throw new Error("Missing credentials");
    }
    
    const User=await UserModel.findOne({email:credentials.email})

    if (!User) {
      throw new Error("User not found");
    }
       

 console.log("user CAME");
    if (!User.isVerified) {
      throw new Error("User is not verified");
    }
        

     console.log("user verified");
    if(User.Role!=credentials.role){
      throw new Error("Role  Mismatch");
    }
      

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      User.password
    );
 console.log("REQ CAME");
    if (!isPasswordCorrect) {
      throw new Error("Invalid password");
    }
  

    // ✅ RETURN MINIMAL SAFE OBJECT
    return {
      id: User.id?.toString(),
      email: User.email,
      Role: User.Role,
      username: User.username,
      name: User.name,
      phoneNumber: User.PhoneNumber,
      isVerified: User.isVerified,
    };
  },
})
],
callbacks:{
    async jwt({ token, user }) {
      if(user){
      token._id=user.id?.toString()
      token.username=user.username
      token.name=user.name
      token.email=user.email
      token.IsVerified=user.isVerified
      token.PhoneNumber=user.PhoneNumber
      token.Role=user.Role
      }
      return token

      
      //in this we will manually add our fields 
    },
     async session({ session, token }) {
      if(token){
        session.user.email=token.email
        session.user.username=token.username
        session.user.Role=token.Role
        session.user.PhoneNumber=token.PhoneNumber
        session.user.IsVerified=token.IsVerified
        session.user.name=token.name
        session.user._id=token._id
      }
      return session
    }
},
pages:{
  signIn:"/sign-in",
},
secret: process.env.NEXTAUTH_SECRET
}