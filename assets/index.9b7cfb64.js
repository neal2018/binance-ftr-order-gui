import{o as e,c as n,t,u as r,r as s,a as o,b as a,p as l,d as p,e as c,F as u,f as i}from"./vendor.8e096551.js";!function(e=".",n="__import__"){try{self[n]=new Function("u","return import(u)")}catch(t){const r=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[n]=e=>new Promise(((t,o)=>{const a=new URL(e,r);if(self[n].moduleMap[a])return t(self[n].moduleMap[a]);const l=new Blob([`import * as m from '${a}';`,`${n}.moduleMap['${a}']=m;`],{type:"text/javascript"}),p=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){o(new Error(`Failed to import: ${e}`)),s(p)},onload(){t(self[n].moduleMap[a]),s(p)}});document.head.appendChild(p)})),self[n].moduleMap={}}}("/binance-ftr-order-gui/assets/");const d={expose:[],props:{msg:String,type:String},setup(s){const o="red"===s.type?"bg-green-500":"bg-red-500";return(a,l)=>(e(),n("button",{class:["\n      my-10\n      py-4\n      px-6\n      font-semibold\n      text-gray-100\n      rounded-lg\n      shadow-md\n      focus:outline-none\n      hover:bg-purple-700\n      active:bg-purple-600\n    ",r(o)]},t(s.msg),3))}},g={class:"mx-4 text-5xl font-mono font-semibold text-green-100"},m={expose:[],props:{price:String},setup(r){var l;const p=r,c=s("↓");let u=null!=(l=p.price)?l:"0";return o((()=>{p.price&&(p.price.length>u.length||p.price>u?c.value="↑":c.value="↓",u=p.price)})),(s,o)=>{var l;return e(),n("div",g,[a("p",null,t(null==(l=r.price)?void 0:l.substring(0,9))+" "+t(c.value),1)])}}},f={expose:[],props:{msg:String},setup:t=>(r,s)=>(e(),n("input",{class:"\n      flex-1\n      my-4\n      appearance-none\n      border border-transparent\n      w-full\n      py-2\n      px-4\n      bg-white\n      text-gray-700\n      placeholder-gray-400\n      shadow-md\n      rounded-lg\n      text-base\n      focus:outline-none\n      focus:ring-2 focus:ring-purple-600\n      focus:border-transparent\n    ",type:"text",placeholder:t.msg},null,8,["placeholder"]))};l("data-v-91af9e7c");const v={key:0,class:"setbox fixed top-0 right-0 h-screen w-96 p-6 bg-gray-500 bg-opacity-75"},b={class:"flex-row justify-around content-center"},x={class:"flex justify-around absolute bottom-10 right-0 w-full px-5"};p();const y={expose:[],props:{msg:String,type:String},setup(t){const r=s(!1),o=()=>{r.value=!1},l=()=>{r.value=!0};return(t,s)=>(e(),n(u,null,[a("button",{class:"\n      circle\n      w-8\n      h-8\n      fixed\n      top-6\n      right-4\n      rounded-full\n      bg-gray-800\n      hover:bg-purple-800\n      focus:outline-none\n      active:bg-purple-700\n    ",onClick:l}),r.value?(e(),n("div",v,[a("div",b,[a(f,{msg:"api-public-key"}),a(f,{msg:"api-private-key"})]),a("div",x,[a(d,{class:"m-5 w-40",msg:"Confirm",type:"green",onClick:o}),a(d,{class:"m-5 w-40",msg:"Cancel",type:"red",onClick:o})])])):c("",!0)],64))},__scopeId:"data-v-91af9e7c"},h={class:"contianer min-h-screen bg-gray-800 bg-cover p-10"},w={class:"mx-auto bg-gray-700 rounded-xl shadow-md overflow-hidden max-w-2xl text-white p-8 text-center font-mono"},S=a("div",{class:"m-10"},[a("p",null,"14.3242")],-1),k={class:"max-w-xl mx-auto flex justify-around"};i({expose:[],setup(r){const o=s("0"),l=s(0),p=s(0);let c=0;return new WebSocket("wss://fstream.binance.com/stream?streams=btcusdt@aggTrade/btcusdt@miniTicker").addEventListener("message",(e=>{const{stream:n,data:t}=JSON.parse(e.data);if("btcusdt@aggTrade"===n)t.T-c>500&&(o.value=t.p,c=t.T,p.value++);else if("btcusdt@miniTicker"===n){const e=parseFloat(t.c);0===l.value&&(l.value=e),l.value-=.03*(l.value-e)}})),(r,s)=>(e(),n("div",h,[a(y),a("div",w,[a(m,{price:o.value},null,8,["price"]),S,a("p",null,t(p.value),1),a("p",null,t(l.value.toString().substring(0,9)),1)]),a("div",k,[a(d,{msg:"Long2",type:"green"}),a(d,{msg:"Long1",type:"green"}),a(d,{msg:"Short1",type:"red"}),a(d,{msg:"Short2",type:"red"})])]))}}).mount("#app");