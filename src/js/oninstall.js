// JS for oninstall.html

import {
    checkPerms,
    grantPerms,
    linkClick,
    onAdded,
    onRemoved,
    openPopupPanel,
    revokePerms,
} from './exports.js'

chrome.permissions.onAdded.addListener(onAdded)
chrome.permissions.onRemoved.addListener(onRemoved)

document.addEventListener('DOMContentLoaded', domContentLoaded)
document
    .querySelectorAll('a[href]')
    .forEach((el) => el.addEventListener('click', linkClick))
document
    .querySelectorAll('.open-popup')
    .forEach((el) => el.addEventListener('click', openPopupPanel))
document
    .querySelectorAll('.revoke-permissions')
    .forEach((el) => el.addEventListener('click', revokePerms))
document
    .querySelectorAll('.grant-permissions')
    .forEach((el) => el.addEventListener('click', grantPerms))

/**
 * DOMContentLoaded
 * @function domContentLoaded
 */
async function domContentLoaded() {
    console.debug('domContentLoaded')

    // noinspection ES6MissingAwait
    checkPerms()
}
