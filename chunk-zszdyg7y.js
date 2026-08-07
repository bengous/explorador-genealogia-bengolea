import{sc as F,zc as H}from"./chunk-cnnkx9xz.js";var J={};function N(q,v,A){let f=2166136261;for(let l=0;l<v;l++)f^=q[l].uid,f=Math.imul(f,16777619),f>>>=0;return J[f]||K(q,v,f,A)}function K(q,v,A,f){let l={},C=0;for(let w=0;w<f;w++){let E=w<v?q[w]:F.EMPTY.source;l[C++]=E.source,l[C++]=E.style}let D=new H(l);return J[A]=D,D}
export{N as Eb};
