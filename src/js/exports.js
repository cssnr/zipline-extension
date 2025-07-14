// JS Exports

/**
 * Link Click Callback
 * Note: Firefox popup requires a call to window.close()
 * @function linkClick
 * @param {MouseEvent} event
 * @param {Boolean} [close]
 */
export async function linkClick(event, close = false) {
    console.debug('linkClick:', close, event)
    event.preventDefault()
    const target = event.currentTarget || event.target
    console.debug('target:', target)
    const { popupView } = await chrome.storage.local.get(['popupView'])
    if (popupView !== 'popup') {
        close = false
    }
    console.debug('close:', close)
    const href = target.getAttribute('href').replace(/^\.+/g, '')
    console.debug('href:', href)
    let url
    if (href.startsWith('#')) {
        console.debug('return on anchor link')
        return
    } else if (href.endsWith('html/options.html')) {
        await chrome.runtime.openOptionsPage()
        if (close) window.close()
        return
    } else if (href.endsWith('html/sidepanel.html')) {
        openSidePanel()
        if (close) window.close()
        return
        // } else if (href.endsWith('html/popup.html')) {
        //     console.debug('%c openPopupPanel()', 'color: Yellow')
        //     await openPopupPanel()
        //     if (close) window.close()
        //     return
    } else if (href.startsWith('http')) {
        url = href
    } else {
        url = chrome.runtime.getURL(href)
    }
    console.debug('url:', url)
    await activateOrOpen(url)
    if (close) window.close()
}

/**
 * Activate or Open Tab from URL
 * @function activateOrOpen
 * @param {String} url
 * @param {Boolean} [open]
 * @return {Promise<chrome.tabs.Tab>}
 */
export async function activateOrOpen(url, open = true) {
    console.debug('activateOrOpen:', url, open)
    // Note: To Get Tab from Tabs (requires host permissions or tabs)
    const tabs = await chrome.tabs.query({ currentWindow: true })
    console.debug('tabs:', tabs)
    for (const tab of tabs) {
        if (tab.url === url) {
            console.debug('%cTab found, activating:', 'color: Lime', tab)
            return await chrome.tabs.update(tab.id, { active: true })
        }
    }
    if (open) {
        console.debug('%cTab not found, opening url:', 'color: Yellow', url)
        return await chrome.tabs.create({ active: true, url })
    }
    console.warn('tab not found and open not set!')
}

/**
 * The New Quick and Dirty Open Popup or Panel Method
 * @function openPopupPanel
 */
export async function openPopupPanel() {
    try {
        // noinspection JSUnresolvedReference
        if (typeof browser !== 'undefined') {
            try {
                await chrome.action.openPopup()
            } catch {
                await openExtPanel()
            }
        } else {
            const { popupView } = await chrome.storage.local.get(['popupView'])
            if (popupView !== 'popup') {
                console.debug('openExtPanel()')
                await openExtPanel()
            } else {
                console.debug('chrome.action.openPopup()')
                await chrome.action.openPopup()
            }
        }
    } catch (e) {
        console.debug('error:', e)
    }
}

/**
 * Open Popup Event Handler
 * @function openPopup
 * @param {Event} [event]
 */
export async function openPopup(event) {
    console.debug('openPopup:', event)
    event?.preventDefault()
    try {
        const windows = await chrome.windows.getAll()
        await chrome.windows.update(windows[0].id, { focused: true })
        await chrome.action.openPopup({ windowId: windows[0].id })
    } catch (e) {
        console.log(e)
    }
}

/**
 * Open Side Panel Callback
 * @function openSidePanel
 * @param {MouseEvent} [event]
 */
export function openSidePanel(event) {
    console.debug('openSidePanel:', event)
    if (chrome.sidePanel) {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            // noinspection JSIgnoredPromiseFromCall
            chrome.sidePanel.open({ windowId: tab.windowId })
        })
    } else if (chrome.sidebarAction) {
        // noinspection JSUnresolvedReference
        chrome.sidebarAction.open()
    } else {
        console.log('Side Panel Not Supported')
        if (event) {
            return
        }
    }
    if (event) {
        window.close()
    }
}

/**
 * Open Extension Panel
 * TODO: Determine why this is not working consistently...
 * @function openExtPanel
 * @param {String} [url]
 * @param {Number} [width]
 * @param {Number} [height]
 * @param {String} [type]
 * @return {Promise<chrome.windows.Window>}
 */
export async function openExtPanel(
    url = '/html/popup.html',
    width = 0,
    height = 0,
    type = 'panel'
) {
    let { lastPanelID, panelSize } = await chrome.storage.local.get([
        'lastPanelID',
        'panelSize',
    ])
    console.debug('lastPanelID, panelSize:', lastPanelID, panelSize)
    const size = panelSize?.split('x') || [0, 0]
    console.debug('size:', size)
    width = parseInt(width || size[0] || 340)
    height = parseInt(height || size[1] || 600)
    console.debug(`openExtPanel: ${url}`, width, height)
    try {
        const window = await chrome.windows.get(lastPanelID)
        if (window) {
            console.debug(`%c Window found: ${window.id}`, 'color: Lime')
            return await chrome.windows.update(lastPanelID, {
                focused: true,
            })
        }
    } catch (e) {
        console.log(e)
    }
    const window = await chrome.windows.create({ type, url, width, height })
    // NOTE: Code after windows.create is not executed on the first pop-out...
    console.debug(`%c Created new window: ${window.id}`, 'color: Magenta')
    // chrome.storage.local.set({ lastPanelID: window.id })
    return window
}

/**
 * @function updatePlatform
 * @return {Promise<any>}
 */
export async function updatePlatform() {
    const platform = await chrome.runtime.getPlatformInfo()
    console.debug('updatePlatform:', platform)
    const splitCls = (cls) => cls.split(' ').filter(Boolean)
    if (platform.os === 'android' && typeof document !== 'undefined') {
        // document.querySelectorAll('[class*="mobile-"]').forEach((el) => {
        document
            .querySelectorAll(
                '[data-mobile-add],[data-mobile-remove],[data-mobile-replace]'
            )
            .forEach((el) => {
                if (el.dataset.mobileAdd) {
                    for (const cls of splitCls(el.dataset.mobileAdd)) {
                        // console.debug('mobileAdd:', cls)
                        el.classList.add(cls)
                    }
                }
                if (el.dataset.mobileRemove) {
                    for (const cls of splitCls(el.dataset.mobileRemove)) {
                        // console.debug('mobileAdd:', cls)
                        el.classList.remove(cls)
                    }
                }
                if (el.dataset.mobileReplace) {
                    const split = splitCls(el.dataset.mobileReplace)
                    // console.debug('mobileReplace:', split)
                    for (let i = 0; i < split.length; i += 2) {
                        const one = split[i]
                        const two = split[i + 1]
                        // console.debug(`replace: ${one} >> ${two}`)
                        el.classList.replace(one, two)
                    }
                }
            })
    }
    return platform
}

/**
 * Show Bootstrap Toast
 * @function showToast
 * @param {String} message
 * @param {String} type
 */
export function showToast(message, type = 'success') {
    console.debug(`showToast: ${type}: ${message}`)
    const clone = document.querySelector('.d-none .toast')
    const container = document.getElementById('toast-container')
    if (clone && container) {
        const element = clone.cloneNode(true)
        element.querySelector('.toast-body').innerHTML = message
        element.classList.add(`text-bg-${type}`)
        container.appendChild(element)
        const toast = new bootstrap.Toast(element)
        element.addEventListener('mousemove', () => toast.hide())
        toast.show()
    } else {
        console.info('Missing clone or container:', clone, container)
    }
}

/**
 * DeBounce Function
 * @function debounce
 * @param {Function} fn
 * @param {Number} timeout
 */
export function debounce(fn, timeout = 250) {
    let timeoutID
    return (...args) => {
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => fn(...args), timeout)
    }
}

/**
 * Update DOM with Manifest Details
 * @function updateManifest
 */
export async function updateManifest() {
    const manifest = chrome.runtime.getManifest()
    document.querySelectorAll('.version').forEach((el) => {
        el.textContent = manifest.version
    })
    document.querySelectorAll('[href="homepage_url"]').forEach((el) => {
        el.href = manifest.homepage_url
    })
    // document.querySelectorAll('[href="version_url"]').forEach((el) => {
    //     el.href = `${githubURL}/releases/tag/${manifest.version}`
    // })
}

/**
 * Grant Permissions Click Callback
 * @function grantPerms
 * @param {MouseEvent} event
 * @param {Boolean} [close]
 */
export async function grantPerms(event, close = false) {
    console.debug('grantPerms:', event)
    // noinspection ES6MissingAwait
    requestPerms()
    if (close) {
        window.close()
    }
}

/**
 * Request Host Permissions
 * @function requestPerms
 * @return {Promise<Boolean>}
 */
export async function requestPerms() {
    return await chrome.permissions.request({
        origins: ['*://*/*'],
    })
}

/**
 * Check Host Permissions
 * @function checkPerms
 * @return {Promise<Boolean>}
 */
export async function checkPerms() {
    const hasPerms = await chrome.permissions.contains({
        origins: ['*://*/*'],
    })
    console.debug('checkPerms:', hasPerms)
    // Firefox still uses DOM Based Background Scripts
    if (typeof document === 'undefined') {
        return hasPerms
    }
    const hasPermsEl = document.querySelectorAll('.has-perms')
    const grantPermsEl = document.querySelectorAll('.grant-perms')
    if (hasPerms) {
        hasPermsEl.forEach((el) => el.classList.remove('d-none'))
        grantPermsEl.forEach((el) => el.classList.add('d-none'))
    } else {
        grantPermsEl.forEach((el) => el.classList.remove('d-none'))
        hasPermsEl.forEach((el) => el.classList.add('d-none'))
    }
    return hasPerms
}

/**
 * Revoke Permissions Click Callback
 * NOTE: Chrome does not allow revoking required permissions with this method
 * @function revokePerms
 * @param {Event} event
 */
export async function revokePerms(event) {
    console.debug('revokePerms:', event)
    const permissions = await chrome.permissions.getAll()
    console.debug('permissions:', permissions)
    try {
        await chrome.permissions.remove({
            origins: permissions.origins,
        })
        await checkPerms()
    } catch (e) {
        console.log(e)
        showToast(e.message, 'danger')
    }
}

/**
 * Permissions On Added Callback
 * @param permissions
 */
export async function onAdded(permissions) {
    console.debug('onAdded', permissions)
    await checkPerms()
}

/**
 * Permissions On Added Callback
 * @param permissions
 */
export async function onRemoved(permissions) {
    console.debug('onRemoved', permissions)
    await checkPerms()
}
