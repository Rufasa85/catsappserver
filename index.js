var express = require('express');
const cors = require("cors")
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.get('/',(req,res)=>{
    res.send("cats 4 dayz")
})

app.get('/api/cats',(req,res)=>{
    db.Cat.findAll().then(cats=>{
        res.json(cats)
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err)
    })
})

app.post('/api/cats',(req,res)=>{
    db.Cat.create({
        name:req.body.name
    }).then(newCat=>{
        res.json(newCat)
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err)
    })
})

app.delete("/api/cats/:id",(req,res)=>{
    db.Cat.destroy({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        res.json(data)
    }).catch(err=>{
        console.log(err);
        res.status(500).json(err)
    })
})

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});