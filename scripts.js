document.addEventListener("DOMContentLoaded", () => {
    const originalEval = window.eval;
    window.eval = function () {
        console.warn("Вызов eval заблокирован!");
        return null;
    };

    const originalSetTimeout = window.setTimeout;
    window.setTimeout = function (callback, delay, ...args) {
        if (typeof callback === "string") {
            console.warn("Вызов setTimeout с кодом заблокирован!");
            return null;
        }
        return originalSetTimeout(callback, delay, ...args);
    };
});

if (window.top !== window.self) {
    window.top.location = window.self.location;
}

