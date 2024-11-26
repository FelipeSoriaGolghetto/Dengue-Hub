import CredentialsProvider from "next-auth/providers/credentials"
import NextAuth from "next-auth"

const handler = NextAuth({
  pages:{
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
    name: 'Credentials',
    credentials: {
      email: { label: "Email", type: "email", placeholder: "email" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
            if (!credentials){
                return null;
            }
            const response = await fetch(`http://127.0.0.1:8000/login?user_email=${encodeURIComponent(credentials.email)}&user_password=${encodeURIComponent(credentials.password)}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            const user = await response.json();

            // If the API returns a valid user, return the user object
            if (response.ok && user) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
              };
            }

            // If the credentials are invalid, return null
            return null;
    },
  }),
]
})

export { handler as GET, handler as POST }