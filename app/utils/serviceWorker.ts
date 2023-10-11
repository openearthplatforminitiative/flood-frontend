export const registerServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) {
        throw Error("Service workers are not supported by this browser.");
    }
    return navigator.serviceWorker.register('/service.js')
}
export const getReadyServiceWorker = async () => {
    if (!('serviceWorker' in navigator)) {
        throw Error("Service workers are not supported by this browser.");
    }
    return navigator.serviceWorker.ready;
}