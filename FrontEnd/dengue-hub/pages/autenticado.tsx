import { getServerSession } from "next-auth";
import { GetServerSideProps } from "next";

export default async function Page(){
    const session = await getServerSession();

    if(!session){
        return (
            <div>
                <div> Você não está autenticado! </div>
            </div>
        );
    }
    return (
        <div>
            <div> Olá, {session?.user?.name} </div>
            <div> Você está autenticado! </div>
        </div>
    );
}