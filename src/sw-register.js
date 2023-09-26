if ('serviceWorker' in navigator) {
    const s = navigator.serviceWorker;
    s.register("/serviceworker.js");
}
