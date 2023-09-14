const express = require('express');
const port = process.env.PORT || 8080;

const app = express();

app.get('/', (req,res) => { // Homepage
    res.sendFile("index.html", { root: __dirname })
}); 

app.use(express.urlencoded({extended: false}));

app.use(express.static(__dirname));

app.listen(port, () => {
    console.log("Node application listening on port " + port);
});