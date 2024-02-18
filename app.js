
const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, 'data.json');

let data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));

console.log('>>>>>>',dataFilePath);

const express = require("express");

const app = express();

const port = 3000;

app.use(express.json())


app.get('/', (req, res) => {
    res.json({ message: "API is working", data });
})

app.get('/api', (req, res) => {
    res.send(JSON.stringify(data));
})

app.post('/api/post', (req, res) => {
    try {
        newData = {
            id: data.length + 1,
            name: req.body.name,
            age: req.body.age
        };
        console.log(req.body);
        data.push(newData);
        fs.writeFileSync(dataFilePath,JSON.stringify(data));
        res.json(data);
        console.log("Data added");
    }
    catch (error) {
        console.log(error);
    }

})


app.put('/api/put/:id', (req, res) => {
    let id = req.params.id;
    id = Number.parseInt(id);
    let name = req.body.name;
    let age = req.body.age;
    console.log(req.body);
    let index = data.findIndex((data) => {
        return (data.id === id);
    });

    if (index !== -1) {
        let updatedData = data[index];
        updatedData.id = id;
        updatedData.name = name;
        updatedData.age = age;
        fs.writeFileSync(dataFilePath,JSON.stringify(data));
        res.json(data);
    } else {
        res.status(404).json({ message: 'Data not found' });
    }
});

app.delete('/api/delete/:id',(req,res)=>{
    let id = req.params.id;
    id = Number.parseInt(id);
    data.id = Number.parseInt(data.id);
    let index = data.findIndex((data) => {
        return (data.id === id);
    });

    console.log('>>',index);

    if (index !== -1)
    {
        data.splice(index, 1);
        fs.writeFileSync(dataFilePath,JSON.stringify(data));
        res.json(data);
    } else 
    {
        res.status(404).json({ message: 'Data not found' });
    }
})


app.listen(port, () => {
    console.log("Listening at port ", port);
})