

function A_prepare() {
    console.log(Date.now(), ": worker A prepare...");
    window.setTimeout(function () {
        Signal("ready");
        console.log(Date.now(), ": worker A prepared.");
    }, 3000);
}

async function B_wait() {
    console.log(Date.now(), ": worker B waiting for worker A...");
    await WaitForSignal("ready");
    console.log(Date.now(), ": worker B start work.");
}

A_prepare();
B_wait();
