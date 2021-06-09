var e=Object.defineProperty,t=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,o=(t,a,l)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[a]=l;import{d as s,o as n,c as r,a as i,t as u,r as d,b as c,w as p,e as v,f as m,g,v as y,u as x,h as E,p as f,i as T,F as b,j as w,k as L,l as R,m as O,T as C,n as I,q as P,s as S,x as A,y as h}from"./vendor.3ae097cf.js";var F=s({expose:[],props:{msg:String,color:String},setup(e){const t=e;return(a,l)=>(n(),r("button",{class:["flex-grow m-1 px-1 py-2 text-md text-gray-100 font-semibold rounded-lg shadow-md","red"===t.color?"bg-red-500":"bg-green-500"],sm:"flex-grow-0 px-6 py-4 my-10 text-base",bg:"hover:purple-700 active:purple-600"},[i(u(e.msg)+" ",1),d(a.$slots,"default")],2))}});const D={class:"mx-4 text-green-100 font-mono text-5xl font-semibold"};var k=s({expose:[],props:{price:{type:String,default:"0"}},setup(e){const t=e,a=c("↓");return p((()=>t.price),((e,t)=>{e.length>t.length||e>t?a.value="↑":a.value="↓"})),(t,l)=>(n(),r("div",D,[v("p",null,u(e.price.slice(0,9))+" "+u(a.value),1)]))}});const N=m({apiPublicKey:"",apiPrivateKey:""});var K,_,j,$,U,M,B,H,q,G,W,X,Y,V,z,J,Q,Z,ee,te,ae,le;(_=K||(K={})).INFO="INFO",_.OK="OK",_.ERR="ERR",($=j||(j={})).GET="GET",$.POST="POST",$.DELETE="DELETE",(M=U||(U={})).SELL="SELL",M.BUY="BUY",function(e){e.reverse=function(t){return t===e.SELL?e.BUY:e.SELL}}(U||(U={})),(H=B||(B={})).BOTH="BOTH",H.LONG="LONG",H.SHORT="SHORT",(G=q||(q={})).TRUE="TRUE",G.FALSE="FALSE",(X=W||(W={})).CONTRACT_PRICE="CONTRACT_PRICE",X.MARK_PRICE="MARK_PRICE",(V=Y||(Y={})).ACK="ACK",V.RESULT="RESULT",(J=z||(z={})).LIMIT="LIMIT",J.MARKET="MARKET",J.STOP="STOP",J.TAKE_PROFIT="TAKE_PROFIT",J.STOP_MARKET="STOP_MARKET",J.TAKE_PROFIT_MARKET="TAKE_PROFIT_MARKET",J.TRAILING_STOP_MARKET="TRAILING_STOP_MARKET",(Z=Q||(Q={})).NEW="NEW",Z.PARTIALLY_FILLED="PARTIALLY_FILLED",Z.FILLED="FILLED",Z.CANCELED="CANCELED",Z.EXPIRED="EXPIRED",Z.NEW_INSURANCE="NEW_INSURANCE",Z.NEW_ADL="NEW_ADL",(te=ee||(ee={})).NEW="NEW",te.CANCELED="CANCELED",te.CALCULATED="CALCULATED",te.EXPIRED="EXPIRED",te.TRADE="TRADE",(le=ae||(ae={})).GTC="GTC",le.IOC="IOC",le.FOK="FOK",le.GTX="GTX";let oe=0;const se=c([]),ne=(e,s="",n={})=>{let r=oe++;return se.value.push(((e,s)=>{for(var n in s||(s={}))a.call(s,n)&&o(e,n,s[n]);if(t)for(var n of t(s))l.call(s,n)&&o(e,n,s[n]);return e})({title:e,description:s,id:r,onCloseHandler:()=>ie(r)},n)),r},re=(e,t="",a=K.INFO)=>{ne(e,t,{messageType:a})},ie=e=>{const t=se.value.findIndex((t=>e===t.id));se.value.splice(t,1)},ue={offsetTime:37e3},de=()=>(new Date).getTime()+ue.offsetTime,ce=async(e,t,a={},l=console.log,o=console.log,s=!1,n=!1)=>{try{let o=s?{"X-MBX-APIKEY":N.apiPublicKey}:{},r=(e=>{let t="";for(let a in e)""!==t&&(t+="&"),t+=a+"="+encodeURIComponent(e[a]);return t})(a),i=n?`${t}?${r}&signature=${await(async(e,t)=>{let a=new TextEncoder,l=await window.crypto.subtle.importKey("raw",a.encode(e),{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign","verify"]),o=await window.crypto.subtle.sign("HMAC",l,a.encode(t)),s=new Uint8Array(o);return Array.prototype.map.call(s,(e=>("00"+e.toString(16)).slice(-2))).join("")})(N.apiPrivateKey,r)}`:`${t}?${r}`;const u=await fetch(i,{method:e,headers:o});if(!u.ok)throw u;return l(await u.json())}catch(r){return o(r)}},pe=async e=>{if(console.log(e),e instanceof Response){let t=await e.json();console.log(t),re("Order Error",`${t.code}: ${t.msg}`,K.ERR)}else re("Network Error",e.message,K.ERR)};(async()=>{await ce(j.GET,"https://fapi.binance.com/fapi/v1/time",{},(e=>{ue.offsetTime=e.serverTime-(new Date).getTime()}))})();const ve=async(e,t)=>(re("Leverage Change Request Sent"),await(async(e,t,a=console.log,l=console.log)=>{const o={symbol:e,leverage:t,timestamp:de()};return await ce(j.POST,"https://fapi.binance.com/fapi/v1/leverage",o,a,l,!0,!0)})(e,t,(e=>{console.log(e),re("Leverage Changed",`Leverage of ${e.symbol} changed to ${e.leverage}`,K.OK)}),pe)),me=async(e,t)=>(re("CANCEL SENT"),await(async(e,t,a=console.log,l=console.log)=>{const o={symbol:e,orderID:t,timestamp:de()};return await ce(j.DELETE,"https://fapi.binance.com/fapi/v1/order",o,a,l,!0,!0)})(e,t,(e=>(console.log(e),re("ORDER CANCELED",`cancel ${e.side} ${e.origQty} at $${e.price}`,K.OK),e.id)),pe)),ge=async()=>await ce(j.POST,"https://fapi.binance.com/fapi/v1/listenKey",{},(e=>e.listenKey),pe,!0,!1),ye=async(e,t,a,l,o)=>(re("ORDER SENT"),await(async(e,t,a,l,o,s=console.log,n=console.log)=>{const r={symbol:e,side:t,type:a,quantity:l,price:o,timeInForce:ae.GTC,newOrderRespType:Y.RESULT,timestamp:de()};return a===z.STOP&&(r.stopPrice=o),await ce(j.POST,"https://fapi.binance.com/fapi/v1/order",r,s,n,!0,!0)})(e,t,a,l,o,(e=>(re("ORDER CREATED",`${e.side} ${e.origQty} at $${e.price}`,K.OK),e.orderId)),pe)),xe=m({}),Ee=async(e,t,a,l,o,s,n)=>{let r=await ye(e,t,a,l,o);"number"==typeof r&&(xe[r]={stopPrice:s,profitPrice:n})},fe=c(!1),Te=()=>!!fe.value||(re("NEED KEYS","please enter public and private keys",K.ERR),!1),be=c();let we,Le;const Re=m({}),Oe={},Ce={},Ie={},Pe={ORDER_TRADE_UPDATE:async e=>{let t=Re[e.o.i]={id:e.o.i,tradePair:e.o.s,status:e.o.X,price:e.o.p,quantity:e.o.q,spentFee:e.o.n,side:e.o.S};if(t.status===Q.FILLED){if(re("ORDER FILLED",`${t.side} ${t.quantity} at ${t.price}`,K.OK),xe[t.id]){console.log("profit");let[e,a]=await Promise.all([ye(t.tradePair,U.reverse(t.side),z.LIMIT,parseFloat(t.quantity),xe[t.id].profitPrice),ye(t.tradePair,U.reverse(t.side),z.STOP,parseFloat(t.quantity),xe[t.id].stopPrice)]);"number"==typeof e&&"number"==typeof a&&(Oe[a]={originId:t.id,stop:a,profit:e},Ce[e]={originId:t.id,stop:a,profit:e},Ie[t.id]={originId:t.id,stop:a,profit:e})}Ce[t.id]&&(me(t.tradePair,Ce[t.id].stop),delete Ie[Ce[t.id].originId],delete Oe[Ce[t.id].stop],delete Ce[t.id]),Oe[t.id]&&(me(t.tradePair,Oe[t.id].profit),delete Ie[Oe[t.id].originId],delete Ce[Oe[t.id].profit],delete Oe[t.id])}}};p(be,(()=>{fe.value=!1,"string"==typeof be.value&&(Le||(Le=window.setInterval(ge,36e5)),we&&we.close(),Object.assign(Re,{}),we=new WebSocket(`wss://fstream.binance.com/ws/${be.value}`),we.addEventListener("message",(e=>{const t=JSON.parse(e.data);console.log(t),Pe[t.e]&&Pe[t.e](t)})),fe.value=!0)})),f("data-v-379bd38a");const Se={key:0,class:"z-10 setbox absolute right-0 top-0 p-6 w-5/12 sm:w-96 h-screen bg-gray-500 bg-opacity-75"},Ae={class:"flex-row content-center justify-around"},he={class:"absolute sm:bottom-10 bottom-1/4 right-0 flex justify-around px-5 w-full"};T();var Fe=s({expose:[],setup(e){const t=c(!1),a=()=>{t.value=!0},l=()=>{t.value=!1},o=()=>{(async()=>{be.value=await ge()})(),l()};return(e,s)=>(n(),r("div",null,[v("button",{class:"circle z-10 absolute right-4 top-6 w-8 h-8 rounded-full transition-all duration-500",bg:"gray-800 hover:purple-800 active:purple-700",onClick:a}),t.value?(n(),r("div",Se,[v("div",Ae,[g(v("input",{class:"text-input",type:"text",placeholder:"api-public-key","onUpdate:modelValue":s[1]||(s[1]=e=>x(N).apiPublicKey=e)},null,512),[[y,x(N).apiPublicKey]]),g(v("input",{class:"text-input",type:"text",placeholder:"api-private-key","onUpdate:modelValue":s[2]||(s[2]=e=>x(N).apiPrivateKey=e)},null,512),[[y,x(N).apiPrivateKey]])]),v("div",he,[v(F,{class:"sm:m-5 sm:w-40",msg:"Confirm",color:"green",onClick:o}),v(F,{class:"sm:m-5 sm:w-40",msg:"Cancel",color:"red",onClick:l})])])):E("",!0)]))}});Fe.__scopeId="data-v-379bd38a";const De=e=>e,ke=(e,t)=>{const a=Math.pow(10,t);return Math.round((e+Number.EPSILON)*a)/a};var Ne=s({expose:[],props:{msgs:{type:Array,required:!0},data:{type:String,required:!0}},setup(e){const t=e;return(a,l)=>(n(),r("select",{class:"flex-grow w-1 mx-1 px-2 py-1 text-white rounded-lg appearance-none cursor-pointer",bg:"gray-700 hover:purple-700 active:purple-600",sm:"mx-4 px-4 py-3",value:e.data,onInput:l[1]||(l[1]=e=>a.$emit("update:data",x(De)(e.target).value))},[(n(!0),r(b,null,w(t.msgs,(e=>(n(),r("option",{key:e,class:"bg-gray-700 m-100"},u(e),1)))),128))],40,["value"]))}});f("data-v-28450447");const Ke={class:"flex flex-col mx-1"},_e={class:"text-base font-bold text-gray-700"},je={key:0,class:"text-sm m-1"},$e=v("p",{class:"text-2xl text-gray-700 transition-all duration-70","group-hover":"text-red-500 text-4xl font-extrabold"}," × ",-1);T();var Ue=s({expose:[],props:{title:String,description:String,onCloseHandler:{type:Function,required:!0},timeout:{type:Number,default:1e4},messageType:{type:String,default:K.INFO}},setup(e){const t=e,{progress:a,startTimer:l,pauseTimer:o}=((e,t)=>{let a=0,l=0;const o=c(t),s=L((()=>o.value/t*100)),n=()=>{clearInterval(l),clearTimeout(a)};return R((()=>{n()})),{progress:s,startTimer:()=>{l=window.setInterval((()=>{o.value-=100}),100),a=window.setTimeout(e,o.value+100)},pauseTimer:n}})(t.onCloseHandler,t.timeout);O((()=>{l()}));const{swipedDiff:s,isSwiping:i,startSwipe:d,endSwipe:m}=(()=>{let e=0;const t=c(0),a=c(!1),l=l=>{a.value&&(t.value=e-l.clientX)},o=()=>{a.value=!1,t.value=0,e=0,removeEventListener("mousemove",l)};return O((()=>{addEventListener("mouseup",o)})),R((()=>{o(),removeEventListener("mouseup",o)})),{swipedDiff:t,isSwiping:a,startSwipe:t=>{a.value=!0,e=t.clientX,addEventListener("mousemove",l)},endSwipe:o}})();return p(s,(()=>{Math.abs(s.value)>200&&(m(),t.onCloseHandler())})),(c,p)=>(n(),r("div",{class:["m-2 relative flex justify-between min-h-16 overflow-hidden py-3 px-2 w-full sm:w-72 rounded-lg select-none",t.messageType],onMouseenter:p[2]||(p[2]=(...e)=>x(o)&&x(o)(...e)),onMouseleave:p[3]||(p[3]=(...e)=>x(l)&&x(l)(...e)),onMousedown:p[4]||(p[4]=(...e)=>x(d)&&x(d)(...e)),style:{right:`${x(s)}px`,transition:x(i)?"none":"transition: all .5s linear"}},[v("div",Ke,[v("div",_e,u(e.title),1),e.description&&e.description.length>0?(n(),r("div",je,u(e.description),1)):E("",!0)]),v("div",{class:"group cursor-pointer",onClick:p[1]||(p[1]=(...t)=>e.onCloseHandler&&e.onCloseHandler(...t))},[$e]),v("div",{class:"absolute h-3.5 -bottom-2 -ml-2 rounded transition-all duration-200 ease-linear w-",gradient:"to-r from-teal-100 via-pink-100 to-purple-300",style:{width:`${x(a)}%`}},null,4)],38))}});Ue.__scopeId="data-v-28450447";const Me=I();var Be=s({expose:[],setup(e){let t=e=>{let t=e,a=t.getBoundingClientRect().top+window.scrollY-9;t.style.position="absolute",t.style.top=`${a}px`};return(e,a)=>(n(),r("div",null,[v("div",null,[v(C,{name:"bounce",tag:"div",class:"flex flex-col justify-start items-end fixed right-0 top-0 p-4 z-10 <sm:w-1/2",onLeave:x(t)},{default:Me((()=>[(n(!0),r(b,null,w(x(se),(e=>(n(),r(Ue,P(e,{key:e.id}),null,16)))),128))])),_:1},8,["onLeave"])])]))}});Be.__scopeId="data-v-65a201fc";var He=s({expose:[],setup(e){const t=c(!1);return(e,a)=>(n(),r("div",{class:t.value?"using-mouse":"using-keyborad",onMousedown:a[1]||(a[1]=()=>{t.value=!0}),onKeyup:a[2]||(a[2]=S((()=>{t.value=!1}),["tab"]))},[d(e.$slots,"default")],34))}});const qe=c("0"),Ge=c(0),We=c(0),Xe=c(0),Ye=m([0]);let Ve=0;const ze=L((()=>Ye.reduce(((e,t)=>e+t))/Ye.length)),Je=L((()=>(Ye.reduce(((e,t)=>e+(t-ze.value)**2))/Ye.length)**.5)),Qe={"btcusdt@aggTrade":e=>{e.T-Xe.value>0&&(qe.value=e.p,Xe.value=e.T,We.value++)},"btcusdt@miniTicker":e=>{const t=parseFloat(e.c);0===Ge.value&&(Ge.value=t),Ge.value-=.03*(Ge.value-t),Ye[Ve]=t,Ve=(Ve+1)%30}},Ze=Object.keys(Qe).join("/");new WebSocket(`wss://fstream.binance.com/stream?streams=${Ze}`).addEventListener("message",(e=>{const{stream:t,data:a}=JSON.parse(e.data);Qe[t](a)}));const et={class:"text-light-100 m-2 my-5 font-mono"},tt={key:0,class:"flex justify-between border-2 text-center py-5 px-2 rounded-xl"},at={class:"text-center"},lt=i("COVER"),ot={key:0,class:"flex justify-between border-2 text-center py-5 px-2 rounded-xl"},st={class:"text-center"},nt=i("CANCEL"),rt={key:0,class:"flex justify-between border-2 text-center py-5 px-2 rounded-xl"},it={class:"text-center"},ut=i("DONE"),dt={class:"flex justify-between border-2 text-center py-5 px-2 rounded-xl"},ct={class:"text-center"},pt=i(" > ");var vt=s({expose:[],setup(e){const t=e=>e.status===Q.NEW||e.status===Q.PARTIALLY_FILLED,a=e=>void 0!==Ie[e.id];return(e,l)=>(n(),r("div",et,[(n(!0),r(b,null,w(x(Re),(e=>(n(),r(b,null,[a(e)?(n(),r("div",tt,[v("div",at,u(e),1),v(F,{color:"red",class:"!p-2 !m-0",onClick:t=>(e=>{ye(e.tradePair,U.reverse(e.side),z.LIMIT,parseFloat(e.quantity),parseFloat(qe.value)),me(e.tradePair,Ie[e.id].stop),delete Oe[Ie[e.id].stop],me(e.tradePair,Ie[e.id].profit),delete Ce[Ie[e.id].profit],delete Ie[e.id]})(e)},{default:A((()=>[lt])),_:2},1032,["onClick"])])):E("",!0)],64)))),256)),(n(!0),r(b,null,w(x(Re),(e=>(n(),r(b,null,[!a(e)&&t(e)?(n(),r("div",ot,[v("div",st,u(e),1),v(F,{color:"red",class:"!p-2 !m-0",onClick:t=>(e=>{Te()&&me(e.tradePair,e.id)})(e)},{default:A((()=>[nt])),_:2},1032,["onClick"])])):E("",!0)],64)))),256)),(n(!0),r(b,null,w(x(Re),(e=>(n(),r(b,null,[a(e)||t(e)?E("",!0):(n(),r("div",rt,[v("div",it,u(e),1),v(F,{color:"red",class:"!p-2 !m-0 !cursor-not-allowed !bg-gray-700"},{default:A((()=>[ut])),_:1})]))],64)))),256)),(n(!0),r(b,null,w(x(xe),(e=>(n(),r("div",dt,[v("div",ct,u(e),1),pt])))),256))]))}});const mt=I();f("data-v-43382a69");const gt=v("div",{class:"fixed bg-gray-800 overflow-hidden -z-10 w-2/1 h-2/1 -top-1/2"},null,-1),yt={class:"contianer p-1 sm:p-10 min-h-screen bg-gray-800 bg-cover"},xt={class:"mx-auto p-8 max-w-2xl text-center text-white font-mono bg-gray-700 rounded-xl shadow-md overflow-hidden"},Et={class:"m-2 sm:m-8"},ft={class:"inline-block w-4"},Tt={class:"inline-block w-4"},bt=v("br",null,null,-1),wt=i("feeRate: "),Lt={class:"flex justify-around mx-auto max-w-xl"},Rt={class:"flex justify-around mx-auto font-mono"};T();var Ot=s({expose:[],setup(e){const t=c("BTCUSDT"),a=()=>{Te()&&Ee("BTCUSDT",U.BUY,z.LIMIT,s.value*f.value,ke(R.value,2),ke(R.value+D.value,2),ke(R.value+j.value,2))},l=()=>{Te()&&Ee("BTCUSDT",U.SELL,z.LIMIT,s.value*f.value,ke(O.value,2),ke(R.value+j.value,2),ke(R.value+D.value,2))},o=c(.036),s=c(8e-5),d=c(L((()=>parseFloat(qe.value)))),m=[1,2,5,25,50,75,100,125].reduce(((e,t)=>(e[t+"x"]=t,e)),{}),E=c(Object.keys(m)[Object.keys(m).length-1]),f=L((()=>m[E.value]));p((()=>fe.value&&f.value),(()=>fe.value&&ve(t.value,f.value)));const T=[0,.1,.3,.5,.7,1,2,3,5,10],b=T.reduce(((e,t)=>(e[`p - ${t}*std30`]=t,e)),{}),w=c(Object.keys(b)[5]),R=L((()=>d.value-b[w.value]*Je.value)),O=L((()=>d.value+b[w.value]*Je.value)),C=L((()=>R.value*s.value)),I=L((()=>.01*o.value*R.value)),P=L((()=>o.value*f.value*C.value*.01)),S=L((()=>o.value*f.value)),A=T.reduce(((e,t)=>(e[`op - ${t}*std30`]=t,e)),{}),h=c(Object.keys(A)[5]),D=L((()=>-A[h.value]*Je.value)),N=L((()=>D.value/R.value*f.value*100)),K=T.reduce(((e,t)=>(e[`op + ${t}*std30`]=t,e)),{}),_=c(Object.keys(K)[5]),j=L((()=>K[_.value]*Je.value)),$=L((()=>j.value/R.value*f.value*100));return(e,t)=>(n(),r(He,null,{default:mt((()=>[gt,v(Fe),v(Be),v("div",yt,[v("div",xt,[v(k,{price:x(qe)},null,8,["price"]),v("div",Et,[v("p",null,[i(" priceMeanRolling: "+u(x(Ge).toFixed(2))+" ",1),v("span",ft,"("+u((d.value-x(Ge)).toFixed(2))+")",1)]),v("p",null,[i(" priceMean30: "+u(x(ze).toFixed(2))+" ",1),v("span",Tt,"("+u((d.value-x(ze)).toFixed(2))+")",1)]),v("p",null,"priceSTD30: "+u(x(Je).toFixed(2))+" ("+u((x(Je)/x(Ge)*100).toFixed(4))+"%)",1),v("p",null,"count: "+u(x(We)),1)]),v("p",null," openPrice: "+u(x(R).toFixed(2))+" ("+u((x(R)-d.value).toFixed(2))+"/"+u(((x(R)-d.value)/d.value*100).toFixed(4))+"%) ",1),v("p",null," noLossPrice: "+u((x(R)+x(I)).toFixed(2))+" / "+u((x(R)-x(I)).toFixed(2))+" ("+u(x(I).toFixed(2))+"/"+u((o.value*x(f)).toFixed(4))+"%) ",1),v("p",null," upPrice: "+u((x(R)+x(j)).toFixed(2))+" ("+u(x(j).toFixed(2))+"/"+u(x($).toFixed(4))+"%) ",1),v("p",null," downPrice: "+u((x(R)+x(D)).toFixed(2))+" ("+u(x(D).toFixed(2))+"/"+u(x(N).toFixed(4))+"%) ",1),bt,v("p",null,"leverage: "+u(x(f)+"x"),1),v("p",null,[i(" orderAmount: USDT "+u(x(C).toFixed(4))+" / BTC ",1),g(v("input",{class:"tiny-input",type:"number","onUpdate:modelValue":t[1]||(t[1]=e=>s.value=e)},null,512),[[y,s.value]])]),v("p",null," leveredOrderAmount: USDT "+u((x(C)*x(f)).toFixed(4))+" / BTC "+u((s.value*x(f)).toFixed(6)),1),v("p",null,[wt,g(v("input",{class:"tiny-input",type:"number","onUpdate:modelValue":t[2]||(t[2]=e=>o.value=e)},null,512),[[y,o.value]])]),v("p",null,"leveredFee: "+u(x(P).toFixed(4))+" ("+u(x(S).toFixed(4))+"%)",1)]),v("div",Lt,[v(F,{msg:"Long2",color:"green",onClick:a}),v(F,{msg:"Long1",color:"green",onClick:a}),v(F,{msg:"Short1",color:"red",onClick:l}),v(F,{msg:"Short2",color:"red",onClick:l})]),v("div",Rt,[v(Ne,{msgs:Object.keys(x(m)),data:E.value,"onUpdate:data":t[3]||(t[3]=e=>E.value=e)},null,8,["msgs","data"]),v(Ne,{msgs:Object.keys(x(b)),data:w.value,"onUpdate:data":t[4]||(t[4]=e=>w.value=e)},null,8,["msgs","data"]),v(Ne,{msgs:Object.keys(x(A)),data:h.value,"onUpdate:data":t[5]||(t[5]=e=>h.value=e)},null,8,["msgs","data"]),v(Ne,{msgs:Object.keys(x(K)),data:_.value,"onUpdate:data":t[6]||(t[6]=e=>_.value=e)},null,8,["msgs","data"])]),v(vt)])])),_:1}))}});Ot.__scopeId="data-v-43382a69";h(Ot).mount("#app");