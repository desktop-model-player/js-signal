var internalSignal = {};

function Signal(tag) {
    internalSignal[tag] = true;
}

async function WaitForSignal(tag) {
    while (!internalSignal[tag]) {
        var sleepTask = new Promise((resolve, reject) => {
            window.setTimeout(function () {
                resolve();
            }, 0);
        });
        await sleepTask.then();
    }
    delete internalSignal[tag];
}
