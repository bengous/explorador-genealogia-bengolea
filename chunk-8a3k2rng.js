import{za as I}from"./chunk-2sfs7e7y.js";import{Ob as $}from"./chunk-m8wrj2js.js";import{$b as A,Cc as z,Dc as _,Vb as L,dc as P,wc as v}from"./chunk-jf7pavr6.js";var O={name:"local-uniform-bit",vertex:{header:`

            struct LocalUniforms {
                uTransformMatrix:mat3x3<f32>,
                uColor:vec4<f32>,
                uRound:f32,
            }

            @group(1) @binding(0) var<uniform> localUniforms : LocalUniforms;
        `,main:`
            vColor *= localUniforms.uColor;
            modelMatrix *= localUniforms.uTransformMatrix;
        `,end:`
            if(localUniforms.uRound == 1)
            {
                vPosition = vec4(roundPixels(vPosition.xy, globalUniforms.uResolution), vPosition.zw);
            }
        `}},B={...O,vertex:{...O.vertex,header:O.vertex.header.replace("group(1)","group(2)")}},U={name:"local-uniform-bit",vertex:{header:`

            uniform mat3 uTransformMatrix;
            uniform vec4 uColor;
            uniform float uRound;
        `,main:`
            vColor *= uColor;
            modelMatrix = uTransformMatrix;
        `,end:`
            if(uRound == 1.)
            {
                gl_Position.xy = roundPixels(gl_Position.xy, uResolution);
            }
        `}};var M={name:"texture-bit",vertex:{header:`

        struct TextureUniforms {
            uTextureMatrix:mat3x3<f32>,
        }

        @group(2) @binding(2) var<uniform> textureUniforms : TextureUniforms;
        `,main:`
            uv = (textureUniforms.uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
            @group(2) @binding(0) var uTexture: texture_2d<f32>;
            @group(2) @binding(1) var uSampler: sampler;


        `,main:`
            outColor = textureSample(uTexture, uSampler, vUV);
        `}},E={name:"texture-bit",vertex:{header:`
            uniform mat3 uTextureMatrix;
        `,main:`
            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
        uniform sampler2D uTexture;


        `,main:`
            outColor = texture(uTexture, vUV);
        `}};class T{constructor(k){this._syncFunctionHash=Object.create(null),this._adaptor=k,this._systemCheck()}_systemCheck(){if(!I())throw Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}ensureUniformGroup(k){let q=this.getUniformGroupData(k);k.buffer||(k.buffer=new _({data:new Float32Array(q.layout.size/4),usage:z.UNIFORM|z.COPY_DST}))}getUniformGroupData(k){return this._syncFunctionHash[k._signature]||this._initUniformGroup(k)}_initUniformGroup(k){let q=k._signature,H=this._syncFunctionHash[q];if(!H){let Q=Object.keys(k.uniformStructures).map((K)=>k.uniformStructures[K]),J=this._adaptor.createUboElements(Q),V=this._generateUboSync(J.uboElements);H=this._syncFunctionHash[q]={layout:J,syncFunction:V}}return this._syncFunctionHash[q]}_generateUboSync(k){return this._adaptor.generateUboSync(k)}syncUniformGroup(k,q,H){let Q=this.getUniformGroupData(k);k.buffer||(k.buffer=new _({data:new Float32Array(Q.layout.size/4),usage:z.UNIFORM|z.COPY_DST}));let J=null;if(!q)q=k.buffer.data,J=k.buffer.dataInt32;return H||(H=0),Q.syncFunction(k.uniforms,q,J,H),!0}updateUniformGroup(k){if(k.isStatic&&!k._dirtyId)return!1;k._dirtyId=0;let q=this.syncUniformGroup(k);return k.buffer.update(),q}destroy(){this._syncFunctionHash=null}}var w=[{type:"mat3x3<f32>",test:(k)=>{return k.value.a!==void 0},ubo:`
            var matrix = uv[name].toArray(true);
            data[offset] = matrix[0];
            data[offset + 1] = matrix[1];
            data[offset + 2] = matrix[2];
            data[offset + 4] = matrix[3];
            data[offset + 5] = matrix[4];
            data[offset + 6] = matrix[5];
            data[offset + 8] = matrix[6];
            data[offset + 9] = matrix[7];
            data[offset + 10] = matrix[8];
        `,uniform:`
            gl.uniformMatrix3fv(ud[name].location, false, uv[name].toArray(true));
        `},{type:"vec4<f32>",test:(k)=>k.type==="vec4<f32>"&&k.size===1&&k.value.width!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
            data[offset + 2] = v.width;
            data[offset + 3] = v.height;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y || cv[2] !== v.width || cv[3] !== v.height) {
                cv[0] = v.x;
                cv[1] = v.y;
                cv[2] = v.width;
                cv[3] = v.height;
                gl.uniform4f(ud[name].location, v.x, v.y, v.width, v.height);
            }
        `},{type:"vec2<f32>",test:(k)=>k.type==="vec2<f32>"&&k.size===1&&k.value.x!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.x;
            data[offset + 1] = v.y;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.x || cv[1] !== v.y) {
                cv[0] = v.x;
                cv[1] = v.y;
                gl.uniform2f(ud[name].location, v.x, v.y);
            }
        `},{type:"vec4<f32>",test:(k)=>k.type==="vec4<f32>"&&k.size===1&&k.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
            data[offset + 3] = v.alpha;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue || cv[3] !== v.alpha) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                cv[3] = v.alpha;
                gl.uniform4f(ud[name].location, v.red, v.green, v.blue, v.alpha);
            }
        `},{type:"vec3<f32>",test:(k)=>k.type==="vec3<f32>"&&k.size===1&&k.value.red!==void 0,ubo:`
            v = uv[name];
            data[offset] = v.red;
            data[offset + 1] = v.green;
            data[offset + 2] = v.blue;
        `,uniform:`
            cv = ud[name].value;
            v = uv[name];
            if (cv[0] !== v.red || cv[1] !== v.green || cv[2] !== v.blue) {
                cv[0] = v.red;
                cv[1] = v.green;
                cv[2] = v.blue;
                gl.uniform3f(ud[name].location, v.red, v.green, v.blue);
            }
        `}];function p(k,q,H,Q){let J=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `],V=0;for(let N=0;N<k.length;N++){let X=k[N],C=X.data.name,R=!1,Y=0;for(let Z=0;Z<w.length;Z++)if(w[Z].test(X.data)){Y=X.offset/4,J.push(`name = "${C}";`,`offset += ${Y-V};`,w[Z][q]||w[Z].ubo),R=!0;break}if(!R)if(X.data.size>1)Y=X.offset/4,J.push(H(X,Y-V));else{let Z=Q[X.data.type];Y=X.offset/4,J.push(`
                    v = uv.${C};
                    offset += ${Y-V};
                    ${Z};
                `)}V=Y}let K=J.join(`
`);return Function("uv","data","dataInt32","offset",K)}function W(k,q){return`
        for (let i = 0; i < ${k*q}; i++) {
            data[offset + (((i / ${k})|0) * 4) + (i % ${k})] = v[i];
        }
    `}var x={f32:`
        data[offset] = v;`,i32:`
        dataInt32[offset] = v;`,"vec2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];`,"vec3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];`,"vec4<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];`,"vec2<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];`,"vec3<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];`,"vec4<i32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];
        dataInt32[offset + 3] = v[3];`,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 4] = v[2];
        data[offset + 5] = v[3];`,"mat3x3<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 4] = v[3];
        data[offset + 5] = v[4];
        data[offset + 6] = v[5];
        data[offset + 8] = v[6];
        data[offset + 9] = v[7];
        data[offset + 10] = v[8];`,"mat4x4<f32>":`
        for (let i = 0; i < 16; i++) {
            data[offset + i] = v[i];
        }`,"mat3x2<f32>":W(3,2),"mat4x2<f32>":W(4,2),"mat2x3<f32>":W(2,3),"mat4x3<f32>":W(4,3),"mat2x4<f32>":W(2,4),"mat3x4<f32>":W(3,4)},m={...x,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `};class D extends L{constructor({buffer:k,offset:q,size:H}){super();this.uid=A("buffer"),this._resourceType="bufferResource",this._touched=0,this._resourceId=A("resource"),this._bufferResource=!0,this.destroyed=!1,this.buffer=k,this.offset=q|0,this.size=H,this.buffer.on("change",this.onBufferChange,this)}onBufferChange(){this._resourceId=A("resource"),this.emit("change",this)}destroy(k=!1){if(this.destroyed=!0,k)this.buffer.destroy();this.emit("change",this),this.buffer=null,this.removeAllListeners()}}function o(k,q){for(let H in k.attributes){let Q=k.attributes[H],J=q[H];if(J)Q.format??(Q.format=J.format),Q.offset??(Q.offset=J.offset),Q.instance??(Q.instance=J.instance);else P(`Attribute ${H} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`)}F(k)}function F(k){let{buffers:q,attributes:H}=k,Q={},J={};for(let V in q){let K=q[V];Q[K.uid]=0,J[K.uid]=0}for(let V in H){let K=H[V];Q[K.buffer.uid]+=v(K.format).stride}for(let V in H){let K=H[V];K.stride??(K.stride=Q[K.buffer.uid]),K.start??(K.start=J[K.buffer.uid]),J[K.buffer.uid]+=v(K.format).stride}}var h=[];h[$.NONE]=void 0;h[$.DISABLED]={stencilWriteMask:0,stencilReadMask:0};h[$.RENDERING_MASK_ADD]={stencilFront:{compare:"equal",passOp:"increment-clamp"},stencilBack:{compare:"equal",passOp:"increment-clamp"}};h[$.RENDERING_MASK_REMOVE]={stencilFront:{compare:"equal",passOp:"decrement-clamp"},stencilBack:{compare:"equal",passOp:"decrement-clamp"}};h[$.MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"equal",passOp:"keep"},stencilBack:{compare:"equal",passOp:"keep"}};h[$.INVERSE_MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"not-equal",passOp:"keep"},stencilBack:{compare:"not-equal",passOp:"keep"}};
export{O as ka,B as la,U as ma,M as na,E as oa,T as pa,w as qa,p as ra,x as sa,m as ta,D as ua,o as va,h as wa};
