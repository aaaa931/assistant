const fs = require("fs");

const json_get = (url, cb, params = null) => {
    const path = `src/data/${url}.json`;

    fs.readFile(path, (error, dataList) => {
        if (error) {
            return console.log("json_get error :>> ", error);
        }

        // const data = dataList.length > 0 ? JSON.parse(dataList.toString()) : [];
        const data = dataList.length > 0 ? JSON.parse(dataList) : [];
        console.log("get data -> ", data);
        cb(data, params);

        return data;
    });
};

exports.json_get = json_get;

exports.json_post = (url, newData) => {
    const path = `src/data/${url}.json`;

    fs.readFile(path, (error, dataList) => {
        if (error) {
            return console.log("json_insert error :>> ", error);
        }

        // let data = dataList.toString();
        // data = JSON.parse(data);
        // data.push(newData);
        // data = JSON.stringify(data);
        let data = dataList.length > 0 ? JSON.parse(dataList) : [];
        const id = Math.max(...data.map((data) => data.id)) + 1;
        newData.id = id;
        data.push(newData);
        data = JSON.stringify(data);

        console.log("post newData :>> ", newData);
        console.log("post data :>> ", data);
        console.log("post id", id);

        fs.writeFile(path, data, (error) => {
            if (error) {
                console.log("json_insert error :>> ", error);
            } else {
                console.log("json_insert success :>> ");
            }
        });
    });
};

exports.json_put = (url, id, newData) => {
    const path = `src/data/${url}.json`;

    fs.readFile(path, (error, dataList) => {
        if (error) {
            return console.log("json_insert error :>> ", error);
        }

        let data = dataList.length > 0 ? JSON.parse(dataList) : [];

        for (let i; i < data.length; i++) {
            if (data[i].id === id) {
                data[i] = newData;
            }
        }

        fs.writeFile(path, data, (error) => {
            if (error) {
                console.log("json_insert error :>> ", error);
            } else {
                console.log("json_insert success :>> ");
            }
        });
    });
};
