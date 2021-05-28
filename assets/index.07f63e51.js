import{d as e,o as a,c as l,t,u as n,r as s,w as o,a as u,b as r,e as d,v as i,f as p,p as c,g as v,F as m,h as g,i as x,j as b,k as y}from"./vendor.8ac913cc.js";!function(e=".",a="__import__"){try{self[a]=new Function("u","return import(u)")}catch(l){const t=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[a]=e=>new Promise(((l,s)=>{const o=new URL(e,t);if(self[a].moduleMap[o])return l(self[a].moduleMap[o]);const u=new Blob([`import * as m from '${o}';`,`${a}.moduleMap['${o}']=m;`],{type:"text/javascript"}),r=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(u),onerror(){s(new Error(`Failed to import: ${e}`)),n(r)},onload(){l(self[a].moduleMap[o]),n(r)}});document.head.appendChild(r)})),self[a].moduleMap={}}}("/binance-ftr-order-gui/assets/");var f=e({expose:[],props:{msg:String,color:String},setup(e){const s="red"===e.color?"bg-green-500":"bg-red-500";return(o,u)=>(a(),l("button",{class:["\n      flex-grow\n      sm:flex-grow-0\n      m-1\n      px-1\n      py-2\n      sm:my-10\n      sm:px-6\n      sm:py-4\n      text-md\n      sm:text-base\n      text-gray-100\n      font-semibold\n      active:bg-purple-600\n      hover:bg-purple-700\n      rounded-lg\n      focus:outline-none\n      shadow-md\n    ",n(s)]},t(e.msg),3))}});const w={class:"mx-4 text-green-100 font-mono text-5xl font-semibold"};var h=e({expose:[],props:{price:{type:String,default:"0"}},setup(e){const n=e,r=s("↓");return o((()=>n.price),((e,a)=>{e.length>a.length||e>a?r.value="↑":r.value="↓"})),(n,s)=>(a(),l("div",w,[u("p",null,t(e.price.slice(0,9))+" "+t(r.value),1)]))}});const F=r({apiPublicKey:"",apiPrivateKey:""});c("data-v-67d666d5");const k={key:0,class:"z-10 setbox fixed right-0 top-0 p-6 w-5/12 sm:w-96 h-screen bg-gray-500 bg-opacity-75"},j={class:"flex-row content-center justify-around"},U={class:"absolute sm:bottom-10 bottom-1/4 right-0 flex justify-around px-5 w-full"};v();var P=e({expose:[],setup(e){const t=s(!1),o=()=>{t.value=!1},r=()=>{t.value=!0};return(e,s)=>(a(),l("div",null,[u("button",{class:"\n        circle\n        z-10\n        fixed\n        right-4\n        top-6\n        w-8\n        h-8\n        bg-gray-800\n        active:bg-purple-700\n        hover:bg-purple-800\n        rounded-full\n        focus:outline-none\n      ",onClick:r}),t.value?(a(),l("div",k,[u("div",j,[d(u("input",{class:"text-input",type:"text",placeholder:"api-public-key","onUpdate:modelValue":s[1]||(s[1]=e=>n(F).apiPublicKey=e)},null,512),[[i,n(F).apiPublicKey]]),d(u("input",{class:"text-input",type:"text",placeholder:"api-private-key","onUpdate:modelValue":s[2]||(s[2]=e=>n(F).apiPrivateKey=e)},null,512),[[i,n(F).apiPrivateKey]])]),u("div",U,[u(f,{class:"sm:m-5 sm:w-40",msg:"Confirm",color:"green",onClick:o}),u(f,{class:"sm:m-5 sm:w-40",msg:"Cancel",color:"red",onClick:o})])])):p("",!0)]))}});P.__scopeId="data-v-67d666d5";const S=e=>e;var L=e({expose:[],props:{msgs:{type:Array,required:!0},data:{type:String,required:!0}},setup(e){const s=e;return(o,u)=>(a(),l("select",{class:"\n      flex-grow\n      w-1\n      mx-1\n      px-2\n      py-1\n      sm:mx-4\n      sm:px-4\n      sm:py-3\n      text-white\n      bg-gray-700\n      hover:bg-purple-700\n      rounded-lg\n      focus:outline-none\n      appearance-none\n      cursor-pointer\n    ",value:e.data,onInput:u[1]||(u[1]=e=>o.$emit("update:data",n(S)(e.target).value))},[(a(!0),l(m,null,g(s.msgs,(e=>(a(),l("option",{key:e,class:"bg-gray-700"},t(e),1)))),128))],40,["value"]))}});const O=u("div",{class:"z-10 setbox fixed right-0 top-0 p-6  h-screen bg-red-500 bg-opacity-75"},null,-1);var T=e({expose:[],setup:e=>(e,t)=>(a(),l("div",null,[O]))});const $={class:"hidden setbox fixed right-0 top-0 p-6 w-5/12 sm:w-72 h-screen bg-gray-500 bg-opacity-75"};var C=e({expose:[],setup:e=>(e,t)=>(a(),l("div",null,[u("div",$,[u(T)])]))});const R=s("0"),_=s(0),M=s(0),K=s(0),V=r([0]);let z=0;const A=x((()=>V.reduce(((e,a)=>e+a))/V.length)),B=x((()=>(V.reduce(((e,a)=>e+(a-A.value)**2))/V.length)**.5)),D={"btcusdt@aggTrade":e=>{e.T-K.value>0&&(R.value=e.p,K.value=e.T,M.value++)},"btcusdt@miniTicker":e=>{const a=parseFloat(e.c);0===_.value&&(_.value=a),_.value-=.03*(_.value-a),V[z]=a,z=(z+1)%30}},E=Object.keys(D).join("/");new WebSocket(`wss://fstream.binance.com/stream?streams=${E}`).addEventListener("message",(e=>{const{stream:a,data:l}=JSON.parse(e.data);D[a](l)})),c("data-v-c88f97a0");const I=u("div",{class:"bg fixed bg-gray-800 overflow-hidden"},null,-1),q={class:"contianer p-1 sm:p-10 min-h-screen bg-gray-800 bg-cover"},J={class:"mx-auto p-8 max-w-2xl text-center text-white font-mono bg-gray-700 rounded-xl shadow-md overflow-hidden"},N={class:"m-2 sm:m-8"},W={class:"inline-block w-4"},G={class:"inline-block w-4"},H=u("br",null,null,-1),Q=b("feeRate: "),X={class:"flex justify-around mx-auto max-w-xl"},Y={class:"flex justify-around mx-auto font-mono"};v();var Z=e({expose:[],setup(e){const o=s(.036),r=s(.01),p=s(x((()=>parseFloat(R.value)))),c=[1,2,5,25,50,75,100,125].reduce(((e,a)=>(e[a+"x"]=a,e)),{}),v=s("125x"),g=s(x((()=>c[v.value]))),y=[0,.1,.2,.3,.5,1,2,3,5,10].reduce(((e,a)=>(e[`p - ${a}*std30`]=a,e)),{}),w=s("p - 1*std30"),F=s(x((()=>p.value-y[w.value]*B.value))),k=s(x((()=>F.value*r.value))),j=s(x((()=>.01*o.value*F.value))),U=s(x((()=>o.value*g.value*k.value*.01))),S=s(x((()=>o.value*g.value))),O=[0,.1,.2,.3,.5,1,2,3,5,10].reduce(((e,a)=>(e[`op - ${a}*std30`]=a,e)),{}),T=s("op - 1*std30"),$=s(x((()=>-O[T.value]*B.value))),K=s(x((()=>$.value/F.value*g.value*100))),V=[0,.1,.2,.3,.5,1,2,3,5,10].reduce(((e,a)=>(e[`op + ${a}*std30`]=a,e)),{}),z=s("op + 1*std30"),D=s(x((()=>V[z.value]*B.value))),E=s(x((()=>D.value/F.value*g.value*100)));return(e,s)=>(a(),l(m,null,[I,u(P),u(C),u("div",q,[u("div",J,[u(h,{price:n(R)},null,8,["price"]),u("div",N,[u("p",null,[b(" priceMeanRolling: "+t(n(_).toFixed(2))+" ",1),u("span",W,"("+t((p.value-n(_)).toFixed(2))+")",1)]),u("p",null,[b(" priceMean30: "+t(n(A).toFixed(2))+" ",1),u("span",G,"("+t((p.value-n(A)).toFixed(2))+")",1)]),u("p",null,"priceSTD30: "+t(n(B).toFixed(2))+" ("+t((n(B)/n(_)*100).toFixed(4))+"%)",1),u("p",null,"count: "+t(n(M)),1)]),u("p",null," openPrice: "+t(F.value.toFixed(2))+" ("+t((F.value-p.value).toFixed(2))+"/"+t(((F.value-p.value)/p.value*100).toFixed(4))+"%) ",1),u("p",null," noLossPrice: "+t((F.value+j.value).toFixed(2))+" / "+t((F.value-j.value).toFixed(2))+" ("+t(j.value.toFixed(2))+"/"+t((o.value*g.value).toFixed(4))+"%) ",1),u("p",null," upPrice: "+t((F.value+D.value).toFixed(2))+" ("+t(D.value.toFixed(2))+"/"+t(E.value.toFixed(4))+"%) ",1),u("p",null," downPrice: "+t((F.value+$.value).toFixed(2))+" ("+t($.value.toFixed(2))+"/"+t(K.value.toFixed(4))+"%) ",1),H,u("p",null,"leverage: "+t(v.value),1),u("p",null,[b(" orderAmount: USDT "+t(k.value.toFixed(2))+" / BTC ",1),d(u("input",{class:"tiny-input",type:"number","onUpdate:modelValue":s[1]||(s[1]=e=>r.value=e)},null,512),[[i,r.value]])]),u("p",null," leveredOrderAmount: USDT "+t((k.value*g.value).toFixed(2))+" / BTC "+t((r.value*g.value).toFixed(2)),1),u("p",null,[Q,d(u("input",{class:"tiny-input",type:"number","onUpdate:modelValue":s[2]||(s[2]=e=>o.value=e)},null,512),[[i,o.value]])]),u("p",null,"leveredFee: "+t(U.value.toFixed(4))+" ("+t(S.value.toFixed(4))+"%)",1)]),u("div",X,[u(f,{msg:"Long2",color:"green"}),u(f,{msg:"Long1",color:"green"}),u(f,{msg:"Short1",color:"red"}),u(f,{msg:"Short2",color:"red"})]),u("div",Y,[u(L,{msgs:Object.keys(n(c)),data:v.value,"onUpdate:data":s[3]||(s[3]=e=>v.value=e)},null,8,["msgs","data"]),u(L,{msgs:Object.keys(n(y)),data:w.value,"onUpdate:data":s[4]||(s[4]=e=>w.value=e)},null,8,["msgs","data"]),u(L,{msgs:Object.keys(n(O)),data:T.value,"onUpdate:data":s[5]||(s[5]=e=>T.value=e)},null,8,["msgs","data"]),u(L,{msgs:Object.keys(n(V)),data:z.value,"onUpdate:data":s[6]||(s[6]=e=>z.value=e)},null,8,["msgs","data"])])])],64))}});Z.__scopeId="data-v-c88f97a0";y(Z).mount("#app");