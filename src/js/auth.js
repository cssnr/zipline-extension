// JS auth.js

;(async () => {
    const cookies = Object.fromEntries(
        document.cookie.split(';').map((cookie) => {
            const [key, ...valParts] = cookie.split('=')
            return [key.trim(), decodeURIComponent(valParts.join('='))]
        })
    )
    console.log('cookies:', cookies)

    if (cookies.zipline_session) {
        const message = {
            type: 'site-auth',
            origin: window.location.origin,
            cookie: cookies.zipline_session,
        }
        await chrome.runtime.sendMessage(message)
    }
})()
