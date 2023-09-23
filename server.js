import express from "express";
import { toyService } from "./services/toy.service.js";
import cors from 'cors';

const app = express();

app.use(express.json())
const corsOptions = {
    origin: [
        'http://127.0.0.1:3000',
        'http://localhost:3000',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],
    credentials: true
};
app.use(cors(corsOptions));

app.get('/api/toy', (req, res) => {
    toyService.query().then((toys) => {
        res.send(toys)
    }).catch(ex => {
        console.log('/api/toy failed', ex);
        res.status(400).send({ msg: 'Error fetching toys' })
    })
})
app.get('/api/toy/:Id', (req, res) => {
    const toyId = req.params.Id
    toyService.getById(toyId).then((toy) => res.send(toy)).catch((ex) => {
        console.log('/api/toy/:id failed', ex);
        res.status(400).send({ msg: 'Error fetching toy' })
    })
})
app.delete('/api/toy/:id', (req, res) => {
    const toyId = req.params.id
    toyService.remove(toyId)
        .then(() => {
            res.end('Done!')
        })
        .catch(err => {
            console.log('/api/toy/:id faild', err);
            res.status(400).send({ msg: 'Error deleteing toy' })
        })
})

app.post('/api/toy', (req, res) => {
    const toy = req.body
    toyService.save(toy, false)
        .then(savedToy => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('/api/toy faild', err);
            res.status(400).send({ msg: 'Error adding toy' })
        })
})

app.put('/api/toy/:id', (req, res) => {
    const toy = req.body
    toyService.save(toy, true)
        .then(savedToy => {
            res.send(savedToy)
        })
        .catch(err => {
            console.log('/api/toy/:id faild', err);
            res.status(400).send({ msg: 'Error updating toy' })
        })
})
const port = process.env.PORT || 3030
app.listen(port, () => {
    console.log('Server is up and listening to', port);
})
