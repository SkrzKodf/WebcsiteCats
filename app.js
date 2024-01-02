import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import Datastore from "nedb";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { config } from 'dotenv';
import process from "process";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const urlencodedParser = express.urlencoded({ extended: false });

const app = express();

const db = new Datastore({ filename: './db/forms.db' });
db.loadDatabase();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/client'));
app.use(express.static(__dirname + '/admin'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
config();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});

app.get('/formDone', (req, res) => {
    res.sendFile(__dirname + '/client/index.complete.html');
});

app.get('/adminLogin', (req, res) => {
        if (!req.cookies.token) {
            res.sendFile(__dirname + '/admin/admin.html'); 
        };

        if (String(req.cookies.token) == process.env.TOKEN) {
            res.redirect('/adminPanel');
        } else {
            res.sendFile(__dirname + '/admin/admin.html');
        };
});

app.get('/adminPanel', urlencodedParser, (req, res) => {
        if (!req.cookies.token) { res.redirect('/') };

        if (String(req.cookies.token) == process.env.TOKEN) {
            res.sendFile(__dirname + '/admin/adminPanel.html');
        } else {
            res.redirect('/');
        };
});


app.post('/login', urlencodedParser, (req, res) => {
        if (process.env.ADMINNAME == req.body.username && process.env.PASSWORD == req.body.password) {
            res.cookie('token', JSON.parse(doc).token).redirect('/adminPanel');
        } else {
            res.redirect('/');
        };
})

app.get("/getForm", (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            return res.status(500).send(err);
        };
        res.status(200).send(docs);
    });
});

app.post("/addForm", urlencodedParser, (req, res) => {
    if (!req.body || !req.body.name || !req.body.email || !req.body.description) {
        return res.sendStatus(403);
    };

    try {
        db.insert({ name: req.body.name, email: req.body.email, description: req.body.description });
    } catch (error) {
        return res.status(502).send(error);
    };

    res.status(200).redirect("/formDone");
});

app.patch("/patchForm", urlencodedParser, (req, res) => {
        if (!req.cookies.token) {
            return res.status(404).send('hohoho, no');
        };

        if (String(req.cookies.token) == process.env.TOKEN) {
            if (!req.body || !req.body.name || !req.body.email || !req.body.description) {
                return res.sendStatus(403);
            }
            try {
                db.update({ _id: req.body.id }, { name: req.body.name, email: req.body.email, description: req.body.description });
            } catch (error) {
                return res.status(502).send(error);
            };
            res.status(200).send("ok");
        } else {
            return res.status(404).send('hohoho, no');
        };
});

app.delete("/deleteForm", urlencodedParser, (req, res) => {
        if (!req.cookies.token) {
            return res.status(404).send('hohoho, no');
        };


        if (String(req.cookies.token) == process.env.TOKEN) {
            if (!req.body || !req.body._id) {
                return res.sendStatus(403);
            };

            try {
                db.remove(req.body);
            } catch (error) {
                return res.status(502).send(error);
            };
            res.status(200).send("ok");
        } else {
            return res.status(404).send('hohoho, no');
        };
});


app.listen(3000, () => {
    console.log("Сервер запущен");
});