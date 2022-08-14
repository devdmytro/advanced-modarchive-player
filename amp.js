    // ==UserScript==
    // @name         Advanced modarchive player
    // @namespace    http://tampermonkey.net/
    // @version      1.1.1
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

            //Fixes
            function btoaF(str) {
                return window.btoa(unescape(encodeURIComponent(str)));
            }
            function atobF(str) {
                return decodeURIComponent(escape(window.atob(str)));
            }

            var isReload = false
            //Rewrite openmptNode
            ChiptuneJsPlayer.prototype.createLibopenmptNode = function(buffer, config) {
                // TODO error checking in this whole function

                var maxFramesPerChunk = 4096;
                var processNode = this.context.createScriptProcessor(2048, 0, 2);
                processNode.config = config;
                processNode.player = this;
                var byteArray = new Int8Array(buffer);
                var ptrToFile = libopenmpt._malloc(byteArray.byteLength);
                libopenmpt.HEAPU8.set(byteArray, ptrToFile);
                processNode.modulePtr = libopenmpt._openmpt_module_create_from_memory(ptrToFile, byteArray.byteLength, 0, 0, 0);

                var stack = stackSave();
                libopenmpt._openmpt_module_ctl_set(processNode.modulePtr, asciiToStack('render.resampler.emulate_amiga'), asciiToStack('1'));
                libopenmpt._openmpt_module_ctl_set(processNode.modulePtr, asciiToStack('render.resampler.emulate_amiga_type'), asciiToStack('a1200'));
                stackRestore(stack);

                processNode.paused = false;
                processNode.leftBufferPtr  = libopenmpt._malloc(4 * maxFramesPerChunk);
                processNode.rightBufferPtr = libopenmpt._malloc(4 * maxFramesPerChunk);
                processNode.cleanup = function() {
                if (this.modulePtr != 0) {
                    libopenmpt._openmpt_module_destroy(this.modulePtr);
                    this.modulePtr = 0;
                }
                if (this.leftBufferPtr != 0) {
                    libopenmpt._free(this.leftBufferPtr);
                    this.leftBufferPtr = 0;
                }
                if (this.rightBufferPtr != 0) {
                    libopenmpt._free(this.rightBufferPtr);
                    this.rightBufferPtr = 0;
                }
                }
                processNode.stop = function() {
                this.disconnect();
                this.cleanup();
                }
                processNode.pause = function() {
                this.paused = true;
                }
                processNode.unpause = function() {
                this.paused = false;
                }
                processNode.togglePause = function() {
                this.paused = !this.paused;
                }
                processNode.onaudioprocess = function(e) {
                var outputL = e.outputBuffer.getChannelData(0);
                var outputR = e.outputBuffer.getChannelData(1);
                var framesToRender = outputL.length;
                if (this.ModulePtr == 0) {
                    for (var i = 0; i < framesToRender; ++i) {
                    outputL[i] = 0;
                    outputR[i] = 0;
                    }
                    this.disconnect();
                    this.cleanup();
                    return;
                }
                if (this.paused) {
                    for (var i = 0; i < framesToRender; ++i) {
                    outputL[i] = 0;
                    outputR[i] = 0;
                    }
                    return;
                }
                var framesRendered = 0;
                var ended = false;
                var error = false;
                while (framesToRender > 0) {
                    var framesPerChunk = Math.min(framesToRender, maxFramesPerChunk);
                    var actualFramesPerChunk = libopenmpt._openmpt_module_read_float_stereo(this.modulePtr, this.context.sampleRate, framesPerChunk, this.leftBufferPtr, this.rightBufferPtr);
                    if (actualFramesPerChunk == 0) {
                    ended = true;
                    if(document.getElementById('autoplay').checked && !isReload) {
                        isReload = true;
                        if (playlist) {
                            let pst = plStore[plStore.findIndex(p => p.id == playlist.id)];
                            let trkI = pst.tracks.findIndex(t=> t.id == TRACK.id);
                            if (!(trkI + 1)) return openP(playlist.tids[playlist.tids.indexOf(TRACK.id)].id, playlist.id);
                            if ((trkI + 1 >= pst.tracks.length)) {
                                isReload = false;
                                return player.seek(0);
                            }
                            return openP(pst.tracks[trkI + 1].id, playlist.id);
                        }
                        else if ((new URL(window.location.href)).searchParams.get('favorites') !== null) return window.location.href = `index.php?request=view_player&query=${favorites[favorites.findIndex(f => f.id == trackId) + 1].id}&favorites`;
                        else return window.location.href = 'index.php?request=view_player&query=random';
                    }
                    // modulePtr will be 0 on openmpt: error: openmpt_module_read_float_stereo: ERROR: module * not valid or other openmpt error
                    error = !this.modulePtr;
                    }
                    var rawAudioLeft = libopenmpt.HEAPF32.subarray(this.leftBufferPtr / 4, this.leftBufferPtr / 4 + actualFramesPerChunk);
                    var rawAudioRight = libopenmpt.HEAPF32.subarray(this.rightBufferPtr / 4, this.rightBufferPtr / 4 + actualFramesPerChunk);
                    for (var i = 0; i < actualFramesPerChunk; ++i) {
                    outputL[framesRendered + i] = rawAudioLeft[i];
                    outputR[framesRendered + i] = rawAudioRight[i];
                    }
                    for (var i = actualFramesPerChunk; i < framesPerChunk; ++i) {
                    outputL[framesRendered + i] = 0;
                    outputR[framesRendered + i] = 0;
                    }
                    framesToRender -= framesPerChunk;
                    framesRendered += framesPerChunk;
                }
                if (ended) {
                    this.disconnect();
                    this.cleanup();
                    error ? processNode.player.fireEvent('onError', {type: 'openmpt'}) : processNode.player.fireEvent('onEnded');
                }
                }
                return processNode;
            }

            // User id
            if (document.cookie.includes('TMA2009ident') && !localStorage.getItem('uid')) {
                let t = new XMLHttpRequest()
                    t.open('GET', `/index.php?faq-switches`)
                    t.send()
                    t.onload = function() {
                        let doc = new DOMParser().parseFromString(t.response, "text/html")
                        const uid = doc.getElementsByTagName('ul')[1]?.children[1]?.children[0]?.href?.split('php?')[1]
                        if (parseInt(uid) > 0) localStorage.setItem('uid', uid)
                    }
            
            }

            if (!document.cookie.includes('TMA2009ident') && localStorage.getItem('uid')) {
                localStorage.removeItem('uid')
                localStorage.removeItem('favorites')

            }
            
            //Init store
            if (!localStorage.getItem('pin')) localStorage.setItem('pin', false)
            if (!localStorage.getItem('autoplay')) localStorage.setItem('autoplay', false)
            if (!localStorage.getItem('notifications')) localStorage.setItem('notifications', false)
            if (!localStorage.getItem('history')) localStorage.setItem('history', JSON.stringify([]))
            if (!localStorage.getItem('playlists')) localStorage.setItem('playlists', JSON.stringify([]))
            if (!localStorage.getItem('favorites')) localStorage.setItem('favorites', JSON.stringify([]))

            var favorites_loaded = false
            var favorites = JSON.parse(localStorage.getItem('favorites'))
            var favorites_pages = 0

            var store = JSON.parse(localStorage.getItem('history'))
            var history_pages = 0

            plist_loaded = false
            plist_id = 0

            plStore = JSON.parse(localStorage.getItem('playlists'))
            var playlists_pages = 0
            
            var opened = false
            var lastTrackTime = 0
            var tab = 0
            var temp = '<div id="DOM_ID" class="tracker"><div class="up"><span class="name">NAME</span><span class="time">TIME</span></div><div class="down"><span class="tracker_id">id: TRACKER_ID</span><span class="links-container"><a class="links" href="#" onclick=openP(ocOPEN_DATA)>play</a><a class="links" id="cpTRACKER_ID" href="#" onclick=openP(ocOPEN_DATA,this.id)>copy</a><a class="links" target="_blank" href="https://api.modarchive.org/downloads.php?moduleid=TRACKER_ID#FILE_NAME">download</a><a href="#" class="links" onclick="OPENOCLIST">OPENPLIST</a></span></div></div>'

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
                    id.startsWith('cp') ? document.getElementById(id).innerHTML = 'copy' : id == 'playerLink' ? document.getElementById(id).innerHTML = 'Copy player link' : document.getElementById(id).innerHTML = 'Copy discord embed link'
                }, 2000)
                return result
            }

            openP = function(trId, plId, copyId) {
                if (!plId) {
                    if (!copyId)
                        window.location.href = `index.php?request=view_player&query=${trId}`
                    else copy(`https://modarchive.org/index.php?request=view_player&query=${trId}`, copyId)
                }
                else if (plId !== 'favorites') {
                    var pl = plStore[plStore.findIndex(p => p.id == plId)]
                    let tids = []
                    pl.tracks.forEach(t => { tids.push(t.id) })
                    let btoaPl = btoaF(JSON.stringify({
                        id: pl.id,
                        name: pl.name,
                        tids
                    }))
                    if (!copyId)
                        window.location.href = `index.php?request=view_player&query=${trId}&playlist=${btoaPl}`
                    else copy(`https://modarchive.org/index.php?request=view_player&query=${trId}&playlist=${btoaPl}`, copyId)
                } else {
                    if (!copyId)
                        window.location.href = `index.php?request=view_player&query=${trId}&favorites`
                    else copy(`https://modarchive.org/index.php?request=view_player&query=${trId}`, copyId)
                }
            }

            load_trackers = function() {
                let trackers = ''
                for (let i = 0; i < 20; i++) {
                    if (i + 20 * history_pages >= store.length)  {
                        history_pages++
                        document.getElementById('history').innerHTML += trackers
                        return
                    }
                    const track = store[i + 20 * history_pages]
                    //Split by days
                    if (lastTrackTime && fecha.format(new Date(lastTrackTime), 'DDMMYY') != fecha.format(new Date(track.time), 'DDMMYY'))
                        trackers += `<div class="tracker date">${fecha.format(new Date(track.time), 'DD MMMM YYYY')}</div>`
                    lastTrackTime = track.time
                    //Put tracker to history list
                    trackers += temp.replace('DOM_ID', `history_${track.id}`).replace('TRACKER_ID', track.id).replace('cpTRACKER_ID', `cph${track.id}`).replaceAll('NAME', track.trackName).replaceAll('ocOPEN_DATA', track.id).replaceAll('FILE_NAME', track.modName).replaceAll('TIME', fecha.format(new Date(track.time), 'hh:mm a')).replaceAll('OPENPLIST', '').trim()
                }
                document.getElementById('history').innerHTML += trackers
                history_pages++
            }

            load_playlist = function() {
                var plist = !plist_id ? parsedPlaylist : plStore[plStore.findIndex(p => p.id == plist_id)]
                !plist_id ? plist_id = parsedPlaylist.id : null
                document.getElementById('playlist').innerHTML = ''
                let trackers = `<div class="tracker date">${plist.name}</div>`
                for (let track of plist.tracks) {
                    //Put tracker to history list
                    trackers += temp.replace('DOM_ID', `track_${track.id}`).replace('cpTRACKER_ID', `cppt${track.id}`).replaceAll('NAME', track.id === trackId ? '▶ ' + track.trackName : track.trackName).replaceAll('ocOPEN_DATA', `${track.id},${plist.id}`).replaceAll('TRACKER_ID', track.id).replaceAll('FILE_NAME', track.modName).replaceAll('TIME', `<a href="#" onclick="remove(${plist.id},${track.id});">X</a>`).replaceAll('"name"', '"name long"').replaceAll('OPENPLIST', '').trim()
                }
                document.getElementById('playlist').innerHTML += trackers
                plist_loaded = true
            }

            load_playlists = function() {
                let playlists = ''
                if (localStorage.getItem('uid') && favorites.length)
                playlists = temp.replaceAll('NAME', "Your favourites").replace('cpTRACKER_ID', `cpyfv`).replaceAll(': TRACKER_ID', ': ' + 'favourites').replaceAll('ocOPEN_DATA', `${favorites[0]?.id || 1},"favorites"`).replaceAll('download', '').replaceAll('"name"', '"name long"').replaceAll('TIME', '').replaceAll('OPENPLIST', '').trim()

                plStore = JSON.parse(localStorage.getItem('playlists'))
                for (const pl of plStore) {
                    let tids = []
                    pl.tracks.forEach(t => { tids.push(t.id) })
                    let btoaPl = btoaF(JSON.stringify({
                        id: pl.id,
                        name: pl.name,
                        tids
                    }))
                    playlists += temp.replace('DOM_ID', `playlist_${pl.id}`).replace('cpTRACKER_ID', `cpp${pl.id}`).replaceAll('NAME', pl.id == playlist?.id ? '▶' + pl.name : pl.name).replaceAll(': TRACKER_ID', ': ' + pl.id).replaceAll('ocOPEN_DATA', `${pl.tracks[0]?.id || 1},${pl.id}`).replaceAll('download', '').replaceAll('"name"', '"name long"').replaceAll('TIME', `<a href="#" onclick="remove(${pl.id});">X</a>`).replaceAll('OPENPLIST', 'open').replaceAll('OPENOCLIST', `(function(){ plist_loaded = false; plist_id = ${pl.id}; ctab(1); })()`).trim()
                }
                document.getElementById('playlists').innerHTML = playlists
            }

            load_favorites = function() {
                if (!favorites_loaded && localStorage.getItem('uid')) {
                    const favs = []
                    let t = new XMLHttpRequest()
                    t.open('GET', `/index.php?request=view_member_favourites_text&query=${localStorage.getItem('uid')}`)
                    t.send()
                    t.onload = function() {
                        let doc = new DOMParser().parseFromString(t.response, "text/html")
                        const content = doc.getElementsByTagName('textarea')[0].value.replaceAll(/(https:\/\/api\.modarchive\.org\/downloads\.php\?moduleid=)([0-9]*)(#?)(.*)/g, '$2 $4').split('\n')
                        if (content) {
                            content.forEach(l => { l.split(' ')[0] ? favs.push({ id: l.split(' ')[0], modName: l.split(' ')[1], trackName: l.split(' ')[1] }) : null })
                            localStorage.setItem('favorites', JSON.stringify(favs))
                            favorites = favs

                            favorites_loaded = true
                            if (favorites.findIndex(f => f.id == TRACK.id) + 1) {
                                document.getElementsByTagName('td')[1].children[0].children[4].innerHTML = 'Delete from my Favourites'
                                document.getElementsByTagName('td')[1].children[0].children[3].children[0].src = 'style/images/icons/delete.png'
                            } else {
                                document.getElementsByTagName('td')[1].children[0].children[4].innerHTML = 'Add to My Favourites'
                                document.getElementsByTagName('td')[1].children[0].children[3].children[0].src = 'style/images/icons/heart_add.png'
                            }
                            if ((new URL(window.location.href)).searchParams.get('favorites') !== null) ctab(3)
                            return load_favorites()
                        }
                    }
                }
                if (favorites_loaded) {
                    let trackers = ''
                    for (let i = 0; i < 20; i++) {
                        if (i + 20 * favorites_pages >= favorites.length)  {
                            favorites_pages++
                            document.getElementById('favorites').innerHTML += trackers
                            return
                        }
                        const track = favorites[i + 20 * favorites_pages]
                        //Put tracker to history list

                        //Check cache
                        var chached = store.find(t => t.id == track.id)
                        if (chached) track.trackName = chached.trackName
                        if (trackId == track.id) track.trackName = '▶' + track.trackName
                        trackers += temp.replace('DOM_ID', `favorite_${track.id}`).replace('cpTRACKER_ID', `cpf${track.id}`).replaceAll('NAME', track.trackName).replaceAll('TRACKER_ID', track.id).replaceAll('ocOPEN_DATA', `${track.id},${(new URL(window.location.href)).searchParams.get('favorites') !== null ? '"favorites"' : false }`).replaceAll('FILE_NAME', track.modName).replaceAll('TIME', '').replaceAll('"name"', '"name long"').replaceAll('OPENPLIST', '').trim()
                    }
                    document.getElementById('favorites').innerHTML += trackers
                    favorites_pages++
                }
            }
            togglefav = function () {
                if (favorites.findIndex(f => f.id == trackId) + 1) {
                    let t = new XMLHttpRequest()
                    t.open('GET', `/interactive.php?request=remove_favourite&query=${trackId}`)
                    t.send()
                    t.onload = function() {
                        let doc = new DOMParser().parseFromString(t.response, "text/html")
                        if (doc.getElementsByTagName('h1')[0].innerHTML === 'Favourite Removed') {
                            document.getElementsByTagName('td')[1].children[0].children[4].innerHTML = 'Add to My Favourites'
                            document.getElementsByTagName('td')[1].children[0].children[3].children[0].src = 'style/images/icons/heart_add.png'
                            favorites.splice(favorites.findIndex(f => f.id == trackId), 1)
                            localStorage.setItem('favorites', JSON.stringify(favorites))
                            document.getElementById(`favorite_${trackId}`).remove()
                        }
                    } 
                } else {
                    let t = new XMLHttpRequest()
                    t.open('GET', `/interactive.php?request=add_favourite&query=${trackId}`)
                    t.send()
                    t.onload = function() {
                        let doc = new DOMParser().parseFromString(t.response, "text/html")
                        if (doc.getElementsByTagName('h1')[0].innerHTML === 'Favourite Added!') {
                            document.getElementsByTagName('td')[1].children[0].children[4].innerHTML = 'Delete from my Favourites'
                            document.getElementsByTagName('td')[1].children[0].children[3].children[0].src = 'style/images/icons/delete.png'
                            favorites.unshift({id: TRACK.id, modName: TRACK.mod, trackName: TRACK.mod})
                            document.getElementById('favorites').innerHTML = temp.replace('DOM_ID', `favorite_${TRACK.id}`).replace('cpTRACKER_ID', `cpf${TRACK.id}`).replaceAll('NAME', TRACK.name).replaceAll('TRACKER_ID', TRACK.id).replaceAll('ocOPEN_DATA', `${TRACK.id},${(new URL(window.location.href)).searchParams.get('favorites') !== null ? '"favorites"' : false }`).replaceAll('FILE_NAME', TRACK.mod).replaceAll('TIME', '').replaceAll('"name"', '"name long"').replaceAll('OPENPLIST', '').trim() + document.getElementById('favorites').innerHTML
                            localStorage.setItem('favorites', JSON.stringify(favorites))
                        }
                    }
                }
            }

            ctab = function(n) {
                if (n == 0) {
                    if (history_pages == 0) load_trackers()
                    document.getElementById('playlist').classList.add('hide')
                    document.getElementById('playlists').classList.add('hide')
                    document.getElementById('history').classList.remove('hide')
                    document.getElementById('favorites').classList.add('hide')
                    document.getElementsByClassName('tab')[3].classList.remove('active')
                    document.getElementsByClassName('tab')[2].classList.remove('active')
                    document.getElementsByClassName('tab')[1].classList.remove('active')
                    document.getElementsByClassName('tab')[0].classList.add('active')
                    tab = 0
                    
                } else if (n == 1) {
                    if (!plist_loaded) load_playlist()
                    document.getElementsByClassName('tab')[1].classList.remove('hide')
                    document.getElementById('history').classList.add('hide')
                    document.getElementById('playlists').classList.add('hide')
                    document.getElementById('playlist').classList.remove('hide')
                    document.getElementById('favorites').classList.add('hide')
                    document.getElementsByClassName('tab')[2].classList.remove('active')
                    document.getElementsByClassName('tab')[0].classList.remove('active')
                    document.getElementsByClassName('tab')[1].classList.add('active')
                    document.getElementsByClassName('tab')[3].classList.remove('active')

                    tab = 1
                } else if (n == 2) {
                    if (playlists_pages == 0) load_playlists()
                    document.getElementById('history').classList.add('hide')
                    document.getElementById('playlist').classList.add('hide')
                    document.getElementById('playlists').classList.remove('hide')
                    document.getElementById('favorites').classList.add('hide')
                    document.getElementsByClassName('tab')[0].classList.remove('active')
                    document.getElementsByClassName('tab')[1].classList.remove('active')
                    document.getElementsByClassName('tab')[2].classList.add('active')
                    document.getElementsByClassName('tab')[3].classList.remove('active')
                    tab = 2
                } else if (n == 3) {
                    if (favorites_pages == 0) load_favorites()
                    document.getElementById('history').classList.add('hide')
                    document.getElementById('playlist').classList.add('hide')
                    document.getElementById('playlists').classList.add('hide')
                    document.getElementById('favorites').classList.remove('hide')
                    document.getElementsByClassName('tab')[0].classList.remove('active')
                    document.getElementsByClassName('tab')[1].classList.remove('active')
                    document.getElementsByClassName('tab')[2].classList.remove('active')
                    document.getElementsByClassName('tab')[3].classList.add('active')
                    tab = 3
                }
            }

            toggle = function() {
                    if (tab == 0 && history_pages === 0) {
                        ctab(0)
                        load_trackers()
                    }
                    document.getElementsByClassName('history-window')[0].classList.toggle("hide")
                    document.getElementsByClassName('toggle')[0].classList.toggle("open")
                    opened = !opened


            }

            pinToggle = function(pin) {
                pin.classList.toggle('pinned')
            }

            addToPlaylist = function() {
                const pl = document.getElementById('addtoplaylist').value
                if (pl == -1) return
                else if (pl == 0) {
                    pauseButton()
                    const pl_name = prompt('Enter playlist name')
                    pauseButton()
                    if (pl_name) {
                        const new_playlist = {
                            id: Date.now(),
                            name: pl_name,
                            tracks: [{
                                id: TRACK.id,
                                trackName: TRACK.name,
                                modName: TRACK.mod
                            }]
                        }
                        const pls = JSON.parse(localStorage.getItem('playlists'))
                        pls.push(new_playlist)
                        localStorage.setItem('playlists', JSON.stringify(pls))
                            document.getElementById('playlists').innerHTML += temp.replace('DOM_ID', `playlist_${pl.id}`).replace('cpTRACKER_ID', `cpp${new_playlist.id}`).replaceAll('NAME', new_playlist.name).replaceAll(': TRACKER_ID', ': ' + new_playlist.id).replaceAll('ocOPEN_DATA', `${new_playlist.tracks[0]?.id || 1},${new_playlist.id}`).replaceAll('download', '').replaceAll('"name"', '"name long"').replaceAll('TIME', `<a href="#" onclick="remove(${new_playlist.id});">X</a>`).replaceAll('OPENPLIST', 'open').replaceAll('OPENOCLIST', `(function(){ plist_loaded = false; plist_id = ${new_playlist.id}; ctab(1); })()`).trim()
                            plOptions = ''
                            pls.forEach(p => { plOptions += `<option value="${p.id}">${p.tracks.find(t => t.id == trackId) ? '▶': ''} ${p.name}</option>` })
                            document.getElementById('addtoplaylist').innerHTML = `
                                <option value="-1">Add to Playlist</option>
                                <option value="0">Create new</option>
                                ${plOptions}
                            `
                    }
                } else {
                    const index = plStore.findIndex(p => p.id == pl)
                    if (!(index + 1)) return alert('Playlist not found!')

                    if (plStore[index].tracks.find(t => t.id == TRACK.id)) return alert('Already in playlist!')

                    plStore[index].tracks.push({
                        id: TRACK.id,
                        trackName: TRACK.name,
                        modName: TRACK.mod
                    })
                    localStorage.setItem('playlists', JSON.stringify(plStore))
                    if (plist_id == pl)
                        document.getElementById('playlist').innerHTML += temp.replace('DOM_ID', `track_${TRACK.id}`).replace('cpTRACKER_ID', `cppt${TRACK.id}`).replaceAll('NAME', TRACK.id === trackId && plStore[index].id == parsedPlaylist?.id ? '▶ ' + TRACK.name : TRACK.name).replaceAll('ocOPEN_DATA', `${TRACK.id},${plStore[index].id}`).replaceAll('TRACKER_ID', TRACK.id).replaceAll('FILE_NAME', TRACK.mod).replaceAll('TIME', `<a href="#" onclick="remove(${plStore[index].id},${TRACK.id});">X</a>`).replaceAll('"name"', '"name long"').replaceAll('OPENPLIST', '').trim()
                }
                plStore = JSON.parse(localStorage.getItem('playlists'))
                document.getElementById('addtoplaylist').selectedIndex = 0
                plOptions = ''
                plStore.forEach(p => { plOptions += `<option value="${p.id}">${p.tracks.find(t => t.id == trackId) ? '▶': ''} ${p.name}</option>` })
                document.getElementById('addtoplaylist').innerHTML = `
                    <option value="-1">Add to Playlist</option>
                    <option value="0">Create new</option>
                    ${plOptions}
                `
            }

            remove = function(pl, tr) {
                const index = plStore.findIndex(p => p.id == pl)
                if (!(index + 1)) return
                if (!tr) {
                    plStore.splice(index, 1)
                    localStorage.setItem('playlists', JSON.stringify(plStore))
                    document.getElementById(`playlist_${pl}`).remove()
                    plOptions = ''
                    plStore.forEach(p => { plOptions += `<option value="${p.id}">${p.tracks.find(t => t.id == trackId) ? '▶': ''} ${p.name}</option>` })
                    document.getElementById('addtoplaylist').innerHTML = `
                        <option value="-1">Add to Playlist</option>
                        <option value="0">Create new</option>
                        ${plOptions}
                    `
                } else {
                    const indexT = plStore[index].tracks.findIndex(t => t.id == tr)
                    if (!(indexT + 1)) return

                    plStore[index].tracks.splice(indexT, 1)
                    localStorage.setItem('playlists', JSON.stringify(plStore))
                    if (plist_id == pl)
                        document.getElementById(`track_${tr}`).remove()
                    plOptions = ''
                    plStore.forEach(p => { plOptions += `<option value="${p.id}">${p.tracks.find(t => t.id == trackId) ? '▶': ''} ${p.name}</option>` })
                    document.getElementById('addtoplaylist').innerHTML = `
                        <option value="-1">Add to Playlist</option>
                        <option value="0">Create new</option>
                        ${plOptions}
                    `
                }
            }

            // Get tracker info
            var trackId = parseInt(document.getElementsByClassName('intro-text')[0].innerHTML.split('ID: ')[1])
            var TRACK = {}

            let info = new XMLHttpRequest()
            info.open('GET', `/index.php?request=view_by_moduleid&query=${trackId}`)
            info.send()
            info.onload = function() {
                let doc = new DOMParser().parseFromString(info.response, "text/html")
                var trackName = doc.getElementsByTagName('h1')[0].childNodes[0].data
                var modName = doc.getElementsByTagName('h1')[0].children[0].innerText.replace(/([\(\)])/g, '')
                var downs_count = doc.getElementsByClassName('stats')[2].innerHTML.split(' ')[1]
                var favs_count = doc.getElementsByClassName('stats')[3].innerHTML.split(' ')[1]
                var author = doc.getElementsByClassName('nolist')[4].children[0]?.children[1]?.innerHTML || '???'
                var author_block = doc.getElementsByClassName('nolist')[4].children[0]
                var size = doc.getElementsByClassName('stats')[7].innerHTML.split('Uncompressed Size: ')[1]
                if (author !== '???')
                author_block.children[1].target = '_blank'

                TRACK.id = trackId
                TRACK.name = trackName
                TRACK.mod = modName
                TRACK.author = author

                //Aditional fields
                var range = document.getElementById('seekbar').outerHTML
                document.getElementsByClassName('intro-text')[0].innerHTML =`
                <strong><a href="javascript:pauseButton()" id="play">Play</a></strong>
                <span id="title" style="display: none;"></span>
                <br>${range}
                <div id="subsongs" style="display:none"><select id="subsong" onchange="selectSubsong()"></select></div>
                <br>ID: ${trackId}
                <br>Duration: <span id="duration"></span>
                <br>Size: ${size}
                <br>Author: ${author != '???' ? author_block.outerHTML : '???'}
                <br>Hits: ${downs_count}
                <br>Favourites: ${favs_count}
                `
                // Set title
                document.title = `${author} - ${trackName}`

                // Add track to history
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

                // Show notifications
                if (Notification.permission === "granted" && !!JSON.parse(localStorage.getItem('notifications') || '')) {
                    var notification = new Notification(`Now playing: ${author} - ${trackName}`, {
                        body: `id: ${trackId}\nfile: ${modName}\nauthor: ${author}`
                    })
                } else if (Notification.permission !== "denied" && !!JSON.parse(localStorage.getItem('notifications') || '')) {
                    Notification.requestPermission().then(function(permission) {
                        if (permission === "granted") {
                            var notification = new Notification(`Now playing: ${author} - ${trackName}`, {
                                body: `id: ${trackId}\nfile:${modName}\nauthor: ${author}`
                            })
                        }
                    })
                }
            }

            // Add notifications control button
            document.getElementsByClassName('player')[0].children[2].innerHTML = `<input id="notify" type="checkbox" onclick="(localStorage.setItem('notifications', JSON.stringify(!JSON.parse(localStorage.getItem('notifications') || ''))))"> <label for="notify">Show tracker info notification on start</label>`
            if (JSON.parse(localStorage.getItem('notifications') || '')) document.getElementById('notify').setAttribute("checked","")

            // Modify autoplay behaviour
            var ap = document.getElementById('autoplay')
            ap.setAttribute('onclick', ap.getAttribute('onclick') + `;localStorage.setItem('autoplay', JSON.stringify(!JSON.parse(localStorage.getItem('autoplay') || '')));`)
            if (JSON.parse(localStorage.getItem('autoplay'))) document.getElementById('autoplay').setAttribute("checked","")
            else {
                document.getElementById('autoplay').checked = false
            }

            // Add copy button
            var elem = document.getElementsByTagName('table')[0].children[0].children[0].children[0].children[0]
            elem.innerHTML += `<br><a href="#" onclick="copy(https://modarchive.org/index.php?request=view_player&query=${trackId},'playerLink')"><span><img src="style/images/icons/page_go.png" alt="dl" border="0" class="inline"></span>&nbsp;<span id="playerLink" href="#" onclick="copy('https://modarchive.org/index.php?request=view_player&query=${trackId}','playerLink')" class="copy-link">Copy player link</a></span><br>`
            elem.innerHTML += `<a href="#" onclick="copy(https://modarchive.org/index.php?request=view_player&query=${trackId},'playerLink')"><span><img src="style/images/icons/page_go.png" alt="dl" border="0" class="inline"></span>&nbsp;<span id="dsLink" href="#" onclick="copy('https://itmod.xyz/${trackId}','dsLink')" class="copy-link">Copy discord embed link</a>`

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
                width: 270px;
                height: 100%;
                background: #bebebe;
                border-left: 1px solid black;
            }
            .history-container {
                position: relative;
                overflow-x: hidden;
                overflow-y: auto;
                height:calc(100% - 27px);
            }
            .tracker {
                height: 34px;
                padding: 0 4px;
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
            .name.long {
                width: 230px;
            }
            .hide {
                display: none !important;
            }
            .toggle {
                box-sizing: border-box;
                width: 36px;
                height: 36px;
                position: absolute;
                top: 25px;
                right: -3px;
                padding: 0 6px;
                background: #bebebe;
                border: 1px solid black;
                border-right-color: #bebebe;
                font-size: 22px;
                cursor: pointer;
                line-height: 36px;
            }
            .toggle.open {
                right: 278px;
            }
            .tracker.date {
                font-weight: 600;
                text-align: center;
                height: 16px;
            }
            .tabs {
                border-top: 1px solid black;
                border-bottom: 1px solid black;
                width: 100%;
                height: 24px;
            }
            .tab {
                display: inline-block;
                position: relative;
                border-right: 1px solid black;
                cursor: pointer;
                text-align: center;
                height: 16px;
                padding: 4px;
                background: #a5a5a5;
            }
            .tab.active {
                border-bottom: 1px solid #bebebe;
                background: #bebebe;
                font-weight: 400;
            }
            .tab.pinned {
                background: #bebebe;
            }
            .intro-text li {
                list-style: none;
                display: inline-block;
            }
            td {
                display: inline-block;
                width: 100%;
                height: 84px;
            }
            td > p {
                padding: 0 15px;
            }
            .dmytro {
                margin: 1px;
                text-decoration: none !important;
            }
            .amp {
                height: 20px;
                margin: 6px 0;
            }
            `
            document.getElementsByClassName('history-window')[0].innerHTML += `<div class="tabs"><div class="tab" onclick="ctab(0)">History</div><div class="tab" onclick="ctab(1)">Playlist</div><div class="tab" onclick="ctab(2)">Playlists</div><div class="tab hide" onclick="ctab(3)">Favourites</div><div class="tab ${JSON.parse(localStorage.getItem('pin')) ? 'pinned' : null}" onclick="localStorage.setItem('pin', JSON.stringify(!JSON.parse(localStorage.getItem('pin') || '')));pinToggle(this)">📌</div></div><div id="history" class="history-container"></div><div id="playlist" class="history-container hide"></div><div id="playlists" class="history-container hide"></div><div id="favorites" class="history-container hide"></div>`

            document.body.innerHTML += '<div class="toggle" onclick="toggle()">☰</div>'
            if (window.outerHeight < 554)
                window.resizeTo(window.outerWidth, 554)
            if (window.outerWidth < 550)
                window.resizeTo(550, window.outerHeight)

            //Playlists
            var playlist
            var playlistHash = (new URL(window.location.href)).searchParams.get('playlist')
            var parsedPlaylist
            if (playlistHash) {
                try {
                    playlist = JSON.parse(atobF(playlistHash))
                    parsedPlaylist = JSON.parse(localStorage.getItem('playlists')).find(p => p.id === playlist.id)
                    if (parsedPlaylist && parsedPlaylist.tracks.length === playlist.tids.length) ctab(1)
                    else {
                        const nep = !parsedPlaylist
                        let parsedTracks = []
                        for (let id of playlist.tids) {
                            let t = new XMLHttpRequest()
                            t.open('GET', `/index.php?request=view_by_moduleid&query=${id}`)
                            t.send()
                            t.onload = function() {
                                let doc = new DOMParser().parseFromString(t.response, "text/html")
                                parsedTracks.push({
                                    id,
                                    trackName: doc.getElementsByTagName('h1')[0].childNodes[0].data,
                                    modName: doc.getElementsByTagName('h1')[0].children[0].innerText.replace(/([\(\)])/g, '')
                                })

                                if (id === playlist.tids[playlist.tids.length - 1]) {
                                    parsedPlaylist = {
                                        id: playlist.id,
                                        name: playlist.name,
                                        tracks: parsedTracks
                                    }
                                    //localStorage.setItem('playlists')
                                    let pls = JSON.parse(localStorage.getItem('playlists'))
                                    if (nep) pls.push(parsedPlaylist)
                                    else pls[pls.findIndex(p => p.id === parsedPlaylist.id)] = parsedPlaylist
                                    localStorage.setItem('playlists', JSON.stringify(pls))
                                    ctab(1)
                                    plOptions = ''
                                    pls.forEach(p => { plOptions += `<option value="${p.id}">${p.tracks.find(t => t.id == trackId) ? '▶': ''} ${p.name}</option>` })
                                    document.getElementById('addtoplaylist').innerHTML = `
                                        <option value="-1">Add to Playlist</option>
                                        <option value="0">Create new</option>
                                        ${plOptions}
                                    `
                                }
                            }
                        }
                    }
                }
                catch(e) {
                    window.location.href = `index.php?request=view_player&query=${trackId}`
                }
            }
            else document.getElementsByClassName('tab')[1].classList.add('hide')
            if (JSON.parse(localStorage.getItem('pin'))) toggle()

            var plOptions = ''
            plStore.forEach(p => { plOptions += `<option value="${p.id}">${p.tracks.find(t => t.id == trackId) ? '▶': ''} ${p.name}</option>` })
            document.getElementsByTagName('td')[1].children[0].innerHTML += `
            <br>
            <select id="addtoplaylist" onchange="addToPlaylist()">
                <option value="-1">Add to Playlist</option>
                <option value="0">Create new</option>
                ${plOptions}
            </select>`

            //Favorite link
            if (document.cookie.includes('TMA2009ident')) {
                document.getElementsByClassName('tab')[3].classList.remove('hide')
                const fav = document.getElementsByTagName('td')[1].children[0].children[3]
                const fav2 = document.getElementsByTagName('td')[1].children[0].children[4]
                fav.href = '#fav'
                fav2.href = '#fav'
                fav.target = ''
                fav2.target = ''
                fav.setAttribute('onclick', 'togglefav()')
                fav2.setAttribute('onclick', 'togglefav()')
                load_favorites()
            }

            //My links
            document.getElementsByClassName('player')[0].innerHTML += `
            <br>
            <div class="amp">
                <a class="dmytro" target="_blank" href="https://github.com/devdmytro/advanced-modarchive-player">
                    <svg aria-hidden="true" height="18" viewBox="0 0 16 16" version="1.1" width="18" data-view-component="true">
                        <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
                    </svg>
                </a>
                <a class="dmytro" target="_blank" href="https://ko-fi.com/devdmytro">
                    <svg width="18" height="18" viewBox="0 0 64 64"><g xmlns="http://www.w3.org/2000/svg" id="g856" transform="matrix(1.9656019,0,0,1.9656019,-2.8167172e-7,-51.10565)">
                        <g transform="translate(0,26)" id="Group-4" style="fill:none;fill-rule:nonzero;stroke:none;stroke-width:1">
                            <circle id="Oval" cx="16.280001" cy="16.280001" r="16.280001" style="fill:#29abe0"/>
                            <path d="m 22.257931,8.8 h 1.607617 C 26.966324,8.8 29.48,11.313676 29.48,14.414452 v 0.330015 c 0,3.100776 -2.513676,5.614452 -5.614452,5.614452 h -1.607617 v 1.689795 c 0,1.431128 -1.160158,2.591286 -2.591286,2.591286 H 7.4312857 C 6.0001581,24.64 4.84,23.479842 4.84,22.048714 V 10.095643 C 4.84,9.3800791 5.4200791,8.8 6.1356429,8.8 Z m 0,2.996757 v 5.565405 h 1.465573 c 1.536844,0 2.782703,-1.245858 2.782703,-2.782702 0,-1.536845 -1.245859,-2.782703 -2.782703,-2.782703 z" id="Rectangle-2" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:connector-curvature="0" style="fill:#ffffff"/>
                        </g>
                        <g id="Group" transform="translate(4.84,34.8)" style="fill:#ff5e5b;fill-rule:nonzero;stroke:none;stroke-width:1">
                            <path d="M 8.36,5.2768458 C 8.7602942,4.1056152 9.7089414,3.52 11.205941,3.52 c 2.2455,0 3.077965,2.7936503 1.900934,4.62 C 12.322188,9.3575665 10.739896,10.897567 8.36,12.76 5.9801039,10.897567 4.3978123,9.3575665 3.613125,8.14 2.4360941,6.3136503 3.2685587,3.52 5.5140587,3.52 7.0110586,3.52 7.9597058,4.1056152 8.36,5.2768458 Z" id="Path-2" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" inkscape:connector-curvature="0"/>
                        </g>
                    </svg>
                </a>
                <small style="position: absolute;margin-top:1px;margin-left:2px;"> - Advanced modarchive player v 1.1.1</small></div>`

            // Scroll events
            var list = document.getElementById('history')
            list.addEventListener('scroll', function() {
                if (list.scrollTop + list.clientHeight + 100 >= list.scrollHeight && history_pages * 20 < store.length)
                    load_trackers()
            })
            var fav_list = document.getElementById('favorites')
            fav_list.addEventListener('scroll', function() {
                if (fav_list.scrollTop + fav_list.clientHeight + 100 >= fav_list.scrollHeight && favorites_pages * 20 < favorites.length)
                load_favorites()
            })
        })()
