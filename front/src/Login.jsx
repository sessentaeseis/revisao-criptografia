import { useState, useEffect } from "react"

function Login() {
    const [email, setEmail] = useState([""])
    const [senha, setSenha] = useState([""])
    
    async function fazerLogin(e){
        e.preDefault()
        const resposta = await fetch(
            "http://localhost:3000/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "applications/json"
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            }
        )
        const dados = await resposta.json()
        if (!resposta.ok) {
            alert(dados.erro || dados.message || "Email e/ou senha incorretos.")
        }
        alert("Login bem-sucedido.")
    }
    return (
        <form onSubmit={fazerLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <button type="submit">Logar</button>
        </form>
    )
}

export default Login