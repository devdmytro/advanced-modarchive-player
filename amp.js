// ==UserScript==
// @name         Advanced modarchive player
// @namespace    http://tampermonkey.net/
// @version      1.0.2
// @description  Get more convenience from using the modarchive player
// @author       devdmytro
// @match        https://modarchive.org/index.php?request=view_player*
// @icon         https://www.google.com/s2/favicons?domain=modarchive.org
// @updateURL    https://devdmytro.github.io/advanced-modarchive-player/amp.meta.js
// @downloadURL  https://devdmytro.github.io/advanced-modarchive-player/amp.user.js
// @grant        none
// ==/UserScript==
(function() {
    //Init fecha
    !function(e){"use strict";function n(e){return function(n,t){var a=d.i18n[e].indexOf(t.charAt(0).toUpperCase()+t.substr(1).toLowerCase());~a&&(n.month=a)}}function t(e,n){for(e=String(e),n=n||2;e.length<n;)e="0"+e;return e}function a(e,n,t){for(var a=0,r=e.length;a<r;a++)n.push(e[a].substr(0,t))}function r(e){return e+["th","st","nd","rd"][e%10>3?0:(e-e%10!=10)*e%10]}var d={},o=/d{1,4}|M{1,4}|YY(?:YY)?|S{1,3}|Do|ZZ|([HhMsDm])\1?|[aA]|"[^"]*"|'[^']*'/g,u=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],i=["January","February","March","April","May","June","July","August","September","October","November","December"],s=["am","pm"],m=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,f=function(){},h=[],c=[],M={D:[/\d\d?/,function(e,n){e.day=n}],M:[/\d\d?/,function(e,n){e.month=n-1}],YY:[/\d\d?/,function(e,n){var t=new Date,a=+(""+t.getFullYear()).substr(0,2);e.year=""+(n>68?a-1:a)+n}],h:[/\d\d?/,function(e,n){e.hour=n}],m:[/\d\d?/,function(e,n){e.minute=n}],s:[/\d\d?/,function(e,n){e.second=n}],YYYY:[/\d{4}/,function(e,n){e.year=n}],S:[/\d/,function(e,n){e.millisecond=100*n}],SS:[/\d{2}/,function(e,n){e.millisecond=10*n}],SSS:[/\d{3}/,function(e,n){e.millisecond=n}],d:[/\d\d?/,f],ddd:[m,f],MMM:[m,n("monthNamesShort")],MMMM:[m,n("monthNames")],a:[m,function(e,n){s.indexOf(n.toLowerCase())&&(e.isPm=!0)}],ZZ:[/[\+\-]\d\d:?\d\d/,function(e,n){var t,a=(n+"").match(/([\+\-]|\d\d)/gi);a&&(t=60*a[1]+parseInt(a[2],10),e.timezoneOffset="+"===a[0]?t:-t)}]};M.dd=M.d,M.dddd=M.ddd,M.Do=M.DD=M.D,M.mm=M.m,M.hh=M.H=M.HH=M.h,M.MM=M.M,M.ss=M.s,M.A=M.a,a(i,c,3),a(u,h,3),d.i18n={dayNamesShort:h,dayNames:u,monthNamesShort:c,monthNames:i,amPm:s,DoFn:r},d.masks={default:"ddd MMM DD YYYY HH:mm:ss",shortDate:"M/D/YY",mediumDate:"MMM D, YYYY",longDate:"MMMM D, YYYY",fullDate:"dddd, MMMM D, YYYY",shortTime:"HH:mm",mediumTime:"HH:mm:ss",longTime:"HH:mm:ss.SSS"},d.format=function(e,n){if("string"==typeof e?e=d.parse(e):e||(e=new Date),isNaN(e))throw new SyntaxError("invalid date");n=d.masks[n]||n||d.masks.default;var a=e.getDate(),r=e.getDay(),u=e.getMonth(),i=e.getFullYear(),s=e.getHours(),m=e.getMinutes(),f=e.getSeconds(),h=e.getMilliseconds(),c=e.getTimezoneOffset(),M={D:a,DD:t(a),Do:d.i18n.DoFn(a),d:r,dd:t(r),ddd:d.i18n.dayNamesShort[r],dddd:d.i18n.dayNames[r],M:u+1,MM:t(u+1),MMM:d.i18n.monthNamesShort[u],MMMM:d.i18n.monthNames[u],YY:String(i).slice(2),YYYY:i,h:s%12||12,hh:t(s%12||12),H:s,HH:t(s),m:m,mm:t(m),s:f,ss:t(f),S:Math.round(h/100),SS:t(Math.round(h/10),2),SSS:t(h,3),a:s<12?d.i18n.amPm[0]:d.i18n.amPm[1],A:s<12?d.i18n.amPm[0].toUpperCase():d.i18n.amPm[1].toUpperCase(),ZZ:(c>0?"-":"+")+t(100*Math.floor(Math.abs(c)/60)+Math.abs(c)%60,4)};return n.replace(o,function(e){return e in M?M[e]:e.slice(1,e.length-1)})},d.parse=function(e,n){if(!n)return new Date(e.replace(/\-/g,"/"));n=d.masks[n]||n;var t=!0,a={};if(n.replace(o,function(n){if(M[n]){var r=M[n],d=e.search(r[0]);~d?e.replace(r[0],function(n){return r[1](a,n),e=e.substr(d+n.length),n}):t=!1}return M[n]?"":n.slice(1,n.length-1)}),!t)return!1;var r,u=new Date;return a.isPm&&a.hour&&(a.hour=+a.hour+12),a.timezoneOffset?(a.minute=+(a.minute||0)-+a.timezoneOffset,r=new Date(Date.UTC(a.year||u.getFullYear(),a.month||0,a.day||1,a.hour||0,a.minute||0,a.second||0,a.millisecond||0))):r=new Date(a.year||u.getFullYear(),a.month||0,a.day||1,a.hour||0,a.minute||0,a.second||0,a.millisecond||0),r},"undefined"!=typeof module&&module.exports?module.exports=d:"undefined"!=typeof require&&require.amd?define(function(){return d}):e.fecha=d}(this);

    //Init store
    if (!localStorage.getItem('autoplay')) localStorage.setItem('autoplay', false)
    if (!localStorage.getItem('notifications')) localStorage.setItem('notifications', false)
    if (!localStorage.getItem('history')) localStorage.setItem('history', JSON.stringify([]))

    history_pages = 0
    opened = false
    lastTrackTime = 0

    //Functions
    copy = function(text, id) {
        var input = document.createElement('textarea')
        input.innerHTML = text
        document.body.appendChild(input)
        input.select()
        var result = document.execCommand('copy')
        document.body.removeChild(input)
        document.getElementById(id).innerHTML = 'Copied!'
        window.setTimeout(() => {
            id.startsWith('cp') ? document.getElementById(id).innerHTML = 'copy' : null
        }, 2000)
        return result
    }

    load_trackers = function() {
        let trackers = ''
        for (let i = 0; i < 20; i++) {
            if (i + 20 * history_pages >= store.length)  {
                history_pages++
                list.innerHTML += trackers
                return
            }
            const track = store[i + 20 * history_pages]
            //Split by days
            if (lastTrackTime && fecha.format(new Date(lastTrackTime), 'DDMMYY') != fecha.format(new Date(track.time), 'DDMMYY'))
                trackers += `<div class="tracker date">${fecha.format(new Date(track.time), 'DD MMMM YYYY')}</div>`
            lastTrackTime = track.time
            //Put tracker to history list
            trackers += temp.replaceAll('NAME', track.trackName).replaceAll('TRACKER_ID', track.id).replaceAll('FILE_NAME', track.modName).replaceAll('TIME', fecha.format(new Date(track.time), 'hh:mm a')).trim()
        }
        list.innerHTML += trackers
        history_pages++
    }

    toggle = function() {
        if (!opened) {
            if (history_pages === 0) load_trackers()
            document.getElementsByClassName('history-window')[0].classList.remove("hide")
            document.getElementsByClassName('toggle')[0].classList.add("open")
            opened = !opened
        } else {
            document.getElementsByClassName('history-window')[0].classList.add("hide")
            document.getElementsByClassName('toggle')[0].classList.remove("open")
            opened = !opened
        }

    }

    // Get tracker info
    var trackId = parseInt(document.getElementsByClassName('intro-text')[0].innerHTML.split('ID: ')[1])
    var trackName = document.getElementsByTagName('h1')[0].innerHTML.split('Playing ')[1].split(' / ')[0]
    var modName = document.getElementById('modfilename').innerHTML

    // Set title
    document.title = `${trackId} | ${trackName}`

    // Add track to history
    store = localStorage.getItem('history')
    if (store) store = JSON.parse(store)
    else store = []
    var tracker = {
        id: trackId,
        trackName: trackName,
        modName: modName,
        time: Date.now()
    }
    if (store.length == 0 || store[0].id !== tracker.id) {
        store.unshift(tracker)
        localStorage.setItem('history', JSON.stringify(store))
    }

    // Notifications
    // Show notifications
    if (Notification.permission === "granted" && !!JSON.parse(localStorage.getItem('notifications') || '')) {
        var notification = new Notification(`Now playing - ${trackName}`, {
            body: `${modName}\nid: ${trackId}`
        })
    } else if (Notification.permission !== "denied" && !!JSON.parse(localStorage.getItem('notifications') || '')) {
        Notification.requestPermission().then(function(permission) {
            if (permission === "granted") {
                var notification = new Notification(`Now playing - ${trackName}`, {
                    body: `${modName}\nid: ${trackId}`
                })
            }
        })
    }

    // Add notifications control button
    document.getElementsByClassName('player')[0].children[2].innerHTML = `<input id="notify" type="checkbox" onclick="(localStorage.setItem('notifications', JSON.stringify(!JSON.parse(localStorage.getItem('notifications') || ''))))"> <label for="notify">Show tracker info notification on start</label>`
    if (JSON.parse(localStorage.getItem('notifications') || '')) document.getElementById('notify').checked = true

    // Modify autoplay behaviour
    var ap = document.getElementById('autoplay')
    ap.setAttribute('onclick', ap.getAttribute('onclick') + `;localStorage.setItem('autoplay', JSON.stringify(!JSON.parse(localStorage.getItem('autoplay') || '')));`)
    if (JSON.parse(localStorage.getItem('autoplay'))) document.getElementById('autoplay').checked = true
    else document.getElementById('autoplay').checked = false

    // Add copy button
    var elem = document.getElementsByTagName('table')[0].children[0].children[0].children[0].children[0]
    elem.innerHTML += `<br><a href="#" onclick="copy(https://modarchive.org/index.php?request=view_player&query=${trackId},'playerLink')"><span><img src="style/images/icons/page_go.png" alt="dl" border="0" class="inline"></span>&nbsp;<span id="playerLink" href="#" onclick="copy('https://modarchive.org/index.php?request=view_player&query=${trackId}','playerLink')" class="copy-link">Copy player link</a></span><br>`

    // History list
    document.getElementsByClassName('player')[0].appendChild(document.createElement('div')).setAttribute('class', 'history-window')
    document.getElementsByClassName('history-window')[0].classList.add("hide")
    document.getElementsByClassName('history-window')[0].appendChild(document.createElement('style')).innerHTML = `
    html {
        height: 100%;
        overflow-x: hidden;
    }
    body {
        height: 100%;
    }
    .player {
        position: relative;
    }
    .history-window {
        position: absolute;
        top: 0;
        right: 0;
        width: 260px;
        height: 100%;
        background: #bebebe;
        border-left: 1px solid black;
    }
    .history-container {
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
        height:calc(100% - 8px);
        padding: 4px;
    }
    .tracker {
        height: 34px;
    }
    .tracker:nth-child(2n) {
        background: #a5a5a5;
    }
    .up, .down {
        width: 100%;
        display: inline-block;
    }
    .name, .tracker_id {
        float: left;
    }
    .time, .links-container {
        float: right;
    }
    .links {
        margin-left: 4px;
    }
    .name {
        overflow-x: hidden;
        white-space: nowrap;
        width: 175px;
        display: block;
        font-weight: 600;
    }
    .hide {
        display: none;
    }
    .toggle {
        box-sizing: border-box;
        width: 36px;
        height: 36px;
        position: absolute;
        top: 32px;
        right: -3px;
        padding: 1px 7px;
        background: #bebebe;
        border: 1px solid black;
        border-right-color: #bebebe;
        font-size: 22px;
        cursor: pointer;
    }
    .toggle.open {
        right: 268px;
    }
    .tracker.date {
        font-weight: 600;
        text-align: center;
        height: 16px;
    }
    `
    document.getElementsByClassName('history-window')[0].appendChild(document.createElement('div')).setAttribute('class', 'history-container')
    var list = document.getElementsByClassName('history-container')[0]
    var temp = '<div class="tracker"><div class="up"><span class="name">NAME</span><span class="time">TIME</span></div><div class="down"><span class="tracker_id">id: TRACKER_ID</span><span class="links-container"><a class="links" target="_blank" href="https://modarchive.org/index.php?request=view_player&query=TRACKER_ID">open</a><a class="links" id="cpTRACKER_ID" href="#" onclick=copy("https://modarchive.org/index.php?request=view_player&query=TRACKER_ID","cpTRACKER_ID")>copy</a><a class="links" target="_blank" href="https://api.modarchive.org/downloads.php?moduleid=TRACKER_ID#FILE_NAME">download</a></span></div></div>'

    document.body.appendChild(document.createElement('div')).setAttribute('class', 'toggle')
    document.getElementsByClassName('toggle')[0].setAttribute('onclick', 'toggle()')
    document.getElementsByClassName('toggle')[0].innerHTML = '☰'
    list.addEventListener('scroll', function() {
        if (list.scrollTop + list.clientHeight + 100 >= list.scrollHeight && history_pages * 20 < store.length)
            load_trackers()
    })
    if (window.outerWidth == 550 && window.outerHeight == 450)
        window.resizeTo(window.outerWidth, window.outerHeight + 72)
})()
