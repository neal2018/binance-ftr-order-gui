import{d as e,o as n,c as t,t as a,u as s,r as o,w as r,a as l,b as c,e as u,F as p,p as i,f as d,g,h as m}from"./vendor.a0b3c698.js";!function(e=".",n="__import__"){try{self[n]=new Function("u","return import(u)")}catch(t){const a=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[n]=e=>new Promise(((t,o)=>{const r=new URL(e,a);if(self[n].moduleMap[r])return t(self[n].moduleMap[r]);const l=new Blob([`import * as m from '${r}';`,`${n}.moduleMap['${r}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){o(new Error(`Failed to import: ${e}`)),s(c)},onload(){t(self[n].moduleMap[r]),s(c)}});document.head.appendChild(c)})),self[n].moduleMap={}}}("/binance-ftr-order-gui/assets/");var v=e({expose:[],props:{msg:String,color:String},setup(e){const o="red"===e.color?"bg-green-500":"bg-red-500";return(r,l)=>(n(),t("button",{class:["\n      my-10\n      py-4\n      px-6\n      font-semibold\n      text-gray-100\n      rounded-lg\n      shadow-md\n      focus:outline-none\n      hover:bg-purple-700\n      active:bg-purple-600\n    ",s(o)]},a(e.msg),3))}});const x={class:"mx-4 text-5xl font-mono font-semibold text-green-100"};var b=e({expose:[],props:{price:{type:String,default:"0"}},setup(e){const s=e,c=o("↓");return r((()=>s.price),((e,n)=>{e.length>n.length||e>n?c.value="↑":c.value="↓"})),(s,o)=>(n(),t("div",x,[l("p",null,a(e.price.slice(0,9))+" "+a(c.value),1)]))}}),f=e({expose:[],props:{msg:String,data:String},setup:e=>(a,s)=>(n(),t("input",{class:"\n      flex-1\n      my-4\n      appearance-none\n      border border-transparent\n      w-full\n      py-2\n      px-4\n      bg-white\n      text-gray-700\n      placeholder-gray-400\n      shadow-md\n      rounded-lg\n      text-base\n      focus:outline-none\n      focus:ring-2 focus:ring-purple-600\n      focus:border-transparent\n    ",type:"text",placeholder:e.msg,value:e.data,onInput:s[1]||(s[1]=e=>a.$emit("update:data",e.target.value))},null,40,["placeholder","value"]))});const y=c({apiPublicKey:"",apiPrivateKey:""});i("data-v-42e8c880");const h={key:0,class:"setbox fixed top-0 right-0 h-screen w-96 p-6 bg-gray-500 bg-opacity-75"},w={class:"flex-row justify-around content-center"},j={class:"flex justify-around absolute bottom-10 right-0 w-full px-5"};d();var k=e({expose:[],setup(e){const a=o(!1),r=()=>{a.value=!1},c=()=>{a.value=!0};return(e,o)=>(n(),t(p,null,[l("button",{class:"\n      circle\n      w-8\n      h-8\n      fixed\n      top-6\n      right-4\n      rounded-full\n      bg-gray-800\n      hover:bg-purple-800\n      focus:outline-none\n      active:bg-purple-700\n    ",onClick:c}),a.value?(n(),t("div",h,[l("div",w,[l(f,{msg:"api-public-key",data:s(y).apiPublicKey,"onUpdate:data":o[1]||(o[1]=e=>s(y).apiPublicKey=e)},null,8,["data"]),l(f,{msg:"api-private-key",data:s(y).apiPrivateKey,"onUpdate:data":o[2]||(o[2]=e=>s(y).apiPrivateKey=e)},null,8,["data"])]),l("div",j,[l(v,{class:"m-5 w-40",msg:"Confirm",color:"green",onClick:r}),l(v,{class:"m-5 w-40",msg:"Cancel",color:"red",onClick:r})])])):u("",!0)],64))}});k.__scopeId="data-v-42e8c880";const S={class:"\n      mx-4\n      py-3\n      px-4\n      flex-grow\n      rounded-lg\n      appearance-none\n      focus:outline-none\n      bg-gray-700\n      text-white\n      cursor-pointer\n      hover:bg-purple-700\n    "};var L=e({expose:[],props:{msgs:{type:Array,required:!0}},setup(e){const s=e;return(e,o)=>(n(),t("select",S,[(n(!0),t(p,null,g(s.msgs,(e=>(n(),t("option",{key:e,class:"bg-gray-700"},a(e),1)))),128))]))}});const P=o("0"),U=o(0),K=o(0),C=o(0),R={"btcusdt@aggTrade":e=>{e.T-C.value>0&&(P.value=e.p,C.value=e.T,K.value++)},"btcusdt@miniTicker":e=>{const n=parseFloat(e.c);0===U.value&&(U.value=n),U.value-=.03*(U.value-n)}},$=Object.keys(R).join("/");new WebSocket(`wss://fstream.binance.com/stream?streams=${$}`).addEventListener("message",(e=>{const{stream:n,data:t}=JSON.parse(e.data);R[n](t)}));const _={class:"contianer min-h-screen bg-gray-800 bg-cover p-10"},M={class:"mx-auto bg-gray-700 rounded-xl shadow-md overflow-hidden max-w-2xl text-white p-8 text-center font-mono"},O=l("div",{class:"m-10"},[l("p",null,"14.3242")],-1),F={class:"max-w-xl mx-auto flex justify-around"},T={class:"mx-auto flex justify-around"};m(e({expose:[],setup(e){o("A regular sized select input");const r=["2x","5x","25x","50x","75x","100x","125x"];return(e,o)=>(n(),t("div",_,[l(k),l("div",M,[l(b,{price:s(P)},null,8,["price"]),O,l("p",null,a(s(K)),1),l("p",null,a(s(y).apiPublicKey),1),l("p",null,a(s(U).toString().slice(0,9)),1)]),l("div",F,[l(v,{msg:"Long2",color:"green"}),l(v,{msg:"Long1",color:"green"}),l(v,{msg:"Short1",color:"red"}),l(v,{msg:"Short2",color:"red"})]),l("div",T,[l(L,{msgs:r}),l(L,{msgs:r}),l(L,{msgs:r}),l(L,{msgs:r})])]))}})).mount("#app");
