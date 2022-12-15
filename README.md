# js-signal
javascript signal for synchronization

## one-to-one sync blocked

```
async function A_prepare() {

    while (1) {
        console.log(Date.now() + ": worker A start preparing...");
        window.setTimeout(function () {
            console.log(Date.now() + ": worker A prepared.");
            Signal("prepared");
        }, 1000);
        await WaitForSignal("wait");
    }
}

async function B_work() {
    while (1) {
        await WaitForSignal("prepared");
        console.log(Date.now() + ": worker B start work.");

        window.setTimeout(function () {
            console.log(Date.now() + ": worker B finish work, waiting for worker A...");
            Signal("wait");
        }, 2000);
    }
}

A_prepare();
B_work();
```
[Demo](https://ysd2z.github.io/js-signal/one-to-one.html)
