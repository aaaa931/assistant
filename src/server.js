const express = require("express");
const cors = require("cors");
const { json_get, json_post, json_put } = require("./json");
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get("/record", (req, res) => {
    const query = req.query;

    const getData = (data, query = null) => {
        const keys = Object.keys(query);
        const key = keys.length > 0 ? keys[0] : "";
        const result = data.filter((data) => {
            if (key.length > 0) {
                return data[key] === parseInt(query[key]);
            } else {
                return data;
            }
        });

        res.send(result);
    };

    json_get("record", getData, query);
    console.log(`record get success`);
});

app.get("/record/:id", (req, res) => {
    const params = req.params;
    console.log("params", params);

    const getData = (data, params = null) => {
        res.send(data[params.id]);
    };

    json_get("record", getData, params);
    console.log(`record get success`);
});

app.post("/record", (req, res) => {
    json_post("record", req.body);
    console.log("post req.body", req.body);
    console.log(`record post success`);
});

app.put("/record", (req, res) => {
    json_put("record", req.body);
    console.log("put req.body", req.body);
    console.log(`record post success`);
});

app.get("/item", (req, res) => {
    res.send(`item test success`);
});

app.listen(port, () => {
    console.log(`assistant server listening on port ${port}`);
});
