import express from 'express';
import bodyParser from 'body-parser';
import jwt from "jsonwebtoken";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(bodyParser.json());



app.post('/auth', (req, res) => {
    const { body } = req;
    const msg400 = "errou burro"
    if(body.usuario === 'felipe' && body.senha === 'seila123') {
        const token = jwt.sign({}, 'teste123')
        res.json(token);
        return;
    } 
    res.status(400).send(msg400);
    
});

function exigeAuth(req, res, next) {
    const msg401 = "nao autorizado"
    const { token } = req.headers

    if(jwt.verify(token, 'teste123')) {
        next();
        return;
    }

    res.status(401).send(msg401)
}

app.get('/produtos', exigeAuth, (req, res) => {
    res.send('hello world');
});

app.listen(3000, () => console.log('rodando...'))

