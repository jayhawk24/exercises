const fetch = require('node-fetch');
const fs = require('fs');
const { exit } = require('process');

const url = 'https://api-pub.bitfinex.com/v2/ticker/';

if (process.argv.length < 3) {
    console.log('Please enter a search term. Example tBTCUSD');
    exit();
}

const pathParams = process.argv[process.argv.length - 1];

async function request() {
    try {
        const req = await fetch(`${url}/${pathParams}`);
        const response = await req.json();
        if (response[0] === 'error') throw new Error('Invalid search term.');

        const data = `Price of ${pathParams} is ${response[6]}`;
        console.log(data);
        fs.writeFile('crypto.txt', data, (err) => {
            if (err) console.log(err.message);
        });
    } catch (err) {
        console.log(err.message);
    }
}

request();
