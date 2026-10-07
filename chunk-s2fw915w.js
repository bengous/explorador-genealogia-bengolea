import{m,u,r,se,v,H,At,b}from"./chunk-r5fpnhyj.js";var Ze={name:"local-uniform-bit",vertex:{header:`

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
        `}},Jt={...Ze,vertex:{...Ze.vertex,header:Ze.vertex.header.replace("group(1)","group(2)")}},vt={name:"local-uniform-bit",vertex:{header:`

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
        `}};var er={name:"texture-bit",vertex:{header:`

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
        `}},tr={name:"texture-bit",vertex:{header:`
            uniform mat3 uTextureMatrix;
        `,main:`
            uv = (uTextureMatrix * vec3(uv, 1.0)).xy;
        `},fragment:{header:`
        uniform sampler2D uTexture;


        `,main:`
            outColor = texture(uTexture, vUV);
        `}};class Me{constructor(t){this._syncFunctionHash=Object.create(null),this._adaptor=t,this._systemCheck()}_systemCheck(){if(!At())throw Error("Current environment does not allow unsafe-eval, please use pixi.js/unsafe-eval module to enable support.")}ensureUniformGroup(t){let e=this.getUniformGroupData(t);t.buffer||(t.buffer=new H({data:new Float32Array(e.layout.size/4),usage:v.UNIFORM|v.COPY_DST}))}getUniformGroupData(t){return this._syncFunctionHash[t._signature]||this._initUniformGroup(t)}_initUniformGroup(t){let e=t._signature,a=this._syncFunctionHash[e];if(!a){let f=Object.keys(t.uniformStructures).map((o)=>t.uniformStructures[o]),s=this._adaptor.createUboElements(f),n=this._generateUboSync(s.uboElements);a=this._syncFunctionHash[e]={layout:s,syncFunction:n}}return this._syncFunctionHash[e]}_generateUboSync(t){return this._adaptor.generateUboSync(t)}syncUniformGroup(t,e,a){let f=this.getUniformGroupData(t);t.buffer||(t.buffer=new H({data:new Float32Array(f.layout.size/4),usage:v.UNIFORM|v.COPY_DST}));let s=null;if(!e)e=t.buffer.data,s=t.buffer.dataInt32;return a||(a=0),f.syncFunction(t.uniforms,e,s,a),!0}updateUniformGroup(t){if(t.isStatic&&!t._dirtyId)return!1;t._dirtyId=0;let e=this.syncUniformGroup(t);return t.buffer.update(),e}destroy(){this._syncFunctionHash=null}}class fe extends m{constructor({buffer:t,offset:e,size:a}){super();this.uid=u("buffer"),this._resourceType="bufferResource",this._resourceId=u("resource"),this._bufferResource=!0,this.destroyed=!1,this.buffer=t,this.offset=e|0,this.size=a,this.buffer.on("change",this.onBufferChange,this)}get _gcLastUsed(){return this.buffer?._gcLastUsed??-1}set _gcLastUsed(t){if(this.buffer)this.buffer._gcLastUsed=t}onBufferChange(){this._resourceId=u("resource"),this.emit("change",this)}destroy(t=!1){if(this.destroyed=!0,t)this.buffer.destroy();this.emit("change",this),this.buffer=null,this.removeAllListeners()}}function ke(t,e){for(let a in t.attributes){let f=t.attributes[a],s=e[a];if(s)f.format??(f.format=s.format),f.offset??(f.offset=s.offset),f.instance??(f.instance=s.instance);else if(!f.format)r(`Attribute ${a} is not present in the shader, but is present in the geometry. Unable to infer attribute details.`)}h(t)}function h(t){let{buffers:e,attributes:a}=t,f={},s={};for(let n in e){let o=e[n];f[o.uid]=0,s[o.uid]=0}for(let n in a){let o=a[n];f[o.buffer.uid]+=se(o.format).stride}for(let n in a){let o=a[n];o.stride??(o.stride=f[o.buffer.uid]),o.start??(o.start=s[o.buffer.uid]),s[o.buffer.uid]+=se(o.format).stride}}var K=[];K[b.NONE]=void 0;K[b.DISABLED]={stencilWriteMask:0,stencilReadMask:0};K[b.RENDERING_MASK_ADD]={stencilFront:{compare:"equal",passOp:"increment-clamp"},stencilBack:{compare:"equal",passOp:"increment-clamp"}};K[b.RENDERING_MASK_REMOVE]={stencilFront:{compare:"equal",passOp:"decrement-clamp"},stencilBack:{compare:"equal",passOp:"decrement-clamp"}};K[b.MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"equal",passOp:"keep"},stencilBack:{compare:"equal",passOp:"keep"}};K[b.INVERSE_MASK_ACTIVE]={stencilWriteMask:0,stencilFront:{compare:"not-equal",passOp:"keep"},stencilBack:{compare:"not-equal",passOp:"keep"}};var he=[{type:"mat3x3<f32>",test:(t)=>t.value.a!==void 0,ubo:`
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
        `}];function Je(t,e,a){let f=[`
        var v = null;
        var v2 = null;
        var t = 0;
        var index = 0;
        var name = null;
        var arrayOffset = null;
    `],s=0;for(let o=0;o<t.length;o++){let i=t[o],d=i.data.name,l=!1,c=0;for(let p=0;p<he.length;p++)if(he[p].test(i.data)){c=i.offset/4,f.push(`name = "${d}";`,`offset += ${c-s};`,he[p].ubo),l=!0;break}if(!l)if(i.data.size>1)c=i.offset/4,f.push(a(i,c-s));else{let p=e[i.data.type];c=i.offset/4,f.push(`
                    v = uv.${d};
                    offset += ${c-s};
                    ${p};
                `)}s=c}let n=f.join(`
`);return Function("uv","data","dataInt32","offset",n)}function x(t,e){return`
        for (let i = 0; i < ${t*e}; i++) {
            data[offset + (((i / ${t})|0) * 4) + (i % ${t})] = v[i];
        }
    `}var Ft={f32:`
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
        }`,"mat3x2<f32>":x(3,2),"mat4x2<f32>":x(4,2),"mat2x3<f32>":x(2,3),"mat4x3<f32>":x(4,3),"mat2x4<f32>":x(2,4),"mat3x4<f32>":x(3,4)},rr={...Ft,"mat2x2<f32>":`
        data[offset] = v[0];
        data[offset + 1] = v[1];
        data[offset + 2] = v[2];
        data[offset + 3] = v[3];
    `};function et(t,e,a,f,s){if(t=Math.max(0,t),e=Math.min(e,a*f),t>=e)return 0;let n=Math.floor(t/a),o=t-n*a,i=Math.floor(e/a),d=e-i*a;if(n===i)return s[0].set(o,n,d-o,1),1;let l=0,c=n;if(o>0)s[l++].set(o,n,a-o,1),c++;if(i>c)s[l++].set(0,c,a,i-c);if(d>0)s[l++].set(0,i,d,1);return l}
export{Ze,Jt,vt,er,tr,Me,he,Je,Ft,rr,fe,ke,K,et};
