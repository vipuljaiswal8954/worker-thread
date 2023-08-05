const { parentPort } = require('worker_threads');
const fs = require('fs');

// File writing function
function writeFileAsync(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

// Listen for messages from the main thread
parentPort.on('message', async (data) => {
    try {
        // Perform file writing asynchronously
        console.log("Wait for three seconds");
        setTimeout(async () => {
            await writeFileAsync("./message.txt", data);

            // Notify the main thread about the completion
            parentPort.postMessage('File writing completed successfully!');
        }, 3000);

    } catch (error) {
        // Notify the main thread about the error
        parentPort.postMessage(`File writing failed: ${error.message}`);
    }
});