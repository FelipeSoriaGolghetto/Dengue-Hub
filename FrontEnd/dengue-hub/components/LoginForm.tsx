"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function LoginForm() {
    const [errors, setErrors] = useState<string[]>([]); // Estado para erros de validação
    const [message, setMessage] = useState<string | null>(null); // Estado para mensagem geral
    const [isError, setIsError] = useState<boolean>(false); // Indica se a mensagem é de erro
    const router = useRouter();

    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors([]); // Limpa erros anteriores
        setMessage(null); // Limpa mensagem anterior

        const formData = new FormData(e.currentTarget);

        const data = {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        };

        // Validação dos campos
        const validationErrors: string[] = [];
        if (!data.email) validationErrors.push("Campo 'Email' é obrigatório.");
        if (!data.password) validationErrors.push("Campo 'Senha' é obrigatório.");

        if (validationErrors.length > 0) {
            setErrors(validationErrors); // Exibe os erros
            return; // Interrompe a execução se houver erros
        }

        try {
            const result = await signIn("credentials", {
                ...data,
                redirect: false, // Evita redirecionamento automático
            });

            if (result?.error) {
                setMessage("Erro ao realizar login. Verifique suas credenciais e tente novamente.");
                setIsError(true);
            } else {
                localStorage.setItem("user_email", data.email);
                setMessage("Login realizado com sucesso!");
                setIsError(false);
                router.push("/admin"); // Redireciona para a página desejada
            }
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Erro inesperado. Tente novamente.");
            setIsError(true);
        }
    }

    return (
        <form
            onSubmit={login}
            className="border-dashed border-2 border-black bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col gap-2"
        >
            <div className="flex items-center mb-1">
                <a className="btn btn-ghost font-bold text-2xl mb-0" href="/">
                    DENGUE HUB
                    <img src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" />
                </a>
            </div>
            <div className="divider divider-accent"></div>
            <h2 className="font-bold text-xl mb-3">Bem vindo de volta!</h2>
            <h3 className="font-bold text mb-2">Você precisa fazer login para contribuir na Wiki</h3>

            {/* Campos do formulário */}
            <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-primary w-full"
            />
            <input
                name="password"
                type="password"
                placeholder="Senha"
                className="input input-primary w-full"
            />
            <button className="btn btn-secundary w-full">Fazer login</button>
            <a
                className="btn btn-secundary w-full"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => router.push("/cadastro")}
            >
                Cadastre-se
            </a>

            {/* Exibição dos erros de validação */}
            {errors.length > 0 && (
                <div className="mt-4 p-2 rounded text-red-500 bg-red-100">
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Mensagem de sucesso ou erro geral */}
            {message && (
                <div
                    className={`mt-4 p-2 rounded text-center ${
                        isError ? "bg-red-500 text-white" : "bg-green-500 text-white"
                    }`}
                >
                    {message}
                </div>
            )}
        </form>
    );
}
