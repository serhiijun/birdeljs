var q=Object.create;var E=Object.defineProperty;var z=Object.getOwnPropertyDescriptor;var B=Object.getOwnPropertyNames;var J=Object.getPrototypeOf,$=Object.prototype.hasOwnProperty;var U=(a,o)=>()=>(o||a((o={exports:{}}).exports,o),o.exports);var F=(a,o,r,u)=>{if(o&&typeof o=="object"||typeof o=="function")for(let c of B(o))!$.call(a,c)&&c!==r&&E(a,c,{get:()=>o[c],enumerable:!(u=z(o,c))||u.enumerable});return a};var K=(a,o,r)=>(r=a!=null?q(J(a)):{},F(o||!a||!a.__esModule?E(r,"default",{value:a,enumerable:!0}):r,a));var W=U((C,G)=>{(function(a,o){typeof C=="object"&&typeof G<"u"?o(C):typeof define=="function"&&define.amd?define(["exports"],o):o(a.ActionCable={})})(C,function(a){"use strict";var o={logger:self.console,WebSocket:self.WebSocket},r={log:function(){if(this.enabled){for(var n,t=arguments.length,i=Array(t),s=0;s<t;s++)i[s]=arguments[s];i.push(Date.now()),(n=o.logger).log.apply(n,["[ActionCable]"].concat(i))}}},u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},c=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},p=function(){function e(n,t){for(var i=0;i<t.length;i++){var s=t[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(n,s.key,s)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}(),d=function(){return new Date().getTime()},f=function(n){return(d()-n)/1e3},b=function(n,t,i){return Math.max(t,Math.min(i,n))},v=function(){function e(n){c(this,e),this.visibilityDidChange=this.visibilityDidChange.bind(this),this.connection=n,this.reconnectAttempts=0}return e.prototype.start=function(){this.isRunning()||(this.startedAt=d(),delete this.stoppedAt,this.startPolling(),addEventListener("visibilitychange",this.visibilityDidChange),r.log("ConnectionMonitor started. pollInterval = "+this.getPollInterval()+" ms"))},e.prototype.stop=function(){this.isRunning()&&(this.stoppedAt=d(),this.stopPolling(),removeEventListener("visibilitychange",this.visibilityDidChange),r.log("ConnectionMonitor stopped"))},e.prototype.isRunning=function(){return this.startedAt&&!this.stoppedAt},e.prototype.recordPing=function(){this.pingedAt=d()},e.prototype.recordConnect=function(){this.reconnectAttempts=0,this.recordPing(),delete this.disconnectedAt,r.log("ConnectionMonitor recorded connect")},e.prototype.recordDisconnect=function(){this.disconnectedAt=d(),r.log("ConnectionMonitor recorded disconnect")},e.prototype.startPolling=function(){this.stopPolling(),this.poll()},e.prototype.stopPolling=function(){clearTimeout(this.pollTimeout)},e.prototype.poll=function(){var t=this;this.pollTimeout=setTimeout(function(){t.reconnectIfStale(),t.poll()},this.getPollInterval())},e.prototype.getPollInterval=function(){var t=this.constructor.pollInterval,i=t.min,s=t.max,h=t.multiplier,l=h*Math.log(this.reconnectAttempts+1);return Math.round(b(l,i,s)*1e3)},e.prototype.reconnectIfStale=function(){this.connectionIsStale()&&(r.log("ConnectionMonitor detected stale connection. reconnectAttempts = "+this.reconnectAttempts+", pollInterval = "+this.getPollInterval()+" ms, time disconnected = "+f(this.disconnectedAt)+" s, stale threshold = "+this.constructor.staleThreshold+" s"),this.reconnectAttempts++,this.disconnectedRecently()?r.log("ConnectionMonitor skipping reopening recent disconnect"):(r.log("ConnectionMonitor reopening"),this.connection.reopen()))},e.prototype.connectionIsStale=function(){return f(this.pingedAt?this.pingedAt:this.startedAt)>this.constructor.staleThreshold},e.prototype.disconnectedRecently=function(){return this.disconnectedAt&&f(this.disconnectedAt)<this.constructor.staleThreshold},e.prototype.visibilityDidChange=function(){var t=this;document.visibilityState==="visible"&&setTimeout(function(){(t.connectionIsStale()||!t.connection.isOpen())&&(r.log("ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = "+document.visibilityState),t.connection.reopen())},200)},e}();v.pollInterval={min:3,max:30,multiplier:5},v.staleThreshold=6;var y={message_types:{welcome:"welcome",disconnect:"disconnect",ping:"ping",confirmation:"confirm_subscription",rejection:"reject_subscription"},disconnect_reasons:{unauthorized:"unauthorized",invalid_request:"invalid_request",server_restart:"server_restart"},default_mount_path:"/cable",protocols:["actioncable-v1-json","actioncable-unsupported"]},m=y.message_types,S=y.protocols,j=S.slice(0,S.length-1),D=[].indexOf,A=function(){function e(n){c(this,e),this.open=this.open.bind(this),this.consumer=n,this.subscriptions=this.consumer.subscriptions,this.monitor=new v(this),this.disconnected=!0}return e.prototype.send=function(t){return this.isOpen()?(this.webSocket.send(JSON.stringify(t)),!0):!1},e.prototype.open=function(){return this.isActive()?(r.log("Attempted to open WebSocket, but existing socket is "+this.getState()),!1):(r.log("Opening WebSocket, current state is "+this.getState()+", subprotocols: "+S),this.webSocket&&this.uninstallEventHandlers(),this.webSocket=new o.WebSocket(this.consumer.url,S),this.installEventHandlers(),this.monitor.start(),!0)},e.prototype.close=function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{allowReconnect:!0},i=t.allowReconnect;if(i||this.monitor.stop(),this.isActive())return this.webSocket.close()},e.prototype.reopen=function(){if(r.log("Reopening WebSocket, current state is "+this.getState()),this.isActive())try{return this.close()}catch(t){r.log("Failed to reopen WebSocket",t)}finally{r.log("Reopening WebSocket in "+this.constructor.reopenDelay+"ms"),setTimeout(this.open,this.constructor.reopenDelay)}else return this.open()},e.prototype.getProtocol=function(){if(this.webSocket)return this.webSocket.protocol},e.prototype.isOpen=function(){return this.isState("open")},e.prototype.isActive=function(){return this.isState("open","connecting")},e.prototype.isProtocolSupported=function(){return D.call(j,this.getProtocol())>=0},e.prototype.isState=function(){for(var t=arguments.length,i=Array(t),s=0;s<t;s++)i[s]=arguments[s];return D.call(i,this.getState())>=0},e.prototype.getState=function(){if(this.webSocket){for(var t in o.WebSocket)if(o.WebSocket[t]===this.webSocket.readyState)return t.toLowerCase()}return null},e.prototype.installEventHandlers=function(){for(var t in this.events){var i=this.events[t].bind(this);this.webSocket["on"+t]=i}},e.prototype.uninstallEventHandlers=function(){for(var t in this.events)this.webSocket["on"+t]=function(){}},e}();A.reopenDelay=500,A.prototype.events={message:function(n){if(this.isProtocolSupported()){var t=JSON.parse(n.data),i=t.identifier,s=t.message,h=t.reason,l=t.reconnect,g=t.type;switch(g){case m.welcome:return this.monitor.recordConnect(),this.subscriptions.reload();case m.disconnect:return r.log("Disconnecting. Reason: "+h),this.close({allowReconnect:l});case m.ping:return this.monitor.recordPing();case m.confirmation:return this.subscriptions.confirmSubscription(i),this.subscriptions.notify(i,"connected");case m.rejection:return this.subscriptions.reject(i);default:return this.subscriptions.notify(i,"received",s)}}},open:function(){if(r.log("WebSocket onopen event, using '"+this.getProtocol()+"' subprotocol"),this.disconnected=!1,!this.isProtocolSupported())return r.log("Protocol is unsupported. Stopping monitor and disconnecting."),this.close({allowReconnect:!1})},close:function(n){if(r.log("WebSocket onclose event"),!this.disconnected)return this.disconnected=!0,this.monitor.recordDisconnect(),this.subscriptions.notifyAll("disconnected",{willAttemptReconnect:this.monitor.isRunning()})},error:function(){r.log("WebSocket onerror event")}};var x=function(n,t){if(t!=null)for(var i in t){var s=t[i];n[i]=s}return n},T=function(){function e(n){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=arguments[2];c(this,e),this.consumer=n,this.identifier=JSON.stringify(t),x(this,i)}return e.prototype.perform=function(t){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return i.action=t,this.send(i)},e.prototype.send=function(t){return this.consumer.send({command:"message",identifier:this.identifier,data:JSON.stringify(t)})},e.prototype.unsubscribe=function(){return this.consumer.subscriptions.remove(this)},e}(),_=function(){function e(n){c(this,e),this.subscriptions=n,this.pendingSubscriptions=[]}return e.prototype.guarantee=function(t){this.pendingSubscriptions.indexOf(t)==-1?(r.log("SubscriptionGuarantor guaranteeing "+t.identifier),this.pendingSubscriptions.push(t)):r.log("SubscriptionGuarantor already guaranteeing "+t.identifier),this.startGuaranteeing()},e.prototype.forget=function(t){r.log("SubscriptionGuarantor forgetting "+t.identifier),this.pendingSubscriptions=this.pendingSubscriptions.filter(function(i){return i!==t})},e.prototype.startGuaranteeing=function(){this.stopGuaranteeing(),this.retrySubscribing()},e.prototype.stopGuaranteeing=function(){clearTimeout(this.retryTimeout)},e.prototype.retrySubscribing=function(){var t=this;this.retryTimeout=setTimeout(function(){t.subscriptions&&typeof t.subscriptions.subscribe=="function"&&t.pendingSubscriptions.map(function(i){r.log("SubscriptionGuarantor resubscribing "+i.identifier),t.subscriptions.subscribe(i)})},500)},e}(),M=function(){function e(n){c(this,e),this.consumer=n,this.guarantor=new _(this),this.subscriptions=[]}return e.prototype.create=function(t,i){var s=t,h=(typeof s>"u"?"undefined":u(s))==="object"?s:{channel:s},l=new T(this.consumer,h,i);return this.add(l)},e.prototype.add=function(t){return this.subscriptions.push(t),this.consumer.ensureActiveConnection(),this.notify(t,"initialized"),this.subscribe(t),t},e.prototype.remove=function(t){return this.forget(t),this.findAll(t.identifier).length||this.sendCommand(t,"unsubscribe"),t},e.prototype.reject=function(t){var i=this;return this.findAll(t).map(function(s){return i.forget(s),i.notify(s,"rejected"),s})},e.prototype.forget=function(t){return this.guarantor.forget(t),this.subscriptions=this.subscriptions.filter(function(i){return i!==t}),t},e.prototype.findAll=function(t){return this.subscriptions.filter(function(i){return i.identifier===t})},e.prototype.reload=function(){var t=this;return this.subscriptions.map(function(i){return t.subscribe(i)})},e.prototype.notifyAll=function(t){for(var i=this,s=arguments.length,h=Array(s>1?s-1:0),l=1;l<s;l++)h[l-1]=arguments[l];return this.subscriptions.map(function(g){return i.notify.apply(i,[g,t].concat(h))})},e.prototype.notify=function(t,i){for(var s=arguments.length,h=Array(s>2?s-2:0),l=2;l<s;l++)h[l-2]=arguments[l];var g=void 0;return typeof t=="string"?g=this.findAll(t):g=[t],g.map(function(w){return typeof w[i]=="function"?w[i].apply(w,h):void 0})},e.prototype.subscribe=function(t){this.sendCommand(t,"subscribe")&&this.guarantor.guarantee(t)},e.prototype.confirmSubscription=function(t){var i=this;r.log("Subscription confirmed "+t),this.findAll(t).map(function(s){return i.guarantor.forget(s)})},e.prototype.sendCommand=function(t,i){var s=t.identifier;return this.consumer.send({command:i,identifier:s})},e}(),k=function(){function e(n){c(this,e),this._url=n,this.subscriptions=new M(this),this.connection=new A(this)}return e.prototype.send=function(t){return this.connection.send(t)},e.prototype.connect=function(){return this.connection.open()},e.prototype.disconnect=function(){return this.connection.close({allowReconnect:!1})},e.prototype.ensureActiveConnection=function(){if(!this.connection.isActive())return this.connection.open()},p(e,[{key:"url",get:function(){return L(this._url)}}]),e}();function L(e){if(typeof e=="function"&&(e=e()),e&&!/^wss?:/i.test(e)){var n=document.createElement("a");return n.href=e,n.href=n.href,n.protocol=n.protocol.replace("http","ws"),n.href}else return e}function H(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:O("url")||y.default_mount_path;return new k(e)}function O(e){var n=document.head.querySelector("meta[name='action-cable-"+e+"']");if(n)return n.getAttribute("content")}a.Connection=A,a.ConnectionMonitor=v,a.Consumer=k,a.INTERNAL=y,a.Subscription=T,a.Subscriptions=M,a.SubscriptionGuarantor=_,a.adapters=o,a.createWebSocketURL=L,a.logger=r,a.createConsumer=H,a.getConfig=O,Object.defineProperty(a,"__esModule",{value:!0})})});var N=K(W()),P=class{constructor({log:o}={}){this.actors={},this.queueBumps=[],this.log=o}pushBump(o){this.queueBumps.push(o)}removeActor(o){let r=o.name.split("--").pop(),u=this.actorCamelized(r)+"Actor",c=this.actors[u].indexOf(o);c>-1&&this.actors[u].splice(c,1)}addActor(o){let r=o.name.split("--").pop(),u=this.actorCamelized(r)+"Actor";this.actors[u]||(this.actors[u]=[]),this.actors[u].push(o)}getActor(o,r,{resourceId:u}={}){u=u||!1;let c=this.actorCamelized(r);return this.actors[c].find(p=>p.name==o&&p.resourceId==u)}forward(o,r,{data:u,resourceId:c}={}){c=c||!1;let[p,d]=r.split("#"),f=this.getActor(o,p,{resourceId:c});f[d].call(f,u)}subscribe({channel:o,id:r}={}){let u=(0,N.createConsumer)();this.channel=u.subscriptions.create({channel:o,id:r},{connected:()=>{this.log&&console.log("connected"),this.queueBumps.forEach(c=>{this.forward(c.componentCssClass,c.actorAndMethod,{resourceId:c.resourceId,data:c.e})})},received:c=>{this.log&&console.log(c);let p=c.callback,d=p.component,f=p.actor,b=this.getActor(d,f,{resourceId:p.resourceId});b[p.method].call(b,c.data)},disconnected:()=>{this.log&&console.log("disconnected")}})}send(o){this.channel.perform("actorThrough",o)}actorCamelized(o){return o.split("-").map(r=>r.toUpperCase()[0]+r.slice(1)).join("")}};var I=class{constructor(o){this.element=o,this.name=this.element.dataset.controller,this.resourceId=this.element.dataset.resourceId||!1,window.Birdel.addActor(this)}replace(o,r){let c=new DOMParser().parseFromString(o,"text/html").body.firstChild;r.parentNode.replaceChild(c,r)}};var R=class{static toggleDropdown({dwEl:o}={}){o.classList.toggle("b_dw--active")}static closeDropdown({dwEl:o}={}){o.classList.remove("b_dw--active")}static toggleSel({sel:o}={}){o.classList.contains("b_sel--disabled")||o.classList.toggle("b_sel--active")}static closeSel({sel:o}={}){o.classList.remove("b_sel--active")}static selectItem({sel:o,selItem:r}={}){let u=o.getElementsByClassName("b_sel__title")[0];u.innerHTML=r.innerHTML,o.dataset.bselId=r.dataset.itemId}static selectRadio({rad:o}={}){let r=o.dataset.bRadGroup,u=document.querySelectorAll(`[data-b-rad-group="${r}"]`);o.classList.contains("b_rad--active")||(u.forEach(c=>{c.classList.remove("b_rad--active")}),o.classList.add("b_rad--active"))}static toggleModal({modal:o}={}){o.classList.toggle("b_modal--active")}};export{I as ActorBase,R as ActorElement,P as ActorForward};
