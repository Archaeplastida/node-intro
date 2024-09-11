const { default: axios } = require("axios");
const fs = require("fs");
let path_to_write = process.argv[3]
let theArg = process.argv[2]
let writing;


if (theArg === "--out") {
    writing = true;
    theArg = process.argv[4];
}

function isUrl() {
    try {
        new URL(theArg);
        return true;
    }
    catch {
        return false;
    }
}

async function cat(path) {

    let theData = new Promise((resolve, reject) => {
        fs.readFile(path, "utf-8", function (err, data) {
            if (err) {
                console.log(`Error reading ${path}:\n`, err.message);
                reject(err);
            }
            if (!writing) {
                console.log(data);
            }
            resolve(data);
        }
        )
    }
    )
    return theData;
}

async function catWrite(path, fileName) {
    try {
        const data = await cat(fileName);

        fs.writeFile(path, data, "utf-8", function (err) {
            if (err) {
                console.log(`Couldn't write ${path}:\n`, err.message);
                return null;
            }
            console.log(`No output, but ${path} now contains ${fileName}'s content.`);
        }
        )
    } catch{ //Left blank intentionally. 
    }
}

async function webCat(url) {
    try {
        let html = await axios.get(url);
        console.log(html.data);
        return html.data;
    } catch (error) {
        if (error.status) {
            console.log(`Error: Request failed with status code ${error.status}`)
        } else {
            console.log(`${url} is not a valid domain.`)
        }
    }

}

async function webCatWrite(path, url) {
    try{
        fs.writeFile(path, url, "utf-8", function (err) {
            if (err) {
                console.log(err);
            }
            console.log(`No output, but ${path} now contains HTML from ${url}.`);
        }
        )
    } catch{ //Left blank intentionally. 
    }
}

if (writing) {
    if (isUrl()) {
        webCat(theArg).then(data => webCatWrite(path_to_write, data));
    } else {
        catWrite(path_to_write, theArg);
    }
} else {
    if (isUrl()) {
        webCat(theArg)
    } else {
        cat(theArg);
    }
}
