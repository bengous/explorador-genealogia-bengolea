import{g,u,r,ue,b,H,Yt,w}from"./chunk-86eqr4h7.js";var nt={name:"local-uniform-bit",vertex:{header:`

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
        `}},Tr={...nt,vertex:{...nt.vertex,header:nt.vertex.header.replace("group(1)","group(2)")}},Dt={name:"local-uniform-bit",vertex:{header:`

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
        `}};var Er={name:"texture-bit",vertex:{header:`

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
        `}},Cr={name:"texture-bit",vertex:{header:`
            uniform mat3 uTextureMatrix;
        `,main:`
            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
        uniform sampler2D uTexture;


        `,main:`
            outColor = texture(uTexture, vUV);
        `}};class Be{constructor(t){this._syncFunctionHash=Object.create(null),this._adaptor=t,this._systemCheck()}_systemCheck(){if(!Yt())throw Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}ensureUniformGroup(t){let e=this.getUniformGroupData(t);t.buffer||(t.buffer=new H({data:new Float32Array(e.layout.size/4),usage:b.UNIFORM|b.COPY_DST}))}getUniformGroupData(t){return this._syncFunctionHash[t._signature]||this._initUniformGroup(t)}_initUniformGroup(t){let e=t._signature,a=this._syncFunctionHash[e];if(!a){let f=Object.keys(t.uniformStructures).map((o)=>t.uniformStructures[o]),s=this._adaptor.createUboElements(f),n=this._generateUboSync(s.uboElements);a=this._syncFunctionHash[e]={layout:s,syncFunction:n}}return this._syncFunctionHash[e]}_generateUboSync(t){return this._adaptor.generateUboSync(t)}syncUniformGroup(t,e,a){let f=this.getUniformGroupData(t);t.buffer||(t.buffer=new H({data:new Float32Array(f.layout.size/4),usage:b.UNIFORM|b.COPY_DST}));let s=null;if(!e)e=t.buffer.data,s=t.buffer.dataInt32;return a||(a=0),f.syncFunction(t.uniforms,e,s,a),!0}updateUniformGroup(t){if(t.isStatic&&!t._dirtyId)return!1;t._dirtyId=0;let e=this.syncUniformGroup(t);return t.buffer.update(),e}destroy(){this._syncFunctionHash=null}}class _e extends g{constructor({buffer:t,offset:e,size:a}){super();this.uid=u("buffer"),this._resourceType="bufferResource",this._resourceId=u("resource"),this._bufferResource=!0,this.destroyed=!1,this.buffer=t,this.offset=e|0,this.size=a,this.buffer.on("change",this.onBufferChange,this)}get _gcLastUsed(){return this.buffer?._gcLastUsed??-1}set _gcLastUsed(t){if(this.buffer)this.buffer._gcLastUsed=t}onBufferChange(){this._resourceId=u("resource"),this.emit("change",this)}destroy(t=!1){if(this.destroyed=!0,t)this.buffer.destroy();this.emit("change",this),this.buffer=null,this.removeAllListeners()}}function Fe(t,e){for(let a in t.attributes){let f=t.attributes[a],s=e[a];if(s)f.format??(f.format=s.format),f.offset??(f.offset=s.offset),f.instance??(f.instance=s.instance);else if(!f.format)r(`Attribute ${a} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`)}p(t)}function p(t){let{buffers:e,attributes:a}=t,f={},s={};for(let n in e){let o=e[n];f[o.uid]=0,s[o.uid]=0}for(let n in a){let o=a[n];f[o.buffer.uid]+=ue(o.format).stride}for(let n in a){let o=a[n];o.stride??(o.stride=f[o.buffer.uid]),o.start??(o.start=s[o.buffer.uid]),s[o.buffer.uid]+=ue(o.format).stride}}var ee=[];ee[w.NONE]=void 0;ee[w.DISABLED]={stencilWriteMask:0,stencilReadMask:0};ee[w.RENDERING_MASK_ADD]={stencilFront:{compare:"equal",passOp:"increment-clamp"},stencilBack:{compare:"equal",passOp:"increment-clamp"}};ee[w.RENDERING_MASK_REMOVE]={stencilFront:{compare:"equal",passOp:"decrement-clamp"},stencilBack:{compare:"equal",passOp:"decrement-clamp"}};ee[w.MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"equal",passOp:"keep"},stencilBack:{compare:"equal",passOp:"keep"}};ee[w.INVERSE_MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"not-equal",passOp:"keep"},stencilBack:{compare:"not-equal",passOp:"keep"}};var ge=[{type:"mat3x3<f32>",test:(t)=>t.value.a!==void 0,ubo:`
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
        `},{type:"vec4<f32>",test:(t)=>t.type==="vec4<f32>"&&t.size===1&&t.value.width!==void 0,ubo:`
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
        `},{type:"vec2<f32>",test:(t)=>t.type==="vec2<f32>"&&t.size===1&&t.value.x!==void 0,ubo:`
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
        `},{type:"vec4<f32>",test:(t)=>t.type==="vec4<f32>"&&t.size===1&&t.value.red!==void 0,ubo:`
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
        `},{type:"vec3<f32>",test:(t)=>t.type==="vec3<f32>"&&t.size===1&&t.value.red!==void 0,ubo:`
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
        `}];function it(t,e,a){let f=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `],s=0;for(let o=0;o<t.length;o++){let i=t[o],l=i.data.name,c=!1,v=0;for(let m=0;m<ge.length;m++)if(ge[m].test(i.data)){v=i.offset/4,f.push(`name = "${l}";`,`offset += ${v-s};`,ge[m].ubo),c=!0;break}if(!c)if(i.data.size>1)v=i.offset/4,f.push(a(i,v-s));else{let m=e[i.data.type];v=i.offset/4,f.push(`
                    v = uv.${l};
                    offset += ${v-s};
                    ${m};
                `)}s=v}let n=f.join(`
`);return Function("uv","data","dataInt32","offset",n)}function d(t,e){return`
        for (let i = 0; i < ${t*e}; i++) {
            data[offset + (((i / ${t})|0) * 4) + (i % ${t})] = v[i];
        }
    `}var rr={f32:`
        data[offset] = v;`,i32:`
        dataInt32[offset] = v;`,u32:`
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
        dataInt32[offset + 3] = v[3];`,"vec2<u32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];`,"vec3<u32>":`
        dataInt32[offset] = v[0];
        dataInt32[offset + 1] = v[1];
        dataInt32[offset + 2] = v[2];`,"vec4<u32>":`
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
        }`,"mat3x2<f32>":d(3,2),"mat4x2<f32>":d(4,2),"mat2x3<f32>":d(2,3),"mat4x3<f32>":d(4,3),"mat2x4<f32>":d(2,4),"mat3x4<f32>":d(3,4)},Ar={...rr,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `};function ot(t,e,a,f,s){if(t=Math.max(0,t),e=Math.min(e,a*f),t>=e)return 0;let n=Math.floor(t/a),o=t-n*a,i=Math.floor(e/a),l=e-i*a;if(n===i)return s[0].set(o,n,l-o,1),1;let c=0,v=n;if(o>0)s[c++].set(o,n,a-o,1),v++;if(i>v)s[c++].set(0,v,a,i-v);if(l>0)s[c++].set(0,i,l,1);return c}
export{nt,Tr,Dt,Er,Cr,Be,ge,it,rr,Ar,_e,Fe,ee,ot};
