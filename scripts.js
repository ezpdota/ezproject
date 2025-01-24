// 2. Обнаружение попыток XSS
document.addEventListener("DOMContentLoaded", () => {
    const originalInnerHTML = document.body.innerHTML;

    const observer = new MutationObserver(() => {
        if (document.body.innerHTML !== originalInnerHTML) {
            alert("Обнаружена попытка внедрения скрипта!");
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});

// 3. Ограничение выполнения вредоносного кода
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

// 4. Защита от кликовых атак (Clickjacking)
if (window.top !== window.self) {
    window.top.location = window.self.location;
}

