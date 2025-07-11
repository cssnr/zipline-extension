// JS Background Service Worker

import { openExtPanel, openSidePanel } from './exports.js'

chrome.runtime.onStartup.addListener(onStartup)
chrome.runtime.onInstalled.addListener(onInstalled)
chrome.commands?.onCommand.addListener(onCommand)
chrome.contextMenus?.onClicked.addListener(contextMenusClicked)
chrome.notifications.onClicked.addListener(notificationsClicked)
chrome.storage.onChanged.addListener(onChanged)
chrome.runtime.onMessage.addListener(onMessage)

chrome.action.onClicked.addListener(actionOnClicked)

async function actionOnClicked(event) {
    console.debug('actionOnClicked:', event)
    await openExtPanel()
}

/**
 * On Installed Callback
 * @function onInstalled
 * @param {chrome.runtime.InstalledDetails} details
 */
async function onInstalled(details) {
    console.log('onInstalled:', details)
    const githubURL = 'https://github.com/cssnr/zipline-extension'
    // const installURL = 'https://github.com/cssnr/zipline-extension'
    const options = await setDefaultOptions({
        siteUrl: '',
        authToken: '',
        recentFiles: 14,
        popupWidth: 380,
        popupTimeout: 10,
        popupPreview: true,
        popupIcons: true,
        iconFavorite: true,
        iconPassword: true,
        iconExpire: false,
        popupLinks: true,
        popupSidePanel: true,
        checkAuth: true,
        deleteConfirm: true,
        ctxSidePanel: true,
        contextMenu: true,
        showUpdate: false,
        radioBackground: 'bgPicture',
        pictureURL: 'https://picsum.photos/1920/1080',
        videoURL: '',
    })
    console.log('options:', options)
    await setStorageDefaults(chrome.storage.local, { popupView: 'popup' })

    if (options.contextMenu) {
        // noinspection ES6MissingAwait
        createContextMenus(options)
    }
    const manifest = chrome.runtime.getManifest()
    if (details.reason === 'install') {
        // noinspection ES6MissingAwait
        await chrome.runtime.openOptionsPage()
        const url = chrome.runtime.getURL('/html/oninstall.html')
        console.log('oninstall url:', url)
        await chrome.tabs.create({ active: true, url })
    } else if (details.reason === 'update' && options.showUpdate) {
        if (manifest.version !== details.previousVersion) {
            let { internal } = await chrome.storage.sync.get(['internal'])
            internal = internal || {}
            if (internal?.lastShownUpdate !== manifest.version) {
                const url = `${githubURL}/releases/tag/${manifest.version}`
                console.log('update url:', url)
                await chrome.tabs.create({ active: false, url })
                internal.lastShownUpdate = manifest.version
                console.log('storage.sync: internal:', internal)
                await chrome.storage.sync.set({ internal })
            }
        }
    }
    // noinspection ES6MissingAwait
    setPopup()
    setUninstallURL()
}

/**
 * On Startup Callback
 * @function onStartup
 */
async function onStartup() {
    console.log('onStartup')
    // noinspection JSUnresolvedReference
    if (typeof browser !== 'undefined') {
        console.log('Firefox CTX Menu Workaround')
        const { options } = await chrome.storage.sync.get(['options'])
        console.debug('options:', options)
        if (options.contextMenu) {
            await createContextMenus(options)
        }
    }
    // noinspection ES6MissingAwait
    setPopup()
    setUninstallURL()
}

function setUninstallURL() {
    // const manifest = chrome.runtime.getManifest()
    // const url = new URL('https://link-extractor.cssnr.com/uninstall/')
    // url.searchParams.append('version', manifest.version)
    // chrome.runtime.setUninstallURL(url.href)
    // console.debug(`setUninstallURL: ${url.href}`)

    // Note: If only setting to a static url, this function is not required.
    const githubURL = 'https://github.com/cssnr/zipline-extension'
    // noinspection JSIgnoredPromiseFromCall
    chrome.runtime.setUninstallURL(`${githubURL}/issues`)
    console.debug(`setUninstallURL: ${githubURL}/issues`)
}

async function setPopup() {
    console.debug('setPopup')
    const { popupView } = await chrome.storage.local.get(['popupView'])
    console.debug('popupView:', popupView)
    if (popupView !== 'popup') {
        console.log('%c Clearing Popup...', 'color: Yellow')
        await chrome.action.setPopup({
            popup: '',
        })
    }
}

/**
 * On Command Callback
 * @function onCommand
 * @param {String} command
 */
async function onCommand(command) {
    console.debug(`onCommand: ${command}`)
    if (command === 'openZipline') {
        const { options } = await chrome.storage.sync.get(['options'])
        if (options.siteUrl) {
            console.debug('chrome.tabs.create:', options.siteUrl)
            await chrome.tabs.create({ active: true, url: options.siteUrl })
        } else {
            console.debug('chrome.runtime.openOptionsPage()')
            await chrome.runtime.openOptionsPage()
        }
    } else if (command === 'openFiles') {
        const { options } = await chrome.storage.sync.get(['options'])
        if (options.siteUrl) {
            const url = `${options.siteUrl}/dashboard/files`
            console.debug('chrome.tabs.create:', url)
            await chrome.tabs.create({ active: true, url })
        } else {
            console.debug('chrome.runtime.openOptionsPage()')
            await chrome.runtime.openOptionsPage()
        }
    } else if (command === 'openSidePanel') {
        openSidePanel()
    } else {
        console.warn('Unknown Command:', command)
    }
}

/**
 * Context Menus On Clicked Callback
 * @function contextMenusClicked
 * @param {chrome.contextMenus.OnClickData} ctx
 */
async function contextMenusClicked(ctx) {
    console.debug(`contextMenusClicked: ${ctx.menuItemId}:`, ctx)
    if (ctx.menuItemId.startsWith('upload')) {
        // let type = ctx.menuItemId.split('-').at(-1)
        // type = type.charAt(0).toUpperCase() + type.slice(1)
        // console.debug(`Upload Type: ${type}`)
        await processFileUpload(ctx.srcUrl)
    } else if (ctx.menuItemId === 'short') {
        await processShortURL(ctx.linkUrl)
    } else if (ctx.menuItemId === 'copy') {
        await clipboardWrite(ctx.srcUrl)
    } else if (ctx.menuItemId === 'side-panel') {
        openSidePanel()
    } else if (ctx.menuItemId === 'openPopup') {
        try {
            await chrome.action.openPopup()
        } catch {
            await openExtPanel()
        }
    } else if (ctx.menuItemId === 'options') {
        await chrome.runtime.openOptionsPage()
    } else {
        console.warn('Unknown ctx.menuItemId:', ctx.menuItemId)
    }
}

/**
 * Notifications On Clicked Callback
 * @function notificationsClicked
 * @param {String} notificationId
 */
async function notificationsClicked(notificationId) {
    console.debug('notifications.onClicked:', notificationId)
    // noinspection ES6MissingAwait
    chrome.notifications.clear(notificationId)
    if (notificationId.startsWith('http')) {
        await chrome.tabs.create({ active: true, url: notificationId })
    }
}

/**
 * On Changed Callback
 * @function onChanged
 * @param {Object} changes
 * @param {String} namespace
 */
function onChanged(changes, namespace) {
    // console.debug('onChanged:', changes, namespace)
    for (const [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (key === 'options' && namespace === 'sync' && oldValue && newValue) {
            if (
                oldValue.contextMenu !== newValue.contextMenu ||
                oldValue.ctxSidePanel !== newValue.ctxSidePanel
            ) {
                if (newValue?.contextMenu) {
                    console.log('Enabled contextMenu...')
                    // noinspection JSIgnoredPromiseFromCall
                    createContextMenus(newValue)
                } else {
                    console.log('Disabled contextMenu...')
                    // noinspection JSIgnoredPromiseFromCall
                    chrome.contextMenus?.removeAll()
                }
            }
        }
    }
}

/**
 * On Message Callback
 * @function onMessage
 * @param {Object} message
 */
function onMessage(message) {
    console.debug('onMessage:', message)
    if (message === 'createContextMenus') {
        chrome.storage.sync.get(['options'], (items) => {
            // noinspection JSIgnoredPromiseFromCall
            createContextMenus(items.options)
        })
    }
    if (message.type === 'log') {
        console.log(message.data)
    }
}

/**
 * Create Context Menus
 * @function createContextMenus
 * @param {Object} options
 */
async function createContextMenus(options) {
    if (!chrome.contextMenus) {
        return console.debug('Skipping: chrome.contextMenus')
    }
    console.debug('createContextMenus:', options)
    // noinspection ES6MissingAwait
    chrome.contextMenus.removeAll()
    //// Albums
    // const albums = await getAlbums()
    // console.debug('ctx: albums:', albums)
    // if (albums?.length) {
    //     addContext([['image', 'video'], 'upload-album', 'Upload to Album'])
    //     for (const album of albums) {
    //         // console.debug('ctx: album:', album)
    //         chrome.contextMenus.create({
    //             contexts: ['image', 'video'],
    //             id: `album-${album}`,
    //             parentId: 'upload-album',
    //             title: album,
    //         })
    //     }
    // }
    // General
    const ctx = ['image', 'video', 'audio', 'link']
    const contexts = [
        [['image'], 'upload-image', 'Upload Image'],
        [['video'], 'upload-video', 'Upload Video'],
        [['audio'], 'upload-audio', 'Upload Audio'],
        [['link'], 'short', 'Create Short URL'],
        [['image', 'video', 'audio'], 'copy', 'Copy Source URL'],
        [ctx, 'separator'],
    ]
    contexts.push([['all'], 'openPopup', 'Open Popup'])
    if (options.ctxSidePanel) {
        contexts.push([['all'], 'side-panel', 'Open Side Panel'])
    }
    contexts.push([['all'], 'options', 'Open Options'])
    contexts.forEach(addContext)
}

/**
 * Add Context from Array
 * @function addContext
 * @param {[chrome.contextMenus.ContextType[],String,String,chrome.contextMenus.ContextItemType?]} context
 */
function addContext(context) {
    // console.debug('addContext:', context)
    try {
        if (context[1] === 'separator') {
            const id = Math.random().toString().substring(2, 7)
            context[1] = `${id}`
            context.push('separator', 'separator')
        }
        // console.debug('menus.create:', context)
        chrome.contextMenus.create({
            contexts: context[0],
            id: context[1],
            title: context[2],
            type: context[3] || 'normal',
        })
    } catch (e) {
        console.log('%c Error Adding Context:', 'color: Yellow', e)
    }
}

/**
 * @function processShortURL
 * @param {String} linkUrl
 * @return {Promise<void>}
 */
async function processShortURL(linkUrl) {
    console.debug('%c processShortURL:', 'color: Lime', linkUrl)

    const { options } = await chrome.storage.sync.get(['options'])
    const headers = {
        Authorization: options.authToken,
        'Content-Type': 'application/json',
    }

    const body = { destination: linkUrl, enabled: true }

    try {
        const response = await fetch(`${options.siteUrl}/api/user/urls`, {
            body: JSON.stringify(body),
            method: 'POST',
            headers,
        })
        console.debug('response:', response)

        if (!response.ok) {
            const error = await response.json()
            console.debug('error:', error)
            throw new Error(error.toString())
        }

        const data = await response.json()
        console.debug('data:', data)

        let url = data.url
        console.debug('url:', url)

        await clipboardWrite(url)
        await sendNotification('Shorten URL', url, url)
    } catch (e) {
        console.error(e)
        console.debug('error:', e)
        await sendNotification('Error Shortening', linkUrl, `e${linkUrl}`)
    }
}

/**
 * @function processFileUpload
 * @param {String} srcUrl
 * @return {Promise<void>}
 */
async function processFileUpload(srcUrl) {
    console.debug('%c processFileUpload:', 'color: Lime', srcUrl)
    try {
        const srcResponse = await fetch(srcUrl)
        const blob = await srcResponse.blob()
        console.debug('blob:', blob)
        const srcURL = new URL(srcUrl)
        let filename = srcURL.pathname.split('/').pop().toString()
        console.debug('source filename:', filename)
        if (!filename.includes('.')) {
            const ext = blob.type.split('/')[1]
            if (srcUrl.startsWith('http')) {
                filename = `${filename}.${ext}`
            } else {
                const name = Math.random().toString(36).substring(2, 10)
                filename = `${name}.${ext}`
            }
        }
        console.debug('final filename:', filename)

        const formData = new FormData()
        formData.append('file', blob, filename)

        const { options } = await chrome.storage.sync.get(['options'])
        // TODO: Add Upload Options (to headers)...
        const headers = {
            Authorization: options.authToken,
            'x-zipline-original-name': true,
        }

        const response = await fetch(`${options.siteUrl}/api/upload`, {
            body: formData,
            method: 'POST',
            headers,
        })
        console.debug('response:', response)

        if (!response.ok) {
            const error = await response.json()
            console.debug('error:', error)
            throw new Error(error.toString())
        }

        const data = await response.json()
        console.debug('data:', data)

        // Note: Add Option to choose URL
        let url = data.files[0].url
        url = url.replace(`${options.siteUrl}/u/`, `${options.siteUrl}/view/`)
        console.debug('url:', url)

        await clipboardWrite(url)
        await sendNotification('File Uploaded', url, url)
    } catch (e) {
        console.error(e)
        console.debug('error:', e)
        await sendNotification('Error Uploading', srcUrl, `e${srcUrl}`)
    }
}

// /**
//  * Process Remote Requests using postURL
//  * @function processRemote
//  * @param {String} endpoint
//  * @param {String} url
//  * @param {String} message
//  * @param {Object=} kwargs Additional Header Key/Value Pairs
//  */
// async function processRemote(endpoint, url, message, kwargs) {
//     console.debug('processRemote:', endpoint, url, message, kwargs)
//     let response
//     try {
//         response = await postURL(endpoint, url, kwargs)
//     } catch (e) {
//         console.info('error:', e)
//         return await sendNotification('Fetch Error', `Error: ${e.message}`)
//     }
//     // console.log('response:', response)
//     if (response.ok) {
//         const data = await response.json()
//         console.debug('data:', data)
//         await clipboardWrite(data.url)
//         await sendNotification(message, data.url, data.url)
//     } else {
//         try {
//             const data = await response.json()
//             console.debug('data:', data)
//             await sendNotification('Processing Error', `Error: ${data.error}`)
//         } catch (e) {
//             console.info('error:', e)
//             await sendNotification(
//                 'Processing Error',
//                 `Error: Response Status: ${response.status}`
//             )
//         }
//     }
// }

/**
 * Send Notification
 * @function sendNotification
 * @param {String} title
 * @param {String} text
 * @param {String} id - Optional
 * @param {Number} timeout - Optional
 */
async function sendNotification(title, text, id = '', timeout = 10) {
    console.debug('sendNotification', title, text, id, timeout)
    const options = {
        type: 'basic',
        iconUrl: chrome.runtime.getURL('media/logo96.png'),
        title: title,
        message: text,
    }
    chrome.notifications.create(id, options, function (notification) {
        setTimeout(function () {
            chrome.notifications.clear(notification)
        }, timeout * 1000)
    })
}

/**
 * Write value to Clipboard for Firefox and Chrome
 * @function clipboardWrite
 * @param {String} value
 */
async function clipboardWrite(value) {
    console.debug('clipboardWrite:', value)
    if (navigator.clipboard) {
        // Firefox
        await navigator.clipboard.writeText(value)
    } else {
        // Chrome
        // await setupOffscreenDocument()
        await chrome.offscreen.createDocument({
            url: 'html/offscreen.html',
            reasons: [chrome.offscreen.Reason.CLIPBOARD],
            justification: 'Write text to the clipboard.',
        })
        const response = await chrome.runtime.sendMessage({
            target: 'offscreen',
            type: 'clipboard',
            data: value,
        })
        if (response) {
            console.warn('offscreen error:', response)
        }
    }
}

// let creating
// async function setupOffscreenDocument(path = 'html/offscreen.html') {
//     const offscreenUrl = chrome.runtime.getURL(path)
//     const existingContexts = await chrome.runtime.getContexts({
//         contextTypes: ['OFFSCREEN_DOCUMENT'],
//         documentUrls: [offscreenUrl],
//     })
//     console.log('existingContexts:', existingContexts)
//     if (existingContexts.length > 0) {
//         return
//     }
//
//     console.log('creating:', creating)
//     if (creating) {
//         await creating
//     } else {
//         creating = chrome.offscreen.createDocument({
//             url: path,
//             reasons: [chrome.offscreen.Reason.CLIPBOARD],
//             justification: 'Write text to the clipboard.',
//         })
//         console.log('creating:', creating)
//         await creating
//         console.log('creating:', creating)
//         creating = null
//     }
// }

/**
 * Set Default Options
 * @function setDefaultOptions
 * @param {Object} defaultOptions
 * @return {Promise<Object>}
 */
async function setDefaultOptions(defaultOptions) {
    console.log('setDefaultOptions')
    let { options } = await chrome.storage.sync.get(['options'])
    options = options || {}
    let changed = false
    for (const [key, value] of Object.entries(defaultOptions)) {
        // console.log(`${key}: default: ${value} current: ${options[key]}`)
        if (options[key] === undefined) {
            changed = true
            options[key] = value
            console.log(`Set ${key}:`, value)
        }
    }
    if (changed) {
        await chrome.storage.sync.set({ options })
        console.log('changed options:', options)
    }
    return options
}

/**
 * @function setStorageDefaults
 * @param {chrome.storage.LocalStorageArea|chrome.storage.SyncStorageArea} storageArea
 * @param {Object} defaultOptions
 * @return {Promise<void>}
 */
async function setStorageDefaults(storageArea, defaultOptions) {
    console.log('%c setStorageDefaults:', 'color: Lime', defaultOptions)
    const current = await storageArea.get()
    const data = {}
    for (const [key, value] of Object.entries(defaultOptions)) {
        if (current[key] === undefined) {
            data[key] = value
        }
    }
    if (Object.keys(data).length > 0) {
        console.log('%c Set data:', 'color: Yellow', data)
        await storageArea.set(data)
    }
}
