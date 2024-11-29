"use client";

import React, { useState } from "react";

export default function RegisterForm() {
    const [errors, setErrors] = useState<string[]>([]); // Estado para erros de validação
    const [message, setMessage] = useState<string | null>(null); // Estado para mensagens de sucesso ou erro geral
    const [isError, setIsError] = useState<boolean>(false); // Define se a mensagem é de erro

    async function register(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setErrors([]); // Limpa erros anteriores
        setMessage(null); // Limpa mensagens gerais

        const formData = new FormData(e.currentTarget);

        const data = {
            id_user: 1,
            user_email: formData.get("email") as string,
            user_name: formData.get("name") as string,
            user_role: formData.get("job") as string,
            password: formData.get("password") as string,
            sign_up_date: "",
            status: "Pending",
            wiki_role: "",
        };

        // Validação dos campos
        const validationErrors: string[] = [];
        if (!data.user_name) validationErrors.push("Campo 'Nome' é obrigatório.");
        if (!data.user_role) validationErrors.push("Campo 'Profissão' é obrigatório.");
        if (!data.user_email) validationErrors.push("Oampo 'Email' é obrigatório.");
        if (!data.password) validationErrors.push("Oampo 'Senha' é obrigatório.");

        if (validationErrors.length > 0) {
            setErrors(validationErrors); // Exibe os erros
            return; // Interrompe a execução se houver erros
        }

        // Envio da requisição HTTP
        try {
            const response = await fetch("http://127.0.0.1:8000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setMessage("Usuário cadastrado com sucesso!");
                setIsError(false);
                if (e.currentTarget) {
                    e.currentTarget.reset(); // Limpa o formulário após sucesso
                }
            } else {
                const errorData = await response.json();
                setMessage(`Erro ao cadastrar: ${errorData.detail || "Tente novamente."}`);
                setIsError(true);
            }
        } catch (error) {
            // console.error();
            setMessage(error instanceof Error ? error.message : String(error));
            setIsError(true);
        }
    }

    return (
        <form
            onSubmit={register}
            className="border-dashed border-2 border-black bg-white p-12 rounded-lg w-96 max-w-full flex justify-center items-center flex-col"
        >
            <div className="flex items-center mb-1">
                <a className="btn btn-ghost text-2xl font-bold" href="/">
                    DENGUE HUB
                    <img src="/logo-mosquito.svg" alt="Logo" width={40} height={40} className="mr-1" />
                </a>
            </div>
            <div className="divider divider-accent"></div>
            <h2 className="font-bold text-xl mb-3">Bem vindo!</h2>
            <h3 className="font-bold text mb-2">Você precisa estar cadastrado para contribuir na Wiki</h3>

            {/* Campos do formulário */}
            <input
                type="text"
                name="name"
                placeholder="Nome completo"
                className="input input-primary w-full"
            />
            <input
                type="text"
                name="job"
                placeholder="Profissão"
                className="input input-primary w-full"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-primary w-full"
            />
            <input
                type="password"
                name="password"
                placeholder="Senha"
                className="input input-primary w-full"
            />

            <button className="btn btn-secundary w-full">Cadastrar</button>

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