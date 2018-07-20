const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const db = require('../database-mongo');
const path = require('path');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const helper = require('../helper/uitilty');
// limit the request body coming
app.use(express.static(path.join(__dirname, '../react-client/dist')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(session({
    secret: 'very very secret',
    resave: true,
    saveUninitialized: true
}));

app.post("/signup", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let fullName = req.body.fullName
    db.userSchema.find({
        username: username
    }, (err, data) => {
        if (err) {
            res.sendStatus(404);
        } else {
            if (data.length > 0) {
                res.sendStatus(404);
            } else {
                bcrypt.genSalt(saltRounds, function (err, salt) {
                    if (err) {
                        throw err;
                    }
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            throw err;
                        }
                        let user = new db.userSchema({
                            fullname: fullName,
                            username: username,
                            email: email,
                            password: hash
                        });
                        user.save(function (err, data) {
                            if (err) {
                                throw err;
                            }
                            helper.createSession(req, res, data.username);
                        });
                    });
                });
            }
        }
    });

})


app.post("/login", (req, res) => {
    console.log("jackel is here", req.body)
    let username = req.body.username;
    let password = req.body.password;
    db.userSchema.findOne({
        username: username
    }, (err, data) => {
        if (err) {
            throw err;
        } else {
            if (!data) { // if the user does not exist

                res.sendStatus(404);
            } else {
                bcrypt.compare(password, data.password, function (err, found) {
                    if (found) {
                        helper.createSession(req, res, data.username);
                    } else {
                        console.log("is here")
                        res.sendStatus(404);
                    }
                });
            }
        }
    });
})

app.get("/home", (req, res) => {
    db.machine.find({}, (err, data) => {
        if (err)
            res.send('error')
        else
            console.log(data)
        res.send(data)
    })
})

app.post("/home", (req, res) => {
    const { type, model, time, underMaintainace } = req.body
    let machine = new db.machine({
        type,
        model,
        underMaintainance: underMaintainace,
        maintainanceDate: time
    })

    machine.save((err, data) => {
        if (err)
            console.log(err)
        else
            console.log(data)
        res.send("data saved")
    })
})

app.post("/search", (req, res) => {
    db.machine.findOne({ type: req.body.type, model: req.body.model }, (err, data) => {
        if (err)
            res.send(err)
        else
            res.send(data)
    })
})

app.post('/delete', (req,res)=>{
    let Id = req.body.id;
db.machine.remove({_id: Id},  (err,data) =>{
    if (err) {
        throw err;
    } else {
        res.sendStatus(201);
    }
});

})

app.post('update', (req,res)=>{
    let model = req.body.model
    let type = req.body.type
  db.machine.update({model:model},{$set: {model:model, type:type}}, (err,data)=>{
        if(err){
            throw err;
        }else{
            res.send(data);
        }
  });
});


app.get('/*', (req, res) => {
    res.sendFile(path.resolve(path.join(__dirname, '../react-client/dist/index.html')))
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port : ${PORT}`);
});

