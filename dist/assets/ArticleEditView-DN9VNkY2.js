import{ab as BaseTransition,ac as BaseTransitionPropsValidators,ad as Comment,ae as DeprecationTypes,af as EffectScope,ag as ErrorCodes,ah as ErrorTypeStrings,F as Fragment,ai as KeepAlive,aj as ReactiveEffect,ak as Static,al as Suspense,am as Teleport,an as Text,ao as TrackOpTypes,ap as Transition,aq as TransitionGroup,ar as TriggerOpTypes,as as VueElement,at as assertNumber,au as callWithAsyncErrorHandling,av as callWithErrorHandling,aw as camelize,ax as capitalize,ay as cloneVNode,az as compatUtils,y as computed,aA as createApp,i as createBlock,j as createCommentVNode,c as createElementBlock,a as createBaseVNode,aB as createHydrationRenderer,aC as createPropsRestProxy,aD as createRenderer,aE as createSSRApp,aF as createSlots,aG as createStaticVNode,l as createTextVNode,b as createVNode,aH as customRef,aI as defineAsyncComponent,aJ as defineComponent,aK as defineCustomElement,aL as defineEmits,aM as defineExpose,aN as defineModel,aO as defineOptions,aP as defineProps,aQ as defineSSRCustomElement,aR as defineSlots,aS as devtools,aT as effect,aU as effectScope,aV as getCurrentInstance,aW as getCurrentScope,aX as getCurrentWatcher,aY as getTransitionRawChildren,aZ as guardReactiveProps,a_ as h,a$ as handleError,b0 as hasInjectionContext,b1 as hydrate,b2 as hydrateOnIdle,b3 as hydrateOnInteraction,b4 as hydrateOnMediaQuery,b5 as hydrateOnVisible,b6 as initCustomFormatter,b7 as initDirectivesForSSR,b8 as inject,b9 as isMemoSame,ba as isProxy,bb as isReactive,bc as isReadonly,bd as isRef,be as isRuntimeOnly,bf as isShallow,bg as isVNode,bh as markRaw,bi as mergeDefaults,bj as mergeModels,bk as mergeProps,A as nextTick,bl as nodeOps,n as normalizeClass,bm as normalizeProps,x as normalizeStyle,bn as onActivated,bo as onBeforeMount,bp as onBeforeUnmount,bq as onBeforeUpdate,br as onDeactivated,bs as onErrorCaptured,o as onMounted,bt as onRenderTracked,bu as onRenderTriggered,bv as onScopeDispose,bw as onServerPrefetch,I as onUnmounted,bx as onUpdated,by as onWatcherCleanup,h as openBlock,bz as patchProp,bA as popScopeId,bB as provide,bC as proxyRefs,bD as pushScopeId,bE as queuePostFlushCb,bF as reactive,bG as readonly,e as ref,bH as registerRuntimeCompiler,bI as render,r as renderList,bJ as renderSlot,f as resolveComponent,a5 as resolveDirective,bK as resolveDynamicComponent,bL as resolveFilter,bM as resolveTransitionHooks,bN as setBlockTracking,bO as setDevtoolsHook,bP as setTransitionHooks,bQ as shallowReactive,bR as shallowReadonly,bS as shallowRef,bT as ssrContextKey,bU as ssrUtils,bV as stop,t as toDisplayString,bW as toHandlerKey,bX as toHandlers,bY as toRaw,bZ as toRef,b_ as toRefs,b$ as toValue,c0 as transformVNodeArgs,c1 as triggerRef,d as unref,c2 as useAttrs,c3 as useCssModule,c4 as useCssVars,c5 as useHost,c6 as useId,c7 as useModel,c8 as useSSRContext,c9 as useShadowRoot,ca as useSlots,cb as useTemplateRef,cc as useTransitionState,cd as vModelCheckbox,ce as vModelDynamic,cf as vModelRadio,cg as vModelSelect,ch as vModelText,ci as vShow,cj as version,ck as warn,cl as watch,cm as watchEffect,cn as watchPostEffect,co as watchSyncEffect,cp as withAsyncContext,w as withCtx,cq as withDefaults,a3 as withDirectives,k as withKeys,cr as withMemo,J as withModifiers,cs as withScopeId,ct as getAugmentedNamespace,u as useUserStore,z as useRoute,g as useRouter,E as ElMessage}from"./index-CxcepQxD.js";import{b as apiGetArticleDetail,g as apiUpdateArticle,h as apiCreateArticle}from"./article-CDWWTqVK.js";import{a as apiGetTagList}from"./tag-C4KV5-rF.js";import{a as apiGetImageList,b as apiUploadImage}from"./image-BmS9vRCl.js";import{_ as _export_sfc}from"./_plugin-vue_export-helper-DlAUqK2U.js";/**
* vue v3.5.29
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const compile=()=>{},vue_runtime_esmBundler=Object.freeze(Object.defineProperty({__proto__:null,BaseTransition,BaseTransitionPropsValidators,Comment,DeprecationTypes,EffectScope,ErrorCodes,ErrorTypeStrings,Fragment,KeepAlive,ReactiveEffect,Static,Suspense,Teleport,Text,TrackOpTypes,Transition,TransitionGroup,TriggerOpTypes,VueElement,assertNumber,callWithAsyncErrorHandling,callWithErrorHandling,camelize,capitalize,cloneVNode,compatUtils,compile,computed,createApp,createBlock,createCommentVNode,createElementBlock,createElementVNode:createBaseVNode,createHydrationRenderer,createPropsRestProxy,createRenderer,createSSRApp,createSlots,createStaticVNode,createTextVNode,createVNode,customRef,defineAsyncComponent,defineComponent,defineCustomElement,defineEmits,defineExpose,defineModel,defineOptions,defineProps,defineSSRCustomElement,defineSlots,devtools,effect,effectScope,getCurrentInstance,getCurrentScope,getCurrentWatcher,getTransitionRawChildren,guardReactiveProps,h,handleError,hasInjectionContext,hydrate,hydrateOnIdle,hydrateOnInteraction,hydrateOnMediaQuery,hydrateOnVisible,initCustomFormatter,initDirectivesForSSR,inject,isMemoSame,isProxy,isReactive,isReadonly,isRef,isRuntimeOnly,isShallow,isVNode,markRaw,mergeDefaults,mergeModels,mergeProps,nextTick,nodeOps,normalizeClass,normalizeProps,normalizeStyle,onActivated,onBeforeMount,onBeforeUnmount,onBeforeUpdate,onDeactivated,onErrorCaptured,onMounted,onRenderTracked,onRenderTriggered,onScopeDispose,onServerPrefetch,onUnmounted,onUpdated,onWatcherCleanup,openBlock,patchProp,popScopeId,provide,proxyRefs,pushScopeId,queuePostFlushCb,reactive,readonly,ref,registerRuntimeCompiler,render,renderList,renderSlot,resolveComponent,resolveDirective,resolveDynamicComponent,resolveFilter,resolveTransitionHooks,setBlockTracking,setDevtoolsHook,setTransitionHooks,shallowReactive,shallowReadonly,shallowRef,ssrContextKey,ssrUtils,stop,toDisplayString,toHandlerKey,toHandlers,toRaw,toRef,toRefs,toValue,transformVNodeArgs,triggerRef,unref,useAttrs,useCssModule,useCssVars,useHost,useId,useModel,useSSRContext,useShadowRoot,useSlots,useTemplateRef,useTransitionState,vModelCheckbox,vModelDynamic,vModelRadio,vModelSelect,vModelText,vShow,version,warn,watch,watchEffect,watchPostEffect,watchSyncEffect,withAsyncContext,withCtx,withDefaults,withDirectives,withKeys,withMemo,withModifiers,withScopeId},Symbol.toStringTag,{value:"Module"}));var mavonEditor={exports:{}};const require$$0=getAugmentedNamespace(vue_runtime_esmBundler);(function(module,exports$1){(function(d,_){module.exports=_(require$$0)})(window,function(__WEBPACK_EXTERNAL_MODULE__0__){return function(d){var _={};function a(e){if(_[e])return _[e].exports;var t=_[e]={i:e,l:!1,exports:{}};return d[e].call(t.exports,t,t.exports,a),t.l=!0,t.exports}return a.m=d,a.c=_,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t||4&t&&typeof e=="object"&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&typeof e!="string")for(var r in e)a.d(n,r,(function(l){return e[l]}).bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=79)}([function(d,_){d.exports=__WEBPACK_EXTERNAL_MODULE__0__},function(d,_,a){var e=Object.prototype.hasOwnProperty;function t(b,w){return e.call(b,w)}function n(b){return!(b>=55296&&b<=57343)&&!(b>=64976&&b<=65007)&&(65535&b)!=65535&&(65535&b)!=65534&&!(b>=0&&b<=8)&&b!==11&&!(b>=14&&b<=31)&&!(b>=127&&b<=159)&&!(b>1114111)}function r(b){if(b>65535){var w=55296+((b-=65536)>>10),y=56320+(1023&b);return String.fromCharCode(w,y)}return String.fromCharCode(b)}var l=/\\([!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~])/g,i=new RegExp(l.source+"|"+/&([a-z#][a-z0-9]{1,31});/gi.source,"gi"),c=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))/i,s=a(62),o=/[&<>"]/,u=/[&<>"]/g,f={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function p(b){return f[b]}var m=/[.?*+^$[\]\\(){}|-]/g,g=a(40);_.lib={},_.lib.mdurl=a(63),_.lib.ucmicro=a(147),_.assign=function(b){var w=Array.prototype.slice.call(arguments,1);return w.forEach(function(y){if(y){if(typeof y!="object")throw new TypeError(y+"must be object");Object.keys(y).forEach(function(k){b[k]=y[k]})}}),b},_.isString=function(b){return function(w){return Object.prototype.toString.call(w)}(b)==="[object String]"},_.has=t,_.unescapeMd=function(b){return b.indexOf("\\")<0?b:b.replace(l,"$1")},_.unescapeAll=function(b){return b.indexOf("\\")<0&&b.indexOf("&")<0?b:b.replace(i,function(w,y,k){return y||function(v,x){var E=0;return t(s,x)?s[x]:x.charCodeAt(0)===35&&c.test(x)&&n(E=x[1].toLowerCase()==="x"?parseInt(x.slice(2),16):parseInt(x.slice(1),10))?r(E):v}(w,k)})},_.isValidEntityCode=n,_.fromCodePoint=r,_.escapeHtml=function(b){return o.test(b)?b.replace(u,p):b},_.arrayReplaceAt=function(b,w,y){return[].concat(b.slice(0,w),y,b.slice(w+1))},_.isSpace=function(b){switch(b){case 9:case 32:return!0}return!1},_.isWhiteSpace=function(b){if(b>=8192&&b<=8202)return!0;switch(b){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1},_.isMdAsciiPunct=function(b){switch(b){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}},_.isPunctChar=function(b){return g.test(b)},_.escapeRE=function(b){return b.replace(m,"\\$&")},_.normalizeReference=function(b){return b=b.trim().replace(/\s+/g," "),"ẞ".toLowerCase()==="Ṿ"&&(b=b.replace(/ẞ/g,"ß")),b.toLowerCase().toUpperCase()}},function(d,_){var a=d.exports=typeof window<"u"&&window.Math==Math?window:typeof self<"u"&&self.Math==Math?self:Function("return this")();typeof __g=="number"&&(__g=a)},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0}),_.default=(e,t)=>{const n=e.__vccOpts||e;for(const[r,l]of t)n[r]=l;return n}},function(d,_){var a={}.hasOwnProperty;d.exports=function(e,t){return a.call(e,t)}},function(d,_,a){var e=a(6),t=a(16);d.exports=a(7)?function(n,r,l){return e.f(n,r,t(1,l))}:function(n,r,l){return n[r]=l,n}},function(d,_,a){var e=a(14),t=a(47),n=a(28),r=Object.defineProperty;_.f=a(7)?Object.defineProperty:function(l,i,c){if(e(l),i=n(i,!0),e(c),t)try{return r(l,i,c)}catch{}if("get"in c||"set"in c)throw TypeError("Accessors not supported!");return"value"in c&&(l[i]=c.value),l}},function(d,_,a){d.exports=!a(15)(function(){return Object.defineProperty({},"a",{get:function(){return 7}}).a!=7})},function(d,_,a){var e=a(89),t=a(27);d.exports=function(n){return e(t(n))}},function(d,_,a){var e=a(32)("wks"),t=a(17),n=a(2).Symbol,r=typeof n=="function";(d.exports=function(l){return e[l]||(e[l]=r&&n[l]||(r?n:t)("Symbol."+l))}).store=e},function(d,_){d.exports=function(a){return typeof a=="object"?a!==null:typeof a=="function"}},function(module,exports$1,__webpack_require__){Object.defineProperty(exports$1,"__esModule",{value:!0});var _typeof2=__webpack_require__(25),_typeof3=_interopRequireDefault(_typeof2),_keydownListen=__webpack_require__(110),_langHljsCss=__webpack_require__(111),_langHljsCss2=_interopRequireDefault(_langHljsCss),_langHljs=__webpack_require__(56);_interopRequireDefault(_langHljs);var _extraFunction=__webpack_require__(57),_util=__webpack_require__(112),_toolbar_left_click2=__webpack_require__(113),_toolbar_right_click2=__webpack_require__(114),_config=__webpack_require__(115),_markdown=__webpack_require__(134),_markdown2=_interopRequireDefault(_markdown),_mdToolbarLeft=__webpack_require__(70),_mdToolbarLeft2=_interopRequireDefault(_mdToolbarLeft),_mdToolbarRight=__webpack_require__(72),_mdToolbarRight2=_interopRequireDefault(_mdToolbarRight),_autoTextarea=__webpack_require__(218),_autoTextarea2=_interopRequireDefault(_autoTextarea);function _interopRequireDefault(d){return d&&d.__esModule?d:{default:d}}__webpack_require__(224),__webpack_require__(233),exports$1.default={emits:["imgDel","change","fullScreen","readModel","previewToggle","subfieldToggle","htmlCode","helpToggle","save","navigationToggle","update:modelValue"],mixins:[_markdown2.default],props:{scrollStyle:{type:Boolean,default:!0},boxShadow:{type:Boolean,default:!0},transition:{type:Boolean,default:!0},autofocus:{type:Boolean,default:!0},fontSize:{type:String,default:"14px"},toolbarsBackground:{type:String,default:"#ffffff"},editorBackground:{type:String,default:"#ffffff"},previewBackground:{type:String,default:"#fbfbfb"},boxShadowStyle:{type:String,default:"0 2px 12px 0 rgba(0, 0, 0, 0.1)"},help:{type:String,default:null},modelValue:{type:String,default:""},language:{type:String,default:"zh-CN"},subfield:{type:Boolean,default:!0},navigation:{type:Boolean,default:!1},defaultOpen:{type:String,default:null},editable:{type:Boolean,default:!0},toolbarsFlag:{type:Boolean,default:!0},toolbars:{type:Object,default:function(){return _config.CONFIG.toolbars}},html:{type:Boolean,default:!0},xssOptions:{type:[Object,Boolean],default:function(){return{}}},codeStyle:{type:String,default:function(){return"github"}},placeholder:{type:String,default:null},ishljs:{type:Boolean,default:!0},externalLink:{type:[Object,Boolean],default:!0},imageFilter:{type:Function,default:null},imageClick:{type:Function,default:null},tabSize:{type:Number,default:0},shortCut:{type:Boolean,default:!0}},data:function(){var d,_,a=this;return{s_right_click_menu_show:!1,right_click_menu_top:0,right_click_menu_left:0,s_subfield:a.subfield,s_autofocus:!0,s_navigation:a.navigation,s_scrollStyle:a.scrollStyle,d_value:"",d_render:"",s_preview_switch:(_=a.defaultOpen,_||(_=a.subfield?"preview":"edit"),_==="preview"),s_fullScreen:!1,s_help:!1,s_html_code:!1,d_help:null,d_words:null,edit_scroll_height:-1,s_readmodel:!1,s_table_enter:!1,d_history:(d=[],d.push(a.modelValue),d),d_history_index:0,currentTimeout:"",d_image_file:[],d_preview_imgsrc:null,s_external_link:{markdown_css:function(){return"https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.9.0/github-markdown.min.css"},hljs_js:function(){return"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js"},hljs_lang:function(e){return"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/languages/"+e+".min.js"},hljs_css:function(e){return _langHljsCss2.default[e]?"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/"+e+".min.css":""},katex_js:function(){return"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js"},katex_css:function(){return"https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.css"}},p_external_link:{},textarea_selectionEnd:0,textarea_selectionEnds:[0],_xssHandler:null}},created:function(){var d=this;this.initLanguage(),this.initExternalFuc(),this.$nextTick(function(){d.editableTextarea()})},mounted:function(){var d=this;this.$el.addEventListener("paste",function(_){d.$paste(_)}),this.$el.addEventListener("drop",function(_){d.$drag(_)}),(0,_keydownListen.keydownListen)(this),(0,_extraFunction.ImagePreviewListener)(this),this.autofocus&&this.getTextareaDom().focus(),(0,_extraFunction.fullscreenchange)(this),this.d_value=this.modelValue||"",document.body.appendChild(this.$refs.help),this.loadExternalLink("markdown_css","css"),this.loadExternalLink("katex_css","css"),this.loadExternalLink("katex_js","js",function(){d.iRender(!0)}),this.loadExternalLink("hljs_js","js",function(){d.iRender(!0)}),(0,_typeof3.default)(d.externalLink)==="object"&&typeof d.externalLink.markdown_css=="function"||d.codeStyleChange(d.codeStyle,!0)},beforeUnmount:function(){document.body.removeChild(this.$refs.help)},getMarkdownIt:function(){var d=this.mixins[0].data().markdownIt;return d||(d=(0,_markdown.initMarkdown)()),d},methods:{loadExternalLink:function(d,_,a){if(typeof this.p_external_link[d]=="function"){var e={css:_extraFunction.loadLink,js:_extraFunction.loadScript};e.hasOwnProperty(_)&&e[_](this.p_external_link[d](),a)}else this.p_external_link[d]!==!1&&console.error("external_link."+d,"is not a function, if you want to disabled this error log, set external_link."+d,"to function or false")},initExternalFuc:function(){for(var d=["markdown_css","hljs_js","hljs_css","hljs_lang","katex_js","katex_css"],_=(0,_typeof3.default)(this.externalLink),a=_==="object",e=_==="boolean",t=0;t<d.length;t++)e&&!this.externalLink||a&&this.externalLink[d[t]]===!1?this.p_external_link[d[t]]=!1:a&&typeof this.externalLink[d[t]]=="function"?this.p_external_link[d[t]]=this.externalLink[d[t]]:this.p_external_link[d[t]]=this.s_external_link[d[t]]},textAreaFocus:function(){this.$refs.vNoteTextarea.$refs.vTextarea.focus()},$drag:function(d){var _=d.dataTransfer;if(_){var a=_.files;a.length>0&&(d.preventDefault(),this.$refs.toolbar_left.$imgFilesAdd(a))}},$paste:function(d){var _=d.clipboardData;if(_){var a=_.items;if(!a)return;for(var e=_.types||[],t=null,n=0;n<e.length;n++)if(e[n]==="Files"){t=a[n];break}if(t&&t.kind==="file"){(0,_util.stopEvent)(d);var r=t.getAsFile();this.$refs.toolbar_left.$imgFilesAdd([r])}}},$imgTouch:function(d){},$imgDel:function(d){this.markdownIt.image_del(d[1]);var _=d[0],a=new RegExp("\\!\\["+d[1]._name+"\\]\\("+_+"\\)","g");this.d_value=this.d_value.replace(a,""),this.iRender(),this.$emit("imgDel",d)},$imgAdd:function(d,_,a){a===void 0&&(a=!0);var e=this;if(this.__rFilter==null&&(this.__rFilter=/^image\//i),this.__oFReader=new FileReader,this.__oFReader.onload=function(n){e.markdownIt.image_add(d,n.target.result),_.miniurl=n.target.result,a===!0&&(_._name=_.name.replace(/[\[\]\(\)\+\{\}&\|\\\*^%$#@\-]/g,""),e.insertText(e.getTextareaDom(),{prefix:"!["+_._name+"]("+d+")",subfix:"",str:""}),e.$nextTick(function(){e.$emit("imgAdd",d,_)}))},_){var t=_;this.__rFilter.test(t.type)&&this.__oFReader.readAsDataURL(t)}},$imgUpdateByUrl:function(d,_){var a=this;this.markdownIt.image_add(d,_),this.$nextTick(function(){a.d_render=this.markdownIt.render(this.d_value)})},$imgAddByUrl:function(d,_){return!!this.$refs.toolbar_left.$imgAddByUrl(d,_)&&(this.$imgUpdateByUrl(d,_),!0)},$img2Url:function $img2Url(fileIndex,url){var reg_str="/(!\\[[^\\[]*?\\](?=\\())\\(\\s*("+fileIndex+")\\s*\\)/g",reg=eval(reg_str);this.d_value=this.d_value.replace(reg,"$1("+url+")"),this.$refs.toolbar_left.$changeUrl(fileIndex,url),this.iRender()},$imglst2Url:function(d){if(d instanceof Array)for(var _=0;_<d.length;_++)this.$img2Url(d[_][0],d[_][1])},toolbar_left_click:function(d){(0,_toolbar_left_click2.toolbar_left_click)(d,this)},toolbar_left_addlink:function(d,_,a){(0,_toolbar_left_click2.toolbar_left_addlink)(d,_,a,this)},toolbar_right_click:function(d){(0,_toolbar_right_click2.toolbar_right_click)(d,this)},getNavigation:function(d,_){return(0,_extraFunction.getNavigation)(d,_)},change:function(d,_){this.$emit("change",d,_)},fullscreen:function(d,_){this.$emit("fullScreen",d,_)},readmodel:function(d,_){this.$emit("readModel",d,_)},previewtoggle:function(d,_){this.$emit("previewToggle",d,_)},subfieldtoggle:function(d,_){this.$emit("subfieldToggle",d,_)},htmlcode:function(d,_){this.$emit("htmlCode",d,_)},helptoggle:function(d,_){this.$emit("helpToggle",d,_)},save:function(d,_){this.$emit("save",d,_)},navigationtoggle:function(d,_){this.$emit("navigationToggle",d,_)},$toolbar_right_read_change_status:function(){this.s_readmodel=!this.s_readmodel,this.readmodel&&this.readmodel(this.s_readmodel,this.d_value),this.s_readmodel&&this.toolbars.navigation&&this.getNavigation(this,!0)},$v_edit_scroll:function(d){(0,_extraFunction.scrollLink)(d,this)},getTextareaDom:function(){return this.$refs.vNoteTextarea.$refs.vTextarea},insertText:function(d,_){var a=_.prefix,e=_.subfix,t=_.str,n=_.type;(0,_extraFunction.insertTextAtCaret)(d,{prefix:a,subfix:e,str:t,type:n},this)},insertTab:function(){(0,_extraFunction.insertTab)(this,this.tabSize)},insertOl:function(){(0,_extraFunction.insertOl)(this)},removeLine:function(){(0,_extraFunction.removeLine)(this)},insertUl:function(){(0,_extraFunction.insertUl)(this)},unInsertTab:function(){(0,_extraFunction.unInsertTab)(this,this.tabSize)},insertCodeBlock:function(){(0,_extraFunction.insertCodeBlock)(this)},insertEnter:function(d){(0,_extraFunction.insertEnter)(this,d)},saveHistory:function(){this.d_history.splice(this.d_history_index+1,this.d_history.length),this.d_history.push(this.d_value),this.textarea_selectionEnds.splice(this.d_history_index+1,this.textarea_selectionEnds.length),this.textarea_selectionEnds.push(this.textarea_selectionEnd),this.d_history_index=this.d_history.length-1},saveSelectionEndsHistory:function(){var d=this.$refs.vNoteTextarea&&this.$refs.vNoteTextarea.$el.querySelector("textarea");this.textarea_selectionEnd=d?d.selectionEnd:this.textarea_selectionEnd},initLanguage:function(){var d=_config.CONFIG.langList.indexOf(this.language)>=0?this.language:"zh-CN",_=this;_.$render(_config.CONFIG["help_"+d],function(a){_.d_help=a}),this.d_words=_config.CONFIG["words_"+d]},editableTextarea:function(){var d=this.$refs.vNoteTextarea.$refs.vTextarea;this.editable?d.removeAttribute("disabled"):d.setAttribute("disabled","disabled")},codeStyleChange:function(d,_){if(_=_||!1,typeof this.p_external_link.hljs_css=="function"){var a=this.p_external_link.hljs_css(d);a.length===0&&_&&(console.warn("hljs color scheme",d,"do not exist, loading default github"),a=this.p_external_link.hljs_css("github")),a.length>0?(0,_extraFunction.loadLink)(a,null,"md-code-style"):console.warn("hljs color scheme",d,"do not exist, hljs color scheme will not change")}else this.p_external_link.hljs_css!==!1&&console.error("external_link.hljs_css is not a function, if you want to disabled this error log, set external_link.hljs_css to function or false")},iRender:function(d){var _=this;this.$render(_.d_value,function(a){_.d_render=a,d||_.change&&_.change(_.d_value,_.d_render),_.s_navigation&&(0,_extraFunction.getNavigation)(_,!1),_.$emit("update:modelValue",_.d_value),_.d_value!==_.d_history[_.d_history_index]&&(window.clearTimeout(_.currentTimeout),_.currentTimeout=setTimeout(function(){_.saveHistory()},500))})},$emptyHistory:function(){this.d_history=[this.d_value],this.d_history_index=0}},watch:{d_value:function(d,_){this.saveSelectionEndsHistory(),this.iRender()},modelValue:function(d,_){d!==this.d_value&&(this.d_value=d)},subfield:function(d,_){this.s_subfield=d},d_history_index:function(){this.d_history_index>20&&(this.d_history.shift(),this.d_history_index=this.d_history_index-1),this.d_value=this.d_history[this.d_history_index]},language:function(d){this.initLanguage()},editable:function(){this.editableTextarea()},defaultOpen:function(d){var _=d;return _||(_=this.subfield?"preview":"edit"),this.s_preview_switch=_==="preview",this.s_preview_switch},codeStyle:function(d){this.codeStyleChange(d)}},components:{"v-autoTextarea":_autoTextarea2.default,"v-md-toolbar-left":_mdToolbarLeft2.default,"v-md-toolbar-right":_mdToolbarRight2.default}}},function(d,_){d.exports=!0},function(d,_){var a=d.exports={version:"2.6.12"};typeof __e=="number"&&(__e=a)},function(d,_,a){var e=a(10);d.exports=function(t){if(!e(t))throw TypeError(t+" is not an object!");return t}},function(d,_){d.exports=function(a){try{return!!a()}catch{return!0}}},function(d,_){d.exports=function(a,e){return{enumerable:!(1&a),configurable:!(2&a),writable:!(4&a),value:e}}},function(d,_){var a=0,e=Math.random();d.exports=function(t){return"Symbol(".concat(t===void 0?"":t,")_",(++a+e).toString(36))}},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0}),_.default={emits:["toolbar_left_addlink","imgTouch","imgAdd","imgDel","imgAdd","imgAdd","toolbar_left_click","toolbar_left_click"],name:"s-md-toolbar-left",props:{editable:{type:Boolean,default:!0},transition:{type:Boolean,default:!0},toolbars:{type:Object,required:!0},d_words:{type:Object,required:!0},image_filter:{type:Function,default:null}},data:function(){return{img_file:[[0,null]],img_timer:null,header_timer:null,s_img_dropdown_open:!1,s_header_dropdown_open:!1,s_img_link_open:!1,trigger:null,num:0,link_text:"",link_addr:"",link_type:"link"}},methods:{$imgLinkAdd:function(){this.$emit("toolbar_left_addlink",this.link_type,this.link_text,this.link_addr),this.s_img_link_open=!1},$toggle_imgLinkAdd:function(e){var t=this;this.link_type=e,this.link_text=this.link_addr="",this.s_img_link_open=!0,this.$nextTick(function(){t.$refs.linkTextInput.focus()}),this.s_img_dropdown_open=!1},$imgFileListClick:function(e){this.$emit("imgTouch",this.img_file[e])},$changeUrl:function(e,t){this.img_file[e][0]=t},$imgFileAdd:function(e){this.img_file.push([++this.num,e]),this.$emit("imgAdd",this.num,e),this.s_img_dropdown_open=!1},$imgFilesAdd:function(e){for(var t=typeof this.image_filter=="function",n=0;n<e.length;n++)(t&&this.image_filter(e[n])===!0||!t&&e[n].type.match(/^image\//i))&&this.$imgFileAdd(e[n])},$imgAdd:function(e){this.$imgFilesAdd(e.target.files),e.target.value=""},$imgDel:function(e){this.$emit("imgDel",this.img_file[e]),this.img_file.splice(e,1),this.num--,this.s_img_dropdown_open=!1},isEqualName:function(e,t){return!(!this.img_file[t][1]||this.img_file[t][1].name!==e&&this.img_file[t][1]._name!==e)},$imgDelByFilename:function(e){for(var t=0;this.img_file.length>t;){if(this.img_file[t][1]===e||this.isEqualName(e,t))return this.$imgDel(t),!0;t+=1}return!1},$imgAddByFilename:function(e,t){for(var n=0;n<this.img_file.length;n++)if(this.img_file[n][0]===e)return!1;return this.img_file[0][0]=e,this.img_file[0][1]=t,this.img_file[0][2]=e,this.img_file.unshift(["./"+this.num,null]),this.$emit("imgAdd",this.img_file[1][0],t,!1),!0},$imgAddByUrl:function(e,t){for(var n=0;n<this.img_file.length;n++)if(this.img_file[n][0]===e)return!1;return this.img_file[0][0]=e,this.img_file[0][1]=t,this.img_file.unshift(["./"+this.num,null]),!0},$imgUpdateByFilename:function(e,t){for(var n=0;n<this.img_file.length;n++)if(this.img_file[n][0]===e||this.isEqualName(e,n))return this.img_file[n][1]=t,this.$emit("imgAdd",e,t,!1),!0;return!1},$mouseenter_img_dropdown:function(){this.editable&&(clearTimeout(this.img_timer),this.s_img_dropdown_open=!0)},$mouseleave_img_dropdown:function(){var e=this;this.img_timer=setTimeout(function(){e.s_img_dropdown_open=!1},200)},$mouseenter_header_dropdown:function(){this.editable&&(clearTimeout(this.header_timer),this.s_header_dropdown_open=!0)},$mouseleave_header_dropdown:function(){var e=this;this.header_timer=setTimeout(function(){e.s_header_dropdown_open=!1},200)},$clicks:function(e){this.editable&&this.$emit("toolbar_left_click",e)},$click_header:function(e){this.$emit("toolbar_left_click",e),this.s_header_dropdown_open=!1},handleClose:function(e){this.s_img_dropdown_open=!1}},watch:{s_img_link_open:function(e){this.$parent.$el.style.zIndex=e?1501:1500}}}},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0}),_.default={emits:["toolbar_right_click"],name:"s-md-toolbar-right",props:{s_subfield:{type:Boolean,required:!0},toolbars:{type:Object,required:!0},s_preview_switch:{type:Boolean,required:!0},s_fullScreen:{type:Boolean,required:!0},s_html_code:{type:Boolean,required:!0},s_navigation:{type:Boolean,required:!0},d_words:{type:Object,required:!0}},methods:{$clicks:function(e){this.$emit("toolbar_right_click",e)}}}},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0}),_.default={emits:["update:modelValue"],data:function(){var e=this;return{temp_value:e.modelValue,s_autofocus:function(){if(e.autofocus)return"autofocus"}()}},created:function(){},props:{fullHeight:{type:Boolean,default:!1},autofocus:{type:Boolean,default:!1},modelValue:{type:String,default:""},placeholder:{type:String,default:""},border:{type:Boolean,default:!1},resize:{type:Boolean,default:!1},onchange:{type:Function,default:null},fontSize:{type:String,default:"14px"},lineHeight:{type:String,default:"18px"}},methods:{change:function(e){this.onchange&&this.onchange(this.temp_value,e)}},watch:{modelValue:function(e,t){this.temp_value=e},temp_value:function(e,t){this.$emit("update:modelValue",e)}}}},function(d,_,a){a.r(_);var e=a(11),t=a.n(e);for(var n in a.d(_,"default",function(){return t.a}),e)["default"].indexOf(n)<0&&function(r){a.d(_,r,function(){return e[r]})}(n)},function(d,_,a){a.r(_);var e=a(18),t=a.n(e);for(var n in a.d(_,"default",function(){return t.a}),e)["default"].indexOf(n)<0&&function(r){a.d(_,r,function(){return e[r]})}(n)},function(d,_,a){a.r(_);var e=a(19),t=a.n(e);for(var n in a.d(_,"default",function(){return t.a}),e)["default"].indexOf(n)<0&&function(r){a.d(_,r,function(){return e[r]})}(n)},function(d,_,a){a.r(_);var e=a(20),t=a.n(e);for(var n in a.d(_,"default",function(){return t.a}),e)["default"].indexOf(n)<0&&function(r){a.d(_,r,function(){return e[r]})}(n)},function(d,_,a){_.__esModule=!0;var e=r(a(81)),t=r(a(99)),n=typeof t.default=="function"&&typeof e.default=="symbol"?function(l){return typeof l}:function(l){return l&&typeof t.default=="function"&&l.constructor===t.default&&l!==t.default.prototype?"symbol":typeof l};function r(l){return l&&l.__esModule?l:{default:l}}_.default=typeof t.default=="function"&&n(e.default)==="symbol"?function(l){return l===void 0?"undefined":n(l)}:function(l){return l&&typeof t.default=="function"&&l.constructor===t.default&&l!==t.default.prototype?"symbol":l===void 0?"undefined":n(l)}},function(d,_){var a=Math.ceil,e=Math.floor;d.exports=function(t){return isNaN(t=+t)?0:(t>0?e:a)(t)}},function(d,_){d.exports=function(a){if(a==null)throw TypeError("Can't call method on  "+a);return a}},function(d,_,a){var e=a(10);d.exports=function(t,n){if(!e(t))return t;var r,l;if(n&&typeof(r=t.toString)=="function"&&!e(l=r.call(t))||typeof(r=t.valueOf)=="function"&&!e(l=r.call(t))||!n&&typeof(r=t.toString)=="function"&&!e(l=r.call(t)))return l;throw TypeError("Can't convert object to primitive value")}},function(d,_){d.exports={}},function(d,_,a){var e=a(51),t=a(33);d.exports=Object.keys||function(n){return e(n,t)}},function(d,_,a){var e=a(32)("keys"),t=a(17);d.exports=function(n){return e[n]||(e[n]=t(n))}},function(d,_,a){var e=a(13),t=a(2),n=t["__core-js_shared__"]||(t["__core-js_shared__"]={});(d.exports=function(r,l){return n[r]||(n[r]=l!==void 0?l:{})})("versions",[]).push({version:e.version,mode:a(12)?"pure":"global",copyright:"© 2020 Denis Pushkarev (zloirock.ru)"})},function(d,_){d.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(d,_,a){var e=a(6).f,t=a(4),n=a(9)("toStringTag");d.exports=function(r,l,i){r&&!t(r=i?r:r.prototype,n)&&e(r,n,{configurable:!0,value:l})}},function(d,_,a){_.f=a(9)},function(d,_,a){var e=a(2),t=a(13),n=a(12),r=a(35),l=a(6).f;d.exports=function(i){var c=t.Symbol||(t.Symbol=n?{}:e.Symbol||{});i.charAt(0)=="_"||i in c||l(c,i,{value:r.f(i)})}},function(d,_){_.f={}.propertyIsEnumerable},function(d,_,a){var e=a(59),t=a(137);for(var n in(_=d.exports=function(r,l){return new t(l).process(r)}).FilterCSS=t,e)_[n]=e[n];typeof window<"u"&&(window.filterCSS=d.exports)},function(d,_){d.exports={indexOf:function(a,e){var t,n;if(Array.prototype.indexOf)return a.indexOf(e);for(t=0,n=a.length;t<n;t++)if(a[t]===e)return t;return-1},forEach:function(a,e,t){var n,r;if(Array.prototype.forEach)return a.forEach(e,t);for(n=0,r=a.length;n<r;n++)e.call(t,a[n],n,a)},trim:function(a){return String.prototype.trim?a.trim():a.replace(/(^\s*)|(\s*$)/g,"")},spaceIndex:function(a){var e=/\s|\n|\t/.exec(a);return e?e.index:-1}}},function(d,_){d.exports=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4E\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDF55-\uDF59]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD806[\uDC3B\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/},function(d,_,a){function e(){this.__rules__=[],this.__cache__=null}e.prototype.__find__=function(t){for(var n=0;n<this.__rules__.length;n++)if(this.__rules__[n].name===t)return n;return-1},e.prototype.__compile__=function(){var t=this,n=[""];t.__rules__.forEach(function(r){r.enabled&&r.alt.forEach(function(l){n.indexOf(l)<0&&n.push(l)})}),t.__cache__={},n.forEach(function(r){t.__cache__[r]=[],t.__rules__.forEach(function(l){l.enabled&&(r&&l.alt.indexOf(r)<0||t.__cache__[r].push(l.fn))})})},e.prototype.at=function(t,n,r){var l=this.__find__(t),i=r||{};if(l===-1)throw new Error("Parser rule not found: "+t);this.__rules__[l].fn=n,this.__rules__[l].alt=i.alt||[],this.__cache__=null},e.prototype.before=function(t,n,r,l){var i=this.__find__(t),c=l||{};if(i===-1)throw new Error("Parser rule not found: "+t);this.__rules__.splice(i,0,{name:n,enabled:!0,fn:r,alt:c.alt||[]}),this.__cache__=null},e.prototype.after=function(t,n,r,l){var i=this.__find__(t),c=l||{};if(i===-1)throw new Error("Parser rule not found: "+t);this.__rules__.splice(i+1,0,{name:n,enabled:!0,fn:r,alt:c.alt||[]}),this.__cache__=null},e.prototype.push=function(t,n,r){var l=r||{};this.__rules__.push({name:t,enabled:!0,fn:n,alt:l.alt||[]}),this.__cache__=null},e.prototype.enable=function(t,n){Array.isArray(t)||(t=[t]);var r=[];return t.forEach(function(l){var i=this.__find__(l);if(i<0){if(n)return;throw new Error("Rules manager: invalid rule name "+l)}this.__rules__[i].enabled=!0,r.push(l)},this),this.__cache__=null,r},e.prototype.enableOnly=function(t,n){Array.isArray(t)||(t=[t]),this.__rules__.forEach(function(r){r.enabled=!1}),this.enable(t,n)},e.prototype.disable=function(t,n){Array.isArray(t)||(t=[t]);var r=[];return t.forEach(function(l){var i=this.__find__(l);if(i<0){if(n)return;throw new Error("Rules manager: invalid rule name "+l)}this.__rules__[i].enabled=!1,r.push(l)},this),this.__cache__=null,r},e.prototype.getRules=function(t){return this.__cache__===null&&this.__compile__(),this.__cache__[t]||[]},d.exports=e},function(d,_,a){function e(t,n,r){this.type=t,this.tag=n,this.attrs=null,this.map=null,this.nesting=r,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}e.prototype.attrIndex=function(t){var n,r,l;if(!this.attrs)return-1;for(r=0,l=(n=this.attrs).length;r<l;r++)if(n[r][0]===t)return r;return-1},e.prototype.attrPush=function(t){this.attrs?this.attrs.push(t):this.attrs=[t]},e.prototype.attrSet=function(t,n){var r=this.attrIndex(t),l=[t,n];r<0?this.attrPush(l):this.attrs[r]=l},e.prototype.attrGet=function(t){var n=this.attrIndex(t),r=null;return n>=0&&(r=this.attrs[n][1]),r},e.prototype.attrJoin=function(t,n){var r=this.attrIndex(t);r<0?this.attrPush([t,n]):this.attrs[r][1]=this.attrs[r][1]+" "+n},d.exports=e},function(d,_,a){d.exports=function(e){var t=[];return t.toString=function(){return this.map(function(n){var r=function(l,i){var c=l[1]||"",s=l[3];if(!s)return c;if(i&&typeof btoa=="function"){var o=(f=s,p=btoa(unescape(encodeURIComponent(JSON.stringify(f)))),m="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(p),"/*# ".concat(m," */")),u=s.sources.map(function(g){return"/*# sourceURL=".concat(s.sourceRoot||"").concat(g," */")});return[c].concat(u).concat([o]).join(`
`)}var f,p,m;return[c].join(`
`)}(n,e);return n[2]?"@media ".concat(n[2]," {").concat(r,"}"):r}).join("")},t.i=function(n,r,l){typeof n=="string"&&(n=[[null,n,""]]);var i={};if(l)for(var c=0;c<this.length;c++){var s=this[c][0];s!=null&&(i[s]=!0)}for(var o=0;o<n.length;o++){var u=[].concat(n[o]);l&&i[u[0]]||(r&&(u[2]?u[2]="".concat(r," and ").concat(u[2]):u[2]=r),t.push(u))}},t}},function(d,_,a){function e(v,x){for(var E=[],S={},O=0;O<x.length;O++){var C=x[O],j=C[0],T={id:v+":"+O,css:C[1],media:C[2],sourceMap:C[3]};S[j]?S[j].parts.push(T):E.push(S[j]={id:j,parts:[T]})}return E}a.r(_),a.d(_,"default",function(){return f});var t=typeof document<"u";if(typeof DEBUG<"u"&&DEBUG&&!t)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var n={},r=t&&(document.head||document.getElementsByTagName("head")[0]),l=null,i=0,c=!1,s=function(){},o=null,u=typeof navigator<"u"&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(v,x,E,S){c=E,o=S||{};var O=e(v,x);return p(O),function(C){for(var j=[],T=0;T<O.length;T++){var A=O[T];(D=n[A.id]).refs--,j.push(D)}for(C?p(O=e(v,C)):O=[],T=0;T<j.length;T++){var D;if((D=j[T]).refs===0){for(var z=0;z<D.parts.length;z++)D.parts[z]();delete n[D.id]}}}}function p(v){for(var x=0;x<v.length;x++){var E=v[x],S=n[E.id];if(S){S.refs++;for(var O=0;O<S.parts.length;O++)S.parts[O](E.parts[O]);for(;O<E.parts.length;O++)S.parts.push(g(E.parts[O]));S.parts.length>E.parts.length&&(S.parts.length=E.parts.length)}else{var C=[];for(O=0;O<E.parts.length;O++)C.push(g(E.parts[O]));n[E.id]={id:E.id,refs:1,parts:C}}}}function m(){var v=document.createElement("style");return v.type="text/css",r.appendChild(v),v}function g(v){var x,E,S=document.querySelector('style[data-vue-ssr-id~="'+v.id+'"]');if(S){if(c)return s;S.parentNode.removeChild(S)}if(u){var O=i++;S=l||(l=m()),x=y.bind(null,S,O,!1),E=y.bind(null,S,O,!0)}else S=m(),x=k.bind(null,S),E=function(){S.parentNode.removeChild(S)};return x(v),function(C){if(C){if(C.css===v.css&&C.media===v.media&&C.sourceMap===v.sourceMap)return;x(v=C)}else E()}}var b,w=(b=[],function(v,x){return b[v]=x,b.filter(Boolean).join(`
`)});function y(v,x,E,S){var O=E?"":S.css;if(v.styleSheet)v.styleSheet.cssText=w(x,O);else{var C=document.createTextNode(O),j=v.childNodes;j[x]&&v.removeChild(j[x]),j.length?v.insertBefore(C,j[x]):v.appendChild(C)}}function k(v,x){var E=x.css,S=x.media,O=x.sourceMap;if(S&&v.setAttribute("media",S),o.ssrId&&v.setAttribute("data-vue-ssr-id",x.id),O&&(E+=`
/*# sourceURL=`+O.sources[0]+" */",E+=`
/*# sourceMappingURL=data:application/json;base64,`+btoa(unescape(encodeURIComponent(JSON.stringify(O))))+" */"),v.styleSheet)v.styleSheet.cssText=E;else{for(;v.firstChild;)v.removeChild(v.firstChild);v.appendChild(document.createTextNode(E))}}},function(d,_,a){var e=a(12),t=a(46),n=a(49),r=a(5),l=a(29),i=a(87),c=a(34),s=a(94),o=a(9)("iterator"),u=!([].keys&&"next"in[].keys()),f=function(){return this};d.exports=function(p,m,g,b,w,y,k){i(g,m,b);var v,x,E,S=function(N){if(!u&&N in T)return T[N];switch(N){case"keys":case"values":return function(){return new g(this,N)}}return function(){return new g(this,N)}},O=m+" Iterator",C=w=="values",j=!1,T=p.prototype,A=T[o]||T["@@iterator"]||w&&T[w],D=A||S(w),z=w?C?S("entries"):D:void 0,B=m=="Array"&&T.entries||A;if(B&&(E=s(B.call(new p)))!==Object.prototype&&E.next&&(c(E,O,!0),e||typeof E[o]=="function"||r(E,o,f)),C&&A&&A.name!=="values"&&(j=!0,D=function(){return A.call(this)}),e&&!k||!u&&!j&&T[o]||r(T,o,D),l[m]=D,l[O]=f,w)if(v={values:C?D:S("values"),keys:y?D:S("keys"),entries:z},k)for(x in v)x in T||n(T,x,v[x]);else t(t.P+t.F*(u||j),m,v);return v}},function(d,_,a){var e=a(2),t=a(13),n=a(85),r=a(5),l=a(4),i=function(c,s,o){var u,f,p,m=c&i.F,g=c&i.G,b=c&i.S,w=c&i.P,y=c&i.B,k=c&i.W,v=g?t:t[s]||(t[s]={}),x=v.prototype,E=g?e:b?e[s]:(e[s]||{}).prototype;for(u in g&&(o=s),o)(f=!m&&E&&E[u]!==void 0)&&l(v,u)||(p=f?E[u]:o[u],v[u]=g&&typeof E[u]!="function"?o[u]:y&&f?n(p,e):k&&E[u]==p?function(S){var O=function(C,j,T){if(this instanceof S){switch(arguments.length){case 0:return new S;case 1:return new S(C);case 2:return new S(C,j)}return new S(C,j,T)}return S.apply(this,arguments)};return O.prototype=S.prototype,O}(p):w&&typeof p=="function"?n(Function.call,p):p,w&&((v.virtual||(v.virtual={}))[u]=p,c&i.R&&x&&!x[u]&&r(x,u,p)))};i.F=1,i.G=2,i.S=4,i.P=8,i.B=16,i.W=32,i.U=64,i.R=128,d.exports=i},function(d,_,a){d.exports=!a(7)&&!a(15)(function(){return Object.defineProperty(a(48)("div"),"a",{get:function(){return 7}}).a!=7})},function(d,_,a){var e=a(10),t=a(2).document,n=e(t)&&e(t.createElement);d.exports=function(r){return n?t.createElement(r):{}}},function(d,_,a){d.exports=a(5)},function(d,_,a){var e=a(14),t=a(88),n=a(33),r=a(31)("IE_PROTO"),l=function(){},i=function(){var c,s=a(48)("iframe"),o=n.length;for(s.style.display="none",a(93).appendChild(s),s.src="javascript:",(c=s.contentWindow.document).open(),c.write("<script>document.F=Object<\/script>"),c.close(),i=c.F;o--;)delete i.prototype[n[o]];return i()};d.exports=Object.create||function(c,s){var o;return c!==null?(l.prototype=e(c),o=new l,l.prototype=null,o[r]=c):o=i(),s===void 0?o:t(o,s)}},function(d,_,a){var e=a(4),t=a(8),n=a(90)(!1),r=a(31)("IE_PROTO");d.exports=function(l,i){var c,s=t(l),o=0,u=[];for(c in s)c!=r&&e(s,c)&&u.push(c);for(;i.length>o;)e(s,c=i[o++])&&(~n(u,c)||u.push(c));return u}},function(d,_){var a={}.toString;d.exports=function(e){return a.call(e).slice(8,-1)}},function(d,_,a){var e=a(27);d.exports=function(t){return Object(e(t))}},function(d,_){_.f=Object.getOwnPropertySymbols},function(d,_,a){var e=a(51),t=a(33).concat("length","prototype");_.f=Object.getOwnPropertyNames||function(n){return e(n,t)}},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0}),_.default={"1c":"1c",abnf:"abnf",accesslog:"accesslog",actionscript:"actionscript",as:"actionscript",ada:"ada",apache:"apache",apacheconf:"apache",applescript:"applescript",osascript:"applescript",arduino:"arduino",armasm:"armasm",arm:"armasm",asciidoc:"asciidoc",adoc:"asciidoc",aspectj:"aspectj",autohotkey:"autohotkey",ahk:"autohotkey",autoit:"autoit",avrasm:"avrasm",awk:"awk",axapta:"axapta",bash:"bash",sh:"bash",zsh:"bash",basic:"basic",bnf:"bnf",brainfuck:"brainfuck",bf:"brainfuck",cal:"cal",capnproto:"capnproto",capnp:"capnproto",ceylon:"ceylon",clean:"clean",icl:"clean",dcl:"clean","clojure-repl":"clojure-repl",clojure:"clojure",clj:"clojure",cmake:"cmake","cmake.in":"cmake",coffeescript:"coffeescript",coffee:"coffeescript",cson:"coffeescript",iced:"coffeescript",coq:"coq",cos:"cos",cls:"cos",cpp:"cpp",c:"cpp",cc:"cpp",h:"cpp","c++":"cpp","h++":"cpp",hpp:"cpp",crmsh:"crmsh",crm:"crmsh",pcmk:"crmsh",crystal:"crystal",cr:"crystal",cs:"cs",csharp:"cs",csp:"csp",css:"css",d:"d",dart:"dart",delphi:"delphi",dpr:"delphi",dfm:"delphi",pas:"delphi",pascal:"delphi",freepascal:"delphi",lazarus:"delphi",lpr:"delphi",lfm:"delphi",diff:"diff",patch:"diff",django:"django",jinja:"django",dns:"dns",bind:"dns",zone:"dns",dockerfile:"dockerfile",docker:"dockerfile",dos:"dos",bat:"dos",cmd:"dos",dsconfig:"dsconfig",dts:"dts",dust:"dust",dst:"dust",ebnf:"ebnf",elixir:"elixir",elm:"elm",erb:"erb","erlang-repl":"erlang-repl",erlang:"erlang",erl:"erlang",excel:"excel",xlsx:"excel",xls:"excel",fix:"fix",flix:"flix",fortran:"fortran",f90:"fortran",f95:"fortran",fsharp:"fsharp",fs:"fsharp",gams:"gams",gms:"gams",gauss:"gauss",gss:"gauss",gcode:"gcode",nc:"gcode",gherkin:"gherkin",feature:"gherkin",glsl:"glsl",go:"go",golang:"go",golo:"golo",gradle:"gradle",groovy:"groovy",haml:"haml",handlebars:"handlebars",hbs:"handlebars","html.hbs":"handlebars","html.handlebars":"handlebars",haskell:"haskell",hs:"haskell",haxe:"haxe",hx:"haxe",hsp:"hsp",htmlbars:"htmlbars",http:"http",https:"http",hy:"hy",hylang:"hy",inform7:"inform7",i7:"inform7",ini:"ini",toml:"ini",irpf90:"irpf90",java:"java",jsp:"java",javascript:"javascript",js:"javascript",jsx:"javascript","jboss-cli":"jboss-cli","wildfly-cli":"jboss-cli",json:"json","julia-repl":"julia-repl",julia:"julia",kotlin:"kotlin",lasso:"lasso",ls:"livescript",lassoscript:"lasso",ldif:"ldif",leaf:"leaf",less:"less",lisp:"lisp",livecodeserver:"livecodeserver",livescript:"livescript",llvm:"llvm",lsl:"lsl",lua:"lua",makefile:"makefile",mk:"makefile",mak:"makefile",markdown:"markdown",md:"markdown",mkdown:"markdown",mkd:"markdown",mathematica:"mathematica",mma:"mathematica",matlab:"matlab",maxima:"maxima",mel:"mel",mercury:"mercury",m:"mercury",moo:"mercury",mipsasm:"mipsasm",mips:"mipsasm",mizar:"mizar",mojolicious:"mojolicious",monkey:"monkey",moonscript:"moonscript",moon:"moonscript",n1ql:"n1ql",nginx:"nginx",nginxconf:"nginx",nimrod:"nimrod",nim:"nimrod",nix:"nix",nixos:"nix",nsis:"nsis",objectivec:"objectivec",mm:"objectivec",objc:"objectivec","obj-c":"objectivec",ocaml:"ocaml",ml:"sml",openscad:"openscad",scad:"openscad",oxygene:"oxygene",parser3:"parser3",perl:"perl",pl:"perl",pm:"perl",pf:"pf","pf.conf":"pf",php:"php",php3:"php",php4:"php",php5:"php",php6:"php",pony:"pony",powershell:"powershell",ps:"powershell",processing:"processing",profile:"profile",prolog:"prolog",protobuf:"protobuf",puppet:"puppet",pp:"puppet",purebasic:"purebasic",pb:"purebasic",pbi:"purebasic",python:"python",py:"python",gyp:"python",q:"q",k:"q",kdb:"q",qml:"qml",qt:"qml",r:"r",rib:"rib",roboconf:"roboconf",graph:"roboconf",instances:"roboconf",routeros:"routeros",mikrotik:"routeros",rsl:"rsl",ruby:"ruby",rb:"ruby",gemspec:"ruby",podspec:"ruby",thor:"ruby",irb:"ruby",ruleslanguage:"ruleslanguage",rust:"rust",rs:"rust",scala:"scala",scheme:"scheme",scilab:"scilab",sci:"scilab",scss:"scss",shell:"shell",console:"shell",smali:"smali",smalltalk:"smalltalk",st:"smalltalk",sml:"sml",sqf:"sqf",sql:"sql",stan:"stan",stata:"stata",do:"stata",ado:"stata",step21:"step21",p21:"step21",step:"step21",stp:"step21",stylus:"stylus",styl:"stylus",subunit:"subunit",swift:"swift",taggerscript:"taggerscript",tap:"tap",tcl:"tcl",tk:"tcl",tex:"tex",thrift:"thrift",tp:"tp",twig:"twig",craftcms:"twig",typescript:"typescript",ts:"typescript",vala:"vala",vbnet:"vbnet",vb:"vbnet","vbscript-html":"vbscript-html",vbscript:"vbscript",vbs:"vbscript",verilog:"verilog",v:"verilog",sv:"verilog",svh:"verilog",vhdl:"vhdl",vim:"vim",x86asm:"x86asm",xl:"xl",tao:"xl",xml:"xml",html:"xml",xhtml:"xml",rss:"xml",atom:"xml",xjb:"xml",xsd:"xml",xsl:"xml",plist:"xml",xquery:"xquery",xpath:"xquery",xq:"xquery",yaml:"yaml",yml:"yaml",YAML:"yaml",zephir:"zephir",zep:"zephir"}},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0}),_.loadScript=function(i,c){typeof c!="function"&&(c=function(){});var s=document.querySelectorAll("script[src='"+i+"']");if(s.length>0)return s[0].addEventListener("load",function(){c()}),void c();var o=document.createElement("script"),u=document.getElementsByTagName("head")[0];o.type="text/javascript",o.charset="UTF-8",o.src=i,o.addEventListener?o.addEventListener("load",function(){c()},!1):o.attachEvent&&o.attachEvent("onreadystatechange",function(){window.event.srcElement.readyState==="loaded"&&c()}),u.appendChild(o)},_.loadLink=function(i,c,s){if(typeof c!="function"&&(c=function(){}),document.querySelectorAll("link[href='"+i+"']").length>0)return void c();if(s){var o=document.querySelectorAll("link#"+s);if(o.length)return void(o[0].href=i)}var u=document.createElement("link"),f=document.getElementsByTagName("head")[0];u.rel="stylesheet",u.href=i,s&&(u.id=s),u.addEventListener?u.addEventListener("load",function(){c()},!1):u.attachEvent&&u.attachEvent("onreadystatechange",function(){window.event.srcElement.readyState==="loaded"&&c()}),f.appendChild(u)},_.insertTextAtCaret=function(i,c,s){var o=c.prefix,u=c.subfix,f=c.str;if(c.type,i.focus(),l(i)){var p=i.selectionStart,m=i.selectionEnd,g=i.value;p===m?(i.value=g.substring(0,p)+o+f+u+g.substring(m,g.length),i.selectionStart=p+o.length,i.selectionEnd=p+(f.length+o.length)):g.substring(p-o.length,p)===o&&g.substring(m,m+u.length)===u&&function(b,w,y,k,v){return!(b==="*"&&w==="*"&&y.substring(k-2,k-1)==="*"&&y.substring(v+1,v+2)==="*")}(o,u,g,p,m)?(i.value=g.substring(0,p-o.length)+g.substring(p,m)+g.substring(m+u.length,g.length),i.selectionStart=p-o.length,i.selectionEnd=m-o.length):(i.value=g.substring(0,p)+o+g.substring(p,m)+u+g.substring(m,g.length),i.selectionStart=p+o.length,i.selectionEnd=p+(m-p+o.length))}else alert("Error: Browser version is too low");s.d_value=i.value,i.focus()};var e="```",t="\n```\n",n="language";_.insertCodeBlock=function(i){var c=i.getTextareaDom();if(l(c)){var s=n,o=c.selectionStart,u=c.selectionEnd,f=c.value;o===u?r(s,"",c):function(p){var m=p.selectionStart,g=p.selectionEnd,b=p.value,w=e,y=t;return b.substring(m-1,m)===`
`?w+=`
`:y=`
`+y,b.substring(m-w.length,m)===w&&b.substring(g,g+y.length)===y}(c)?function(p){var m=e,g=t,b=n,w=p.selectionStart,y=p.selectionEnd,k=p.value,v=k.substring(w,y);if(k.substring(w-1,w)===`
`)m+=`
`;else if(m+b+(g=`
`+g)===k.substring(w-m.length,y+g.length)){var x=k.substring(0,w-m.length);return x+=k.substring(y+g.length,k.length),p.value=x,p.selectionStart=w-m.length,void(p.selectionEnd=p.selectionStart)}var E=k.substring(0,w-m.length);E+=v,E+=k.substring(y+g.length,k.length),p.value=E,p.selectionStart=w-m.length,p.selectionEnd=p.selectionStart+v.length}(c):r("",f.substring(o,u),c),i.d_value=c.value,c.focus()}else alert("Error: Browser version is too low")};function r(i,c,s){var o=e,u=t,f=s.selectionStart,p=s.selectionEnd,m=s.value,g=m.substring(0,f);g+=o+i+`
`,g+=c,g+=u,g+=m.substring(p,m.length),s.value=g,s.selectionStart=f+o.length+(i?0:1),s.selectionEnd=s.selectionStart+i.length+c.length}function l(i){return typeof i.selectionStart=="number"&&typeof i.selectionEnd=="number"}_.insertOl=function(i){var c=i.getTextareaDom();if(l(c)){var s=c.selectionStart,o=c.selectionEnd,u=c.value;if(s===o)c.value=u.substring(0,s)+"1. "+u.substring(o,u.length),c.selectionEnd=c.selectionStart=s+3;else{for(var f=s;f>0&&u.substring(f-1,f)!==`
`;)f--;for(var p=u.substring(f,o),m=p.split(`
`),g=0;g<m.length;g++)m[g]=g+1+". "+m[g];var b=m.join(`
`);c.value=u.substring(0,f)+b+u.substring(o,u.length),c.selectionStart=f,c.selectionEnd=o+b.length-p.length}}else alert("Error: Browser version is too low");i.d_value=c.value,c.focus()},_.removeLine=function(i){var c=i.getTextareaDom();if(l(c)){for(var s=c.selectionStart,o=c.selectionEnd,u=c.value,f=s;f>0&&u.substring(f-1,f)!==`
`;)f--;for(var p=o;p<u.length&&u.substring(p,p+1)!==`
`;)p++;p<u.length&&p++,c.value=u.substring(0,f)+u.substring(p,u.length),c.selectionEnd=c.selectionStart=f===0?0:f-1}else alert("Error: Browser version is too low");i.d_value=c.value,c.focus()},_.insertUl=function(i){var c=i.getTextareaDom();if(l(c)){var s=c.selectionStart,o=c.selectionEnd,u=c.value;if(s===o)c.value=u.substring(0,s)+"- "+u.substring(o,u.length),c.selectionEnd=c.selectionStart=s+2;else{for(var f=s;f>0&&u.substring(f-1,f)!==`
`;)f--;var p=u.substring(f,o),m=p.replace(/\n/g,`
- `);m="- "+m,c.value=u.substring(0,f)+m+u.substring(o,u.length),c.selectionStart=f,c.selectionEnd=o+m.length-p.length}}else alert("Error: Browser version is too low");i.d_value=c.value,c.focus()},_.insertTab=function(i,c){c=c?new Array(c).fill(" ").join(""):"	";var s=i.getTextareaDom();if(l(s)){var o=s.selectionStart,u=s.selectionEnd,f=s.value,p=f.substring(0,o).split(`
`).pop();if(p.match(/^\s*[0-9]+\.\s+\S*/)){var m=p.replace(/(\d+)/,1);s.value=f.substring(0,o-m.length)+c+m+f.substring(u,f.length)}else p.match(/^\s*-\s+\S*/)?s.value=f.substring(0,o-p.length)+c+p+f.substring(u,f.length):s.value=f.substring(0,o)+c+f.substring(u,f.length);s.selectionStart=s.selectionEnd=o+c.length}else alert("Error: Browser version is too low");i.d_value=s.value,s.focus()},_.unInsertTab=function(i,c){var s=new RegExp(c?"\\s{"+c+"}":"	");console.log("regTab:",s);var o=i.getTextareaDom();if(l(o)){var u=o.selectionStart,f=o.selectionEnd,p=o.value,m=p.substring(0,u).split(`
`).pop();m.search(s)>=0&&(o.value=p.substring(0,u-m.length)+m.replace(s,"")+p.substring(f,p.length),o.selectionStart=o.selectionEnd=u-(c||1))}else alert("Error: Browser version is too low");i.d_value=o.value,o.focus()},_.insertEnter=function(i,c){var s=i.getTextareaDom();if(l(s)){var o=s.selectionStart,u=s.selectionEnd,f=s.value,p=f.substring(0,o).split(`
`).pop(),m=p.match(/^\s*(?:[0-9]+\.|-)\s+\S+/);if(m){c.preventDefault();var g=m.shift().match(/^\s*(?:[0-9]+\.|-)\s/).shift();if(g.search(/-/)>=0)s.value=f.substring(0,o)+`
`+g+f.substring(u,f.length),s.selectionStart=s.selectionEnd=o+g.length+1;else{var b=g.replace(/(\d+)/,parseInt(g)+1);s.value=f.substring(0,o)+`
`+b+f.substring(u,f.length),s.selectionStart=s.selectionEnd=o+b.length+1}}else{var w=p.match(/^\s*(?:[0-9]+\.|-)\s+$/);if(w){c.preventDefault();var y=w.shift().length;s.value=f.substring(0,o-y)+`
`+f.substring(u,f.length),s.selectionStart=s.selectionEnd=o-y}}}else alert("Error: Browser version is too low");i.d_value=s.value,s.focus()},_.getNavigation=function(i,c){var s=void 0;(s=i.$refs.navigationContent).innerHTML=i.d_render;var o=s.children;if(o.length)for(var u=0;u<o.length;u++)f(o[u],u);function f(p,m,g){/^H[1-6]{1}$/.exec(p.tagName)?p.onclick=function(){var b=i.$refs.vShowContent,w=i.$refs.vNoteEdit;i.s_subfield?i.s_preview_switch&&(w.scrollTop=b.children[m].offsetTop*(w.scrollHeight-w.offsetHeight)/(b.scrollHeight-b.offsetHeight)):i.s_preview_switch&&(b.scrollTop=b.children[m].offsetTop)}:p.style.display="none"}},_.scrollLink=function(i,c){var s=i.srcElement?i.srcElement:i.target,o=s.scrollTop/(s.scrollHeight-s.offsetHeight);c.edit_scroll_height>=0&&s.scrollHeight!==c.edit_scroll_height&&s.scrollHeight-s.offsetHeight-s.scrollTop<=30&&(c.$refs.vNoteEdit.scrollTop=s.scrollHeight-s.offsetHeight,o=1),c.edit_scroll_height=s.scrollHeight,c.$refs.vShowContent.scrollHeight>c.$refs.vShowContent.offsetHeight&&(c.$refs.vShowContent.scrollTop=(c.$refs.vShowContent.scrollHeight-c.$refs.vShowContent.offsetHeight)*o)},_.fullscreenchange=function(i){i.$el.addEventListener("fullscreenchange",function(c){i.$toolbar_right_read_change_status()},!1),i.$el.addEventListener("mozfullscreenchange",function(c){i.$toolbar_right_read_change_status()},!1),i.$el.addEventListener("webkitfullscreenchange",function(c){i.$toolbar_right_read_change_status()},!1),i.$el.addEventListener("msfullscreenchange",function(c){i.$toolbar_right_read_change_status()},!1)},_.windowResize=function(i){function c(){i.$el.clientWidth>768?i.s_subfield=i.subfield:i.s_subfield=!1}c(),window.addEventListener("resize",c)},_.ImagePreviewListener=function(i){i.$refs.vShowContent.addEventListener("click",function(c){var s=(c=c||window.event).srcElement?c.srcElement:c.target;s.tagName==="IMG"&&(i.imageClick!=null?i.imageClick(s):i.d_preview_imgsrc=s.src)})}},function(d,_,a){var e=a(38).FilterCSS,t=a(38).getDefaultWhiteList,n=a(39);function r(){return{a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","crossorigin","loop","muted","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],figcaption:[],figure:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height","loading"],ins:["datetime"],kbd:[],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],summary:[],sup:[],strong:[],strike:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","crossorigin","loop","muted","playsinline","poster","preload","src","height","width"]}}var l=new e;function i(C){return C.replace(c,"&lt;").replace(s,"&gt;")}var c=/</g,s=/>/g,o=/"/g,u=/&quot;/g,f=/&#([a-zA-Z0-9]*);?/gim,p=/&colon;?/gim,m=/&newline;?/gim,g=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a):/gi,b=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi,w=/u\s*r\s*l\s*\(.*/gi;function y(C){return C.replace(o,"&quot;")}function k(C){return C.replace(u,'"')}function v(C){return C.replace(f,function(j,T){return T[0]==="x"||T[0]==="X"?String.fromCharCode(parseInt(T.substr(1),16)):String.fromCharCode(parseInt(T,10))})}function x(C){return C.replace(p,":").replace(m," ")}function E(C){for(var j="",T=0,A=C.length;T<A;T++)j+=C.charCodeAt(T)<32?" ":C.charAt(T);return n.trim(j)}function S(C){return C=E(C=x(C=v(C=k(C))))}function O(C){return C=i(C=y(C))}_.whiteList={a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","crossorigin","loop","muted","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],figcaption:[],figure:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height","loading"],ins:["datetime"],kbd:[],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],summary:[],sup:[],strong:[],strike:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","rowspan","colspan","align","valign"],tfoot:["align","valign"],th:["width","rowspan","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","crossorigin","loop","muted","playsinline","poster","preload","src","height","width"]},_.getDefaultWhiteList=r,_.onTag=function(C,j,T){},_.onIgnoreTag=function(C,j,T){},_.onTagAttr=function(C,j,T){},_.onIgnoreTagAttr=function(C,j,T){},_.safeAttrValue=function(C,j,T,A){if(T=S(T),j==="href"||j==="src"){if((T=n.trim(T))==="#")return"#";if(T.substr(0,7)!=="http://"&&T.substr(0,8)!=="https://"&&T.substr(0,7)!=="mailto:"&&T.substr(0,4)!=="tel:"&&T.substr(0,11)!=="data:image/"&&T.substr(0,6)!=="ftp://"&&T.substr(0,2)!=="./"&&T.substr(0,3)!=="../"&&T[0]!=="#"&&T[0]!=="/")return""}else if(j==="background"){if(g.lastIndex=0,g.test(T))return""}else if(j==="style"){if(b.lastIndex=0,b.test(T)||(w.lastIndex=0,w.test(T)&&(g.lastIndex=0,g.test(T))))return"";A!==!1&&(T=(A=A||l).process(T))}return T=O(T)},_.escapeHtml=i,_.escapeQuote=y,_.unescapeQuote=k,_.escapeHtmlEntities=v,_.escapeDangerHtml5Entities=x,_.clearNonPrintableCharacter=E,_.friendlyAttrValue=S,_.escapeAttrValue=O,_.onIgnoreTagStripAll=function(){return""},_.StripTagBody=function(C,j){typeof j!="function"&&(j=function(){});var T=!Array.isArray(C),A=[],D=!1;return{onIgnoreTag:function(z,B,N){if(function(H){return!!T||n.indexOf(C,H)!==-1}(z)){if(N.isClosing){var R="[/removed]",U=N.position+R.length;return A.push([D!==!1?D:N.position,U]),D=!1,R}return D||(D=N.position),"[removed]"}return j(z,B,N)},remove:function(z){var B="",N=0;return n.forEach(A,function(R){B+=z.slice(N,R[0]),N=R[1]}),B+=z.slice(N)}}},_.stripCommentTag=function(C){for(var j="",T=0;T<C.length;){var A=C.indexOf("<!--",T);if(A===-1){j+=C.slice(T);break}j+=C.slice(T,A);var D=C.indexOf("-->",A);if(D===-1)break;T=D+3}return j},_.stripBlankChar=function(C){var j=C.split("");return(j=j.filter(function(T){var A=T.charCodeAt(0);return A!==127&&(!(A<=31)||A===10||A===13)})).join("")},_.attributeWrapSign='"',_.cssFilter=l,_.getDefaultCSSWhiteList=t},function(d,_){function a(){var t={"align-content":!1,"align-items":!1,"align-self":!1,"alignment-adjust":!1,"alignment-baseline":!1,all:!1,"anchor-point":!1,animation:!1,"animation-delay":!1,"animation-direction":!1,"animation-duration":!1,"animation-fill-mode":!1,"animation-iteration-count":!1,"animation-name":!1,"animation-play-state":!1,"animation-timing-function":!1,azimuth:!1,"backface-visibility":!1,background:!0,"background-attachment":!0,"background-clip":!0,"background-color":!0,"background-image":!0,"background-origin":!0,"background-position":!0,"background-repeat":!0,"background-size":!0,"baseline-shift":!1,binding:!1,bleed:!1,"bookmark-label":!1,"bookmark-level":!1,"bookmark-state":!1,border:!0,"border-bottom":!0,"border-bottom-color":!0,"border-bottom-left-radius":!0,"border-bottom-right-radius":!0,"border-bottom-style":!0,"border-bottom-width":!0,"border-collapse":!0,"border-color":!0,"border-image":!0,"border-image-outset":!0,"border-image-repeat":!0,"border-image-slice":!0,"border-image-source":!0,"border-image-width":!0,"border-left":!0,"border-left-color":!0,"border-left-style":!0,"border-left-width":!0,"border-radius":!0,"border-right":!0,"border-right-color":!0,"border-right-style":!0,"border-right-width":!0,"border-spacing":!0,"border-style":!0,"border-top":!0,"border-top-color":!0,"border-top-left-radius":!0,"border-top-right-radius":!0,"border-top-style":!0,"border-top-width":!0,"border-width":!0,bottom:!1,"box-decoration-break":!0,"box-shadow":!0,"box-sizing":!0,"box-snap":!0,"box-suppress":!0,"break-after":!0,"break-before":!0,"break-inside":!0,"caption-side":!1,chains:!1,clear:!0,clip:!1,"clip-path":!1,"clip-rule":!1,color:!0,"color-interpolation-filters":!0,"column-count":!1,"column-fill":!1,"column-gap":!1,"column-rule":!1,"column-rule-color":!1,"column-rule-style":!1,"column-rule-width":!1,"column-span":!1,"column-width":!1,columns:!1,contain:!1,content:!1,"counter-increment":!1,"counter-reset":!1,"counter-set":!1,crop:!1,cue:!1,"cue-after":!1,"cue-before":!1,cursor:!1,direction:!1,display:!0,"display-inside":!0,"display-list":!0,"display-outside":!0,"dominant-baseline":!1,elevation:!1,"empty-cells":!1,filter:!1,flex:!1,"flex-basis":!1,"flex-direction":!1,"flex-flow":!1,"flex-grow":!1,"flex-shrink":!1,"flex-wrap":!1,float:!1,"float-offset":!1,"flood-color":!1,"flood-opacity":!1,"flow-from":!1,"flow-into":!1,font:!0,"font-family":!0,"font-feature-settings":!0,"font-kerning":!0,"font-language-override":!0,"font-size":!0,"font-size-adjust":!0,"font-stretch":!0,"font-style":!0,"font-synthesis":!0,"font-variant":!0,"font-variant-alternates":!0,"font-variant-caps":!0,"font-variant-east-asian":!0,"font-variant-ligatures":!0,"font-variant-numeric":!0,"font-variant-position":!0,"font-weight":!0,grid:!1,"grid-area":!1,"grid-auto-columns":!1,"grid-auto-flow":!1,"grid-auto-rows":!1,"grid-column":!1,"grid-column-end":!1,"grid-column-start":!1,"grid-row":!1,"grid-row-end":!1,"grid-row-start":!1,"grid-template":!1,"grid-template-areas":!1,"grid-template-columns":!1,"grid-template-rows":!1,"hanging-punctuation":!1,height:!0,hyphens:!1,icon:!1,"image-orientation":!1,"image-resolution":!1,"ime-mode":!1,"initial-letters":!1,"inline-box-align":!1,"justify-content":!1,"justify-items":!1,"justify-self":!1,left:!1,"letter-spacing":!0,"lighting-color":!0,"line-box-contain":!1,"line-break":!1,"line-grid":!1,"line-height":!1,"line-snap":!1,"line-stacking":!1,"line-stacking-ruby":!1,"line-stacking-shift":!1,"line-stacking-strategy":!1,"list-style":!0,"list-style-image":!0,"list-style-position":!0,"list-style-type":!0,margin:!0,"margin-bottom":!0,"margin-left":!0,"margin-right":!0,"margin-top":!0,"marker-offset":!1,"marker-side":!1,marks:!1,mask:!1,"mask-box":!1,"mask-box-outset":!1,"mask-box-repeat":!1,"mask-box-slice":!1,"mask-box-source":!1,"mask-box-width":!1,"mask-clip":!1,"mask-image":!1,"mask-origin":!1,"mask-position":!1,"mask-repeat":!1,"mask-size":!1,"mask-source-type":!1,"mask-type":!1,"max-height":!0,"max-lines":!1,"max-width":!0,"min-height":!0,"min-width":!0,"move-to":!1,"nav-down":!1,"nav-index":!1,"nav-left":!1,"nav-right":!1,"nav-up":!1,"object-fit":!1,"object-position":!1,opacity:!1,order:!1,orphans:!1,outline:!1,"outline-color":!1,"outline-offset":!1,"outline-style":!1,"outline-width":!1,overflow:!1,"overflow-wrap":!1,"overflow-x":!1,"overflow-y":!1,padding:!0,"padding-bottom":!0,"padding-left":!0,"padding-right":!0,"padding-top":!0,page:!1,"page-break-after":!1,"page-break-before":!1,"page-break-inside":!1,"page-policy":!1,pause:!1,"pause-after":!1,"pause-before":!1,perspective:!1,"perspective-origin":!1,pitch:!1,"pitch-range":!1,"play-during":!1,position:!1,"presentation-level":!1,quotes:!1,"region-fragment":!1,resize:!1,rest:!1,"rest-after":!1,"rest-before":!1,richness:!1,right:!1,rotation:!1,"rotation-point":!1,"ruby-align":!1,"ruby-merge":!1,"ruby-position":!1,"shape-image-threshold":!1,"shape-outside":!1,"shape-margin":!1,size:!1,speak:!1,"speak-as":!1,"speak-header":!1,"speak-numeral":!1,"speak-punctuation":!1,"speech-rate":!1,stress:!1,"string-set":!1,"tab-size":!1,"table-layout":!1,"text-align":!0,"text-align-last":!0,"text-combine-upright":!0,"text-decoration":!0,"text-decoration-color":!0,"text-decoration-line":!0,"text-decoration-skip":!0,"text-decoration-style":!0,"text-emphasis":!0,"text-emphasis-color":!0,"text-emphasis-position":!0,"text-emphasis-style":!0,"text-height":!0,"text-indent":!0,"text-justify":!0,"text-orientation":!0,"text-overflow":!0,"text-shadow":!0,"text-space-collapse":!0,"text-transform":!0,"text-underline-position":!0,"text-wrap":!0,top:!1,transform:!1,"transform-origin":!1,"transform-style":!1,transition:!1,"transition-delay":!1,"transition-duration":!1,"transition-property":!1,"transition-timing-function":!1,"unicode-bidi":!1,"vertical-align":!1,visibility:!1,"voice-balance":!1,"voice-duration":!1,"voice-family":!1,"voice-pitch":!1,"voice-range":!1,"voice-rate":!1,"voice-stress":!1,"voice-volume":!1,volume:!1,"white-space":!1,widows:!1,width:!0,"will-change":!1,"word-break":!0,"word-spacing":!0,"word-wrap":!0,"wrap-flow":!1,"wrap-through":!1,"writing-mode":!1,"z-index":!1};return t}var e=/javascript\s*\:/gim;_.whiteList=a(),_.getDefaultWhiteList=a,_.onAttr=function(t,n,r){},_.onIgnoreAttr=function(t,n,r){},_.safeAttrValue=function(t,n){return e.test(n)?"":n}},function(d,_){d.exports={indexOf:function(a,e){var t,n;if(Array.prototype.indexOf)return a.indexOf(e);for(t=0,n=a.length;t<n;t++)if(a[t]===e)return t;return-1},forEach:function(a,e,t){var n,r;if(Array.prototype.forEach)return a.forEach(e,t);for(n=0,r=a.length;n<r;n++)e.call(t,a[n],n,a)},trim:function(a){return String.prototype.trim?a.trim():a.replace(/(^\s*)|(\s*$)/g,"")},trimRight:function(a){return String.prototype.trimRight?a.trimRight():a.replace(/(\s*$)/g,"")}}},function(d,_,a){var e=a(39);function t(o){var u,f=e.spaceIndex(o);return u=f===-1?o.slice(1,-1):o.slice(1,f+1),(u=e.trim(u).toLowerCase()).slice(0,1)==="/"&&(u=u.slice(1)),u.slice(-1)==="/"&&(u=u.slice(0,-1)),u}function n(o){return o.slice(0,2)==="</"}var r=/[^a-zA-Z0-9\\_:.-]/gim;function l(o,u){for(;u<o.length;u++){var f=o[u];if(f!==" ")return f==="="?u:-1}}function i(o,u){for(;u<o.length;u++){var f=o[u];if(f!==" ")return f==="'"||f==='"'?u:-1}}function c(o,u){for(;u>0;u--){var f=o[u];if(f!==" ")return f==="="?u:-1}}function s(o){return function(u){return u[0]==='"'&&u[u.length-1]==='"'||u[0]==="'"&&u[u.length-1]==="'"}(o)?o.substr(1,o.length-2):o}_.parseTag=function(o,u,f){var p="",m=0,g=!1,b=!1,w=0,y=o.length,k="",v="";e:for(w=0;w<y;w++){var x=o.charAt(w);if(g===!1){if(x==="<"){g=w;continue}}else if(b===!1){if(x==="<"){p+=f(o.slice(m,w)),g=w,m=w;continue}if(x===">"||w===y-1){p+=f(o.slice(m,g)),k=t(v=o.slice(g,w+1)),p+=u(g,p.length,k,v,n(v)),m=w+1,g=!1;continue}if(x==='"'||x==="'")for(var E=1,S=o.charAt(w-E);S.trim()===""||S==="=";){if(S==="="){b=x;continue e}S=o.charAt(w-++E)}}else if(x===b){b=!1;continue}}return m<y&&(p+=f(o.substr(m))),p},_.parseAttr=function(o,u){var f=0,p=0,m=[],g=!1,b=o.length;function w(x,E){if(!((x=(x=e.trim(x)).replace(r,"").toLowerCase()).length<1)){var S=u(x,E||"");S&&m.push(S)}}for(var y=0;y<b;y++){var k,v=o.charAt(y);if(g!==!1||v!=="=")if(g===!1||y!==p){if(/\s|\n|\t/.test(v)){if(o=o.replace(/\s|\n|\t/g," "),g===!1){if((k=l(o,y))===-1){w(e.trim(o.slice(f,y))),g=!1,f=y+1;continue}y=k-1;continue}if((k=c(o,y-1))===-1){w(g,s(e.trim(o.slice(f,y)))),g=!1,f=y+1;continue}}}else{if((k=o.indexOf(v,y+1))===-1)break;w(g,e.trim(o.slice(p+1,k))),g=!1,f=(y=k)+1}else g=o.slice(f,y),f=y+1,p=o.charAt(f)==='"'||o.charAt(f)==="'"?f:i(o,y+1)}return f<o.length&&(g===!1?w(o.slice(f)):w(g,s(e.trim(o.slice(f))))),e.trim(m.join(" "))}},function(d,_,a){d.exports=a(142)},function(d,_,a){d.exports.encode=a(143),d.exports.decode=a(144),d.exports.format=a(145),d.exports.parse=a(146)},function(d,_){d.exports=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/},function(d,_){d.exports=/[\0-\x1F\x7F-\x9F]/},function(d,_){d.exports=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/},function(d,_,a){var e=`<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^"'=<>\`\\x00-\\x20]+|'[^']*'|"[^"]*"))?)*\\s*\\/?>`,t="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",n=new RegExp("^(?:"+e+"|"+t+"|<!---->|<!--(?:-?[^>-])(?:-?[^-])*-->|<[?].*?[?]>|<![A-Z]+\\s+[^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"),r=new RegExp("^(?:"+e+"|"+t+")");d.exports.HTML_TAG_RE=n,d.exports.HTML_OPEN_CLOSE_TAG_RE=r},function(d,_,a){function e(t,n){var r,l,i,c,s,o=[],u=n.length;for(r=0;r<u;r++)(i=n[r]).marker===126&&i.end!==-1&&(c=n[i.end],(s=t.tokens[i.token]).type="s_open",s.tag="s",s.nesting=1,s.markup="~~",s.content="",(s=t.tokens[c.token]).type="s_close",s.tag="s",s.nesting=-1,s.markup="~~",s.content="",t.tokens[c.token-1].type==="text"&&t.tokens[c.token-1].content==="~"&&o.push(c.token-1));for(;o.length;){for(l=(r=o.pop())+1;l<t.tokens.length&&t.tokens[l].type==="s_close";)l++;r!==--l&&(s=t.tokens[l],t.tokens[l]=t.tokens[r],t.tokens[r]=s)}}d.exports.tokenize=function(t,n){var r,l,i,c,s=t.pos,o=t.src.charCodeAt(s);if(n||o!==126||(i=(l=t.scanDelims(t.pos,!0)).length,c=String.fromCharCode(o),i<2))return!1;for(i%2&&(t.push("text","",0).content=c,i--),r=0;r<i;r+=2)t.push("text","",0).content=c+c,t.delimiters.push({marker:o,length:0,jump:r,token:t.tokens.length-1,end:-1,open:l.can_open,close:l.can_close});return t.pos+=l.length,!0},d.exports.postProcess=function(t){var n,r=t.tokens_meta,l=t.tokens_meta.length;for(e(t,t.delimiters),n=0;n<l;n++)r[n]&&r[n].delimiters&&e(t,r[n].delimiters)}},function(d,_,a){function e(t,n){var r,l,i,c,s,o;for(r=n.length-1;r>=0;r--)(l=n[r]).marker!==95&&l.marker!==42||l.end!==-1&&(i=n[l.end],o=r>0&&n[r-1].end===l.end+1&&n[r-1].token===l.token-1&&n[l.end+1].token===i.token+1&&n[r-1].marker===l.marker,s=String.fromCharCode(l.marker),(c=t.tokens[l.token]).type=o?"strong_open":"em_open",c.tag=o?"strong":"em",c.nesting=1,c.markup=o?s+s:s,c.content="",(c=t.tokens[i.token]).type=o?"strong_close":"em_close",c.tag=o?"strong":"em",c.nesting=-1,c.markup=o?s+s:s,c.content="",o&&(t.tokens[n[r-1].token].content="",t.tokens[n[l.end+1].token].content="",r--))}d.exports.tokenize=function(t,n){var r,l,i=t.pos,c=t.src.charCodeAt(i);if(n||c!==95&&c!==42)return!1;for(l=t.scanDelims(t.pos,c===42),r=0;r<l.length;r++)t.push("text","",0).content=String.fromCharCode(c),t.delimiters.push({marker:c,length:l.length,jump:r,token:t.tokens.length-1,end:-1,open:l.can_open,close:l.can_close});return t.pos+=l.length,!0},d.exports.postProcess=function(t){var n,r=t.tokens_meta,l=t.tokens_meta.length;for(e(t,t.delimiters),n=0;n<l;n++)r[n]&&r[n].delimiters&&e(t,r[n].delimiters)}},function(d,_,a){a.r(_);var e=a(76),t=a(22);for(var n in t)["default"].indexOf(n)<0&&function(i){a.d(_,i,function(){return t[i]})}(n);a(216);var r=a(3);const l=a.n(r)()(t.default,[["render",e.a],["__scopeId","data-v-218640b4"]]);_.default=l},function(d,_,a){var e=a(217);e.__esModule&&(e=e.default),typeof e=="string"&&(e=[[d.i,e,""]]),e.locals&&(d.exports=e.locals),(0,a(44).default)("74ee9320",e,!1,{})},function(d,_,a){a.r(_);var e=a(77),t=a(23);for(var n in t)["default"].indexOf(n)<0&&function(i){a.d(_,i,function(){return t[i]})}(n);var r=a(3);const l=a.n(r)()(t.default,[["render",e.a]]);_.default=l},function(d,_,a){var e=a(220);e.__esModule&&(e=e.default),typeof e=="string"&&(e=[[d.i,e,""]]),e.locals&&(d.exports=e.locals),(0,a(44).default)("4958985a",e,!1,{})},function(d,_,a){var e=a(222);e.__esModule&&(e=e.default),typeof e=="string"&&(e=[[d.i,e,""]]),e.locals&&(d.exports=e.locals),(0,a(44).default)("200b97d3",e,!1,{})},function(d,_,a){a.d(_,"a",function(){return o});var e=a(0);const t={class:"v-note-panel"},n=["innerHTML"],r={class:"v-note-navigation-title"},l={ref:"help"},i=["innerHTML"],c=["src"],s=["innerHTML"];function o(u,f,p,m,g,b){const w=Object(e.resolveComponent)("v-md-toolbar-left"),y=Object(e.resolveComponent)("v-md-toolbar-right"),k=Object(e.resolveComponent)("v-autoTextarea");return Object(e.openBlock)(),Object(e.createElementBlock)("div",{class:Object(e.normalizeClass)([[{fullscreen:g.s_fullScreen,shadow:p.boxShadow}],"v-note-wrapper markdown-body"]),style:Object(e.normalizeStyle)({"box-shadow":p.boxShadow?p.boxShadowStyle:""})},[Object(e.createCommentVNode)("工具栏"),Object(e.withDirectives)(Object(e.createElementVNode)("div",{class:"v-note-op",style:Object(e.normalizeStyle)({background:p.toolbarsBackground})},[Object(e.createVNode)(w,{ref:"toolbar_left",editable:p.editable,transition:p.transition,d_words:g.d_words,onToolbar_left_click:b.toolbar_left_click,onToolbar_left_addlink:b.toolbar_left_addlink,toolbars:p.toolbars,onImgAdd:b.$imgAdd,onImgDel:b.$imgDel,onImgTouch:b.$imgTouch,image_filter:p.imageFilter,class:Object(e.normalizeClass)({transition:p.transition})},{"left-toolbar-before":Object(e.withCtx)(()=>[Object(e.renderSlot)(u.$slots,"left-toolbar-before",{},void 0,!0)]),"left-toolbar-after":Object(e.withCtx)(()=>[Object(e.renderSlot)(u.$slots,"left-toolbar-after",{},void 0,!0)]),_:3},8,["editable","transition","d_words","onToolbar_left_click","onToolbar_left_addlink","toolbars","onImgAdd","onImgDel","onImgTouch","image_filter","class"]),Object(e.createVNode)(y,{ref:"toolbar_right",d_words:g.d_words,onToolbar_right_click:b.toolbar_right_click,toolbars:p.toolbars,s_subfield:g.s_subfield,s_preview_switch:g.s_preview_switch,s_fullScreen:g.s_fullScreen,s_html_code:g.s_html_code,s_navigation:g.s_navigation,class:Object(e.normalizeClass)({transition:p.transition})},{"right-toolbar-before":Object(e.withCtx)(()=>[Object(e.renderSlot)(u.$slots,"right-toolbar-before",{},void 0,!0)]),"right-toolbar-after":Object(e.withCtx)(()=>[Object(e.renderSlot)(u.$slots,"right-toolbar-after",{},void 0,!0)]),_:3},8,["d_words","onToolbar_right_click","toolbars","s_subfield","s_preview_switch","s_fullScreen","s_html_code","s_navigation","class"])],4),[[e.vShow,p.toolbarsFlag]]),Object(e.createCommentVNode)("编辑展示区域"),Object(e.createElementVNode)("div",t,[Object(e.createCommentVNode)("编辑区"),Object(e.createElementVNode)("div",{ref:"vNoteEdit",onScroll:f[1]||(f[1]=(...v)=>b.$v_edit_scroll&&b.$v_edit_scroll(...v)),class:Object(e.normalizeClass)(["v-note-edit divarea-wrapper",{"scroll-style":g.s_scrollStyle,"scroll-style-border-radius":g.s_scrollStyle&&!g.s_preview_switch&&!g.s_html_code,"single-edit":!g.s_preview_switch&&!g.s_html_code,"single-show":!g.s_subfield&&g.s_preview_switch||!g.s_subfield&&g.s_html_code,transition:p.transition}]),onClick:f[2]||(f[2]=(...v)=>b.textAreaFocus&&b.textAreaFocus(...v))},[Object(e.createElementVNode)("div",{class:"content-input-wrapper",style:Object(e.normalizeStyle)({"background-color":p.editorBackground})},[Object(e.createCommentVNode)(" 双栏 "),Object(e.createVNode)(k,{ref:"vNoteTextarea",placeholder:p.placeholder?p.placeholder:g.d_words.start_editor,class:"content-input",fontSize:p.fontSize,lineHeight:"1.5",modelValue:g.d_value,"onUpdate:modelValue":f[0]||(f[0]=v=>g.d_value=v),fullHeight:"",style:Object(e.normalizeStyle)({"background-color":p.editorBackground})},null,8,["placeholder","fontSize","modelValue","style"])],4)],34),Object(e.createCommentVNode)("展示区"),Object(e.withDirectives)(Object(e.createElementVNode)("div",{class:Object(e.normalizeClass)([{"single-show":!g.s_subfield&&g.s_preview_switch||!g.s_subfield&&g.s_html_code},"v-note-show"])},[Object(e.withDirectives)(Object(e.createElementVNode)("div",{ref:"vShowContent",innerHTML:g.d_render,class:Object(e.normalizeClass)([{"scroll-style":g.s_scrollStyle,"scroll-style-border-radius":g.s_scrollStyle},"v-show-content"]),style:Object(e.normalizeStyle)({"background-color":p.previewBackground})},null,14,n),[[e.vShow,!g.s_html_code]]),Object(e.withDirectives)(Object(e.createElementVNode)("div",{class:Object(e.normalizeClass)([{"scroll-style":g.s_scrollStyle,"scroll-style-border-radius":g.s_scrollStyle},"v-show-content-html"]),style:Object(e.normalizeStyle)({"background-color":p.previewBackground})},Object(e.toDisplayString)(g.d_render),7),[[e.vShow,g.s_html_code]])],2),[[e.vShow,g.s_preview_switch||g.s_html_code]]),Object(e.createCommentVNode)("标题导航"),Object(e.createVNode)(e.Transition,{name:"slideTop",persisted:""},{default:Object(e.withCtx)(()=>[Object(e.withDirectives)(Object(e.createElementVNode)("div",{class:Object(e.normalizeClass)(["v-note-navigation-wrapper",{transition:p.transition}])},[Object(e.createElementVNode)("div",r,[Object(e.createTextVNode)(Object(e.toDisplayString)(g.d_words.navigation_title),1),Object(e.createElementVNode)("i",{onClick:f[3]||(f[3]=v=>b.toolbar_right_click("navigation")),class:"fa fa-mavon-times v-note-navigation-close","aria-hidden":"true"})]),Object(e.createElementVNode)("div",{ref:"navigationContent",class:Object(e.normalizeClass)(["v-note-navigation-content",{"scroll-style":g.s_scrollStyle}])},null,2)],2),[[e.vShow,g.s_navigation]])]),_:1})]),Object(e.createCommentVNode)("帮助文档"),Object(e.createVNode)(e.Transition,{name:"fade"},{default:Object(e.withCtx)(()=>[Object(e.createElementVNode)("div",l,[g.s_help?(Object(e.openBlock)(),Object(e.createElementBlock)("div",{key:0,onClick:f[5]||(f[5]=Object(e.withModifiers)(v=>b.toolbar_right_click("help"),["self"])),class:"v-note-help-wrapper"},[Object(e.createElementVNode)("div",{class:Object(e.normalizeClass)(["v-note-help-content markdown-body",{shadow:p.boxShadow}])},[Object(e.createElementVNode)("i",{onClick:f[4]||(f[4]=Object(e.withModifiers)(v=>b.toolbar_right_click("help"),["stop","prevent"])),class:"fa fa-mavon-times","aria-hidden":"true"}),Object(e.createElementVNode)("div",{class:"scroll-style v-note-help-show",innerHTML:g.d_help},null,8,i)],2)])):Object(e.createCommentVNode)("v-if",!0)],512)]),_:1}),Object(e.createCommentVNode)(" 预览图片 "),Object(e.createVNode)(e.Transition,{name:"fade"},{default:Object(e.withCtx)(()=>[g.d_preview_imgsrc?(Object(e.openBlock)(),Object(e.createElementBlock)("div",{key:0,onClick:f[6]||(f[6]=v=>g.d_preview_imgsrc=null),class:"v-note-img-wrapper"},[Object(e.createElementVNode)("img",{src:g.d_preview_imgsrc,alt:"none"},null,8,c)])):Object(e.createCommentVNode)("v-if",!0)]),_:1}),Object(e.createCommentVNode)("阅读模式"),Object(e.createElementVNode)("div",{class:Object(e.normalizeClass)([{show:g.s_readmodel},"v-note-read-model scroll-style"]),ref:"vReadModel"},[Object(e.createElementVNode)("div",{ref:"vNoteReadContent",class:"v-note-read-content",innerHTML:g.d_render},null,8,s)],2)],6)}},function(d,_,a){a.d(_,"a",function(){return Z});var e=a(0);const t={class:"v-left-item"},n=["disabled","title"],r=["disabled","title"],l=["disabled","title"],i={key:3,class:"op-icon-divider"},c=["disabled","title"],s=["disabled","title"],o=["disabled","title"],u=["disabled","title"],f=["disabled","title"],p=["disabled","title"],m=["disabled","title"],g=["disabled","title"],b={key:12,class:"op-icon-divider"},w=["disabled","title"],y=["disabled","title"],k=["disabled","title"],v={key:16,class:"op-icon-divider"},x=["disabled","title"],E=["disabled"],S={class:"dropdown-item",style:{overflow:"hidden"}},O=["title","onClick"],C=["onClick","title"],j=["src"],T=["disabled","title"],A=["disabled","title"],D={key:21,class:"op-icon-divider"},z=["title"],B=["title"],N=["title"],R=["title"],U={key:0,class:"add-image-link-wrapper"},H={class:"add-image-link"},W={class:"title"},F={class:"link-text input-wrapper"},q=["placeholder"],G={class:"link-addr input-wrapper"},X=["placeholder"];function Z(Y,M,L,ne,J,P){return Object(e.openBlock)(),Object(e.createElementBlock)("div",t,[Object(e.renderSlot)(Y.$slots,"left-toolbar-before",{},void 0,!0),L.toolbars.bold?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:0,disabled:!L.editable,type:"button",onClick:M[0]||(M[0]=I=>P.$clicks("bold")),class:"op-icon fa fa-mavon-bold","aria-hidden":"true",title:L.d_words.tl_bold+" (ctrl+b)"},null,8,n)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.italic?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:1,disabled:!L.editable,type:"button",onClick:M[1]||(M[1]=I=>P.$clicks("italic")),class:"op-icon fa fa-mavon-italic","aria-hidden":"true",title:L.d_words.tl_italic+" (ctrl+i)"},null,8,r)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.header?(Object(e.openBlock)(),Object(e.createElementBlock)("div",{key:2,class:Object(e.normalizeClass)([{selected:J.s_header_dropdown_open},"op-icon fa fa-mavon-header dropdown dropdown-wrapper"]),disabled:!L.editable,type:"button",onMouseleave:M[10]||(M[10]=(...I)=>P.$mouseleave_header_dropdown&&P.$mouseleave_header_dropdown(...I)),onMouseenter:M[11]||(M[11]=(...I)=>P.$mouseenter_header_dropdown&&P.$mouseenter_header_dropdown(...I)),"aria-hidden":"true",title:L.d_words.tl_header+" (ctrl+h)"},[Object(e.createVNode)(e.Transition,{name:"fade",persisted:""},{default:Object(e.withCtx)(()=>[Object(e.withDirectives)(Object(e.createElementVNode)("div",{class:Object(e.normalizeClass)(["op-header popup-dropdown",{transition:L.transition}]),onMouseenter:M[8]||(M[8]=(...I)=>P.$mouseenter_header_dropdown&&P.$mouseenter_header_dropdown(...I)),onMouseleave:M[9]||(M[9]=(...I)=>P.$mouseleave_header_dropdown&&P.$mouseleave_header_dropdown(...I))},[Object(e.createElementVNode)("div",{title:"#",class:"dropdown-item",onClick:M[2]||(M[2]=Object(e.withModifiers)(I=>P.$click_header("header1"),["stop"]))},[Object(e.createElementVNode)("span",null,Object(e.toDisplayString)(L.d_words.tl_header_one),1)]),Object(e.createElementVNode)("div",{title:"## ",class:"dropdown-item",onClick:M[3]||(M[3]=Object(e.withModifiers)(I=>P.$click_header("header2"),["stop"]))},[Object(e.createElementVNode)("span",null,Object(e.toDisplayString)(L.d_words.tl_header_two),1)]),Object(e.createElementVNode)("div",{title:"### ",class:"dropdown-item",onClick:M[4]||(M[4]=Object(e.withModifiers)(I=>P.$click_header("header3"),["stop"]))},[Object(e.createElementVNode)("span",null,Object(e.toDisplayString)(L.d_words.tl_header_three),1)]),Object(e.createElementVNode)("div",{title:"#### ",class:"dropdown-item",onClick:M[5]||(M[5]=Object(e.withModifiers)(I=>P.$click_header("header4"),["stop"]))},[Object(e.createElementVNode)("span",null,Object(e.toDisplayString)(L.d_words.tl_header_four),1)]),Object(e.createElementVNode)("div",{title:"##### ",class:"dropdown-item",onClick:M[6]||(M[6]=Object(e.withModifiers)(I=>P.$click_header("header5"),["stop"]))},[Object(e.createElementVNode)("span",null,Object(e.toDisplayString)(L.d_words.tl_header_five),1)]),Object(e.createElementVNode)("div",{title:"###### ",class:"dropdown-item",onClick:M[7]||(M[7]=Object(e.withModifiers)(I=>P.$click_header("header6"),["stop"]))},[Object(e.createElementVNode)("span",null,Object(e.toDisplayString)(L.d_words.tl_header_six),1)])],34),[[e.vShow,J.s_header_dropdown_open]])]),_:1})],42,l)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.header||L.toolbars.italic||L.toolbars.bold?(Object(e.openBlock)(),Object(e.createElementBlock)("span",i)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.underline?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:4,disabled:!L.editable,type:"button",onClick:M[12]||(M[12]=I=>P.$clicks("underline")),class:"op-icon fa fa-mavon-underline",title:L.d_words.tl_underline+" (ctrl+u)","aria-hidden":"true"},null,8,c)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.strikethrough?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:5,disabled:!L.editable,type:"button",onClick:M[13]||(M[13]=I=>P.$clicks("strikethrough")),class:"op-icon fa fa-mavon-strikethrough",title:L.d_words.tl_strikethrough+" (ctrl+shift+d)","aria-hidden":"true"},null,8,s)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.mark?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:6,disabled:!L.editable,type:"button",onClick:M[14]||(M[14]=I=>P.$clicks("mark")),class:"op-icon fa fa-mavon-thumb-tack",title:L.d_words.tl_mark+" (ctrl+m)","aria-hidden":"true"},null,8,o)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.superscript?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:7,disabled:!L.editable,type:"button",onClick:M[15]||(M[15]=I=>P.$clicks("superscript")),class:"op-icon fa fa-mavon-superscript","aria-hidden":"true",title:L.d_words.tl_superscript+" (ctrl+alt+s)"},null,8,u)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.subscript?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:8,disabled:!L.editable,type:"button",onClick:M[16]||(M[16]=I=>P.$clicks("subscript")),class:"op-icon fa fa-mavon-subscript","aria-hidden":"true",title:L.d_words.tl_subscript+" (ctrl+shift+s)"},null,8,f)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.alignleft?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:9,disabled:!L.editable,type:"button",onClick:M[17]||(M[17]=I=>P.$clicks("alignleft")),class:"op-icon fa fa-mavon-align-left","aria-hidden":"true",title:L.d_words.tl_alignleft+" (ctrl+l)"},null,8,p)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.aligncenter?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:10,disabled:!L.editable,type:"button",onClick:M[18]||(M[18]=I=>P.$clicks("aligncenter")),class:"op-icon fa fa-mavon-align-center","aria-hidden":"true",title:L.d_words.tl_aligncenter+" (ctrl+e)"},null,8,m)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.alignright?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:11,disabled:!L.editable,type:"button",onClick:M[19]||(M[19]=I=>P.$clicks("alignright")),class:"op-icon fa fa-mavon-align-right","aria-hidden":"true",title:L.d_words.tl_alignright+" (ctrl+r)"},null,8,g)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.superscript||L.toolbars.subscript||L.toolbars.underline||L.toolbars.strikethrough||L.toolbars.mark?(Object(e.openBlock)(),Object(e.createElementBlock)("span",b)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.quote?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:13,disabled:!L.editable,type:"button",onClick:M[20]||(M[20]=I=>P.$clicks("quote")),class:"op-icon fa fa-mavon-quote-left","aria-hidden":"true",title:L.d_words.tl_quote+" (ctrl+q)"},null,8,w)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.ol?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:14,disabled:!L.editable,type:"button",onClick:M[21]||(M[21]=I=>P.$clicks("ol")),class:"op-icon fa fa-mavon-list-ol","aria-hidden":"true",title:L.d_words.tl_ol+" (ctrl+o)"},null,8,y)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.ul?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:15,disabled:!L.editable,type:"button",onClick:M[22]||(M[22]=I=>P.$clicks("ul")),class:"op-icon fa fa-mavon-list-ul","aria-hidden":"true",title:L.d_words.tl_ul+" (ctrl+alt+u)"},null,8,k)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.ul||L.toolbars.ol||L.toolbars.quote?(Object(e.openBlock)(),Object(e.createElementBlock)("span",v)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.link?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:17,disabled:!L.editable,type:"button",onClick:M[23]||(M[23]=Object(e.withModifiers)(I=>P.$toggle_imgLinkAdd("link"),["stop"])),class:"op-icon fa fa-mavon-link","aria-hidden":"true",title:L.d_words.tl_link+" (ctrl+l)"},null,8,x)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.imagelink?(Object(e.openBlock)(),Object(e.createElementBlock)("div",{key:18,disabled:!L.editable,class:Object(e.normalizeClass)([{selected:J.s_img_dropdown_open},"op-icon fa fa-mavon-picture-o dropdown dropdown-wrapper"]),type:"button",onMouseleave:M[28]||(M[28]=(...I)=>P.$mouseleave_img_dropdown&&P.$mouseleave_img_dropdown(...I)),onMouseenter:M[29]||(M[29]=(...I)=>P.$mouseenter_img_dropdown&&P.$mouseenter_img_dropdown(...I)),"aria-hidden":"true"},[Object(e.createVNode)(e.Transition,{name:"fade",persisted:""},{default:Object(e.withCtx)(()=>[Object(e.withDirectives)(Object(e.createElementVNode)("div",{class:Object(e.normalizeClass)(["op-image popup-dropdown",{transition:L.transition}]),onMouseleave:M[26]||(M[26]=(...I)=>P.$mouseleave_img_dropdown&&P.$mouseleave_img_dropdown(...I)),onMouseenter:M[27]||(M[27]=(...I)=>P.$mouseenter_img_dropdown&&P.$mouseenter_img_dropdown(...I))},[Object(e.createElementVNode)("div",{class:"dropdown-item",onClick:M[24]||(M[24]=Object(e.withModifiers)(I=>P.$toggle_imgLinkAdd("imagelink"),["stop"]))},[Object(e.createElementVNode)("span",null,Object(e.toDisplayString)(L.d_words.tl_image),1)]),Object(e.createElementVNode)("div",S,[Object(e.createElementVNode)("input",{type:"file",accept:"image/gif,image/jpeg,image/jpg,image/png,image/svg",onChange:M[25]||(M[25]=I=>P.$imgAdd(I)),multiple:"multiple"},null,32),Object(e.createTextVNode)(Object(e.toDisplayString)(L.d_words.tl_upload),1)]),(Object(e.openBlock)(!0),Object(e.createElementBlock)(e.Fragment,null,Object(e.renderList)(J.img_file,(I,te)=>(Object(e.openBlock)(),Object(e.createElementBlock)(e.Fragment,{key:te},[I&&I[1]?(Object(e.openBlock)(),Object(e.createElementBlock)("div",{key:0,class:"dropdown-item dropdown-images",title:I[1].name,onClick:Object(e.withModifiers)(oe=>P.$imgFileListClick(te),["stop"])},[Object(e.createElementVNode)("span",null,Object(e.toDisplayString)(I[1].name),1),Object(e.createElementVNode)("button",{type:"button",onClick:Object(e.withModifiers)(oe=>P.$imgDel(te),["stop"]),class:"op-icon fa fa-mavon-times","aria-hidden":"true",title:L.d_words.tl_upload_remove},null,8,C),Object(e.createCommentVNode)(" 缩略图展示 "),Object(e.createElementVNode)("img",{class:Object(e.normalizeClass)(["image-show",{transition:L.transition}]),src:I[1].miniurl,alt:"none"},null,10,j)],8,O)):Object(e.createCommentVNode)("v-if",!0)],64))),128))],34),[[e.vShow,J.s_img_dropdown_open]])]),_:1})],42,E)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.code?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:19,disabled:!L.editable,type:"button",onClick:M[30]||(M[30]=I=>P.$clicks("code")),class:"op-icon fa fa-mavon-code","aria-hidden":"true",title:L.d_words.tl_code+" (ctrl+alt+c)"},null,8,T)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.table?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:20,disabled:!L.editable,type:"button",onClick:M[31]||(M[31]=I=>P.$clicks("table")),class:"op-icon fa fa-mavon-table","aria-hidden":"true",title:L.d_words.tl_table+" (ctrl+alt+t)"},null,8,A)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.link||L.toolbars.imagelink||L.toolbars.code||L.toolbars.table?(Object(e.openBlock)(),Object(e.createElementBlock)("span",D)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.undo?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:22,type:"button",onClick:M[32]||(M[32]=I=>P.$clicks("undo")),class:"op-icon fa fa-mavon-undo","aria-hidden":"true",title:L.d_words.tl_undo+" (ctrl+z)"},null,8,z)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.redo?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:23,type:"button",onClick:M[33]||(M[33]=I=>P.$clicks("redo")),class:"op-icon fa fa-mavon-repeat","aria-hidden":"true",title:L.d_words.tl_redo+" (ctrl+y)"},null,8,B)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.trash?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:24,type:"button",onClick:M[34]||(M[34]=I=>P.$clicks("trash")),class:"op-icon fa fa-mavon-trash-o","aria-hidden":"true",title:L.d_words.tl_trash+" (ctrl+breakspace)"},null,8,N)):Object(e.createCommentVNode)("v-if",!0),L.toolbars.save?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:25,type:"button",onClick:M[35]||(M[35]=I=>P.$clicks("save")),class:"op-icon fa fa-mavon-floppy-o","aria-hidden":"true",title:L.d_words.tl_save+" (ctrl+s)"},null,8,R)):Object(e.createCommentVNode)("v-if",!0),Object(e.renderSlot)(Y.$slots,"left-toolbar-after",{},void 0,!0),Object(e.createCommentVNode)(" 添加image链接 "),Object(e.createVNode)(e.Transition,{name:"fade"},{default:Object(e.withCtx)(()=>[J.s_img_link_open?(Object(e.openBlock)(),Object(e.createElementBlock)("div",U,[Object(e.createElementVNode)("div",H,[Object(e.createElementVNode)("i",{onClick:M[36]||(M[36]=Object(e.withModifiers)(I=>J.s_img_link_open=!1,["stop","prevent"])),class:"fa fa-mavon-times","aria-hidden":"true"}),Object(e.createElementVNode)("h3",W,Object(e.toDisplayString)(J.link_type=="link"?L.d_words.tl_popup_link_title:L.d_words.tl_popup_img_link_title),1),Object(e.createElementVNode)("div",F,[Object(e.withDirectives)(Object(e.createElementVNode)("input",{ref:"linkTextInput",type:"text","onUpdate:modelValue":M[37]||(M[37]=I=>J.link_text=I),placeholder:J.link_type=="link"?L.d_words.tl_popup_link_text:L.d_words.tl_popup_img_link_text},null,8,q),[[e.vModelText,J.link_text]])]),Object(e.createElementVNode)("div",G,[Object(e.withDirectives)(Object(e.createElementVNode)("input",{type:"text","onUpdate:modelValue":M[38]||(M[38]=I=>J.link_addr=I),placeholder:J.link_type=="link"?L.d_words.tl_popup_link_addr:L.d_words.tl_popup_img_link_addr},null,8,X),[[e.vModelText,J.link_addr]])]),Object(e.createElementVNode)("div",{class:"op-btn cancel",onClick:M[39]||(M[39]=Object(e.withModifiers)(I=>J.s_img_link_open=!1,["stop"]))},Object(e.toDisplayString)(L.d_words.tl_popup_link_cancel),1),Object(e.createElementVNode)("div",{class:"op-btn sure",onClick:M[40]||(M[40]=Object(e.withModifiers)(I=>P.$imgLinkAdd(),["stop"]))},Object(e.toDisplayString)(L.d_words.tl_popup_link_sure),1)])])):Object(e.createCommentVNode)("v-if",!0)]),_:1})])}},function(d,_,a){a.d(_,"a",function(){return b});var e=a(0);const t={class:"v-right-item"},n=["title"],r=["title"],l=["title"],i=["title"],c=["title"],s=["title"],o=["title"],u=["title"],f={key:8,class:"op-icon-divider"},p=["title"],m=["title"],g=["title"];function b(w,y,k,v,x,E){return Object(e.openBlock)(),Object(e.createElementBlock)("div",t,[Object(e.renderSlot)(w.$slots,"right-toolbar-before"),k.toolbars.navigation?Object(e.withDirectives)((Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:0,type:"button",onClick:y[0]||(y[0]=S=>E.$clicks("navigation")),class:"op-icon fa fa-mavon-bars","aria-hidden":"true",title:k.d_words.tl_navigation_on+" (F8)"},null,8,n)),[[e.vShow,!k.s_navigation]]):Object(e.createCommentVNode)("v-if",!0),k.toolbars.navigation?Object(e.withDirectives)((Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:1,type:"button",onClick:y[1]||(y[1]=S=>E.$clicks("navigation")),class:"op-icon fa fa-mavon-bars selected","aria-hidden":"true",title:k.d_words.tl_navigation_off+" (F8)"},null,8,r)),[[e.vShow,k.s_navigation]]):Object(e.createCommentVNode)("v-if",!0),k.toolbars.preview?Object(e.withDirectives)((Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:2,type:"button",onClick:y[2]||(y[2]=S=>E.$clicks("preview")),class:"op-icon fa fa-mavon-eye-slash selected","aria-hidden":"true",title:k.d_words.tl_edit+" (F9)"},null,8,l)),[[e.vShow,k.s_preview_switch]]):Object(e.createCommentVNode)("v-if",!0),k.toolbars.preview?Object(e.withDirectives)((Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:3,type:"button",onClick:y[3]||(y[3]=S=>E.$clicks("preview")),class:"op-icon fa fa-mavon-eye","aria-hidden":"true",title:k.d_words.tl_preview+" (F9)"},null,8,i)),[[e.vShow,!k.s_preview_switch]]):Object(e.createCommentVNode)("v-if",!0),k.toolbars.fullscreen?Object(e.withDirectives)((Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:4,type:"button",onClick:y[4]||(y[4]=S=>E.$clicks("fullscreen")),class:"op-icon fa fa-mavon-arrows-alt",title:k.d_words.tl_fullscreen_on+" (F10)","aria-hidden":"true"},null,8,c)),[[e.vShow,!k.s_fullScreen]]):Object(e.createCommentVNode)("v-if",!0),k.toolbars.fullscreen?Object(e.withDirectives)((Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:5,type:"button",onClick:y[5]||(y[5]=S=>E.$clicks("fullscreen")),class:"op-icon fa fa-mavon-compress selected",title:k.d_words.tl_fullscreen_off+" (F10)","aria-hidden":"true"},null,8,s)),[[e.vShow,k.s_fullScreen]]):Object(e.createCommentVNode)("v-if",!0),k.toolbars.readmodel?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:6,type:"button",onClick:y[6]||(y[6]=S=>E.$clicks("read")),class:"op-icon fa fa-mavon-window-maximize","aria-hidden":"true",title:k.d_words.tl_read+" (F11)"},null,8,o)):Object(e.createCommentVNode)("v-if",!0),k.toolbars.subfield?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:7,type:"button",onClick:y[7]||(y[7]=S=>E.$clicks("subfield")),class:Object(e.normalizeClass)(["op-icon fa fa-mavon-columns",{selected:k.s_subfield}]),"aria-hidden":"true",title:(k.s_subfield?k.d_words.tl_single_column:k.d_words.tl_double_column)+" (F12)"},null,10,u)):Object(e.createCommentVNode)("v-if",!0),k.toolbars.help&&k.toolbars.htmlcode&&k.toolbars.readmodel&&k.toolbars.fullscreen&&k.toolbars.subfield&&k.toolbars.navigation?(Object(e.openBlock)(),Object(e.createElementBlock)("span",f)):Object(e.createCommentVNode)("v-if",!0),k.toolbars.htmlcode?Object(e.withDirectives)((Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:9,type:"button",onClick:y[8]||(y[8]=S=>E.$clicks("html")),class:"op-icon fa fa-mavon-code",title:k.d_words.tl_html_on,"aria-hidden":"true"},null,8,p)),[[e.vShow,!k.s_html_code]]):Object(e.createCommentVNode)("v-if",!0),k.toolbars.htmlcode?Object(e.withDirectives)((Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:10,type:"button",onClick:y[9]||(y[9]=S=>E.$clicks("html")),class:"op-icon fa fa-mavon-code selected",title:k.d_words.tl_html_off,"aria-hidden":"true"},null,8,m)),[[e.vShow,k.s_html_code]]):Object(e.createCommentVNode)("v-if",!0),k.toolbars.help?(Object(e.openBlock)(),Object(e.createElementBlock)("button",{key:11,type:"button",onClick:y[10]||(y[10]=S=>E.$clicks("help")),class:"op-icon fa fa-mavon-question-circle",style:{"font-size":"17px",padding:"5px 6px 5px 3px"},title:k.d_words.tl_help,"aria-hidden":"true"},null,8,g)):Object(e.createCommentVNode)("v-if",!0),Object(e.renderSlot)(w.$slots,"right-toolbar-after")])}},function(d,_,a){a.d(_,"a",function(){return n});var e=a(0);const t=["autofocus","placeholder"];function n(r,l,i,c,s,o){return Object(e.openBlock)(),Object(e.createElementBlock)("div",{style:Object(e.normalizeStyle)({fontSize:i.fontSize,lineHeight:i.lineHeight,height:i.fullHeight?"100%":"auto"}),class:"auto-textarea-wrapper"},[Object(e.createElementVNode)("pre",{style:Object(e.normalizeStyle)({fontSize:i.fontSize,lineHeight:i.lineHeight,minHeight:i.fullHeight?"100%":"auto"}),class:"auto-textarea-block"},[l[2]||(l[2]=Object(e.createElementVNode)("br",null,null,-1)),Object(e.createTextVNode)(Object(e.toDisplayString)(s.temp_value)+" ",1)],4),Object(e.withDirectives)(Object(e.createElementVNode)("textarea",{ref:"vTextarea",autofocus:s.s_autofocus,onKeyup:l[0]||(l[0]=(...u)=>o.change&&o.change(...u)),spellcheck:"false",placeholder:i.placeholder,"onUpdate:modelValue":l[1]||(l[1]=u=>s.temp_value=u),style:Object(e.normalizeStyle)({fontSize:i.fontSize,lineHeight:i.lineHeight}),class:Object(e.normalizeClass)([{"no-border":!i.border,"no-resize":!i.resize},"auto-textarea-input"])},"      ",46,t),[[e.vModelText,s.temp_value]])],4)}},function(d,_,a){var e=a(80).default,t={markdownIt:e.mixins[0].data().markdownIt,mavonEditor:e,LeftToolbar:a(70).default,RightToolbar:a(72).default,install:function(n){n.component("mavon-editor",e)}};d.exports=t},function(d,_,a){a.r(_);var e=a(75),t=a(21);for(var n in t)["default"].indexOf(n)<0&&function(i){a.d(_,i,function(){return t[i]})}(n);a(221),a(223);var r=a(3);const l=a.n(r)()(t.default,[["render",e.a],["__scopeId","data-v-33c11741"]]);_.default=l},function(d,_,a){d.exports={default:a(82),__esModule:!0}},function(d,_,a){a(83),a(95),d.exports=a(35).f("iterator")},function(d,_,a){var e=a(84)(!0);a(45)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,n=this._t,r=this._i;return r>=n.length?{value:void 0,done:!0}:(t=e(n,r),this._i+=t.length,{value:t,done:!1})})},function(d,_,a){var e=a(26),t=a(27);d.exports=function(n){return function(r,l){var i,c,s=String(t(r)),o=e(l),u=s.length;return o<0||o>=u?n?"":void 0:(i=s.charCodeAt(o))<55296||i>56319||o+1===u||(c=s.charCodeAt(o+1))<56320||c>57343?n?s.charAt(o):i:n?s.slice(o,o+2):c-56320+(i-55296<<10)+65536}}},function(d,_,a){var e=a(86);d.exports=function(t,n,r){if(e(t),n===void 0)return t;switch(r){case 1:return function(l){return t.call(n,l)};case 2:return function(l,i){return t.call(n,l,i)};case 3:return function(l,i,c){return t.call(n,l,i,c)}}return function(){return t.apply(n,arguments)}}},function(d,_){d.exports=function(a){if(typeof a!="function")throw TypeError(a+" is not a function!");return a}},function(d,_,a){var e=a(50),t=a(16),n=a(34),r={};a(5)(r,a(9)("iterator"),function(){return this}),d.exports=function(l,i,c){l.prototype=e(r,{next:t(1,c)}),n(l,i+" Iterator")}},function(d,_,a){var e=a(6),t=a(14),n=a(30);d.exports=a(7)?Object.defineProperties:function(r,l){t(r);for(var i,c=n(l),s=c.length,o=0;s>o;)e.f(r,i=c[o++],l[i]);return r}},function(d,_,a){var e=a(52);d.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return e(t)=="String"?t.split(""):Object(t)}},function(d,_,a){var e=a(8),t=a(91),n=a(92);d.exports=function(r){return function(l,i,c){var s,o=e(l),u=t(o.length),f=n(c,u);if(r&&i!=i){for(;u>f;)if((s=o[f++])!=s)return!0}else for(;u>f;f++)if((r||f in o)&&o[f]===i)return r||f||0;return!r&&-1}}},function(d,_,a){var e=a(26),t=Math.min;d.exports=function(n){return n>0?t(e(n),9007199254740991):0}},function(d,_,a){var e=a(26),t=Math.max,n=Math.min;d.exports=function(r,l){return(r=e(r))<0?t(r+l,0):n(r,l)}},function(d,_,a){var e=a(2).document;d.exports=e&&e.documentElement},function(d,_,a){var e=a(4),t=a(53),n=a(31)("IE_PROTO"),r=Object.prototype;d.exports=Object.getPrototypeOf||function(l){return l=t(l),e(l,n)?l[n]:typeof l.constructor=="function"&&l instanceof l.constructor?l.constructor.prototype:l instanceof Object?r:null}},function(d,_,a){a(96);for(var e=a(2),t=a(5),n=a(29),r=a(9)("toStringTag"),l="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),i=0;i<l.length;i++){var c=l[i],s=e[c],o=s&&s.prototype;o&&!o[r]&&t(o,r,c),n[c]=n.Array}},function(d,_,a){var e=a(97),t=a(98),n=a(29),r=a(8);d.exports=a(45)(Array,"Array",function(l,i){this._t=r(l),this._i=0,this._k=i},function(){var l=this._t,i=this._k,c=this._i++;return!l||c>=l.length?(this._t=void 0,t(1)):t(0,i=="keys"?c:i=="values"?l[c]:[c,l[c]])},"values"),n.Arguments=n.Array,e("keys"),e("values"),e("entries")},function(d,_){d.exports=function(){}},function(d,_){d.exports=function(a,e){return{value:e,done:!!a}}},function(d,_,a){d.exports={default:a(100),__esModule:!0}},function(d,_,a){a(101),a(107),a(108),a(109),d.exports=a(13).Symbol},function(d,_,a){var e=a(2),t=a(4),n=a(7),r=a(46),l=a(49),i=a(102).KEY,c=a(15),s=a(32),o=a(34),u=a(17),f=a(9),p=a(35),m=a(36),g=a(103),b=a(104),w=a(14),y=a(10),k=a(53),v=a(8),x=a(28),E=a(16),S=a(50),O=a(105),C=a(106),j=a(54),T=a(6),A=a(30),D=C.f,z=T.f,B=O.f,N=e.Symbol,R=e.JSON,U=R&&R.stringify,H=f("_hidden"),W=f("toPrimitive"),F={}.propertyIsEnumerable,q=s("symbol-registry"),G=s("symbols"),X=s("op-symbols"),Z=Object.prototype,Y=typeof N=="function"&&!!j.f,M=e.QObject,L=!M||!M.prototype||!M.prototype.findChild,ne=n&&c(function(){return S(z({},"a",{get:function(){return z(this,"a",{value:7}).a}})).a!=7})?function($,V,K){var Q=D(Z,V);Q&&delete Z[V],z($,V,K),Q&&$!==Z&&z(Z,V,Q)}:z,J=function($){var V=G[$]=S(N.prototype);return V._k=$,V},P=Y&&typeof N.iterator=="symbol"?function($){return typeof $=="symbol"}:function($){return $ instanceof N},I=function($,V,K){return $===Z&&I(X,V,K),w($),V=x(V,!0),w(K),t(G,V)?(K.enumerable?(t($,H)&&$[H][V]&&($[H][V]=!1),K=S(K,{enumerable:E(0,!1)})):(t($,H)||z($,H,E(1,{})),$[H][V]=!0),ne($,V,K)):z($,V,K)},te=function($,V){w($);for(var K,Q=g(V=v(V)),ee=0,re=Q.length;re>ee;)I($,K=Q[ee++],V[K]);return $},oe=function($){var V=F.call(this,$=x($,!0));return!(this===Z&&t(G,$)&&!t(X,$))&&(!(V||!t(this,$)||!t(G,$)||t(this,H)&&this[H][$])||V)},ie=function($,V){if($=v($),V=x(V,!0),$!==Z||!t(G,V)||t(X,V)){var K=D($,V);return!K||!t(G,V)||t($,H)&&$[H][V]||(K.enumerable=!0),K}},le=function($){for(var V,K=B(v($)),Q=[],ee=0;K.length>ee;)t(G,V=K[ee++])||V==H||V==i||Q.push(V);return Q},se=function($){for(var V,K=$===Z,Q=B(K?X:v($)),ee=[],re=0;Q.length>re;)!t(G,V=Q[re++])||K&&!t(Z,V)||ee.push(G[V]);return ee};Y||(l((N=function(){if(this instanceof N)throw TypeError("Symbol is not a constructor!");var $=u(arguments.length>0?arguments[0]:void 0),V=function(K){this===Z&&V.call(X,K),t(this,H)&&t(this[H],$)&&(this[H][$]=!1),ne(this,$,E(1,K))};return n&&L&&ne(Z,$,{configurable:!0,set:V}),J($)}).prototype,"toString",function(){return this._k}),C.f=ie,T.f=I,a(55).f=O.f=le,a(37).f=oe,j.f=se,n&&!a(12)&&l(Z,"propertyIsEnumerable",oe,!0),p.f=function($){return J(f($))}),r(r.G+r.W+r.F*!Y,{Symbol:N});for(var ce="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),ue=0;ce.length>ue;)f(ce[ue++]);for(var pe=A(f.store),de=0;pe.length>de;)m(pe[de++]);r(r.S+r.F*!Y,"Symbol",{for:function($){return t(q,$+="")?q[$]:q[$]=N($)},keyFor:function($){if(!P($))throw TypeError($+" is not a symbol!");for(var V in q)if(q[V]===$)return V},useSetter:function(){L=!0},useSimple:function(){L=!1}}),r(r.S+r.F*!Y,"Object",{create:function($,V){return V===void 0?S($):te(S($),V)},defineProperty:I,defineProperties:te,getOwnPropertyDescriptor:ie,getOwnPropertyNames:le,getOwnPropertySymbols:se});var fe=c(function(){j.f(1)});r(r.S+r.F*fe,"Object",{getOwnPropertySymbols:function($){return j.f(k($))}}),R&&r(r.S+r.F*(!Y||c(function(){var $=N();return U([$])!="[null]"||U({a:$})!="{}"||U(Object($))!="{}"})),"JSON",{stringify:function($){for(var V,K,Q=[$],ee=1;arguments.length>ee;)Q.push(arguments[ee++]);if(K=V=Q[1],(y(V)||$!==void 0)&&!P($))return b(V)||(V=function(re,ae){if(typeof K=="function"&&(ae=K.call(this,re,ae)),!P(ae))return ae}),Q[1]=V,U.apply(R,Q)}}),N.prototype[W]||a(5)(N.prototype,W,N.prototype.valueOf),o(N,"Symbol"),o(Math,"Math",!0),o(e.JSON,"JSON",!0)},function(d,_,a){var e=a(17)("meta"),t=a(10),n=a(4),r=a(6).f,l=0,i=Object.isExtensible||function(){return!0},c=!a(15)(function(){return i(Object.preventExtensions({}))}),s=function(u){r(u,e,{value:{i:"O"+ ++l,w:{}}})},o=d.exports={KEY:e,NEED:!1,fastKey:function(u,f){if(!t(u))return typeof u=="symbol"?u:(typeof u=="string"?"S":"P")+u;if(!n(u,e)){if(!i(u))return"F";if(!f)return"E";s(u)}return u[e].i},getWeak:function(u,f){if(!n(u,e)){if(!i(u))return!0;if(!f)return!1;s(u)}return u[e].w},onFreeze:function(u){return c&&o.NEED&&i(u)&&!n(u,e)&&s(u),u}}},function(d,_,a){var e=a(30),t=a(54),n=a(37);d.exports=function(r){var l=e(r),i=t.f;if(i)for(var c,s=i(r),o=n.f,u=0;s.length>u;)o.call(r,c=s[u++])&&l.push(c);return l}},function(d,_,a){var e=a(52);d.exports=Array.isArray||function(t){return e(t)=="Array"}},function(d,_,a){var e=a(8),t=a(55).f,n={}.toString,r=typeof window=="object"&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];d.exports.f=function(l){return r&&n.call(l)=="[object Window]"?function(i){try{return t(i)}catch{return r.slice()}}(l):t(e(l))}},function(d,_,a){var e=a(37),t=a(16),n=a(8),r=a(28),l=a(4),i=a(47),c=Object.getOwnPropertyDescriptor;_.f=a(7)?c:function(s,o){if(s=n(s),o=r(o,!0),i)try{return c(s,o)}catch{}if(l(s,o))return t(!e.f.call(s,o),s[o])}},function(d,_){},function(d,_,a){a(36)("asyncIterator")},function(d,_,a){a(36)("observable")},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0});var e=119,t=120,n=121,r=122,l=123,i=66,c=73,s=72,o=85,u=68,f=77,p=81,m=79,g=76,b=83,w=90,y=89,k=67,v=84,x=82,E=8,S=9,O=13,C=97,j=98,T=99,A=100,D=101,z=102,B=49,N=50,R=51,U=52,H=53,W=54;_.keydownListen=function(F){F.shortCut&&F.$el.addEventListener("keydown",function(q){if(q.ctrlKey||q.metaKey||q.altKey||q.shiftKey)if(!q.ctrlKey&&!q.metaKey||q.altKey||q.shiftKey){if((q.ctrlKey||q.metaKey)&&q.altKey&&!q.shiftKey)switch(q.keyCode){case b:q.preventDefault(),F.toolbar_left_click("superscript");break;case o:q.preventDefault(),F.toolbar_left_click("ul");break;case g:q.preventDefault(),F.toolbar_left_click("imagelink");break;case k:q.preventDefault(),F.toolbar_left_click("code");break;case v:q.preventDefault(),F.toolbar_left_click("table")}else if((q.ctrlKey||q.metaKey)&&q.shiftKey&&!q.altKey)switch(q.keyCode){case b:q.preventDefault(),F.toolbar_left_click("subscript");break;case u:q.preventDefault(),F.toolbar_left_click("strikethrough");break;case g:q.preventDefault(),F.toolbar_left_click("alignleft");break;case x:q.preventDefault(),F.toolbar_left_click("alignright");break;case k:q.preventDefault(),F.toolbar_left_click("aligncenter")}else if(!q.ctrlKey&&!q.metaKey&&q.shiftKey&&!q.altKey)switch(q.keyCode){case S:F.$refs.toolbar_left.s_img_link_open||(q.preventDefault(),F.unInsertTab())}}else switch(q.keyCode){case i:q.preventDefault(),F.toolbar_left_click("bold");break;case c:q.preventDefault(),F.toolbar_left_click("italic");break;case s:q.preventDefault(),F.toolbar_left_click("header");break;case o:q.preventDefault(),F.toolbar_left_click("underline");break;case u:q.preventDefault(),F.toolbar_left_click("removeLine");break;case f:q.preventDefault(),F.toolbar_left_click("mark");break;case p:q.preventDefault(),F.toolbar_left_click("quote");break;case m:q.preventDefault(),F.toolbar_left_click("ol");break;case g:q.preventDefault(),F.toolbar_left_click("link");break;case b:q.preventDefault(),F.toolbar_left_click("save");break;case w:q.preventDefault(),F.toolbar_left_click("undo");break;case y:q.preventDefault(),F.toolbar_left_click("redo");break;case E:q.preventDefault(),F.toolbar_left_click("trash");break;case C:q.preventDefault(),F.toolbar_left_click("header1");break;case j:q.preventDefault(),F.toolbar_left_click("header2");break;case T:q.preventDefault(),F.toolbar_left_click("header3");break;case A:q.preventDefault(),F.toolbar_left_click("header4");break;case D:q.preventDefault(),F.toolbar_left_click("header5");break;case z:q.preventDefault(),F.toolbar_left_click("header6");break;case B:q.preventDefault(),F.toolbar_left_click("header1");break;case N:q.preventDefault(),F.toolbar_left_click("header2");break;case R:q.preventDefault(),F.toolbar_left_click("header3");break;case U:q.preventDefault(),F.toolbar_left_click("header4");break;case H:q.preventDefault(),F.toolbar_left_click("header5");break;case W:q.preventDefault(),F.toolbar_left_click("header6")}else switch(q.keyCode){case e:F.toolbars.navigation&&(q.preventDefault(),F.toolbar_right_click("navigation"));break;case t:F.toolbars.preview&&(q.preventDefault(),F.toolbar_right_click("preview"));break;case n:F.toolbars.fullscreen&&(q.preventDefault(),F.toolbar_right_click("fullscreen"));break;case r:F.toolbars.readmodel&&(q.preventDefault(),F.toolbar_right_click("read"));break;case l:F.toolbars.subfield&&(q.preventDefault(),F.toolbar_right_click("subfield"));break;case S:F.$refs.toolbar_left.s_img_link_open||(q.preventDefault(),F.insertTab());break;case O:F.$refs.toolbar_left.s_img_link_open?(q.preventDefault(),F.$refs.toolbar_left.$imgLinkAdd()):F.insertEnter(q)}})}},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0}),_.default={agate:1,androidstudio:1,"arduino-light":1,arta:1,ascetic:1,"atom-one-dark":1,"atom-one-light":1,"brown-paper":1,"codepen-embed":1,"color-brewer":1,dark:1,default:1,docco:1,far:1,foundation:1,github:1,googlecode:1,grayscale:1,hybrid:1,idea:1,"ir-black":1,magula:1,"mono-blue":1,"monokai-sublime":1,monokai:1,obsidian:1,"paraiso-dark":1,"paraiso-light":1,pojoaque:1,purebasic:1,rainbow:1,routeros:1,"school-book":1,sunburst:1,"tomorrow-night-blue":1,"tomorrow-night-bright":1,vs:1,vs2015:1,xcode:1,xt256:1,"a11y-dark":1,"a11y-light":1,"an-old-hope":1,"atom-one-dark-reasonable":1,"brown-pap":1,devibeans:1,"github-dark":1,"github-dark-dimmed":1,gml:1,"gradient-dark":1,"gradient-light":1,"isbl-editor-dark":1,"isbl-editor-light":1,"kimbie-dark":1,"kimbie-light":1,lightfair:1,lioshi:1,"night-owl":1,"nnfx-dark":1,"nnfx-light":1,nord:1,pojo:1,"qtcreator-dark":1,"qtcreator-light":1,"shades-of-purple":1,srcery:1,"stackoverflow-dark":1,"stackoverflow-light":1}},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0});var e,t=a(25),n=(e=t)&&e.__esModule?e:{default:e};_.p_ObjectCopy_DEEP=function r(l,i){for(var c in i){var s=(0,n.default)(i[c]);!l[c]||s!=="Object"&&s!=="object"?l[c]=i[c]:l[c]=r(l[c],i[c])}return l},_.p_urlParse=function(){var r=window.location.search,l={},i=r.match(/[?&][^?&]+=[^?&]+/g);return i&&i.forEach(function(c){var s=c.substring(1).split("="),o=decodeURIComponent(s[0]),u=decodeURIComponent(s[1]);l[o]=u}),l},_.stopEvent=function(r){r&&(r.preventDefault&&r.preventDefault(),r.stopPropagation&&r.stopPropagation())}},function(d,_,a){function e(o){o.d_history_index>0&&o.d_history_index--,o.$nextTick(function(){var u=o.textarea_selectionEnds[o.d_history_index];o.getTextareaDom().selectionStart=u,o.getTextareaDom().selectionEnd=u}),o.getTextareaDom().focus()}function t(o){o.d_history_index<o.d_history.length-1&&o.d_history_index++,o.$nextTick(function(){var u=o.textarea_selectionEnds[o.d_history_index];o.getTextareaDom().selectionStart=u,o.getTextareaDom().selectionEnd=u}),o.getTextareaDom().focus()}function n(o){o.d_value="",o.getTextareaDom().focus()}function r(o){o.save(o.d_value,o.d_render)}function l(o){o.insertOl()}function i(o){o.insertUl()}function c(o){o.removeLine()}function s(o){o.insertCodeBlock()}Object.defineProperty(_,"__esModule",{value:!0}),_.toolbar_left_addlink=function(o,u,f,p){var m={prefix:o==="link"?"["+u+"](":"!["+u+"](",subfix:")",str:f};p.insertText(p.getTextareaDom(),m)},_.toolbar_left_click=function(o,u){var f={bold:{prefix:"**",subfix:"**",str:u.d_words.tl_bold},italic:{prefix:"*",subfix:"*",str:u.d_words.tl_italic},header:{prefix:"# ",subfix:"",str:u.d_words.tl_header},header1:{prefix:"# ",subfix:"",str:u.d_words.tl_header_one},header2:{prefix:"## ",subfix:"",str:u.d_words.tl_header_two},header3:{prefix:"### ",subfix:"",str:u.d_words.tl_header_three},header4:{prefix:"#### ",subfix:"",str:u.d_words.tl_header_four},header5:{prefix:"##### ",subfix:"",str:u.d_words.tl_header_five},header6:{prefix:"###### ",subfix:"",str:u.d_words.tl_header_six},underline:{prefix:"++",subfix:"++",str:u.d_words.tl_underline},strikethrough:{prefix:"~~",subfix:"~~",str:u.d_words.tl_strikethrough},mark:{prefix:"==",subfix:"==",str:u.d_words.tl_mark},superscript:{prefix:"^",subfix:"^",str:u.d_words.tl_superscript},subscript:{prefix:"~",subfix:"~",str:u.d_words.tl_subscript},quote:{prefix:"> ",subfix:"",str:u.d_words.tl_quote},link:{prefix:"[](",subfix:")",str:u.d_words.tl_link},imagelink:{prefix:"![](",subfix:")",str:u.d_words.tl_image},table:{prefix:"",subfix:"",str:`|column1|column2|column3|
|-|-|-|
|content1|content2|content3|
`},aligncenter:{prefix:`::: hljs-center

`,subfix:`

:::
`,str:u.d_words.tl_aligncenter},alignright:{prefix:`::: hljs-right

`,subfix:`

:::
`,str:u.d_words.tl_alignright},alignleft:{prefix:`::: hljs-left

`,subfix:`

:::
`,str:u.d_words.tl_alignleft}};f.hasOwnProperty(o)&&u.insertText(u.getTextareaDom(),f[o]);var p={undo:e,redo:t,trash:n,save:r,ol:l,ul:i,removeLine:c,code:s};p.hasOwnProperty(o)&&p[o](u)}},function(d,_,a){function e(s){s.s_html_code=!s.s_html_code,s.htmlcode&&s.htmlcode(s.s_html_code,s.d_value)}function t(s){s.s_help=!s.s_help,s.helptoggle&&s.helptoggle(s.s_help,s.d_value)}function n(s){var o=s.$refs.vReadModel;o.requestFullscreen?o.requestFullscreen():o.mozRequestFullScreen?o.mozRequestFullScreen():o.webkitRequestFullscreen?o.webkitRequestFullscreen():o.msRequestFullscreen&&o.msRequestFullscreen()}function r(s){s.s_preview_switch=!s.s_preview_switch,s.previewtoggle&&s.previewtoggle(s.s_preview_switch,s.d_value)}function l(s){s.s_fullScreen=!s.s_fullScreen,s.fullscreen&&s.fullscreen(s.s_fullScreen,s.d_value)}function i(s){s.s_subfield=!s.s_subfield,s.s_preview_switch=s.s_subfield,s.previewtoggle&&s.previewtoggle(s.s_preview_switch,s.d_value),s.subfieldtoggle&&s.subfieldtoggle(s.s_subfield,s.d_value)}function c(s){s.s_navigation=!s.s_navigation,s.s_navigation&&(s.s_preview_switch=!0),s.navigationtoggle&&s.navigationtoggle(s.s_navigation,s.d_value),s.s_navigation&&s.getNavigation(s,!1)}Object.defineProperty(_,"__esModule",{value:!0}),_.toolbar_right_click=function(s,o){var u={help:t,html:e,read:n,preview:r,fullscreen:l,navigation:c,subfield:i};u.hasOwnProperty(s)&&u[s](o)}},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0}),_.CONFIG=void 0;var e=k(a(116)),t=k(a(117)),n=k(a(118)),r=k(a(119)),l=k(a(120)),i=k(a(121)),c=k(a(122)),s=k(a(123)),o=(k(a(124)),k(a(125))),u=k(a(126)),f=k(a(127)),p=k(a(128)),m=k(a(129)),g=k(a(130)),b=k(a(131)),w=k(a(132)),y=k(a(133));function k(v){return v&&v.__esModule?v:{default:v}}_.CONFIG={"help_zh-CN":e.default,"help_zh-TW":t.default,"help_pt-BR":l.default,help_en:n.default,help_fr:r.default,help_ru:i.default,help_de:c.default,help_ja:s.default,"words_zh-CN":o.default,"words_zh-TW":u.default,"words_pt-BR":m.default,words_en:f.default,words_fr:p.default,words_ru:g.default,words_de:b.default,words_ja:w.default,words_kr:y.default,langList:["en","zh-CN","zh-TW","fr","pt-BR","ru","de","ja","kr"],toolbars:{bold:!0,italic:!0,header:!0,underline:!0,strikethrough:!0,mark:!0,superscript:!0,subscript:!0,quote:!0,ol:!0,ul:!0,link:!0,imagelink:!0,code:!0,table:!0,undo:!0,redo:!0,trash:!0,save:!0,alignleft:!0,aligncenter:!0,alignright:!0,navigation:!0,subfield:!0,fullscreen:!0,readmodel:!0,htmlcode:!0,help:!0,preview:!0}}},function(d,_){d.exports=`@[toc](目录)\r
\r
Markdown 语法简介\r
=============\r
> [语法详解](http://commonmark.org/help/)\r
\r
## **目录**\r
\`\`\`\r
@[toc](目录)\r
\`\`\`\r
\r
## **粗体**\r
\`\`\`\r
**粗体**\r
__粗体__\r
\`\`\`\r
## *斜体*\r
\`\`\`\r
*斜体*\r
_斜体_\r
\`\`\`\r
## 标题\r
\`\`\`\r
# 一级标题 #\r
一级标题\r
====\r
## 二级标题 ##\r
二级标题\r
----\r
### 三级标题 ###\r
#### 四级标题 ####\r
##### 五级标题 #####\r
###### 六级标题 ######\r
\`\`\`\r
## 分割线\r
\`\`\`\r
***\r
---\r
\`\`\`\r
****\r
## ^上^角~下~标\r
\`\`\`\r
上角标 x^2^\r
下角标 H~2~0\r
\`\`\`\r
## ++下划线++ ~~中划线~~\r
\`\`\`\r
++下划线++\r
~~中划线~~\r
\`\`\`\r
## ==标记==\r
\`\`\`\r
==标记==\r
\`\`\`\r
## 段落引用\r
\`\`\`\r
> 一级\r
>> 二级\r
>>> 三级\r
...\r
\`\`\`\r
\r
## 列表\r
\`\`\`\r
有序列表\r
1.\r
2.\r
3.\r
...\r
无序列表\r
-\r
-\r
...\r
\`\`\`\r
\r
## 任务列表\r
\r
- [x] 已完成任务\r
- [ ] 未完成任务\r
\r
\`\`\`\r
- [x] 已完成任务\r
- [ ] 未完成任务\r
\`\`\`\r
\r
## 链接\r
\`\`\`\r
[链接](www.baidu.com)\r
![图片描述](http://www.image.com)\r
\`\`\`\r
## 代码段落\r
\\\`\`\` type\r
\r
代码段落\r
\r
\\\`\`\`\r
\r
\\\` 代码块 \\\`\r
\r
\`\`\`c++\r
int main()\r
{\r
    printf("hello world!");\r
}\r
\`\`\`\r
\`code\`\r
## 表格(table)\r
\`\`\`\r
| 标题1 | 标题2 | 标题3 |\r
| :--  | :--: | ----: |\r
| 左对齐 | 居中 | 右对齐 |\r
| ---------------------- | ------------- | ----------------- |\r
\`\`\`\r
| 标题1 | 标题2 | 标题3 |\r
| :--  | :--: | ----: |\r
| 左对齐 | 居中 | 右对齐 |\r
| ---------------------- | ------------- | ----------------- |\r
## 脚注(footnote)\r
\`\`\`\r
hello[^hello]\r
\`\`\`\r
\r
见底部脚注[^hello]\r
\r
[^hello]: 一个注脚\r
\r
## 表情(emoji)\r
[参考网站: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\r
\`\`\`\r
:laughing:\r
:blush:\r
:smiley:\r
:)\r
...\r
\`\`\`\r
:laughing::blush::smiley::)\r
\r
## $\\KaTeX$公式\r
\r
我们可以渲染公式例如：$x_i + y_i = z_i$和$\\sum_{i=1}^n a_i=0$\r
我们也可以单行渲染\r
$$\\sum_{i=1}^n a_i=0$$\r
具体可参照[katex文档](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex支持的函数](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex文档](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\r
\r
## 布局\r
\r
::: hljs-left\r
\`::: hljs-left\`\r
\`居左\`\r
\`:::\`\r
:::\r
\r
::: hljs-center\r
\`::: hljs-center\`\r
\`居中\`\r
\`:::\`\r
:::\r
\r
::: hljs-right\r
\`::: hljs-right\`\r
\`居右\`\r
\`:::\`\r
:::\r
\r
## 定义\r
\r
术语一\r
\r
:   定义一\r
\r
包含有*行内标记*的术语二\r
\r
:   定义二\r
\r
        {一些定义二的文字或代码}\r
\r
    定义二的第三段\r
\r
\`\`\`\r
术语一\r
\r
:   定义一\r
\r
包含有*行内标记*的术语二\r
\r
:   定义二\r
\r
        {一些定义二的文字或代码}\r
\r
    定义二的第三段\r
\r
\`\`\`\r
\r
## abbr\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
HTML 规范由 W3C 维护\r
\`\`\`\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
HTML 规范由 W3C 维护\r
\`\`\`\r
\r
`},function(d,_){d.exports=`@[toc](目錄)\r
\r
Markdown 語法簡介\r
=============\r
> [語法詳解](http://commonmark.org/help/)\r
\r
## **粗體**\r
\`\`\`\r
**粗體**\r
__粗體__\r
\`\`\`\r
## *斜體*\r
\`\`\`\r
*斜體*\r
_斜體_\r
\`\`\`\r
## 標題\r
\`\`\`\r
# 一級標題 #\r
一級標題\r
====\r
## 二級標題 ##\r
二級標題\r
----\r
### 三級標題 ###\r
#### 四級標題 ####\r
##### 五級標題 #####\r
###### 六級標題 ######\r
\`\`\`\r
## 分割線\r
\`\`\`\r
***\r
---\r
\`\`\`\r
****\r
## ^上^角~下~標\r
\`\`\`\r
上角標 x^2^\r
下角標 H~2~0\r
\`\`\`\r
## ++下劃線++ ~~中劃線~~\r
\`\`\`\r
++下劃線++\r
~~中劃線~~\r
\`\`\`\r
## ==標記==\r
\`\`\`\r
==標記==\r
\`\`\`\r
## 段落引用\r
\`\`\`\r
> 一級\r
>> 二級\r
>>> 三級\r
...\r
\`\`\`\r
\r
## 列表\r
\`\`\`\r
有序列表\r
1.\r
2.\r
3.\r
...\r
無序列表\r
-\r
-\r
...\r
\`\`\`\r
\r
## 任務列表\r
\r
- [x] 已完成任務\r
- [ ] 未完成任務\r
\r
\`\`\`\r
- [x] 已完成任務\r
- [ ] 未完成任務\r
\`\`\`\r
\r
## 鏈接\r
\`\`\`\r
[鏈接](www.baidu.com)\r
![圖片描述](http://www.image.com)\r
\`\`\`\r
## 代碼段落\r
\\\`\`\` type\r
\r
代碼段落\r
\r
\\\`\`\`\r
\r
\\\` 代碼塊 \\\`\r
\r
\`\`\`c++\r
int main()\r
{\r
    printf("hello world!");\r
}\r
\`\`\`\r
\`code\`\r
## 表格(table)\r
\`\`\`\r
| 標題1 | 標題2 | 標題3 |\r
| :--  | :--: | ----: |\r
| 左對齊 | 居中 | 右對齊 |\r
| ---------------------- | ------------- | ----------------- |\r
\`\`\`\r
| 標題1 | 標題2 | 標題3 |\r
| :--  | :--: | ----: |\r
| 左對齊 | 居中 | 右對齊 |\r
| ---------------------- | ------------- | ----------------- |\r
## 腳註(footnote)\r
\`\`\`\r
hello[^hello]\r
\`\`\`\r
\r
見底部腳註[^hello]\r
\r
[^hello]: 一個註腳\r
\r
## 表情(emoji)\r
[參考網站: https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\r
\`\`\`\r
:laughing:\r
:blush:\r
:smiley:\r
:)\r
...\r
\`\`\`\r
:laughing::blush::smiley::)\r
\r
## $\\KaTeX$公式\r
\r
我們可以渲染公式例如：$x_i + y_i = z_i$和$\\sum_{i=1}^n a_i=0$\r
我們也可以單行渲染\r
$$\\sum_{i=1}^n a_i=0$$\r
具體可參照[katex文檔](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex支持的函數](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex文檔](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\r
\r
## 布局\r
\r
::: hljs-left\r
\`::: hljs-left\`\r
\`居左\`\r
\`:::\`\r
:::\r
\r
::: hljs-center\r
\`::: hljs-center\`\r
\`居中\`\r
\`:::\`\r
:::\r
\r
::: hljs-right\r
\`::: hljs-right\`\r
\`居右\`\r
\`:::\`\r
:::\r
\r
## 定義\r
\r
術語一\r
\r
:   定義一\r
\r
包含有*行內標記*的術語二\r
\r
:   定義二\r
\r
        {一些定義二的文字或代碼}\r
\r
    定義二的第三段\r
\r
\`\`\`\r
術語一\r
\r
:   定義一\r
\r
包含有*行內標記*的術語二\r
\r
:   定義二\r
\r
        {一些定義二的文字或代碼}\r
\r
    定義二的第三段\r
\r
\`\`\`\r
\r
## abbr\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
HTML 規範由 W3C 維護\r
\`\`\`\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
HTML 規範由 W3C 維護\r
\`\`\`\r
\r
`},function(d,_){d.exports=`@[toc](Catalog)\r
\r
Markdown Guide\r
===\r
> Detailed: [http://commonmark.org/help/](http://commonmark.org/help/)\r
\r
## **Bold**\r
\`\`\`\r
**bold**\r
__bold__\r
\`\`\`\r
## *Italic*\r
\`\`\`\r
*italic*\r
_italic_\r
\`\`\`\r
## Header\r
\`\`\`\r
# h1 #\r
h1\r
====\r
## h2 ##\r
h2\r
----\r
### h3 ###\r
#### h4 ####\r
##### h5 #####\r
###### h6 ######\r
\`\`\`\r
## Dividing line\r
\`\`\`\r
***\r
---\r
\`\`\`\r
****\r
## ^Super^script & ~Sub~script\r
\`\`\`\r
super x^2^\r
sub H~2~0\r
\`\`\`\r
## ++Underline++ & ~~Strikethrough~~\r
\`\`\`\r
++underline++\r
~~strikethrough~~\r
\`\`\`\r
## ==Mark==\r
\`\`\`\r
==mark==\r
\`\`\`\r
## Quote\r
\r
\`\`\`\r
> quote 1\r
>> quote 2\r
>>> quote 3\r
...\r
\`\`\`\r
\r
## List\r
\`\`\`\r
ol\r
1.\r
2.\r
3.\r
...\r
\r
ul\r
-\r
-\r
...\r
\`\`\`\r
\r
## Todo List\r
\r
- [x] task 1\r
- [ ] task 2\r
\r
\`\`\`\r
- [x] task 1\r
- [ ] task 2\r
\`\`\`\r
\r
## Link\r
\`\`\`\r
Text Link\r
[Text](www.baidu.com)\r
\r
Image Link\r
![Text](http://www.image.com)\r
\`\`\`\r
## Code\r
\\\`\`\` type\r
\r
code block\r
\r
\\\`\`\`\r
\r
\\\` code \\\`\r
\r
\`\`\`c++\r
int main()\r
{\r
    printf("hello world!");\r
}\r
\`\`\`\r
\`code\`\r
\r
## Table\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| left | center | right |\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| left | center | right |\r
| ---------------------- | ------------- | ----------------- |\r
## Footnote\r
\`\`\`\r
hello[^hello]\r
\`\`\`\r
\r
Look at the bottom[^hello]\r
\r
[^hello]: footnote\r
\r
## Emojis\r
Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\r
\`\`\`\r
:laughing:\r
:blush:\r
:smiley:\r
:)\r
...\r
\`\`\`\r
:laughing::blush::smiley::)\r
\r
## $\\KaTeX$ Mathematics\r
\r
We can render formulas for example：$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$\r
We can also single-line rendering\r
$$\\sum_{i=1}^n a_i=0$$\r
Detailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\r
\r
## Layout\r
\r
::: hljs-left\r
\`::: hljs-left\`\r
\`left\`\r
\`:::\`\r
:::\r
\r
::: hljs-center\r
\`::: hljs-center\`\r
\`center\`\r
\`:::\`\r
:::\r
\r
::: hljs-right\r
\`::: hljs-right\`\r
\`right\`\r
\`:::\`\r
:::\r
\r
## deflist\r
\r
Term 1\r
\r
:   Definition 1\r
\r
Term 2 with *inline markup*\r
\r
:   Definition 2\r
\r
        { some code, part of Definition 2 }\r
\r
    Third paragraph of definition 2.\r
\r
\`\`\`\r
Term 1\r
\r
:   Definition 1\r
\r
Term 2 with *inline markup*\r
\r
:   Definition 2\r
\r
        { some code, part of Definition 2 }\r
\r
    Third paragraph of definition 2.\r
\r
\`\`\`\r
\r
## abbr\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
The HTML specification\r
is maintained by the W3C.\r
\`\`\`\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
The HTML specification\r
is maintained by the W3C.\r
\`\`\`\r
`},function(d,_){d.exports=`@[toc](Catalogue)\r
\r
Guide Markdown\r
==============\r
> Détail : [http://commonmark.org/help/](http://commonmark.org/help/)\r
\r
## **Bold**\r
\`\`\`\r
**bold**\r
__bold__\r
\`\`\`\r
## *Italic*\r
\`\`\`\r
*italic*\r
_italic_\r
\`\`\`\r
## Header\r
\`\`\`\r
# h1 #\r
h1\r
====\r
## h2 ##\r
h2\r
----\r
### h3 ###\r
#### h4 ####\r
##### h5 #####\r
###### h6 ######\r
\`\`\`\r
## Dividing line\r
\`\`\`\r
***\r
---\r
\`\`\`\r
****\r
## ^Super^script & ~Sub~script\r
\`\`\`\r
super x^2^\r
sub H~2~0\r
\`\`\`\r
## ++Underline++ & ~~Strikethrough~~\r
\`\`\`\r
++underline++\r
~~strikethrough~~\r
\`\`\`\r
## ==Mark==\r
\`\`\`\r
==mark==\r
\`\`\`\r
## Quote\r
\r
\`\`\`\r
> quote 1\r
>> quote 2\r
>>> quote 3\r
...\r
\`\`\`\r
\r
## List\r
\`\`\`\r
ol\r
1.\r
2.\r
3.\r
...\r
\r
ul\r
-\r
-\r
...\r
\`\`\`\r
## Link\r
\r
## Todo List\r
\r
- [x] Équipe 1\r
- [ ] Équipe 2\r
\r
\`\`\`\r
- [x] Équipe 1\r
- [ ] Équipe 2\r
\`\`\`\r
\r
\`\`\`\r
Text Link\r
[Text](www.baidu.com)\r
\r
Image Link\r
![Text](http://www.image.com)\r
\`\`\`\r
## Code\r
\\\`\`\` type\r
\r
code block\r
\r
\\\`\`\`\r
\r
\\\` code \\\`\r
\r
\`\`\`c++\r
int main()\r
{\r
    printf("hello world!");\r
}\r
\`\`\`\r
\`code\`\r
\r
## Table\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| left | center | right |\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| left | center | right |\r
| ---------------------- | ------------- | ----------------- |\r
## Footnote\r
\`\`\`\r
hello[^hello]\r
\`\`\`\r
\r
Look at the bottom[^hello]\r
\r
[^hello]: footnote\r
\r
## Emojis\r
Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\r
\`\`\`\r
:laughing:\r
:blush:\r
:smiley:\r
:)\r
...\r
\`\`\`\r
:laughing::blush::smiley::)\r
\r
## $\\KaTeX$ Mathematics\r
\r
We can render formulas for example：$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$\r
We can also single-line rendering\r
$$\\sum_{i=1}^n a_i=0$$\r
Detailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\r
\r
## Layout\r
\r
::: hljs-left\r
\`::: hljs-left\`\r
\`left\`\r
\`:::\`\r
:::\r
\r
::: hljs-center\r
\`::: hljs-center\`\r
\`center\`\r
\`:::\`\r
:::\r
\r
::: hljs-right\r
\`::: hljs-right\`\r
\`right\`\r
\`:::\`\r
:::\r
\r
## deflist\r
\r
Term 1\r
\r
:   Definition 1\r
\r
Term 2 with *inline markup*\r
\r
:   Definition 2\r
\r
        { some code, part of Definition 2 }\r
\r
    Third paragraph of definition 2.\r
\r
\`\`\`\r
Term 1\r
\r
:   Definition 1\r
\r
Term 2 with *inline markup*\r
\r
:   Definition 2\r
\r
        { some code, part of Definition 2 }\r
\r
    Third paragraph of definition 2.\r
\r
\`\`\`\r
\r
## abbr\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
The HTML specification\r
is maintained by the W3C.\r
\`\`\`\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
The HTML specification\r
is maintained by the W3C.\r
\`\`\`\r
`},function(d,_){d.exports=`@[toc](Directory)\r
\r
Guia Markdown\r
===\r
> Detalhes: [http://commonmark.org/help/](http://commonmark.org/help/)\r
\r
## **Negrito**\r
\`\`\`\r
**negrito**\r
__negrito__\r
\`\`\`\r
## *Itálico*\r
\`\`\`\r
*itálico*\r
_itálico_\r
\`\`\`\r
## Cabeçalho\r
\`\`\`\r
# h1 #\r
h1\r
====\r
## h2 ##\r
h2\r
----\r
### h3 ###\r
#### h4 ####\r
##### h5 #####\r
###### h6 ######\r
\`\`\`\r
## Linha Divisora\r
\`\`\`\r
***\r
---\r
\`\`\`\r
****\r
## ^Sobre^scrito & ~Sub~scrito\r
\`\`\`\r
sobre x^2^\r
sub H~2~0\r
\`\`\`\r
## ++Sublinhar++ & ~~Tachar~~\r
\`\`\`\r
++sublinhar++\r
~~tachar~~\r
\`\`\`\r
## ==Marcador==\r
\`\`\`\r
==marcador==\r
\`\`\`\r
## Citação\r
\r
\`\`\`\r
> citação 1\r
>> citação 2\r
>>> citação 3\r
...\r
\`\`\`\r
\r
## Listas\r
\`\`\`\r
lista Numerada\r
1.\r
2.\r
3.\r
...\r
\r
lista com marcadores\r
-\r
-\r
...\r
\`\`\`\r
\r
## Todo Listas\r
\r
- [x] Tarefa 1\r
- [ ] Tarefa 2\r
\r
\`\`\`\r
- [x] Tarefa 1\r
- [ ] Tarefa 2\r
\`\`\`\r
\r
## Link\r
\`\`\`\r
Link Texto\r
[Text](www.baidu.com)\r
\r
Link Imagem\r
![Text](http://www.image.com)\r
\`\`\`\r
## Código\r
\\\`\`\` tipo\r
\r
bloco de código\r
\r
\\\`\`\`\r
\r
\\\` código \\\`\r
\r
\`\`\`c++\r
int main()\r
{\r
    printf("hello world!");\r
}\r
\`\`\`\r
\`code\`\r
\r
## Tabela\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| esquerda | centro | direita |\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| esquerda | centro | direita |\r
| ---------------------- | ------------- | ----------------- |\r
## Rodapé\r
\`\`\`\r
olá[^olá]\r
\`\`\`\r
\r
Olhe para baixo[^olá]\r
\r
[^olá]: rodapé\r
\r
## Emojis\r
Detalhes: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\r
\`\`\`\r
:laughing:\r
:blush:\r
:smiley:\r
:)\r
...\r
\`\`\`\r
:laughing::blush::smiley::)\r
\r
## $\\KaTeX$ Mathematics\r
\r
Podemos mostrar fórmulas por exemplo：$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$\r
Podemos também mostrar em uma única linha:\r
$$\\sum_{i=1}^n a_i=0$$\r
Detalhes: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\r
\r
## Layout\r
\r
::: hljs-left\r
\`::: hljs-left\`\r
\`esquerda\`\r
\`:::\`\r
:::\r
\r
::: hljs-center\r
\`::: hljs-center\`\r
\`centro\`\r
\`:::\`\r
:::\r
\r
::: hljs-right\r
\`::: hljs-right\`\r
\`direita\`\r
\`:::\`\r
:::\r
\r
## Definições\r
\r
Termo 1\r
\r
:   Definição 1\r
\r
Termo 2 com *markup inline*\r
\r
:   Definição 2\r
\r
        { um pouco de código, parte da Definição 2 }\r
\r
    Terceiro parágrafo da definição 2.\r
\r
\`\`\`\r
Termo 1\r
\r
:   Definição 1\r
\r
Termo 2 com *markup inline*\r
\r
:   Definição 2\r
\r
        { um pouco de código, parte da Definição 2 }\r
\r
    Terceiro parágrafo da definição 2.\r
\r
\`\`\`\r
\r
## Abreviações\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
A especificação HTML\r
é mantida pela W3C.\r
\`\`\`\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
The HTML specification\r
é mantida pela W3C.\r
\`\`\`\r
`},function(d,_){d.exports=`@[toc](Catalog)  \r
  \r
Markdown помощь  \r
===  \r
> Подробнее: [http://commonmark.org/help/](http://commonmark.org/help/)  \r
  \r
## **Полужирный**  \r
\`\`\`  \r
**Полужирный**  \r
__Полужирный__  \r
\`\`\`  \r
## *Курсив*  \r
\`\`\`  \r
*Курсив*  \r
_Курсив_  \r
\`\`\`  \r
## Заголовок  \r
\`\`\`  \r
# h1 #  \r
h1  \r
====  \r
## h2 ##  \r
h2  \r
----  \r
### h3 ###  \r
#### h4 ####  \r
##### h5 #####  \r
###### h6 ######  \r
\`\`\`  \r
## Разделительная линия  \r
\`\`\`  \r
***  \r
---  \r
\`\`\`  \r
****  \r
## ^Верхний^индекс & ~Нижний~индекс  \r
\`\`\`  \r
верхний x^2^  \r
нижний H~2~0  \r
\`\`\`  \r
## ++Подчеркнутый++ & ~~Зачеркнутый~~  \r
\`\`\`  \r
++Подчеркнутый++  \r
~~Зачеркнутый~~  \r
\`\`\`  \r
## ==Отметка==  \r
\`\`\`  \r
==Отметка==  \r
\`\`\`  \r
## Цитата  \r
  \r
\`\`\`  \r
> Цитата  \r
>> Цитата 2  \r
>>> Цитата 3  \r
...  \r
\`\`\`  \r
  \r
## Список  \r
\`\`\`  \r
ol  \r
1.  \r
2.  \r
3.  \r
...  \r
  \r
ul  \r
-  \r
-  \r
...  \r
\`\`\`  \r
  \r
## Список задач  \r
  \r
- [x] Задача 1  \r
- [ ] Задача 2  \r
  \r
\`\`\`  \r
- [x] Задача 1  \r
- [ ] Задача 2  \r
\`\`\`  \r
  \r
## Ссылка  \r
\`\`\`  \r
Ссылка  \r
[Текст](www.baidu.com)  \r
  \r
Ссылка изображения  \r
![Текст](http://www.image.com)  \r
\`\`\`  \r
## Код  \r
\\\`\`\` type  \r
  \r
code block  \r
  \r
\\\`\`\`  \r
  \r
\\\` code \\\`  \r
  \r
\`\`\`c++  \r
int main()  \r
{  \r
 printf("hello world!");}  \r
\`\`\`  \r
\`code\`  \r
  \r
## Таблица  \r
\`\`\`  \r
| th1 | th2 | th3 |  \r
| :--  | :--: | ----: |  \r
| left | center | right |  \r
\`\`\`  \r
| th1 | th2 | th3 |  \r
| :--  | :--: | ----: |  \r
| left | center | right |  \r
| ---------------------- | ------------- | ----------------- |  \r
## Сноска  \r
\`\`\`  \r
Привет[^Привет]  \r
\`\`\`  \r
  \r
Тут что-то непонятное[^Привет]  \r
  \r
[^Привет]: А тут объяснение  \r
  \r
## Emojis  \r
Подробнее: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)  \r
\`\`\`  \r
:laughing:  \r
:blush:  \r
:smiley:  \r
:)  \r
...  \r
\`\`\`  \r
:laughing::blush::smiley::)  \r
  \r
## $\\KaTeX$ Mathematics  \r
  \r
Можно выводить такие формулы：$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$  \r
А также в одну строку:\r
$$\\sum_{i=1}^n a_i=0$$  \r
Подробнее: \r
- [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)\r
- [katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)\r
- [latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)  \r
  \r
## Разметка\r
  \r
::: hljs-left  \r
\`::: hljs-left\`  \r
\`left\`  \r
\`:::\`  \r
:::  \r
  \r
::: hljs-center  \r
\`::: hljs-center\`  \r
\`center\`  \r
\`:::\`  \r
:::  \r
  \r
::: hljs-right  \r
\`::: hljs-right\`  \r
\`right\`  \r
\`:::\`  \r
:::  \r
  \r
## Список определений\r
  \r
Термин 1  \r
  \r
:   Определение 1  \r
  \r
Термин  2 с использованием *разметки*\r
  \r
:   Определение 2  \r
  \r
 { Какой-нибудь код, часть определения 2 }  \r
 Третий параграф определения 2.  \r
\`\`\`  \r
Термин 1  \r
  \r
:   Определение 1  \r
  \r
Термин  2 с использованием *разметки*\r
  \r
:   Определение 2  \r
  \r
 { Какой-нибудь код, часть определения 2 }  \r
 Третий параграф определения 2.  \r
\`\`\`  \r
  \r
## Сокращения\r
*[HTML]: Hyper Text Markup Language  \r
*[W3C]:  World Wide Web Consortium  \r
The HTML specification  \r
is maintained by the W3C.  \r
\`\`\`  \r
*[HTML]: Hyper Text Markup Language  \r
*[W3C]:  World Wide Web Consortium  \r
The HTML specification  \r
is maintained by the W3C.  \r
\`\`\`\r
`},function(d,_){d.exports=`@[toc](Catalog)\r
\r
Markdown Handbuch\r
===\r
> Details: [http://commonmark.org/help/](http://commonmark.org/help/)\r
\r
## **Fett**\r
\`\`\`\r
**fett**\r
__fett__\r
\`\`\`\r
## *Kursiv*\r
\`\`\`\r
*kursiv*\r
_kursiv_\r
\`\`\`\r
## Überschriften\r
\`\`\`\r
# h1 #\r
h1\r
====\r
## h2 ##\r
h2\r
----\r
### h3 ###\r
#### h4 ####\r
##### h5 #####\r
###### h6 ######\r
\`\`\`\r
## Trennlinien\r
\`\`\`\r
***\r
---\r
\`\`\`\r
****\r
## ^Hoch^gestellt & ~Tief~gestellt\r
\`\`\`\r
hochgestellt x^2^\r
tiefgestellt H~2~0\r
\`\`\`\r
## ++Unterstrichen++ & ~~Durchgestrichen~~\r
\`\`\`\r
++unterstrichen++\r
~~durchgestrichen~~\r
\`\`\`\r
## ==Markiert==\r
\`\`\`\r
==markiert==\r
\`\`\`\r
## Zitat\r
\r
\`\`\`\r
> zitat 1\r
>> zitat 2\r
>>> zitat 3\r
...\r
\`\`\`\r
\r
## Liste\r
\`\`\`\r
ol\r
1.\r
2.\r
3.\r
...\r
\r
ul\r
-\r
-\r
...\r
\`\`\`\r
\r
## Todo Liste\r
\r
- [x] aufgabe 1\r
- [ ] aufgabe 2\r
\r
\`\`\`\r
- [x] aufgabe 1\r
- [ ] aufgabe 2\r
\`\`\`\r
\r
## Link\r
\`\`\`\r
Text Link\r
[Text](www.baidu.com)\r
\r
Link mit Bild\r
![Text](http://www.image.com)\r
\`\`\`\r
## Code\r
\\\`\`\` Typ\r
\r
Codeblock\r
\r
\\\`\`\`\r
\r
\\\` code \\\`\r
\r
\`\`\`c++\r
int main()\r
{\r
    printf("hello world!");\r
}\r
\`\`\`\r
\`code\`\r
\r
## Tabelle\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| links | mitte | rechts |\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| links | mitte | rechts |\r
| ---------------------- | ------------- | ----------------- |\r
## Fußnote\r
\`\`\`\r
hallo[^hallo]\r
\`\`\`\r
\r
Schau zum unteren Rand[^hallo]\r
\r
[^hallo]: fussnote\r
\r
## Emojis\r
Details: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\r
\`\`\`\r
:laughing:\r
:blush:\r
:smiley:\r
:)\r
...\r
\`\`\`\r
:laughing::blush::smiley::)\r
\r
## $\\KaTeX$ Mathematik\r
\r
Formeln lassen sich darstellen z.b. ：$x_i + y_i = z_i$ und $\\sum_{i=1}^n a_i=0$\r
Formeln können auf einer eigenen Zeile gerendert werden\r
$$\\sum_{i=1}^n a_i=0$$\r
Details: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php)和[katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)以及[latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\r
\r
## Layout\r
\r
::: hljs-left\r
\`::: hljs-left\`\r
\`links\`\r
\`:::\`\r
:::\r
\r
::: hljs-center\r
\`::: hljs-center\`\r
\`mitte\`\r
\`:::\`\r
:::\r
\r
::: hljs-right\r
\`::: hljs-right\`\r
\`rechts\`\r
\`:::\`\r
:::\r
\r
## Liste von Definitionen\r
\r
Term 1\r
\r
:   Definition 1\r
\r
Term 2 mit *inline markup*\r
\r
:   Definition 2\r
\r
        { ein wenig code, teil von Definition 2 }\r
\r
    Dritter Absatz von Definition 2.\r
\r
\`\`\`\r
Term 1\r
\r
:   Definition 1\r
\r
Term 2 mit *inline markup*\r
\r
:   Definition 2\r
\r
        { ein wenig code, teil von Definition 2 }\r
\r
    Dritter Absatz von Definition 2.\r
\r
\`\`\`\r
\r
## Abkürzungen\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
Die HTML Spezifikation\r
wird gepflegt vom W3C.\r
\`\`\`\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
Die HTML Spezifikation\r
wird gepflegt vom W3C.\r
\`\`\`\r
`},function(d,_){d.exports=`@[toc](目次)\r
\r
Markdown 文法ガイド\r
===\r
> Detailed: [http://commonmark.org/help/](http://commonmark.org/help/)\r
\r
## **太字**\r
\`\`\`\r
**太字**\r
__太字__\r
\`\`\`\r
## *斜体*\r
\`\`\`\r
*斜体*\r
_斜体_\r
\`\`\`\r
## 見出し\r
\`\`\`\r
# h1 #\r
h1\r
====\r
## h2 ##\r
h2\r
----\r
### h3 ###\r
#### h4 ####\r
##### h5 #####\r
###### h6 ######\r
\`\`\`\r
## 横線\r
\`\`\`\r
***\r
---\r
\`\`\`\r
****\r
## ^上付き^文字 & ~下付き~文字\r
\`\`\`\r
super x^2^\r
sub H~2~0\r
\`\`\`\r
## ++下線++ & ~~取り消し線~~\r
\`\`\`\r
++underline++\r
~~strikethrough~~\r
\`\`\`\r
## ==蛍光ペン==\r
\`\`\`\r
==mark==\r
\`\`\`\r
## 引用\r
\r
\`\`\`\r
> quote 1\r
>> quote 2\r
>>> quote 3\r
...\r
\`\`\`\r
\r
## リスト\r
\`\`\`\r
番号付きリスト\r
1.\r
2.\r
3.\r
...\r
\r
箇条書きリスト\r
-\r
-\r
...\r
\`\`\`\r
\r
## Todoリスト\r
\r
- [x] task 1\r
- [ ] task 2\r
\r
\`\`\`\r
- [x] task 1\r
- [ ] task 2\r
\`\`\`\r
\r
## リンク\r
\`\`\`\r
Text Link\r
[Text](www.baidu.com)\r
\r
Image Link\r
![Text](http://www.image.com)\r
\`\`\`\r
## コード\r
\\\`\`\` type\r
\r
code block\r
\r
\\\`\`\`\r
\r
\\\` code \\\`\r
\r
\`\`\`c++\r
int main()\r
{\r
    printf("hello world!");\r
}\r
\`\`\`\r
\`code\`\r
\r
## 表\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| left | center | right |\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| left | center | right |\r
| ---------------------- | ------------- | ----------------- |\r
\r
## 脚注\r
\`\`\`\r
hello[^hello]\r
\`\`\`\r
\r
Look at the bottom[^hello]\r
\r
[^hello]: footnote\r
\r
## 絵文字\r
> Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\r
\`\`\`\r
:laughing:\r
:blush:\r
:smiley:\r
:)\r
...\r
\`\`\`\r
:laughing::blush::smiley::)\r
\r
## $\\KaTeX$ 数式\r
> Detailed: [KaTeXマニュアル](http://www.intmath.com/cg5/katex-mathjax-comparison.php)、[KaTeX function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX)、[LaTeXマニュアル](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\r
\r
We can render formulas for example：$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$  \r
We can also single-line rendering\r
$$\\sum_{i=1}^n a_i=0$$\r
\r
## レイアウト\r
\r
::: hljs-left\r
\`::: hljs-left\`\r
\`left\`\r
\`:::\`\r
:::\r
\r
::: hljs-center\r
\`::: hljs-center\`\r
\`center\`\r
\`:::\`\r
:::\r
\r
::: hljs-right\r
\`::: hljs-right\`\r
\`right\`\r
\`:::\`\r
:::\r
\r
## 定義リスト\r
\r
Term 1\r
\r
:   Definition 1\r
\r
Term 2 with *inline markup*\r
\r
:   Definition 2\r
\r
        { some code, part of Definition 2 }\r
\r
    Third paragraph of definition 2.\r
\r
\`\`\`\r
Term 1\r
\r
:   Definition 1\r
\r
Term 2 with *inline markup*\r
\r
:   Definition 2\r
\r
        { some code, part of Definition 2 }\r
\r
    Third paragraph of definition 2.\r
\r
\`\`\`\r
\r
## abbr\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
The HTML specification\r
is maintained by the W3C.\r
\`\`\`\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
The HTML specification\r
is maintained by the W3C.\r
\`\`\`\r
`},function(d,_){d.exports=`@[toc](Catalog)\r
\r
\r
마크다운 가이드\r
===\r
> 자세히 보기: [http://commonmark.org/help/](http://commonmark.org/help/)\r
\r
## **볼드체(굵게)**\r
\`\`\`\r
**볼드체**\r
__볼드체__\r
\`\`\`\r
## *이탈릭체(기울임꼴)*\r
\`\`\`\r
*이탈릭체*\r
_이탈릭체_\r
\`\`\`\r
## 헤더\r
\`\`\`\r
# h1 #\r
h1\r
====\r
## h2 ##\r
h2\r
----\r
### h3 ###\r
#### h4 ####\r
##### h5 #####\r
###### h6 ######\r
\`\`\`\r
## 구분선\r
\`\`\`\r
***\r
---\r
\`\`\`\r
****\r
## ^위^첨자 & ~아래~첨자\r
\`\`\`\r
위첨자 x^2^\r
아래첨자 H~2~0\r
\`\`\`\r
## ++밑줄++ & ~~취소선~~\r
\`\`\`\r
++밑줄++\r
~~취소선~~\r
\`\`\`\r
## ==마커==\r
\`\`\`\r
==마커==\r
\`\`\`\r
## 인용\r
\r
\`\`\`\r
> quote 1\r
>> quote 2\r
>>> quote 3\r
...\r
\`\`\`\r
\r
## 리스트\r
\`\`\`\r
ol\r
1.\r
2.\r
3.\r
...\r
\r
ul\r
-\r
-\r
...\r
\`\`\`\r
\r
## 할일\r
\r
- [x] task 1\r
- [ ] task 2\r
\r
\`\`\`\r
- [x] task 1\r
- [ ] task 2\r
\`\`\`\r
\r
## 링크\r
\`\`\`\r
텍스트 링크\r
[Text](www.baidu.com)\r
\r
이미지 링크\r
![Text](http://www.image.com)\r
\`\`\`\r
## 코드블럭\r
\\\`\`\` type\r
\r
code block\r
\r
\\\`\`\`\r
\r
\\\` code \\\`\r
\r
\`\`\`c++\r
int main()\r
{\r
    printf("hello world!");\r
}\r
\`\`\`\r
\`code\`\r
\r
## 테이블\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| left | center | right |\r
\`\`\`\r
| th1 | th2 | th3 |\r
| :--  | :--: | ----: |\r
| left | center | right |\r
| ---------------------- | ------------- | ----------------- |\r
## Footnote\r
\`\`\`\r
hello[^hello]\r
\`\`\`\r
\r
Look at the bottom[^hello]\r
\r
[^hello]: footnote\r
\r
## 이모티콘\r
Detailed: [https://www.webpagefx.com/tools/emoji-cheat-sheet/](https://www.webpagefx.com/tools/emoji-cheat-sheet/)\r
\`\`\`\r
:laughing:\r
:blush:\r
:smiley:\r
:)\r
...\r
\`\`\`\r
:laughing::blush::smiley::)\r
\r
## $\\KaTeX$ 수학공식\r
\r
우리는 다음과 같이 함수를 만들 수 있습니다.：$x_i + y_i = z_i$ and $\\sum_{i=1}^n a_i=0$\r
단일 항으로도 가능합니다.\r
$$\\sum_{i=1}^n a_i=0$$\r
Detailed: [katex](http://www.intmath.com/cg5/katex-mathjax-comparison.php) and [katex function](https://github.com/Khan/KaTeX/wiki/Function-Support-in-KaTeX) and [latex](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)\r
\r
## 레이아웃\r
\r
::: hljs-left\r
\`::: hljs-left\`\r
\`left\`\r
\`:::\`\r
:::\r
\r
::: hljs-center\r
\`::: hljs-center\`\r
\`center\`\r
\`:::\`\r
:::\r
\r
::: hljs-right\r
\`::: hljs-right\`\r
\`right\`\r
\`:::\`\r
:::\r
\r
## deflist\r
\r
Term 1\r
\r
:   Definition 1\r
\r
Term 2 with *inline markup*\r
\r
:   Definition 2\r
\r
        { some code, part of Definition 2 }\r
\r
    Third paragraph of definition 2.\r
\r
\`\`\`\r
Term 1\r
\r
:   Definition 1\r
\r
Term 2 with *inline markup*\r
\r
:   Definition 2\r
\r
        { some code, part of Definition 2 }\r
\r
    Third paragraph of definition 2.\r
\r
\`\`\`\r
\r
## abbr\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
The HTML specification\r
is maintained by the W3C.\r
\`\`\`\r
*[HTML]: Hyper Text Markup Language\r
*[W3C]:  World Wide Web Consortium\r
The HTML specification\r
is maintained by the W3C.\r
\`\`\`\r
`},function(d){d.exports=JSON.parse('{"start_editor":"开始编辑...","navigation_title":"导航目录","tl_bold":"粗体","tl_italic":"斜体","tl_header":"标题","tl_header_one":"一级标题","tl_header_two":"二级标题","tl_header_three":"三级标题","tl_header_four":"四级标题","tl_header_five":"五级标题","tl_header_six":"六级标题","tl_underline":"下划线","tl_strikethrough":"中划线","tl_mark":"标记","tl_superscript":"上角标","tl_subscript":"下角标","tl_quote":"段落引用","tl_ol":"有序列表","tl_ul":"无序列表","tl_link":"链接","tl_image":"添加图片链接","tl_code":"代码块","tl_table":"表格","tl_undo":"上一步","tl_redo":"下一步","tl_trash":"清空","tl_save":"保存","tl_navigation_on":"开启标题导航","tl_navigation_off":"关闭标题导航","tl_preview":"预览","tl_aligncenter":"居中","tl_alignleft":"居左","tl_alignright":"居右","tl_edit":"编辑","tl_single_column":"单栏","tl_double_column":"双栏","tl_fullscreen_on":"全屏编辑","tl_fullscreen_off":"退出全屏","tl_read":"沉浸式阅读","tl_html_on":"查看html文本","tl_html_off":"返回markdown文本","tl_help":"markdown语法帮助","tl_upload":"上传图片","tl_upload_remove":"删除","tl_popup_link_title":"添加链接","tl_popup_link_text":"链接描述","tl_popup_link_addr":"链接地址","tl_popup_img_link_title":"添加图片","tl_popup_img_link_text":"图片描述","tl_popup_img_link_addr":"图片链接","tl_popup_link_sure":"确定","tl_popup_link_cancel":"取消"}')},function(d){d.exports=JSON.parse('{"start_editor":"開始編輯...","navigation_title":"導航目錄","tl_bold":"粗體","tl_italic":"斜體","tl_header":"標題","tl_header_one":"一級標題","tl_header_two":"二級標題","tl_header_three":"三級標題","tl_header_four":"四級標題","tl_header_five":"五級標題","tl_header_six":"六級標題","tl_underline":"下劃線","tl_strikethrough":"中劃線","tl_mark":"標記","tl_superscript":"上角標","tl_subscript":"下角標","tl_quote":"段落引用","tl_ol":"有序列表","tl_ul":"無序列表","tl_link":"鏈接","tl_image":"添加圖片鏈接","tl_code":"代碼塊","tl_table":"表格","tl_undo":"上一步","tl_redo":"下一步","tl_trash":"清空","tl_save":"保存","tl_navigation_on":"開啟標題導航","tl_navigation_off":"關閉標題導航","tl_preview":"預覽","tl_aligncenter":"居中","tl_alignleft":"居左","tl_alignright":"居右","tl_edit":"編輯","tl_single_column":"單欄","tl_double_column":"雙欄","tl_fullscreen_on":"全屏編輯","tl_fullscreen_off":"退出全屏","tl_read":"沈浸式閱讀","tl_html_on":"查看html文本","tl_html_off":"返回markdown文本","tl_help":"markdown語法幫助","tl_upload":"上傳圖片","tl_upload_remove":"刪除","tl_popup_link_title":"添加鏈接","tl_popup_link_text":"鏈接描述","tl_popup_link_addr":"鏈接地址","tl_popup_img_link_title":"添加圖片","tl_popup_img_link_text":"圖片描述","tl_popup_img_link_addr":"圖片鏈接","tl_popup_link_sure":"確定","tl_popup_link_cancel":"取消"}')},function(d){d.exports=JSON.parse('{"start_editor":"Begin editing...","navigation_title":"Navigation","tl_bold":"Bold","tl_italic":"Italic","tl_header":"Header","tl_header_one":"Header 1","tl_header_two":"Header 2","tl_header_three":"Header 3","tl_header_four":"Header 4","tl_header_five":"Header 5","tl_header_six":"Header 6","tl_underline":"Underline","tl_strikethrough":"Strikethrough","tl_mark":"Mark","tl_superscript":"Superscript","tl_subscript":"Subscript","tl_quote":"Quote","tl_ol":"Ol","tl_ul":"Ul","tl_link":"Link","tl_image":"Image Link","tl_code":"Code","tl_table":"Table","tl_undo":"Undo","tl_redo":"Redo","tl_trash":"Trash","tl_save":"Save","tl_navigation_on":"Navigation ON","tl_navigation_off":"Navigation OFF","tl_preview":"Preview","tl_aligncenter":"Center text","tl_alignleft":"Clamp text to the left","tl_alignright":"Clamp text to the right","tl_edit":"Edit","tl_single_column":"Single Column","tl_double_column":"Double Columns","tl_fullscreen_on":"FullScreen ON","tl_fullscreen_off":"FullScreen OFF","tl_read":"Read Model","tl_html_on":"HTML ON","tl_html_off":"HTML OFF","tl_help":"Markdown Guide","tl_upload":"Upload Images","tl_upload_remove":"Remove","tl_popup_link_title":"Add Link","tl_popup_link_text":"Link text","tl_popup_link_addr":"Link address","tl_popup_img_link_title":"Add Image","tl_popup_img_link_text":"Image Text","tl_popup_img_link_addr":"Image Link","tl_popup_link_sure":"Sure","tl_popup_link_cancel":"Cancel"}')},function(d){d.exports=JSON.parse(`{"start_editor":"Début d'édition...","navigation_title":"Navigation","tl_bold":"Gras","tl_italic":"Italique","tl_header":"Entête","tl_header_one":"Entête 1","tl_header_two":"Entête 2","tl_header_three":"Entête 3","tl_header_four":"Entête 4","tl_header_five":"Entête 5","tl_header_six":"Entête 6","tl_underline":"Souligné","tl_strikethrough":"Barré","tl_mark":"Mark","tl_superscript":"Exposant","tl_subscript":"Sous-exposant","tl_quote":"Quote","tl_ol":"Liste ","tl_ul":"Puce","tl_link":"Lien","tl_image":"Image Lien","tl_code":"Code","tl_table":"Table","tl_undo":"Annuler","tl_redo":"Refaire","tl_trash":"Supprimer","tl_save":"Sauver","tl_navigation_on":"Activer la navigation","tl_navigation_off":"Désactiver le navigation","tl_preview":"Previsualisé","tl_aligncenter":"Center le texte","tl_alignleft":"Férer le texte à gauche","tl_alignright":"Férer le texte à droite","tl_edit":"Editer","tl_single_column":"Seule Colonne","tl_double_column":"Colonnes Doubles","tl_fullscreen_on":"Activer le mode plein écran","tl_fullscreen_off":"Désactiver le mode plein écran","tl_read":"Lire le modèle","tl_html_on":"Activer le mode HTML","tl_html_off":"Désactiver le mode HTML","tl_help":"Guide Markdown","tl_upload":"Télécharger les images","tl_upload_remove":"Supprimer","tl_popup_link_title":"Ajouter un lien","tl_popup_link_text":"Description","tl_popup_link_addr":"Link","tl_popup_img_link_title":"Ajouter une image","tl_popup_img_link_text":"Description","tl_popup_img_link_addr":"Link","tl_popup_link_sure":"sûr","tl_popup_link_cancel":"Annuler"}`)},function(d){d.exports=JSON.parse('{"start_editor":"Começar edição...","navigation_title":"Navegação","tl_bold":"Negrito","tl_italic":"Itálico","tl_header":"Cabeçalho","tl_header_one":"Cabeçalho 1","tl_header_two":"Cabeçalho 2","tl_header_three":"Cabeçalho 3","tl_header_four":"Cabeçalho 4","tl_header_five":"Cabeçalho 5","tl_header_six":"Cabeçalho 6","tl_underline":"Sublinhar","tl_strikethrough":"Tachar","tl_mark":"Marcação","tl_superscript":"Sobrescrito","tl_subscript":"Subscrito","tl_quote":"Citação","tl_ol":"Lista Numerada","tl_ul":"Lista com marcadores","tl_link":"Link","tl_image":"Link de imagem","tl_code":"Código","tl_table":"Tabela","tl_undo":"Desfazer","tl_redo":"Refazer","tl_trash":"Lixo","tl_save":"Salvar","tl_navigation_on":"Mostrar Navegação","tl_navigation_off":"Esconder Navegação","tl_preview":"Preview","tl_aligncenter":"Alinhar no centro","tl_alignleft":"Alinhar à esquerda","tl_alignright":"Alinhar à direita","tl_edit":"Editar","tl_single_column":"Coluna Única","tl_double_column":"Duas Colunas","tl_fullscreen_on":"Ligar Tela Cheia","tl_fullscreen_off":"Desligar Tela Cheia","tl_read":"Modo de Leitura","tl_html_on":"Ligar HTML","tl_html_off":"Desligar HTML","tl_help":"Guia Markdown","tl_upload":"Upload de Imagens","tl_upload_remove":"Remover","tl_popup_link_title":"Adicionar Link","tl_popup_link_text":"Descrição","tl_popup_link_addr":"Link","tl_popup_img_link_title":"Adicionar fotos","tl_popup_img_link_text":"Descrição","tl_popup_img_link_addr":"Link","tl_popup_link_sure":"Confirmar","tl_popup_link_cancel":"Cancelar"}')},function(d){d.exports=JSON.parse('{"start_editor":"Начните редактирование...","navigation_title":"Навигация","tl_bold":"Полужирный","tl_italic":"Курсив","tl_header":"Заголовки","tl_header_one":"Заголовок 1","tl_header_two":"Заголовок 2","tl_header_three":"Заголовок 3","tl_header_four":"Заголовок 4","tl_header_five":"Заголовок 5","tl_header_six":"Заголовок 6","tl_underline":"Подчеркнутый","tl_strikethrough":"Зачеркнутый","tl_mark":"Отметка","tl_superscript":"Верхний индекс","tl_subscript":"Нижний индекс","tl_quote":"Цитата","tl_ol":"Нумерованный список","tl_ul":"Список","tl_link":"Ссылка","tl_image":"Ссылка изображения","tl_code":"Код","tl_table":"Таблица","tl_undo":"Отменить","tl_redo":"Вернуть","tl_trash":"Удалить","tl_save":"Сохранить","tl_navigation_on":"Показать навигацию","tl_navigation_off":"Скрыть навигацию","tl_preview":"Предпросмотр","tl_aligncenter":"Выровнять по центру","tl_alignleft":"Выровнять по левому краю","tl_alignright":"Выровнять по правому краю","tl_edit":"Редактор","tl_single_column":"Одно поле","tl_double_column":"Два поля","tl_fullscreen_on":"Полноэкранный режим","tl_fullscreen_off":"Выключить полноэкранный режим","tl_read":"Режим чтения","tl_html_on":"Показать HTML","tl_html_off":"Убрать HTML","tl_help":"Markdown помощь","tl_upload":"Загрузить изображение","tl_upload_remove":"Удалить","tl_popup_link_title":"Добавить ссылку","tl_popup_link_text":"Текст ссылки","tl_popup_link_addr":"Адрес ссылки","tl_popup_img_link_title":"Локальное изображение","tl_popup_img_link_text":"Текст изображения","tl_popup_img_link_addr":"Ссылка изображения","tl_popup_link_sure":"Добавить","tl_popup_link_cancel":"Отменить"}')},function(d){d.exports=JSON.parse('{"start_editor":"Bearbeitung beginnen...","navigation_title":"Navigation","tl_bold":"Fett","tl_italic":"Kursiv","tl_header":"Überschrift","tl_header_one":"Überschrift 1","tl_header_two":"Überschrift 2","tl_header_three":"Überschrift 3","tl_header_four":"Überschrift 4","tl_header_five":"Überschrift 5","tl_header_six":"Überschrift 6","tl_underline":"Unterstrichen","tl_strikethrough":"Durchgestrichen","tl_mark":"Markiert","tl_superscript":"Hochgestellt","tl_subscript":"Tiefgestellt","tl_quote":"Zitat","tl_ol":"Ol","tl_ul":"Ul","tl_link":"Link","tl_image":"Link mit Bild","tl_code":"Code","tl_table":"Tabelle","tl_undo":"Rückgängig","tl_redo":"Wiederherstellen","tl_trash":"Mülleimer","tl_save":"Speichern","tl_navigation_on":"Navigation AN","tl_navigation_off":"Navigation AUS","tl_preview":"Vorschau","tl_aligncenter":"Text zentrieren","tl_alignleft":"Nach links ausrichten","tl_alignright":"Nach rechts ausrichten","tl_edit":"Bearbeiten","tl_single_column":"Einspaltig","tl_double_column":"Zweispaltig","tl_fullscreen_on":"Vollbild AN","tl_fullscreen_off":"Vollbild AUS","tl_read":"Lesemodus","tl_html_on":"HTML AN","tl_html_off":"HTML AUS","tl_help":"Markdown Handbuch","tl_upload":"Bilder-Upload","tl_upload_remove":"Entfernen","tl_popup_link_title":"Link hinzufügen","tl_popup_link_text":"Text des Links","tl_popup_link_addr":"Linkziel","tl_popup_img_link_title":"Bild hinzufügen","tl_popup_img_link_text":"Text des Bildes","tl_popup_img_link_addr":"Link auf Bild","tl_popup_link_sure":"Ja","tl_popup_link_cancel":"Abbruch"}')},function(d){d.exports=JSON.parse('{"start_editor":"編集を始めてね！","navigation_title":"ナビゲーション","tl_bold":"太字","tl_italic":"斜体","tl_header":"見出し","tl_header_one":"見出し1","tl_header_two":"見出し2","tl_header_three":"見出し3","tl_header_four":"見出し4","tl_header_five":"見出し5","tl_header_six":"見出し6","tl_underline":"下線","tl_strikethrough":"取り消し線","tl_mark":"蛍光ペン","tl_superscript":"上付き文字","tl_subscript":"下付き文字","tl_quote":"引用","tl_ol":"番号付きリスト","tl_ul":"箇条書きリスト","tl_link":"ハイパーリンク","tl_image":"画像のリンク","tl_code":"コードの挿入","tl_table":"表の挿入","tl_undo":"戻る","tl_redo":"進む","tl_trash":"削除","tl_save":"保存","tl_navigation_on":"ナビゲーションを表示","tl_navigation_off":"ナビゲーションを非表示","tl_preview":"プレビュー","tl_aligncenter":"中央揃え","tl_alignleft":"左揃え","tl_alignright":"右揃え","tl_edit":"編集","tl_single_column":"一列","tl_double_column":"二列","tl_fullscreen_on":"全画面表示","tl_fullscreen_off":"全画面表示の終了","tl_read":"モデルの読み込み","tl_html_on":"HTMLで表示","tl_html_off":"HTML表示の終了","tl_help":"ヘルプ","tl_upload":"画像をアップロード","tl_upload_remove":"画像の削除","tl_popup_link_title":"リンクの追加","tl_popup_link_text":"リンクテキスト","tl_popup_link_addr":"リンク先のURL","tl_popup_img_link_title":"画像の追加","tl_popup_img_link_text":"画像タイトル","tl_popup_img_link_addr":"画像URL","tl_popup_link_sure":"OK","tl_popup_link_cancel":"戻る"}')},function(d){d.exports=JSON.parse('{"start_editor":"작성해주세요.","navigation_title":"네비게이션","tl_bold":"굵게","tl_italic":"기울임꼴","tl_header":"헤더","tl_header_one":"헤더 1","tl_header_two":"헤더 2","tl_header_three":"헤더 3","tl_header_four":"헤더 4","tl_header_five":"헤더 5","tl_header_six":"헤더 6","tl_underline":"밑줄","tl_strikethrough":"취소선","tl_mark":"마커","tl_superscript":"위첨자","tl_subscript":"아래첨자","tl_quote":"Quote","tl_ol":"숫자 리스트","tl_ul":"점 리스트","tl_link":"링크","tl_image":"이미지 링크","tl_code":"코드블럭","tl_table":"테이블","tl_undo":"실행취소","tl_redo":"되돌리기","tl_trash":"삭제","tl_save":"저장","tl_navigation_on":"네비게이션 끔","tl_navigation_off":"네비게이션 켬","tl_preview":"미리보기","tl_aligncenter":"가운데 정렬","tl_alignleft":"왼쪽 정렬","tl_alignright":"오른쪽 정렬","tl_edit":"수정","tl_single_column":"단일 열","tl_double_column":"복수 열","tl_fullscreen_on":"전체화면 활성화","tl_fullscreen_off":"전체화면 종료","tl_read":"읽기모드","tl_html_on":"HTML 켬","tl_html_off":"HTML 끔","tl_help":"마크다운 가이드","tl_upload":"이미지 업로드","tl_upload_remove":"제거","tl_popup_link_title":"링크 삽입","tl_popup_link_text":"텍스트","tl_popup_link_addr":"링크주소","tl_popup_img_link_title":"이미지 추가","tl_popup_img_link_text":"이미지 이름","tl_popup_img_link_addr":"링크주소","tl_popup_link_sure":"삽입","tl_popup_link_cancel":"취소"}')},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0});var e=l(a(25));_.initMarkdown=j;var t=l(a(56)),n=a(57),r=l(a(135));function l(T){return T&&T.__esModule?T:{default:T}}var i={html:!0,xhtmlOut:!0,breaks:!0,langPrefix:"lang-",linkify:!1,typographer:!0,quotes:"“”‘’"},c=a(140),s=a(197),o=a(203),u=a(204),f=a(205),p=a(206),m=a(207),g=a(208),b=a(209),w=a(210),y=a(211),k=a(212),v=a(213),x=a(214),E=a(215),S={},O=[],C={hljs:"auto",highlighted:!0,langCheck:function(T){T&&t.default[T]&&!S[T]&&(S[T]=1,O.push(t.default[T]))}};function j(){var T=new c(i),A=T.renderer.rules.link_open||function(D,z,B,N,R){return R.renderToken(D,z,B)};return T.renderer.rules.link_open=function(D,z,B,N,R){var U=D[z].attrIndex("href");if(D[z].attrs[U][1].startsWith("#"))return A(D,z,B,N,R);var H=D[z].attrIndex("target");return H<0?D[z].attrPush(["target","_blank"]):D[z].attrs[H][1]="_blank",A(D,z,B,N,R)},T.use(v,C).use(s).use(u).use(o).use(y).use(y,"hljs-left").use(y,"hljs-center").use(y,"hljs-right").use(f).use(p).use(m).use(g).use(b).use(y).use(E).use(x).use(w).use(k),T}_.default={data:function(){return{markdownIt:null}},created:function(){this.markdownIt=j(),this.html?(0,e.default)(this.xssOptions)==="object"&&this.markdownIt.use(r.default,this.xssOptions):(this.markdownIt.set({html:!1}),this.xssOptions=!1)},mounted:function(){C.highlighted=this.ishljs},methods:{$render:function(T,A){S={},O=[];var D=this.markdownIt.render(T);this.ishljs&&O.length>0&&this.$_render(T,A,D),A(D)},$_render:function(T,A,D){for(var z=this,B=0,N=0;N<O.length;N++){var R=z.p_external_link.hljs_lang(O[N]);(0,n.loadScript)(R,function(){(B+=1)===O.length&&(D=z.markdownIt.render(T),A(D))})}}},watch:{ishljs:function(T){C.highlighted=T}}}},function(d,_,a){Object.defineProperty(_,"__esModule",{value:!0}),_.default=function(r,l){r.options.html&&(t=new e.FilterXSS(l),r.core.ruler.push("mavoneditor_sanitizer",n))};var e=a(136),t=void 0;function n(r){t&&function l(i,c){for(var s=void 0,o=void 0,u=0;u<i.length;u++)c.indexOf(i[u].type)!==-1&&(s=i[u].content,o=i[u].children,i[u].content=t.process(s),o&&o.length&&s!==i[u].content&&l(o,["html_inline"]))}(r.tokens,["inline","html_block"])}},function(d,_,a){var e=a(58),t=a(61),n=a(139);function r(l,i){return new n(i).process(l)}(_=d.exports=r).filterXSS=r,_.FilterXSS=n,function(){for(var l in e)_[l]=e[l];for(var i in t)_[i]=t[i]}(),typeof window<"u"&&(window.filterXSS=d.exports),typeof self<"u"&&typeof DedicatedWorkerGlobalScope<"u"&&self instanceof DedicatedWorkerGlobalScope&&(self.filterXSS=d.exports)},function(d,_,a){var e=a(59),t=a(138);a(60);function n(l){return l==null}function r(l){(l=function(i){var c={};for(var s in i)c[s]=i[s];return c}(l||{})).whiteList=l.whiteList||e.whiteList,l.onAttr=l.onAttr||e.onAttr,l.onIgnoreAttr=l.onIgnoreAttr||e.onIgnoreAttr,l.safeAttrValue=l.safeAttrValue||e.safeAttrValue,this.options=l}r.prototype.process=function(l){if(!(l=(l=l||"").toString()))return"";var i=this.options,c=i.whiteList,s=i.onAttr,o=i.onIgnoreAttr,u=i.safeAttrValue;return t(l,function(f,p,m,g,b){var w=c[m],y=!1;if(w===!0?y=w:typeof w=="function"?y=w(g):w instanceof RegExp&&(y=w.test(g)),y!==!0&&(y=!1),g=u(m,g)){var k,v={position:p,sourcePosition:f,source:b,isWhite:y};return y?n(k=s(m,g,v))?m+":"+g:k:n(k=o(m,g,v))?void 0:k}})},d.exports=r},function(d,_,a){var e=a(60);d.exports=function(t,n){(t=e.trimRight(t))[t.length-1]!==";"&&(t+=";");var r=t.length,l=!1,i=0,c=0,s="";function o(){if(!l){var p=e.trim(t.slice(i,c)),m=p.indexOf(":");if(m!==-1){var g=e.trim(p.slice(0,m)),b=e.trim(p.slice(m+1));if(g){var w=n(i,s.length,g,b,p);w&&(s+=w+"; ")}}}i=c+1}for(;c<r;c++){var u=t[c];if(u==="/"&&t[c+1]==="*"){var f=t.indexOf("*/",c+2);if(f===-1)break;i=(c=f+1)+1,l=!1}else u==="("?l=!0:u===")"?l=!1:u===";"?l||o():u===`
`&&o()}return e.trim(s)}},function(d,_,a){var e=a(38).FilterCSS,t=a(58),n=a(61),r=n.parseTag,l=n.parseAttr,i=a(39);function c(o){return o==null}function s(o){(o=function(u){var f={};for(var p in u)f[p]=u[p];return f}(o||{})).stripIgnoreTag&&(o.onIgnoreTag&&console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time'),o.onIgnoreTag=t.onIgnoreTagStripAll),o.whiteList||o.allowList?o.whiteList=function(u){var f={};for(var p in u)Array.isArray(u[p])?f[p.toLowerCase()]=u[p].map(function(m){return m.toLowerCase()}):f[p.toLowerCase()]=u[p];return f}(o.whiteList||o.allowList):o.whiteList=t.whiteList,this.attributeWrapSign=o.singleQuotedAttributeValue===!0?"'":t.attributeWrapSign,o.onTag=o.onTag||t.onTag,o.onTagAttr=o.onTagAttr||t.onTagAttr,o.onIgnoreTag=o.onIgnoreTag||t.onIgnoreTag,o.onIgnoreTagAttr=o.onIgnoreTagAttr||t.onIgnoreTagAttr,o.safeAttrValue=o.safeAttrValue||t.safeAttrValue,o.escapeHtml=o.escapeHtml||t.escapeHtml,this.options=o,o.css===!1?this.cssFilter=!1:(o.css=o.css||{},this.cssFilter=new e(o.css))}s.prototype.process=function(o){if(!(o=(o=o||"").toString()))return"";var u=this.options,f=u.whiteList,p=u.onTag,m=u.onIgnoreTag,g=u.onTagAttr,b=u.onIgnoreTagAttr,w=u.safeAttrValue,y=u.escapeHtml,k=this.attributeWrapSign,v=this.cssFilter;u.stripBlankChar&&(o=t.stripBlankChar(o)),u.allowCommentTag||(o=t.stripCommentTag(o));var x=!1;u.stripIgnoreTagBody&&(x=t.StripTagBody(u.stripIgnoreTagBody,m),m=x.onIgnoreTag);var E=r(o,function(S,O,C,j,T){var A={sourcePosition:S,position:O,isClosing:T,isWhite:Object.prototype.hasOwnProperty.call(f,C)},D=p(C,j,A);if(!c(D))return D;if(A.isWhite){if(A.isClosing)return"</"+C+">";var z=function(R){var U=i.spaceIndex(R);if(U===-1)return{html:"",closing:R[R.length-2]==="/"};var H=(R=i.trim(R.slice(U+1,-1)))[R.length-1]==="/";return H&&(R=i.trim(R.slice(0,-1))),{html:R,closing:H}}(j),B=f[C],N=l(z.html,function(R,U){var H=i.indexOf(B,R)!==-1,W=g(C,R,U,H);return c(W)?H?(U=w(C,R,U,v))?R+"="+k+U+k:R:c(W=b(C,R,U,H))?void 0:W:W});return j="<"+C,N&&(j+=" "+N),z.closing&&(j+=" /"),j+=">"}return c(D=m(C,j,A))?y(j):D},y);return x&&(E=x.remove(E)),E},d.exports=s},function(d,_,a){d.exports=a(141)},function(d,_,a){var e=a(1),t=a(149),n=a(153),r=a(154),l=a(162),i=a(176),c=a(189),s=a(63),o=a(191),u={default:a(194),zero:a(195),commonmark:a(196)},f=/^(vbscript|javascript|file|data):/,p=/^data:image\/(gif|png|jpeg|webp);/;function m(k){var v=k.trim().toLowerCase();return!f.test(v)||!!p.test(v)}var g=["http:","https:","mailto:"];function b(k){var v=s.parse(k,!0);if(v.hostname&&(!v.protocol||g.indexOf(v.protocol)>=0))try{v.hostname=o.toASCII(v.hostname)}catch{}return s.encode(s.format(v))}function w(k){var v=s.parse(k,!0);if(v.hostname&&(!v.protocol||g.indexOf(v.protocol)>=0))try{v.hostname=o.toUnicode(v.hostname)}catch{}return s.decode(s.format(v))}function y(k,v){if(!(this instanceof y))return new y(k,v);v||e.isString(k)||(v=k||{},k="default"),this.inline=new i,this.block=new l,this.core=new r,this.renderer=new n,this.linkify=new c,this.validateLink=m,this.normalizeLink=b,this.normalizeLinkText=w,this.utils=e,this.helpers=e.assign({},t),this.options={},this.configure(k),v&&this.set(v)}y.prototype.set=function(k){return e.assign(this.options,k),this},y.prototype.configure=function(k){var v,x=this;if(e.isString(k)&&!(k=u[v=k]))throw new Error('Wrong `markdown-it` preset "'+v+'", check name');if(!k)throw new Error("Wrong `markdown-it` preset, can't be empty");return k.options&&x.set(k.options),k.components&&Object.keys(k.components).forEach(function(E){k.components[E].rules&&x[E].ruler.enableOnly(k.components[E].rules),k.components[E].rules2&&x[E].ruler2.enableOnly(k.components[E].rules2)}),this},y.prototype.enable=function(k,v){var x=[];Array.isArray(k)||(k=[k]),["core","block","inline"].forEach(function(S){x=x.concat(this[S].ruler.enable(k,!0))},this),x=x.concat(this.inline.ruler2.enable(k,!0));var E=k.filter(function(S){return x.indexOf(S)<0});if(E.length&&!v)throw new Error("MarkdownIt. Failed to enable unknown rule(s): "+E);return this},y.prototype.disable=function(k,v){var x=[];Array.isArray(k)||(k=[k]),["core","block","inline"].forEach(function(S){x=x.concat(this[S].ruler.disable(k,!0))},this),x=x.concat(this.inline.ruler2.disable(k,!0));var E=k.filter(function(S){return x.indexOf(S)<0});if(E.length&&!v)throw new Error("MarkdownIt. Failed to disable unknown rule(s): "+E);return this},y.prototype.use=function(k){var v=[this].concat(Array.prototype.slice.call(arguments,1));return k.apply(k,v),this},y.prototype.parse=function(k,v){if(typeof k!="string")throw new Error("Input data should be a String");var x=new this.core.State(k,this,v);return this.core.process(x),x.tokens},y.prototype.render=function(k,v){return v=v||{},this.renderer.render(this.parse(k,v),this.options,v)},y.prototype.parseInline=function(k,v){var x=new this.core.State(k,this,v);return x.inlineMode=!0,this.core.process(x),x.tokens},y.prototype.renderInline=function(k,v){return v=v||{},this.renderer.render(this.parseInline(k,v),this.options,v)},d.exports=y},function(d){d.exports=JSON.parse('{"Aacute":"Á","aacute":"á","Abreve":"Ă","abreve":"ă","ac":"∾","acd":"∿","acE":"∾̳","Acirc":"Â","acirc":"â","acute":"´","Acy":"А","acy":"а","AElig":"Æ","aelig":"æ","af":"⁡","Afr":"𝔄","afr":"𝔞","Agrave":"À","agrave":"à","alefsym":"ℵ","aleph":"ℵ","Alpha":"Α","alpha":"α","Amacr":"Ā","amacr":"ā","amalg":"⨿","amp":"&","AMP":"&","andand":"⩕","And":"⩓","and":"∧","andd":"⩜","andslope":"⩘","andv":"⩚","ang":"∠","ange":"⦤","angle":"∠","angmsdaa":"⦨","angmsdab":"⦩","angmsdac":"⦪","angmsdad":"⦫","angmsdae":"⦬","angmsdaf":"⦭","angmsdag":"⦮","angmsdah":"⦯","angmsd":"∡","angrt":"∟","angrtvb":"⊾","angrtvbd":"⦝","angsph":"∢","angst":"Å","angzarr":"⍼","Aogon":"Ą","aogon":"ą","Aopf":"𝔸","aopf":"𝕒","apacir":"⩯","ap":"≈","apE":"⩰","ape":"≊","apid":"≋","apos":"\'","ApplyFunction":"⁡","approx":"≈","approxeq":"≊","Aring":"Å","aring":"å","Ascr":"𝒜","ascr":"𝒶","Assign":"≔","ast":"*","asymp":"≈","asympeq":"≍","Atilde":"Ã","atilde":"ã","Auml":"Ä","auml":"ä","awconint":"∳","awint":"⨑","backcong":"≌","backepsilon":"϶","backprime":"‵","backsim":"∽","backsimeq":"⋍","Backslash":"∖","Barv":"⫧","barvee":"⊽","barwed":"⌅","Barwed":"⌆","barwedge":"⌅","bbrk":"⎵","bbrktbrk":"⎶","bcong":"≌","Bcy":"Б","bcy":"б","bdquo":"„","becaus":"∵","because":"∵","Because":"∵","bemptyv":"⦰","bepsi":"϶","bernou":"ℬ","Bernoullis":"ℬ","Beta":"Β","beta":"β","beth":"ℶ","between":"≬","Bfr":"𝔅","bfr":"𝔟","bigcap":"⋂","bigcirc":"◯","bigcup":"⋃","bigodot":"⨀","bigoplus":"⨁","bigotimes":"⨂","bigsqcup":"⨆","bigstar":"★","bigtriangledown":"▽","bigtriangleup":"△","biguplus":"⨄","bigvee":"⋁","bigwedge":"⋀","bkarow":"⤍","blacklozenge":"⧫","blacksquare":"▪","blacktriangle":"▴","blacktriangledown":"▾","blacktriangleleft":"◂","blacktriangleright":"▸","blank":"␣","blk12":"▒","blk14":"░","blk34":"▓","block":"█","bne":"=⃥","bnequiv":"≡⃥","bNot":"⫭","bnot":"⌐","Bopf":"𝔹","bopf":"𝕓","bot":"⊥","bottom":"⊥","bowtie":"⋈","boxbox":"⧉","boxdl":"┐","boxdL":"╕","boxDl":"╖","boxDL":"╗","boxdr":"┌","boxdR":"╒","boxDr":"╓","boxDR":"╔","boxh":"─","boxH":"═","boxhd":"┬","boxHd":"╤","boxhD":"╥","boxHD":"╦","boxhu":"┴","boxHu":"╧","boxhU":"╨","boxHU":"╩","boxminus":"⊟","boxplus":"⊞","boxtimes":"⊠","boxul":"┘","boxuL":"╛","boxUl":"╜","boxUL":"╝","boxur":"└","boxuR":"╘","boxUr":"╙","boxUR":"╚","boxv":"│","boxV":"║","boxvh":"┼","boxvH":"╪","boxVh":"╫","boxVH":"╬","boxvl":"┤","boxvL":"╡","boxVl":"╢","boxVL":"╣","boxvr":"├","boxvR":"╞","boxVr":"╟","boxVR":"╠","bprime":"‵","breve":"˘","Breve":"˘","brvbar":"¦","bscr":"𝒷","Bscr":"ℬ","bsemi":"⁏","bsim":"∽","bsime":"⋍","bsolb":"⧅","bsol":"\\\\","bsolhsub":"⟈","bull":"•","bullet":"•","bump":"≎","bumpE":"⪮","bumpe":"≏","Bumpeq":"≎","bumpeq":"≏","Cacute":"Ć","cacute":"ć","capand":"⩄","capbrcup":"⩉","capcap":"⩋","cap":"∩","Cap":"⋒","capcup":"⩇","capdot":"⩀","CapitalDifferentialD":"ⅅ","caps":"∩︀","caret":"⁁","caron":"ˇ","Cayleys":"ℭ","ccaps":"⩍","Ccaron":"Č","ccaron":"č","Ccedil":"Ç","ccedil":"ç","Ccirc":"Ĉ","ccirc":"ĉ","Cconint":"∰","ccups":"⩌","ccupssm":"⩐","Cdot":"Ċ","cdot":"ċ","cedil":"¸","Cedilla":"¸","cemptyv":"⦲","cent":"¢","centerdot":"·","CenterDot":"·","cfr":"𝔠","Cfr":"ℭ","CHcy":"Ч","chcy":"ч","check":"✓","checkmark":"✓","Chi":"Χ","chi":"χ","circ":"ˆ","circeq":"≗","circlearrowleft":"↺","circlearrowright":"↻","circledast":"⊛","circledcirc":"⊚","circleddash":"⊝","CircleDot":"⊙","circledR":"®","circledS":"Ⓢ","CircleMinus":"⊖","CirclePlus":"⊕","CircleTimes":"⊗","cir":"○","cirE":"⧃","cire":"≗","cirfnint":"⨐","cirmid":"⫯","cirscir":"⧂","ClockwiseContourIntegral":"∲","CloseCurlyDoubleQuote":"”","CloseCurlyQuote":"’","clubs":"♣","clubsuit":"♣","colon":":","Colon":"∷","Colone":"⩴","colone":"≔","coloneq":"≔","comma":",","commat":"@","comp":"∁","compfn":"∘","complement":"∁","complexes":"ℂ","cong":"≅","congdot":"⩭","Congruent":"≡","conint":"∮","Conint":"∯","ContourIntegral":"∮","copf":"𝕔","Copf":"ℂ","coprod":"∐","Coproduct":"∐","copy":"©","COPY":"©","copysr":"℗","CounterClockwiseContourIntegral":"∳","crarr":"↵","cross":"✗","Cross":"⨯","Cscr":"𝒞","cscr":"𝒸","csub":"⫏","csube":"⫑","csup":"⫐","csupe":"⫒","ctdot":"⋯","cudarrl":"⤸","cudarrr":"⤵","cuepr":"⋞","cuesc":"⋟","cularr":"↶","cularrp":"⤽","cupbrcap":"⩈","cupcap":"⩆","CupCap":"≍","cup":"∪","Cup":"⋓","cupcup":"⩊","cupdot":"⊍","cupor":"⩅","cups":"∪︀","curarr":"↷","curarrm":"⤼","curlyeqprec":"⋞","curlyeqsucc":"⋟","curlyvee":"⋎","curlywedge":"⋏","curren":"¤","curvearrowleft":"↶","curvearrowright":"↷","cuvee":"⋎","cuwed":"⋏","cwconint":"∲","cwint":"∱","cylcty":"⌭","dagger":"†","Dagger":"‡","daleth":"ℸ","darr":"↓","Darr":"↡","dArr":"⇓","dash":"‐","Dashv":"⫤","dashv":"⊣","dbkarow":"⤏","dblac":"˝","Dcaron":"Ď","dcaron":"ď","Dcy":"Д","dcy":"д","ddagger":"‡","ddarr":"⇊","DD":"ⅅ","dd":"ⅆ","DDotrahd":"⤑","ddotseq":"⩷","deg":"°","Del":"∇","Delta":"Δ","delta":"δ","demptyv":"⦱","dfisht":"⥿","Dfr":"𝔇","dfr":"𝔡","dHar":"⥥","dharl":"⇃","dharr":"⇂","DiacriticalAcute":"´","DiacriticalDot":"˙","DiacriticalDoubleAcute":"˝","DiacriticalGrave":"`","DiacriticalTilde":"˜","diam":"⋄","diamond":"⋄","Diamond":"⋄","diamondsuit":"♦","diams":"♦","die":"¨","DifferentialD":"ⅆ","digamma":"ϝ","disin":"⋲","div":"÷","divide":"÷","divideontimes":"⋇","divonx":"⋇","DJcy":"Ђ","djcy":"ђ","dlcorn":"⌞","dlcrop":"⌍","dollar":"$","Dopf":"𝔻","dopf":"𝕕","Dot":"¨","dot":"˙","DotDot":"⃜","doteq":"≐","doteqdot":"≑","DotEqual":"≐","dotminus":"∸","dotplus":"∔","dotsquare":"⊡","doublebarwedge":"⌆","DoubleContourIntegral":"∯","DoubleDot":"¨","DoubleDownArrow":"⇓","DoubleLeftArrow":"⇐","DoubleLeftRightArrow":"⇔","DoubleLeftTee":"⫤","DoubleLongLeftArrow":"⟸","DoubleLongLeftRightArrow":"⟺","DoubleLongRightArrow":"⟹","DoubleRightArrow":"⇒","DoubleRightTee":"⊨","DoubleUpArrow":"⇑","DoubleUpDownArrow":"⇕","DoubleVerticalBar":"∥","DownArrowBar":"⤓","downarrow":"↓","DownArrow":"↓","Downarrow":"⇓","DownArrowUpArrow":"⇵","DownBreve":"̑","downdownarrows":"⇊","downharpoonleft":"⇃","downharpoonright":"⇂","DownLeftRightVector":"⥐","DownLeftTeeVector":"⥞","DownLeftVectorBar":"⥖","DownLeftVector":"↽","DownRightTeeVector":"⥟","DownRightVectorBar":"⥗","DownRightVector":"⇁","DownTeeArrow":"↧","DownTee":"⊤","drbkarow":"⤐","drcorn":"⌟","drcrop":"⌌","Dscr":"𝒟","dscr":"𝒹","DScy":"Ѕ","dscy":"ѕ","dsol":"⧶","Dstrok":"Đ","dstrok":"đ","dtdot":"⋱","dtri":"▿","dtrif":"▾","duarr":"⇵","duhar":"⥯","dwangle":"⦦","DZcy":"Џ","dzcy":"џ","dzigrarr":"⟿","Eacute":"É","eacute":"é","easter":"⩮","Ecaron":"Ě","ecaron":"ě","Ecirc":"Ê","ecirc":"ê","ecir":"≖","ecolon":"≕","Ecy":"Э","ecy":"э","eDDot":"⩷","Edot":"Ė","edot":"ė","eDot":"≑","ee":"ⅇ","efDot":"≒","Efr":"𝔈","efr":"𝔢","eg":"⪚","Egrave":"È","egrave":"è","egs":"⪖","egsdot":"⪘","el":"⪙","Element":"∈","elinters":"⏧","ell":"ℓ","els":"⪕","elsdot":"⪗","Emacr":"Ē","emacr":"ē","empty":"∅","emptyset":"∅","EmptySmallSquare":"◻","emptyv":"∅","EmptyVerySmallSquare":"▫","emsp13":" ","emsp14":" ","emsp":" ","ENG":"Ŋ","eng":"ŋ","ensp":" ","Eogon":"Ę","eogon":"ę","Eopf":"𝔼","eopf":"𝕖","epar":"⋕","eparsl":"⧣","eplus":"⩱","epsi":"ε","Epsilon":"Ε","epsilon":"ε","epsiv":"ϵ","eqcirc":"≖","eqcolon":"≕","eqsim":"≂","eqslantgtr":"⪖","eqslantless":"⪕","Equal":"⩵","equals":"=","EqualTilde":"≂","equest":"≟","Equilibrium":"⇌","equiv":"≡","equivDD":"⩸","eqvparsl":"⧥","erarr":"⥱","erDot":"≓","escr":"ℯ","Escr":"ℰ","esdot":"≐","Esim":"⩳","esim":"≂","Eta":"Η","eta":"η","ETH":"Ð","eth":"ð","Euml":"Ë","euml":"ë","euro":"€","excl":"!","exist":"∃","Exists":"∃","expectation":"ℰ","exponentiale":"ⅇ","ExponentialE":"ⅇ","fallingdotseq":"≒","Fcy":"Ф","fcy":"ф","female":"♀","ffilig":"ﬃ","fflig":"ﬀ","ffllig":"ﬄ","Ffr":"𝔉","ffr":"𝔣","filig":"ﬁ","FilledSmallSquare":"◼","FilledVerySmallSquare":"▪","fjlig":"fj","flat":"♭","fllig":"ﬂ","fltns":"▱","fnof":"ƒ","Fopf":"𝔽","fopf":"𝕗","forall":"∀","ForAll":"∀","fork":"⋔","forkv":"⫙","Fouriertrf":"ℱ","fpartint":"⨍","frac12":"½","frac13":"⅓","frac14":"¼","frac15":"⅕","frac16":"⅙","frac18":"⅛","frac23":"⅔","frac25":"⅖","frac34":"¾","frac35":"⅗","frac38":"⅜","frac45":"⅘","frac56":"⅚","frac58":"⅝","frac78":"⅞","frasl":"⁄","frown":"⌢","fscr":"𝒻","Fscr":"ℱ","gacute":"ǵ","Gamma":"Γ","gamma":"γ","Gammad":"Ϝ","gammad":"ϝ","gap":"⪆","Gbreve":"Ğ","gbreve":"ğ","Gcedil":"Ģ","Gcirc":"Ĝ","gcirc":"ĝ","Gcy":"Г","gcy":"г","Gdot":"Ġ","gdot":"ġ","ge":"≥","gE":"≧","gEl":"⪌","gel":"⋛","geq":"≥","geqq":"≧","geqslant":"⩾","gescc":"⪩","ges":"⩾","gesdot":"⪀","gesdoto":"⪂","gesdotol":"⪄","gesl":"⋛︀","gesles":"⪔","Gfr":"𝔊","gfr":"𝔤","gg":"≫","Gg":"⋙","ggg":"⋙","gimel":"ℷ","GJcy":"Ѓ","gjcy":"ѓ","gla":"⪥","gl":"≷","glE":"⪒","glj":"⪤","gnap":"⪊","gnapprox":"⪊","gne":"⪈","gnE":"≩","gneq":"⪈","gneqq":"≩","gnsim":"⋧","Gopf":"𝔾","gopf":"𝕘","grave":"`","GreaterEqual":"≥","GreaterEqualLess":"⋛","GreaterFullEqual":"≧","GreaterGreater":"⪢","GreaterLess":"≷","GreaterSlantEqual":"⩾","GreaterTilde":"≳","Gscr":"𝒢","gscr":"ℊ","gsim":"≳","gsime":"⪎","gsiml":"⪐","gtcc":"⪧","gtcir":"⩺","gt":">","GT":">","Gt":"≫","gtdot":"⋗","gtlPar":"⦕","gtquest":"⩼","gtrapprox":"⪆","gtrarr":"⥸","gtrdot":"⋗","gtreqless":"⋛","gtreqqless":"⪌","gtrless":"≷","gtrsim":"≳","gvertneqq":"≩︀","gvnE":"≩︀","Hacek":"ˇ","hairsp":" ","half":"½","hamilt":"ℋ","HARDcy":"Ъ","hardcy":"ъ","harrcir":"⥈","harr":"↔","hArr":"⇔","harrw":"↭","Hat":"^","hbar":"ℏ","Hcirc":"Ĥ","hcirc":"ĥ","hearts":"♥","heartsuit":"♥","hellip":"…","hercon":"⊹","hfr":"𝔥","Hfr":"ℌ","HilbertSpace":"ℋ","hksearow":"⤥","hkswarow":"⤦","hoarr":"⇿","homtht":"∻","hookleftarrow":"↩","hookrightarrow":"↪","hopf":"𝕙","Hopf":"ℍ","horbar":"―","HorizontalLine":"─","hscr":"𝒽","Hscr":"ℋ","hslash":"ℏ","Hstrok":"Ħ","hstrok":"ħ","HumpDownHump":"≎","HumpEqual":"≏","hybull":"⁃","hyphen":"‐","Iacute":"Í","iacute":"í","ic":"⁣","Icirc":"Î","icirc":"î","Icy":"И","icy":"и","Idot":"İ","IEcy":"Е","iecy":"е","iexcl":"¡","iff":"⇔","ifr":"𝔦","Ifr":"ℑ","Igrave":"Ì","igrave":"ì","ii":"ⅈ","iiiint":"⨌","iiint":"∭","iinfin":"⧜","iiota":"℩","IJlig":"Ĳ","ijlig":"ĳ","Imacr":"Ī","imacr":"ī","image":"ℑ","ImaginaryI":"ⅈ","imagline":"ℐ","imagpart":"ℑ","imath":"ı","Im":"ℑ","imof":"⊷","imped":"Ƶ","Implies":"⇒","incare":"℅","in":"∈","infin":"∞","infintie":"⧝","inodot":"ı","intcal":"⊺","int":"∫","Int":"∬","integers":"ℤ","Integral":"∫","intercal":"⊺","Intersection":"⋂","intlarhk":"⨗","intprod":"⨼","InvisibleComma":"⁣","InvisibleTimes":"⁢","IOcy":"Ё","iocy":"ё","Iogon":"Į","iogon":"į","Iopf":"𝕀","iopf":"𝕚","Iota":"Ι","iota":"ι","iprod":"⨼","iquest":"¿","iscr":"𝒾","Iscr":"ℐ","isin":"∈","isindot":"⋵","isinE":"⋹","isins":"⋴","isinsv":"⋳","isinv":"∈","it":"⁢","Itilde":"Ĩ","itilde":"ĩ","Iukcy":"І","iukcy":"і","Iuml":"Ï","iuml":"ï","Jcirc":"Ĵ","jcirc":"ĵ","Jcy":"Й","jcy":"й","Jfr":"𝔍","jfr":"𝔧","jmath":"ȷ","Jopf":"𝕁","jopf":"𝕛","Jscr":"𝒥","jscr":"𝒿","Jsercy":"Ј","jsercy":"ј","Jukcy":"Є","jukcy":"є","Kappa":"Κ","kappa":"κ","kappav":"ϰ","Kcedil":"Ķ","kcedil":"ķ","Kcy":"К","kcy":"к","Kfr":"𝔎","kfr":"𝔨","kgreen":"ĸ","KHcy":"Х","khcy":"х","KJcy":"Ќ","kjcy":"ќ","Kopf":"𝕂","kopf":"𝕜","Kscr":"𝒦","kscr":"𝓀","lAarr":"⇚","Lacute":"Ĺ","lacute":"ĺ","laemptyv":"⦴","lagran":"ℒ","Lambda":"Λ","lambda":"λ","lang":"⟨","Lang":"⟪","langd":"⦑","langle":"⟨","lap":"⪅","Laplacetrf":"ℒ","laquo":"«","larrb":"⇤","larrbfs":"⤟","larr":"←","Larr":"↞","lArr":"⇐","larrfs":"⤝","larrhk":"↩","larrlp":"↫","larrpl":"⤹","larrsim":"⥳","larrtl":"↢","latail":"⤙","lAtail":"⤛","lat":"⪫","late":"⪭","lates":"⪭︀","lbarr":"⤌","lBarr":"⤎","lbbrk":"❲","lbrace":"{","lbrack":"[","lbrke":"⦋","lbrksld":"⦏","lbrkslu":"⦍","Lcaron":"Ľ","lcaron":"ľ","Lcedil":"Ļ","lcedil":"ļ","lceil":"⌈","lcub":"{","Lcy":"Л","lcy":"л","ldca":"⤶","ldquo":"“","ldquor":"„","ldrdhar":"⥧","ldrushar":"⥋","ldsh":"↲","le":"≤","lE":"≦","LeftAngleBracket":"⟨","LeftArrowBar":"⇤","leftarrow":"←","LeftArrow":"←","Leftarrow":"⇐","LeftArrowRightArrow":"⇆","leftarrowtail":"↢","LeftCeiling":"⌈","LeftDoubleBracket":"⟦","LeftDownTeeVector":"⥡","LeftDownVectorBar":"⥙","LeftDownVector":"⇃","LeftFloor":"⌊","leftharpoondown":"↽","leftharpoonup":"↼","leftleftarrows":"⇇","leftrightarrow":"↔","LeftRightArrow":"↔","Leftrightarrow":"⇔","leftrightarrows":"⇆","leftrightharpoons":"⇋","leftrightsquigarrow":"↭","LeftRightVector":"⥎","LeftTeeArrow":"↤","LeftTee":"⊣","LeftTeeVector":"⥚","leftthreetimes":"⋋","LeftTriangleBar":"⧏","LeftTriangle":"⊲","LeftTriangleEqual":"⊴","LeftUpDownVector":"⥑","LeftUpTeeVector":"⥠","LeftUpVectorBar":"⥘","LeftUpVector":"↿","LeftVectorBar":"⥒","LeftVector":"↼","lEg":"⪋","leg":"⋚","leq":"≤","leqq":"≦","leqslant":"⩽","lescc":"⪨","les":"⩽","lesdot":"⩿","lesdoto":"⪁","lesdotor":"⪃","lesg":"⋚︀","lesges":"⪓","lessapprox":"⪅","lessdot":"⋖","lesseqgtr":"⋚","lesseqqgtr":"⪋","LessEqualGreater":"⋚","LessFullEqual":"≦","LessGreater":"≶","lessgtr":"≶","LessLess":"⪡","lesssim":"≲","LessSlantEqual":"⩽","LessTilde":"≲","lfisht":"⥼","lfloor":"⌊","Lfr":"𝔏","lfr":"𝔩","lg":"≶","lgE":"⪑","lHar":"⥢","lhard":"↽","lharu":"↼","lharul":"⥪","lhblk":"▄","LJcy":"Љ","ljcy":"љ","llarr":"⇇","ll":"≪","Ll":"⋘","llcorner":"⌞","Lleftarrow":"⇚","llhard":"⥫","lltri":"◺","Lmidot":"Ŀ","lmidot":"ŀ","lmoustache":"⎰","lmoust":"⎰","lnap":"⪉","lnapprox":"⪉","lne":"⪇","lnE":"≨","lneq":"⪇","lneqq":"≨","lnsim":"⋦","loang":"⟬","loarr":"⇽","lobrk":"⟦","longleftarrow":"⟵","LongLeftArrow":"⟵","Longleftarrow":"⟸","longleftrightarrow":"⟷","LongLeftRightArrow":"⟷","Longleftrightarrow":"⟺","longmapsto":"⟼","longrightarrow":"⟶","LongRightArrow":"⟶","Longrightarrow":"⟹","looparrowleft":"↫","looparrowright":"↬","lopar":"⦅","Lopf":"𝕃","lopf":"𝕝","loplus":"⨭","lotimes":"⨴","lowast":"∗","lowbar":"_","LowerLeftArrow":"↙","LowerRightArrow":"↘","loz":"◊","lozenge":"◊","lozf":"⧫","lpar":"(","lparlt":"⦓","lrarr":"⇆","lrcorner":"⌟","lrhar":"⇋","lrhard":"⥭","lrm":"‎","lrtri":"⊿","lsaquo":"‹","lscr":"𝓁","Lscr":"ℒ","lsh":"↰","Lsh":"↰","lsim":"≲","lsime":"⪍","lsimg":"⪏","lsqb":"[","lsquo":"‘","lsquor":"‚","Lstrok":"Ł","lstrok":"ł","ltcc":"⪦","ltcir":"⩹","lt":"<","LT":"<","Lt":"≪","ltdot":"⋖","lthree":"⋋","ltimes":"⋉","ltlarr":"⥶","ltquest":"⩻","ltri":"◃","ltrie":"⊴","ltrif":"◂","ltrPar":"⦖","lurdshar":"⥊","luruhar":"⥦","lvertneqq":"≨︀","lvnE":"≨︀","macr":"¯","male":"♂","malt":"✠","maltese":"✠","Map":"⤅","map":"↦","mapsto":"↦","mapstodown":"↧","mapstoleft":"↤","mapstoup":"↥","marker":"▮","mcomma":"⨩","Mcy":"М","mcy":"м","mdash":"—","mDDot":"∺","measuredangle":"∡","MediumSpace":" ","Mellintrf":"ℳ","Mfr":"𝔐","mfr":"𝔪","mho":"℧","micro":"µ","midast":"*","midcir":"⫰","mid":"∣","middot":"·","minusb":"⊟","minus":"−","minusd":"∸","minusdu":"⨪","MinusPlus":"∓","mlcp":"⫛","mldr":"…","mnplus":"∓","models":"⊧","Mopf":"𝕄","mopf":"𝕞","mp":"∓","mscr":"𝓂","Mscr":"ℳ","mstpos":"∾","Mu":"Μ","mu":"μ","multimap":"⊸","mumap":"⊸","nabla":"∇","Nacute":"Ń","nacute":"ń","nang":"∠⃒","nap":"≉","napE":"⩰̸","napid":"≋̸","napos":"ŉ","napprox":"≉","natural":"♮","naturals":"ℕ","natur":"♮","nbsp":" ","nbump":"≎̸","nbumpe":"≏̸","ncap":"⩃","Ncaron":"Ň","ncaron":"ň","Ncedil":"Ņ","ncedil":"ņ","ncong":"≇","ncongdot":"⩭̸","ncup":"⩂","Ncy":"Н","ncy":"н","ndash":"–","nearhk":"⤤","nearr":"↗","neArr":"⇗","nearrow":"↗","ne":"≠","nedot":"≐̸","NegativeMediumSpace":"​","NegativeThickSpace":"​","NegativeThinSpace":"​","NegativeVeryThinSpace":"​","nequiv":"≢","nesear":"⤨","nesim":"≂̸","NestedGreaterGreater":"≫","NestedLessLess":"≪","NewLine":"\\n","nexist":"∄","nexists":"∄","Nfr":"𝔑","nfr":"𝔫","ngE":"≧̸","nge":"≱","ngeq":"≱","ngeqq":"≧̸","ngeqslant":"⩾̸","nges":"⩾̸","nGg":"⋙̸","ngsim":"≵","nGt":"≫⃒","ngt":"≯","ngtr":"≯","nGtv":"≫̸","nharr":"↮","nhArr":"⇎","nhpar":"⫲","ni":"∋","nis":"⋼","nisd":"⋺","niv":"∋","NJcy":"Њ","njcy":"њ","nlarr":"↚","nlArr":"⇍","nldr":"‥","nlE":"≦̸","nle":"≰","nleftarrow":"↚","nLeftarrow":"⇍","nleftrightarrow":"↮","nLeftrightarrow":"⇎","nleq":"≰","nleqq":"≦̸","nleqslant":"⩽̸","nles":"⩽̸","nless":"≮","nLl":"⋘̸","nlsim":"≴","nLt":"≪⃒","nlt":"≮","nltri":"⋪","nltrie":"⋬","nLtv":"≪̸","nmid":"∤","NoBreak":"⁠","NonBreakingSpace":" ","nopf":"𝕟","Nopf":"ℕ","Not":"⫬","not":"¬","NotCongruent":"≢","NotCupCap":"≭","NotDoubleVerticalBar":"∦","NotElement":"∉","NotEqual":"≠","NotEqualTilde":"≂̸","NotExists":"∄","NotGreater":"≯","NotGreaterEqual":"≱","NotGreaterFullEqual":"≧̸","NotGreaterGreater":"≫̸","NotGreaterLess":"≹","NotGreaterSlantEqual":"⩾̸","NotGreaterTilde":"≵","NotHumpDownHump":"≎̸","NotHumpEqual":"≏̸","notin":"∉","notindot":"⋵̸","notinE":"⋹̸","notinva":"∉","notinvb":"⋷","notinvc":"⋶","NotLeftTriangleBar":"⧏̸","NotLeftTriangle":"⋪","NotLeftTriangleEqual":"⋬","NotLess":"≮","NotLessEqual":"≰","NotLessGreater":"≸","NotLessLess":"≪̸","NotLessSlantEqual":"⩽̸","NotLessTilde":"≴","NotNestedGreaterGreater":"⪢̸","NotNestedLessLess":"⪡̸","notni":"∌","notniva":"∌","notnivb":"⋾","notnivc":"⋽","NotPrecedes":"⊀","NotPrecedesEqual":"⪯̸","NotPrecedesSlantEqual":"⋠","NotReverseElement":"∌","NotRightTriangleBar":"⧐̸","NotRightTriangle":"⋫","NotRightTriangleEqual":"⋭","NotSquareSubset":"⊏̸","NotSquareSubsetEqual":"⋢","NotSquareSuperset":"⊐̸","NotSquareSupersetEqual":"⋣","NotSubset":"⊂⃒","NotSubsetEqual":"⊈","NotSucceeds":"⊁","NotSucceedsEqual":"⪰̸","NotSucceedsSlantEqual":"⋡","NotSucceedsTilde":"≿̸","NotSuperset":"⊃⃒","NotSupersetEqual":"⊉","NotTilde":"≁","NotTildeEqual":"≄","NotTildeFullEqual":"≇","NotTildeTilde":"≉","NotVerticalBar":"∤","nparallel":"∦","npar":"∦","nparsl":"⫽⃥","npart":"∂̸","npolint":"⨔","npr":"⊀","nprcue":"⋠","nprec":"⊀","npreceq":"⪯̸","npre":"⪯̸","nrarrc":"⤳̸","nrarr":"↛","nrArr":"⇏","nrarrw":"↝̸","nrightarrow":"↛","nRightarrow":"⇏","nrtri":"⋫","nrtrie":"⋭","nsc":"⊁","nsccue":"⋡","nsce":"⪰̸","Nscr":"𝒩","nscr":"𝓃","nshortmid":"∤","nshortparallel":"∦","nsim":"≁","nsime":"≄","nsimeq":"≄","nsmid":"∤","nspar":"∦","nsqsube":"⋢","nsqsupe":"⋣","nsub":"⊄","nsubE":"⫅̸","nsube":"⊈","nsubset":"⊂⃒","nsubseteq":"⊈","nsubseteqq":"⫅̸","nsucc":"⊁","nsucceq":"⪰̸","nsup":"⊅","nsupE":"⫆̸","nsupe":"⊉","nsupset":"⊃⃒","nsupseteq":"⊉","nsupseteqq":"⫆̸","ntgl":"≹","Ntilde":"Ñ","ntilde":"ñ","ntlg":"≸","ntriangleleft":"⋪","ntrianglelefteq":"⋬","ntriangleright":"⋫","ntrianglerighteq":"⋭","Nu":"Ν","nu":"ν","num":"#","numero":"№","numsp":" ","nvap":"≍⃒","nvdash":"⊬","nvDash":"⊭","nVdash":"⊮","nVDash":"⊯","nvge":"≥⃒","nvgt":">⃒","nvHarr":"⤄","nvinfin":"⧞","nvlArr":"⤂","nvle":"≤⃒","nvlt":"<⃒","nvltrie":"⊴⃒","nvrArr":"⤃","nvrtrie":"⊵⃒","nvsim":"∼⃒","nwarhk":"⤣","nwarr":"↖","nwArr":"⇖","nwarrow":"↖","nwnear":"⤧","Oacute":"Ó","oacute":"ó","oast":"⊛","Ocirc":"Ô","ocirc":"ô","ocir":"⊚","Ocy":"О","ocy":"о","odash":"⊝","Odblac":"Ő","odblac":"ő","odiv":"⨸","odot":"⊙","odsold":"⦼","OElig":"Œ","oelig":"œ","ofcir":"⦿","Ofr":"𝔒","ofr":"𝔬","ogon":"˛","Ograve":"Ò","ograve":"ò","ogt":"⧁","ohbar":"⦵","ohm":"Ω","oint":"∮","olarr":"↺","olcir":"⦾","olcross":"⦻","oline":"‾","olt":"⧀","Omacr":"Ō","omacr":"ō","Omega":"Ω","omega":"ω","Omicron":"Ο","omicron":"ο","omid":"⦶","ominus":"⊖","Oopf":"𝕆","oopf":"𝕠","opar":"⦷","OpenCurlyDoubleQuote":"“","OpenCurlyQuote":"‘","operp":"⦹","oplus":"⊕","orarr":"↻","Or":"⩔","or":"∨","ord":"⩝","order":"ℴ","orderof":"ℴ","ordf":"ª","ordm":"º","origof":"⊶","oror":"⩖","orslope":"⩗","orv":"⩛","oS":"Ⓢ","Oscr":"𝒪","oscr":"ℴ","Oslash":"Ø","oslash":"ø","osol":"⊘","Otilde":"Õ","otilde":"õ","otimesas":"⨶","Otimes":"⨷","otimes":"⊗","Ouml":"Ö","ouml":"ö","ovbar":"⌽","OverBar":"‾","OverBrace":"⏞","OverBracket":"⎴","OverParenthesis":"⏜","para":"¶","parallel":"∥","par":"∥","parsim":"⫳","parsl":"⫽","part":"∂","PartialD":"∂","Pcy":"П","pcy":"п","percnt":"%","period":".","permil":"‰","perp":"⊥","pertenk":"‱","Pfr":"𝔓","pfr":"𝔭","Phi":"Φ","phi":"φ","phiv":"ϕ","phmmat":"ℳ","phone":"☎","Pi":"Π","pi":"π","pitchfork":"⋔","piv":"ϖ","planck":"ℏ","planckh":"ℎ","plankv":"ℏ","plusacir":"⨣","plusb":"⊞","pluscir":"⨢","plus":"+","plusdo":"∔","plusdu":"⨥","pluse":"⩲","PlusMinus":"±","plusmn":"±","plussim":"⨦","plustwo":"⨧","pm":"±","Poincareplane":"ℌ","pointint":"⨕","popf":"𝕡","Popf":"ℙ","pound":"£","prap":"⪷","Pr":"⪻","pr":"≺","prcue":"≼","precapprox":"⪷","prec":"≺","preccurlyeq":"≼","Precedes":"≺","PrecedesEqual":"⪯","PrecedesSlantEqual":"≼","PrecedesTilde":"≾","preceq":"⪯","precnapprox":"⪹","precneqq":"⪵","precnsim":"⋨","pre":"⪯","prE":"⪳","precsim":"≾","prime":"′","Prime":"″","primes":"ℙ","prnap":"⪹","prnE":"⪵","prnsim":"⋨","prod":"∏","Product":"∏","profalar":"⌮","profline":"⌒","profsurf":"⌓","prop":"∝","Proportional":"∝","Proportion":"∷","propto":"∝","prsim":"≾","prurel":"⊰","Pscr":"𝒫","pscr":"𝓅","Psi":"Ψ","psi":"ψ","puncsp":" ","Qfr":"𝔔","qfr":"𝔮","qint":"⨌","qopf":"𝕢","Qopf":"ℚ","qprime":"⁗","Qscr":"𝒬","qscr":"𝓆","quaternions":"ℍ","quatint":"⨖","quest":"?","questeq":"≟","quot":"\\"","QUOT":"\\"","rAarr":"⇛","race":"∽̱","Racute":"Ŕ","racute":"ŕ","radic":"√","raemptyv":"⦳","rang":"⟩","Rang":"⟫","rangd":"⦒","range":"⦥","rangle":"⟩","raquo":"»","rarrap":"⥵","rarrb":"⇥","rarrbfs":"⤠","rarrc":"⤳","rarr":"→","Rarr":"↠","rArr":"⇒","rarrfs":"⤞","rarrhk":"↪","rarrlp":"↬","rarrpl":"⥅","rarrsim":"⥴","Rarrtl":"⤖","rarrtl":"↣","rarrw":"↝","ratail":"⤚","rAtail":"⤜","ratio":"∶","rationals":"ℚ","rbarr":"⤍","rBarr":"⤏","RBarr":"⤐","rbbrk":"❳","rbrace":"}","rbrack":"]","rbrke":"⦌","rbrksld":"⦎","rbrkslu":"⦐","Rcaron":"Ř","rcaron":"ř","Rcedil":"Ŗ","rcedil":"ŗ","rceil":"⌉","rcub":"}","Rcy":"Р","rcy":"р","rdca":"⤷","rdldhar":"⥩","rdquo":"”","rdquor":"”","rdsh":"↳","real":"ℜ","realine":"ℛ","realpart":"ℜ","reals":"ℝ","Re":"ℜ","rect":"▭","reg":"®","REG":"®","ReverseElement":"∋","ReverseEquilibrium":"⇋","ReverseUpEquilibrium":"⥯","rfisht":"⥽","rfloor":"⌋","rfr":"𝔯","Rfr":"ℜ","rHar":"⥤","rhard":"⇁","rharu":"⇀","rharul":"⥬","Rho":"Ρ","rho":"ρ","rhov":"ϱ","RightAngleBracket":"⟩","RightArrowBar":"⇥","rightarrow":"→","RightArrow":"→","Rightarrow":"⇒","RightArrowLeftArrow":"⇄","rightarrowtail":"↣","RightCeiling":"⌉","RightDoubleBracket":"⟧","RightDownTeeVector":"⥝","RightDownVectorBar":"⥕","RightDownVector":"⇂","RightFloor":"⌋","rightharpoondown":"⇁","rightharpoonup":"⇀","rightleftarrows":"⇄","rightleftharpoons":"⇌","rightrightarrows":"⇉","rightsquigarrow":"↝","RightTeeArrow":"↦","RightTee":"⊢","RightTeeVector":"⥛","rightthreetimes":"⋌","RightTriangleBar":"⧐","RightTriangle":"⊳","RightTriangleEqual":"⊵","RightUpDownVector":"⥏","RightUpTeeVector":"⥜","RightUpVectorBar":"⥔","RightUpVector":"↾","RightVectorBar":"⥓","RightVector":"⇀","ring":"˚","risingdotseq":"≓","rlarr":"⇄","rlhar":"⇌","rlm":"‏","rmoustache":"⎱","rmoust":"⎱","rnmid":"⫮","roang":"⟭","roarr":"⇾","robrk":"⟧","ropar":"⦆","ropf":"𝕣","Ropf":"ℝ","roplus":"⨮","rotimes":"⨵","RoundImplies":"⥰","rpar":")","rpargt":"⦔","rppolint":"⨒","rrarr":"⇉","Rrightarrow":"⇛","rsaquo":"›","rscr":"𝓇","Rscr":"ℛ","rsh":"↱","Rsh":"↱","rsqb":"]","rsquo":"’","rsquor":"’","rthree":"⋌","rtimes":"⋊","rtri":"▹","rtrie":"⊵","rtrif":"▸","rtriltri":"⧎","RuleDelayed":"⧴","ruluhar":"⥨","rx":"℞","Sacute":"Ś","sacute":"ś","sbquo":"‚","scap":"⪸","Scaron":"Š","scaron":"š","Sc":"⪼","sc":"≻","sccue":"≽","sce":"⪰","scE":"⪴","Scedil":"Ş","scedil":"ş","Scirc":"Ŝ","scirc":"ŝ","scnap":"⪺","scnE":"⪶","scnsim":"⋩","scpolint":"⨓","scsim":"≿","Scy":"С","scy":"с","sdotb":"⊡","sdot":"⋅","sdote":"⩦","searhk":"⤥","searr":"↘","seArr":"⇘","searrow":"↘","sect":"§","semi":";","seswar":"⤩","setminus":"∖","setmn":"∖","sext":"✶","Sfr":"𝔖","sfr":"𝔰","sfrown":"⌢","sharp":"♯","SHCHcy":"Щ","shchcy":"щ","SHcy":"Ш","shcy":"ш","ShortDownArrow":"↓","ShortLeftArrow":"←","shortmid":"∣","shortparallel":"∥","ShortRightArrow":"→","ShortUpArrow":"↑","shy":"­","Sigma":"Σ","sigma":"σ","sigmaf":"ς","sigmav":"ς","sim":"∼","simdot":"⩪","sime":"≃","simeq":"≃","simg":"⪞","simgE":"⪠","siml":"⪝","simlE":"⪟","simne":"≆","simplus":"⨤","simrarr":"⥲","slarr":"←","SmallCircle":"∘","smallsetminus":"∖","smashp":"⨳","smeparsl":"⧤","smid":"∣","smile":"⌣","smt":"⪪","smte":"⪬","smtes":"⪬︀","SOFTcy":"Ь","softcy":"ь","solbar":"⌿","solb":"⧄","sol":"/","Sopf":"𝕊","sopf":"𝕤","spades":"♠","spadesuit":"♠","spar":"∥","sqcap":"⊓","sqcaps":"⊓︀","sqcup":"⊔","sqcups":"⊔︀","Sqrt":"√","sqsub":"⊏","sqsube":"⊑","sqsubset":"⊏","sqsubseteq":"⊑","sqsup":"⊐","sqsupe":"⊒","sqsupset":"⊐","sqsupseteq":"⊒","square":"□","Square":"□","SquareIntersection":"⊓","SquareSubset":"⊏","SquareSubsetEqual":"⊑","SquareSuperset":"⊐","SquareSupersetEqual":"⊒","SquareUnion":"⊔","squarf":"▪","squ":"□","squf":"▪","srarr":"→","Sscr":"𝒮","sscr":"𝓈","ssetmn":"∖","ssmile":"⌣","sstarf":"⋆","Star":"⋆","star":"☆","starf":"★","straightepsilon":"ϵ","straightphi":"ϕ","strns":"¯","sub":"⊂","Sub":"⋐","subdot":"⪽","subE":"⫅","sube":"⊆","subedot":"⫃","submult":"⫁","subnE":"⫋","subne":"⊊","subplus":"⪿","subrarr":"⥹","subset":"⊂","Subset":"⋐","subseteq":"⊆","subseteqq":"⫅","SubsetEqual":"⊆","subsetneq":"⊊","subsetneqq":"⫋","subsim":"⫇","subsub":"⫕","subsup":"⫓","succapprox":"⪸","succ":"≻","succcurlyeq":"≽","Succeeds":"≻","SucceedsEqual":"⪰","SucceedsSlantEqual":"≽","SucceedsTilde":"≿","succeq":"⪰","succnapprox":"⪺","succneqq":"⪶","succnsim":"⋩","succsim":"≿","SuchThat":"∋","sum":"∑","Sum":"∑","sung":"♪","sup1":"¹","sup2":"²","sup3":"³","sup":"⊃","Sup":"⋑","supdot":"⪾","supdsub":"⫘","supE":"⫆","supe":"⊇","supedot":"⫄","Superset":"⊃","SupersetEqual":"⊇","suphsol":"⟉","suphsub":"⫗","suplarr":"⥻","supmult":"⫂","supnE":"⫌","supne":"⊋","supplus":"⫀","supset":"⊃","Supset":"⋑","supseteq":"⊇","supseteqq":"⫆","supsetneq":"⊋","supsetneqq":"⫌","supsim":"⫈","supsub":"⫔","supsup":"⫖","swarhk":"⤦","swarr":"↙","swArr":"⇙","swarrow":"↙","swnwar":"⤪","szlig":"ß","Tab":"\\t","target":"⌖","Tau":"Τ","tau":"τ","tbrk":"⎴","Tcaron":"Ť","tcaron":"ť","Tcedil":"Ţ","tcedil":"ţ","Tcy":"Т","tcy":"т","tdot":"⃛","telrec":"⌕","Tfr":"𝔗","tfr":"𝔱","there4":"∴","therefore":"∴","Therefore":"∴","Theta":"Θ","theta":"θ","thetasym":"ϑ","thetav":"ϑ","thickapprox":"≈","thicksim":"∼","ThickSpace":"  ","ThinSpace":" ","thinsp":" ","thkap":"≈","thksim":"∼","THORN":"Þ","thorn":"þ","tilde":"˜","Tilde":"∼","TildeEqual":"≃","TildeFullEqual":"≅","TildeTilde":"≈","timesbar":"⨱","timesb":"⊠","times":"×","timesd":"⨰","tint":"∭","toea":"⤨","topbot":"⌶","topcir":"⫱","top":"⊤","Topf":"𝕋","topf":"𝕥","topfork":"⫚","tosa":"⤩","tprime":"‴","trade":"™","TRADE":"™","triangle":"▵","triangledown":"▿","triangleleft":"◃","trianglelefteq":"⊴","triangleq":"≜","triangleright":"▹","trianglerighteq":"⊵","tridot":"◬","trie":"≜","triminus":"⨺","TripleDot":"⃛","triplus":"⨹","trisb":"⧍","tritime":"⨻","trpezium":"⏢","Tscr":"𝒯","tscr":"𝓉","TScy":"Ц","tscy":"ц","TSHcy":"Ћ","tshcy":"ћ","Tstrok":"Ŧ","tstrok":"ŧ","twixt":"≬","twoheadleftarrow":"↞","twoheadrightarrow":"↠","Uacute":"Ú","uacute":"ú","uarr":"↑","Uarr":"↟","uArr":"⇑","Uarrocir":"⥉","Ubrcy":"Ў","ubrcy":"ў","Ubreve":"Ŭ","ubreve":"ŭ","Ucirc":"Û","ucirc":"û","Ucy":"У","ucy":"у","udarr":"⇅","Udblac":"Ű","udblac":"ű","udhar":"⥮","ufisht":"⥾","Ufr":"𝔘","ufr":"𝔲","Ugrave":"Ù","ugrave":"ù","uHar":"⥣","uharl":"↿","uharr":"↾","uhblk":"▀","ulcorn":"⌜","ulcorner":"⌜","ulcrop":"⌏","ultri":"◸","Umacr":"Ū","umacr":"ū","uml":"¨","UnderBar":"_","UnderBrace":"⏟","UnderBracket":"⎵","UnderParenthesis":"⏝","Union":"⋃","UnionPlus":"⊎","Uogon":"Ų","uogon":"ų","Uopf":"𝕌","uopf":"𝕦","UpArrowBar":"⤒","uparrow":"↑","UpArrow":"↑","Uparrow":"⇑","UpArrowDownArrow":"⇅","updownarrow":"↕","UpDownArrow":"↕","Updownarrow":"⇕","UpEquilibrium":"⥮","upharpoonleft":"↿","upharpoonright":"↾","uplus":"⊎","UpperLeftArrow":"↖","UpperRightArrow":"↗","upsi":"υ","Upsi":"ϒ","upsih":"ϒ","Upsilon":"Υ","upsilon":"υ","UpTeeArrow":"↥","UpTee":"⊥","upuparrows":"⇈","urcorn":"⌝","urcorner":"⌝","urcrop":"⌎","Uring":"Ů","uring":"ů","urtri":"◹","Uscr":"𝒰","uscr":"𝓊","utdot":"⋰","Utilde":"Ũ","utilde":"ũ","utri":"▵","utrif":"▴","uuarr":"⇈","Uuml":"Ü","uuml":"ü","uwangle":"⦧","vangrt":"⦜","varepsilon":"ϵ","varkappa":"ϰ","varnothing":"∅","varphi":"ϕ","varpi":"ϖ","varpropto":"∝","varr":"↕","vArr":"⇕","varrho":"ϱ","varsigma":"ς","varsubsetneq":"⊊︀","varsubsetneqq":"⫋︀","varsupsetneq":"⊋︀","varsupsetneqq":"⫌︀","vartheta":"ϑ","vartriangleleft":"⊲","vartriangleright":"⊳","vBar":"⫨","Vbar":"⫫","vBarv":"⫩","Vcy":"В","vcy":"в","vdash":"⊢","vDash":"⊨","Vdash":"⊩","VDash":"⊫","Vdashl":"⫦","veebar":"⊻","vee":"∨","Vee":"⋁","veeeq":"≚","vellip":"⋮","verbar":"|","Verbar":"‖","vert":"|","Vert":"‖","VerticalBar":"∣","VerticalLine":"|","VerticalSeparator":"❘","VerticalTilde":"≀","VeryThinSpace":" ","Vfr":"𝔙","vfr":"𝔳","vltri":"⊲","vnsub":"⊂⃒","vnsup":"⊃⃒","Vopf":"𝕍","vopf":"𝕧","vprop":"∝","vrtri":"⊳","Vscr":"𝒱","vscr":"𝓋","vsubnE":"⫋︀","vsubne":"⊊︀","vsupnE":"⫌︀","vsupne":"⊋︀","Vvdash":"⊪","vzigzag":"⦚","Wcirc":"Ŵ","wcirc":"ŵ","wedbar":"⩟","wedge":"∧","Wedge":"⋀","wedgeq":"≙","weierp":"℘","Wfr":"𝔚","wfr":"𝔴","Wopf":"𝕎","wopf":"𝕨","wp":"℘","wr":"≀","wreath":"≀","Wscr":"𝒲","wscr":"𝓌","xcap":"⋂","xcirc":"◯","xcup":"⋃","xdtri":"▽","Xfr":"𝔛","xfr":"𝔵","xharr":"⟷","xhArr":"⟺","Xi":"Ξ","xi":"ξ","xlarr":"⟵","xlArr":"⟸","xmap":"⟼","xnis":"⋻","xodot":"⨀","Xopf":"𝕏","xopf":"𝕩","xoplus":"⨁","xotime":"⨂","xrarr":"⟶","xrArr":"⟹","Xscr":"𝒳","xscr":"𝓍","xsqcup":"⨆","xuplus":"⨄","xutri":"△","xvee":"⋁","xwedge":"⋀","Yacute":"Ý","yacute":"ý","YAcy":"Я","yacy":"я","Ycirc":"Ŷ","ycirc":"ŷ","Ycy":"Ы","ycy":"ы","yen":"¥","Yfr":"𝔜","yfr":"𝔶","YIcy":"Ї","yicy":"ї","Yopf":"𝕐","yopf":"𝕪","Yscr":"𝒴","yscr":"𝓎","YUcy":"Ю","yucy":"ю","yuml":"ÿ","Yuml":"Ÿ","Zacute":"Ź","zacute":"ź","Zcaron":"Ž","zcaron":"ž","Zcy":"З","zcy":"з","Zdot":"Ż","zdot":"ż","zeetrf":"ℨ","ZeroWidthSpace":"​","Zeta":"Ζ","zeta":"ζ","zfr":"𝔷","Zfr":"ℨ","ZHcy":"Ж","zhcy":"ж","zigrarr":"⇝","zopf":"𝕫","Zopf":"ℤ","Zscr":"𝒵","zscr":"𝓏","zwj":"‍","zwnj":"‌"}')},function(d,_,a){var e={};function t(n,r,l){var i,c,s,o,u,f="";for(typeof r!="string"&&(l=r,r=t.defaultChars),l===void 0&&(l=!0),u=function(p){var m,g,b=e[p];if(b)return b;for(b=e[p]=[],m=0;m<128;m++)g=String.fromCharCode(m),/^[0-9a-z]$/i.test(g)?b.push(g):b.push("%"+("0"+m.toString(16).toUpperCase()).slice(-2));for(m=0;m<p.length;m++)b[p.charCodeAt(m)]=p[m];return b}(r),i=0,c=n.length;i<c;i++)if(s=n.charCodeAt(i),l&&s===37&&i+2<c&&/^[0-9a-f]{2}$/i.test(n.slice(i+1,i+3)))f+=n.slice(i,i+3),i+=2;else if(s<128)f+=u[s];else if(s>=55296&&s<=57343){if(s>=55296&&s<=56319&&i+1<c&&(o=n.charCodeAt(i+1))>=56320&&o<=57343){f+=encodeURIComponent(n[i]+n[i+1]),i++;continue}f+="%EF%BF%BD"}else f+=encodeURIComponent(n[i]);return f}t.defaultChars=";/?:@&=+$,-_.!~*'()#",t.componentChars="-_.!~*'()",d.exports=t},function(d,_,a){var e={};function t(n,r){var l;return typeof r!="string"&&(r=t.defaultChars),l=function(i){var c,s,o=e[i];if(o)return o;for(o=e[i]=[],c=0;c<128;c++)s=String.fromCharCode(c),o.push(s);for(c=0;c<i.length;c++)o[s=i.charCodeAt(c)]="%"+("0"+s.toString(16).toUpperCase()).slice(-2);return o}(r),n.replace(/(%[a-f0-9]{2})+/gi,function(i){var c,s,o,u,f,p,m,g="";for(c=0,s=i.length;c<s;c+=3)(o=parseInt(i.slice(c+1,c+3),16))<128?g+=l[o]:(224&o)==192&&c+3<s&&(192&(u=parseInt(i.slice(c+4,c+6),16)))==128?(g+=(m=o<<6&1984|63&u)<128?"��":String.fromCharCode(m),c+=3):(240&o)==224&&c+6<s&&(u=parseInt(i.slice(c+4,c+6),16),f=parseInt(i.slice(c+7,c+9),16),(192&u)==128&&(192&f)==128)?(g+=(m=o<<12&61440|u<<6&4032|63&f)<2048||m>=55296&&m<=57343?"���":String.fromCharCode(m),c+=6):(248&o)==240&&c+9<s&&(u=parseInt(i.slice(c+4,c+6),16),f=parseInt(i.slice(c+7,c+9),16),p=parseInt(i.slice(c+10,c+12),16),(192&u)==128&&(192&f)==128&&(192&p)==128)?((m=o<<18&1835008|u<<12&258048|f<<6&4032|63&p)<65536||m>1114111?g+="����":(m-=65536,g+=String.fromCharCode(55296+(m>>10),56320+(1023&m))),c+=9):g+="�";return g})}t.defaultChars=";/?:@&=+$,#",t.componentChars="",d.exports=t},function(d,_,a){d.exports=function(e){var t="";return t+=e.protocol||"",t+=e.slashes?"//":"",t+=e.auth?e.auth+"@":"",e.hostname&&e.hostname.indexOf(":")!==-1?t+="["+e.hostname+"]":t+=e.hostname||"",t+=e.port?":"+e.port:"",t+=e.pathname||"",t+=e.search||"",t+=e.hash||""}},function(d,_,a){function e(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}var t=/^([a-z0-9.+-]+:)/i,n=/:[0-9]*$/,r=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,l=["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r",`
`,"	"]),i=["'"].concat(l),c=["%","/","?",";","#"].concat(i),s=["/","?","#"],o=/^[+a-z0-9A-Z_-]{0,63}$/,u=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,f={javascript:!0,"javascript:":!0},p={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};e.prototype.parse=function(m,g){var b,w,y,k,v,x=m;if(x=x.trim(),!g&&m.split("#").length===1){var E=r.exec(x);if(E)return this.pathname=E[1],E[2]&&(this.search=E[2]),this}var S=t.exec(x);if(S&&(y=(S=S[0]).toLowerCase(),this.protocol=S,x=x.substr(S.length)),(g||S||x.match(/^\/\/[^@\/]+@[^@\/]+/))&&(!(v=x.substr(0,2)==="//")||S&&f[S]||(x=x.substr(2),this.slashes=!0)),!f[S]&&(v||S&&!p[S])){var O,C,j=-1;for(b=0;b<s.length;b++)(k=x.indexOf(s[b]))!==-1&&(j===-1||k<j)&&(j=k);for((C=j===-1?x.lastIndexOf("@"):x.lastIndexOf("@",j))!==-1&&(O=x.slice(0,C),x=x.slice(C+1),this.auth=O),j=-1,b=0;b<c.length;b++)(k=x.indexOf(c[b]))!==-1&&(j===-1||k<j)&&(j=k);j===-1&&(j=x.length),x[j-1]===":"&&j--;var T=x.slice(0,j);x=x.slice(j),this.parseHost(T),this.hostname=this.hostname||"";var A=this.hostname[0]==="["&&this.hostname[this.hostname.length-1]==="]";if(!A){var D=this.hostname.split(/\./);for(b=0,w=D.length;b<w;b++){var z=D[b];if(z&&!z.match(o)){for(var B="",N=0,R=z.length;N<R;N++)z.charCodeAt(N)>127?B+="x":B+=z[N];if(!B.match(o)){var U=D.slice(0,b),H=D.slice(b+1),W=z.match(u);W&&(U.push(W[1]),H.unshift(W[2])),H.length&&(x=H.join(".")+x),this.hostname=U.join(".");break}}}}this.hostname.length>255&&(this.hostname=""),A&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}var F=x.indexOf("#");F!==-1&&(this.hash=x.substr(F),x=x.slice(0,F));var q=x.indexOf("?");return q!==-1&&(this.search=x.substr(q),x=x.slice(0,q)),x&&(this.pathname=x),p[y]&&this.hostname&&!this.pathname&&(this.pathname=""),this},e.prototype.parseHost=function(m){var g=n.exec(m);g&&((g=g[0])!==":"&&(this.port=g.substr(1)),m=m.substr(0,m.length-g.length)),m&&(this.hostname=m)},d.exports=function(m,g){if(m&&m instanceof e)return m;var b=new e;return b.parse(m,g),b}},function(d,_,a){_.Any=a(64),_.Cc=a(65),_.Cf=a(148),_.P=a(40),_.Z=a(66)},function(d,_){d.exports=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/},function(d,_,a){_.parseLinkLabel=a(150),_.parseLinkDestination=a(151),_.parseLinkTitle=a(152)},function(d,_,a){d.exports=function(e,t,n){var r,l,i,c,s=-1,o=e.posMax,u=e.pos;for(e.pos=t+1,r=1;e.pos<o;){if((i=e.src.charCodeAt(e.pos))===93&&--r===0){l=!0;break}if(c=e.pos,e.md.inline.skipToken(e),i===91){if(c===e.pos-1)r++;else if(n)return e.pos=u,-1}}return l&&(s=e.pos),e.pos=u,s}},function(d,_,a){var e=a(1).unescapeAll;d.exports=function(t,n,r){var l,i,c=n,s={ok:!1,pos:0,lines:0,str:""};if(t.charCodeAt(n)===60){for(n++;n<r;){if((l=t.charCodeAt(n))===10)return s;if(l===62)return s.pos=n+1,s.str=e(t.slice(c+1,n)),s.ok=!0,s;l===92&&n+1<r?n+=2:n++}return s}for(i=0;n<r&&(l=t.charCodeAt(n))!==32&&!(l<32||l===127);)if(l===92&&n+1<r)n+=2;else{if(l===40&&i++,l===41){if(i===0)break;i--}n++}return c===n||i!==0||(s.str=e(t.slice(c,n)),s.lines=0,s.pos=n,s.ok=!0),s}},function(d,_,a){var e=a(1).unescapeAll;d.exports=function(t,n,r){var l,i,c=0,s=n,o={ok:!1,pos:0,lines:0,str:""};if(n>=r||(i=t.charCodeAt(n))!==34&&i!==39&&i!==40)return o;for(n++,i===40&&(i=41);n<r;){if((l=t.charCodeAt(n))===i)return o.pos=n+1,o.lines=c,o.str=e(t.slice(s+1,n)),o.ok=!0,o;l===10?c++:l===92&&n+1<r&&(n++,t.charCodeAt(n)===10&&c++),n++}return o}},function(d,_,a){var e=a(1).assign,t=a(1).unescapeAll,n=a(1).escapeHtml,r={};function l(){this.rules=e({},r)}r.code_inline=function(i,c,s,o,u){var f=i[c];return"<code"+u.renderAttrs(f)+">"+n(i[c].content)+"</code>"},r.code_block=function(i,c,s,o,u){var f=i[c];return"<pre"+u.renderAttrs(f)+"><code>"+n(i[c].content)+`</code></pre>
`},r.fence=function(i,c,s,o,u){var f,p,m,g,b=i[c],w=b.info?t(b.info).trim():"",y="";return w&&(y=w.split(/\s+/g)[0]),(f=s.highlight&&s.highlight(b.content,y)||n(b.content)).indexOf("<pre")===0?f+`
`:w?(p=b.attrIndex("class"),m=b.attrs?b.attrs.slice():[],p<0?m.push(["class",s.langPrefix+y]):m[p][1]+=" "+s.langPrefix+y,g={attrs:m},"<pre><code"+u.renderAttrs(g)+">"+f+`</code></pre>
`):"<pre><code"+u.renderAttrs(b)+">"+f+`</code></pre>
`},r.image=function(i,c,s,o,u){var f=i[c];return f.attrs[f.attrIndex("alt")][1]=u.renderInlineAsText(f.children,s,o),u.renderToken(i,c,s)},r.hardbreak=function(i,c,s){return s.xhtmlOut?`<br />
`:`<br>
`},r.softbreak=function(i,c,s){return s.breaks?s.xhtmlOut?`<br />
`:`<br>
`:`
`},r.text=function(i,c){return n(i[c].content)},r.html_block=function(i,c){return i[c].content},r.html_inline=function(i,c){return i[c].content},l.prototype.renderAttrs=function(i){var c,s,o;if(!i.attrs)return"";for(o="",c=0,s=i.attrs.length;c<s;c++)o+=" "+n(i.attrs[c][0])+'="'+n(i.attrs[c][1])+'"';return o},l.prototype.renderToken=function(i,c,s){var o,u="",f=!1,p=i[c];return p.hidden?"":(p.block&&p.nesting!==-1&&c&&i[c-1].hidden&&(u+=`
`),u+=(p.nesting===-1?"</":"<")+p.tag,u+=this.renderAttrs(p),p.nesting===0&&s.xhtmlOut&&(u+=" /"),p.block&&(f=!0,p.nesting===1&&c+1<i.length&&((o=i[c+1]).type==="inline"||o.hidden||o.nesting===-1&&o.tag===p.tag)&&(f=!1)),u+=f?`>
`:">")},l.prototype.renderInline=function(i,c,s){for(var o,u="",f=this.rules,p=0,m=i.length;p<m;p++)f[o=i[p].type]!==void 0?u+=f[o](i,p,c,s,this):u+=this.renderToken(i,p,c);return u},l.prototype.renderInlineAsText=function(i,c,s){for(var o="",u=0,f=i.length;u<f;u++)i[u].type==="text"?o+=i[u].content:i[u].type==="image"&&(o+=this.renderInlineAsText(i[u].children,c,s));return o},l.prototype.render=function(i,c,s){var o,u,f,p="",m=this.rules;for(o=0,u=i.length;o<u;o++)(f=i[o].type)==="inline"?p+=this.renderInline(i[o].children,c,s):m[f]!==void 0?p+=m[i[o].type](i,o,c,s,this):p+=this.renderToken(i,o,c,s);return p},d.exports=l},function(d,_,a){var e=a(41),t=[["normalize",a(155)],["block",a(156)],["inline",a(157)],["linkify",a(158)],["replacements",a(159)],["smartquotes",a(160)]];function n(){this.ruler=new e;for(var r=0;r<t.length;r++)this.ruler.push(t[r][0],t[r][1])}n.prototype.process=function(r){var l,i,c;for(l=0,i=(c=this.ruler.getRules("")).length;l<i;l++)c[l](r)},n.prototype.State=a(161),d.exports=n},function(d,_,a){var e=/\r\n?|\n/g,t=/\0/g;d.exports=function(n){var r;r=(r=n.src.replace(e,`
`)).replace(t,"�"),n.src=r}},function(d,_,a){d.exports=function(e){var t;e.inlineMode?((t=new e.Token("inline","",0)).content=e.src,t.map=[0,1],t.children=[],e.tokens.push(t)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}},function(d,_,a){d.exports=function(e){var t,n,r,l=e.tokens;for(n=0,r=l.length;n<r;n++)(t=l[n]).type==="inline"&&e.md.inline.parse(t.content,e.md,e.env,t.children)}},function(d,_,a){var e=a(1).arrayReplaceAt;function t(n){return/^<\/a\s*>/i.test(n)}d.exports=function(n){var r,l,i,c,s,o,u,f,p,m,g,b,w,y,k,v,x,E,S=n.tokens;if(n.md.options.linkify){for(l=0,i=S.length;l<i;l++)if(S[l].type==="inline"&&n.md.linkify.pretest(S[l].content))for(w=0,r=(c=S[l].children).length-1;r>=0;r--)if((o=c[r]).type!=="link_close"){if(o.type==="html_inline"&&(E=o.content,/^<a[>\s]/i.test(E)&&w>0&&w--,t(o.content)&&w++),!(w>0)&&o.type==="text"&&n.md.linkify.test(o.content)){for(p=o.content,x=n.md.linkify.match(p),u=[],b=o.level,g=0,f=0;f<x.length;f++)y=x[f].url,k=n.md.normalizeLink(y),n.md.validateLink(k)&&(v=x[f].text,v=x[f].schema?x[f].schema!=="mailto:"||/^mailto:/i.test(v)?n.md.normalizeLinkText(v):n.md.normalizeLinkText("mailto:"+v).replace(/^mailto:/,""):n.md.normalizeLinkText("http://"+v).replace(/^http:\/\//,""),(m=x[f].index)>g&&((s=new n.Token("text","",0)).content=p.slice(g,m),s.level=b,u.push(s)),(s=new n.Token("link_open","a",1)).attrs=[["href",k]],s.level=b++,s.markup="linkify",s.info="auto",u.push(s),(s=new n.Token("text","",0)).content=v,s.level=b,u.push(s),(s=new n.Token("link_close","a",-1)).level=--b,s.markup="linkify",s.info="auto",u.push(s),g=x[f].lastIndex);g<p.length&&((s=new n.Token("text","",0)).content=p.slice(g),s.level=b,u.push(s)),S[l].children=c=e(c,r,u)}}else for(r--;c[r].level!==o.level&&c[r].type!=="link_open";)r--}}},function(d,_,a){var e=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,t=/\((c|tm|r|p)\)/i,n=/\((c|tm|r|p)\)/gi,r={c:"©",r:"®",p:"§",tm:"™"};function l(s,o){return r[o.toLowerCase()]}function i(s){var o,u,f=0;for(o=s.length-1;o>=0;o--)(u=s[o]).type!=="text"||f||(u.content=u.content.replace(n,l)),u.type==="link_open"&&u.info==="auto"&&f--,u.type==="link_close"&&u.info==="auto"&&f++}function c(s){var o,u,f=0;for(o=s.length-1;o>=0;o--)(u=s[o]).type!=="text"||f||e.test(u.content)&&(u.content=u.content.replace(/\+-/g,"±").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---([^-]|$)/gm,"$1—$2").replace(/(^|\s)--(\s|$)/gm,"$1–$2").replace(/(^|[^-\s])--([^-\s]|$)/gm,"$1–$2")),u.type==="link_open"&&u.info==="auto"&&f--,u.type==="link_close"&&u.info==="auto"&&f++}d.exports=function(s){var o;if(s.md.options.typographer)for(o=s.tokens.length-1;o>=0;o--)s.tokens[o].type==="inline"&&(t.test(s.tokens[o].content)&&i(s.tokens[o].children),e.test(s.tokens[o].content)&&c(s.tokens[o].children))}},function(d,_,a){var e=a(1).isWhiteSpace,t=a(1).isPunctChar,n=a(1).isMdAsciiPunct,r=/['"]/,l=/['"]/g;function i(s,o,u){return s.substr(0,o)+u+s.substr(o+1)}function c(s,o){var u,f,p,m,g,b,w,y,k,v,x,E,S,O,C,j,T,A,D,z,B;for(D=[],u=0;u<s.length;u++){for(f=s[u],w=s[u].level,T=D.length-1;T>=0&&!(D[T].level<=w);T--);if(D.length=T+1,f.type==="text"){g=0,b=(p=f.content).length;e:for(;g<b&&(l.lastIndex=g,m=l.exec(p));){if(C=j=!0,g=m.index+1,A=m[0]==="'",k=32,m.index-1>=0)k=p.charCodeAt(m.index-1);else for(T=u-1;T>=0&&s[T].type!=="softbreak"&&s[T].type!=="hardbreak";T--)if(s[T].type==="text"){k=s[T].content.charCodeAt(s[T].content.length-1);break}if(v=32,g<b)v=p.charCodeAt(g);else for(T=u+1;T<s.length&&s[T].type!=="softbreak"&&s[T].type!=="hardbreak";T++)if(s[T].type==="text"){v=s[T].content.charCodeAt(0);break}if(x=n(k)||t(String.fromCharCode(k)),E=n(v)||t(String.fromCharCode(v)),S=e(k),(O=e(v))?C=!1:E&&(S||x||(C=!1)),S?j=!1:x&&(O||E||(j=!1)),v===34&&m[0]==='"'&&k>=48&&k<=57&&(j=C=!1),C&&j&&(C=!1,j=E),C||j){if(j){for(T=D.length-1;T>=0&&(y=D[T],!(D[T].level<w));T--)if(y.single===A&&D[T].level===w){y=D[T],A?(z=o.md.options.quotes[2],B=o.md.options.quotes[3]):(z=o.md.options.quotes[0],B=o.md.options.quotes[1]),f.content=i(f.content,m.index,B),s[y.token].content=i(s[y.token].content,y.pos,z),g+=B.length-1,y.token===u&&(g+=z.length-1),b=(p=f.content).length,D.length=T;continue e}}C?D.push({token:u,pos:m.index,single:A,level:w}):j&&A&&(f.content=i(f.content,m.index,"’"))}else A&&(f.content=i(f.content,m.index,"’"))}}}}d.exports=function(s){var o;if(s.md.options.typographer)for(o=s.tokens.length-1;o>=0;o--)s.tokens[o].type==="inline"&&r.test(s.tokens[o].content)&&c(s.tokens[o].children,s)}},function(d,_,a){var e=a(42);function t(n,r,l){this.src=n,this.env=l,this.tokens=[],this.inlineMode=!1,this.md=r}t.prototype.Token=e,d.exports=t},function(d,_,a){var e=a(41),t=[["table",a(163),["paragraph","reference"]],["code",a(164)],["fence",a(165),["paragraph","reference","blockquote","list"]],["blockquote",a(166),["paragraph","reference","blockquote","list"]],["hr",a(167),["paragraph","reference","blockquote","list"]],["list",a(168),["paragraph","reference","blockquote"]],["reference",a(169)],["heading",a(170),["paragraph","reference","blockquote"]],["lheading",a(171)],["html_block",a(172),["paragraph","reference","blockquote"]],["paragraph",a(174)]];function n(){this.ruler=new e;for(var r=0;r<t.length;r++)this.ruler.push(t[r][0],t[r][1],{alt:(t[r][2]||[]).slice()})}n.prototype.tokenize=function(r,l,i){for(var c,s=this.ruler.getRules(""),o=s.length,u=l,f=!1,p=r.md.options.maxNesting;u<i&&(r.line=u=r.skipEmptyLines(u),!(u>=i))&&!(r.sCount[u]<r.blkIndent);){if(r.level>=p){r.line=i;break}for(c=0;c<o&&!s[c](r,u,i,!1);c++);r.tight=!f,r.isEmpty(r.line-1)&&(f=!0),(u=r.line)<i&&r.isEmpty(u)&&(f=!0,u++,r.line=u)}},n.prototype.parse=function(r,l,i,c){var s;r&&(s=new this.State(r,l,i,c),this.tokenize(s,s.line,s.lineMax))},n.prototype.State=a(175),d.exports=n},function(d,_,a){var e=a(1).isSpace;function t(r,l){var i=r.bMarks[l]+r.blkIndent,c=r.eMarks[l];return r.src.substr(i,c-i)}function n(r){var l,i=[],c=0,s=r.length,o=0,u=0,f=!1,p=0;for(l=r.charCodeAt(c);c<s;)l===96?f?(f=!1,p=c):o%2==0&&(f=!0,p=c):l!==124||o%2!=0||f||(i.push(r.substring(u,c)),u=c+1),l===92?o++:o=0,++c===s&&f&&(f=!1,c=p+1),l=r.charCodeAt(c);return i.push(r.substring(u)),i}d.exports=function(r,l,i,c){var s,o,u,f,p,m,g,b,w,y,k,v;if(l+2>i||(p=l+1,r.sCount[p]<r.blkIndent)||r.sCount[p]-r.blkIndent>=4||(u=r.bMarks[p]+r.tShift[p])>=r.eMarks[p]||(s=r.src.charCodeAt(u++))!==124&&s!==45&&s!==58)return!1;for(;u<r.eMarks[p];){if((s=r.src.charCodeAt(u))!==124&&s!==45&&s!==58&&!e(s))return!1;u++}for(m=(o=t(r,l+1)).split("|"),w=[],f=0;f<m.length;f++){if(!(y=m[f].trim())){if(f===0||f===m.length-1)continue;return!1}if(!/^:?-+:?$/.test(y))return!1;y.charCodeAt(y.length-1)===58?w.push(y.charCodeAt(0)===58?"center":"right"):y.charCodeAt(0)===58?w.push("left"):w.push("")}if((o=t(r,l).trim()).indexOf("|")===-1||r.sCount[l]-r.blkIndent>=4||(g=(m=n(o.replace(/^\||\|$/g,""))).length)>w.length)return!1;if(c)return!0;for((b=r.push("table_open","table",1)).map=k=[l,0],(b=r.push("thead_open","thead",1)).map=[l,l+1],(b=r.push("tr_open","tr",1)).map=[l,l+1],f=0;f<m.length;f++)(b=r.push("th_open","th",1)).map=[l,l+1],w[f]&&(b.attrs=[["style","text-align:"+w[f]]]),(b=r.push("inline","",0)).content=m[f].trim(),b.map=[l,l+1],b.children=[],b=r.push("th_close","th",-1);for(b=r.push("tr_close","tr",-1),b=r.push("thead_close","thead",-1),(b=r.push("tbody_open","tbody",1)).map=v=[l+2,0],p=l+2;p<i&&!(r.sCount[p]<r.blkIndent)&&(o=t(r,p).trim()).indexOf("|")!==-1&&!(r.sCount[p]-r.blkIndent>=4);p++){for(m=n(o.replace(/^\||\|$/g,"")),b=r.push("tr_open","tr",1),f=0;f<g;f++)b=r.push("td_open","td",1),w[f]&&(b.attrs=[["style","text-align:"+w[f]]]),(b=r.push("inline","",0)).content=m[f]?m[f].trim():"",b.children=[],b=r.push("td_close","td",-1);b=r.push("tr_close","tr",-1)}return b=r.push("tbody_close","tbody",-1),b=r.push("table_close","table",-1),k[1]=v[1]=p,r.line=p,!0}},function(d,_,a){d.exports=function(e,t,n){var r,l,i;if(e.sCount[t]-e.blkIndent<4)return!1;for(l=r=t+1;r<n;)if(e.isEmpty(r))r++;else{if(!(e.sCount[r]-e.blkIndent>=4))break;l=++r}return e.line=l,(i=e.push("code_block","code",0)).content=e.getLines(t,l,4+e.blkIndent,!0),i.map=[t,e.line],!0}},function(d,_,a){d.exports=function(e,t,n,r){var l,i,c,s,o,u,f,p=!1,m=e.bMarks[t]+e.tShift[t],g=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||m+3>g||(l=e.src.charCodeAt(m))!==126&&l!==96||(o=m,(i=(m=e.skipChars(m,l))-o)<3)||(f=e.src.slice(o,m),c=e.src.slice(m,g),l===96&&c.indexOf(String.fromCharCode(l))>=0))return!1;if(r)return!0;for(s=t;!(++s>=n)&&!((m=o=e.bMarks[s]+e.tShift[s])<(g=e.eMarks[s])&&e.sCount[s]<e.blkIndent);)if(e.src.charCodeAt(m)===l&&!(e.sCount[s]-e.blkIndent>=4||(m=e.skipChars(m,l))-o<i||(m=e.skipSpaces(m))<g)){p=!0;break}return i=e.sCount[t],e.line=s+(p?1:0),(u=e.push("fence","code",0)).info=c,u.content=e.getLines(t+1,s,i,!0),u.markup=f,u.map=[t,e.line],!0}},function(d,_,a){var e=a(1).isSpace;d.exports=function(t,n,r,l){var i,c,s,o,u,f,p,m,g,b,w,y,k,v,x,E,S,O,C,j,T=t.lineMax,A=t.bMarks[n]+t.tShift[n],D=t.eMarks[n];if(t.sCount[n]-t.blkIndent>=4||t.src.charCodeAt(A++)!==62)return!1;if(l)return!0;for(o=g=t.sCount[n]+A-(t.bMarks[n]+t.tShift[n]),t.src.charCodeAt(A)===32?(A++,o++,g++,i=!1,E=!0):t.src.charCodeAt(A)===9?(E=!0,(t.bsCount[n]+g)%4==3?(A++,o++,g++,i=!1):i=!0):E=!1,b=[t.bMarks[n]],t.bMarks[n]=A;A<D&&(c=t.src.charCodeAt(A),e(c));)c===9?g+=4-(g+t.bsCount[n]+(i?1:0))%4:g++,A++;for(w=[t.bsCount[n]],t.bsCount[n]=t.sCount[n]+1+(E?1:0),f=A>=D,v=[t.sCount[n]],t.sCount[n]=g-o,x=[t.tShift[n]],t.tShift[n]=A-t.bMarks[n],O=t.md.block.ruler.getRules("blockquote"),k=t.parentType,t.parentType="blockquote",j=!1,m=n+1;m<r&&(t.sCount[m]<t.blkIndent&&(j=!0),!((A=t.bMarks[m]+t.tShift[m])>=(D=t.eMarks[m])));m++)if(t.src.charCodeAt(A++)!==62||j){if(f)break;for(S=!1,s=0,u=O.length;s<u;s++)if(O[s](t,m,r,!0)){S=!0;break}if(S){t.lineMax=m,t.blkIndent!==0&&(b.push(t.bMarks[m]),w.push(t.bsCount[m]),x.push(t.tShift[m]),v.push(t.sCount[m]),t.sCount[m]-=t.blkIndent);break}b.push(t.bMarks[m]),w.push(t.bsCount[m]),x.push(t.tShift[m]),v.push(t.sCount[m]),t.sCount[m]=-1}else{for(o=g=t.sCount[m]+A-(t.bMarks[m]+t.tShift[m]),t.src.charCodeAt(A)===32?(A++,o++,g++,i=!1,E=!0):t.src.charCodeAt(A)===9?(E=!0,(t.bsCount[m]+g)%4==3?(A++,o++,g++,i=!1):i=!0):E=!1,b.push(t.bMarks[m]),t.bMarks[m]=A;A<D&&(c=t.src.charCodeAt(A),e(c));)c===9?g+=4-(g+t.bsCount[m]+(i?1:0))%4:g++,A++;f=A>=D,w.push(t.bsCount[m]),t.bsCount[m]=t.sCount[m]+1+(E?1:0),v.push(t.sCount[m]),t.sCount[m]=g-o,x.push(t.tShift[m]),t.tShift[m]=A-t.bMarks[m]}for(y=t.blkIndent,t.blkIndent=0,(C=t.push("blockquote_open","blockquote",1)).markup=">",C.map=p=[n,0],t.md.block.tokenize(t,n,m),(C=t.push("blockquote_close","blockquote",-1)).markup=">",t.lineMax=T,t.parentType=k,p[1]=t.line,s=0;s<x.length;s++)t.bMarks[s+n]=b[s],t.tShift[s+n]=x[s],t.sCount[s+n]=v[s],t.bsCount[s+n]=w[s];return t.blkIndent=y,!0}},function(d,_,a){var e=a(1).isSpace;d.exports=function(t,n,r,l){var i,c,s,o,u=t.bMarks[n]+t.tShift[n],f=t.eMarks[n];if(t.sCount[n]-t.blkIndent>=4||(i=t.src.charCodeAt(u++))!==42&&i!==45&&i!==95)return!1;for(c=1;u<f;){if((s=t.src.charCodeAt(u++))!==i&&!e(s))return!1;s===i&&c++}return!(c<3)&&(l||(t.line=n+1,(o=t.push("hr","hr",0)).map=[n,t.line],o.markup=Array(c+1).join(String.fromCharCode(i))),!0)}},function(d,_,a){var e=a(1).isSpace;function t(r,l){var i,c,s,o;return c=r.bMarks[l]+r.tShift[l],s=r.eMarks[l],(i=r.src.charCodeAt(c++))!==42&&i!==45&&i!==43||c<s&&(o=r.src.charCodeAt(c),!e(o))?-1:c}function n(r,l){var i,c=r.bMarks[l]+r.tShift[l],s=c,o=r.eMarks[l];if(s+1>=o||(i=r.src.charCodeAt(s++))<48||i>57)return-1;for(;;){if(s>=o)return-1;if(!((i=r.src.charCodeAt(s++))>=48&&i<=57)){if(i===41||i===46)break;return-1}if(s-c>=10)return-1}return s<o&&(i=r.src.charCodeAt(s),!e(i))?-1:s}d.exports=function(r,l,i,c){var s,o,u,f,p,m,g,b,w,y,k,v,x,E,S,O,C,j,T,A,D,z,B,N,R,U,H,W,F=!1,q=!0;if(r.sCount[l]-r.blkIndent>=4||r.listIndent>=0&&r.sCount[l]-r.listIndent>=4&&r.sCount[l]<r.blkIndent)return!1;if(c&&r.parentType==="paragraph"&&r.tShift[l]>=r.blkIndent&&(F=!0),(B=n(r,l))>=0){if(g=!0,R=r.bMarks[l]+r.tShift[l],x=Number(r.src.substr(R,B-R-1)),F&&x!==1)return!1}else{if(!((B=t(r,l))>=0))return!1;g=!1}if(F&&r.skipSpaces(B)>=r.eMarks[l])return!1;if(v=r.src.charCodeAt(B-1),c)return!0;for(k=r.tokens.length,g?(W=r.push("ordered_list_open","ol",1),x!==1&&(W.attrs=[["start",x]])):W=r.push("bullet_list_open","ul",1),W.map=y=[l,0],W.markup=String.fromCharCode(v),S=l,N=!1,H=r.md.block.ruler.getRules("list"),j=r.parentType,r.parentType="list";S<i;){for(z=B,E=r.eMarks[S],m=O=r.sCount[S]+B-(r.bMarks[l]+r.tShift[l]);z<E;){if((s=r.src.charCodeAt(z))===9)O+=4-(O+r.bsCount[S])%4;else{if(s!==32)break;O++}z++}if((p=(o=z)>=E?1:O-m)>4&&(p=1),f=m+p,(W=r.push("list_item_open","li",1)).markup=String.fromCharCode(v),W.map=b=[l,0],D=r.tight,A=r.tShift[l],T=r.sCount[l],C=r.listIndent,r.listIndent=r.blkIndent,r.blkIndent=f,r.tight=!0,r.tShift[l]=o-r.bMarks[l],r.sCount[l]=O,o>=E&&r.isEmpty(l+1)?r.line=Math.min(r.line+2,i):r.md.block.tokenize(r,l,i,!0),r.tight&&!N||(q=!1),N=r.line-l>1&&r.isEmpty(r.line-1),r.blkIndent=r.listIndent,r.listIndent=C,r.tShift[l]=A,r.sCount[l]=T,r.tight=D,(W=r.push("list_item_close","li",-1)).markup=String.fromCharCode(v),S=l=r.line,b[1]=S,o=r.bMarks[l],S>=i||r.sCount[S]<r.blkIndent||r.sCount[l]-r.blkIndent>=4)break;for(U=!1,u=0,w=H.length;u<w;u++)if(H[u](r,S,i,!0)){U=!0;break}if(U)break;if(g){if((B=n(r,S))<0)break}else if((B=t(r,S))<0)break;if(v!==r.src.charCodeAt(B-1))break}return(W=g?r.push("ordered_list_close","ol",-1):r.push("bullet_list_close","ul",-1)).markup=String.fromCharCode(v),y[1]=S,r.line=S,r.parentType=j,q&&function(G,X){var Z,Y,M=G.level+2;for(Z=X+2,Y=G.tokens.length-2;Z<Y;Z++)G.tokens[Z].level===M&&G.tokens[Z].type==="paragraph_open"&&(G.tokens[Z+2].hidden=!0,G.tokens[Z].hidden=!0,Z+=2)}(r,k),!0}},function(d,_,a){var e=a(1).normalizeReference,t=a(1).isSpace;d.exports=function(n,r,l,i){var c,s,o,u,f,p,m,g,b,w,y,k,v,x,E,S,O=0,C=n.bMarks[r]+n.tShift[r],j=n.eMarks[r],T=r+1;if(n.sCount[r]-n.blkIndent>=4||n.src.charCodeAt(C)!==91)return!1;for(;++C<j;)if(n.src.charCodeAt(C)===93&&n.src.charCodeAt(C-1)!==92){if(C+1===j||n.src.charCodeAt(C+1)!==58)return!1;break}for(u=n.lineMax,E=n.md.block.ruler.getRules("reference"),w=n.parentType,n.parentType="reference";T<u&&!n.isEmpty(T);T++)if(!(n.sCount[T]-n.blkIndent>3||n.sCount[T]<0)){for(x=!1,p=0,m=E.length;p<m;p++)if(E[p](n,T,u,!0)){x=!0;break}if(x)break}for(j=(v=n.getLines(r,T,n.blkIndent,!1).trim()).length,C=1;C<j;C++){if((c=v.charCodeAt(C))===91)return!1;if(c===93){b=C;break}(c===10||c===92&&++C<j&&v.charCodeAt(C)===10)&&O++}if(b<0||v.charCodeAt(b+1)!==58)return!1;for(C=b+2;C<j;C++)if((c=v.charCodeAt(C))===10)O++;else if(!t(c))break;if(!(y=n.md.helpers.parseLinkDestination(v,C,j)).ok||(f=n.md.normalizeLink(y.str),!n.md.validateLink(f)))return!1;for(s=C=y.pos,o=O+=y.lines,k=C;C<j;C++)if((c=v.charCodeAt(C))===10)O++;else if(!t(c))break;for(y=n.md.helpers.parseLinkTitle(v,C,j),C<j&&k!==C&&y.ok?(S=y.str,C=y.pos,O+=y.lines):(S="",C=s,O=o);C<j&&(c=v.charCodeAt(C),t(c));)C++;if(C<j&&v.charCodeAt(C)!==10&&S)for(S="",C=s,O=o;C<j&&(c=v.charCodeAt(C),t(c));)C++;return!(C<j&&v.charCodeAt(C)!==10)&&!!(g=e(v.slice(1,b)))&&(i||(n.env.references===void 0&&(n.env.references={}),n.env.references[g]===void 0&&(n.env.references[g]={title:S,href:f}),n.parentType=w,n.line=r+O+1),!0)}},function(d,_,a){var e=a(1).isSpace;d.exports=function(t,n,r,l){var i,c,s,o,u=t.bMarks[n]+t.tShift[n],f=t.eMarks[n];if(t.sCount[n]-t.blkIndent>=4||(i=t.src.charCodeAt(u))!==35||u>=f)return!1;for(c=1,i=t.src.charCodeAt(++u);i===35&&u<f&&c<=6;)c++,i=t.src.charCodeAt(++u);return!(c>6||u<f&&!e(i))&&(l||(f=t.skipSpacesBack(f,u),(s=t.skipCharsBack(f,35,u))>u&&e(t.src.charCodeAt(s-1))&&(f=s),t.line=n+1,(o=t.push("heading_open","h"+String(c),1)).markup="########".slice(0,c),o.map=[n,t.line],(o=t.push("inline","",0)).content=t.src.slice(u,f).trim(),o.map=[n,t.line],o.children=[],(o=t.push("heading_close","h"+String(c),-1)).markup="########".slice(0,c)),!0)}},function(d,_,a){d.exports=function(e,t,n){var r,l,i,c,s,o,u,f,p,m,g=t+1,b=e.md.block.ruler.getRules("paragraph");if(e.sCount[t]-e.blkIndent>=4)return!1;for(m=e.parentType,e.parentType="paragraph";g<n&&!e.isEmpty(g);g++)if(!(e.sCount[g]-e.blkIndent>3)){if(e.sCount[g]>=e.blkIndent&&(o=e.bMarks[g]+e.tShift[g])<(u=e.eMarks[g])&&((p=e.src.charCodeAt(o))===45||p===61)&&(o=e.skipChars(o,p),(o=e.skipSpaces(o))>=u)){f=p===61?1:2;break}if(!(e.sCount[g]<0)){for(l=!1,i=0,c=b.length;i<c;i++)if(b[i](e,g,n,!0)){l=!0;break}if(l)break}}return!!f&&(r=e.getLines(t,g,e.blkIndent,!1).trim(),e.line=g+1,(s=e.push("heading_open","h"+String(f),1)).markup=String.fromCharCode(p),s.map=[t,e.line],(s=e.push("inline","",0)).content=r,s.map=[t,e.line-1],s.children=[],(s=e.push("heading_close","h"+String(f),-1)).markup=String.fromCharCode(p),e.parentType=m,!0)}},function(d,_,a){var e=a(173),t=a(67).HTML_OPEN_CLOSE_TAG_RE,n=[[/^<(script|pre|style)(?=(\s|>|$))/i,/<\/(script|pre|style)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[new RegExp("^</?("+e.join("|")+")(?=(\\s|/?>|$))","i"),/^$/,!0],[new RegExp(t.source+"\\s*$"),/^$/,!1]];d.exports=function(r,l,i,c){var s,o,u,f,p=r.bMarks[l]+r.tShift[l],m=r.eMarks[l];if(r.sCount[l]-r.blkIndent>=4||!r.md.options.html||r.src.charCodeAt(p)!==60)return!1;for(f=r.src.slice(p,m),s=0;s<n.length&&!n[s][0].test(f);s++);if(s===n.length)return!1;if(c)return n[s][2];if(o=l+1,!n[s][1].test(f)){for(;o<i&&!(r.sCount[o]<r.blkIndent);o++)if(p=r.bMarks[o]+r.tShift[o],m=r.eMarks[o],f=r.src.slice(p,m),n[s][1].test(f)){f.length!==0&&o++;break}}return r.line=o,(u=r.push("html_block","",0)).map=[l,o],u.content=r.getLines(l,o,r.blkIndent,!0),!0}},function(d,_,a){d.exports=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","meta","nav","noframes","ol","optgroup","option","p","param","section","source","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"]},function(d,_,a){d.exports=function(e,t){var n,r,l,i,c,s,o=t+1,u=e.md.block.ruler.getRules("paragraph"),f=e.lineMax;for(s=e.parentType,e.parentType="paragraph";o<f&&!e.isEmpty(o);o++)if(!(e.sCount[o]-e.blkIndent>3||e.sCount[o]<0)){for(r=!1,l=0,i=u.length;l<i;l++)if(u[l](e,o,f,!0)){r=!0;break}if(r)break}return n=e.getLines(t,o,e.blkIndent,!1).trim(),e.line=o,(c=e.push("paragraph_open","p",1)).map=[t,e.line],(c=e.push("inline","",0)).content=n,c.map=[t,e.line],c.children=[],c=e.push("paragraph_close","p",-1),e.parentType=s,!0}},function(d,_,a){var e=a(42),t=a(1).isSpace;function n(r,l,i,c){var s,o,u,f,p,m,g,b;for(this.src=r,this.md=l,this.env=i,this.tokens=c,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0,this.result="",b=!1,u=f=m=g=0,p=(o=this.src).length;f<p;f++){if(s=o.charCodeAt(f),!b){if(t(s)){m++,s===9?g+=4-g%4:g++;continue}b=!0}s!==10&&f!==p-1||(s!==10&&f++,this.bMarks.push(u),this.eMarks.push(f),this.tShift.push(m),this.sCount.push(g),this.bsCount.push(0),b=!1,m=0,g=0,u=f+1)}this.bMarks.push(o.length),this.eMarks.push(o.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}n.prototype.push=function(r,l,i){var c=new e(r,l,i);return c.block=!0,i<0&&this.level--,c.level=this.level,i>0&&this.level++,this.tokens.push(c),c},n.prototype.isEmpty=function(r){return this.bMarks[r]+this.tShift[r]>=this.eMarks[r]},n.prototype.skipEmptyLines=function(r){for(var l=this.lineMax;r<l&&!(this.bMarks[r]+this.tShift[r]<this.eMarks[r]);r++);return r},n.prototype.skipSpaces=function(r){for(var l,i=this.src.length;r<i&&(l=this.src.charCodeAt(r),t(l));r++);return r},n.prototype.skipSpacesBack=function(r,l){if(r<=l)return r;for(;r>l;)if(!t(this.src.charCodeAt(--r)))return r+1;return r},n.prototype.skipChars=function(r,l){for(var i=this.src.length;r<i&&this.src.charCodeAt(r)===l;r++);return r},n.prototype.skipCharsBack=function(r,l,i){if(r<=i)return r;for(;r>i;)if(l!==this.src.charCodeAt(--r))return r+1;return r},n.prototype.getLines=function(r,l,i,c){var s,o,u,f,p,m,g,b=r;if(r>=l)return"";for(m=new Array(l-r),s=0;b<l;b++,s++){for(o=0,g=f=this.bMarks[b],p=b+1<l||c?this.eMarks[b]+1:this.eMarks[b];f<p&&o<i;){if(u=this.src.charCodeAt(f),t(u))u===9?o+=4-(o+this.bsCount[b])%4:o++;else{if(!(f-g<this.tShift[b]))break;o++}f++}m[s]=o>i?new Array(o-i+1).join(" ")+this.src.slice(f,p):this.src.slice(f,p)}return m.join("")},n.prototype.Token=e,d.exports=n},function(d,_,a){var e=a(41),t=[["text",a(177)],["newline",a(178)],["escape",a(179)],["backticks",a(180)],["strikethrough",a(68).tokenize],["emphasis",a(69).tokenize],["link",a(181)],["image",a(182)],["autolink",a(183)],["html_inline",a(184)],["entity",a(185)]],n=[["balance_pairs",a(186)],["strikethrough",a(68).postProcess],["emphasis",a(69).postProcess],["text_collapse",a(187)]];function r(){var l;for(this.ruler=new e,l=0;l<t.length;l++)this.ruler.push(t[l][0],t[l][1]);for(this.ruler2=new e,l=0;l<n.length;l++)this.ruler2.push(n[l][0],n[l][1])}r.prototype.skipToken=function(l){var i,c,s=l.pos,o=this.ruler.getRules(""),u=o.length,f=l.md.options.maxNesting,p=l.cache;if(p[s]===void 0){if(l.level<f)for(c=0;c<u&&(l.level++,i=o[c](l,!0),l.level--,!i);c++);else l.pos=l.posMax;i||l.pos++,p[s]=l.pos}else l.pos=p[s]},r.prototype.tokenize=function(l){for(var i,c,s=this.ruler.getRules(""),o=s.length,u=l.posMax,f=l.md.options.maxNesting;l.pos<u;){if(l.level<f)for(c=0;c<o&&!(i=s[c](l,!1));c++);if(i){if(l.pos>=u)break}else l.pending+=l.src[l.pos++]}l.pending&&l.pushPending()},r.prototype.parse=function(l,i,c,s){var o,u,f,p=new this.State(l,i,c,s);for(this.tokenize(p),f=(u=this.ruler2.getRules("")).length,o=0;o<f;o++)u[o](p)},r.prototype.State=a(188),d.exports=r},function(d,_,a){function e(t){switch(t){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}d.exports=function(t,n){for(var r=t.pos;r<t.posMax&&!e(t.src.charCodeAt(r));)r++;return r!==t.pos&&(n||(t.pending+=t.src.slice(t.pos,r)),t.pos=r,!0)}},function(d,_,a){var e=a(1).isSpace;d.exports=function(t,n){var r,l,i=t.pos;if(t.src.charCodeAt(i)!==10)return!1;for(r=t.pending.length-1,l=t.posMax,n||(r>=0&&t.pending.charCodeAt(r)===32?r>=1&&t.pending.charCodeAt(r-1)===32?(t.pending=t.pending.replace(/ +$/,""),t.push("hardbreak","br",0)):(t.pending=t.pending.slice(0,-1),t.push("softbreak","br",0)):t.push("softbreak","br",0)),i++;i<l&&e(t.src.charCodeAt(i));)i++;return t.pos=i,!0}},function(d,_,a){for(var e=a(1).isSpace,t=[],n=0;n<256;n++)t.push(0);"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(r){t[r.charCodeAt(0)]=1}),d.exports=function(r,l){var i,c=r.pos,s=r.posMax;if(r.src.charCodeAt(c)!==92)return!1;if(++c<s){if((i=r.src.charCodeAt(c))<256&&t[i]!==0)return l||(r.pending+=r.src[c]),r.pos+=2,!0;if(i===10){for(l||r.push("hardbreak","br",0),c++;c<s&&(i=r.src.charCodeAt(c),e(i));)c++;return r.pos=c,!0}}return l||(r.pending+="\\"),r.pos++,!0}},function(d,_,a){d.exports=function(e,t){var n,r,l,i,c,s,o=e.pos;if(e.src.charCodeAt(o)!==96)return!1;for(n=o,o++,r=e.posMax;o<r&&e.src.charCodeAt(o)===96;)o++;for(l=e.src.slice(n,o),i=c=o;(i=e.src.indexOf("`",c))!==-1;){for(c=i+1;c<r&&e.src.charCodeAt(c)===96;)c++;if(c-i===l.length)return t||((s=e.push("code_inline","code",0)).markup=l,s.content=e.src.slice(o,i).replace(/\n/g," ").replace(/^ (.+) $/,"$1")),e.pos=c,!0}return t||(e.pending+=l),e.pos+=l.length,!0}},function(d,_,a){var e=a(1).normalizeReference,t=a(1).isSpace;d.exports=function(n,r){var l,i,c,s,o,u,f,p,m,g="",b=n.pos,w=n.posMax,y=n.pos,k=!0;if(n.src.charCodeAt(n.pos)!==91||(o=n.pos+1,(s=n.md.helpers.parseLinkLabel(n,n.pos,!0))<0))return!1;if((u=s+1)<w&&n.src.charCodeAt(u)===40){for(k=!1,u++;u<w&&(i=n.src.charCodeAt(u),t(i)||i===10);u++);if(u>=w)return!1;for(y=u,(f=n.md.helpers.parseLinkDestination(n.src,u,n.posMax)).ok&&(g=n.md.normalizeLink(f.str),n.md.validateLink(g)?u=f.pos:g=""),y=u;u<w&&(i=n.src.charCodeAt(u),t(i)||i===10);u++);if(f=n.md.helpers.parseLinkTitle(n.src,u,n.posMax),u<w&&y!==u&&f.ok)for(m=f.str,u=f.pos;u<w&&(i=n.src.charCodeAt(u),t(i)||i===10);u++);else m="";(u>=w||n.src.charCodeAt(u)!==41)&&(k=!0),u++}if(k){if(n.env.references===void 0)return!1;if(u<w&&n.src.charCodeAt(u)===91?(y=u+1,(u=n.md.helpers.parseLinkLabel(n,u))>=0?c=n.src.slice(y,u++):u=s+1):u=s+1,c||(c=n.src.slice(o,s)),!(p=n.env.references[e(c)]))return n.pos=b,!1;g=p.href,m=p.title}return r||(n.pos=o,n.posMax=s,n.push("link_open","a",1).attrs=l=[["href",g]],m&&l.push(["title",m]),n.md.inline.tokenize(n),n.push("link_close","a",-1)),n.pos=u,n.posMax=w,!0}},function(d,_,a){var e=a(1).normalizeReference,t=a(1).isSpace;d.exports=function(n,r){var l,i,c,s,o,u,f,p,m,g,b,w,y,k="",v=n.pos,x=n.posMax;if(n.src.charCodeAt(n.pos)!==33||n.src.charCodeAt(n.pos+1)!==91||(u=n.pos+2,(o=n.md.helpers.parseLinkLabel(n,n.pos+1,!1))<0))return!1;if((f=o+1)<x&&n.src.charCodeAt(f)===40){for(f++;f<x&&(i=n.src.charCodeAt(f),t(i)||i===10);f++);if(f>=x)return!1;for(y=f,(m=n.md.helpers.parseLinkDestination(n.src,f,n.posMax)).ok&&(k=n.md.normalizeLink(m.str),n.md.validateLink(k)?f=m.pos:k=""),y=f;f<x&&(i=n.src.charCodeAt(f),t(i)||i===10);f++);if(m=n.md.helpers.parseLinkTitle(n.src,f,n.posMax),f<x&&y!==f&&m.ok)for(g=m.str,f=m.pos;f<x&&(i=n.src.charCodeAt(f),t(i)||i===10);f++);else g="";if(f>=x||n.src.charCodeAt(f)!==41)return n.pos=v,!1;f++}else{if(n.env.references===void 0)return!1;if(f<x&&n.src.charCodeAt(f)===91?(y=f+1,(f=n.md.helpers.parseLinkLabel(n,f))>=0?s=n.src.slice(y,f++):f=o+1):f=o+1,s||(s=n.src.slice(u,o)),!(p=n.env.references[e(s)]))return n.pos=v,!1;k=p.href,g=p.title}return r||(c=n.src.slice(u,o),n.md.inline.parse(c,n.md,n.env,w=[]),(b=n.push("image","img",0)).attrs=l=[["src",k],["alt",""]],b.children=w,b.content=c,g&&l.push(["title",g])),n.pos=f,n.posMax=x,!0}},function(d,_,a){var e=/^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/,t=/^<([a-zA-Z][a-zA-Z0-9+.\-]{1,31}):([^<>\x00-\x20]*)>/;d.exports=function(n,r){var l,i,c,s,o,u,f=n.pos;return n.src.charCodeAt(f)===60&&!((l=n.src.slice(f)).indexOf(">")<0)&&(t.test(l)?(s=(i=l.match(t))[0].slice(1,-1),o=n.md.normalizeLink(s),!!n.md.validateLink(o)&&(r||((u=n.push("link_open","a",1)).attrs=[["href",o]],u.markup="autolink",u.info="auto",(u=n.push("text","",0)).content=n.md.normalizeLinkText(s),(u=n.push("link_close","a",-1)).markup="autolink",u.info="auto"),n.pos+=i[0].length,!0)):!!e.test(l)&&(s=(c=l.match(e))[0].slice(1,-1),o=n.md.normalizeLink("mailto:"+s),!!n.md.validateLink(o)&&(r||((u=n.push("link_open","a",1)).attrs=[["href",o]],u.markup="autolink",u.info="auto",(u=n.push("text","",0)).content=n.md.normalizeLinkText(s),(u=n.push("link_close","a",-1)).markup="autolink",u.info="auto"),n.pos+=c[0].length,!0)))}},function(d,_,a){var e=a(67).HTML_TAG_RE;d.exports=function(t,n){var r,l,i,c=t.pos;return!!t.md.options.html&&(i=t.posMax,!(t.src.charCodeAt(c)!==60||c+2>=i)&&!((r=t.src.charCodeAt(c+1))!==33&&r!==63&&r!==47&&!function(s){var o=32|s;return o>=97&&o<=122}(r))&&!!(l=t.src.slice(c).match(e))&&(n||(t.push("html_inline","",0).content=t.src.slice(c,c+l[0].length)),t.pos+=l[0].length,!0))}},function(d,_,a){var e=a(62),t=a(1).has,n=a(1).isValidEntityCode,r=a(1).fromCodePoint,l=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,i=/^&([a-z][a-z0-9]{1,31});/i;d.exports=function(c,s){var o,u,f=c.pos,p=c.posMax;if(c.src.charCodeAt(f)!==38)return!1;if(f+1<p){if(c.src.charCodeAt(f+1)===35){if(u=c.src.slice(f).match(l))return s||(o=u[1][0].toLowerCase()==="x"?parseInt(u[1].slice(1),16):parseInt(u[1],10),c.pending+=n(o)?r(o):r(65533)),c.pos+=u[0].length,!0}else if((u=c.src.slice(f).match(i))&&t(e,u[1]))return s||(c.pending+=e[u[1]]),c.pos+=u[0].length,!0}return s||(c.pending+="&"),c.pos++,!0}},function(d,_,a){function e(t,n){var r,l,i,c,s,o,u,f,p={},m=n.length;for(r=0;r<m;r++)if((i=n[r]).length=i.length||0,i.close){for(p.hasOwnProperty(i.marker)||(p[i.marker]=[-1,-1,-1]),s=p[i.marker][i.length%3],o=-1,l=r-i.jump-1;l>s;l-=c.jump+1)if((c=n[l]).marker===i.marker&&(o===-1&&(o=l),c.open&&c.end<0&&c.level===i.level&&(u=!1,(c.close||i.open)&&(c.length+i.length)%3==0&&(c.length%3==0&&i.length%3==0||(u=!0)),!u))){f=l>0&&!n[l-1].open?n[l-1].jump+1:0,i.jump=r-l+f,i.open=!1,c.end=r,c.jump=f,c.close=!1,o=-1;break}o!==-1&&(p[i.marker][(i.length||0)%3]=o)}}d.exports=function(t){var n,r=t.tokens_meta,l=t.tokens_meta.length;for(e(0,t.delimiters),n=0;n<l;n++)r[n]&&r[n].delimiters&&e(0,r[n].delimiters)}},function(d,_,a){d.exports=function(e){var t,n,r=0,l=e.tokens,i=e.tokens.length;for(t=n=0;t<i;t++)l[t].nesting<0&&r--,l[t].level=r,l[t].nesting>0&&r++,l[t].type==="text"&&t+1<i&&l[t+1].type==="text"?l[t+1].content=l[t].content+l[t+1].content:(t!==n&&(l[n]=l[t]),n++);t!==n&&(l.length=n)}},function(d,_,a){var e=a(42),t=a(1).isWhiteSpace,n=a(1).isPunctChar,r=a(1).isMdAsciiPunct;function l(i,c,s,o){this.src=i,this.env=s,this.md=c,this.tokens=o,this.tokens_meta=Array(o.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[]}l.prototype.pushPending=function(){var i=new e("text","",0);return i.content=this.pending,i.level=this.pendingLevel,this.tokens.push(i),this.pending="",i},l.prototype.push=function(i,c,s){this.pending&&this.pushPending();var o=new e(i,c,s),u=null;return s<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),o.level=this.level,s>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],u={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(o),this.tokens_meta.push(u),o},l.prototype.scanDelims=function(i,c){var s,o,u,f,p,m,g,b,w,y=i,k=!0,v=!0,x=this.posMax,E=this.src.charCodeAt(i);for(s=i>0?this.src.charCodeAt(i-1):32;y<x&&this.src.charCodeAt(y)===E;)y++;return u=y-i,o=y<x?this.src.charCodeAt(y):32,g=r(s)||n(String.fromCharCode(s)),w=r(o)||n(String.fromCharCode(o)),m=t(s),(b=t(o))?k=!1:w&&(m||g||(k=!1)),m?v=!1:g&&(b||w||(v=!1)),c?(f=k,p=v):(f=k&&(!v||g),p=v&&(!k||w)),{can_open:f,can_close:p,length:u}},l.prototype.Token=e,d.exports=l},function(d,_,a){function e(p){var m=Array.prototype.slice.call(arguments,1);return m.forEach(function(g){g&&Object.keys(g).forEach(function(b){p[b]=g[b]})}),p}function t(p){return Object.prototype.toString.call(p)}function n(p){return t(p)==="[object Function]"}function r(p){return p.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}var l={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1},i={"http:":{validate:function(p,m,g){var b=p.slice(m);return g.re.http||(g.re.http=new RegExp("^\\/\\/"+g.re.src_auth+g.re.src_host_port_strict+g.re.src_path,"i")),g.re.http.test(b)?b.match(g.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(p,m,g){var b=p.slice(m);return g.re.no_http||(g.re.no_http=new RegExp("^"+g.re.src_auth+"(?:localhost|(?:(?:"+g.re.src_domain+")\\.)+"+g.re.src_domain_root+")"+g.re.src_port+g.re.src_host_terminator+g.re.src_path,"i")),g.re.no_http.test(b)?m>=3&&p[m-3]===":"||m>=3&&p[m-3]==="/"?0:b.match(g.re.no_http)[0].length:0}},"mailto:":{validate:function(p,m,g){var b=p.slice(m);return g.re.mailto||(g.re.mailto=new RegExp("^"+g.re.src_email_name+"@"+g.re.src_host_strict,"i")),g.re.mailto.test(b)?b.match(g.re.mailto)[0].length:0}}},c="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function s(p){var m=p.re=a(190)(p.__opts__),g=p.__tlds__.slice();function b(v){return v.replace("%TLDS%",m.src_tlds)}p.onCompile(),p.__tlds_replaced__||g.push("a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]"),g.push(m.src_xn),m.src_tlds=g.join("|"),m.email_fuzzy=RegExp(b(m.tpl_email_fuzzy),"i"),m.link_fuzzy=RegExp(b(m.tpl_link_fuzzy),"i"),m.link_no_ip_fuzzy=RegExp(b(m.tpl_link_no_ip_fuzzy),"i"),m.host_fuzzy_test=RegExp(b(m.tpl_host_fuzzy_test),"i");var w=[];function y(v,x){throw new Error('(LinkifyIt) Invalid schema "'+v+'": '+x)}p.__compiled__={},Object.keys(p.__schemas__).forEach(function(v){var x=p.__schemas__[v];if(x!==null){var E={validate:null,link:null};if(p.__compiled__[v]=E,t(x)==="[object Object]")return function(S){return t(S)==="[object RegExp]"}(x.validate)?E.validate=function(S){return function(O,C){var j=O.slice(C);return S.test(j)?j.match(S)[0].length:0}}(x.validate):n(x.validate)?E.validate=x.validate:y(v,x),void(n(x.normalize)?E.normalize=x.normalize:x.normalize?y(v,x):E.normalize=function(S,O){O.normalize(S)});(function(S){return t(S)==="[object String]"})(x)?w.push(v):y(v,x)}}),w.forEach(function(v){p.__compiled__[p.__schemas__[v]]&&(p.__compiled__[v].validate=p.__compiled__[p.__schemas__[v]].validate,p.__compiled__[v].normalize=p.__compiled__[p.__schemas__[v]].normalize)}),p.__compiled__[""]={validate:null,normalize:function(v,x){x.normalize(v)}};var k=Object.keys(p.__compiled__).filter(function(v){return v.length>0&&p.__compiled__[v]}).map(r).join("|");p.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+m.src_ZPCc+"))("+k+")","i"),p.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+m.src_ZPCc+"))("+k+")","ig"),p.re.pretest=RegExp("("+p.re.schema_test.source+")|("+p.re.host_fuzzy_test.source+")|@","i"),function(v){v.__index__=-1,v.__text_cache__=""}(p)}function o(p,m){var g=p.__index__,b=p.__last_index__,w=p.__text_cache__.slice(g,b);this.schema=p.__schema__.toLowerCase(),this.index=g+m,this.lastIndex=b+m,this.raw=w,this.text=w,this.url=w}function u(p,m){var g=new o(p,m);return p.__compiled__[g.schema].normalize(g,p),g}function f(p,m){if(!(this instanceof f))return new f(p,m);var g;m||(g=p,Object.keys(g||{}).reduce(function(b,w){return b||l.hasOwnProperty(w)},!1)&&(m=p,p={})),this.__opts__=e({},l,m),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=e({},i,p),this.__compiled__={},this.__tlds__=c,this.__tlds_replaced__=!1,this.re={},s(this)}f.prototype.add=function(p,m){return this.__schemas__[p]=m,s(this),this},f.prototype.set=function(p){return this.__opts__=e(this.__opts__,p),this},f.prototype.test=function(p){if(this.__text_cache__=p,this.__index__=-1,!p.length)return!1;var m,g,b,w,y,k,v,x;if(this.re.schema_test.test(p)){for((v=this.re.schema_search).lastIndex=0;(m=v.exec(p))!==null;)if(w=this.testSchemaAt(p,m[2],v.lastIndex)){this.__schema__=m[2],this.__index__=m.index+m[1].length,this.__last_index__=m.index+m[0].length+w;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(x=p.search(this.re.host_fuzzy_test))>=0&&(this.__index__<0||x<this.__index__)&&(g=p.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))!==null&&(y=g.index+g[1].length,(this.__index__<0||y<this.__index__)&&(this.__schema__="",this.__index__=y,this.__last_index__=g.index+g[0].length)),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&p.indexOf("@")>=0&&(b=p.match(this.re.email_fuzzy))!==null&&(y=b.index+b[1].length,k=b.index+b[0].length,(this.__index__<0||y<this.__index__||y===this.__index__&&k>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=y,this.__last_index__=k)),this.__index__>=0},f.prototype.pretest=function(p){return this.re.pretest.test(p)},f.prototype.testSchemaAt=function(p,m,g){return this.__compiled__[m.toLowerCase()]?this.__compiled__[m.toLowerCase()].validate(p,g,this):0},f.prototype.match=function(p){var m=0,g=[];this.__index__>=0&&this.__text_cache__===p&&(g.push(u(this,m)),m=this.__last_index__);for(var b=m?p.slice(m):p;this.test(b);)g.push(u(this,m)),b=b.slice(this.__last_index__),m+=this.__last_index__;return g.length?g:null},f.prototype.tlds=function(p,m){return p=Array.isArray(p)?p:[p],m?(this.__tlds__=this.__tlds__.concat(p).sort().filter(function(g,b,w){return g!==w[b-1]}).reverse(),s(this),this):(this.__tlds__=p.slice(),this.__tlds_replaced__=!0,s(this),this)},f.prototype.normalize=function(p){p.schema||(p.url="http://"+p.url),p.schema!=="mailto:"||/^mailto:/i.test(p.url)||(p.url="mailto:"+p.url)},f.prototype.onCompile=function(){},d.exports=f},function(d,_,a){d.exports=function(e){var t={};return t.src_Any=a(64).source,t.src_Cc=a(65).source,t.src_Z=a(66).source,t.src_P=a(40).source,t.src_ZPCc=[t.src_Z,t.src_P,t.src_Cc].join("|"),t.src_ZCc=[t.src_Z,t.src_Cc].join("|"),t.src_pseudo_letter="(?:(?![><｜]|"+t.src_ZPCc+")"+t.src_Any+")",t.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",t.src_auth="(?:(?:(?!"+t.src_ZCc+"|[@/\\[\\]()]).)+@)?",t.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",t.src_host_terminator="(?=$|[><｜]|"+t.src_ZPCc+")(?!-|_|:\\d|\\.-|\\.(?!$|"+t.src_ZPCc+"))",t.src_path="(?:[/?#](?:(?!"+t.src_ZCc+`|[><｜]|[()[\\]{}.,"'?!\\-]).|\\[(?:(?!`+t.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+t.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+t.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+t.src_ZCc+`|["]).)+\\"|\\'(?:(?!`+t.src_ZCc+"|[']).)+\\'|\\'(?="+t.src_pseudo_letter+"|[-]).|\\.{2,4}[a-zA-Z0-9%/]|\\.(?!"+t.src_ZCc+"|[.]).|"+(e&&e["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+"\\,(?!"+t.src_ZCc+").|\\!(?!"+t.src_ZCc+"|[!]).|\\?(?!"+t.src_ZCc+"|[?]).)+|\\/)?",t.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',t.src_xn="xn--[a-z0-9\\-]{1,59}",t.src_domain_root="(?:"+t.src_xn+"|"+t.src_pseudo_letter+"{1,63})",t.src_domain="(?:"+t.src_xn+"|(?:"+t.src_pseudo_letter+")|(?:"+t.src_pseudo_letter+"(?:-|"+t.src_pseudo_letter+"){0,61}"+t.src_pseudo_letter+"))",t.src_host="(?:(?:(?:(?:"+t.src_domain+")\\.)*"+t.src_domain+"))",t.tpl_host_fuzzy="(?:"+t.src_ip4+"|(?:(?:(?:"+t.src_domain+")\\.)+(?:%TLDS%)))",t.tpl_host_no_ip_fuzzy="(?:(?:(?:"+t.src_domain+")\\.)+(?:%TLDS%))",t.src_host_strict=t.src_host+t.src_host_terminator,t.tpl_host_fuzzy_strict=t.tpl_host_fuzzy+t.src_host_terminator,t.src_host_port_strict=t.src_host+t.src_port+t.src_host_terminator,t.tpl_host_port_fuzzy_strict=t.tpl_host_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_port_no_ip_fuzzy_strict=t.tpl_host_no_ip_fuzzy+t.src_port+t.src_host_terminator,t.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+t.src_ZPCc+"|>|$))",t.tpl_email_fuzzy='(^|[><｜]|"|\\(|'+t.src_ZCc+")("+t.src_email_name+"@"+t.tpl_host_fuzzy_strict+")",t.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+t.src_ZPCc+"))((?![$+<=>^`|｜])"+t.tpl_host_port_fuzzy_strict+t.src_path+")",t.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+t.src_ZPCc+"))((?![$+<=>^`|｜])"+t.tpl_host_port_no_ip_fuzzy_strict+t.src_path+")",t}},function(d,_,a){(function(e,t){var n;/*! https://mths.be/punycode v1.4.1 by @mathias */(function(r){_&&_.nodeType,e&&e.nodeType;var l=typeof t=="object"&&t;l.global!==l&&l.window!==l&&l.self;var i,c=2147483647,s=/^xn--/,o=/[^\x20-\x7E]/,u=/[\x2E\u3002\uFF0E\uFF61]/g,f={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},p=Math.floor,m=String.fromCharCode;function g(O){throw new RangeError(f[O])}function b(O,C){for(var j=O.length,T=[];j--;)T[j]=C(O[j]);return T}function w(O,C){var j=O.split("@"),T="";return j.length>1&&(T=j[0]+"@",O=j[1]),T+b((O=O.replace(u,".")).split("."),C).join(".")}function y(O){for(var C,j,T=[],A=0,D=O.length;A<D;)(C=O.charCodeAt(A++))>=55296&&C<=56319&&A<D?(64512&(j=O.charCodeAt(A++)))==56320?T.push(((1023&C)<<10)+(1023&j)+65536):(T.push(C),A--):T.push(C);return T}function k(O){return b(O,function(C){var j="";return C>65535&&(j+=m((C-=65536)>>>10&1023|55296),C=56320|1023&C),j+=m(C)}).join("")}function v(O,C){return O+22+75*(O<26)-((C!=0)<<5)}function x(O,C,j){var T=0;for(O=j?p(O/700):O>>1,O+=p(O/C);O>455;T+=36)O=p(O/35);return p(T+36*O/(O+38))}function E(O){var C,j,T,A,D,z,B,N,R,U,H,W=[],F=O.length,q=0,G=128,X=72;for((j=O.lastIndexOf("-"))<0&&(j=0),T=0;T<j;++T)O.charCodeAt(T)>=128&&g("not-basic"),W.push(O.charCodeAt(T));for(A=j>0?j+1:0;A<F;){for(D=q,z=1,B=36;A>=F&&g("invalid-input"),((N=(H=O.charCodeAt(A++))-48<10?H-22:H-65<26?H-65:H-97<26?H-97:36)>=36||N>p((c-q)/z))&&g("overflow"),q+=N*z,!(N<(R=B<=X?1:B>=X+26?26:B-X));B+=36)z>p(c/(U=36-R))&&g("overflow"),z*=U;X=x(q-D,C=W.length+1,D==0),p(q/C)>c-G&&g("overflow"),G+=p(q/C),q%=C,W.splice(q++,0,G)}return k(W)}function S(O){var C,j,T,A,D,z,B,N,R,U,H,W,F,q,G,X=[];for(W=(O=y(O)).length,C=128,j=0,D=72,z=0;z<W;++z)(H=O[z])<128&&X.push(m(H));for(T=A=X.length,A&&X.push("-");T<W;){for(B=c,z=0;z<W;++z)(H=O[z])>=C&&H<B&&(B=H);for(B-C>p((c-j)/(F=T+1))&&g("overflow"),j+=(B-C)*F,C=B,z=0;z<W;++z)if((H=O[z])<C&&++j>c&&g("overflow"),H==C){for(N=j,R=36;!(N<(U=R<=D?1:R>=D+26?26:R-D));R+=36)G=N-U,q=36-U,X.push(m(v(U+G%q,0))),N=p(G/q);X.push(m(v(N,0))),D=x(j,F,T==A),j=0,++T}++j,++C}return X.join("")}i={version:"1.4.1",ucs2:{decode:y,encode:k},decode:E,encode:S,toASCII:function(O){return w(O,function(C){return o.test(C)?"xn--"+S(C):C})},toUnicode:function(O){return w(O,function(C){return s.test(C)?E(C.slice(4).toLowerCase()):C})}},(n=(function(){return i}).call(_,a,_,e))===void 0||(e.exports=n)})()}).call(this,a(192)(d),a(193))},function(d,_){d.exports=function(a){return a.webpackPolyfill||(a.deprecate=function(){},a.paths=[],a.children||(a.children=[]),Object.defineProperty(a,"loaded",{enumerable:!0,get:function(){return a.l}}),Object.defineProperty(a,"id",{enumerable:!0,get:function(){return a.i}}),a.webpackPolyfill=1),a}},function(d,_){var a;a=function(){return this}();try{a=a||new Function("return this")()}catch{typeof window=="object"&&(a=window)}d.exports=a},function(d,_,a){d.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}}},function(d,_,a){d.exports={options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","text_collapse"]}}}},function(d,_,a){d.exports={options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","text_collapse"]}}}},function(d,_,a){var e=a(198),t=a(199),n=a(200),r=a(201),l=a(202);d.exports=function(i,c){var s={defs:e,shortcuts:t,enabled:[]},o=l(i.utils.assign({},s,c||{}));i.renderer.rules.emoji=n,i.core.ruler.push("emoji",r(i,o.defs,o.shortcuts,o.scanRE,o.replaceRE))}},function(d){d.exports=JSON.parse('{"100":"💯","1234":"🔢","grinning":"😀","smiley":"😃","smile":"😄","grin":"😁","laughing":"😆","satisfied":"😆","sweat_smile":"😅","joy":"😂","rofl":"🤣","relaxed":"☺️","blush":"😊","innocent":"😇","slightly_smiling_face":"🙂","upside_down_face":"🙃","wink":"😉","relieved":"😌","heart_eyes":"😍","kissing_heart":"😘","kissing":"😗","kissing_smiling_eyes":"😙","kissing_closed_eyes":"😚","yum":"😋","stuck_out_tongue_winking_eye":"😜","stuck_out_tongue_closed_eyes":"😝","stuck_out_tongue":"😛","money_mouth_face":"🤑","hugs":"🤗","nerd_face":"🤓","sunglasses":"😎","clown_face":"🤡","cowboy_hat_face":"🤠","smirk":"😏","unamused":"😒","disappointed":"😞","pensive":"😔","worried":"😟","confused":"😕","slightly_frowning_face":"🙁","frowning_face":"☹️","persevere":"😣","confounded":"😖","tired_face":"😫","weary":"😩","triumph":"😤","angry":"😠","rage":"😡","pout":"😡","no_mouth":"😶","neutral_face":"😐","expressionless":"😑","hushed":"😯","frowning":"😦","anguished":"😧","open_mouth":"😮","astonished":"😲","dizzy_face":"😵","flushed":"😳","scream":"😱","fearful":"😨","cold_sweat":"😰","cry":"😢","disappointed_relieved":"😥","drooling_face":"🤤","sob":"😭","sweat":"😓","sleepy":"😪","sleeping":"😴","roll_eyes":"🙄","thinking":"🤔","lying_face":"🤥","grimacing":"😬","zipper_mouth_face":"🤐","nauseated_face":"🤢","sneezing_face":"🤧","mask":"😷","face_with_thermometer":"🤒","face_with_head_bandage":"🤕","smiling_imp":"😈","imp":"👿","japanese_ogre":"👹","japanese_goblin":"👺","hankey":"💩","poop":"💩","shit":"💩","ghost":"👻","skull":"💀","skull_and_crossbones":"☠️","alien":"👽","space_invader":"👾","robot":"🤖","jack_o_lantern":"🎃","smiley_cat":"😺","smile_cat":"😸","joy_cat":"😹","heart_eyes_cat":"😻","smirk_cat":"😼","kissing_cat":"😽","scream_cat":"🙀","crying_cat_face":"😿","pouting_cat":"😾","open_hands":"👐","raised_hands":"🙌","clap":"👏","pray":"🙏","handshake":"🤝","+1":"👍","thumbsup":"👍","-1":"👎","thumbsdown":"👎","fist_oncoming":"👊","facepunch":"👊","punch":"👊","fist_raised":"✊","fist":"✊","fist_left":"🤛","fist_right":"🤜","crossed_fingers":"🤞","v":"✌️","metal":"🤘","ok_hand":"👌","point_left":"👈","point_right":"👉","point_up_2":"👆","point_down":"👇","point_up":"☝️","hand":"✋","raised_hand":"✋","raised_back_of_hand":"🤚","raised_hand_with_fingers_splayed":"🖐","vulcan_salute":"🖖","wave":"👋","call_me_hand":"🤙","muscle":"💪","middle_finger":"🖕","fu":"🖕","writing_hand":"✍️","selfie":"🤳","nail_care":"💅","ring":"💍","lipstick":"💄","kiss":"💋","lips":"👄","tongue":"👅","ear":"👂","nose":"👃","footprints":"👣","eye":"👁","eyes":"👀","speaking_head":"🗣","bust_in_silhouette":"👤","busts_in_silhouette":"👥","baby":"👶","boy":"👦","girl":"👧","man":"👨","woman":"👩","blonde_woman":"👱‍♀","blonde_man":"👱","person_with_blond_hair":"👱","older_man":"👴","older_woman":"👵","man_with_gua_pi_mao":"👲","woman_with_turban":"👳‍♀","man_with_turban":"👳","policewoman":"👮‍♀","policeman":"👮","cop":"👮","construction_worker_woman":"👷‍♀","construction_worker_man":"👷","construction_worker":"👷","guardswoman":"💂‍♀","guardsman":"💂","female_detective":"🕵️‍♀️","male_detective":"🕵","detective":"🕵","woman_health_worker":"👩‍⚕","man_health_worker":"👨‍⚕","woman_farmer":"👩‍🌾","man_farmer":"👨‍🌾","woman_cook":"👩‍🍳","man_cook":"👨‍🍳","woman_student":"👩‍🎓","man_student":"👨‍🎓","woman_singer":"👩‍🎤","man_singer":"👨‍🎤","woman_teacher":"👩‍🏫","man_teacher":"👨‍🏫","woman_factory_worker":"👩‍🏭","man_factory_worker":"👨‍🏭","woman_technologist":"👩‍💻","man_technologist":"👨‍💻","woman_office_worker":"👩‍💼","man_office_worker":"👨‍💼","woman_mechanic":"👩‍🔧","man_mechanic":"👨‍🔧","woman_scientist":"👩‍🔬","man_scientist":"👨‍🔬","woman_artist":"👩‍🎨","man_artist":"👨‍🎨","woman_firefighter":"👩‍🚒","man_firefighter":"👨‍🚒","woman_pilot":"👩‍✈","man_pilot":"👨‍✈","woman_astronaut":"👩‍🚀","man_astronaut":"👨‍🚀","woman_judge":"👩‍⚖","man_judge":"👨‍⚖","mrs_claus":"🤶","santa":"🎅","princess":"👸","prince":"🤴","bride_with_veil":"👰","man_in_tuxedo":"🤵","angel":"👼","pregnant_woman":"🤰","bowing_woman":"🙇‍♀","bowing_man":"🙇","bow":"🙇","tipping_hand_woman":"💁","information_desk_person":"💁","sassy_woman":"💁","tipping_hand_man":"💁‍♂","sassy_man":"💁‍♂","no_good_woman":"🙅","no_good":"🙅","ng_woman":"🙅","no_good_man":"🙅‍♂","ng_man":"🙅‍♂","ok_woman":"🙆","ok_man":"🙆‍♂","raising_hand_woman":"🙋","raising_hand":"🙋","raising_hand_man":"🙋‍♂","woman_facepalming":"🤦‍♀","man_facepalming":"🤦‍♂","woman_shrugging":"🤷‍♀","man_shrugging":"🤷‍♂","pouting_woman":"🙎","person_with_pouting_face":"🙎","pouting_man":"🙎‍♂","frowning_woman":"🙍","person_frowning":"🙍","frowning_man":"🙍‍♂","haircut_woman":"💇","haircut":"💇","haircut_man":"💇‍♂","massage_woman":"💆","massage":"💆","massage_man":"💆‍♂","business_suit_levitating":"🕴","dancer":"💃","man_dancing":"🕺","dancing_women":"👯","dancers":"👯","dancing_men":"👯‍♂","walking_woman":"🚶‍♀","walking_man":"🚶","walking":"🚶","running_woman":"🏃‍♀","running_man":"🏃","runner":"🏃","running":"🏃","couple":"👫","two_women_holding_hands":"👭","two_men_holding_hands":"👬","couple_with_heart_woman_man":"💑","couple_with_heart":"💑","couple_with_heart_woman_woman":"👩‍❤️‍👩","couple_with_heart_man_man":"👨‍❤️‍👨","couplekiss_man_woman":"💏","couplekiss_woman_woman":"👩‍❤️‍💋‍👩","couplekiss_man_man":"👨‍❤️‍💋‍👨","family_man_woman_boy":"👪","family":"👪","family_man_woman_girl":"👨‍👩‍👧","family_man_woman_girl_boy":"👨‍👩‍👧‍👦","family_man_woman_boy_boy":"👨‍👩‍👦‍👦","family_man_woman_girl_girl":"👨‍👩‍👧‍👧","family_woman_woman_boy":"👩‍👩‍👦","family_woman_woman_girl":"👩‍👩‍👧","family_woman_woman_girl_boy":"👩‍👩‍👧‍👦","family_woman_woman_boy_boy":"👩‍👩‍👦‍👦","family_woman_woman_girl_girl":"👩‍👩‍👧‍👧","family_man_man_boy":"👨‍👨‍👦","family_man_man_girl":"👨‍👨‍👧","family_man_man_girl_boy":"👨‍👨‍👧‍👦","family_man_man_boy_boy":"👨‍👨‍👦‍👦","family_man_man_girl_girl":"👨‍👨‍👧‍👧","family_woman_boy":"👩‍👦","family_woman_girl":"👩‍👧","family_woman_girl_boy":"👩‍👧‍👦","family_woman_boy_boy":"👩‍👦‍👦","family_woman_girl_girl":"👩‍👧‍👧","family_man_boy":"👨‍👦","family_man_girl":"👨‍👧","family_man_girl_boy":"👨‍👧‍👦","family_man_boy_boy":"👨‍👦‍👦","family_man_girl_girl":"👨‍👧‍👧","womans_clothes":"👚","shirt":"👕","tshirt":"👕","jeans":"👖","necktie":"👔","dress":"👗","bikini":"👙","kimono":"👘","high_heel":"👠","sandal":"👡","boot":"👢","mans_shoe":"👞","shoe":"👞","athletic_shoe":"👟","womans_hat":"👒","tophat":"🎩","mortar_board":"🎓","crown":"👑","rescue_worker_helmet":"⛑","school_satchel":"🎒","pouch":"👝","purse":"👛","handbag":"👜","briefcase":"💼","eyeglasses":"👓","dark_sunglasses":"🕶","closed_umbrella":"🌂","open_umbrella":"☂️","dog":"🐶","cat":"🐱","mouse":"🐭","hamster":"🐹","rabbit":"🐰","fox_face":"🦊","bear":"🐻","panda_face":"🐼","koala":"🐨","tiger":"🐯","lion":"🦁","cow":"🐮","pig":"🐷","pig_nose":"🐽","frog":"🐸","monkey_face":"🐵","see_no_evil":"🙈","hear_no_evil":"🙉","speak_no_evil":"🙊","monkey":"🐒","chicken":"🐔","penguin":"🐧","bird":"🐦","baby_chick":"🐤","hatching_chick":"🐣","hatched_chick":"🐥","duck":"🦆","eagle":"🦅","owl":"🦉","bat":"🦇","wolf":"🐺","boar":"🐗","horse":"🐴","unicorn":"🦄","bee":"🐝","honeybee":"🐝","bug":"🐛","butterfly":"🦋","snail":"🐌","shell":"🐚","beetle":"🐞","ant":"🐜","spider":"🕷","spider_web":"🕸","turtle":"🐢","snake":"🐍","lizard":"🦎","scorpion":"🦂","crab":"🦀","squid":"🦑","octopus":"🐙","shrimp":"🦐","tropical_fish":"🐠","fish":"🐟","blowfish":"🐡","dolphin":"🐬","flipper":"🐬","shark":"🦈","whale":"🐳","whale2":"🐋","crocodile":"🐊","leopard":"🐆","tiger2":"🐅","water_buffalo":"🐃","ox":"🐂","cow2":"🐄","deer":"🦌","dromedary_camel":"🐪","camel":"🐫","elephant":"🐘","rhinoceros":"🦏","gorilla":"🦍","racehorse":"🐎","pig2":"🐖","goat":"🐐","ram":"🐏","sheep":"🐑","dog2":"🐕","poodle":"🐩","cat2":"🐈","rooster":"🐓","turkey":"🦃","dove":"🕊","rabbit2":"🐇","mouse2":"🐁","rat":"🐀","chipmunk":"🐿","feet":"🐾","paw_prints":"🐾","dragon":"🐉","dragon_face":"🐲","cactus":"🌵","christmas_tree":"🎄","evergreen_tree":"🌲","deciduous_tree":"🌳","palm_tree":"🌴","seedling":"🌱","herb":"🌿","shamrock":"☘️","four_leaf_clover":"🍀","bamboo":"🎍","tanabata_tree":"🎋","leaves":"🍃","fallen_leaf":"🍂","maple_leaf":"🍁","mushroom":"🍄","ear_of_rice":"🌾","bouquet":"💐","tulip":"🌷","rose":"🌹","wilted_flower":"🥀","sunflower":"🌻","blossom":"🌼","cherry_blossom":"🌸","hibiscus":"🌺","earth_americas":"🌎","earth_africa":"🌍","earth_asia":"🌏","full_moon":"🌕","waning_gibbous_moon":"🌖","last_quarter_moon":"🌗","waning_crescent_moon":"🌘","new_moon":"🌑","waxing_crescent_moon":"🌒","first_quarter_moon":"🌓","moon":"🌔","waxing_gibbous_moon":"🌔","new_moon_with_face":"🌚","full_moon_with_face":"🌝","sun_with_face":"🌞","first_quarter_moon_with_face":"🌛","last_quarter_moon_with_face":"🌜","crescent_moon":"🌙","dizzy":"💫","star":"⭐️","star2":"🌟","sparkles":"✨","zap":"⚡️","fire":"🔥","boom":"💥","collision":"💥","comet":"☄","sunny":"☀️","sun_behind_small_cloud":"🌤","partly_sunny":"⛅️","sun_behind_large_cloud":"🌥","sun_behind_rain_cloud":"🌦","rainbow":"🌈","cloud":"☁️","cloud_with_rain":"🌧","cloud_with_lightning_and_rain":"⛈","cloud_with_lightning":"🌩","cloud_with_snow":"🌨","snowman_with_snow":"☃️","snowman":"⛄️","snowflake":"❄️","wind_face":"🌬","dash":"💨","tornado":"🌪","fog":"🌫","ocean":"🌊","droplet":"💧","sweat_drops":"💦","umbrella":"☔️","green_apple":"🍏","apple":"🍎","pear":"🍐","tangerine":"🍊","orange":"🍊","mandarin":"🍊","lemon":"🍋","banana":"🍌","watermelon":"🍉","grapes":"🍇","strawberry":"🍓","melon":"🍈","cherries":"🍒","peach":"🍑","pineapple":"🍍","kiwi_fruit":"🥝","avocado":"🥑","tomato":"🍅","eggplant":"🍆","cucumber":"🥒","carrot":"🥕","corn":"🌽","hot_pepper":"🌶","potato":"🥔","sweet_potato":"🍠","chestnut":"🌰","peanuts":"🥜","honey_pot":"🍯","croissant":"🥐","bread":"🍞","baguette_bread":"🥖","cheese":"🧀","egg":"🥚","fried_egg":"🍳","bacon":"🥓","pancakes":"🥞","fried_shrimp":"🍤","poultry_leg":"🍗","meat_on_bone":"🍖","pizza":"🍕","hotdog":"🌭","hamburger":"🍔","fries":"🍟","stuffed_flatbread":"🥙","taco":"🌮","burrito":"🌯","green_salad":"🥗","shallow_pan_of_food":"🥘","spaghetti":"🍝","ramen":"🍜","stew":"🍲","fish_cake":"🍥","sushi":"🍣","bento":"🍱","curry":"🍛","rice":"🍚","rice_ball":"🍙","rice_cracker":"🍘","oden":"🍢","dango":"🍡","shaved_ice":"🍧","ice_cream":"🍨","icecream":"🍦","cake":"🍰","birthday":"🎂","custard":"🍮","lollipop":"🍭","candy":"🍬","chocolate_bar":"🍫","popcorn":"🍿","doughnut":"🍩","cookie":"🍪","milk_glass":"🥛","baby_bottle":"🍼","coffee":"☕️","tea":"🍵","sake":"🍶","beer":"🍺","beers":"🍻","clinking_glasses":"🥂","wine_glass":"🍷","tumbler_glass":"🥃","cocktail":"🍸","tropical_drink":"🍹","champagne":"🍾","spoon":"🥄","fork_and_knife":"🍴","plate_with_cutlery":"🍽","soccer":"⚽️","basketball":"🏀","football":"🏈","baseball":"⚾️","tennis":"🎾","volleyball":"🏐","rugby_football":"🏉","8ball":"🎱","ping_pong":"🏓","badminton":"🏸","goal_net":"🥅","ice_hockey":"🏒","field_hockey":"🏑","cricket":"🏏","golf":"⛳️","bow_and_arrow":"🏹","fishing_pole_and_fish":"🎣","boxing_glove":"🥊","martial_arts_uniform":"🥋","ice_skate":"⛸","ski":"🎿","skier":"⛷","snowboarder":"🏂","weight_lifting_woman":"🏋️‍♀️","weight_lifting_man":"🏋","person_fencing":"🤺","women_wrestling":"🤼‍♀","men_wrestling":"🤼‍♂","woman_cartwheeling":"🤸‍♀","man_cartwheeling":"🤸‍♂","basketball_woman":"⛹️‍♀️","basketball_man":"⛹","woman_playing_handball":"🤾‍♀","man_playing_handball":"🤾‍♂","golfing_woman":"🏌️‍♀️","golfing_man":"🏌","surfing_woman":"🏄‍♀","surfing_man":"🏄","surfer":"🏄","swimming_woman":"🏊‍♀","swimming_man":"🏊","swimmer":"🏊","woman_playing_water_polo":"🤽‍♀","man_playing_water_polo":"🤽‍♂","rowing_woman":"🚣‍♀","rowing_man":"🚣","rowboat":"🚣","horse_racing":"🏇","biking_woman":"🚴‍♀","biking_man":"🚴","bicyclist":"🚴","mountain_biking_woman":"🚵‍♀","mountain_biking_man":"🚵","mountain_bicyclist":"🚵","running_shirt_with_sash":"🎽","medal_sports":"🏅","medal_military":"🎖","1st_place_medal":"🥇","2nd_place_medal":"🥈","3rd_place_medal":"🥉","trophy":"🏆","rosette":"🏵","reminder_ribbon":"🎗","ticket":"🎫","tickets":"🎟","circus_tent":"🎪","woman_juggling":"🤹‍♀","man_juggling":"🤹‍♂","performing_arts":"🎭","art":"🎨","clapper":"🎬","microphone":"🎤","headphones":"🎧","musical_score":"🎼","musical_keyboard":"🎹","drum":"🥁","saxophone":"🎷","trumpet":"🎺","guitar":"🎸","violin":"🎻","game_die":"🎲","dart":"🎯","bowling":"🎳","video_game":"🎮","slot_machine":"🎰","car":"🚗","red_car":"🚗","taxi":"🚕","blue_car":"🚙","bus":"🚌","trolleybus":"🚎","racing_car":"🏎","police_car":"🚓","ambulance":"🚑","fire_engine":"🚒","minibus":"🚐","truck":"🚚","articulated_lorry":"🚛","tractor":"🚜","kick_scooter":"🛴","bike":"🚲","motor_scooter":"🛵","motorcycle":"🏍","rotating_light":"🚨","oncoming_police_car":"🚔","oncoming_bus":"🚍","oncoming_automobile":"🚘","oncoming_taxi":"🚖","aerial_tramway":"🚡","mountain_cableway":"🚠","suspension_railway":"🚟","railway_car":"🚃","train":"🚋","mountain_railway":"🚞","monorail":"🚝","bullettrain_side":"🚄","bullettrain_front":"🚅","light_rail":"🚈","steam_locomotive":"🚂","train2":"🚆","metro":"🚇","tram":"🚊","station":"🚉","helicopter":"🚁","small_airplane":"🛩","airplane":"✈️","flight_departure":"🛫","flight_arrival":"🛬","rocket":"🚀","artificial_satellite":"🛰","seat":"💺","canoe":"🛶","boat":"⛵️","sailboat":"⛵️","motor_boat":"🛥","speedboat":"🚤","passenger_ship":"🛳","ferry":"⛴","ship":"🚢","anchor":"⚓️","construction":"🚧","fuelpump":"⛽️","busstop":"🚏","vertical_traffic_light":"🚦","traffic_light":"🚥","world_map":"🗺","moyai":"🗿","statue_of_liberty":"🗽","fountain":"⛲️","tokyo_tower":"🗼","european_castle":"🏰","japanese_castle":"🏯","stadium":"🏟","ferris_wheel":"🎡","roller_coaster":"🎢","carousel_horse":"🎠","parasol_on_ground":"⛱","beach_umbrella":"🏖","desert_island":"🏝","mountain":"⛰","mountain_snow":"🏔","mount_fuji":"🗻","volcano":"🌋","desert":"🏜","camping":"🏕","tent":"⛺️","railway_track":"🛤","motorway":"🛣","building_construction":"🏗","factory":"🏭","house":"🏠","house_with_garden":"🏡","houses":"🏘","derelict_house":"🏚","office":"🏢","department_store":"🏬","post_office":"🏣","european_post_office":"🏤","hospital":"🏥","bank":"🏦","hotel":"🏨","convenience_store":"🏪","school":"🏫","love_hotel":"🏩","wedding":"💒","classical_building":"🏛","church":"⛪️","mosque":"🕌","synagogue":"🕍","kaaba":"🕋","shinto_shrine":"⛩","japan":"🗾","rice_scene":"🎑","national_park":"🏞","sunrise":"🌅","sunrise_over_mountains":"🌄","stars":"🌠","sparkler":"🎇","fireworks":"🎆","city_sunrise":"🌇","city_sunset":"🌆","cityscape":"🏙","night_with_stars":"🌃","milky_way":"🌌","bridge_at_night":"🌉","foggy":"🌁","watch":"⌚️","iphone":"📱","calling":"📲","computer":"💻","keyboard":"⌨️","desktop_computer":"🖥","printer":"🖨","computer_mouse":"🖱","trackball":"🖲","joystick":"🕹","clamp":"🗜","minidisc":"💽","floppy_disk":"💾","cd":"💿","dvd":"📀","vhs":"📼","camera":"📷","camera_flash":"📸","video_camera":"📹","movie_camera":"🎥","film_projector":"📽","film_strip":"🎞","telephone_receiver":"📞","phone":"☎️","telephone":"☎️","pager":"📟","fax":"📠","tv":"📺","radio":"📻","studio_microphone":"🎙","level_slider":"🎚","control_knobs":"🎛","stopwatch":"⏱","timer_clock":"⏲","alarm_clock":"⏰","mantelpiece_clock":"🕰","hourglass":"⌛️","hourglass_flowing_sand":"⏳","satellite":"📡","battery":"🔋","electric_plug":"🔌","bulb":"💡","flashlight":"🔦","candle":"🕯","wastebasket":"🗑","oil_drum":"🛢","money_with_wings":"💸","dollar":"💵","yen":"💴","euro":"💶","pound":"💷","moneybag":"💰","credit_card":"💳","gem":"💎","balance_scale":"⚖️","wrench":"🔧","hammer":"🔨","hammer_and_pick":"⚒","hammer_and_wrench":"🛠","pick":"⛏","nut_and_bolt":"🔩","gear":"⚙️","chains":"⛓","gun":"🔫","bomb":"💣","hocho":"🔪","knife":"🔪","dagger":"🗡","crossed_swords":"⚔️","shield":"🛡","smoking":"🚬","coffin":"⚰️","funeral_urn":"⚱️","amphora":"🏺","crystal_ball":"🔮","prayer_beads":"📿","barber":"💈","alembic":"⚗️","telescope":"🔭","microscope":"🔬","hole":"🕳","pill":"💊","syringe":"💉","thermometer":"🌡","toilet":"🚽","potable_water":"🚰","shower":"🚿","bathtub":"🛁","bath":"🛀","bellhop_bell":"🛎","key":"🔑","old_key":"🗝","door":"🚪","couch_and_lamp":"🛋","bed":"🛏","sleeping_bed":"🛌","framed_picture":"🖼","shopping":"🛍","shopping_cart":"🛒","gift":"🎁","balloon":"🎈","flags":"🎏","ribbon":"🎀","confetti_ball":"🎊","tada":"🎉","dolls":"🎎","izakaya_lantern":"🏮","lantern":"🏮","wind_chime":"🎐","email":"✉️","envelope":"✉️","envelope_with_arrow":"📩","incoming_envelope":"📨","e-mail":"📧","love_letter":"💌","inbox_tray":"📥","outbox_tray":"📤","package":"📦","label":"🏷","mailbox_closed":"📪","mailbox":"📫","mailbox_with_mail":"📬","mailbox_with_no_mail":"📭","postbox":"📮","postal_horn":"📯","scroll":"📜","page_with_curl":"📃","page_facing_up":"📄","bookmark_tabs":"📑","bar_chart":"📊","chart_with_upwards_trend":"📈","chart_with_downwards_trend":"📉","spiral_notepad":"🗒","spiral_calendar":"🗓","calendar":"📆","date":"📅","card_index":"📇","card_file_box":"🗃","ballot_box":"🗳","file_cabinet":"🗄","clipboard":"📋","file_folder":"📁","open_file_folder":"📂","card_index_dividers":"🗂","newspaper_roll":"🗞","newspaper":"📰","notebook":"📓","notebook_with_decorative_cover":"📔","ledger":"📒","closed_book":"📕","green_book":"📗","blue_book":"📘","orange_book":"📙","books":"📚","book":"📖","open_book":"📖","bookmark":"🔖","link":"🔗","paperclip":"📎","paperclips":"🖇","triangular_ruler":"📐","straight_ruler":"📏","pushpin":"📌","round_pushpin":"📍","scissors":"✂️","pen":"🖊","fountain_pen":"🖋","black_nib":"✒️","paintbrush":"🖌","crayon":"🖍","memo":"📝","pencil":"📝","pencil2":"✏️","mag":"🔍","mag_right":"🔎","lock_with_ink_pen":"🔏","closed_lock_with_key":"🔐","lock":"🔒","unlock":"🔓","heart":"❤️","yellow_heart":"💛","green_heart":"💚","blue_heart":"💙","purple_heart":"💜","black_heart":"🖤","broken_heart":"💔","heavy_heart_exclamation":"❣️","two_hearts":"💕","revolving_hearts":"💞","heartbeat":"💓","heartpulse":"💗","sparkling_heart":"💖","cupid":"💘","gift_heart":"💝","heart_decoration":"💟","peace_symbol":"☮️","latin_cross":"✝️","star_and_crescent":"☪️","om":"🕉","wheel_of_dharma":"☸️","star_of_david":"✡️","six_pointed_star":"🔯","menorah":"🕎","yin_yang":"☯️","orthodox_cross":"☦️","place_of_worship":"🛐","ophiuchus":"⛎","aries":"♈️","taurus":"♉️","gemini":"♊️","cancer":"♋️","leo":"♌️","virgo":"♍️","libra":"♎️","scorpius":"♏️","sagittarius":"♐️","capricorn":"♑️","aquarius":"♒️","pisces":"♓️","id":"🆔","atom_symbol":"⚛️","accept":"🉑","radioactive":"☢️","biohazard":"☣️","mobile_phone_off":"📴","vibration_mode":"📳","eight_pointed_black_star":"✴️","vs":"🆚","white_flower":"💮","ideograph_advantage":"🉐","secret":"㊙️","congratulations":"㊗️","u6e80":"🈵","a":"🅰️","b":"🅱️","ab":"🆎","cl":"🆑","o2":"🅾️","sos":"🆘","x":"❌","o":"⭕️","stop_sign":"🛑","no_entry":"⛔️","name_badge":"📛","no_entry_sign":"🚫","anger":"💢","hotsprings":"♨️","no_pedestrians":"🚷","do_not_litter":"🚯","no_bicycles":"🚳","non-potable_water":"🚱","underage":"🔞","no_mobile_phones":"📵","no_smoking":"🚭","exclamation":"❗️","heavy_exclamation_mark":"❗️","grey_exclamation":"❕","question":"❓","grey_question":"❔","bangbang":"‼️","interrobang":"⁉️","low_brightness":"🔅","high_brightness":"🔆","part_alternation_mark":"〽️","warning":"⚠️","children_crossing":"🚸","trident":"🔱","fleur_de_lis":"⚜️","beginner":"🔰","recycle":"♻️","white_check_mark":"✅","chart":"💹","sparkle":"❇️","eight_spoked_asterisk":"✳️","negative_squared_cross_mark":"❎","globe_with_meridians":"🌐","diamond_shape_with_a_dot_inside":"💠","m":"Ⓜ️","cyclone":"🌀","zzz":"💤","atm":"🏧","wc":"🚾","wheelchair":"♿️","parking":"🅿️","sa":"🈂️","passport_control":"🛂","customs":"🛃","baggage_claim":"🛄","left_luggage":"🛅","mens":"🚹","womens":"🚺","baby_symbol":"🚼","restroom":"🚻","put_litter_in_its_place":"🚮","cinema":"🎦","signal_strength":"📶","koko":"🈁","symbols":"🔣","information_source":"ℹ️","abc":"🔤","abcd":"🔡","capital_abcd":"🔠","ng":"🆖","ok":"🆗","up":"🆙","cool":"🆒","new":"🆕","free":"🆓","zero":"0️⃣","one":"1️⃣","two":"2️⃣","three":"3️⃣","four":"4️⃣","five":"5️⃣","six":"6️⃣","seven":"7️⃣","eight":"8️⃣","nine":"9️⃣","keycap_ten":"🔟","hash":"#️⃣","asterisk":"*️⃣","arrow_forward":"▶️","pause_button":"⏸","play_or_pause_button":"⏯","stop_button":"⏹","record_button":"⏺","next_track_button":"⏭","previous_track_button":"⏮","fast_forward":"⏩","rewind":"⏪","arrow_double_up":"⏫","arrow_double_down":"⏬","arrow_backward":"◀️","arrow_up_small":"🔼","arrow_down_small":"🔽","arrow_right":"➡️","arrow_left":"⬅️","arrow_up":"⬆️","arrow_down":"⬇️","arrow_upper_right":"↗️","arrow_lower_right":"↘️","arrow_lower_left":"↙️","arrow_upper_left":"↖️","arrow_up_down":"↕️","left_right_arrow":"↔️","arrow_right_hook":"↪️","leftwards_arrow_with_hook":"↩️","arrow_heading_up":"⤴️","arrow_heading_down":"⤵️","twisted_rightwards_arrows":"🔀","repeat":"🔁","repeat_one":"🔂","arrows_counterclockwise":"🔄","arrows_clockwise":"🔃","musical_note":"🎵","notes":"🎶","heavy_plus_sign":"➕","heavy_minus_sign":"➖","heavy_division_sign":"➗","heavy_multiplication_x":"✖️","heavy_dollar_sign":"💲","currency_exchange":"💱","tm":"™️","copyright":"©️","registered":"®️","wavy_dash":"〰️","curly_loop":"➰","loop":"➿","end":"🔚","back":"🔙","on":"🔛","top":"🔝","soon":"🔜","heavy_check_mark":"✔️","ballot_box_with_check":"☑️","radio_button":"🔘","white_circle":"⚪️","black_circle":"⚫️","red_circle":"🔴","large_blue_circle":"🔵","small_red_triangle":"🔺","small_red_triangle_down":"🔻","small_orange_diamond":"🔸","small_blue_diamond":"🔹","large_orange_diamond":"🔶","large_blue_diamond":"🔷","white_square_button":"🔳","black_square_button":"🔲","black_small_square":"▪️","white_small_square":"▫️","black_medium_small_square":"◾️","white_medium_small_square":"◽️","black_medium_square":"◼️","white_medium_square":"◻️","black_large_square":"⬛️","white_large_square":"⬜️","speaker":"🔈","mute":"🔇","sound":"🔉","loud_sound":"🔊","bell":"🔔","no_bell":"🔕","mega":"📣","loudspeaker":"📢","eye_speech_bubble":"👁‍🗨","speech_balloon":"💬","thought_balloon":"💭","right_anger_bubble":"🗯","spades":"♠️","clubs":"♣️","hearts":"♥️","diamonds":"♦️","black_joker":"🃏","flower_playing_cards":"🎴","mahjong":"🀄️","clock1":"🕐","clock2":"🕑","clock3":"🕒","clock4":"🕓","clock5":"🕔","clock6":"🕕","clock7":"🕖","clock8":"🕗","clock9":"🕘","clock10":"🕙","clock11":"🕚","clock12":"🕛","clock130":"🕜","clock230":"🕝","clock330":"🕞","clock430":"🕟","clock530":"🕠","clock630":"🕡","clock730":"🕢","clock830":"🕣","clock930":"🕤","clock1030":"🕥","clock1130":"🕦","clock1230":"🕧","white_flag":"🏳️","black_flag":"🏴","checkered_flag":"🏁","triangular_flag_on_post":"🚩","rainbow_flag":"🏳️‍🌈","afghanistan":"🇦🇫","aland_islands":"🇦🇽","albania":"🇦🇱","algeria":"🇩🇿","american_samoa":"🇦🇸","andorra":"🇦🇩","angola":"🇦🇴","anguilla":"🇦🇮","antarctica":"🇦🇶","antigua_barbuda":"🇦🇬","argentina":"🇦🇷","armenia":"🇦🇲","aruba":"🇦🇼","australia":"🇦🇺","austria":"🇦🇹","azerbaijan":"🇦🇿","bahamas":"🇧🇸","bahrain":"🇧🇭","bangladesh":"🇧🇩","barbados":"🇧🇧","belarus":"🇧🇾","belgium":"🇧🇪","belize":"🇧🇿","benin":"🇧🇯","bermuda":"🇧🇲","bhutan":"🇧🇹","bolivia":"🇧🇴","caribbean_netherlands":"🇧🇶","bosnia_herzegovina":"🇧🇦","botswana":"🇧🇼","brazil":"🇧🇷","british_indian_ocean_territory":"🇮🇴","british_virgin_islands":"🇻🇬","brunei":"🇧🇳","bulgaria":"🇧🇬","burkina_faso":"🇧🇫","burundi":"🇧🇮","cape_verde":"🇨🇻","cambodia":"🇰🇭","cameroon":"🇨🇲","canada":"🇨🇦","canary_islands":"🇮🇨","cayman_islands":"🇰🇾","central_african_republic":"🇨🇫","chad":"🇹🇩","chile":"🇨🇱","cn":"🇨🇳","christmas_island":"🇨🇽","cocos_islands":"🇨🇨","colombia":"🇨🇴","comoros":"🇰🇲","congo_brazzaville":"🇨🇬","congo_kinshasa":"🇨🇩","cook_islands":"🇨🇰","costa_rica":"🇨🇷","cote_divoire":"🇨🇮","croatia":"🇭🇷","cuba":"🇨🇺","curacao":"🇨🇼","cyprus":"🇨🇾","czech_republic":"🇨🇿","denmark":"🇩🇰","djibouti":"🇩🇯","dominica":"🇩🇲","dominican_republic":"🇩🇴","ecuador":"🇪🇨","egypt":"🇪🇬","el_salvador":"🇸🇻","equatorial_guinea":"🇬🇶","eritrea":"🇪🇷","estonia":"🇪🇪","ethiopia":"🇪🇹","eu":"🇪🇺","european_union":"🇪🇺","falkland_islands":"🇫🇰","faroe_islands":"🇫🇴","fiji":"🇫🇯","finland":"🇫🇮","fr":"🇫🇷","french_guiana":"🇬🇫","french_polynesia":"🇵🇫","french_southern_territories":"🇹🇫","gabon":"🇬🇦","gambia":"🇬🇲","georgia":"🇬🇪","de":"🇩🇪","ghana":"🇬🇭","gibraltar":"🇬🇮","greece":"🇬🇷","greenland":"🇬🇱","grenada":"🇬🇩","guadeloupe":"🇬🇵","guam":"🇬🇺","guatemala":"🇬🇹","guernsey":"🇬🇬","guinea":"🇬🇳","guinea_bissau":"🇬🇼","guyana":"🇬🇾","haiti":"🇭🇹","honduras":"🇭🇳","hong_kong":"🇭🇰","hungary":"🇭🇺","iceland":"🇮🇸","india":"🇮🇳","indonesia":"🇮🇩","iran":"🇮🇷","iraq":"🇮🇶","ireland":"🇮🇪","isle_of_man":"🇮🇲","israel":"🇮🇱","it":"🇮🇹","jamaica":"🇯🇲","jp":"🇯🇵","crossed_flags":"🎌","jersey":"🇯🇪","jordan":"🇯🇴","kazakhstan":"🇰🇿","kenya":"🇰🇪","kiribati":"🇰🇮","kosovo":"🇽🇰","kuwait":"🇰🇼","kyrgyzstan":"🇰🇬","laos":"🇱🇦","latvia":"🇱🇻","lebanon":"🇱🇧","lesotho":"🇱🇸","liberia":"🇱🇷","libya":"🇱🇾","liechtenstein":"🇱🇮","lithuania":"🇱🇹","luxembourg":"🇱🇺","macau":"🇲🇴","macedonia":"🇲🇰","madagascar":"🇲🇬","malawi":"🇲🇼","malaysia":"🇲🇾","maldives":"🇲🇻","mali":"🇲🇱","malta":"🇲🇹","marshall_islands":"🇲🇭","martinique":"🇲🇶","mauritania":"🇲🇷","mauritius":"🇲🇺","mayotte":"🇾🇹","mexico":"🇲🇽","micronesia":"🇫🇲","moldova":"🇲🇩","monaco":"🇲🇨","mongolia":"🇲🇳","montenegro":"🇲🇪","montserrat":"🇲🇸","morocco":"🇲🇦","mozambique":"🇲🇿","myanmar":"🇲🇲","namibia":"🇳🇦","nauru":"🇳🇷","nepal":"🇳🇵","netherlands":"🇳🇱","new_caledonia":"🇳🇨","new_zealand":"🇳🇿","nicaragua":"🇳🇮","niger":"🇳🇪","nigeria":"🇳🇬","niue":"🇳🇺","norfolk_island":"🇳🇫","northern_mariana_islands":"🇲🇵","north_korea":"🇰🇵","norway":"🇳🇴","oman":"🇴🇲","pakistan":"🇵🇰","palau":"🇵🇼","palestinian_territories":"🇵🇸","panama":"🇵🇦","papua_new_guinea":"🇵🇬","paraguay":"🇵🇾","peru":"🇵🇪","philippines":"🇵🇭","pitcairn_islands":"🇵🇳","poland":"🇵🇱","portugal":"🇵🇹","puerto_rico":"🇵🇷","qatar":"🇶🇦","reunion":"🇷🇪","romania":"🇷🇴","ru":"🇷🇺","rwanda":"🇷🇼","st_barthelemy":"🇧🇱","st_helena":"🇸🇭","st_kitts_nevis":"🇰🇳","st_lucia":"🇱🇨","st_pierre_miquelon":"🇵🇲","st_vincent_grenadines":"🇻🇨","samoa":"🇼🇸","san_marino":"🇸🇲","sao_tome_principe":"🇸🇹","saudi_arabia":"🇸🇦","senegal":"🇸🇳","serbia":"🇷🇸","seychelles":"🇸🇨","sierra_leone":"🇸🇱","singapore":"🇸🇬","sint_maarten":"🇸🇽","slovakia":"🇸🇰","slovenia":"🇸🇮","solomon_islands":"🇸🇧","somalia":"🇸🇴","south_africa":"🇿🇦","south_georgia_south_sandwich_islands":"🇬🇸","kr":"🇰🇷","south_sudan":"🇸🇸","es":"🇪🇸","sri_lanka":"🇱🇰","sudan":"🇸🇩","suriname":"🇸🇷","swaziland":"🇸🇿","sweden":"🇸🇪","switzerland":"🇨🇭","syria":"🇸🇾","taiwan":"🇹🇼","tajikistan":"🇹🇯","tanzania":"🇹🇿","thailand":"🇹🇭","timor_leste":"🇹🇱","togo":"🇹🇬","tokelau":"🇹🇰","tonga":"🇹🇴","trinidad_tobago":"🇹🇹","tunisia":"🇹🇳","tr":"🇹🇷","turkmenistan":"🇹🇲","turks_caicos_islands":"🇹🇨","tuvalu":"🇹🇻","uganda":"🇺🇬","ukraine":"🇺🇦","united_arab_emirates":"🇦🇪","gb":"🇬🇧","uk":"🇬🇧","us":"🇺🇸","us_virgin_islands":"🇻🇮","uruguay":"🇺🇾","uzbekistan":"🇺🇿","vanuatu":"🇻🇺","vatican_city":"🇻🇦","venezuela":"🇻🇪","vietnam":"🇻🇳","wallis_futuna":"🇼🇫","western_sahara":"🇪🇭","yemen":"🇾🇪","zambia":"🇿🇲","zimbabwe":"🇿🇼"}')},function(d,_,a){d.exports={angry:[">:(",">:-("],blush:[':")',':-")'],broken_heart:["</3","<\\3"],confused:[":/",":-/"],cry:[":'(",":'-(",":,(",":,-("],frowning:[":(",":-("],heart:["<3"],imp:["]:(","]:-("],innocent:["o:)","O:)","o:-)","O:-)","0:)","0:-)"],joy:[":')",":'-)",":,)",":,-)",":'D",":'-D",":,D",":,-D"],kissing:[":*",":-*"],laughing:["x-)","X-)"],neutral_face:[":|",":-|"],open_mouth:[":o",":-o",":O",":-O"],rage:[":@",":-@"],smile:[":D",":-D"],smiley:[":)",":-)"],smiling_imp:["]:)","]:-)"],sob:[":,'(",":,'-(",";(",";-("],stuck_out_tongue:[":P",":-P"],sunglasses:["8-)","B-)"],sweat:[",:(",",:-("],sweat_smile:[",:)",",:-)"],unamused:[":s",":-S",":z",":-Z",":$",":-$"],wink:[";)",";-)"]}},function(d,_,a){d.exports=function(e,t){return e[t].content}},function(d,_,a){d.exports=function(e,t,n,r,l){var i=e.utils.arrayReplaceAt,c=e.utils.lib.ucmicro,s=new RegExp([c.Z.source,c.P.source,c.Cc.source].join("|"));function o(u,f,p){var m,g=0,b=[];return u.replace(l,function(w,y,k){var v;if(n.hasOwnProperty(w)){if(v=n[w],y>0&&!s.test(k[y-1])||y+w.length<k.length&&!s.test(k[y+w.length]))return}else v=w.slice(1,-1);y>g&&((m=new p("text","",0)).content=u.slice(g,y),b.push(m)),(m=new p("emoji","",0)).markup=v,m.content=t[v],b.push(m),g=y+w.length}),g<u.length&&((m=new p("text","",0)).content=u.slice(g),b.push(m)),b}return function(u){var f,p,m,g,b,w=u.tokens,y=0;for(p=0,m=w.length;p<m;p++)if(w[p].type==="inline")for(f=(g=w[p].children).length-1;f>=0;f--)(b=g[f]).type!=="link_open"&&b.type!=="link_close"||b.info==="auto"&&(y-=b.nesting),b.type==="text"&&y===0&&r.test(b.content)&&(w[p].children=g=i(g,f,o(b.content,b.level,u.Token)))}}},function(d,_,a){d.exports=function(e){var t,n=e.defs;e.enabled.length&&(n=Object.keys(n).reduce(function(c,s){return e.enabled.indexOf(s)>=0&&(c[s]=n[s]),c},{})),t=Object.keys(e.shortcuts).reduce(function(c,s){return n[s]?Array.isArray(e.shortcuts[s])?(e.shortcuts[s].forEach(function(o){c[o]=s}),c):(c[e.shortcuts[s]]=s,c):c},{});var r=Object.keys(n).map(function(c){return":"+c+":"}).concat(Object.keys(t)).sort().reverse().map(function(c){return c.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}).join("|"),l=RegExp(r),i=RegExp(r,"g");return{defs:n,shortcuts:t,scanRE:l,replaceRE:i}}},function(d,_,a){var e=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;function t(n,r){var l,i,c=n.posMax,s=n.pos;if(n.src.charCodeAt(s)!==126||r||s+2>=c)return!1;for(n.pos=s+1;n.pos<c;){if(n.src.charCodeAt(n.pos)===126){l=!0;break}n.md.inline.skipToken(n)}return l&&s+1!==n.pos?(i=n.src.slice(s+1,n.pos)).match(/(^|[^\\])(\\\\)*\s/)?(n.pos=s,!1):(n.posMax=n.pos,n.pos=s+1,n.push("sub_open","sub",1).markup="~",n.push("text","",0).content=i.replace(e,"$1"),n.push("sub_close","sub",-1).markup="~",n.pos=n.posMax+1,n.posMax=c,!0):(n.pos=s,!1)}d.exports=function(n){n.inline.ruler.after("emphasis","sub",t)}},function(d,_,a){var e=/\\([ \\!"#$%&'()*+,.\/:;<=>?@[\]^_`{|}~-])/g;function t(n,r){var l,i,c=n.posMax,s=n.pos;if(n.src.charCodeAt(s)!==94||r||s+2>=c)return!1;for(n.pos=s+1;n.pos<c;){if(n.src.charCodeAt(n.pos)===94){l=!0;break}n.md.inline.skipToken(n)}return l&&s+1!==n.pos?(i=n.src.slice(s+1,n.pos)).match(/(^|[^\\])(\\\\)*\s/)?(n.pos=s,!1):(n.posMax=n.pos,n.pos=s+1,n.push("sup_open","sup",1).markup="^",n.push("text","",0).content=i.replace(e,"$1"),n.push("sup_close","sup",-1).markup="^",n.pos=n.posMax+1,n.posMax=c,!0):(n.pos=s,!1)}d.exports=function(n){n.inline.ruler.after("emphasis","sup",t)}},function(d,_,a){d.exports=function(e){var t=e.utils.isSpace;function n(r,l){var i,c,s=r.bMarks[l]+r.tShift[l],o=r.eMarks[l];return s>=o||(c=r.src.charCodeAt(s++))!==126&&c!==58||s===(i=r.skipSpaces(s))||i>=o?-1:s}e.block.ruler.before("paragraph","deflist",function(r,l,i,c){var s,o,u,f,p,m,g,b,w,y,k,v,x,E,S,O,C,j,T,A;if(c)return!(r.ddIndent<0)&&n(r,l)>=0;if((w=l+1)>=i||r.isEmpty(w)&&++w>=i||r.sCount[w]<r.blkIndent||(o=n(r,w))<0)return!1;g=r.tokens.length,T=!0,(A=r.push("dl_open","dl",1)).map=m=[l,0],f=l,u=w;e:for(;;){for(j=!1,(A=r.push("dt_open","dt",1)).map=[f,f],(A=r.push("inline","",0)).map=[f,f],A.content=r.getLines(f,f+1,r.blkIndent,!1).trim(),A.children=[],A=r.push("dt_close","dt",-1);;){for((A=r.push("dd_open","dd",1)).map=p=[w,0],C=o,b=r.eMarks[u],y=r.sCount[u]+o-(r.bMarks[u]+r.tShift[u]);C<b&&(s=r.src.charCodeAt(C),t(s));)s===9?y+=4-y%4:y++,C++;if(o=C,O=r.tight,k=r.ddIndent,v=r.blkIndent,S=r.tShift[u],E=r.sCount[u],x=r.parentType,r.blkIndent=r.ddIndent=r.sCount[u]+2,r.tShift[u]=o-r.bMarks[u],r.sCount[u]=y,r.tight=!0,r.parentType="deflist",r.md.block.tokenize(r,u,i,!0),r.tight&&!j||(T=!1),j=r.line-u>1&&r.isEmpty(r.line-1),r.tShift[u]=S,r.sCount[u]=E,r.tight=O,r.parentType=x,r.blkIndent=v,r.ddIndent=k,A=r.push("dd_close","dd",-1),p[1]=w=r.line,w>=i||r.sCount[w]<r.blkIndent)break e;if((o=n(r,w))<0)break;u=w}if(w>=i||(f=w,r.isEmpty(f))||r.sCount[f]<r.blkIndent||(u=f+1)>=i||(r.isEmpty(u)&&u++,u>=i)||r.sCount[u]<r.blkIndent||(o=n(r,u))<0)break}return A=r.push("dl_close","dl",-1),m[1]=w,r.line=w,T&&function(D,z){var B,N,R=D.level+2;for(B=z+2,N=D.tokens.length-2;B<N;B++)D.tokens[B].level===R&&D.tokens[B].type==="paragraph_open"&&(D.tokens[B+2].hidden=!0,D.tokens[B].hidden=!0,B+=2)}(r,g),!0},{alt:["paragraph","reference","blockquote"]})}},function(d,_,a){d.exports=function(e){var t=e.utils.escapeRE,n=e.utils.arrayReplaceAt,r=e.utils.lib.ucmicro.P.source,l=e.utils.lib.ucmicro.Z.source;e.block.ruler.before("reference","abbr_def",function(i,c,s,o){var u,f,p,m,g,b=i.bMarks[c]+i.tShift[c],w=i.eMarks[c];if(b+2>=w||i.src.charCodeAt(b++)!==42||i.src.charCodeAt(b++)!==91)return!1;for(m=b;b<w;b++){if((p=i.src.charCodeAt(b))===91)return!1;if(p===93){g=b;break}p===92&&b++}return!(g<0||i.src.charCodeAt(g+1)!==58)&&(!!o||(u=i.src.slice(m,g).replace(/\\(.)/g,"$1"),f=i.src.slice(g+2,w).trim(),u.length!==0&&f.length!==0&&(i.env.abbreviations||(i.env.abbreviations={}),i.env.abbreviations[":"+u]===void 0&&(i.env.abbreviations[":"+u]=f),i.line=c+1,!0)))},{alt:["paragraph","reference"]}),e.core.ruler.after("linkify","abbr_replace",function(i){var c,s,o,u,f,p,m,g,b,w,y,k,v,x=i.tokens;if(i.env.abbreviations){for(k=new RegExp("(?:"+Object.keys(i.env.abbreviations).map(function(E){return E.substr(1)}).sort(function(E,S){return S.length-E.length}).map(t).join("|")+")"),y="(^|"+r+"|"+l+"|["+" \r\n$+<=>^`|~".split("").map(t).join("")+"])("+Object.keys(i.env.abbreviations).map(function(E){return E.substr(1)}).sort(function(E,S){return S.length-E.length}).map(t).join("|")+")($|"+r+"|"+l+"|["+" \r\n$+<=>^`|~".split("").map(t).join("")+"])",b=new RegExp(y,"g"),s=0,o=x.length;s<o;s++)if(x[s].type==="inline"){for(c=(u=x[s].children).length-1;c>=0;c--)if((v=u[c]).type==="text"&&(g=0,p=v.content,b.lastIndex=0,m=[],k.test(p))){for(;w=b.exec(p);)(w.index>0||w[1].length>0)&&((f=new i.Token("text","",0)).content=p.slice(g,w.index+w[1].length),m.push(f)),(f=new i.Token("abbr_open","abbr",1)).attrs=[["title",i.env.abbreviations[":"+w[2]]]],m.push(f),(f=new i.Token("text","",0)).content=w[2],m.push(f),f=new i.Token("abbr_close","abbr",-1),m.push(f),b.lastIndex-=w[3].length,g=b.lastIndex;m.length&&(g<p.length&&((f=new i.Token("text","",0)).content=p.slice(g),m.push(f)),x[s].children=u=n(u,c,m))}}}})}},function(d,_,a){function e(o,u,f,p){var m=Number(o[u].meta.id+1).toString(),g="";return typeof p.docId=="string"&&(g="-"+p.docId+"-"),g+m}function t(o,u){var f=Number(o[u].meta.id+1).toString();return o[u].meta.subId>0&&(f+=":"+o[u].meta.subId),"["+f+"]"}function n(o,u,f,p,m){var g=m.rules.footnote_anchor_name(o,u,f,p,m),b=m.rules.footnote_caption(o,u,f,p,m),w=g;return o[u].meta.subId>0&&(w+=":"+o[u].meta.subId),'<sup class="footnote-ref"><a href="#fn'+g+'" id="fnref'+w+'">'+b+"</a></sup>"}function r(o,u,f){return(f.xhtmlOut?`<hr class="footnotes-sep" />
`:`<hr class="footnotes-sep">
`)+`<section class="footnotes">
<ol class="footnotes-list">
`}function l(){return`</ol>
</section>
`}function i(o,u,f,p,m){var g=m.rules.footnote_anchor_name(o,u,f,p,m);return o[u].meta.subId>0&&(g+=":"+o[u].meta.subId),'<li id="fn'+g+'" class="footnote-item">'}function c(){return`</li>
`}function s(o,u,f,p,m){var g=m.rules.footnote_anchor_name(o,u,f,p,m);return o[u].meta.subId>0&&(g+=":"+o[u].meta.subId),' <a href="#fnref'+g+'" class="footnote-backref">↩︎</a>'}d.exports=function(o){var u=o.helpers.parseLinkLabel,f=o.utils.isSpace;o.renderer.rules.footnote_ref=n,o.renderer.rules.footnote_block_open=r,o.renderer.rules.footnote_block_close=l,o.renderer.rules.footnote_open=i,o.renderer.rules.footnote_close=c,o.renderer.rules.footnote_anchor=s,o.renderer.rules.footnote_caption=t,o.renderer.rules.footnote_anchor_name=e,o.block.ruler.before("reference","footnote_def",function(p,m,g,b){var w,y,k,v,x,E,S,O,C,j,T,A=p.bMarks[m]+p.tShift[m],D=p.eMarks[m];if(A+4>D||p.src.charCodeAt(A)!==91||p.src.charCodeAt(A+1)!==94)return!1;for(x=A+2;x<D;x++){if(p.src.charCodeAt(x)===32)return!1;if(p.src.charCodeAt(x)===93)break}if(x===A+2||x+1>=D||p.src.charCodeAt(++x)!==58)return!1;if(b)return!0;for(x++,p.env.footnotes||(p.env.footnotes={}),p.env.footnotes.refs||(p.env.footnotes.refs={}),E=p.src.slice(A+2,x-2),p.env.footnotes.refs[":"+E]=-1,(S=new p.Token("footnote_reference_open","",1)).meta={label:E},S.level=p.level++,p.tokens.push(S),w=p.bMarks[m],y=p.tShift[m],k=p.sCount[m],v=p.parentType,T=x,O=C=p.sCount[m]+x-(p.bMarks[m]+p.tShift[m]);x<D&&(j=p.src.charCodeAt(x),f(j));)j===9?C+=4-C%4:C++,x++;return p.tShift[m]=x-T,p.sCount[m]=C-O,p.bMarks[m]=T,p.blkIndent+=4,p.parentType="footnote",p.sCount[m]<p.blkIndent&&(p.sCount[m]+=p.blkIndent),p.md.block.tokenize(p,m,g,!0),p.parentType=v,p.blkIndent-=4,p.tShift[m]=y,p.sCount[m]=k,p.bMarks[m]=w,(S=new p.Token("footnote_reference_close","",-1)).level=--p.level,p.tokens.push(S),!0},{alt:["paragraph","reference"]}),o.inline.ruler.after("image","footnote_inline",function(p,m){var g,b,w,y,k=p.posMax,v=p.pos;return!(v+2>=k)&&p.src.charCodeAt(v)===94&&p.src.charCodeAt(v+1)===91&&(g=v+2,!((b=u(p,v+1))<0)&&(m||(p.env.footnotes||(p.env.footnotes={}),p.env.footnotes.list||(p.env.footnotes.list=[]),w=p.env.footnotes.list.length,p.md.inline.parse(p.src.slice(g,b),p.md,p.env,y=[]),p.push("footnote_ref","",0).meta={id:w},p.env.footnotes.list[w]={content:p.src.slice(g,b),tokens:y}),p.pos=b+1,p.posMax=k,!0))}),o.inline.ruler.after("footnote_inline","footnote_ref",function(p,m){var g,b,w,y,k=p.posMax,v=p.pos;if(v+3>k||!p.env.footnotes||!p.env.footnotes.refs||p.src.charCodeAt(v)!==91||p.src.charCodeAt(v+1)!==94)return!1;for(b=v+2;b<k;b++){if(p.src.charCodeAt(b)===32||p.src.charCodeAt(b)===10)return!1;if(p.src.charCodeAt(b)===93)break}return b!==v+2&&!(b>=k)&&(b++,g=p.src.slice(v+2,b-1),p.env.footnotes.refs[":"+g]!==void 0&&(m||(p.env.footnotes.list||(p.env.footnotes.list=[]),p.env.footnotes.refs[":"+g]<0?(w=p.env.footnotes.list.length,p.env.footnotes.list[w]={label:g,count:0},p.env.footnotes.refs[":"+g]=w):w=p.env.footnotes.refs[":"+g],y=p.env.footnotes.list[w].count,p.env.footnotes.list[w].count++,p.push("footnote_ref","",0).meta={id:w,subId:y,label:g}),p.pos=b,p.posMax=k,!0))}),o.core.ruler.after("inline","footnote_tail",function(p){var m,g,b,w,y,k,v,x,E,S,O=!1,C={};if(p.env.footnotes&&(p.tokens=p.tokens.filter(function(j){return j.type==="footnote_reference_open"?(O=!0,E=[],S=j.meta.label,!1):j.type==="footnote_reference_close"?(O=!1,C[":"+S]=E,!1):(O&&E.push(j),!O)}),p.env.footnotes.list)){for(k=p.env.footnotes.list,v=new p.Token("footnote_block_open","",1),p.tokens.push(v),m=0,g=k.length;m<g;m++){for((v=new p.Token("footnote_open","",1)).meta={id:m,label:k[m].label},p.tokens.push(v),k[m].tokens?(x=[],(v=new p.Token("paragraph_open","p",1)).block=!0,x.push(v),(v=new p.Token("inline","",0)).children=k[m].tokens,v.content=k[m].content,x.push(v),(v=new p.Token("paragraph_close","p",-1)).block=!0,x.push(v)):k[m].label&&(x=C[":"+k[m].label]),x&&(p.tokens=p.tokens.concat(x)),y=p.tokens[p.tokens.length-1].type==="paragraph_close"?p.tokens.pop():null,w=k[m].count>0?k[m].count:1,b=0;b<w;b++)(v=new p.Token("footnote_anchor","",0)).meta={id:m,subId:b,label:k[m].label},p.tokens.push(v);y&&p.tokens.push(y),v=new p.Token("footnote_close","",-1),p.tokens.push(v)}v=new p.Token("footnote_block_close","",-1),p.tokens.push(v)}})}},function(d,_,a){d.exports=function(e){e.inline.ruler.before("emphasis","ins",function(t,n){var r,l,i,c,s=t.pos,o=t.src.charCodeAt(s);if(n||o!==43||(i=(l=t.scanDelims(t.pos,!0)).length,c=String.fromCharCode(o),i<2))return!1;for(i%2&&(t.push("text","",0).content=c,i--),r=0;r<i;r+=2)t.push("text","",0).content=c+c,t.delimiters.push({marker:o,jump:r,token:t.tokens.length-1,level:t.level,end:-1,open:l.can_open,close:l.can_close});return t.pos+=l.length,!0}),e.inline.ruler2.before("emphasis","ins",function(t){var n,r,l,i,c,s=[],o=t.delimiters,u=t.delimiters.length;for(n=0;n<u;n++)(l=o[n]).marker===43&&l.end!==-1&&(i=o[l.end],(c=t.tokens[l.token]).type="ins_open",c.tag="ins",c.nesting=1,c.markup="++",c.content="",(c=t.tokens[i.token]).type="ins_close",c.tag="ins",c.nesting=-1,c.markup="++",c.content="",t.tokens[i.token-1].type==="text"&&t.tokens[i.token-1].content==="+"&&s.push(i.token-1));for(;s.length;){for(r=(n=s.pop())+1;r<t.tokens.length&&t.tokens[r].type==="ins_close";)r++;n!==--r&&(c=t.tokens[r],t.tokens[r]=t.tokens[n],t.tokens[n]=c)}})}},function(d,_,a){d.exports=function(e){e.inline.ruler.before("emphasis","mark",function(t,n){var r,l,i,c,s=t.pos,o=t.src.charCodeAt(s);if(n||o!==61||(i=(l=t.scanDelims(t.pos,!0)).length,c=String.fromCharCode(o),i<2))return!1;for(i%2&&(t.push("text","",0).content=c,i--),r=0;r<i;r+=2)t.push("text","",0).content=c+c,t.delimiters.push({marker:o,jump:r,token:t.tokens.length-1,level:t.level,end:-1,open:l.can_open,close:l.can_close});return t.pos+=l.length,!0}),e.inline.ruler2.before("emphasis","mark",function(t){var n,r,l,i,c,s=[],o=t.delimiters,u=t.delimiters.length;for(n=0;n<u;n++)(l=o[n]).marker===61&&l.end!==-1&&(i=o[l.end],(c=t.tokens[l.token]).type="mark_open",c.tag="mark",c.nesting=1,c.markup="==",c.content="",(c=t.tokens[i.token]).type="mark_close",c.tag="mark",c.nesting=-1,c.markup="==",c.content="",t.tokens[i.token-1].type==="text"&&t.tokens[i.token-1].content==="="&&s.push(i.token-1));for(;s.length;){for(r=(n=s.pop())+1;r<t.tokens.length&&t.tokens[r].type==="mark_close";)r++;n!==--r&&(c=t.tokens[r],t.tokens[r]=t.tokens[n],t.tokens[n]=c)}})}},function(d,_){var a=!0,e=!1,t=!1;function n(c,s,o){var u=c.attrIndex(s),f=[s,o];u<0?c.attrPush(f):c.attrs[u]=f}function r(c,s){for(var o=c[s].level-1,u=s-1;u>=0;u--)if(c[u].level===o)return u;return-1}function l(c,s){return c[s].type==="inline"&&function(o){return o.type==="paragraph_open"}(c[s-1])&&function(o){return o.type==="list_item_open"}(c[s-2])&&function(o){return o.content.indexOf("[ ] ")===0||o.content.indexOf("[x] ")===0||o.content.indexOf("[X] ")===0}(c[s])}function i(c,s){if(c.children.unshift(function(u,f){var p=new f("html_inline","",0),m=a?' disabled="" ':"";return u.content.indexOf("[ ] ")===0?p.content='<input class="task-list-item-checkbox"'+m+'type="checkbox">':u.content.indexOf("[x] ")!==0&&u.content.indexOf("[X] ")!==0||(p.content='<input class="task-list-item-checkbox" checked=""'+m+'type="checkbox">'),p}(c,s)),c.children[1].content=c.children[1].content.slice(3),c.content=c.content.slice(3),e)if(t){c.children.pop();var o="task-item-"+Math.ceil(1e7*Math.random()-1e3);c.children[0].content=c.children[0].content.slice(0,-1)+' id="'+o+'">',c.children.push(function(u,f,p){var m=new p("html_inline","",0);return m.content='<label class="task-list-item-label" for="'+f+'">'+u+"</label>",m.attrs=[{for:f}],m}(c.content,o,s))}else c.children.unshift(function(u){var f=new u("html_inline","",0);return f.content="<label>",f}(s)),c.children.push(function(u){var f=new u("html_inline","",0);return f.content="</label>",f}(s))}d.exports=function(c,s){s&&(a=!s.enabled,e=!!s.label,t=!!s.labelAfter),c.core.ruler.after("inline","github-task-lists",function(o){for(var u=o.tokens,f=2;f<u.length;f++)l(u,f)&&(i(u[f],o.Token),n(u[f-2],"class","task-list-item"+(a?"":" enabled")),n(u[r(u,f-2)],"class","contains-task-list"))})}},function(d,_,a){d.exports=function(e,t,n){var r=(n=n||{}).marker||":",l=r.charCodeAt(0),i=r.length,c=n.validate||function(o){return o.trim().split(" ",2)[0]===t},s=n.render||function(o,u,f,p,m){return o[u].nesting===1&&o[u].attrPush(["class",t]),m.renderToken(o,u,f,p,m)};e.block.ruler.before("fence","container_"+t,function(o,u,f,p){var m,g,b,w,y,k,v,x,E=!1,S=o.bMarks[u]+o.tShift[u],O=o.eMarks[u];if(l!==o.src.charCodeAt(S))return!1;for(m=S+1;m<=O&&r[(m-S)%i]===o.src[m];m++);if((b=Math.floor((m-S)/i))<3||(m-=(m-S)%i,w=o.src.slice(S,m),y=o.src.slice(m,O),!c(y)))return!1;if(p)return!0;for(g=u;!(++g>=f)&&!((S=o.bMarks[g]+o.tShift[g])<(O=o.eMarks[g])&&o.sCount[g]<o.blkIndent);)if(l===o.src.charCodeAt(S)&&!(o.sCount[g]-o.blkIndent>=4)){for(m=S+1;m<=O&&r[(m-S)%i]===o.src[m];m++);if(!(Math.floor((m-S)/i)<b||(m-=(m-S)%i,(m=o.skipSpaces(m))<O))){E=!0;break}}return v=o.parentType,x=o.lineMax,o.parentType="container",o.lineMax=g,(k=o.push("container_"+t+"_open","div",1)).markup=w,k.block=!0,k.info=y,k.map=[u,g],o.md.block.tokenize(o,u+1,g),(k=o.push("container_"+t+"_close","div",-1)).markup=o.src.slice(S,m),k.block=!0,o.parentType=v,o.lineMax=x,o.line=g+(E?1:0),!0},{alt:["paragraph","reference","blockquote","list"]}),e.renderer.rules["container_"+t+"_open"]=s,e.renderer.rules["container_"+t+"_close"]=s}},function(d,_,a){d.exports=function(e){var t,n=/^@\[toc\](?:\((?:\s+)?([^\)]+)(?:\s+)?\)?)?(?:\s+?)?$/im,r=function(l){return l.replace(/[^\w\s]/gi,"").split(" ").join("_")};e.renderer.rules.heading_open=function(l,i){var c=l[i].tag,s=l[i+1];return s.type==="inline"?"<"+c+'><a id="'+(r(s.content)+"_"+s.map[0])+'"></a>':"</h1>"},e.renderer.rules.toc_open=function(l,i){return""},e.renderer.rules.toc_close=function(l,i){return""},e.renderer.rules.toc_body=function(l,i){for(var c=[],s=t.tokens,o=s.length,u=0;u<o;u++)if(s[u].type==="heading_close"){var f=s[u],p=s[u-1];p.type==="inline"&&c.push({level:+f.tag.substr(1,1),anchor:r(p.content)+"_"+p.map[0],content:p.content})}var m=0,g=c.map(function(b){var w=[];if(b.level>m)for(var y=b.level-m,k=0;k<y;k++)w.push("<ul>"),m++;else if(b.level<m)for(y=m-b.level,k=0;k<y;k++)w.push("</ul>"),m--;return(w=w.concat(['<li><a href="#',b.anchor,'">',b.content,"</a></li>"])).join("")});return"<h3>"+l[i].content+"</h3>"+g.join("")+new Array(m+1).join("</ul>")},e.core.ruler.push("grab_state",function(l){t=l}),e.inline.ruler.after("emphasis","toc",function(l,i){for(;l.src.indexOf(`
`)>=0&&l.src.indexOf(`
`)<l.src.indexOf("@[toc]");)l.tokens.slice(-1)[0].type==="softbreak"&&(l.src=l.src.split(`
`).slice(1).join(`
`),l.pos=0);var c;if(l.src.charCodeAt(l.pos)!==64||l.src.charCodeAt(l.pos+1)!==91)return!1;var s=n.exec(l.src);if(!s||(s=s.filter(function(p){return p})).length<1||i)return!1;(c=l.push("toc_open","toc",1)).markup="@[toc]",c=l.push("toc_body","",0);var o="Table of Contents";s.length>1&&(o=s.pop()),c.content=o,c=l.push("toc_close","toc",-1);var u=0,f=l.src.indexOf(`
`);return u=f!==-1?l.pos+f:l.pos+l.posMax+1,l.pos=u,!0})}},function(d,_){d.exports=function(a,e){(e=e||{}).highlighted===void 0&&(e.highlighted=!0),e.hljs===void 0&&(e.hljs="auto"),typeof e.langCheck!="function"&&(e.langCheck=function(){}),a.options.highlight=function(t,n){var r=e.hljs;if(e.hljs==="auto"&&(r=window.hljs),e.highlighted&&n&&r){if(r.getLanguage(n))return'<pre><div class="hljs"><code class="'+a.options.langPrefix+n+'">'+r.highlight(n,t,!0).value+"</code></div></pre>";typeof e.langCheck=="function"&&e.langCheck(n)}return'<pre><code class="'+a.options.langPrefix+n+'">'+a.utils.escapeHtml(t)+"</code></pre>"}}},function(d,_,a){var e=null;function t(l,i){var c,s,o=l.posMax,u=!0,f=!0;return c=i>0?l.src.charCodeAt(i-1):-1,s=i+1<=o?l.src.charCodeAt(i+1):-1,(c===32||c===9||s>=48&&s<=57)&&(f=!1),s!==32&&s!==9||(u=!1),{can_open:u,can_close:f}}function n(l,i){if(!e&&window.katex&&(e=window.katex),!e)return!1;var c,s,o,u;if(l.src[l.pos]!=="$")return!1;if(!t(l,l.pos).can_open)return i||(l.pending+="$"),l.pos+=1,!0;for(s=c=l.pos+1;(s=l.src.indexOf("$",s))!==-1;){for(u=s-1;l.src[u]==="\\";)u-=1;if((s-u)%2==1)break;s+=1}return s===-1?(i||(l.pending+="$"),l.pos=c,!0):s-c==0?(i||(l.pending+="$$"),l.pos=c+1,!0):t(l,s).can_close?(i||((o=l.push("math_inline","math",0)).markup="$",o.content=l.src.slice(c,s)),l.pos=s+1,!0):(i||(l.pending+="$"),l.pos=c,!0)}function r(l,i,c,s){if(!e&&window.katex&&(e=window.katex),!e)return!1;var o,u,f,p,m,g=!1,b=l.bMarks[i]+l.tShift[i],w=l.eMarks[i];if(b+2>w||l.src.slice(b,b+2)!=="$$")return!1;if(b+=2,o=l.src.slice(b,w),s)return!0;for(o.trim().slice(-2)==="$$"&&(o=o.trim().slice(0,-2),g=!0),f=i;!g&&!(++f>=c)&&!((b=l.bMarks[f]+l.tShift[f])<(w=l.eMarks[f])&&l.tShift[f]<l.blkIndent);)l.src.slice(b,w).trim().slice(-2)==="$$"&&(p=l.src.slice(0,w).lastIndexOf("$$"),u=l.src.slice(b,p),g=!0);return l.line=f+1,(m=l.push("math_block","math",0)).block=!0,m.content=(o&&o.trim()?o+`
`:"")+l.getLines(i+1,f,l.tShift[i],!0)+(u&&u.trim()?u:""),m.map=[i,l.line],m.markup="$$",!0}d.exports=function(l,i){i=i||{},l.inline.ruler.after("escape","math_inline",n),l.block.ruler.after("blockquote","math_block",r,{alt:["paragraph","reference","blockquote","list"]}),l.renderer.rules.math_inline=function(c,s){return function(o){!e&&window.katex&&(e=window.katex),i.displayMode=!1;try{return e.renderToString(o,i)}catch(u){return i.throwOnError&&console.log(u),o}}(c[s].content)},l.renderer.rules.math_block=function(c,s){return function(o){!e&&window.katex&&(e=window.katex),i.displayMode=!0;try{return"<p>"+e.renderToString(o,i)+"</p>"}catch(u){return i.throwOnError&&console.log(u),o}}(c[s].content)+`
`}}},function(d,_){d.exports=function(a,e){a.image_add=function(n,r){a.__image instanceof Object||(a.__image={}),a.__image[n]=r},a.image_del=function(n){a.__image instanceof Object||(a.__image={}),delete a.__image[n]};var t=a.renderer.rules.image;a.renderer.rules.image=function(n,r,l,i,c){var s=n[r].attrs;if(a.__image instanceof Object){for(var o=0;o<s.length;o++)if(s[o][0]=="src"&&a.__image.hasOwnProperty(n[r].attrs[o][1])){s.push(["rel",s[o][1]]),s[o][1]=a.__image[n[r].attrs[o][1]];break}}return t(n,r,l,i,c)}}},function(d,_,a){a(71)},function(d,_,a){(_=a(43)(!1)).push([d.i,".op-icon.dropdown-wrapper.dropdown[data-v-218640b4]{position:relative}.op-icon.dropdown-wrapper.dropdown[type=button][data-v-218640b4]{-webkit-appearance:unset}.op-icon.dropdown-wrapper.dropdown .popup-dropdown[data-v-218640b4]{position:absolute;display:block;background:#fff;top:32px;left:-45px;min-width:130px;z-index:1600;border:1px solid #ebeef5;border-radius:4px;box-shadow:0 2px 12px 0 rgba(0,0,0,0.1)}.op-icon.dropdown-wrapper.dropdown .popup-dropdown .dropdown-item[data-v-218640b4]:first-child{border-top-left-radius:3px;border-top-right-radius:3px}.op-icon.dropdown-wrapper.dropdown .popup-dropdown .dropdown-item[data-v-218640b4]:last-child{border-bottom-left-radius:3px;border-bottom-right-radius:3px}.op-icon.dropdown-wrapper.dropdown .popup-dropdown.op-header[data-v-218640b4]{left:-30px;min-width:90px}.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-enter-active[data-v-218640b4],.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-leave-active[data-v-218640b4]{opacity:1}.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-enter[data-v-218640b4],.op-icon.dropdown-wrapper.dropdown .popup-dropdown.fade-leave-active[data-v-218640b4]{opacity:0}.op-icon.dropdown-wrapper.dropdown .popup-dropdown.transition[data-v-218640b4],.op-icon.dropdown-wrapper.dropdown .popup-dropdown.transition .dropdown-item[data-v-218640b4]{transition:all .2s linear 0s}.op-icon.dropdown-wrapper.dropdown .dropdown-item[data-v-218640b4]{height:40px;line-height:40px;font-size:14px;color:#606266;position:relative}.op-icon.dropdown-wrapper.dropdown .dropdown-item[data-v-218640b4]:hover{color:#303133;background-color:#e9e9eb}.op-icon.dropdown-wrapper.dropdown .dropdown-item input[data-v-218640b4]{position:absolute;font-size:100px;right:0;top:0;opacity:0;cursor:pointer}.op-icon.dropdown-wrapper.dropdown .dropdown-images[data-v-218640b4]{box-sizing:border-box}.op-icon.dropdown-wrapper.dropdown .dropdown-images button[data-v-218640b4]{position:absolute;top:-1px;right:5px;font-size:14px}.op-icon.dropdown-wrapper.dropdown .dropdown-images button[data-v-218640b4]:hover{color:#f56c6c;background-color:transparent}.op-icon.dropdown-wrapper.dropdown .dropdown-images span[data-v-218640b4]{display:inline-block;width:80px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.op-icon.dropdown-wrapper.dropdown .dropdown-images:hover .image-show[data-v-218640b4]{display:block !important}.op-icon.dropdown-wrapper.dropdown .dropdown-images .image-show[data-v-218640b4]{display:none;position:absolute;left:-128px;top:0;width:120px;height:90px;object-fit:contain;border:1px solid #f2f6fc}.op-icon.dropdown-wrapper.dropdown .dropdown-images .image-show.transition[data-v-218640b4]{transition:all .2s linear 0s}.op-icon.dropdown-wrapper.dropdown .dropdown-images.transition[data-v-218640b4]{transition:all .2s linear 0s}.add-image-link-wrapper[data-v-218640b4]{position:fixed;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,0.7);z-index:1600;transition:all .1s linear 0s}.add-image-link-wrapper.fade-enter-active[data-v-218640b4],.add-image-link-wrapper.fade-leave-active[data-v-218640b4]{opacity:1}.add-image-link-wrapper.fade-enter[data-v-218640b4],.add-image-link-wrapper.fade-leave-active[data-v-218640b4]{opacity:0}.add-image-link-wrapper .add-image-link[data-v-218640b4]{position:fixed;box-sizing:border-box;text-align:center;width:24%;left:38%;height:auto;padding:40px;top:25%;transition:all .1s linear 0s;z-index:3;background:#fff;border-radius:2px}@media only screen and (max-width:1500px){.add-image-link-wrapper .add-image-link[data-v-218640b4]{width:34%;left:33%}}@media only screen and (max-width:1000px){.add-image-link-wrapper .add-image-link[data-v-218640b4]{width:50%;left:25%}}@media only screen and (max-width:600px){.add-image-link-wrapper .add-image-link[data-v-218640b4]{width:80%;left:10%}}.add-image-link-wrapper .add-image-link i[data-v-218640b4]{font-size:24px;position:absolute;right:8px;top:6px;color:rgba(0,0,0,0.7);cursor:pointer}.add-image-link-wrapper .add-image-link .title[data-v-218640b4]{font-size:20px;margin-bottom:30px;margin-top:10px;font-weight:500 !important}.add-image-link-wrapper .add-image-link .input-wrapper[data-v-218640b4]{margin-top:10px;width:80%;border:1px solid #eeece8;text-align:left;margin-left:10%;height:35px}.add-image-link-wrapper .add-image-link .input-wrapper input[data-v-218640b4]{height:32px;line-height:32px;font-size:15px;width:90%;margin-left:8px;border:none;outline:none}.add-image-link-wrapper .add-image-link .op-btn[data-v-218640b4]{width:100px;height:35px;display:inline-block;margin-top:30px;cursor:pointer;text-align:center;line-height:35px;opacity:.9;border-radius:2px;letter-spacing:1px;font-size:15px}.add-image-link-wrapper .add-image-link .op-btn.sure[data-v-218640b4]{background:#2185d0;color:#fff;margin-left:5%}.add-image-link-wrapper .add-image-link .op-btn.sure[data-v-218640b4]:hover{opacity:1}.add-image-link-wrapper .add-image-link .op-btn.cancel[data-v-218640b4]{border:1px solid #bcbcbc;color:#bcbcbc}.add-image-link-wrapper .add-image-link .op-btn.cancel[data-v-218640b4]:hover{color:#000}",""]),d.exports=_},function(d,_,a){a.r(_);var e=a(78),t=a(24);for(var n in t)["default"].indexOf(n)<0&&function(i){a.d(_,i,function(){return t[i]})}(n);a(219);var r=a(3);const l=a.n(r)()(t.default,[["render",e.a]]);_.default=l},function(d,_,a){a(73)},function(d,_,a){(_=a(43)(!1)).push([d.i,'.auto-textarea-wrapper{position:relative;width:100%;margin:0;padding:0;line-height:normal}.auto-textarea-wrapper .auto-textarea-block{display:block;white-space:pre-wrap;word-wrap:break-word !important;visibility:hidden;overflow:hidden;margin:0;padding:0;box-sizing:border-box;font-size:100%}.auto-textarea-wrapper .auto-textarea-input{font-family:Menlo,"Ubuntu Mono",Consolas,"Courier New","Microsoft Yahei","Hiragino Sans GB","WenQuanYi Micro Hei",sans-serif;position:absolute;width:100%;height:100%;top:0;left:0;margin:0;padding:0;overflow-y:hidden;color:#2c3e50}.auto-textarea-wrapper .auto-textarea-input.no-border{outline:0 none;border:none !important}.auto-textarea-wrapper .auto-textarea-input.no-resize{resize:none}',""]),d.exports=_},function(d,_,a){a(74)},function(d,_,a){(_=a(43)(!1)).push([d.i,"textarea:disabled{background-color:#fff}.v-note-wrapper{position:relative;min-width:300px;min-height:300px;display:flex;flex-direction:column;background-color:#fff;z-index:1500;text-align:left;border:1px solid #f2f6fc;border-radius:4px}.v-note-wrapper.fullscreen{position:fixed;left:0;right:0;bottom:0;top:0;margin:0;height:auto;z-index:1501}.v-note-wrapper .v-note-op{padding:1px;width:100%;display:flex;white-space:pre-line;flex:none;min-height:40px;user-select:none;border-bottom:1px solid #f2f6fc;border-radius:4px 4px 0 0;background-color:#fff;z-index:1}.v-note-wrapper .v-note-op .v-left-item,.v-note-wrapper .v-note-op .v-right-item{flex:1;min-height:40px;box-sizing:border-box}.v-note-wrapper .v-note-op .v-left-item .op-icon-divider,.v-note-wrapper .v-note-op .v-right-item .op-icon-divider{height:40px;border-left:1px solid #e5e5e5;margin:0 6px 0 4px}.v-note-wrapper .v-note-op .v-left-item .op-icon,.v-note-wrapper .v-note-op .v-right-item .op-icon{box-sizing:border-box;display:inline-block;cursor:pointer;height:28px;width:28px;margin:6px 0 5px 0;font-size:14px;padding:4.5px 6px 5px 3.5px;color:#757575;border-radius:5px;text-align:center;background:none;border:none;outline:none;line-height:1}.v-note-wrapper .v-note-op .v-left-item .op-icon.dropdown-wrapper,.v-note-wrapper .v-note-op .v-right-item .op-icon.dropdown-wrapper{line-height:18px}.v-note-wrapper .v-note-op .v-left-item .op-icon.selected,.v-note-wrapper .v-note-op .v-right-item .op-icon.selected{color:rgba(0,0,0,0.8);background:#eaeaea}.v-note-wrapper .v-note-op .v-left-item .op-icon:hover,.v-note-wrapper .v-note-op .v-right-item .op-icon:hover{color:rgba(0,0,0,0.8);background:#e9e9eb}.v-note-wrapper .v-note-op .v-left-item.transition .op-icon,.v-note-wrapper .v-note-op .v-right-item.transition .op-icon{transition:all .2s linear 0s}.v-note-wrapper .v-note-op .v-right-item{text-align:right;padding-right:6px;max-width:30%}.v-note-wrapper .v-note-op .v-left-item{text-align:left;padding-left:6px}.v-note-wrapper .v-note-panel{position:relative;border-top:none;display:flex;flex:1;width:100%;box-sizing:border-box;overflow:hidden}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper{flex:0 0 50%;width:50%;padding:0;overflow-y:scroll;overflow-x:hidden;box-sizing:border-box;cursor:text;border-bottom-left-radius:4px}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar{width:6px;background-color:#e5e5e5}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb{background-color:#b7b7b7;border-radius:4px}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb:hover{background-color:#a1a1a1}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-thumb:active{background-color:#a1a1a1}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style::-webkit-scrollbar-track{-webkit-box-shadow:0 0 0 #808080 inset}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.scroll-style-border-radius::-webkit-scrollbar{border-bottom-right-radius:4px}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.transition{transition:all .2s linear 0s}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.single-edit{width:100%;flex:0 0 100%;overflow-y:auto}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper.single-show{width:0;flex:0 0 0;display:none}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-div{width:100%;padding:20px 25px;box-sizing:border-box;outline:0 none;border:none !important;color:#2c3e50;font-size:16px}.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper{width:100%;padding:8px 25px 15px 25px}.v-note-wrapper .v-note-panel .v-note-show{flex:0 0 50%;width:50%;overflow-y:auto;padding:0 0;transition:all .2s linear 0s}.v-note-wrapper .v-note-panel .v-note-show.single-show{flex:0 0 100%;width:100%}.v-note-wrapper .v-note-panel .v-note-show .v-show-content,.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html{width:100%;height:100%;padding:8px 25px 15px 25px;overflow-y:auto;box-sizing:border-box;overflow-x:hidden}.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar,.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar{width:6px;background-color:#e5e5e5}.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb,.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb{background-color:#b7b7b7;border-radius:4px}.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb:hover,.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb:hover{background-color:#a1a1a1}.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-thumb:active,.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-thumb:active{background-color:#a1a1a1}.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style::-webkit-scrollbar-track,.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style::-webkit-scrollbar-track{-webkit-box-shadow:0 0 0 #808080 inset}.v-note-wrapper .v-note-panel .v-note-show .v-show-content.scroll-style-border-radius::-webkit-scrollbar,.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html.scroll-style-border-radius::-webkit-scrollbar{border-bottom-right-radius:4px}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper{display:flex;position:absolute;width:250px;right:0;top:0;bottom:0;height:100%;flex-direction:column;background-color:rgba(255,255,255,0.98);border-left:1px solid #f2f6fc;border-right:1px solid #f2f6fc}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.transition{transition:all .1s linear 0s}@media only screen and (max-width:768px){.v-note-wrapper .v-note-panel .v-note-navigation-wrapper{width:50%}}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-enter-active,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-leave-active{height:100%}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-enter,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper.slideTop-leave-active{height:0}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title{height:50px;width:100%;border-bottom:1px solid #f2f6fc;flex:none;line-height:50px;font-size:16px;box-sizing:border-box;padding:0 12px 0 18px}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title .v-note-navigation-close{float:right;color:#606266;font-size:18px;cursor:pointer}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-title .v-note-navigation-close:hover{color:#303133}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content{overflow-y:auto;flex:1;padding:8px 0}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar{width:6px;background-color:#e5e5e5}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb{background-color:#b7b7b7;border-radius:4px}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb:hover{background-color:#a1a1a1}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-thumb:active{background-color:#a1a1a1}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style::-webkit-scrollbar-track{-webkit-box-shadow:0 0 0 #808080 inset}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content.scroll-style-border-radius::-webkit-scrollbar{border-bottom-right-radius:4px}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h1,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6{margin:2px 0;font-weight:500;font-size:17px;color:#2185d0;cursor:pointer;line-height:normal;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 12px;border-bottom:none}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h1:hover,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2:hover,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3:hover,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4:hover,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5:hover,.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6:hover{color:#483d8b;text-decoration-line:underline}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h2{padding-left:27px;font-size:17px}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h3{padding-left:42px;font-size:17px}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h4{padding-left:58px;font-size:15px}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h5{padding-left:72px;font-size:15px}.v-note-wrapper .v-note-panel .v-note-navigation-wrapper .v-note-navigation-content h6{padding-left:87px;font-size:15px}.v-note-wrapper .v-note-read-model{position:relative;display:none;width:100%;height:100%;background:#fbfbfb;padding:30px 8% 50px 8%;overflow-y:auto;box-sizing:border-box}.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar{width:6px;background-color:#e5e5e5}.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb{background-color:#b7b7b7;border-radius:4px}.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb:hover{background-color:#a1a1a1}.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-thumb:active{background-color:#a1a1a1}.v-note-wrapper .v-note-read-model.scroll-style::-webkit-scrollbar-track{-webkit-box-shadow:0 0 0 #808080 inset}.v-note-wrapper .v-note-read-model.scroll-style-border-radius::-webkit-scrollbar{border-bottom-right-radius:4px}.v-note-wrapper .v-note-read-model.show{display:block}.v-note-wrapper.shadow{border:none}.v-note-help-wrapper{position:fixed;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,0.7);z-index:1600;transition:all .1s linear 0s}.v-note-help-wrapper.fade-enter-active,.v-note-help-wrapper.fade-leave-active{opacity:1}.v-note-help-wrapper.fade-enter,.v-note-help-wrapper.fade-leave-active{opacity:0}.v-note-help-wrapper .v-note-help-content{position:relative;width:60%;max-width:800px;margin:30px auto;height:90%;min-width:320px;transition:all .1s linear 0s;z-index:3;border:1px solid #f2f6fc}.v-note-help-wrapper .v-note-help-content.shadow{border:none;box-shadow:0 0 5px rgba(0,0,0,0.157),0 0 5px rgba(0,0,0,0.227)}.v-note-help-wrapper .v-note-help-content i{font-size:28px;position:absolute;right:15px;top:8px;color:rgba(0,0,0,0.7);cursor:pointer}.v-note-help-wrapper .v-note-help-content i:hover{color:#000}.v-note-help-wrapper .v-note-help-content .v-note-help-show{width:100%;height:100%;font-size:18px;background:#fbfbfb;overflow-y:auto;padding:2% 6%}.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar{width:6px;background-color:#e5e5e5}.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb{background-color:#b7b7b7;border-radius:4px}.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb:hover{background-color:#a1a1a1}.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-thumb:active{background-color:#a1a1a1}.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style::-webkit-scrollbar-track{-webkit-box-shadow:0 0 0 #808080 inset}.v-note-help-wrapper .v-note-help-content .v-note-help-show.scroll-style-border-radius::-webkit-scrollbar{border-bottom-right-radius:4px}.v-note-img-wrapper{position:fixed;display:flex;justify-content:center;align-items:center;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,0.7);z-index:1600;transition:all .1s linear 0s}.v-note-img-wrapper.fade-enter-active,.v-note-img-wrapper.fade-leave-active{opacity:1}.v-note-img-wrapper.fade-enter,.v-note-img-wrapper.fade-leave-active{opacity:0}.v-note-img-wrapper img{flex:0 0 auto;z-index:3}.v-note-img-wrapper i{font-size:28px;position:absolute;right:15px;top:8px;color:rgba(255,255,255,0.7);cursor:pointer}.v-note-img-wrapper i:hover{color:#fff}",""]),d.exports=_},function(d,_,a){a(235)},function(d,_){},,,,,,,,,function(d,_){},,function(d,_){}])})})(mavonEditor);var mavonEditorExports=mavonEditor.exports;const _hoisted_1={class:"article-edit"},_hoisted_2={class:"title"},_hoisted_3={class:"image-picker"},_hoisted_4=["onClick"],_hoisted_5={class:"image-picker-name"},_hoisted_6={key:0,class:"selected-mark"},_sfc_main={__name:"ArticleEditView",setup(d){const _=useRouter(),a=useRoute();useUserStore();const e=ref(null),t=computed(()=>!!a.query.id),n=ref(!1),r=ref({title:"",category:"",tags:[],banner_id:null,abstract:"",content:""}),l={title:[{required:!0,message:"标题不能为空",trigger:"blur"}],content:[{required:!0,message:"内容不能为空",trigger:"blur"}]},i=ref([]),c=ref([]),s=ref([]);async function o(){var g,b;try{const[w,y]=await Promise.all([apiGetTagList({limit:100}),apiGetImageList({limit:50})]),v=(((g=w==null?void 0:w.data)==null?void 0:g.list)||(w==null?void 0:w.data)||[]).map(x=>typeof x=="string"?x:x.title||x.name||x.tag||"").filter(x=>x);c.value=v,i.value=v,s.value=((b=y==null?void 0:y.data)==null?void 0:b.list)||(y==null?void 0:y.data)||[]}catch(w){console.error("加载元数据失败",w)}}async function u(g){const w=(await apiGetArticleDetail(g)).data;r.value.title=w.title,r.value.category=w.category||"",r.value.tags=w.tags||[],r.value.banner_id=w.banner_id||null,r.value.abstract=w.abstract||"",r.value.content=w.content||""}onMounted(async()=>{await o(),t.value&&await u(a.query.id)});async function f(g,b){const w=new FormData;w.append("image",b);try{const k=(await apiUploadImage(w)).data;e.value.$img2Url(g,k)}catch{ElMessage.error("图片上传失败")}}async function p(){var g,b;n.value=!0;try{t.value?(await apiUpdateArticle({...r.value,id:String(a.query.id)}),ElMessage.success("文章更新成功")):(await apiCreateArticle(r.value),ElMessage.success("文章创建成功")),_.push({name:"ArticleManage"})}catch(w){ElMessage.error(((b=(g=w.response)==null?void 0:g.data)==null?void 0:b.msg)||"操作失败")}finally{n.value=!1}}function m(){_.back()}return(g,b)=>{const w=resolveComponent("el-input"),y=resolveComponent("el-form-item"),k=resolveComponent("el-option"),v=resolveComponent("el-select"),x=resolveComponent("el-image"),E=resolveComponent("el-empty"),S=resolveComponent("el-button"),O=resolveComponent("el-form"),C=resolveComponent("el-card");return openBlock(),createElementBlock("div",_hoisted_1,[createVNode(C,{class:"edit-card",shadow:"hover"},{default:withCtx(()=>[createBaseVNode("h2",_hoisted_2,toDisplayString(t.value?"编辑文章":"新建文章"),1),createVNode(O,{model:r.value,ref:"articleForm","label-width":"80px",rules:l,onSubmit:withModifiers(p,["prevent"])},{default:withCtx(()=>[createVNode(y,{label:"标题",prop:"title"},{default:withCtx(()=>[createVNode(w,{modelValue:r.value.title,"onUpdate:modelValue":b[0]||(b[0]=j=>r.value.title=j),placeholder:"请输入标题"},null,8,["modelValue"])]),_:1}),createVNode(y,{label:"分类",prop:"category"},{default:withCtx(()=>[createVNode(v,{modelValue:r.value.category,"onUpdate:modelValue":b[1]||(b[1]=j=>r.value.category=j),placeholder:"请选择分类",filterable:"","allow-create":""},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(i.value,j=>(openBlock(),createBlock(k,{key:j,label:j,value:j},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),createVNode(y,{label:"标签",prop:"tags"},{default:withCtx(()=>[createVNode(v,{modelValue:r.value.tags,"onUpdate:modelValue":b[2]||(b[2]=j=>r.value.tags=j),multiple:"",placeholder:"请选择标签",filterable:"","allow-create":""},{default:withCtx(()=>[(openBlock(!0),createElementBlock(Fragment,null,renderList(c.value,j=>(openBlock(),createBlock(k,{key:j,label:j,value:j},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),_:1}),createVNode(y,{label:"封面",prop:"banner_id"},{default:withCtx(()=>[createBaseVNode("div",_hoisted_3,[(openBlock(!0),createElementBlock(Fragment,null,renderList(s.value,j=>(openBlock(),createElementBlock("div",{key:j.id,class:normalizeClass(["image-picker-item",{"is-selected":r.value.banner_id===j.id}]),onClick:T=>r.value.banner_id=r.value.banner_id===j.id?null:j.id},[createVNode(x,{src:g.$resolveImg(j.path),fit:"cover",style:{width:"80px",height:"60px","border-radius":"4px"}},null,8,["src"]),createBaseVNode("div",_hoisted_5,toDisplayString(j.name),1),r.value.banner_id===j.id?(openBlock(),createElementBlock("div",_hoisted_6,"✓")):createCommentVNode("",!0)],10,_hoisted_4))),128)),s.value.length===0?(openBlock(),createBlock(E,{key:0,description:"暂无图片","image-size":40})):createCommentVNode("",!0)])]),_:1}),createVNode(y,{label:"摘要",prop:"abstract"},{default:withCtx(()=>[createVNode(w,{modelValue:r.value.abstract,"onUpdate:modelValue":b[3]||(b[3]=j=>r.value.abstract=j),type:"textarea",rows:"3",placeholder:"文章摘要"},null,8,["modelValue"])]),_:1}),createVNode(y,{label:"内容",prop:"content"},{default:withCtx(()=>[createVNode(unref(mavonEditorExports.mavonEditor),{ref_key:"mdRef",ref:e,modelValue:r.value.content,"onUpdate:modelValue":b[4]||(b[4]=j=>r.value.content=j),style:{height:"500px",width:"100%","z-index":"10"},onImgAdd:f},null,8,["modelValue"])]),_:1}),createVNode(y,null,{default:withCtx(()=>[createVNode(S,{type:"primary",onClick:p,loading:n.value},{default:withCtx(()=>[createTextVNode(toDisplayString(t.value?"更新":"创建"),1)]),_:1},8,["loading"]),createVNode(S,{onClick:m},{default:withCtx(()=>[...b[5]||(b[5]=[createTextVNode("返回",-1)])]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})])}}},ArticleEditView=_export_sfc(_sfc_main,[["__scopeId","data-v-5ec6bb45"]]);export{ArticleEditView as default};
