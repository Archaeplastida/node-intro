const { default: axios } = require("axios");
const fs = require("fs");
const theArg = process.argv[2];


function isUrl() {
    try {
        new URL(theArg);
        return true;
    }
    catch {
        return false;
    }
}

function cat(path) {
    fs.readFile(path, "utf-8", function (err, data) {
        if (err) {
            console.log(`Error reading ${path}:\n`, err.message);
            return null;
        }
        console.log(data);
    }
    )
}

async function webCat(url) {
    try {
        let html = await axios.get(url);
        console.log(html.data);
    } catch (error) {
        if (error.status) {
            console.log(`Error: Request failed with status code ${error.status}`)
        } else {
            console.log(`${url} is not a valid domain.`)
        }
    }

}

if (isUrl()) {
    webCat(theArg)
} else {
    cat(theArg);
}