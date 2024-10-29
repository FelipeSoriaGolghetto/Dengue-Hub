import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "Email", type: "email", placeholder: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
            if (!credentials){
                return null;
            }
            if(credentials.email == "andrewcsa@usp.br" && credentials.password == "123456"){
                return {id:"1",
                        email: credentials.email, 
                        name: "Andrew" }
            }
            return null;
    },
  }),
]
})

export { handler as GET, handler as POST }