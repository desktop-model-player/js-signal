async function A_prepare() {
    while (1) {
        console.log(Date.now() + ": worker A start preparing...");
        window.setTimeout(function () {
            Signal("prepared");
            console.log(Date.now() + ": worker A prepared, waiting for worker B and C.");
        }, 1000);
        await WaitForSignal("B_wait");
        console.log(Date.now() + ": worker A keep waiting for worker C.");
        await WaitForSignal("C_wait");
    }
}

async function B_work() {
    while (1) {
        await WaitForSignal("prepared", "B");
        console.log(Date.now() + ": worker B start work.");

        window.setTimeout(function () {
            console.log(Date.now() + ": worker B finish work, waiting for worker A...");
            Signal("B_wait");
        }, 2000);
    }
}

async function C_work() {
    while (1) {
        await WaitForSignal("prepared", "C");
        console.log(Date.now() + ": worker C start work.");

        window.setTimeout(function () {
            console.log(Date.now() + ": worker C finish work, waiting for worker A...");
            Signal("C_wait");
        }, 4000);
    }
}


A_prepare();
B_work();
C_work();
