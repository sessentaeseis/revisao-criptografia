import express from "express"
import cors from "cors"
import bcrypt from "bcryptjs"
import { prisma } from "./lib/prisma.ts"

const app = express()
const PORT = 3000
app.use(cors())
app.use(express.json())

app.post("/criarusuario", async(req, res) => {
    try {
        const {email, senha} = req.body
        const senhaHash = await bcrypt.hash(senha, 10)
        const novoUsuario = await prisma.user.create({
            data: {
                email,
                senha: senhaHash
            }
        })
        res.status(200).json({message: "Usuário Criado" + novoUsuario})
    } catch(error) {
        res.status(401).json({error: "Erro na criação de usuário."})
    }
})

app.post("/login", async(req, res) => {
    try {
        const { email, senha } = req.body
        const logar = await prisma.user.findUnique({
            where: {
                email
            }
        }) 
        const senhaValida = await bcrypt.compare(senha, logar.senha)
        if (!logar) {
            res.status(401).json({
                error: "Credenciais inválidas."
            })
        }
        if (!senhaValida) {
            res.status(401).json({
                error: "Credenciais inválidas."
            })
        }
        res.status(200).json("Validado.")
    } catch(error) {
        res.status(500).json("Erro no servidor.")
    }
})

app.get("/usuarios", async(req, res) => {
    const usuarios = await prisma.user.findMany()
    res.json(usuarios)
})


app.listen(PORT, () => {
    console.log(`rodando na ${PORT}`)
})