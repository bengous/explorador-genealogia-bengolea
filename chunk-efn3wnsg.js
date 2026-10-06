import{e,s,t,r,x,n,T,u,N,dt,U,z,I,C,A,ye}from"./chunk-kxse38jw.js";import{et}from"./chunk-gm0hxe47.js";var M=new t;function k(i,o){o.clear();let a=o.matrix;for(let l=0;l<i.length;l++){let p=i[l];if(p.globalDisplayStatus<7)continue;let c=p.renderGroup??p.parentRenderGroup;if(c?.isCachedAsTexture)o.matrix=M.copyFrom(c.textureOffsetInverseTransform).append(p.worldTransform);else if(c?._parentCacheAsTextureRenderGroup)o.matrix=M.copyFrom(c._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(p.groupTransform);else o.matrix=p.worldTransform;o.addBounds(p.bounds)}return o.matrix=a,o}function E(i){return typeof i.getCanvasFilterString==="function"}class V{constructor(){this.skip=!1,this.useClip=!1,this.filters=null,this.container=null,this.bounds=new x,this.cssFilterString=""}}class P{constructor(i){this._filterStack=[],this._filterStackIndex=0,this._savedStates=[],this._alphaMultiplier=1,this._warnedFilterTypes=new Set,this.renderer=i}push(i){let o=this._pushFilterFrame(),a=i.filterEffect.filters;if(o.skip=!1,o.useClip=!1,o.filters=a,o.container=i.container,o.cssFilterString="",a.every((f)=>!f.enabled)){o.skip=!0;return}let l=[],p=1;for(let f of a){if(!f.enabled)continue;if(!E(f)){this._warnUnsupportedFilter(f);continue}let d=f.getCanvasFilterString();if(d===null){this._warnUnsupportedFilter(f);continue}if(d)l.push(d)}if(l.length===0&&p===1){o.skip=!0;return}o.cssFilterString=l.join(" "),this._calculateFilterArea(i,o.bounds),o.useClip=!!i.filterEffect.filterArea;let c=this.renderer.canvasContext.activeContext,h=c.filter||"none";if(this._savedStates.push({filter:h,alphaMultiplier:this._alphaMultiplier}),o.useClip&&Number.isFinite(o.bounds.width)&&Number.isFinite(o.bounds.height)&&o.bounds.width>0&&o.bounds.height>0){let f=this.renderer.canvasContext.activeResolution||1;c.save(),c.setTransform(1,0,0,1,0,0),c.beginPath(),c.rect(o.bounds.x*f,o.bounds.y*f,o.bounds.width*f,o.bounds.height*f),c.clip()}else o.useClip=!1;if(p!==1)this._alphaMultiplier*=p;if(o.cssFilterString)c.filter=h!=="none"?`${h} ${o.cssFilterString}`:o.cssFilterString}pop(){let i=this._popFilterFrame();if(i.skip)return;let o=this._savedStates.pop();if(!o)return;let a=this.renderer.canvasContext.activeContext;if(i.useClip)a.restore();else a.filter=o.filter;this._alphaMultiplier=o.alphaMultiplier}generateFilteredTexture({texture:i,filters:o}){if(!o?.length||o.every((_)=>!_.enabled))return i;let a=[],l=1;for(let _ of o){if(!_.enabled)continue;if(!E(_)){this._warnUnsupportedFilter(_);continue}let v=_.getCanvasFilterString();if(v===null){this._warnUnsupportedFilter(_);continue}if(v)a.push(v)}if(a.length===0&&l===1)return i;let p=u.getCanvasSource(i);if(!p)return i;let c=i.frame,h=i.source._resolution??i.source.resolution??1,{width:f,height:d}=c,F=N.getOptimalCanvasAndContext(f,d,h),{canvas:g,context:m}=F;if(m.setTransform(1,0,0,1,0,0),m.clearRect(0,0,g.width,g.height),a.length)m.filter=a.join(" ");if(l!==1)m.globalAlpha=l;let b=c.x*h,S=c.y*h,y=f*h,w=d*h;return m.drawImage(p,b,S,y,w,0,0,y,w),m.filter="none",m.globalAlpha=1,dt(g,f,d,h)}_calculateFilterArea(i,o){if(i.renderables)k(i.renderables,o);else if(i.filterEffect.filterArea)o.clear(),o.addRect(i.filterEffect.filterArea),o.applyMatrix(i.container.worldTransform);else i.container.getFastGlobalBounds(!0,o);if(i.container){let l=(i.container.renderGroup||i.container.parentRenderGroup)?.cacheToLocalTransform;if(l)o.applyMatrix(l)}}_warnUnsupportedFilter(i){let o=i?.constructor?.name||"Filter";if(this._warnedFilterTypes.has(o))return;this._warnedFilterTypes.add(o),console.warn(`CanvasRenderer: filter "${o}" is not supported in Canvas2D and will be skipped.`)}get alphaMultiplier(){return this._alphaMultiplier}_pushFilterFrame(){let i=this._filterStack[this._filterStackIndex];if(!i)i=this._filterStack[this._filterStackIndex]=new V;return this._filterStackIndex++,i}_popFilterFrame(){if(this._filterStackIndex<=0)return this._filterStack[0];return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}destroy(){this._filterStack=null,this._savedStates=null,this._warnedFilterTypes=null,this._alphaMultiplier=1}}P.extension={type:[e.CanvasSystem],name:"filter"};class G{constructor(i){this._renderer=i}push(i,o,a){this._renderer.renderPipes.batch.break(a),a.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:o,filterEffect:i})}pop(i,o,a){this._renderer.renderPipes.batch.break(a),a.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(i){if(i.action==="pushFilter")this._renderer.filter.push(i);else if(i.action==="popFilter")this._renderer.filter.pop()}destroy(){this._renderer=null}}G.extension={type:[e.WebGLPipes,e.WebGPUPipes,e.CanvasPipes],name:"filter"};var q=`in vec2 aPosition;
out vec2 vTextureCoord;

uniform vec4 uInputSize;
uniform vec4 uOutputFrame;
uniform vec4 uOutputTexture;

vec4 filterVertexPosition( void )
{
    vec2 position = aPosition * uOutputFrame.zw + uOutputFrame.xy;
    
    position.x = position.x * (2.0 / uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0*uOutputTexture.z / uOutputTexture.y) - uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

vec2 filterTextureCoord( void )
{
    return aPosition * (uOutputFrame.zw * uInputSize.zw);
}

void main(void)
{
    gl_Position = filterVertexPosition();
    vTextureCoord = filterTextureCoord();
}
`;var L=`in vec2 vTextureCoord;
out vec4 finalColor;
uniform sampler2D uTexture;
void main() {
    finalColor = texture(uTexture, vTextureCoord);
}
`;var B=`struct GlobalFilterUniforms {
  uInputSize: vec4<f32>,
  uInputPixel: vec4<f32>,
  uInputClamp: vec4<f32>,
  uOutputFrame: vec4<f32>,
  uGlobalFrame: vec4<f32>,
  uOutputTexture: vec4<f32>,
};

@group(0) @binding(0) var <uniform> gfu: GlobalFilterUniforms;
@group(0) @binding(1) var uTexture: texture_2d<f32>;
@group(0) @binding(2) var uSampler: sampler;

struct VSOutput {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>
};

fn filterVertexPosition(aPosition: vec2<f32>) -> vec4<f32>
{
    var position = aPosition * gfu.uOutputFrame.zw + gfu.uOutputFrame.xy;

    position.x = position.x * (2.0 / gfu.uOutputTexture.x) - 1.0;
    position.y = position.y * (2.0 * gfu.uOutputTexture.z / gfu.uOutputTexture.y) - gfu.uOutputTexture.z;

    return vec4(position, 0.0, 1.0);
}

fn filterTextureCoord(aPosition: vec2<f32>) -> vec2<f32>
{
    return aPosition * (gfu.uOutputFrame.zw * gfu.uInputSize.zw);
}

@vertex
fn mainVertex(
  @location(0) aPosition: vec2<f32>,
) -> VSOutput {
  return VSOutput(
   filterVertexPosition(aPosition),
   filterTextureCoord(aPosition)
  );
}

@fragment
fn mainFragment(
  @location(0) uv: vec2<f32>,
) -> @location(0) vec4<f32> {
    return textureSample(uTexture, uSampler, uv);
}
`;class O extends et{constructor(){let i=z.from({vertex:{source:B,entryPoint:"mainVertex"},fragment:{source:B,entryPoint:"mainFragment"},name:"passthrough-filter"}),o=U.from({vertex:q,fragment:L,name:"passthrough-filter"});super({gpuProgram:i,glProgram:o})}}var Y=new ye({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class W{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new x,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}}class R{constructor(i){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new A({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new I({}),this.renderer=i}get activeBackTexture(){return this._activeFilterData?.backTexture}push(i){let o=this.renderer,a=i.filterEffect.filters,l=this._pushFilterData();l.skip=!1,l.filters=a,l.container=i.container,l.outputRenderSurface=o.renderTarget.renderSurface;let p=o.renderTarget.renderTarget.colorTexture.source,{resolution:c,antialias:h}=p;if(a.every((F)=>!F.enabled)){l.skip=!0;return}let f=l.bounds;if(this._calculateFilterArea(i,f),this._calculateFilterBounds(l,o.renderTarget.rootViewPort,h,c,1),l.skip)return;let d=this._getPreviousFilterData();this._setupFilterTextures(l,f,o,d)}generateFilteredTexture({texture:i,filters:o}){if(o.every((F)=>!F.enabled))return i;let a=this._pushFilterData();this._activeFilterData=a,a.skip=!1,a.filters=o;let l=i.source,{resolution:p,antialias:c}=l,h=a.bounds;if(h.clear(),h.addRect(i.frame),this._calculateFilterBounds(a,h.rectangle,c,p,0),a.skip)return this._popFilterData(),i;a.outputRenderSurface=T.getOptimalTexture({width:h.width,height:h.height,resolution:a.resolution,antialias:a.antialias}),a.backTexture=n.EMPTY,a.inputTexture=i,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(a,!0);let d=a.outputRenderSurface;return d.source.alphaMode="premultiplied-alpha",this._popFilterData(),d}pop(){let i=this.renderer,o=this._popFilterData();if(o.skip)return;if(i.globalUniforms.pop(),i.renderTarget.finishRenderPass(),this._activeFilterData=o,this._applyFiltersToTexture(o,!1),o.blendRequired)T.returnTexture(o.backTexture);T.returnTexture(o.inputTexture)}getBackTexture(i,o,a){let l=i.colorTexture.source._resolution,p=T.getOptimalTexture({width:o.width,height:o.height,resolution:l}),{minX:c,minY:h}=o;if(a)c-=a.minX,h-=a.minY;c=Math.floor(c*l),h=Math.floor(h*l);let f=Math.ceil(o.width*l),d=Math.ceil(o.height*l);return this.renderer.renderTarget.copyToTexture(i,p,{x:c,y:h},{width:f,height:d},{x:0,y:0}),p}applyFilter(i,o,a,l){let p=this.renderer,c=this._activeFilterData,f=c.outputRenderSurface===a,d=this._findClosestFilterData(),F=d?d.inputTexture.source._resolution:p.renderTarget.rootRenderTarget.colorTexture.source._resolution,g=0,m=0;if(f&&d)g=d.bounds.minX,m=d.bounds.minY;this._updateFilterUniforms(o,a,c,g,m,F,f,l);let b=i.enabled?i:this._getPassthroughFilter();this._setupBindGroupsAndRender(b,o,p)}calculateSpriteMatrix(i,o){let a=this._activeFilterData,l=i.set(a.inputTexture._source.width,0,0,a.inputTexture._source.height,a.bounds.minX,a.bounds.minY),p=o.worldTransform.copyTo(t.shared),c=o.renderGroup||o.parentRenderGroup;if(c&&c.cacheToLocalTransform)p.prepend(c.cacheToLocalTransform);return p.invert(),l.prepend(p),l.scale(1/o.texture.orig.width,1/o.texture.orig.height),l.translate(o.anchor.x,o.anchor.y),l}destroy(){this._passthroughFilter?.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){return this._passthroughFilter??(this._passthroughFilter=new O),this._passthroughFilter}_setupBindGroupsAndRender(i,o,a){if(a.renderPipes.uniformBatch){let l=a.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(l,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);if(this._globalFilterBindGroup.setResource(o.source,1),this._globalFilterBindGroup.setResource(o.source.style,2),i.groups[0]=this._globalFilterBindGroup,a.encoder.draw({geometry:Y,shader:i,state:i._state,topology:"triangle-list"}),a.type===C.WEBGL)a.renderTarget.finishRenderPass()}_setupFilterTextures(i,o,a,l){if(i.backTexture=n.EMPTY,i.inputTexture=T.getOptimalTexture({width:o.width,height:o.height,resolution:i.resolution,antialias:i.antialias}),i.blendRequired){a.renderTarget.finishRenderPass();let p=a.renderTarget.getRenderTarget(i.outputRenderSurface);i.backTexture=this.getBackTexture(p,o,l?.bounds)}a.renderTarget.bind({target:i.inputTexture,clear:!0}),a.globalUniforms.push({offset:o})}_updateFilterUniforms(i,o,a,l,p,c,h,f){let d=this._filterGlobalUniforms.uniforms,{uOutputFrame:F,uInputSize:g,uInputPixel:m,uInputClamp:b,uGlobalFrame:S,uOutputTexture:y}=d;if(h)F[0]=a.bounds.minX-l,F[1]=a.bounds.minY-p;else F[0]=0,F[1]=0;F[2]=i.frame.width,F[3]=i.frame.height,g[0]=i.source.width,g[1]=i.source.height,g[2]=1/g[0],g[3]=1/g[1],m[0]=i.source.pixelWidth,m[1]=i.source.pixelHeight,m[2]=1/m[0],m[3]=1/m[1],b[0]=0.5*m[2],b[1]=0.5*m[3],b[2]=i.frame.width*g[2]-0.5*m[2],b[3]=i.frame.height*g[3]-0.5*m[3];let w=this.renderer.renderTarget.rootRenderTarget.colorTexture;if(S[0]=l*c,S[1]=p*c,S[2]=w.source.width*c,S[3]=w.source.height*c,o instanceof n)o.source.resource=null;let _=this.renderer.renderTarget.getRenderTarget(o);if(this.renderer.renderTarget.bind({target:o,clear:!!f}),o instanceof n)y[0]=o.frame.width,y[1]=o.frame.height;else y[0]=_.width,y[1]=_.height;y[2]=_.isRoot?-1:1,this._filterGlobalUniforms.update()}_findClosestFilterData(){for(let i=this._filterStackIndex-1;i>=0;i--){let o=this._filterStack[i];if(!o.skip)return o}return null}_calculateFilterArea(i,o){if(i.renderables)k(i.renderables,o);else if(i.filterEffect.filterArea)o.clear(),o.addRect(i.filterEffect.filterArea),o.applyMatrix(i.container.worldTransform);else i.container.getFastGlobalBounds(!0,o);if(i.container){let l=(i.container.renderGroup||i.container.parentRenderGroup).cacheToLocalTransform;if(l)o.applyMatrix(l)}}_applyFiltersToTexture(i,o){let{inputTexture:a,bounds:l,filters:p,firstEnabledIndex:c,lastEnabledIndex:h}=i;if(this._globalFilterBindGroup.setResource(a.source.style,2),this._globalFilterBindGroup.setResource(i.backTexture.source,3),c===h)p[c].apply(this,a,i.outputRenderSurface,o);else{let f=i.inputTexture,d=T.getOptimalTexture({width:l.width,height:l.height,resolution:f.source._resolution}),F=d;for(let g=c;g<h;g++){let m=p[g];if(!m.enabled)continue;m.apply(this,f,F,!0);let b=f;f=F,F=b}p[h].apply(this,f,i.outputRenderSurface,o),T.returnTexture(d)}}_calculateFilterBounds(i,o,a,l,p){let c=this.renderer,{bounds:h,filters:f}=i,d=1/0,F=0,g=!0,m=!1,b=!1,S=!0,y=-1,w=-1;for(let _=0;_<f.length;_++){let v=f[_];if(!v.enabled)continue;if(y===-1)y=_;if(w=_,d=Math.min(d,v.resolution==="inherit"?l:v.resolution),F+=v.padding,v.antialias==="off")g=!1;else if(v.antialias==="inherit")g&&(g=a);if(!v.clipToViewport)S=!1;if(!(v.compatibleRenderers&c.type)){b=!1;break}if(v.blendRequired&&!(c.backBuffer?.useBackBuffer??!0)){r("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),b=!1;break}b=!0,m||(m=v.blendRequired)}if(!b){i.skip=!0;return}if(S)h.fitBounds(0,o.width/l,0,o.height/l);if(h.scale(d).ceil().scale(1/d).pad((F|0)*p),!h.isPositive){i.skip=!0;return}i.antialias=g,i.resolution=d,i.blendRequired=m,i.firstEnabledIndex=y,i.lastEnabledIndex=w}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){for(let i=this._filterStackIndex-2;i>=0;i--){let o=this._filterStack[i];if(!o.skip)return o}return null}_pushFilterData(){let i=this._filterStack[this._filterStackIndex];if(!i)i=this._filterStack[this._filterStackIndex]=new W;return this._filterStackIndex++,i}}R.extension={type:[e.WebGLSystem,e.WebGPUSystem],name:"filter"};s.add(R,P);s.add(G);
