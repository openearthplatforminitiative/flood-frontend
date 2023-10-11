// @ts-check

self.addEventListener('push', async (event) => {
    if (event.data) {
        //const eventData = await event.data.json()
        console.log("Push received")
    }
})
