import{o as e,c as n,t,u as a,r as s,w as r,a as o,b as l,p,d as u,e as i,F as c,f as d,g}from"./vendor.b895f6f0.js";!function(e=".",n="__import__"){try{self[n]=new Function("u","return import(u)")}catch(t){const a=new URL(e,location),s=e=>{URL.revokeObjectURL(e.src),e.remove()};self[n]=e=>new Promise(((t,r)=>{const o=new URL(e,a);if(self[n].moduleMap[o])return t(self[n].moduleMap[o]);const l=new Blob([`import * as m from '${o}';`,`${n}.moduleMap['${o}']=m;`],{type:"text/javascript"}),p=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(l),onerror(){r(new Error(`Failed to import: ${e}`)),s(p)},onload(){t(self[n].moduleMap[o]),s(p)}});document.head.appendChild(p)})),self[n].moduleMap={}}}("/binance-ftr-order-gui/assets/");const m={expose:[],props:{msg:String,type:String},setup(s){const r="red"===s.type?"bg-green-500":"bg-red-500";return(o,l)=>(e(),n("button",{class:["\n      my-10\n      py-4\n      px-6\n      font-semibold\n      text-gray-100\n      rounded-lg\n      shadow-md\n      focus:outline-none\n      hover:bg-purple-700\n      active:bg-purple-600\n    ",a(r)]},t(s.msg),3))}},b={class:"mx-4 text-5xl font-mono font-semibold text-green-100"},y={expose:[],props:{price:{type:String,default:"0"}},setup(a){const l=a,p=s("↓");return r((()=>l.price),((e,n)=>{e.length>n.length||e>n?p.value="↑":p.value="↓"})),(s,r)=>(e(),n("div",b,[o("p",null,t(a.price.slice(0,9))+" "+t(p.value),1)]))}},f={expose:[],props:{msg:String,data:String},setup:t=>(a,s)=>(e(),n("input",{class:"\n      flex-1\n      my-4\n      appearance-none\n      border border-transparent\n      w-full\n      py-2\n      px-4\n      bg-white\n      text-gray-700\n      placeholder-gray-400\n      shadow-md\n      rounded-lg\n      text-base\n      focus:outline-none\n      focus:ring-2 focus:ring-purple-600\n      focus:border-transparent\n    ",type:"text",placeholder:t.msg,value:t.data,onInput:s[1]||(s[1]=e=>a.$emit("update:data",e.target.value))},null,40,["placeholder","value"]))},v=l({apiPublicKey:"",apiPrivateKey:""});p("data-v-91b5d168");const x={key:0,class:"setbox fixed top-0 right-0 h-screen w-96 p-6 bg-gray-500 bg-opacity-75"},h={class:"flex-row justify-around content-center"},w={class:"flex justify-around absolute bottom-10 right-0 w-full px-5"};u();const j={expose:[],setup(t){const r=s(!1),l=()=>{r.value=!1},p=()=>{r.value=!0};return(t,s)=>(e(),n(c,null,[o("button",{class:"\n      circle\n      w-8\n      h-8\n      fixed\n      top-6\n      right-4\n      rounded-full\n      bg-gray-800\n      hover:bg-purple-800\n      focus:outline-none\n      active:bg-purple-700\n    ",onClick:p}),r.value?(e(),n("div",x,[o("div",h,[o(f,{msg:"api-public-key",data:a(v).apiPublicKey,"onUpdate:data":s[1]||(s[1]=e=>a(v).apiPublicKey=e)},null,8,["data"]),o(f,{msg:"api-private-key",data:a(v).apiPrivateKey,"onUpdate:data":s[2]||(s[2]=e=>a(v).apiPrivateKey=e)},null,8,["data"])]),o("div",w,[o(m,{class:"m-5 w-40",msg:"Confirm",type:"green",onClick:l}),o(m,{class:"m-5 w-40",msg:"Cancel",type:"red",onClick:l})])])):i("",!0)],64))},__scopeId:"data-v-91b5d168"},k={class:"\n      mx-4\n      py-3\n      px-4\n      flex-grow\n      rounded-lg\n      appearance-none\n      focus:outline-none\n      bg-gray-700\n      text-white\n      cursor-pointer\n      hover:bg-purple-700\n    "},S={expose:[],props:{msgs:Array,type:String},setup(a){const s=a;return(a,r)=>(e(),n("select",k,[(e(!0),n(c,null,d(s.msgs,(a=>(e(),n("option",{key:a,class:"bg-gray-700"},t(a),1)))),128))]))}},L=s("0"),P=s(0),U=s(0),K=s(0),C={"btcusdt@aggTrade":e=>{e.T-K.value>0&&(L.value=e.p,K.value=e.T,U.value++)},"btcusdt@miniTicker":e=>{const n=parseFloat(e.c);0===P.value&&(P.value=n),P.value-=.03*(P.value-n)}},R=Object.keys(C).join("/");new WebSocket(`wss://fstream.binance.com/stream?streams=${R}`).addEventListener("message",(e=>{const{stream:n,data:t}=JSON.parse(e.data);C[n](t)}));const $={class:"contianer min-h-screen bg-gray-800 bg-cover p-10"},_={class:"mx-auto bg-gray-700 rounded-xl shadow-md overflow-hidden max-w-2xl text-white p-8 text-center font-mono"},M=o("div",{class:"m-10"},[o("p",null,"14.3242")],-1),O={class:"max-w-xl mx-auto flex justify-around"},F={class:"mx-auto flex justify-around"};g({expose:[],setup(r){s("A regular sized select input");const l=["2","5","25","50","75","100","125"];return(s,r)=>(e(),n("div",$,[o(j),o("div",_,[o(y,{price:a(L)},null,8,["price"]),M,o("p",null,t(a(U)),1),o("p",null,t(a(v).apiPublicKey),1),o("p",null,t(a(P).toString().slice(0,9)),1)]),o("div",O,[o(m,{msg:"Long2",type:"green"}),o(m,{msg:"Long1",type:"green"}),o(m,{msg:"Short1",type:"red"}),o(m,{msg:"Short2",type:"red"})]),o("div",F,[o(S,{msgs:l}),o(S,{msgs:l}),o(S,{msgs:l}),o(S,{msgs:l})])]))}}).mount("#app");
