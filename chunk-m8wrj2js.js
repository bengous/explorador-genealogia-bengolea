import{$b as tJ,Ac as FQ,Bc as XQ,Cc as b,Dc as DJ,Ec as KQ,Tb as YQ,cc as eJ,dc as LJ,ec as JQ,uc as nJ,vc as fJ,xc as hJ}from"./chunk-jf7pavr6.js";var S=new Set,n=!1;function l(J,Q,W=2){let $=Q&&Q.length,K=$?Q[0]*W:J.length;if(S.size)S.clear();let Z=NJ(J,0,K,W,!0),F=[];if(!Z||Z.next===Z.prev)return F;let R=0,X=0,Y=0;if($)Z=AQ(J,Q,Z,W);if(J.length>80*W){R=J[0],X=J[1];let H=R,q=X;for(let G=W;G<K;G+=W){let A=J[G],D=J[G+1];if(A<R)R=A;if(D<X)X=D;if(A>H)H=A;if(D>q)q=D}Y=Math.max(H-R,q-X),Y=Y!==0?32767/Y:0}return r(Z,F,R,X,Y),F}function NJ(J,Q,W,$,K){let Z=null;if(K===wQ(J,Q,W,$)>0)for(let F=Q;F<W;F+=$)Z=qJ(F/$|0,J[F],J[F+1],Z);else for(let F=W-$;F>=Q;F-=$)Z=qJ(F/$|0,J[F],J[F+1],Z);if(Z&&y(Z,Z.next))g(Z),Z=Z.next;return Z}function z(J,Q=J){let W=Q===J,$=J,K;do if(K=!1,$!==$.next&&(S.size===0||!S.has($))&&(y($,$.next)||E($.prev,$,$.next)===0)){if(W||$===Q)Q=$.prev;n=!0,g($),$=$.prev,K=!0}else if(W||$!==Q)$=$.next,K=!W;while(K||$!==Q);return Q}function r(J,Q,W,$,K){if(K)LQ(J,W,$,K);let Z=J,F=!1;while(J.prev!==J.next){let{prev:R,next:X}=J;if(E(R,J,X)<0&&(K?UQ(J,W,$,K):DQ(J))){Q.push(R.i,J.i,X.i),g(J),J=X,Z=X;continue}if(J=X,J===Z){if(n=!1,J=z(J),n){Z=J;continue}if(!F){J=HQ(J,Q),Z=J,F=!0;continue}GQ(J,Q,W,$,K);break}}}function DQ(J){let Q=J.prev,W=J,$=J.next,K=Q.x,Z=W.x,F=$.x,R=Q.y,X=W.y,Y=$.y,H=Math.min(K,Z,F),q=Math.min(R,X,Y),G=Math.max(K,Z,F),A=Math.max(R,X,Y),D=$.next;while(D!==Q){if(D.x>=H&&D.x<=G&&D.y>=q&&D.y<=A&&!(K===D.x&&R===D.y)&&m(K,R,Z,X,F,Y,D.x,D.y)&&E(D.prev,D,D.next)>=0)return!1;D=D.next}return!0}function UQ(J,Q,W,$){let K=J.prev,Z=J,F=J.next,R=K.x,X=Z.x,Y=F.x,H=K.y,q=Z.y,G=F.y,A=Math.min(R,X,Y),D=Math.min(H,q,G),P=Math.max(R,X,Y),k=Math.max(H,q,G),_=e(A,D,Q,W,$),j=e(P,k,Q,W,$),U=J.prevZ;while(U&&U.z>=_){if(U.x>=A&&U.x<=P&&U.y>=D&&U.y<=k&&U!==F&&!(R===U.x&&H===U.y)&&m(R,H,X,q,Y,G,U.x,U.y)&&E(U.prev,U,U.next)>=0)return!1;U=U.prevZ}let N=J.nextZ;while(N&&N.z<=j){if(N.x>=A&&N.x<=P&&N.y>=D&&N.y<=k&&N!==F&&!(R===N.x&&H===N.y)&&m(R,H,X,q,Y,G,N.x,N.y)&&E(N.prev,N,N.next)>=0)return!1;N=N.nextZ}return!0}function HQ(J,Q){let W=J,$=!1;do{let K=W.prev,Z=W.next.next;if(EJ(K,W,W.next,Z,!1)&&B(K,Z)&&B(Z,K))Q.push(K.i,W.i,Z.i),g(W),g(W.next),W=J=Z,$=!0;W=W.next}while(W!==J);return $?z(W):W}function GQ(J,Q,W,$,K){let Z=J;do{let F=Z.next.next;while(F!==Z.prev){if(Z.i!==F.i&&vQ(Z,F)){let R=kJ(Z,F);Z=z(Z,Z.next),R=z(R,R.next),r(Z,Q,W,$,K),r(R,Q,W,$,K);return}F=F.next}Z=Z.next}while(Z!==J)}var i=!1;function AQ(J,Q,W,$){let K=[];for(let Z=0,F=Q.length;Z<F;Z++){let R=Q[Z]*$,X=Z<F-1?Q[Z+1]*$:J.length,Y=NJ(J,R,X,$,!1);if(Y===Y.next)S.add(Y);K.push(jQ(Y))}K.sort(qQ),PQ(J.length/$,Q.length),CJ(W,W),i=!0;for(let Z=0;Z<K.length;Z++)W=NQ(K[Z],W);return i=!1,z(W)}function qQ(J,Q){return J.x-Q.x||J.y-Q.y||(J.next.y-J.y)/(J.next.x-J.x)-(Q.next.y-Q.y)/(Q.next.x-Q.x)}function NQ(J,Q){let W=EQ(J,Q);if(!W)return Q;let $=kJ(W,J),K=$.next;return CJ(W,K.next),z($,$.next),z(W,W.next)}var PJ=16,C=new Float64Array(0),c=0,a=[],t=[];function PQ(J,Q){let W=Math.ceil((J+2*Q)/PJ)+Q+2;if(C.length<W*4)C=new Float64Array(W*4);c=0}function CJ(J,Q){let W=J;do{let $=c++;a[$]=W;let K=1/0,Z=1/0,F=-1/0,R=-1/0,X=0;do{let H=W.next;if(W.z=$,W.x<K)K=W.x;if(W.x>F)F=W.x;if(W.y<Z)Z=W.y;if(W.y>R)R=W.y;if(H.x<K)K=H.x;if(H.x>F)F=H.x;if(H.y<Z)Z=H.y;if(H.y>R)R=H.y;W=H}while(++X<PJ&&W!==Q);t[$]=W;let Y=$*4;C[Y]=K,C[Y+1]=Z,C[Y+2]=F,C[Y+3]=R}while(W!==Q)}function CQ(J,Q){let W=J.z*4;if(Q.x<C[W])C[W]=Q.x;if(Q.y<C[W+1])C[W+1]=Q.y;if(Q.x>C[W+2])C[W+2]=Q.x;if(Q.y>C[W+3])C[W+3]=Q.y}function GJ(J){let Q=t[J];while(Q.prev.next!==Q)Q=Q.next;return t[J]=Q,Q}function AJ(J){let Q=a[J];while(Q.prev.next!==Q)Q=Q.next;return a[J]=Q,Q}function EQ(J,Q){let W=Q,$=J.x,K=J.y,Z=-1/0,F;if(y(J,W))return W;for(let G=0,A=0;G<c;G++,A+=4){if(K<C[A+1]||K>C[A+3]||C[A]>$||C[A+2]<=Z)continue;let D=GJ(G);W=AJ(G);do{if(W.prev.next===W){if(y(J,W.next))return W.next;else if(K<=W.y&&K>=W.next.y&&W.next.y!==W.y){let P=W.x+(K-W.y)*(W.next.x-W.x)/(W.next.y-W.y);if(P<=$&&P>Z){if(Z=P,F=W.x<W.next.x?W:W.next,P===$)return F}}}W=W.next}while(W!==D)}if(!F)return null;let{x:R,y:X}=F,Y=Math.min(K,X),H=Math.max(K,X),q=1/0;for(let G=0,A=0;G<c;G++,A+=4){if(C[A+2]<R||C[A]>$||C[A+3]<Y||C[A+1]>H)continue;let D=GJ(G);W=AJ(G);do{if(W.prev.next===W&&$>=W.x&&W.x>=R&&$!==W.x&&m(K<X?$:Z,K,R,X,K<X?Z:$,K,W.x,W.y)){let P=Math.abs(K-W.y)/($-W.x);if((B(W,J)||W.y===K&&W.next.y===K&&W.next.x>$)&&(P<q||P===q&&(W.x>F.x||W.x===F.x&&kQ(F,W))))F=W,q=P}W=W.next}while(W!==D)}return F}function kQ(J,Q){return E(J.prev,J,Q.prev)<0&&E(Q.next,J,J.next)<0}var L=[],O=[],M=new Uint32Array(0),T=new Uint32Array(0),I=new Uint32Array(256);function LQ(J,Q,W,$){let K=J,Z=0;do K.z=e(K.x,K.y,Q,W,$),L[Z++]=K,K=K.next;while(K!==J);VQ(Z);let F=null;for(let R=0;R<Z;R++){let X=L[R];if(X.prevZ=F,F)F.nextZ=X;F=X}F.nextZ=null}function VQ(J){if(J<=32){for(let Q=1;Q<J;Q++){let W=L[Q],$=W.z,K=Q-1;while(K>=0&&L[K].z>$)L[K+1]=L[K],K--;L[K+1]=W}return}if(M.length<J)M=new Uint32Array(J),T=new Uint32Array(J),O=Array(J);for(let Q=0;Q<J;Q++)M[Q]=L[Q].z;x(J,L,M,O,T,0),x(J,O,T,L,M,8),x(J,L,M,O,T,16),x(J,O,T,L,M,24)}function x(J,Q,W,$,K,Z){I.fill(0);for(let R=0;R<J;R++)I[W[R]>>>Z&255]++;let F=0;for(let R=0;R<256;R++){let X=I[R];I[R]=F,F+=X}for(let R=0;R<J;R++){let X=W[R],Y=I[X>>>Z&255]++;$[Y]=Q[R],K[Y]=X}}function e(J,Q,W,$,K){return J=(J-W)*K|0,Q=(Q-$)*K|0,J=(J|J<<8)&16711935,J=(J|J<<4)&252645135,J=(J|J<<2)&858993459,J=(J|J<<1)&1431655765,Q=(Q|Q<<8)&16711935,Q=(Q|Q<<4)&252645135,Q=(Q|Q<<2)&858993459,Q=(Q|Q<<1)&1431655765,J|Q<<1}function jQ(J){let Q=J,W=J;do{if(Q.x<W.x||Q.x===W.x&&Q.y<W.y)W=Q;Q=Q.next}while(Q!==J);return W}function m(J,Q,W,$,K,Z,F,R){return(K-F)*(Q-R)>=(J-F)*(Z-R)&&(J-F)*($-R)>=(W-F)*(Q-R)&&(W-F)*(Z-R)>=(K-F)*($-R)}function vQ(J,Q){let W=y(J,Q)&&E(J.prev,J,J.next)>0&&E(Q.prev,Q,Q.next)>0;return J.next.i!==Q.i&&(W||B(J,Q)&&B(Q,J)&&(E(J.prev,J,Q.prev)!==0||E(J,Q.prev,Q)!==0))&&!MQ(J,Q)&&(W||zQ(J,Q))}function E(J,Q,W){return(Q.y-J.y)*(W.x-Q.x)-(Q.x-J.x)*(W.y-Q.y)}function y(J,Q){return J.x===Q.x&&J.y===Q.y}function EJ(J,Q,W,$,K=!0){let Z=E(J,Q,W),F=E(J,Q,$),R=E(W,$,J),X=E(W,$,Q);if((Z>0&&F<0||Z<0&&F>0)&&(R>0&&X<0||R<0&&X>0))return!0;if(!K)return!1;if(Z===0&&p(J,W,Q))return!0;if(F===0&&p(J,$,Q))return!0;if(R===0&&p(W,J,$))return!0;if(X===0&&p(W,Q,$))return!0;return!1}function p(J,Q,W){return Q.x<=Math.max(J.x,W.x)&&Q.x>=Math.min(J.x,W.x)&&Q.y<=Math.max(J.y,W.y)&&Q.y>=Math.min(J.y,W.y)}function MQ(J,Q){let W=Math.min(J.x,Q.x),$=Math.max(J.x,Q.x),K=Math.min(J.y,Q.y),Z=Math.max(J.y,Q.y),F=J;do{let R=F.next;if(F.x>$&&R.x>$||F.x<W&&R.x<W||F.y>Z&&R.y>Z||F.y<K&&R.y<K){F=R;continue}if(F.i!==J.i&&R.i!==J.i&&F.i!==Q.i&&R.i!==Q.i&&EJ(F,R,J,Q))return!0;F=R}while(F!==J);return!1}function B(J,Q){return E(J.prev,J,J.next)<0?E(J,Q,J.next)>=0&&E(J,J.prev,Q)>=0:E(J,Q,J.prev)<0||E(J,J.next,Q)<0}function zQ(J,Q){let W=J,$=!1,K=(J.x+Q.x)/2,Z=(J.y+Q.y)/2;do{let F=W.next;if(W.y>Z!==F.y>Z&&K<(F.x-W.x)*(Z-W.y)/(F.y-W.y)+W.x)$=!$;W=F}while(W!==J);return $}function kJ(J,Q){let W=JJ(J.i,J.x,J.y),$=JJ(Q.i,Q.x,Q.y),K=J.next,Z=Q.prev;return J.next=Q,Q.prev=J,W.next=K,K.prev=W,$.next=W,W.prev=$,Z.next=$,$.prev=Z,$}function qJ(J,Q,W,$){let K=JJ(J,Q,W);if(!$)K.prev=K,K.next=K;else K.next=$.next,K.prev=$,$.next.prev=K,$.next=K;return K}function g(J){if(J.next.prev=J.prev,J.prev.next=J.next,J.prevZ)J.prevZ.nextZ=J.nextZ;if(J.nextZ)J.nextZ.prevZ=J.prevZ;if(i)CQ(J.prev,J.next)}function JJ(J,Q,W){return{i:J,x:Q,y:W,prev:null,next:null,z:0,prevZ:null,nextZ:null}}function wQ(J,Q,W,$){let K=0;for(let Z=Q,F=W-$;Z<W;Z+=$)K+=(J[F]-J[Z])*(J[Z+1]+J[F+1]),F=Z;return K}var oQ=l.default||l;function QJ(J,Q,W){if(J)for(let $ in J){let K=$.toLocaleLowerCase(),Z=Q[K];if(Z){let F=J[$];if($==="header")F=F.replace(/@in\s+[^;]+;\s*/g,"").replace(/@out\s+[^;]+;\s*/g,"");if(W)Z.push(`//----${W}----//`);Z.push(F)}else LJ(`${$} placement hook does not exist in shader`)}}var OQ=/\{\{(.*?)\}\}/g;function WJ(J){let Q={};return(J.match(OQ)?.map(($)=>$.replace(/[{()}]/g,""))??[]).forEach(($)=>{Q[$]=[]}),Q}function VJ(J,Q){let W,$=/@in\s+([^;]+);/g;while((W=$.exec(J))!==null)Q.push(W[1])}function $J(J,Q,W=!1){let $=[];VJ(Q,$),J.forEach((R)=>{if(R.header)VJ(R.header,$)});let K=$;if(W)K.sort();let Z=K.map((R,X)=>`       @location(${X}) ${R},`).join(`
`),F=Q.replace(/@in\s+[^;]+;\s*/g,"");return F=F.replace("{{in}}",`
${Z}
`),F}function jJ(J,Q){let W,$=/@out\s+([^;]+);/g;while((W=$.exec(J))!==null)Q.push(W[1])}function TQ(J){let W=/\b(\w+)\s*:/g.exec(J);return W?W[1]:""}function IQ(J){let Q=/@.*?\s+/g;return J.replace(Q,"")}function vJ(J,Q){let W=[];jJ(Q,W),J.forEach((X)=>{if(X.header)jJ(X.header,W)});let $=0,K=W.sort().map((X)=>{if(X.indexOf("builtin")>-1)return X;return`@location(${$++}) ${X}`}).join(`,
`),Z=W.sort().map((X)=>`       var ${IQ(X)};`).join(`
`),F=`return VSOutput(
            ${W.sort().map((X)=>` ${TQ(X)}`).join(`,
`)});`,R=Q.replace(/@out\s+[^;]+;\s*/g,"");return R=R.replace("{{struct}}",`
${K}
`),R=R.replace("{{start}}",`
${Z}
`),R=R.replace("{{return}}",`
${F}
`),R}function KJ(J,Q){let W=J;for(let $ in Q){let K=Q[$];if(K.join(`
`).length)W=W.replace(`{{${$}}}`,`//-----${$} START-----//
${K.join(`
`)}
//----${$} FINISH----//`);else W=W.replace(`{{${$}}}`,"")}return W}var v=Object.create(null),ZJ=new Map,SQ=0;function MJ({template:J,bits:Q}){let W=wJ(J,Q);if(v[W])return v[W];let{vertex:$,fragment:K}=yQ(J,Q);return v[W]=OJ($,K,Q),v[W]}function zJ({template:J,bits:Q}){let W=wJ(J,Q);if(v[W])return v[W];return v[W]=OJ(J.vertex,J.fragment,Q),v[W]}function yQ(J,Q){let W=Q.map((F)=>F.vertex).filter((F)=>!!F),$=Q.map((F)=>F.fragment).filter((F)=>!!F),K=$J(W,J.vertex,!0);K=vJ(W,K);let Z=$J($,J.fragment,!0);return{vertex:K,fragment:Z}}function wJ(J,Q){return Q.map((W)=>{if(!ZJ.has(W))ZJ.set(W,SQ++);return ZJ.get(W)}).sort((W,$)=>W-$).join("-")+J.vertex+J.fragment}function OJ(J,Q,W){let $=WJ(J),K=WJ(Q);return W.forEach((Z)=>{QJ(Z.vertex,$,Z.name),QJ(Z.fragment,K,Z.name)}),{vertex:KJ(J,$),fragment:KJ(Q,K)}}var TJ=`
    @in aPosition: vec2<f32>;
    @in aUV: vec2<f32>;

    @out @builtin(position) vPosition: vec4<f32>;
    @out vUV : vec2<f32>;
    @out vColor : vec4<f32>;

    {{header}}

    struct VSOutput {
        {{struct}}
    };

    @vertex
    fn main( {{in}} ) -> VSOutput {

        var worldTransformMatrix = globalUniforms.uWorldTransformMatrix;
        var modelMatrix = mat3x3<f32>(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        var position = aPosition;
        var uv = aUV;

        {{start}}

        vColor = vec4<f32>(1., 1., 1., 1.);

        {{main}}

        vUV = uv;

        var modelViewProjectionMatrix = globalUniforms.uProjectionMatrix * worldTransformMatrix * modelMatrix;

        vPosition =  vec4<f32>((modelViewProjectionMatrix *  vec3<f32>(position, 1.0)).xy, 0.0, 1.0);

        vColor *= globalUniforms.uWorldColorAlpha;

        {{end}}

        {{return}}
    };
`,IJ=`
    @in vUV : vec2<f32>;
    @in vColor : vec4<f32>;

    {{header}}

    @fragment
    fn main(
        {{in}}
      ) -> @location(0) vec4<f32> {

        {{start}}

        var outColor:vec4<f32>;

        {{main}}

        var finalColor:vec4<f32> = outColor * vColor;

        {{end}}

        return finalColor;
      };
`,SJ=`
    in vec2 aPosition;
    in vec2 aUV;

    out vec4 vColor;
    out vec2 vUV;

    {{header}}

    void main(void){

        mat3 worldTransformMatrix = uWorldTransformMatrix;
        mat3 modelMatrix = mat3(
            1.0, 0.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 0.0, 1.0
          );
        vec2 position = aPosition;
        vec2 uv = aUV;

        {{start}}

        vColor = vec4(1.);

        {{main}}

        vUV = uv;

        mat3 modelViewProjectionMatrix = uProjectionMatrix * worldTransformMatrix * modelMatrix;

        gl_Position = vec4((modelViewProjectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);

        vColor *= uWorldColorAlpha;

        {{end}}
    }
`,yJ=`

    in vec4 vColor;
    in vec2 vUV;

    out vec4 finalColor;

    {{header}}

    void main(void) {

        {{start}}

        vec4 outColor;

        {{main}}

        finalColor = outColor * vColor;

        {{end}}
    }
`;var BJ={name:"global-uniforms-bit",vertex:{header:`
        struct GlobalUniforms {
            uProjectionMatrix:mat3x3<f32>,
            uWorldTransformMatrix:mat3x3<f32>,
            uWorldColorAlpha: vec4<f32>,
            uResolution: vec2<f32>,
        }

        @group(0) @binding(0) var<uniform> globalUniforms : GlobalUniforms;
        `}};var gJ={name:"global-uniforms-bit",vertex:{header:`
          uniform mat3 uProjectionMatrix;
          uniform mat3 uWorldTransformMatrix;
          uniform vec4 uWorldColorAlpha;
          uniform vec2 uResolution;
        `}};function bJ({bits:J,name:Q}){let W=MJ({template:{fragment:IJ,vertex:TJ},bits:[BJ,...J]});return hJ.from({name:Q,vertex:{source:W.vertex,entryPoint:"main"},fragment:{source:W.fragment,entryPoint:"main"}})}function uJ({bits:J,name:Q}){return new fJ({name:Q,...zJ({template:{vertex:SJ,fragment:yJ},bits:[gJ,...J]})})}var xJ={name:"color-bit",vertex:{header:`
            @in aColor: vec4<f32>;
        `,main:`
            vColor *= vec4<f32>(aColor.rgb * aColor.a, aColor.a);
        `}},pJ={name:"color-bit",vertex:{header:`
            in vec4 aColor;
        `,main:`
            vColor *= vec4(aColor.rgb * aColor.a, aColor.a);
        `}};var FJ={};function BQ(J){let Q=[];if(J===1)Q.push("@group(1) @binding(0) var textureSource1: texture_2d<f32>;"),Q.push("@group(1) @binding(1) var textureSampler1: sampler;");else{let W=0;for(let $=0;$<J;$++)Q.push(`@group(1) @binding(${W++}) var textureSource${$+1}: texture_2d<f32>;`),Q.push(`@group(1) @binding(${W++}) var textureSampler${$+1}: sampler;`)}return Q.join(`
`)}function gQ(J){let Q=[];if(J===1)Q.push("outColor = textureSampleGrad(textureSource1, textureSampler1, vUV, uvDx, uvDy);");else{Q.push("switch vTextureId {");for(let W=0;W<J;W++){if(W===J-1)Q.push("  default:{");else Q.push(`  case ${W}:{`);Q.push(`      outColor = textureSampleGrad(textureSource${W+1}, textureSampler${W+1}, vUV, uvDx, uvDy);`),Q.push("      break;}")}Q.push("}")}return Q.join(`
`)}function cJ(J){if(!FJ[J])FJ[J]={name:"texture-batch-bit",vertex:{header:`
                @in aTextureIdAndRound: vec2<u32>;
                @out @interpolate(flat) vTextureId : u32;
            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1)
                {
                    vPosition = vec4<f32>(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
                }
            `},fragment:{header:`
                @in @interpolate(flat) vTextureId: u32;

                ${BQ(J)}
            `,main:`
                var uvDx = dpdx(vUV);
                var uvDy = dpdy(vUV);

                ${gQ(J)}
            `}};return FJ[J]}var RJ={};function fQ(J){let Q=[];for(let W=0;W<J;W++){if(W>0)Q.push("else");if(W<J-1)Q.push(`if(vTextureId < ${W}.5)`);Q.push("{"),Q.push(`	outColor = texture(uTextures[${W}], vUV);`),Q.push("}")}return Q.join(`
`)}function mJ(J){if(!RJ[J])RJ[J]={name:"texture-batch-bit",vertex:{header:`
                in vec2 aTextureIdAndRound;
                out float vTextureId;

            `,main:`
                vTextureId = aTextureIdAndRound.y;
            `,end:`
                if(aTextureIdAndRound.x == 1.)
                {
                    gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
                }
            `},fragment:{header:`
                in float vTextureId;

                uniform sampler2D uTextures[${J}];

            `,main:`

                ${fQ(J)}
            `}};return RJ[J]}var lJ={name:"round-pixels-bit",vertex:{header:`
            fn roundPixels(position: vec2<f32>, targetSize: vec2<f32>) -> vec2<f32>
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}},dJ={name:"round-pixels-bit",vertex:{header:`
            vec2 roundPixels(vec2 position, vec2 targetSize)
            {
                return (floor(((position * 0.5 + 0.5) * targetSize) + 0.5) / targetSize) * 2.0 - 1.0;
            }
        `}};class d{constructor(J){if(typeof J==="number")this.rawBinaryData=new ArrayBuffer(J);else if(J instanceof Uint8Array)this.rawBinaryData=J.buffer;else this.rawBinaryData=J;this.uint32View=new Uint32Array(this.rawBinaryData),this.float32View=new Float32Array(this.rawBinaryData),this.size=this.rawBinaryData.byteLength}get int8View(){if(!this._int8View)this._int8View=new Int8Array(this.rawBinaryData);return this._int8View}get uint8View(){if(!this._uint8View)this._uint8View=new Uint8Array(this.rawBinaryData);return this._uint8View}get int16View(){if(!this._int16View)this._int16View=new Int16Array(this.rawBinaryData);return this._int16View}get int32View(){if(!this._int32View)this._int32View=new Int32Array(this.rawBinaryData);return this._int32View}get float64View(){if(!this._float64Array)this._float64Array=new Float64Array(this.rawBinaryData);return this._float64Array}get bigUint64View(){if(!this._bigUint64Array)this._bigUint64Array=new BigUint64Array(this.rawBinaryData);return this._bigUint64Array}view(J){return this[`${J}View`]}destroy(){this.rawBinaryData=null,this.uint32View=null,this.float32View=null,this.uint16View=null,this._int8View=null,this._uint8View=null,this._int16View=null,this._int32View=null,this._float64Array=null,this._bigUint64Array=null}static sizeOf(J){switch(J){case"int8":case"uint8":return 1;case"int16":case"uint16":return 2;case"int32":case"uint32":case"float32":return 4;default:throw Error(`${J} isn't a valid view type`)}}}function XJ(J,Q,W,$){if(W??(W=0),$??($=Math.min(J.byteLength-W,Q.byteLength)),!(W&7)&&!($&7)){let K=$/8;new Float64Array(Q,0,K).set(new Float64Array(J,W,K))}else if(!(W&3)&&!($&3)){let K=$/4;new Float32Array(Q,0,K).set(new Float32Array(J,W,K))}else new Uint8Array(Q).set(new Uint8Array(J,W,$))}var oJ={normal:"normal-npm",add:"add-npm",screen:"screen-npm"},hQ=((J)=>{return J[J.DISABLED=0]="DISABLED",J[J.RENDERING_MASK_ADD=1]="RENDERING_MASK_ADD",J[J.MASK_ACTIVE=2]="MASK_ACTIVE",J[J.INVERSE_MASK_ACTIVE=3]="INVERSE_MASK_ACTIVE",J[J.RENDERING_MASK_REMOVE=4]="RENDERING_MASK_REMOVE",J[J.NONE=5]="NONE",J})(hQ||{});function YJ(J,Q){if(Q.alphaMode==="no-premultiply-alpha")return oJ[J]||J;return J}var bQ=["precision mediump float;","void main(void){","float test = 0.1;","%forloop%","gl_FragColor = vec4(0.0);","}"].join(`
`);function uQ(J){let Q="";for(let W=0;W<J;++W){if(W>0)Q+=`
else `;if(W<J-1)Q+=`if(test == ${W}.0){}`}return Q}function sJ(J,Q){if(J===0)throw Error("Invalid value of `0` passed to `checkMaxIfStatementsInShader`");let W=Q.createShader(Q.FRAGMENT_SHADER);try{while(!0){let $=bQ.replace(/%forloop%/gi,uQ(J));if(Q.shaderSource(W,$),Q.compileShader(W),!Q.getShaderParameter(W,Q.COMPILE_STATUS))J=J/2|0;else break}}finally{Q.deleteShader(W)}return J}var w=null;function rJ(){if(w)return w;let J=nJ();return w=J.getParameter(J.MAX_TEXTURE_IMAGE_UNITS),w=sJ(w,J),J.getExtension("WEBGL_lose_context")?.loseContext(),w}class _J{constructor(){this.ids=Object.create(null),this.textures=[],this.count=0}clear(){for(let J=0;J<this.count;J++){let Q=this.textures[J];this.textures[J]=null,this.ids[Q.uid]=null}this.count=0}}class QQ{constructor(){this.renderPipeId="batch",this.action="startBatch",this.start=0,this.size=0,this.textures=new _J,this.blendMode="normal",this.topology="triangle-strip",this.canBundle=!0}destroy(){this.textures=null,this.gpuBindGroup=null,this.bindGroup=null,this.batcher=null,this.elements=null}}var h=[],o=0;JQ.register({clear:()=>{if(h.length>0){for(let J of h)if(J)J.destroy()}h.length=0,o=0}});function iJ(){return o>0?h[--o]:new QQ}function aJ(J){J.elements=null,h[o++]=J}var f=0,WQ=class J{constructor(Q){if(this.uid=tJ("batcher"),this.dirty=!0,this.batchIndex=0,this.batches=[],this._elements=[],Q={...J.defaultOptions,...Q},!Q.maxTextures)eJ("v8.8.0","maxTextures is a required option for Batcher now, please pass it in the options"),Q.maxTextures=rJ();let{maxTextures:W,attributesInitialSize:$,indicesInitialSize:K}=Q;this.attributeBuffer=new d($*4),this.indexBuffer=new Uint16Array(K),this.maxTextures=W}begin(){this.elementSize=0,this.elementStart=0,this.indexSize=0,this.attributeSize=0;for(let Q=0;Q<this.batchIndex;Q++)aJ(this.batches[Q]);this.batchIndex=0,this._batchIndexStart=0,this._batchIndexSize=0,this.dirty=!0}add(Q){this._elements[this.elementSize++]=Q,Q._indexStart=this.indexSize,Q._attributeStart=this.attributeSize,Q._batcher=this,this.indexSize+=Q.indexSize,this.attributeSize+=Q.attributeSize*this.vertexSize}checkAndUpdateTexture(Q,W){let $=Q._batch.textures.ids[W._source.uid];if(!$&&$!==0)return!1;return Q._textureId=$,Q.texture=W,!0}updateElement(Q){this.dirty=!0;let W=this.attributeBuffer;if(Q.packAsQuad)this.packQuadAttributes(Q,W.float32View,W.uint32View,Q._attributeStart,Q._textureId);else this.packAttributes(Q,W.float32View,W.uint32View,Q._attributeStart,Q._textureId)}break(Q){let W=this._elements;if(!W[this.elementStart])return;let $=iJ(),K=$.textures;K.clear();let Z=W[this.elementStart],F=YJ(Z.blendMode,Z.texture._source),R=Z.topology;if(this.attributeSize*4>this.attributeBuffer.size)this._resizeAttributeBuffer(this.attributeSize*4);if(this.indexSize>this.indexBuffer.length)this._resizeIndexBuffer(this.indexSize);let X=this.attributeBuffer.float32View,Y=this.attributeBuffer.uint32View,H=this.indexBuffer,q=this._batchIndexSize,G=this._batchIndexStart,A="startBatch",D=[],P=this.maxTextures;for(let k=this.elementStart;k<this.elementSize;++k){let _=W[k];W[k]=null;let U=_.texture._source,N=YJ(_.blendMode,U),V=F!==N||R!==_.topology;if(U._batchTick===f&&!V){if(_._textureId=U._textureBindLocation,q+=_.indexSize,_.packAsQuad)this.packQuadAttributes(_,X,Y,_._attributeStart,_._textureId),this.packQuadIndex(H,_._indexStart,_._attributeStart/this.vertexSize);else this.packAttributes(_,X,Y,_._attributeStart,_._textureId),this.packIndex(_,H,_._indexStart,_._attributeStart/this.vertexSize);_._batch=$,D.push(_);continue}if(U._batchTick=f,K.count>=P||V)this._finishBatch($,G,q-G,K,F,R,Q,A,D),A="renderBatch",G=q,F=N,R=_.topology,$=iJ(),K=$.textures,K.clear(),D=[],++f;if(_._textureId=U._textureBindLocation=K.count,K.ids[U.uid]=K.count,K.textures[K.count++]=U,_._batch=$,D.push(_),q+=_.indexSize,_.packAsQuad)this.packQuadAttributes(_,X,Y,_._attributeStart,_._textureId),this.packQuadIndex(H,_._indexStart,_._attributeStart/this.vertexSize);else this.packAttributes(_,X,Y,_._attributeStart,_._textureId),this.packIndex(_,H,_._indexStart,_._attributeStart/this.vertexSize)}if(K.count>0)this._finishBatch($,G,q-G,K,F,R,Q,A,D),G=q,++f;this.elementStart=this.elementSize,this._batchIndexStart=G,this._batchIndexSize=q}_finishBatch(Q,W,$,K,Z,F,R,X,Y){Q.gpuBindGroup=null,Q.bindGroup=null,Q.action=X,Q.batcher=this,Q.textures=K,Q.blendMode=Z,Q.topology=F,Q.start=W,Q.size=$,Q.elements=Y,++f,this.batches[this.batchIndex++]=Q,R.add(Q)}finish(Q){this.break(Q)}ensureAttributeBuffer(Q){if(Q*4<=this.attributeBuffer.size)return;this._resizeAttributeBuffer(Q*4)}ensureIndexBuffer(Q){if(Q<=this.indexBuffer.length)return;this._resizeIndexBuffer(Q)}_resizeAttributeBuffer(Q){let W=Math.max(Q,this.attributeBuffer.size*2),$=new d(W);XJ(this.attributeBuffer.rawBinaryData,$.rawBinaryData),this.attributeBuffer=$}_resizeIndexBuffer(Q){let W=this.indexBuffer,$=Math.max(Q,W.length*1.5);$+=$%2;let K=$>65535?new Uint32Array($):new Uint16Array($);if(K.BYTES_PER_ELEMENT!==W.BYTES_PER_ELEMENT)for(let Z=0;Z<W.length;Z++)K[Z]=W[Z];else XJ(W.buffer,K.buffer);this.indexBuffer=K}packQuadIndex(Q,W,$){Q[W]=$+0,Q[W+1]=$+1,Q[W+2]=$+2,Q[W+3]=$+0,Q[W+4]=$+2,Q[W+5]=$+3}packIndex(Q,W,$,K){let{indices:Z,indexSize:F,indexOffset:R,attributeOffset:X}=Q;for(let Y=0;Y<F;Y++)W[$++]=K+Z[Y+R]-X}destroy(Q={}){if(this.batches===null)return;for(let W=0;W<this.batchIndex;W++)aJ(this.batches[W]);if(this.batches=null,this.geometry.destroy(!0),this.geometry=null,Q.shader)this.shader?.destroy(),this.shader=null;for(let W=0;W<this._elements.length;W++)if(this._elements[W])this._elements[W]._batch=null;this._elements=null,this.indexBuffer=null,this.attributeBuffer.destroy(),this.attributeBuffer=null}};WQ.defaultOptions={maxTextures:null,attributesInitialSize:4,indicesInitialSize:6};var $Q=WQ;var xQ=new Float32Array(1),pQ=new Uint32Array(1);class UJ extends KQ{constructor(){let Q=new DJ({data:xQ,label:"attribute-batch-buffer",usage:b.VERTEX|b.COPY_DST,shrinkToFit:!1}),W=new DJ({data:pQ,label:"index-batch-buffer",usage:b.INDEX|b.COPY_DST,shrinkToFit:!1}),$=24;super({attributes:{aPosition:{buffer:Q,format:"float32x2",stride:24,offset:0},aUV:{buffer:Q,format:"float32x2",stride:24,offset:8},aColor:{buffer:Q,format:"unorm8x4",stride:24,offset:16},aTextureIdAndRound:{buffer:Q,format:"uint16x2",stride:24,offset:20}},indexBuffer:W})}}var ZQ={};function RQ(J){let Q=ZQ[J];if(Q)return Q;let W=new Int32Array(J);for(let $=0;$<J;$++)W[$]=$;return Q=ZQ[J]=new FQ({uTextures:{value:W,type:"i32",size:J}},{isStatic:!0}),Q}class s extends XQ{constructor(J){let Q=uJ({name:"batch",bits:[pJ,mJ(J),dJ]}),W=bJ({name:"batch",bits:[xJ,cJ(J),lJ]});super({glProgram:Q,gpuProgram:W,resources:{batchSamplers:RQ(J)}});this.maxTextures=J}}var u=null,_Q=class J extends $Q{constructor(Q){super(Q);this.geometry=new UJ,this.name=J.extension.name,this.vertexSize=6,u??(u=new s(Q.maxTextures)),this.shader=u}packAttributes(Q,W,$,K,Z){let F=Z<<16|Q.roundPixels&65535,R=Q.transform,X=R.a,Y=R.b,H=R.c,q=R.d,G=R.tx,A=R.ty,{positions:D,uvs:P}=Q,k=Q.color,_=Q.attributeOffset,j=_+Q.attributeSize;for(let U=_;U<j;U++){let N=U*2,V=D[N],HJ=D[N+1];W[K++]=X*V+H*HJ+G,W[K++]=q*HJ+Y*V+A,W[K++]=P[N],W[K++]=P[N+1],$[K++]=k,$[K++]=F}}packQuadAttributes(Q,W,$,K,Z){let{texture:F,transform:R}=Q,X=R.a,Y=R.b,H=R.c,q=R.d,G=R.tx,A=R.ty,D=Q.bounds,P=D.maxX,k=D.minX,_=D.maxY,j=D.minY,U=F.uvs,N=Q.color,V=Z<<16|Q.roundPixels&65535;W[K+0]=X*k+H*j+G,W[K+1]=q*j+Y*k+A,W[K+2]=U.x0,W[K+3]=U.y0,$[K+4]=N,$[K+5]=V,W[K+6]=X*P+H*j+G,W[K+7]=q*j+Y*P+A,W[K+8]=U.x1,W[K+9]=U.y1,$[K+10]=N,$[K+11]=V,W[K+12]=X*P+H*_+G,W[K+13]=q*_+Y*P+A,W[K+14]=U.x2,W[K+15]=U.y2,$[K+16]=N,$[K+17]=V,W[K+18]=X*k+H*_+G,W[K+19]=q*_+Y*k+A,W[K+20]=U.x3,W[K+21]=U.y3,$[K+22]=N,$[K+23]=V}_updateMaxTextures(Q){if(this.shader.maxTextures===Q)return;u=new s(Q),this.shader=u}destroy(){this.shader=null,super.destroy()}};_Q.extension={type:[YQ.Batcher],name:"default"};var J6=_Q;class cQ{constructor(J){this.items=Object.create(null);let{renderer:Q,type:W,onUnload:$,priority:K,name:Z}=J;this._renderer=Q,Q.gc.addResourceHash(this,"items",W,K??0),this._onUnload=$,this.name=Z}add(J){if(this.items[J.uid])return!1;return this.items[J.uid]=J,J.once("unload",this.remove,this),J._gcLastUsed=this._renderer.gc.now,!0}remove(J,...Q){if(!this.items[J.uid])return;let W=J._gpuData[this._renderer.uid];if(!W)return;this._onUnload?.(J,...Q),W.destroy(),J._gpuData[this._renderer.uid]=null,this.items[J.uid]=null}removeAll(...J){Object.values(this.items).forEach((Q)=>Q&&this.remove(Q,...J))}destroy(...J){this.removeAll(...J),this.items=Object.create(null),this._renderer=null,this._onUnload=null}}
export{oQ as Eb,bJ as Fb,uJ as Gb,xJ as Hb,pJ as Ib,cJ as Jb,mJ as Kb,lJ as Lb,dJ as Mb,XJ as Nb,hQ as Ob,sJ as Pb,RQ as Qb,J6 as Rb,cQ as Sb};
