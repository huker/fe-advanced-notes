import fs from "fs";
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const _url = fileURLToPath(import.meta.url);
const __dirname = dirname(_url);


function promisify(fn) {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
}


let customReadFile = promisify(fs.readFile);

customReadFile(resolve(__dirname, 'age.txt'), 'utf-8').then((data) => {
    console.log(data)
}, (err) => {
    console.log('error', err)
})