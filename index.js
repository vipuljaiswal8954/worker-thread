const { Worker } = require('worker_threads');

// Create the worker thread
const worker = new Worker('./worker.js');

// Listen for messages from the worker
const string = "vipul";
worker.postMessage(string);
worker.on('message', (message) => {
    console.log(`Main Thread: File writing status: ${message}`);
});

// Listen for any error from the worker
worker.on('error', (error) => {
    console.error(`Worker error: ${error.message}`);
});