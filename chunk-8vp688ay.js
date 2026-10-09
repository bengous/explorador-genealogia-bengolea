import{e,a,n,o,w,s,C,d,Z,Yt,z,W,N,P,S,V}from"./chunk-m68h4kkg.js";import{Et}from"./chunk-r3hrbk10.js";var A=new n;function k(t,r){r.clear();let i=r.matrix;for(let l=0;l<t.length;l++){let c=t[l];if(c.globalDisplayStatus<7)continue;let u=c.renderGroup??c.parentRenderGroup;if(u?.isCachedAsTexture)r.matrix=A.copyFrom(u.textureOffsetInverseTransform).append(c.worldTransform);else if(u?._parentCacheAsTextureRenderGroup)r.matrix=A.copyFrom(u._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(c.groupTransform);else r.matrix=c.worldTransform;r.addBounds(c.bounds)}return r.matrix=i,r}function M(t){return typeof t.getCanvasFilterString==="function"}class E{constructor(){this.skip=!1,this.useClip=!1,this.filters=null,this.container=null,this.bounds=new w,this.cssFilterString=""}}class G{constructor(t){this._filterStack=[],this._filterStackIndex=0,this._savedStates=[],this._alphaMultiplier=1,this._warnedFilterTypes=new Set,this.renderer=t}push(t){let r=this._pushFilterFrame(),i=t.filterEffect.filters;if(r.skip=!1,r.useClip=!1,r.filters=i,r.container=t.container,r.cssFilterString="",i.every((p)=>!p.enabled)){r.skip=!0;return}let l=[],c=1;for(let p of i){if(!p.enabled)continue;if(!M(p)){this._warnUnsupportedFilter(p);continue}let f=p.getCanvasFilterString();if(f===null){this._warnUnsupportedFilter(p);continue}if(f)l.push(f)}if(l.length===0&&c===1){r.skip=!0;return}r.cssFilterString=l.join(" "),this._calculateFilterArea(t,r.bounds),r.useClip=!!t.filterEffect.filterArea;let u=this.renderer.canvasContext.activeContext,h=u.filter||"none";if(this._savedStates.push({filter:h,alphaMultiplier:this._alphaMultiplier}),r.useClip&&Number.isFinite(r.bounds.width)&&Number.isFinite(r.bounds.height)&&r.bounds.width>0&&r.bounds.height>0){let p=this.renderer.canvasContext.activeResolution||1;u.save(),u.setTransform(1,0,0,1,0,0),u.beginPath(),u.rect(r.bounds.x*p,r.bounds.y*p,r.bounds.width*p,r.bounds.height*p),u.clip()}else r.useClip=!1;if(c!==1)this._alphaMultiplier*=c;if(r.cssFilterString)u.filter=h!=="none"?`${h} ${r.cssFilterString}`:r.cssFilterString}pop(){let t=this._popFilterFrame();if(t.skip)return;let r=this._savedStates.pop();if(!r)return;let i=this.renderer.canvasContext.activeContext;if(t.useClip)i.restore();else i.filter=r.filter;this._alphaMultiplier=r.alphaMultiplier}generateFilteredTexture({texture:t,filters:r}){if(!r?.length||r.every((T)=>!T.enabled))return t;let i=[],l=1;for(let T of r){if(!T.enabled)continue;if(!M(T)){this._warnUnsupportedFilter(T);continue}let _=T.getCanvasFilterString();if(_===null){this._warnUnsupportedFilter(T);continue}if(_)i.push(_)}if(i.length===0&&l===1)return t;let c=d.getCanvasSource(t);if(!c)return t;let u=t.frame,h=t.source._resolution??t.source.resolution??1,{width:p,height:f}=u,g=Z.getOptimalCanvasAndContext(p,f,h),{canvas:x,context:m}=g;if(m.setTransform(1,0,0,1,0,0),m.clearRect(0,0,x.width,x.height),i.length)m.filter=i.join(" ");if(l!==1)m.globalAlpha=l;let F=u.x*h,v=u.y*h,b=p*h,y=f*h;return m.drawImage(c,F,v,b,y,0,0,b,y),m.filter="none",m.globalAlpha=1,Yt(x,p,f,h)}_calculateFilterArea(t,r){if(t.renderables)k(t.renderables,r);else if(t.filterEffect.filterArea)r.clear(),r.addRect(t.filterEffect.filterArea),r.applyMatrix(t.container.worldTransform);else t.container.getFastGlobalBounds(!0,r);if(t.container){let l=(t.container.renderGroup||t.container.parentRenderGroup)?.cacheToLocalTransform;if(l)r.applyMatrix(l)}}_warnUnsupportedFilter(t){let r=t?.constructor?.name||"Filter";if(this._warnedFilterTypes.has(r))return;this._warnedFilterTypes.add(r),console.warn(`CanvasRenderer: filter "${r}" is not supported in Canvas2D and will be skipped.`)}get alphaMultiplier(){return this._alphaMultiplier}_pushFilterFrame(){let t=this._filterStack[this._filterStackIndex];if(!t)t=this._filterStack[this._filterStackIndex]=new E;return this._filterStackIndex++,t}_popFilterFrame(){if(this._filterStackIndex<=0)return this._filterStack[0];return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}destroy(){this._filterStack=null,this._savedStates=null,this._warnedFilterTypes=null,this._alphaMultiplier=1}}G.extension={type:[e.CanvasSystem],name:"filter"};class R{constructor(t){this._renderer=t}push(t,r,i){this._renderer.renderPipes.batch.break(i),i.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:r,filterEffect:t})}pop(t,r,i){this._renderer.renderPipes.batch.break(i),i.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(t){if(t.action==="pushFilter")this._renderer.filter.push(t);else if(t.action==="popFilter")this._renderer.filter.pop()}destroy(){this._renderer=null}}R.extension={type:[e.WebGLPipes,e.WebGPUPipes,e.CanvasPipes],name:"filter"};var U=`in vec2 aPosition;
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
`;var q=`in vec2 vTextureCoord;
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
`;class O extends Et{constructor(){let t=W.from({vertex:{source:B,entryPoint:"mainVertex"},fragment:{source:B,entryPoint:"mainFragment"},name:"passthrough-filter"}),r=z.from({vertex:U,fragment:q,name:"passthrough-filter"});super({gpuProgram:t,glProgram:r})}}var Y=new V({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class L{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new w,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}}class I{constructor(t){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new S({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new N({}),this.renderer=t}get activeBackTexture(){return this._activeFilterData?.backTexture}push(t){let r=this.renderer,i=t.filterEffect.filters,l=this._pushFilterData();l.skip=!1,l.filters=i,l.container=t.container,l.outputRenderSurface=r.renderTarget.renderSurface;let c=r.renderTarget.renderTarget.colorTexture.source,{resolution:u,antialias:h}=c;if(i.every((g)=>!g.enabled)){l.skip=!0;return}let p=l.bounds;if(this._calculateFilterArea(t,p),this._calculateFilterBounds(l,r.renderTarget.rootViewPort,h,u,1),l.skip)return;let f=this._getPreviousFilterData();this._setupFilterTextures(l,p,r,f)}generateFilteredTexture({texture:t,filters:r}){if(r.every((g)=>!g.enabled))return t;let i=this._pushFilterData();this._activeFilterData=i,i.skip=!1,i.filters=r;let l=t.source,{resolution:c,antialias:u}=l,h=i.bounds;if(h.clear(),h.addRect(t.frame),this._calculateFilterBounds(i,h.rectangle,u,c,0),i.skip)return this._popFilterData(),t;i.outputRenderSurface=C.getOptimalTexture({width:h.width,height:h.height,resolution:i.resolution,antialias:i.antialias}),i.backTexture=s.EMPTY,i.inputTexture=t,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(i,!0);let f=i.outputRenderSurface;return f.source.alphaMode="premultiplied-alpha",this._popFilterData(),f}pop(){let t=this.renderer,r=this._popFilterData();if(r.skip)return;if(t.globalUniforms.pop(),t.renderTarget.finishRenderPass(),this._activeFilterData=r,this._applyFiltersToTexture(r,!1),r.blendRequired)C.returnTexture(r.backTexture);C.returnTexture(r.inputTexture)}getBackTexture(t,r,i){let l=t.colorTexture.source._resolution,c=C.getOptimalTexture({width:r.width,height:r.height,resolution:l}),{minX:u,minY:h}=r;if(i)u-=i.minX,h-=i.minY;u=Math.floor(u*l),h=Math.floor(h*l);let p=Math.ceil(r.width*l),f=Math.ceil(r.height*l);return this.renderer.renderTarget.copyToTexture(t,c,{x:u,y:h},{width:p,height:f},{x:0,y:0}),c}applyFilter(t,r,i,l){let c=this.renderer,u=this._activeFilterData,p=u.outputRenderSurface===i,f=this._findClosestFilterData(),g=f?f.inputTexture.source._resolution:c.renderTarget.rootRenderTarget.colorTexture.source._resolution,x=0,m=0;if(p&&f)x=f.bounds.minX,m=f.bounds.minY;this._updateFilterUniforms(r,i,u,x,m,g,p,l);let F=t.enabled?t:this._getPassthroughFilter();this._setupBindGroupsAndRender(F,r,c)}calculateSpriteMatrix(t,r){let i=this._activeFilterData,l=t.set(i.inputTexture._source.width,0,0,i.inputTexture._source.height,i.bounds.minX,i.bounds.minY),c=r.worldTransform.copyTo(n.shared),u=r.renderGroup||r.parentRenderGroup;if(u&&u.cacheToLocalTransform)c.prepend(u.cacheToLocalTransform);return c.invert(),l.prepend(c),l.scale(1/r.texture.orig.width,1/r.texture.orig.height),l.translate(r.anchor.x,r.anchor.y),l}destroy(){this._passthroughFilter?.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){return this._passthroughFilter??(this._passthroughFilter=new O),this._passthroughFilter}_setupBindGroupsAndRender(t,r,i){if(i.renderPipes.uniformBatch){let l=i.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(l,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);if(this._globalFilterBindGroup.setResource(r.source,1),this._globalFilterBindGroup.setResource(r.source.style,2),t.groups[0]=this._globalFilterBindGroup,i.encoder.draw({geometry:Y,shader:t,state:t._state,topology:"triangle-list"}),i.type===P.WEBGL)i.renderTarget.finishRenderPass()}_setupFilterTextures(t,r,i,l){if(t.backTexture=s.EMPTY,t.inputTexture=C.getOptimalTexture({width:r.width,height:r.height,resolution:t.resolution,antialias:t.antialias}),t.blendRequired){i.renderTarget.finishRenderPass();let c=i.renderTarget.getRenderTarget(t.outputRenderSurface);t.backTexture=this.getBackTexture(c,r,l?.bounds)}i.renderTarget.bind({target:t.inputTexture,clear:!0}),i.globalUniforms.push({offset:r})}_updateFilterUniforms(t,r,i,l,c,u,h,p){let f=this._filterGlobalUniforms.uniforms,{uOutputFrame:g,uInputSize:x,uInputPixel:m,uInputClamp:F,uGlobalFrame:v,uOutputTexture:b}=f;if(h)g[0]=i.bounds.minX-l,g[1]=i.bounds.minY-c;else g[0]=0,g[1]=0;g[2]=t.frame.width,g[3]=t.frame.height,x[0]=t.source.width,x[1]=t.source.height,x[2]=1/x[0],x[3]=1/x[1],m[0]=t.source.pixelWidth,m[1]=t.source.pixelHeight,m[2]=1/m[0],m[3]=1/m[1],F[0]=0.5*m[2],F[1]=0.5*m[3],F[2]=t.frame.width*x[2]-0.5*m[2],F[3]=t.frame.height*x[3]-0.5*m[3];let y=this.renderer.renderTarget.rootRenderTarget.colorTexture;if(v[0]=l*u,v[1]=c*u,v[2]=y.source.width*u,v[3]=y.source.height*u,r instanceof s)r.source.resource=null;let T=this.renderer.renderTarget.getRenderTarget(r);if(this.renderer.renderTarget.bind({target:r,clear:!!p}),r instanceof s)b[0]=r.frame.width,b[1]=r.frame.height;else b[0]=T.width,b[1]=T.height;b[2]=T.isRoot?-1:1,this._filterGlobalUniforms.update()}_findClosestFilterData(){for(let t=this._filterStackIndex-1;t>=0;t--){let r=this._filterStack[t];if(!r.skip)return r}return null}_calculateFilterArea(t,r){if(t.renderables)k(t.renderables,r);else if(t.filterEffect.filterArea)r.clear(),r.addRect(t.filterEffect.filterArea),r.applyMatrix(t.container.worldTransform);else t.container.getFastGlobalBounds(!0,r);if(t.container){let l=(t.container.renderGroup||t.container.parentRenderGroup).cacheToLocalTransform;if(l)r.applyMatrix(l)}}_applyFiltersToTexture(t,r){let{inputTexture:i,bounds:l,filters:c,firstEnabledIndex:u,lastEnabledIndex:h}=t;if(this._globalFilterBindGroup.setResource(i.source.style,2),this._globalFilterBindGroup.setResource(t.backTexture.source,3),u===h)c[u].apply(this,i,t.outputRenderSurface,r);else{let p=t.inputTexture,f=C.getOptimalTexture({width:l.width,height:l.height,resolution:p.source._resolution}),g=f;for(let x=u;x<h;x++){let m=c[x];if(!m.enabled)continue;m.apply(this,p,g,!0);let F=p;p=g,g=F}c[h].apply(this,p,t.outputRenderSurface,r),C.returnTexture(f)}}_calculateFilterBounds(t,r,i,l,c){let u=this.renderer,{bounds:h,filters:p}=t,f=1/0,g=0,x=!0,m=!1,F=!1,v=!0,b=-1,y=-1;for(let T=0;T<p.length;T++){let _=p[T];if(!_.enabled)continue;if(b===-1)b=T;if(y=T,f=Math.min(f,_.resolution==="inherit"?l:_.resolution),g+=_.padding,_.antialias==="off")x=!1;else if(_.antialias==="inherit")x&&(x=i);if(!_.clipToViewport)v=!1;if(!(_.compatibleRenderers&u.type)){F=!1;break}if(_.blendRequired&&!(u.backBuffer?.useBackBuffer??!0)){o("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),F=!1;break}F=!0,m||(m=_.blendRequired)}if(!F){t.skip=!0;return}if(v)h.fitBounds(0,r.width/l,0,r.height/l);if(h.scale(f).ceil().scale(1/f).pad((g|0)*c),!h.isPositive){t.skip=!0;return}t.antialias=x,t.resolution=f,t.blendRequired=m,t.firstEnabledIndex=b,t.lastEnabledIndex=y}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){for(let t=this._filterStackIndex-2;t>=0;t--){let r=this._filterStack[t];if(!r.skip)return r}return null}_pushFilterData(){let t=this._filterStack[this._filterStackIndex];if(!t)t=this._filterStack[this._filterStackIndex]=new L;return this._filterStackIndex++,t}}I.extension={type:[e.WebGLSystem,e.WebGPUSystem],name:"filter"};a.add(I,G);a.add(R);
