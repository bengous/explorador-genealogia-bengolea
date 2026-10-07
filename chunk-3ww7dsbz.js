import{e,s,t,r,b,n,E,d,V,kt,H,j,O,A,k,Ee}from"./chunk-qcwtext3.js";import{ct}from"./chunk-kdba8nnn.js";var B=new t;function w(i,o){o.clear();let a=o.matrix;for(let l=0;l<i.length;l++){let c=i[l];if(c.globalDisplayStatus<7)continue;let u=c.renderGroup??c.parentRenderGroup;if(u?.isCachedAsTexture)o.matrix=B.copyFrom(u.textureOffsetInverseTransform).append(c.worldTransform);else if(u?._parentCacheAsTextureRenderGroup)o.matrix=B.copyFrom(u._parentCacheAsTextureRenderGroup.inverseWorldTransform).append(c.groupTransform);else o.matrix=c.worldTransform;o.addBounds(c.bounds)}return o.matrix=a,o}function M(i){return typeof i.getCanvasFilterString==="function"}class U{constructor(){this.skip=!1,this.useClip=!1,this.filters=null,this.container=null,this.bounds=new b,this.cssFilterString=""}}class P{constructor(i){this._filterStack=[],this._filterStackIndex=0,this._savedStates=[],this._alphaMultiplier=1,this._warnedFilterTypes=new Set,this.renderer=i}push(i){let o=this._pushFilterFrame(),a=i.filterEffect.filters;if(o.skip=!1,o.useClip=!1,o.filters=a,o.container=i.container,o.cssFilterString="",a.every((p)=>!p.enabled)){o.skip=!0;return}let l=[],c=1;for(let p of a){if(!p.enabled)continue;if(!M(p)){this._warnUnsupportedFilter(p);continue}let f=p.getCanvasFilterString();if(f===null){this._warnUnsupportedFilter(p);continue}if(f)l.push(f)}if(l.length===0&&c===1){o.skip=!0;return}o.cssFilterString=l.join(" "),this._calculateFilterArea(i,o.bounds),o.useClip=!!i.filterEffect.filterArea;let u=this.renderer.canvasContext.activeContext,h=u.filter||"none";if(this._savedStates.push({filter:h,alphaMultiplier:this._alphaMultiplier}),o.useClip&&Number.isFinite(o.bounds.width)&&Number.isFinite(o.bounds.height)&&o.bounds.width>0&&o.bounds.height>0){let p=this.renderer.canvasContext.activeResolution||1;u.save(),u.setTransform(1,0,0,1,0,0),u.beginPath(),u.rect(o.bounds.x*p,o.bounds.y*p,o.bounds.width*p,o.bounds.height*p),u.clip()}else o.useClip=!1;if(c!==1)this._alphaMultiplier*=c;if(o.cssFilterString)u.filter=h!=="none"?`${h} ${o.cssFilterString}`:o.cssFilterString}pop(){let i=this._popFilterFrame();if(i.skip)return;let o=this._savedStates.pop();if(!o)return;let a=this.renderer.canvasContext.activeContext;if(i.useClip)a.restore();else a.filter=o.filter;this._alphaMultiplier=o.alphaMultiplier}generateFilteredTexture({texture:i,filters:o}){if(!o?.length||o.every((T)=>!T.enabled))return i;let a=[],l=1;for(let T of o){if(!T.enabled)continue;if(!M(T)){this._warnUnsupportedFilter(T);continue}let _=T.getCanvasFilterString();if(_===null){this._warnUnsupportedFilter(T);continue}if(_)a.push(_)}if(a.length===0&&l===1)return i;let c=d.getCanvasSource(i);if(!c)return i;let u=i.frame,h=i.source._resolution??i.source.resolution??1,{width:p,height:f}=u,g=V.getOptimalCanvasAndContext(p,f,h),{canvas:x,context:m}=g;if(m.setTransform(1,0,0,1,0,0),m.clearRect(0,0,x.width,x.height),a.length)m.filter=a.join(" ");if(l!==1)m.globalAlpha=l;let F=u.x*h,y=u.y*h,v=p*h,S=f*h;return m.drawImage(c,F,y,v,S,0,0,v,S),m.filter="none",m.globalAlpha=1,kt(x,p,f,h)}_calculateFilterArea(i,o){if(i.renderables)w(i.renderables,o);else if(i.filterEffect.filterArea)o.clear(),o.addRect(i.filterEffect.filterArea),o.applyMatrix(i.container.worldTransform);else i.container.getFastGlobalBounds(!0,o);if(i.container){let l=(i.container.renderGroup||i.container.parentRenderGroup)?.cacheToLocalTransform;if(l)o.applyMatrix(l)}}_warnUnsupportedFilter(i){let o=i?.constructor?.name||"Filter";if(this._warnedFilterTypes.has(o))return;this._warnedFilterTypes.add(o),console.warn(`CanvasRenderer: filter "${o}" is not supported in Canvas2D and will be skipped.`)}get alphaMultiplier(){return this._alphaMultiplier}_pushFilterFrame(){let i=this._filterStack[this._filterStackIndex];if(!i)i=this._filterStack[this._filterStackIndex]=new U;return this._filterStackIndex++,i}_popFilterFrame(){if(this._filterStackIndex<=0)return this._filterStack[0];return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}destroy(){this._filterStack=null,this._savedStates=null,this._warnedFilterTypes=null,this._alphaMultiplier=1}}P.extension={type:[e.CanvasSystem],name:"filter"};class G{constructor(i){this._renderer=i}push(i,o,a){this._renderer.renderPipes.batch.break(a),a.add({renderPipeId:"filter",canBundle:!1,action:"pushFilter",container:o,filterEffect:i})}pop(i,o,a){this._renderer.renderPipes.batch.break(a),a.add({renderPipeId:"filter",action:"popFilter",canBundle:!1})}execute(i){if(i.action==="pushFilter")this._renderer.filter.push(i);else if(i.action==="popFilter")this._renderer.filter.pop()}destroy(){this._renderer=null}}G.extension={type:[e.WebGLPipes,e.WebGPUPipes,e.CanvasPipes],name:"filter"};var z=`in vec2 aPosition;
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
`;var C=`struct GlobalFilterUniforms {
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
`;class I extends ct{constructor(){let i=j.from({vertex:{source:C,entryPoint:"mainVertex"},fragment:{source:C,entryPoint:"mainFragment"},name:"passthrough-filter"}),o=H.from({vertex:z,fragment:q,name:"passthrough-filter"});super({gpuProgram:i,glProgram:o})}}var W=new Ee({attributes:{aPosition:{buffer:new Float32Array([0,0,1,0,1,1,0,1]),format:"float32x2",stride:8,offset:0}},indexBuffer:new Uint32Array([0,1,2,0,2,3])});class L{constructor(){this.skip=!1,this.inputTexture=null,this.backTexture=null,this.filters=null,this.bounds=new b,this.container=null,this.blendRequired=!1,this.outputRenderSurface=null,this.firstEnabledIndex=-1,this.lastEnabledIndex=-1}}class R{constructor(i){this._filterStackIndex=0,this._filterStack=[],this._filterGlobalUniforms=new k({uInputSize:{value:new Float32Array(4),type:"vec4<f32>"},uInputPixel:{value:new Float32Array(4),type:"vec4<f32>"},uInputClamp:{value:new Float32Array(4),type:"vec4<f32>"},uOutputFrame:{value:new Float32Array(4),type:"vec4<f32>"},uGlobalFrame:{value:new Float32Array(4),type:"vec4<f32>"},uOutputTexture:{value:new Float32Array(4),type:"vec4<f32>"}}),this._globalFilterBindGroup=new O({}),this.renderer=i}get activeBackTexture(){return this._activeFilterData?.backTexture}push(i){let o=this.renderer,a=i.filterEffect.filters,l=this._pushFilterData();l.skip=!1,l.filters=a,l.container=i.container,l.outputRenderSurface=o.renderTarget.renderSurface;let c=o.renderTarget.renderTarget.colorTexture.source,{resolution:u,antialias:h}=c;if(a.every((g)=>!g.enabled)){l.skip=!0;return}let p=l.bounds;if(this._calculateFilterArea(i,p),this._calculateFilterBounds(l,o.renderTarget.rootViewPort,h,u,1),l.skip)return;let f=this._getPreviousFilterData();this._setupFilterTextures(l,p,o,f)}generateFilteredTexture({texture:i,filters:o}){if(o.every((g)=>!g.enabled))return i;let a=this._pushFilterData();this._activeFilterData=a,a.skip=!1,a.filters=o;let l=i.source,{resolution:c,antialias:u}=l,h=a.bounds;if(h.clear(),h.addRect(i.frame),this._calculateFilterBounds(a,h.rectangle,u,c,0),a.skip)return this._popFilterData(),i;a.outputRenderSurface=E.getOptimalTexture({width:h.width,height:h.height,resolution:a.resolution,antialias:a.antialias}),a.backTexture=n.EMPTY,a.inputTexture=i,this.renderer.renderTarget.finishRenderPass(),this._applyFiltersToTexture(a,!0);let f=a.outputRenderSurface;return f.source.alphaMode="premultiplied-alpha",this._popFilterData(),f}pop(){let i=this.renderer,o=this._popFilterData();if(o.skip)return;if(i.globalUniforms.pop(),i.renderTarget.finishRenderPass(),this._activeFilterData=o,this._applyFiltersToTexture(o,!1),o.blendRequired)E.returnTexture(o.backTexture);E.returnTexture(o.inputTexture)}getBackTexture(i,o,a){let l=i.colorTexture.source._resolution,c=E.getOptimalTexture({width:o.width,height:o.height,resolution:l}),{minX:u,minY:h}=o;if(a)u-=a.minX,h-=a.minY;u=Math.floor(u*l),h=Math.floor(h*l);let p=Math.ceil(o.width*l),f=Math.ceil(o.height*l);return this.renderer.renderTarget.copyToTexture(i,c,{x:u,y:h},{width:p,height:f},{x:0,y:0}),c}applyFilter(i,o,a,l){let c=this.renderer,u=this._activeFilterData,p=u.outputRenderSurface===a,f=this._findClosestFilterData(),g=f?f.inputTexture.source._resolution:c.renderTarget.rootRenderTarget.colorTexture.source._resolution,x=0,m=0;if(p&&f)x=f.bounds.minX,m=f.bounds.minY;this._updateFilterUniforms(o,a,u,x,m,g,p,l);let F=i.enabled?i:this._getPassthroughFilter();this._setupBindGroupsAndRender(F,o,c)}calculateSpriteMatrix(i,o){let a=this._activeFilterData,l=i.set(a.inputTexture._source.width,0,0,a.inputTexture._source.height,a.bounds.minX,a.bounds.minY),c=o.worldTransform.copyTo(t.shared),u=o.renderGroup||o.parentRenderGroup;if(u&&u.cacheToLocalTransform)c.prepend(u.cacheToLocalTransform);return c.invert(),l.prepend(c),l.scale(1/o.texture.orig.width,1/o.texture.orig.height),l.translate(o.anchor.x,o.anchor.y),l}destroy(){this._passthroughFilter?.destroy(!0),this._passthroughFilter=null}_getPassthroughFilter(){return this._passthroughFilter??(this._passthroughFilter=new I),this._passthroughFilter}_setupBindGroupsAndRender(i,o,a){if(a.renderPipes.uniformBatch){let l=a.renderPipes.uniformBatch.getUboResource(this._filterGlobalUniforms);this._globalFilterBindGroup.setResource(l,0)}else this._globalFilterBindGroup.setResource(this._filterGlobalUniforms,0);if(this._globalFilterBindGroup.setResource(o.source,1),this._globalFilterBindGroup.setResource(o.source.style,2),i.groups[0]=this._globalFilterBindGroup,a.encoder.draw({geometry:W,shader:i,state:i._state,topology:"triangle-list"}),a.type===A.WEBGL)a.renderTarget.finishRenderPass()}_setupFilterTextures(i,o,a,l){if(i.backTexture=n.EMPTY,i.inputTexture=E.getOptimalTexture({width:o.width,height:o.height,resolution:i.resolution,antialias:i.antialias}),i.blendRequired){a.renderTarget.finishRenderPass();let c=a.renderTarget.getRenderTarget(i.outputRenderSurface);i.backTexture=this.getBackTexture(c,o,l?.bounds)}a.renderTarget.bind({target:i.inputTexture,clear:!0}),a.globalUniforms.push({offset:o})}_updateFilterUniforms(i,o,a,l,c,u,h,p){let f=this._filterGlobalUniforms.uniforms,{uOutputFrame:g,uInputSize:x,uInputPixel:m,uInputClamp:F,uGlobalFrame:y,uOutputTexture:v}=f;if(h)g[0]=a.bounds.minX-l,g[1]=a.bounds.minY-c;else g[0]=0,g[1]=0;g[2]=i.frame.width,g[3]=i.frame.height,x[0]=i.source.width,x[1]=i.source.height,x[2]=1/x[0],x[3]=1/x[1],m[0]=i.source.pixelWidth,m[1]=i.source.pixelHeight,m[2]=1/m[0],m[3]=1/m[1],F[0]=0.5*m[2],F[1]=0.5*m[3],F[2]=i.frame.width*x[2]-0.5*m[2],F[3]=i.frame.height*x[3]-0.5*m[3];let S=this.renderer.renderTarget.rootRenderTarget.colorTexture;if(y[0]=l*u,y[1]=c*u,y[2]=S.source.width*u,y[3]=S.source.height*u,o instanceof n)o.source.resource=null;let T=this.renderer.renderTarget.getRenderTarget(o);if(this.renderer.renderTarget.bind({target:o,clear:!!p}),o instanceof n)v[0]=o.frame.width,v[1]=o.frame.height;else v[0]=T.width,v[1]=T.height;v[2]=T.isRoot?-1:1,this._filterGlobalUniforms.update()}_findClosestFilterData(){for(let i=this._filterStackIndex-1;i>=0;i--){let o=this._filterStack[i];if(!o.skip)return o}return null}_calculateFilterArea(i,o){if(i.renderables)w(i.renderables,o);else if(i.filterEffect.filterArea)o.clear(),o.addRect(i.filterEffect.filterArea),o.applyMatrix(i.container.worldTransform);else i.container.getFastGlobalBounds(!0,o);if(i.container){let l=(i.container.renderGroup||i.container.parentRenderGroup).cacheToLocalTransform;if(l)o.applyMatrix(l)}}_applyFiltersToTexture(i,o){let{inputTexture:a,bounds:l,filters:c,firstEnabledIndex:u,lastEnabledIndex:h}=i;if(this._globalFilterBindGroup.setResource(a.source.style,2),this._globalFilterBindGroup.setResource(i.backTexture.source,3),u===h)c[u].apply(this,a,i.outputRenderSurface,o);else{let p=i.inputTexture,f=E.getOptimalTexture({width:l.width,height:l.height,resolution:p.source._resolution}),g=f;for(let x=u;x<h;x++){let m=c[x];if(!m.enabled)continue;m.apply(this,p,g,!0);let F=p;p=g,g=F}c[h].apply(this,p,i.outputRenderSurface,o),E.returnTexture(f)}}_calculateFilterBounds(i,o,a,l,c){let u=this.renderer,{bounds:h,filters:p}=i,f=1/0,g=0,x=!0,m=!1,F=!1,y=!0,v=-1,S=-1;for(let T=0;T<p.length;T++){let _=p[T];if(!_.enabled)continue;if(v===-1)v=T;if(S=T,f=Math.min(f,_.resolution==="inherit"?l:_.resolution),g+=_.padding,_.antialias==="off")x=!1;else if(_.antialias==="inherit")x&&(x=a);if(!_.clipToViewport)y=!1;if(!(_.compatibleRenderers&u.type)){F=!1;break}if(_.blendRequired&&!(u.backBuffer?.useBackBuffer??!0)){r("Blend filter requires backBuffer on WebGL renderer to be enabled. Set `useBackBuffer: true` in the renderer options."),F=!1;break}F=!0,m||(m=_.blendRequired)}if(!F){i.skip=!0;return}if(y)h.fitBounds(0,o.width/l,0,o.height/l);if(h.scale(f).ceil().scale(1/f).pad((g|0)*c),!h.isPositive){i.skip=!0;return}i.antialias=x,i.resolution=f,i.blendRequired=m,i.firstEnabledIndex=v,i.lastEnabledIndex=S}_popFilterData(){return this._filterStackIndex--,this._filterStack[this._filterStackIndex]}_getPreviousFilterData(){for(let i=this._filterStackIndex-2;i>=0;i--){let o=this._filterStack[i];if(!o.skip)return o}return null}_pushFilterData(){let i=this._filterStack[this._filterStackIndex];if(!i)i=this._filterStack[this._filterStackIndex]=new L;return this._filterStackIndex++,i}}R.extension={type:[e.WebGLSystem,e.WebGPUSystem],name:"filter"};s.add(R,P);s.add(G);
