import{d as e,o as t,c as a,t as l,u as n,r as o,w as s,a as u,b as r,e as i,v as d,f as p,p as v,g as c,F as m,h as g,i as x,j as f,k as b,T as y,l as w,m as h,n as F,q as k}from"./vendor.185fba61.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const l=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,o)=>{const s=new URL(e,l);if(self[t].moduleMap[s])return a(self[t].moduleMap[s]);const u=new Blob([`import * as m from '${s}';`,`${t}.moduleMap['${s}']=m;`],{type:"text/javascript"}),r=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(u),onerror(){o(new Error(`Failed to import: ${e}`)),n(r)},onload(){a(self[t].moduleMap[s]),n(r)}});document.head.appendChild(r)})),self[t].moduleMap={}}}("/binance-ftr-order-gui/assets/");var S=e({expose:[],props:{msg:String,color:String},setup(e){const o="red"===e.color?"bg-green-500":"bg-red-500";return(s,u)=>(t(),a("button",{class:["\n      flex-grow\n      m-1\n      px-1\n      py-2\n      text-md text-gray-100\n      font-semibold\n      rounded-lg\n      shadow-md\n      hover:bg-purple-700\n      focus:outline-none\n    ",n(o)],sm:"flex-grow-0 px-6 py-4 my-10 text-base",active:"bg-purple-600"},l(e.msg),3))}});const j={class:"mx-4 text-green-100 font-mono text-5xl font-semibold"};var T=e({expose:[],props:{price:{type:String,default:"0"}},setup(e){const n=e,r=o("↓");return s((()=>n.price),((e,t)=>{e.length>t.length||e>t?r.value="↑":r.value="↓"})),(n,o)=>(t(),a("div",j,[u("p",null,l(e.price.slice(0,9))+" "+l(r.value),1)]))}});const U=r({apiPublicKey:"",apiPrivateKey:""});v("data-v-450448f0");const C={key:0,class:"z-10 setbox fixed right-0 top-0 p-6 w-5/12 sm:w-96 h-screen bg-gray-500 bg-opacity-75"},L={class:"flex-row content-center justify-around"},M={class:"absolute sm:bottom-10 bottom-1/4 right-0 flex justify-around px-5 w-full"};c();var P=e({expose:[],setup(e){const l=o(!1),s=()=>{l.value=!1},r=()=>{l.value=!0};return(e,o)=>(t(),a("div",null,[u("button",{class:"circle z-10 fixed right-4 top-6 w-8 h-8 bg-gray-800 rounded-full hover:bg-purple-800 focus:outline-none",active:"bg-purple-700",onClick:r}),l.value?(t(),a("div",C,[u("div",L,[i(u("input",{class:"text-input",type:"text",placeholder:"api-public-key","onUpdate:modelValue":o[1]||(o[1]=e=>n(U).apiPublicKey=e)},null,512),[[d,n(U).apiPublicKey]]),i(u("input",{class:"text-input",type:"text",placeholder:"api-private-key","onUpdate:modelValue":o[2]||(o[2]=e=>n(U).apiPrivateKey=e)},null,512),[[d,n(U).apiPrivateKey]])]),u("div",M,[u(S,{class:"sm:m-5 sm:w-40",msg:"Confirm",color:"green",onClick:s}),u(S,{class:"sm:m-5 sm:w-40",msg:"Cancel",color:"red",onClick:s})])])):p("",!0)]))}});P.__scopeId="data-v-450448f0";const $=e=>e;var _=e({expose:[],props:{msgs:{type:Array,required:!0},data:{type:String,required:!0}},setup(e){const o=e;return(s,u)=>(t(),a("select",{class:"\n      flex-grow\n      w-1\n      mx-1\n      px-2\n      py-1\n      text-white\n      bg-gray-700\n      hover:bg-purple-700\n      focus:outline-none\n      rounded-lg\n      appearance-none\n      cursor-pointer\n    ",active:"bg-purple-600",sm:"mx-4 px-4 py-3",value:e.data,onInput:u[1]||(u[1]=e=>s.$emit("update:data",n($)(e.target).value))},[(t(!0),a(m,null,g(o.msgs,(e=>(t(),a("option",{key:e,class:"bg-gray-700 m-100"},l(e),1)))),128))],40,["value"]))}});const O={class:"flex items-center"},R={class:"font-sans leading-5 flex flex-col text-cool-gray-600"},E={class:"mb-1 text-base font-bold"},I={key:0,class:"text-sm font-normal"},K=u("p",{class:"\n          text-2xl\n          font-normal\n          relative\n          ml-2.5\n          text-gray-700\n          transition-all\n          duration-200\n          shadow-2xl\n          group-hover:text-red-500 group-hover:text-4xl group-hover:font-extrabold\n        "}," × ",-1);var D=e({expose:[],props:{text:String,description:String,onCloseHandler:{type:Function,required:!0},timeout:{type:Number,default:1e4}},setup(e){const r=e,{progress:i,startTimer:d,pauseTimer:v}=((e,t)=>{let a=0,l=0;const n=o(t),s=x((()=>n.value/t*100)),u=()=>{clearInterval(l),clearTimeout(a)};return f((()=>{u()})),{progress:s,startTimer:()=>{l=window.setInterval((()=>{n.value-=100}),100),a=window.setTimeout(e,n.value+100)},pauseTimer:u}})(r.onCloseHandler,r.timeout);b((()=>{d()}));const{swipedDiff:c,isSwiping:m,startSwipe:g,endSwipe:y}=(()=>{let e=0;const t=o(0),a=o(!1),l=l=>{a.value&&(t.value=e-l.clientX)},n=()=>{a.value=!1,t.value=0,e=0,removeEventListener("mousemove",l)};return b((()=>{addEventListener("mouseup",n)})),f((()=>{n(),removeEventListener("mouseup",n)})),{swipedDiff:t,isSwiping:a,startSwipe:t=>{a.value=!0,e=t.clientX,addEventListener("mousemove",l)},endSwipe:n}})();return s(c,(()=>{Math.abs(c.value)>100&&(y(),r.onCloseHandler())})),(o,s)=>(t(),a("div",{class:"\n      bg-light-200\n      m-2\n      relative\n      flex\n      justify-between\n      min-h-16\n      box-border\n      overflow-hidden\n      py-3\n      px-2\n      min-w-[19.5rem]\n      max-w-[30rem]\n      w-max\n      break-words\n      rounded-lg\n      select-none\n    ",onMouseenter:s[2]||(s[2]=(...e)=>n(v)&&n(v)(...e)),onMouseleave:s[3]||(s[3]=(...e)=>n(d)&&n(d)(...e)),onMousedown:s[4]||(s[4]=(...e)=>n(g)&&n(g)(...e)),style:{right:`${n(c)}px`,transition:n(m)?"none":"right 0.3s ease-out"}},[u("div",O,[u("div",R,[u("div",E,l(e.text),1),e.description&&e.description.length>0?(t(),a("div",I,l(e.description),1)):p("",!0)])]),u("div",{class:"group cursor-pointer",onClick:s[1]||(s[1]=(...t)=>e.onCloseHandler&&e.onCloseHandler(...t))},[K]),u("div",{class:"\n        absolute\n        h-3.5\n        -bottom-2\n        -ml-2\n        rounded\n        transition-all\n        duration-200\n        ease-linear\n        bg-gradient-to-r\n        from-teal-300\n        via-pink-100\n        to-indigo-400\n      ",style:{width:`${n(i)}%`}},null,4)],36))}});const H=o([]),q=w();var z=e({expose:[],setup:e=>(e,l)=>(t(),a("div",null,[u("div",null,[u(y,{name:"bounce",tag:"div",class:"flex flex-col justify-start items-end fixed right-0 top-0 p-4 z-10"},{default:q((()=>[(t(!0),a(m,null,g(n(H),(e=>(t(),a(D,h(e,{key:e.id}),null,16)))),128))])),_:1})])]))});z.__scopeId="data-v-191b3df0";const V=o("0"),A=o(0),B=o(0),N=o(0),X=r([0]);let J=0;const W=x((()=>X.reduce(((e,t)=>e+t))/X.length)),G=x((()=>(X.reduce(((e,t)=>e+(t-W.value)**2))/X.length)**.5)),Q={"btcusdt@aggTrade":e=>{e.T-N.value>0&&(V.value=e.p,N.value=e.T,B.value++)},"btcusdt@miniTicker":e=>{const t=parseFloat(e.c);0===A.value&&(A.value=t),A.value-=.03*(A.value-t),X[J]=t,J=(J+1)%30}},Y=Object.keys(Q).join("/");new WebSocket(`wss://fstream.binance.com/stream?streams=${Y}`).addEventListener("message",(e=>{const{stream:t,data:a}=JSON.parse(e.data);Q[t](a)})),v("data-v-9e05ef22");const Z=u("div",{class:"fixed bg-gray-800 overflow-hidden -z-10 w-2/1 h-2/1 -top-1/2"},null,-1),ee={class:"contianer p-1 sm:p-10 min-h-screen bg-gray-800 bg-cover"},te={class:"mx-auto p-8 max-w-2xl text-center text-white font-mono bg-gray-700 rounded-xl shadow-md overflow-hidden"},ae={class:"m-2 sm:m-8"},le={class:"inline-block w-4"},ne={class:"inline-block w-4"},oe=u("br",null,null,-1),se=F("feeRate: "),ue={class:"flex justify-around mx-auto max-w-xl"},re={class:"flex justify-around mx-auto font-mono"};c();var ie=e({expose:[],setup(e){const s=o(.036),r=o(.01),p=o(x((()=>parseFloat(V.value)))),v=[1,2,5,25,50,75,100,125].reduce(((e,t)=>(e[t+"x"]=t,e)),{}),c=o("125x"),g=o(x((()=>v[c.value]))),f=[0,.1,.3,.5,.7,1,2,3,5,10].reduce(((e,t)=>(e[`p - ${t}*std30`]=t,e)),{}),b=o("p - 1*std30"),y=o(x((()=>p.value-f[b.value]*G.value))),w=o(x((()=>y.value*r.value))),h=o(x((()=>.01*s.value*y.value))),k=o(x((()=>s.value*g.value*w.value*.01))),j=o(x((()=>s.value*g.value))),U=[0,.1,.3,.5,.7,1,2,3,5,10].reduce(((e,t)=>(e[`op - ${t}*std30`]=t,e)),{}),C=o("op - 1*std30"),L=o(x((()=>-U[C.value]*G.value))),M=o(x((()=>L.value/y.value*g.value*100))),$=[0,.1,.3,.5,.7,1,2,3,5,10].reduce(((e,t)=>(e[`op + ${t}*std30`]=t,e)),{}),O=o("op + 1*std30"),R=o(x((()=>$[O.value]*G.value))),E=o(x((()=>R.value/y.value*g.value*100)));return(e,o)=>(t(),a(m,null,[Z,u(P),u(z),u("div",ee,[u("div",te,[u(T,{price:n(V)},null,8,["price"]),u("div",ae,[u("p",null,[F(" priceMeanRolling: "+l(n(A).toFixed(2))+" ",1),u("span",le,"("+l((p.value-n(A)).toFixed(2))+")",1)]),u("p",null,[F(" priceMean30: "+l(n(W).toFixed(2))+" ",1),u("span",ne,"("+l((p.value-n(W)).toFixed(2))+")",1)]),u("p",null,"priceSTD30: "+l(n(G).toFixed(2))+" ("+l((n(G)/n(A)*100).toFixed(4))+"%)",1),u("p",null,"count: "+l(n(B)),1)]),u("p",null," openPrice: "+l(y.value.toFixed(2))+" ("+l((y.value-p.value).toFixed(2))+"/"+l(((y.value-p.value)/p.value*100).toFixed(4))+"%) ",1),u("p",null," noLossPrice: "+l((y.value+h.value).toFixed(2))+" / "+l((y.value-h.value).toFixed(2))+" ("+l(h.value.toFixed(2))+"/"+l((s.value*g.value).toFixed(4))+"%) ",1),u("p",null," upPrice: "+l((y.value+R.value).toFixed(2))+" ("+l(R.value.toFixed(2))+"/"+l(E.value.toFixed(4))+"%) ",1),u("p",null," downPrice: "+l((y.value+L.value).toFixed(2))+" ("+l(L.value.toFixed(2))+"/"+l(M.value.toFixed(4))+"%) ",1),oe,u("p",null,"leverage: "+l(c.value),1),u("p",null,[F(" orderAmount: USDT "+l(w.value.toFixed(2))+" / BTC ",1),i(u("input",{class:"tiny-input",type:"number","onUpdate:modelValue":o[1]||(o[1]=e=>r.value=e)},null,512),[[d,r.value]])]),u("p",null," leveredOrderAmount: USDT "+l((w.value*g.value).toFixed(2))+" / BTC "+l((r.value*g.value).toFixed(2)),1),u("p",null,[se,i(u("input",{class:"tiny-input",type:"number","onUpdate:modelValue":o[2]||(o[2]=e=>s.value=e)},null,512),[[d,s.value]])]),u("p",null,"leveredFee: "+l(k.value.toFixed(4))+" ("+l(j.value.toFixed(4))+"%)",1)]),u("div",ue,[u(S,{msg:"Long2",color:"green"}),u(S,{msg:"Long1",color:"green"}),u(S,{msg:"Short1",color:"red"}),u(S,{msg:"Short2",color:"red"})]),u("div",re,[u(_,{msgs:Object.keys(n(v)),data:c.value,"onUpdate:data":o[3]||(o[3]=e=>c.value=e)},null,8,["msgs","data"]),u(_,{msgs:Object.keys(n(f)),data:b.value,"onUpdate:data":o[4]||(o[4]=e=>b.value=e)},null,8,["msgs","data"]),u(_,{msgs:Object.keys(n(U)),data:C.value,"onUpdate:data":o[5]||(o[5]=e=>C.value=e)},null,8,["msgs","data"]),u(_,{msgs:Object.keys(n($)),data:O.value,"onUpdate:data":o[6]||(o[6]=e=>O.value=e)},null,8,["msgs","data"])])])],64))}});ie.__scopeId="data-v-9e05ef22";k(ie).mount("#app");