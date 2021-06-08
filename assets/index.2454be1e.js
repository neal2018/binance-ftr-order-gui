var e=Object.defineProperty,t=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,l=Object.prototype.propertyIsEnumerable,s=(t,a,l)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[a]=l;import{d as o,o as n,c as r,t as i,r as u,w as c,a as d,b as p,e as v,v as m,u as g,f as y,p as x,g as T,F as E,h as b,i as f,j as w,k as O,T as R,l as L,m as C,n as h,q as A,s as S,x as I}from"./vendor.b891fc83.js";var F=o({expose:[],props:{msg:String,color:String},setup(e){const t=e;return(a,l)=>(n(),r("button",{class:["flex-grow m-1 px-1 py-2 text-md text-gray-100 font-semibold rounded-lg shadow-md","red"===t.color?"bg-red-500":"bg-green-500"],sm:"flex-grow-0 px-6 py-4 my-10 text-base",bg:"hover:purple-700 active:purple-600"},i(e.msg),3))}});const P={class:"mx-4 text-green-100 font-mono text-5xl font-semibold"};var K=o({expose:[],props:{price:{type:String,default:"0"}},setup(e){const t=e,a=u("↓");return c((()=>t.price),((e,t)=>{e.length>t.length||e>t?a.value="↑":a.value="↓"})),(t,l)=>(n(),r("div",P,[d("p",null,i(e.price.slice(0,9))+" "+i(a.value),1)]))}});const _=p({apiPublicKey:"",apiPrivateKey:""});var k,D,N,U,j,M,$,H,G,B,W,X,Y,q,z,V,J,Q,Z,ee,te,ae;(D=k||(k={})).INFO="INFO",D.OK="OK",D.ERR="ERR",(U=N||(N={})).GET="GET",U.POST="POST",U.DELETE="DELETE",(M=j||(j={})).SELL="SELL",M.BUY="BUY",(H=$||($={})).BOTH="BOTH",H.LONG="LONG",H.SHORT="SHORT",(B=G||(G={})).TRUE="TRUE",B.FALSE="FALSE",(X=W||(W={})).CONTRACT_PRICE="CONTRACT_PRICE",X.MARK_PRICE="MARK_PRICE",(q=Y||(Y={})).ACK="ACK",q.RESULT="RESULT",(V=z||(z={})).LIMIT="LIMIT",V.MARKET="MARKET",V.STOP="STOP",V.TAKE_PROFIT="TAKE_PROFIT",V.STOP_MARKET="STOP_MARKET",V.TAKE_PROFIT_MARKET="TAKE_PROFIT_MARKET",V.TRAILING_STOP_MARKET="TRAILING_STOP_MARKET",(Q=J||(J={})).NEW="NEW",Q.PARTIALLY_FILLE="PARTIALLY_FILLED",Q.FILLED="FILLED",Q.CANCELED="CANCELED",Q.EXPIRED="EXPIRED",Q.NEW_INSURANCE="NEW_INSURANCE",Q.NEW_ADL="NEW_ADL",(ee=Z||(Z={})).NEW="NEW",ee.CANCELED="CANCELED",ee.CALCULATED="CALCULATED",ee.EXPIRED="EXPIRED",ee.TRADE="TRADE",(ae=te||(te={})).GTC="GTC",ae.IOC="IOC",ae.FOK="FOK",ae.GTX="GTX";let le=0;const se=u([]),oe=(e,o="",n={})=>{let r=le++;return se.value.push(((e,o)=>{for(var n in o||(o={}))a.call(o,n)&&s(e,n,o[n]);if(t)for(var n of t(o))l.call(o,n)&&s(e,n,o[n]);return e})({title:e,description:o,id:r,onCloseHandler:()=>re(r)},n)),r},ne=(e,t,a)=>{oe(e,t,{messageType:a})},re=e=>{const t=se.value.findIndex((t=>e===t.id));se.value.splice(t,1)},ie={offsetTime:37e3},ue=()=>(new Date).getTime()+ie.offsetTime,ce=async(e,t,a={},l=console.log,s=console.log,o=!1,n=!1)=>{try{let s=o?{"X-MBX-APIKEY":_.apiPublicKey}:{},r=(e=>{let t="";for(let a in e)""!==t&&(t+="&"),t+=a+"="+encodeURIComponent(e[a]);return t})(a),i=n?`${t}?${r}&signature=${await(async(e,t)=>{let a=new TextEncoder,l=await window.crypto.subtle.importKey("raw",a.encode(e),{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign","verify"]),s=await window.crypto.subtle.sign("HMAC",l,a.encode(t)),o=new Uint8Array(s);return Array.prototype.map.call(o,(e=>("00"+e.toString(16)).slice(-2))).join("")})(_.apiPrivateKey,r)}`:`${t}?${r}`;const u=await fetch(i,{method:e,headers:s});if(!u.ok)throw u;return l(await u.json())}catch(r){return s(r)}},de=(e,t,a="",l=k.INFO)=>async(...s)=>(ne(t,a,l),await e(...s)),pe=async e=>{if(console.log(e),e instanceof Response){let t=await e.json();console.log(t),ne("Order Error",`${t.code}: ${t.msg}`,k.ERR)}else ne("Network Error",e.message,k.ERR)};(async()=>{await ce(N.GET,"https://fapi.binance.com/fapi/v1/time",{},(e=>{ie.offsetTime=e.serverTime-(new Date).getTime()}))})();const ve=(e,t,a=console.log,l=console.log)=>{const s={symbol:e,leverage:t,timestamp:ue()};ce(N.POST,"https://fapi.binance.com/fapi/v1/leverage",s,a,l,!0,!0)},me=async()=>await ce(N.POST,"https://fapi.binance.com/fapi/v1/listenKey",{},(e=>e.listenKey),pe,!0,!1),ge=u(!1),ye=u();let xe,Te;p({});const Ee={ORDER_TRADE_UPDATE:e=>{console.log(e)}};c(ye,(()=>{ge.value=!1,"string"==typeof ye.value&&(Te||(Te=window.setInterval(me,36e5)),xe&&xe.close(),xe=new WebSocket(`wss://fstream.binance.com/ws/${ye}`),xe.addEventListener("message",(e=>{const t=JSON.parse(e.data);console.log(t),Ee[t.e]&&Ee[t.e](t)})),ge.value=!0)})),x("data-v-379bd38a");const be={key:0,class:"z-10 setbox absolute right-0 top-0 p-6 w-5/12 sm:w-96 h-screen bg-gray-500 bg-opacity-75"},fe={class:"flex-row content-center justify-around"},we={class:"absolute sm:bottom-10 bottom-1/4 right-0 flex justify-around px-5 w-full"};T();var Oe=o({expose:[],setup(e){const t=u(!1),a=()=>{t.value=!0},l=()=>{t.value=!1},s=()=>{(async()=>{ye.value=await me()})(),l()};return(e,o)=>(n(),r("div",null,[d("button",{class:"circle z-10 absolute right-4 top-6 w-8 h-8 rounded-full transition-all duration-500",bg:"gray-800 hover:purple-800 active:purple-700",onClick:a}),t.value?(n(),r("div",be,[d("div",fe,[v(d("input",{class:"text-input",type:"text",placeholder:"api-public-key","onUpdate:modelValue":o[1]||(o[1]=e=>g(_).apiPublicKey=e)},null,512),[[m,g(_).apiPublicKey]]),v(d("input",{class:"text-input",type:"text",placeholder:"api-private-key","onUpdate:modelValue":o[2]||(o[2]=e=>g(_).apiPrivateKey=e)},null,512),[[m,g(_).apiPrivateKey]])]),d("div",we,[d(F,{class:"sm:m-5 sm:w-40",msg:"Confirm",color:"green",onClick:s}),d(F,{class:"sm:m-5 sm:w-40",msg:"Cancel",color:"red",onClick:l})])])):y("",!0)]))}});Oe.__scopeId="data-v-379bd38a";const Re=e=>e;var Le=o({expose:[],props:{msgs:{type:Array,required:!0},data:{type:String,required:!0}},setup(e){const t=e;return(a,l)=>(n(),r("select",{class:"flex-grow w-1 mx-1 px-2 py-1 text-white rounded-lg appearance-none cursor-pointer",bg:"gray-700 hover:purple-700 active:purple-600",sm:"mx-4 px-4 py-3",value:e.data,onInput:l[1]||(l[1]=e=>a.$emit("update:data",g(Re)(e.target).value))},[(n(!0),r(E,null,b(t.msgs,(e=>(n(),r("option",{key:e,class:"bg-gray-700 m-100"},i(e),1)))),128))],40,["value"]))}});x("data-v-adc02c92");const Ce={class:"flex flex-col mx-1"},he={class:"text-base font-bold text-gray-700"},Ae={key:0,class:"text-sm m-1"},Se=d("p",{class:"text-2xl text-gray-700 transition-all duration-70","group-hover":"text-red-500 text-4xl font-extrabold"}," × ",-1);T();var Ie=o({expose:[],props:{text:String,description:String,onCloseHandler:{type:Function,required:!0},timeout:{type:Number,default:1e4},messageType:{type:String,default:k.INFO}},setup(e){const t=e,{progress:a,startTimer:l,pauseTimer:s}=((e,t)=>{let a=0,l=0;const s=u(t),o=f((()=>s.value/t*100)),n=()=>{clearInterval(l),clearTimeout(a)};return w((()=>{n()})),{progress:o,startTimer:()=>{l=window.setInterval((()=>{s.value-=100}),100),a=window.setTimeout(e,s.value+100)},pauseTimer:n}})(t.onCloseHandler,t.timeout);O((()=>{l()}));const{swipedDiff:o,isSwiping:p,startSwipe:v,endSwipe:m}=(()=>{let e=0;const t=u(0),a=u(!1),l=l=>{a.value&&(t.value=e-l.clientX)},s=()=>{a.value=!1,t.value=0,e=0,removeEventListener("mousemove",l)};return O((()=>{addEventListener("mouseup",s)})),w((()=>{s(),removeEventListener("mouseup",s)})),{swipedDiff:t,isSwiping:a,startSwipe:t=>{a.value=!0,e=t.clientX,addEventListener("mousemove",l)},endSwipe:s}})();return c(o,(()=>{Math.abs(o.value)>200&&(m(),t.onCloseHandler())})),(u,c)=>(n(),r("div",{class:["m-2 relative flex justify-between min-h-16 overflow-hidden py-3 px-2 w-full sm:w-72 rounded-lg select-none",t.messageType],onMouseenter:c[2]||(c[2]=(...e)=>g(s)&&g(s)(...e)),onMouseleave:c[3]||(c[3]=(...e)=>g(l)&&g(l)(...e)),onMousedown:c[4]||(c[4]=(...e)=>g(v)&&g(v)(...e)),style:{right:`${g(o)}px`,transition:g(p)?"none":"transition: all .5s linear"}},[d("div",Ce,[d("div",he,i(e.text),1),e.description&&e.description.length>0?(n(),r("div",Ae,i(e.description),1)):y("",!0)]),d("div",{class:"group cursor-pointer",onClick:c[1]||(c[1]=(...t)=>e.onCloseHandler&&e.onCloseHandler(...t))},[Se]),d("div",{class:"absolute h-3.5 -bottom-2 -ml-2 rounded transition-all duration-200 ease-linear w-",gradient:"to-r from-teal-100 via-pink-100 to-purple-300",style:{width:`${g(a)}%`}},null,4)],38))}});Ie.__scopeId="data-v-adc02c92";const Fe=L();var Pe=o({expose:[],setup(e){let t=e=>{let t=e,a=t.getBoundingClientRect().top+window.scrollY-9;t.style.position="absolute",t.style.top=`${a}px`};return(e,a)=>(n(),r("div",null,[d("div",null,[d(R,{name:"bounce",tag:"div",class:"flex flex-col justify-start items-end fixed right-0 top-0 p-4 z-10 <sm:w-1/2",onLeave:g(t)},{default:Fe((()=>[(n(!0),r(E,null,b(g(se),(e=>(n(),r(Ie,C(e,{key:e.id}),null,16)))),128))])),_:1},8,["onLeave"])])]))}});Pe.__scopeId="data-v-65a201fc";var Ke=o({expose:[],setup(e){const t=u(!1);return(e,a)=>(n(),r("div",{class:t.value?"using-mouse":"using-keyborad",onMousedown:a[1]||(a[1]=()=>{t.value=!0}),onKeyup:a[2]||(a[2]=A((()=>{t.value=!1}),["tab"]))},[h(e.$slots,"default")],34))}});const _e=u("0"),ke=u(0),De=u(0),Ne=u(0),Ue=p([0]);let je=0;const Me=f((()=>Ue.reduce(((e,t)=>e+t))/Ue.length)),$e=f((()=>(Ue.reduce(((e,t)=>e+(t-Me.value)**2))/Ue.length)**.5)),He={"btcusdt@aggTrade":e=>{e.T-Ne.value>0&&(_e.value=e.p,Ne.value=e.T,De.value++)},"btcusdt@miniTicker":e=>{const t=parseFloat(e.c);0===ke.value&&(ke.value=t),ke.value-=.03*(ke.value-t),Ue[je]=t,je=(je+1)%30}},Ge=Object.keys(He).join("/");new WebSocket(`wss://fstream.binance.com/stream?streams=${Ge}`).addEventListener("message",(e=>{const{stream:t,data:a}=JSON.parse(e.data);He[t](a)})),u([]);const Be=async(e,t,a,l,s,o=console.log,n=console.log)=>{const r={symbol:e,side:t,type:a,quantity:l,price:s,timeInForce:te.GTC,newOrderRespType:Y.RESULT,timestamp:ue()};return await ce(N.POST,"https://fapi.binance.com/fapi/v1/order",r,o,n,!0,!0)},We=L();x("data-v-48fb6d2c");const Xe=d("div",{class:"fixed bg-gray-800 overflow-hidden -z-10 w-2/1 h-2/1 -top-1/2"},null,-1),Ye={class:"contianer p-1 sm:p-10 min-h-screen bg-gray-800 bg-cover"},qe={class:"mx-auto p-8 max-w-2xl text-center text-white font-mono bg-gray-700 rounded-xl shadow-md overflow-hidden"},ze={class:"m-2 sm:m-8"},Ve={class:"inline-block w-4"},Je={class:"inline-block w-4"},Qe=d("br",null,null,-1),Ze=S("feeRate: "),et={class:"flex justify-around mx-auto max-w-xl"},tt={class:"flex justify-around mx-auto font-mono"};T();var at=o({expose:[],setup(e){const t=u("BTCUSDT"),a=()=>{(async(e,t,a,l,s)=>{await de(Be,"Order Sent")(e,t,a,l,s,(e=>(console.log(e),ne("Order Created",`${e.side} ${e.origQty} at $${e.price}`,k.OK),e.id)),pe)})("BTCUSDT",j.BUY,z.LIMIT,.001,34500.11)},l=u(.036),s=u(.01),o=u(f((()=>parseFloat(_e.value)))),p=[1,2,5,25,50,75,100,125].reduce(((e,t)=>(e[t+"x"]=t,e)),{}),y=u(Object.keys(p)[Object.keys(p).length-1]),x=f((()=>p[y.value]));c(x,(()=>((e,t)=>{de(ve,"Leverage Change Request Sent")(e,t,(e=>{console.log(e),ne("Leverage Changed",`Leverage of ${e.symbol} changed to ${e.leverage}`,k.OK)}),pe)})(t.value,x.value)));const T=[0,.1,.3,.5,.7,1,2,3,5,10],E=T.reduce(((e,t)=>(e[`p - ${t}*std30`]=t,e)),{}),b=u(Object.keys(E)[5]),w=f((()=>o.value-E[b.value]*$e.value)),O=f((()=>w.value*s.value)),R=f((()=>.01*l.value*w.value)),L=f((()=>l.value*x.value*O.value*.01)),C=f((()=>l.value*x.value)),h=T.reduce(((e,t)=>(e[`op - ${t}*std30`]=t,e)),{}),A=u(Object.keys(h)[5]),I=f((()=>-h[A.value]*$e.value)),P=f((()=>I.value/w.value*x.value*100)),_=T.reduce(((e,t)=>(e[`op + ${t}*std30`]=t,e)),{}),D=u(Object.keys(_)[5]),N=f((()=>_[D.value]*$e.value)),U=f((()=>N.value/w.value*x.value*100));return(e,t)=>(n(),r(Ke,null,{default:We((()=>[Xe,d(Oe),d(Pe),d("div",Ye,[d("div",qe,[d(K,{price:g(_e)},null,8,["price"]),d("div",ze,[d("p",null,[S(" priceMeanRolling: "+i(g(ke).toFixed(2))+" ",1),d("span",Ve,"("+i((o.value-g(ke)).toFixed(2))+")",1)]),d("p",null,[S(" priceMean30: "+i(g(Me).toFixed(2))+" ",1),d("span",Je,"("+i((o.value-g(Me)).toFixed(2))+")",1)]),d("p",null,"priceSTD30: "+i(g($e).toFixed(2))+" ("+i((g($e)/g(ke)*100).toFixed(4))+"%)",1),d("p",null,"count: "+i(g(De)),1)]),d("p",null," openPrice: "+i(g(w).toFixed(2))+" ("+i((g(w)-o.value).toFixed(2))+"/"+i(((g(w)-o.value)/o.value*100).toFixed(4))+"%) ",1),d("p",null," noLossPrice: "+i((g(w)+g(R)).toFixed(2))+" / "+i((g(w)-g(R)).toFixed(2))+" ("+i(g(R).toFixed(2))+"/"+i((l.value*g(x)).toFixed(4))+"%) ",1),d("p",null," upPrice: "+i((g(w)+g(N)).toFixed(2))+" ("+i(g(N).toFixed(2))+"/"+i(g(U).toFixed(4))+"%) ",1),d("p",null," downPrice: "+i((g(w)+g(I)).toFixed(2))+" ("+i(g(I).toFixed(2))+"/"+i(g(P).toFixed(4))+"%) ",1),Qe,d("p",null,"leverage: "+i(g(x)+"x"),1),d("p",null,[S(" orderAmount: USDT "+i(g(O).toFixed(2))+" / BTC ",1),v(d("input",{class:"tiny-input",type:"number","onUpdate:modelValue":t[1]||(t[1]=e=>s.value=e)},null,512),[[m,s.value]])]),d("p",null," leveredOrderAmount: USDT "+i((g(O)*g(x)).toFixed(2))+" / BTC "+i((s.value*g(x)).toFixed(2)),1),d("p",null,[Ze,v(d("input",{class:"tiny-input",type:"number","onUpdate:modelValue":t[2]||(t[2]=e=>l.value=e)},null,512),[[m,l.value]])]),d("p",null,"leveredFee: "+i(g(L).toFixed(4))+" ("+i(g(C).toFixed(4))+"%)",1)]),d("div",et,[d(F,{msg:"Long2",color:"green",onClick:a}),d(F,{msg:"Long1",color:"green"}),d(F,{msg:"Short1",color:"red"}),d(F,{msg:"Short2",color:"red"})]),d("div",tt,[d(Le,{msgs:Object.keys(g(p)),data:y.value,"onUpdate:data":t[3]||(t[3]=e=>y.value=e)},null,8,["msgs","data"]),d(Le,{msgs:Object.keys(g(E)),data:b.value,"onUpdate:data":t[4]||(t[4]=e=>b.value=e)},null,8,["msgs","data"]),d(Le,{msgs:Object.keys(g(h)),data:A.value,"onUpdate:data":t[5]||(t[5]=e=>A.value=e)},null,8,["msgs","data"]),d(Le,{msgs:Object.keys(g(_)),data:D.value,"onUpdate:data":t[6]||(t[6]=e=>D.value=e)},null,8,["msgs","data"])])])])),_:1}))}});at.__scopeId="data-v-48fb6d2c";I(at).mount("#app");