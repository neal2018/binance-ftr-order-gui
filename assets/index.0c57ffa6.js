var e,t,a=Object.defineProperty,l=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,i=(e,t,l)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:l}):e[t]=l;import{d as n,o as r,c as u,a as d,t as c,r as p,b as v,w as m,e as g,f as y,g as E,v as f,u as b,h as x,p as T,i as w,F as L,j as I,k as P,l as h,m as R,T as C,n as O,q as S,s as A,x as F,y as K}from"./vendor.3ad12024.js";var D=n({expose:[],props:{msg:String,color:String},setup(e){const t=e;return(a,l)=>(r(),u("button",{class:["text-md text-gray-100 font-semibold rounded-lg shadow-md","red"===t.color?"bg-red-500":"bg-green-500"],sm:"text-base",bg:"hover:purple-700 active:purple-600"},[d(c(e.msg)+" ",1),p(a.$slots,"default")],2))}});const k={class:"mx-4 text-green-100 font-mono text-5xl font-semibold"};var N=n({expose:[],props:{price:{type:String,default:"0"}},setup(e){const t=e,a=v("↓");return m((()=>t.price),((e,t)=>{e.length>t.length||e>t?a.value="↑":a.value="↓"})),(t,l)=>(r(),u("div",k,[g("p",null,c(e.price.slice(0,9))+" "+c(a.value),1)]))}});const _=y({apiPublicKey:null!=(e=localStorage.getItem("apiPublicKey"))?e:"",apiPrivateKey:null!=(t=localStorage.getItem("apiPrivateKey"))?t:""});var $,M,j,U,q,B,H,G,W,X,Y,z,V,J,Q,Z,ee,te,ae,le,se,oe;(M=$||($={})).INFO="INFO",M.OK="OK",M.ERR="ERR",(U=j||(j={})).GET="GET",U.POST="POST",U.DELETE="DELETE",(B=q||(q={})).SELL="SELL",B.BUY="BUY",function(e){e.reverse=function(t){return t===e.SELL?e.BUY:e.SELL}}(q||(q={})),(G=H||(H={})).BOTH="BOTH",G.LONG="LONG",G.SHORT="SHORT",(X=W||(W={})).TRUE="TRUE",X.FALSE="FALSE",(z=Y||(Y={})).CONTRACT_PRICE="CONTRACT_PRICE",z.MARK_PRICE="MARK_PRICE",(J=V||(V={})).ACK="ACK",J.RESULT="RESULT",(Z=Q||(Q={})).LIMIT="LIMIT",Z.MARKET="MARKET",Z.STOP="STOP",Z.TAKE_PROFIT="TAKE_PROFIT",Z.STOP_MARKET="STOP_MARKET",Z.TAKE_PROFIT_MARKET="TAKE_PROFIT_MARKET",Z.TRAILING_STOP_MARKET="TRAILING_STOP_MARKET",(te=ee||(ee={})).NEW="NEW",te.PARTIALLY_FILLED="PARTIALLY_FILLED",te.FILLED="FILLED",te.CANCELED="CANCELED",te.EXPIRED="EXPIRED",te.NEW_INSURANCE="NEW_INSURANCE",te.NEW_ADL="NEW_ADL",(le=ae||(ae={})).NEW="NEW",le.CANCELED="CANCELED",le.CALCULATED="CALCULATED",le.EXPIRED="EXPIRED",le.TRADE="TRADE",(oe=se||(se={})).GTC="GTC",oe.IOC="IOC",oe.FOK="FOK",oe.GTX="GTX";let ie=0;const ne=v([]),re=(e,t="",a={})=>{let n=ie++;return ne.value.push(((e,t)=>{for(var a in t||(t={}))s.call(t,a)&&i(e,a,t[a]);if(l)for(var a of l(t))o.call(t,a)&&i(e,a,t[a]);return e})({title:e,description:t,id:n,onCloseHandler:()=>de(n)},a)),n},ue=(e,t="",a=$.INFO)=>{re(e,t,{messageType:a})},de=e=>{const t=ne.value.findIndex((t=>e===t.id));ne.value.splice(t,1)},ce={offsetTime:37e3},pe=()=>(new Date).getTime()+ce.offsetTime,ve=async(e,t,a={},l=console.log,s=console.log,o=!1,i=!1)=>{try{let s=o?{"X-MBX-APIKEY":_.apiPublicKey}:{},n=(e=>{let t="";for(let a in e)""!==t&&(t+="&"),t+=a+"="+encodeURIComponent(e[a]);return t})(a),r=i?`${t}?${n}&signature=${await(async(e,t)=>{let a=new TextEncoder,l=await window.crypto.subtle.importKey("raw",a.encode(e),{name:"HMAC",hash:{name:"SHA-256"}},!1,["sign","verify"]),s=await window.crypto.subtle.sign("HMAC",l,a.encode(t)),o=new Uint8Array(s);return Array.prototype.map.call(o,(e=>("00"+e.toString(16)).slice(-2))).join("")})(_.apiPrivateKey,n)}`:`${t}?${n}`;const u=await fetch(r,{method:e,headers:s});if(!u.ok)throw u;const d=await u.json();return console.log("call success",d),l(d)}catch(n){return s(n)}},me=async e=>{if(console.log(e),e instanceof Response){let t=await e.json();console.log(t),ue("Order Error",`${t.code}: ${t.msg}`,$.ERR)}else ue("Network Error",e.message,$.ERR)};(async()=>{await ve(j.GET,"https://fapi.binance.com/fapi/v1/time",{},(e=>{ce.offsetTime=e.serverTime-(new Date).getTime()}))})();const ge=async(e,t)=>(ue("Leverage Change Request Sent"),await(async(e,t,a=console.log,l=console.log)=>{const s={symbol:e,leverage:t,timestamp:pe()};return await ve(j.POST,"https://fapi.binance.com/fapi/v1/leverage",s,a,l,!0,!0)})(e,t,(e=>{console.log(e),ue("Leverage Changed",`Leverage of ${e.symbol} changed to ${e.leverage}`,$.OK)}),me)),ye=async(e,t)=>(ue("CANCEL SENT"),await(async(e,t,a=console.log,l=console.log)=>{const s={symbol:e,orderID:t,timestamp:pe()};return await ve(j.DELETE,"https://fapi.binance.com/fapi/v1/order",s,a,l,!0,!0)})(e,t,(e=>(ue("ORDER CANCELED",`cancel ${e.side} ${e.origQty} at $${e.price}`,$.OK),e.id)),me)),Ee=async()=>await ve(j.POST,"https://fapi.binance.com/fapi/v1/listenKey",{},(e=>e.listenKey),me,!0,!1),fe=async(e,t,a,l,s)=>(ue("ORDER SENT"),await(async(e,t,a,l,s,o=console.log,i=console.log)=>{const n={symbol:e,side:t,type:a,quantity:l,price:s,timeInForce:se.GTC,newOrderRespType:V.RESULT,timestamp:pe()};return a===Q.STOP&&(n.stopPrice=s),await ve(j.POST,"https://fapi.binance.com/fapi/v1/order",n,o,i,!0,!0)})(e,t,a,l,s,(e=>(ue("ORDER CREATED",`${e.side} ${e.origQty} at $${e.price}`,$.OK),e.orderId)),me)),be=y({}),xe=async(e,t,a,l,s,o,i)=>{let n=await fe(e,t,a,l,s);"number"==typeof n&&(be[n]={stopPrice:o,profitPrice:i})},Te=v(!1),we=()=>!!Te.value||(ue("NEED KEYS","please enter public and private keys",$.ERR),!1),Le=v();let Ie,Pe;const he=y({}),Re={},Ce={},Oe={},Se={ORDER_TRADE_UPDATE:async e=>{let t={id:e.o.i,tradePair:e.o.s,status:e.o.X,price:e.o.p,quantity:e.o.q,spentFee:e.o.n,side:e.o.S};if(t.status===ee.FILLED){if(ue("ORDER FILLED",`${t.side} ${t.quantity} at ${t.price}`,$.OK),be[t.id]){let[e,a]=await Promise.all([fe(t.tradePair,q.reverse(t.side),Q.LIMIT,parseFloat(t.quantity),be[t.id].profitPrice),fe(t.tradePair,q.reverse(t.side),Q.STOP,parseFloat(t.quantity),be[t.id].stopPrice)]);console.log("cover id:",e,a),"number"==typeof e&&"number"==typeof a&&(Re[a]={originId:t.id,stop:a,profit:e},Ce[e]={originId:t.id,stop:a,profit:e},Oe[t.id]={originId:t.id,stop:a,profit:e})}Ce[t.id]&&(ye(t.tradePair,Ce[t.id].stop),delete Oe[Ce[t.id].originId],delete Re[Ce[t.id].stop],delete Ce[t.id]),Re[t.id]&&(ye(t.tradePair,Re[t.id].profit),delete Oe[Re[t.id].originId],delete Ce[Re[t.id].profit],delete Re[t.id])}he[e.o.i]=t}};m(Le,(()=>{Te.value=!1,"string"==typeof Le.value&&(Pe||(Pe=window.setInterval(Ee,36e5)),Ie&&Ie.close(),Object.assign(he,{}),Ie=new WebSocket(`wss://fstream.binance.com/ws/${Le.value}`),Ie.addEventListener("message",(e=>{const t=JSON.parse(e.data);console.log(t.e,t),Se[t.e]&&Se[t.e](t)})),Te.value=!0)})),T("data-v-56d4b114");const Ae={key:0,class:"z-10 setbox absolute right-0 top-0 p-6 w-5/12 sm:w-96 h-screen bg-gray-500 bg-opacity-75"},Fe={class:"flex-row content-center justify-around"},Ke={class:"absolute sm:bottom-10 bottom-1/4 right-0 flex justify-around px-5 w-full"};w();var De=n({expose:[],setup(e){const t=v(!1),a=()=>{t.value=!0},l=()=>{t.value=!1},s=()=>{_.apiPublicKey&&_.apiPrivateKey&&(localStorage.setItem("apiPublicKey",_.apiPublicKey),localStorage.setItem("apiPrivateKey",_.apiPrivateKey)),(async()=>{Le.value=await Ee()})(),l()};return(e,o)=>(r(),u("div",null,[g("button",{class:"circle z-10 absolute right-4 top-6 w-8 h-8 rounded-full transition-all duration-500",bg:"gray-800 hover:purple-800 active:purple-700",onClick:a}),t.value?(r(),u("div",Ae,[g("div",Fe,[E(g("input",{class:"text-input",type:"text",placeholder:"api-public-key","onUpdate:modelValue":o[1]||(o[1]=e=>b(_).apiPublicKey=e)},null,512),[[f,b(_).apiPublicKey]]),E(g("input",{class:"text-input",type:"text",placeholder:"api-private-key","onUpdate:modelValue":o[2]||(o[2]=e=>b(_).apiPrivateKey=e)},null,512),[[f,b(_).apiPrivateKey]])]),g("div",Ke,[g(D,{class:"setting-button",msg:"Confirm",color:"green",onClick:s}),g(D,{class:"setting-button",msg:"Cancel",color:"red",onClick:l})])])):x("",!0)]))}});De.__scopeId="data-v-56d4b114";const ke=e=>e,Ne=(e,t)=>{const a=Math.pow(10,t);return Math.round((e+Number.EPSILON)*a)/a};var _e=n({expose:[],props:{msgs:{type:Array,required:!0},data:{type:String,required:!0}},setup(e){const t=e;return(a,l)=>(r(),u("select",{class:"flex-grow w-1 mx-1 px-2 py-1 text-white rounded-lg appearance-none cursor-pointer",bg:"gray-700 hover:purple-700 active:purple-600",sm:"mx-4 px-4 py-3",value:e.data,onInput:l[1]||(l[1]=e=>a.$emit("update:data",b(ke)(e.target).value))},[(r(!0),u(L,null,I(t.msgs,(e=>(r(),u("option",{key:e,class:"bg-gray-700 m-100"},c(e),1)))),128))],40,["value"]))}});T("data-v-28450447");const $e={class:"flex flex-col mx-1"},Me={class:"text-base font-bold text-gray-700"},je={key:0,class:"text-sm m-1"},Ue=g("p",{class:"text-2xl text-gray-700 transition-all duration-70","group-hover":"text-red-500 text-4xl font-extrabold"}," × ",-1);w();var qe=n({expose:[],props:{title:String,description:String,onCloseHandler:{type:Function,required:!0},timeout:{type:Number,default:1e4},messageType:{type:String,default:$.INFO}},setup(e){const t=e,{progress:a,startTimer:l,pauseTimer:s}=((e,t)=>{let a=0,l=0;const s=v(t),o=P((()=>s.value/t*100)),i=()=>{clearInterval(l),clearTimeout(a)};return h((()=>{i()})),{progress:o,startTimer:()=>{l=window.setInterval((()=>{s.value-=100}),100),a=window.setTimeout(e,s.value+100)},pauseTimer:i}})(t.onCloseHandler,t.timeout);R((()=>{l()}));const{swipedDiff:o,isSwiping:i,startSwipe:n,endSwipe:d}=(()=>{let e=0;const t=v(0),a=v(!1),l=l=>{a.value&&(t.value=e-l.clientX)},s=()=>{a.value=!1,t.value=0,e=0,removeEventListener("mousemove",l)};return R((()=>{addEventListener("mouseup",s)})),h((()=>{s(),removeEventListener("mouseup",s)})),{swipedDiff:t,isSwiping:a,startSwipe:t=>{a.value=!0,e=t.clientX,addEventListener("mousemove",l)},endSwipe:s}})();return m(o,(()=>{Math.abs(o.value)>200&&(d(),t.onCloseHandler())})),(d,p)=>(r(),u("div",{class:["m-2 relative flex justify-between min-h-16 overflow-hidden py-3 px-2 w-full sm:w-72 rounded-lg select-none",t.messageType],onMouseenter:p[2]||(p[2]=(...e)=>b(s)&&b(s)(...e)),onMouseleave:p[3]||(p[3]=(...e)=>b(l)&&b(l)(...e)),onMousedown:p[4]||(p[4]=(...e)=>b(n)&&b(n)(...e)),style:{right:`${b(o)}px`,transition:b(i)?"none":"transition: all .5s linear"}},[g("div",$e,[g("div",Me,c(e.title),1),e.description&&e.description.length>0?(r(),u("div",je,c(e.description),1)):x("",!0)]),g("div",{class:"group cursor-pointer",onClick:p[1]||(p[1]=(...t)=>e.onCloseHandler&&e.onCloseHandler(...t))},[Ue]),g("div",{class:"absolute h-3.5 -bottom-2 -ml-2 rounded transition-all duration-200 ease-linear w-",gradient:"to-r from-teal-100 via-pink-100 to-purple-300",style:{width:`${b(a)}%`}},null,4)],38))}});qe.__scopeId="data-v-28450447";const Be=O();var He=n({expose:[],setup(e){let t=e=>{let t=e,a=t.getBoundingClientRect().top+window.scrollY-9;t.style.position="absolute",t.style.top=`${a}px`};return(e,a)=>(r(),u("div",null,[g("div",null,[g(C,{name:"bounce",tag:"div",class:"flex flex-col justify-start items-end fixed right-0 top-0 p-4 z-10 <sm:w-1/2",onLeave:b(t)},{default:Be((()=>[(r(!0),u(L,null,I(b(ne),(e=>(r(),u(qe,S(e,{key:e.id}),null,16)))),128))])),_:1},8,["onLeave"])])]))}});He.__scopeId="data-v-65a201fc";var Ge=n({expose:[],setup(e){const t=v(!1);return(e,a)=>(r(),u("div",{class:t.value?"using-mouse":"using-keyborad",onMousedown:a[1]||(a[1]=()=>{t.value=!0}),onKeyup:a[2]||(a[2]=A((()=>{t.value=!1}),["tab"]))},[p(e.$slots,"default")],34))}});const We=v("BTCUSDT"),Xe=[1,2,5,25,50,75,100,125].reduce(((e,t)=>(e[t+"x"]=t,e)),{}),Ye=v(Object.keys(Xe)[Object.keys(Xe).length-1]),ze=P((()=>Xe[Ye.value]));m((()=>Te.value&&ze.value),(()=>Te.value&&ge(We.value,ze.value)));const Ve=v("0"),Je=v(0),Qe=v(0),Ze=v(0),et=y([0]);let tt=0;const at=P((()=>et.reduce(((e,t)=>e+t))/et.length)),lt=P((()=>(et.reduce(((e,t)=>e+(t-at.value)**2))/et.length)**.5)),st=P((()=>We.value.toLowerCase())),ot=new Map([[`${st.value}@aggTrade`,e=>{e.T-Ze.value>0&&(Ve.value=e.p,Ze.value=e.T,Qe.value++)}],[`${st.value}@miniTicker`,e=>{const t=parseFloat(e.c);0===Je.value&&(Je.value=t),Je.value-=.03*(Je.value-t),et[tt]=t,tt=(tt+1)%30}]]),it=Array.from(ot.keys()).join("/");new WebSocket(`wss://fstream.binance.com/stream?streams=${it}`).addEventListener("message",(e=>{const{stream:t,data:a}=JSON.parse(e.data),l=ot.get(t);l&&l(a)}));const nt=O();T("data-v-b216d6e0");const rt={class:"text-light-100 mx-auto my-5 font-mono"},ut={key:0,class:"container"},dt={class:"text-center flex-grow"},ct=d(" open: "),pt={class:"emphasis"},vt=d(" amout: "),mt={class:"emphasis"},gt=d(" percent: "),yt={class:"emphasis"},Et=d(" stop: "),ft={class:"emphasis"},bt=d(" profit: "),xt={class:"emphasis"},Tt=d("COVER"),wt={key:0,class:"container"},Lt={class:"text-center flex-grow"},It=d(" open: "),Pt={class:"emphasis"},ht=d(" amout: "),Rt={class:"emphasis"},Ct=d(" target: "),Ot={class:"emphasis"},St=d(" init: "),At={class:"emphasis"},Ft=d("CANCEL"),Kt={key:0,class:"container"},Dt={class:"text-center"},kt=d("DONE"),Nt={class:"flex justify-between border-2 text-center py-5 px-2 rounded-xl"},_t={class:"text-center"},$t=d(" > "),Mt=d(" order2stopAndProfit details: "),jt={class:"flex justify-between border-2 text-center py-5 px-2 rounded-xl"},Ut={class:"text-center"},qt=d(" > ");w();var Bt=n({expose:[],setup(e){const t=e=>e.status===ee.NEW||e.status===ee.PARTIALLY_FILLED,a=e=>void 0!==Oe[e.id],l=(e,t=Ve.value,a=4,l=!0)=>{const s=(parseFloat(t)-parseFloat(e.price))/parseFloat(e.price)*100;return(l?s*ze.value:s).toFixed(a)},s=e=>Re[e.id]&&he[Re[e.id].originId].price||Ce[e.id]&&he[Ce[e.id].originId].price||e.price;return(e,o)=>(r(),u("div",rt,[(r(!0),u(L,null,I(b(he),(e=>{var t,s;return r(),u(L,null,[a(e)?(r(),u("div",ut,[g("div",dt,[g("p",null,[ct,g("span",pt,c(e.price),1),vt,g("span",mt,c(e.quantity),1),gt,g("span",yt,c(l(e))+"% ",1)]),g("p",null,[Et,g("span",ft,c(null==(t=b(be)[e.id])?void 0:t.stopPrice),1),bt,g("span",xt,c(null==(s=b(be)[e.id])?void 0:s.profitPrice),1)])]),g(D,{color:"red",class:"p-2",onClick:t=>(e=>{fe(e.tradePair,q.reverse(e.side),Q.LIMIT,parseFloat(e.quantity),parseFloat(Ve.value)),ye(e.tradePair,Oe[e.id].stop),delete Re[Oe[e.id].stop],ye(e.tradePair,Oe[e.id].profit),delete Ce[Oe[e.id].profit],delete Oe[e.id]})(e)},{default:nt((()=>[Tt])),_:2},1032,["onClick"])])):x("",!0)],64)})),256)),(r(!0),u(L,null,I(b(he),(e=>(r(),u(L,null,[!a(e)&&t(e)?(r(),u("div",wt,[g("div",Lt,[g("p",null,[It,g("span",Pt,c(e.price),1),ht,g("span",Rt,c(e.quantity),1),Ct,g("span",Ot,c(-l(e,s(e)))+"% ",1)]),g("p",null,[St,g("span",At,c(s(e)),1)])]),g(D,{color:"red",class:"p-2",onClick:t=>(e=>{we()&&ye(e.tradePair,e.id)})(e)},{default:nt((()=>[Ft])),_:2},1032,["onClick"])])):x("",!0)],64)))),256)),(r(!0),u(L,null,I(b(he),(e=>(r(),u(L,null,[a(e)||t(e)?x("",!0):(r(),u("div",Kt,[g("div",Dt,c(e),1),g(D,{color:"red",class:"p-2 cursor-not-allowed !bg-gray-700"},{default:nt((()=>[kt])),_:1})]))],64)))),256)),(r(!0),u(L,null,I(b(he),(e=>(r(),u("div",Nt,[g("div",_t,c(e),1),$t])))),256)),Mt,(r(!0),u(L,null,I(b(Oe),(e=>(r(),u("div",jt,[g("div",Ut,c(e),1),qt])))),256))]))}});Bt.__scopeId="data-v-b216d6e0";const Ht={class:"h-80"};var Gt=n({expose:[],props:{symbol:{default:"BINANCE:BTCUSDTPERP"}},setup(e){const t=`https://s.tradingview.com/widgetembed/?&symbol=${e.symbol}&interval=1&hidetoptoolbar=1&hidelegend=1&symboledit=1&studies=MASimple@tv-basicstudies%1FMAExp@tv-basicstudies&theme=dark&timezone=Asia/Shanghai&locale=en`;return(e,a)=>(r(),u("div",Ht,[g("iframe",{class:"w-full h-full m-0 p-0",src:t})]))}});const Wt=O();T("data-v-09e1aca6");const Xt=g("div",{class:"fixed bg-gray-800 overflow-hidden -z-10 w-2/1 h-2/1 -top-1/2"},null,-1),Yt={class:"contianer p-1 sm:p-10 min-h-screen bg-gray-800 bg-cover"},zt={class:"mx-auto p-8 max-w-2xl text-center text-white font-mono bg-gray-700 rounded-xl shadow-md overflow-hidden"},Vt={class:"m-2 sm:m-8"},Jt={class:"inline-block w-4"},Qt={class:"inline-block w-4"},Zt=g("br",null,null,-1),ea=d("feeRate: "),ta={class:"flex justify-around mx-auto max-w-xl"},aa={class:"flex justify-around mx-auto font-mono"};w();var la=n({expose:[],setup(e){const t=()=>{we()&&xe(We.value,q.BUY,Q.LIMIT,s.value*ze.value,Ne(m.value,2),Ne(m.value+R.value,2),Ne(m.value+A.value,2))},a=()=>{we()&&xe(We.value,q.SELL,Q.LIMIT,s.value*ze.value,Ne(y.value,2),Ne(y.value-R.value,2),Ne(y.value-A.value,2))},l=v(.036),s=v(8e-5),o=v(P((()=>parseFloat(Ve.value)))),i=[0,.1,.2,.3,.4,.5,.6,.7,.8,.9,1,2,3,5,10],n=i.reduce(((e,t)=>(e[`p - ${t}*std30`]=t,e)),{}),p=v(Object.keys(n)[5]),m=P((()=>o.value-n[p.value]*lt.value)),y=P((()=>o.value+n[p.value]*lt.value)),x=P((()=>m.value*s.value)),T=P((()=>.01*l.value*m.value)),w=P((()=>l.value*ze.value*x.value*.01)),L=P((()=>l.value*ze.value)),I=i.reduce(((e,t)=>(e[`op - ${t}*std30`]=t,e)),{}),h=v(Object.keys(I)[5]),R=P((()=>-I[h.value]*lt.value)),C=P((()=>R.value/m.value*ze.value*100)),O=i.reduce(((e,t)=>(e[`op + ${t}*std30`]=t,e)),{}),S=v(Object.keys(O)[5]),A=P((()=>O[S.value]*lt.value)),K=P((()=>A.value/m.value*ze.value*100));return(e,i)=>(r(),u(Ge,null,{default:Wt((()=>[Xt,g(De),g(He),g("div",Yt,[g("div",zt,[g(Gt,{class:"pb-10"}),g(N,{price:b(Ve)},null,8,["price"]),g("div",Vt,[g("p",null,[d(" priceMeanRolling: "+c(b(Je).toFixed(2))+" ",1),g("span",Jt,"("+c((o.value-b(Je)).toFixed(2))+")",1)]),g("p",null,[d(" priceMean30: "+c(b(at).toFixed(2))+" ",1),g("span",Qt,"("+c((o.value-b(at)).toFixed(2))+")",1)]),g("p",null,"priceSTD30: "+c(b(lt).toFixed(2))+" ("+c((b(lt)/b(Je)*100).toFixed(4))+"%)",1),g("p",null,"count: "+c(b(Qe)),1)]),g("p",null," openPrice: "+c(b(m).toFixed(2))+" ("+c((b(m)-o.value).toFixed(2))+"/"+c(((b(m)-o.value)/o.value*100).toFixed(4))+"%) ",1),g("p",null," noLossPrice: "+c((b(m)+b(T)).toFixed(2))+" / "+c((b(m)-b(T)).toFixed(2))+" ("+c(b(T).toFixed(2))+"/"+c((l.value*b(ze)).toFixed(4))+"%) ",1),g("p",null," upPrice: "+c((b(m)+b(A)).toFixed(2))+" ("+c(b(A).toFixed(2))+"/"+c(b(K).toFixed(4))+"%) ",1),g("p",null," downPrice: "+c((b(m)+b(R)).toFixed(2))+" ("+c(b(R).toFixed(2))+"/"+c(b(C).toFixed(4))+"%) ",1),Zt,g("p",null,"leverage: "+c(b(ze)+"x"),1),g("p",null,[d(" orderAmount: USDT "+c(b(x).toFixed(4))+" / BTC ",1),E(g("input",{class:"tiny-input",type:"number","onUpdate:modelValue":i[1]||(i[1]=e=>s.value=e)},null,512),[[f,s.value]])]),g("p",null," leveredOrderAmount: USDT "+c((b(x)*b(ze)).toFixed(4))+" / BTC "+c((s.value*b(ze)).toFixed(6)),1),g("p",null,[ea,E(g("input",{class:"tiny-input",type:"number","onUpdate:modelValue":i[2]||(i[2]=e=>l.value=e)},null,512),[[f,l.value]])]),g("p",null,"leveredFee: "+c(b(w).toFixed(4))+" ("+c(b(L).toFixed(4))+"%)",1)]),g("div",ta,[g(D,{class:"order-button",msg:"Long2",color:"green",onClick:t}),g(D,{class:"order-button",msg:"Long1",color:"green",onClick:t}),g(D,{class:"order-button",msg:"Short1",color:"red",onClick:a}),g(D,{class:"order-button",msg:"Short2",color:"red",onClick:a})]),g("div",aa,[g(_e,{msgs:Object.keys(b(Xe)),data:b(Ye),"onUpdate:data":i[3]||(i[3]=e=>F(Ye)?Ye.value=e:null)},null,8,["msgs","data"]),g(_e,{msgs:Object.keys(b(n)),data:p.value,"onUpdate:data":i[4]||(i[4]=e=>p.value=e)},null,8,["msgs","data"]),g(_e,{msgs:Object.keys(b(I)),data:h.value,"onUpdate:data":i[5]||(i[5]=e=>h.value=e)},null,8,["msgs","data"]),g(_e,{msgs:Object.keys(b(O)),data:S.value,"onUpdate:data":i[6]||(i[6]=e=>S.value=e)},null,8,["msgs","data"])]),g(Bt)])])),_:1}))}});la.__scopeId="data-v-09e1aca6";K(la).mount("#app");
