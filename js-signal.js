var internalSignal = {};

function Signal(tag) {
    internalSignal[tag] = {};
}

async function sleep(interval) {
    var sleepTask = new Promise((resolve, reject) => {
        window.setTimeout(function () {
            resolve();
        }, interval);
    });
    await sleepTask.then();
}

async function WaitForSignal(tag, id) {
    while (!internalSignal[tag]) {
        await sleep(0);
    }

    while (internalSignal[tag][id]) {
        await sleep(0);
    }

    internalSignal[tag][id] = true;
}