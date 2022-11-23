import axios from "axios";

const instance = axios.create({
    // baseURL: "http://192.168.2.128:3000/api/",
    baseURL: "https://assistant-api.onrender.com/",
    // baseURL: "http://localhost:5000/",
    timeout: 3000,
});

export default async function (url, type, data = null) {
    let result;
    type = type.toLowerCase();

    switch (type) {
        case "get":
            await instance
                .get(url, { params: data })
                .then((res) => {
                    console.log("get success :>> ");
                    result = res.data;
                })
                .catch((error) => {
                    console.log("get failed :>> ", error);
                    result = error.data;
                });
            return result;
        case "post":
            await instance
                .post(url, data)
                .then((res) => {
                    console.log(`post ${data} success `);
                    result = res.data;
                })
                .catch((error) => {
                    console.log(`post ${data} success `, error);
                    result = error.data;
                });
            return result;
        case "put":
            await instance
                .put(`${url}/${data.id}`, data)
                .then((res) => {
                    console.log(`put ${url} success `);
                })
                .catch((error) => {
                    console.log(`put ${url} success `, error);
                });
            break;
        case "delete":
            // data = id
            await instance
                .delete(`${url}/${data}`)
                .then((res) => {
                    console.log(`delete ${url} success `);
                })
                .catch((error) => {
                    console.log(`delete ${url} success `, error);
                });
            break;
        default:
            console.log(`Missing type error: ${type}`);
            break;
    }
}
