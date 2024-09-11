const fs = require("fs");
const argv = process.argv;

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

cat(argv[2]);