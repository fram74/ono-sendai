(function(){var a,b,c,d,e=[].slice;_.mixin({multiSort:function(){var a,b,c;return a=arguments[0],c=2<=arguments.length?e.call(arguments,1):[],b=a.slice(),b.sort(function(a,b){var d,e,f,g;for(f=0,g=c.length;g>f;f++)if(d=c[f],0!==(e=d(a,b)))return e;return e})},concat:function(){var a,b,c,d,f;for(c=1<=arguments.length?e.call(arguments,0):[],b=[],d=0,f=c.length;f>d;d++)a=c[d],null!=a&&(b=b.concat(a));return b},noop:function(){},profile:function(a){return function(){var b;return b=1<=arguments.length?e.call(arguments,0):[],console.profile(),a.apply(null,b),console.profileEnd()}}}),a="ąàáäâãåæăćęèéëêìíïîłńòóöôõōøśșțùúüûñçżź",d="aaaaaaaaaceeeeeiiiilnooooooosstuuuunczz",c=RegExp("["+a+"]","g"),b=_.object(_.zip(_.str.chars(a),_.str.chars(d))),_.mixin({stripDiacritics:function(a){return a=String(a).toLowerCase().replace(c,function(a){return b[a]})}})}).call(this),function(){_.mixin(_.str.exports()),angular.module("deckBuilder",["ui.bootstrap.buttons","ui.bootstrap.tooltip"]).config(function(){return FastClick.attach(document.body)})}.call(this),function(){angular.module("deckBuilder").controller("MainCtrl",["$scope","filterDefaults",function(a,b){return a.filter=b,a.grid={zoom:.5}}])}.call(this),function(){angular.module("deckBuilder").controller("CardsCtrl",["$rootScope","$scope","$window","$log","cardService",function(a,b,c,d,e){var f;return b.selectedCard=null,a.broadcastZoomStart=function(){return b.$broadcast("zoomStart")},a.broadcastZoomEnd=function(){return b.$broadcast("zoomEnd")},f=function(a){return _(a).chain().map(function(a){return[_.extend(a,{isHeader:!0}),a.cards]}).flatten().value()},b.selectCard=function(a){return d.info("Selected card changing to "+a.title),b.selectedCard=a},b.deselectCard=function(){return d.info("Card deselected"),b.selectedCard=null},b.$watch("filter",function(a){return e.getCards(a).then(function(a){return b.cardsAndGroups=f(a)})},!0)}])}.call(this),function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}},c=[].slice;a=function(){function a(a,c,e){var f=this;this.searchService=c,this.filterDescriptors=e,this._augmentCards=b(this._augmentCards,this),this._sortFnFor=b(this._sortFnFor,this),this._groupCards=b(this._groupCards,this),this._buildFilterFunction=b(this._buildFilterFunction,this),this._enabledTypes=b(this._enabledTypes,this),this._matchesFilter=b(this._matchesFilter,this),this._filterCards=b(this._filterCards,this),this._searchCards=b(this._searchCards,this),this.searchService=c,this._cards=[],this._cardsPromise=a.get(d).then(function(a){var b,c;return f._cards=a.data,c=a.status,b=a.headers,window.cards=f._cards,f.searchService.indexCards(f._cards),f._augmentCards(f._cards),f._cards})}var d,e,f,g,h;return d="data/cards.json",e={Identity:0,Event:1,Hardware:2,Program:3,Resource:4,Agenda:5,Asset:6,Operation:7,ICE:8,Upgrade:9},f={Anarch:0,Criminal:1,"Haas-Bioroid":2,Jinteki:3,NBN:4,Shaper:5,"Weyland Consortium":6,Neutral:7},h={"Core Set":0,"What Lies Ahead":1,"Trace Amount":2,"Cyber Exodus":3,"A Study in Static":4,"Humanity's Shadow":5,"Future Proof":6,"Creation and Control":7,"Opening Moves":8,"Second Thoughts":9,"Mala Tempora":10,"True Colors":11,"Fear and Loathing":12,"Double Time":13},g={and:function(){var a,b,d,e,f;for(d=arguments[0],a=2<=arguments.length?c.call(arguments,1):[],e=0,f=d.length;f>e;e++)if(b=d[e],!b.apply(null,a))return!1;return!0},"=":function(a,b){return a===b},"<":function(a,b){return b>a},"≤":function(a,b){return b>=a},">":function(a,b){return a>b},"≥":function(a,b){return a>=b}},a.prototype.subTypes={corp:{},runner:{}},a.prototype.comparisonOperators=["=","<","≤",">","≥"],a.prototype.getCards=function(a){return null==a&&(a={}),this._cardsPromise.then(_.partial(this._searchCards,a)).then(_.partial(this._filterCards,a)).then(_.partial(this._groupCards,a))["catch"](function(a){return console.error(a)})},a.prototype._searchCards=function(a){var b;return b=a.search,_.trim(b).length>0?this.searchService.search(b):this._cards},a.prototype._filterCards=function(a,b){var c,d,e,f,g,h;for(d=this._enabledTypes(a),e=this._buildFilterFunction(a,d),h=[],f=0,g=b.length;g>f;f++)c=b[f],this._matchesFilter(c,a,{enabledTypes:d,filterFn:e})&&h.push(c);return h},a.prototype._matchesFilter=function(a,b,c){var d,e;return d=c.enabledTypes,e=c.filterFn,(null!=b.side?a.side===b.side:!0)&&(null!=d?d[a.type]:!0)&&(null!=e?e(a):!0)},a.prototype._enabledTypes=function(a){var b,c,d,e;return d=null!=(e=a.activeGroup)?e.name:void 0,null==d||"general"===d?null:(b=this.filterDescriptors[d].cardType,c={},c[b]=!0,c)},a.prototype._buildFilterFunction=function(a){var b,c,d,e,f=this;return c=["general"],a.activeGroup&&c.push(a.activeGroup.name),b=null!=(null!=(e=a.activeGroup)?e.excludedGeneralFields:void 0)||{},d=_(c).chain().map(function(a){return f.filterDescriptors[a]}).filter(function(a){return null!=a.fieldFilters}).pluck("fieldFilters").map(function(c){return _.map(c,function(c,d){return null!=b[d]||null!=c.inclusionPredicate&&!c.inclusionPredicate(a)?void 0:f._buildFilter(c,a.fieldFilters[d])})}).flatten().compact().value(),_.isEmpty(d)?null:_.partial(g.and,d)},a.prototype._buildFilter=function(a,b){switch(a.type){case"numeric":if(null!=b.value&&null!=b.operator)return this._buildNumericFilter(a,b);break;case"inSet":return this._buildInSetFilter(a,b);default:return console.warn("Unknown filter type: "+a.type)}},a.prototype._buildNumericFilter=function(a,b){return function(c){var d,e,f,h,i;for(d=_.isArray(a.cardField)?a.cardField:[a.cardField],h=0,i=d.length;i>h;h++)if(e=d[h],null!=c[e])return f=c[e],g[b.operator](f,b.value);return!1}},a.prototype._buildInSetFilter=function(a,b){return function(c){var d;return d="faction"===a.cardField?""+c.side+": "+c.faction:c[a.cardField],b[a.modelMappings[d]]}},a.prototype._groupCards=function(a,b){var c,d,e;return c=a.groupings,d=_(c).chain().concat(["title"]).map(this._sortFnFor).value(),(e=_(b).chain()).multiSort.apply(e,d).groupBy(function(a){return _.map(c,function(b){return a[b]})}).pairs().map(function(a){return{id:a[0].replace(/,/g," ").toLowerCase(),title:a[0].split(","),cards:a[1]}}).value()},a.prototype._sortFnFor=function(a){switch(a){case"type":return function(a,b){return e[a.type]-e[b.type]};case"faction":return function(a,b){return f[a.faction]-f[b.faction]};case"cost":case"factioncost":return function(b,c){return void 0===b[a]||void 0===c[a]?0:b[a]-c[a]};case"setname":return function(a,b){return h[a.setname]-h[b.setname]};default:return function(b,c){return b[a].localeCompare(c[a])}}},a.prototype._augmentCards=function(a){var b,c,d,e,f,g,h,i,j,k;for(k=[],e=0,g=a.length;g>e;e++){for(b=a[e],b.subtypes=null!=b.subtype?b.subtype.split(" - "):[],b.id=b.imagesrc,c=b.side.toLowerCase(),i=b.subtypes,f=0,h=i.length;h>f;f++)d=i[f],null!=this.subTypes[c][d]?this.subTypes[c][d]++:this.subTypes[c][d]=1;switch(b.type){case"ICE":k.push(b.subroutinecount=(null!=(j=b.text.match(/\[Subroutine\]/g))?j.length:void 0)||0);break;case"Identity":k.push(delete b.cost);break;default:k.push(void 0)}}return k},a}(),angular.module("deckBuilder").service("cardService",["$http","searchService","filterDescriptors",function(b,c,d){return new a(b,c,d)}])}.call(this),function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a){var c;this.$q=a,this._tokenize=b(this._tokenize,this),this._mapResultsToCards=b(this._mapResultsToCards,this),this.search=b(this.search,this),this.indexCards=b(this.indexCards,this),c=[_.stripDiacritics],lunr.tokenizer=this._tokenize,this._index=lunr(function(){var a,b,d;for(b=0,d=c.length;d>b;b++)a=c[b],this.pipeline.before(function(){},a);return this.ref("title"),this.field("title",{boost:10}),this.field("faction",{boost:5}),this.field("type"),this.field("subtype"),this.field("text"),this.field("setname")}),window.search=this._index.search.bind(this._index)}return a.prototype.indexCards=function(a){var b,c,d,e;for(this.cards=a,this._cardsByTitle=_.object(_.zip(_.pluck(a,"title"),a)),e=this.cards,c=0,d=e.length;d>c;c++)b=e[c],this._index.add(b);return this._index.pipeline.remove(lunr.stopWordFilter)},a.prototype.search=function(a){var b;return b=this._mapResultsToCards(this._index.search(a)),this.$q.when(b)},a.prototype._mapResultsToCards=function(a){var b,c,d,e;if(null==a)return[];for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this._cardsByTitle[b.ref]);return e},a.prototype._tokenize=function(a){var b;return arguments.length&&null!=a?_.isArray(a)?a.map(function(a){return a.toLowerCase()}):(b=a.toString().replace(/[\[\]{}'"]/g," "),_(b).chain().stripTags().words().map(function(a){return a.split("-")}).flatten().value()):[]},a}(),angular.module("deckBuilder").service("searchService",["$q",function(b){return new a(b)}])}.call(this),function(){"use strict";angular.module("deckBuilder").directive("numericFilter",["cardService",function(a){return{templateUrl:"views/directives/nr-numeric-filter.html",scope:{filter:"=filterAttr",placeholder:"@placeholder",id:"@id"},restrict:"E",link:function(b,c){var d,e;return b.comparisonOperators=a.comparisonOperators,e=c.find("input"),e.keydown(jwerty.event("esc",function(){return b.$apply(function(){return b.filter.value=void 0})})),d=!0,b.$watch("filter.operator",function(){return d?d=!1:e.focus()})}}}])}.call(this),function(){angular.module("deckBuilder").directive("nrNav",function(){return{templateUrl:"views/directives/nr-nav.html",replace:!0,restrict:"E"}})}.call(this),function(){angular.module("deckBuilder").directive("dropdownToggle",["$document","$location",function(a){var b,c;return c=null,b=function(){},{restrict:"CA",link:function(d,e){return d.$watch("$location.path",function(){return b()}),e.parent().bind("click",function(){return b()}),e.bind("click",function(d){var f,g;return g=e===c,d.preventDefault(),d.stopPropagation(),c&&b(),g?void 0:(f=e.parent(),f.addClass("open"),f.find(".dropdown-menu a:first").focus(),c=e,b=function(d){return d&&(d.preventDefault(),d.stopPropagation()),a.unbind("click",b),e.parent().removeClass("open"),b=angular.noop,c=null},a.bind("click",b))})}}}]).directive("dropdownMenu",["$document",function(a){return{restrict:"CA",link:function(b,c){var d,e;return d=c.parent(),e=d.find(".dropdown-toggle"),c.keydown(function(b){var f,g,h;if(jwerty.is("esc/up/down/enter/space",b)&&(b.preventDefault(),b.stopPropagation(),!c.is(".disabled, :disabled"))){if(g=d.hasClass("open"),jwerty.is("esc",b))return e.click(),e.focus(),void 0;if(jwerty.is("enter/space",b))return $(b.target).click(),void 0;if(h=c.find("a"),!_.isEmpty(h))return f=h.index(a.attr("activeElement")),jwerty.is("up",b)&&f>0?f--:jwerty.is("down",b)&&f<h.length-1&&f++,h.eq(f).focus()}})}}}])}.call(this),function(){angular.module("deckBuilder").controller("FilterCtrl",["$scope","filterUI",function(a,b){var c;return a.filterUI=b,c=_.findWhere(b,{name:"general"}),a.filter.activeGroup=c,a.$watch("filter.side",function(){return a.filter.activeGroup=c,a.filter.primaryGrouping="faction",a.filter.secondaryGrouping="type"}),a.activateGroup=function(b){return a.filter.activeGroup=b,"general"===b.name?(a.filter.primaryGrouping="faction",a.filter.secondaryGrouping="type"):(a.filter.primaryGrouping="type",a.filter.secondaryGrouping="faction")},a.isActiveGroup=function(a,b){return b?a.name===b.name:!1},a.isGroupShown=function(a,b){return null!=a.side?a.side===b:!0},a.isFieldShown=function(a,b,c,d){var e;return c?"general"===b.name&&!(null!=(e=c.hiddenGeneralFields)?e[a.name]:void 0)||c.name===b.name&&(void 0===a.side||a.side===d):!1}}])}.call(this),function(){angular.module("deckBuilder").value("filterDefaults",{side:"Corp",groupings:["faction","type"],fieldFilters:{faction:{haasBioroid:!0,jinteki:!0,nbn:!0,weyland:!0,corpNeutral:!0,anarch:!0,criminal:!0,shaper:!0,runnerNeutral:!0},cost:{operator:"="},influenceValue:{operator:"="},influenceLimit:{operator:"="},minimumDeckSize:{operator:"="},points:{operator:"="},assetTrashCost:{operator:"="},subroutineCount:{operator:"="},iceStrength:{operator:"="},influence:{operator:"="},upgradeTrashCost:{operator:"="},memoryUnits:{operator:"="},baseLink:{operator:"="}}}).constant("filterUI",[{name:"general",fieldFilters:[{name:"side",type:"side",icon:"side"},{name:"faction",type:"faction",icon:"faction",faction:{corp:[{name:"Haas-Bioroid",abbr:"HB",model:"haasBioroid"},{name:"Jinteki",abbr:"J",model:"jinteki"},{name:"NBN",abbr:"NBN",model:"nbn"},{name:"Weyland Consortium",abbr:"W",model:"weyland"},{name:"Neutral",abbr:"N",model:"corpNeutral"}],runner:[{name:"Anarch",abbr:"A",model:"anarch"},{name:"Criminal",abbr:"C",model:"criminal"},{name:"Shaper",abbr:"S",model:"shaper"},{name:"Neutral",abbr:"N",model:"runnerNeutral"}]}},{name:"cost",type:"numeric",placeholder:"Cost",icon:"credit"},{name:"influenceValue",type:"numeric",placeholder:"Influence",icon:"influence"}]},{name:"identities",hiddenGeneralFields:{cost:!0,influenceValue:!0},fieldFilters:[{name:"influenceLimit",type:"numeric",placeholder:"Influence Limit",icon:"influence"},{name:"minimumDeckSize",type:"numeric",placeholder:"Min. Deck Size",icon:"minimum-deck-size"},{side:"Runner",name:"baseLink",type:"numeric",placeholder:"Base Link",icon:"link-strength"}]},{name:"agendas",side:"Corp",fieldFilters:[{name:"points",type:"numeric",placeholder:"Agenda Points",icon:"agenda-point"}]},{name:"assets",side:"Corp",fieldFilters:[{name:"assetTrashCost",type:"numeric",placeholder:"Trash Cost",icon:"trash-cost"}]},{name:"operations",side:"Corp"},{name:"ice",side:"Corp",fieldFilters:[{name:"subroutineCount",type:"numeric",placeholder:"# Subroutines",icon:"subroutine"},{name:"iceStrength",type:"numeric",placeholder:"Strength",icon:"strength"}]},{name:"upgrades",side:"Corp",fieldFilters:[{name:"upgradeTrashCost",type:"numeric",placeholder:"Trash Cost",icon:"trash-cost"}]},{name:"events",side:"Runner"},{name:"hardware",side:"Runner"},{name:"programs",side:"Runner",fieldFilters:[{name:"memoryUnits",type:"numeric",placeholder:"Memory Units",icon:"memory-unit"}]},{name:"resources",side:"Runner"}]).constant("filterDescriptors",{general:{fieldFilters:{faction:{type:"inSet",cardField:"faction",modelMappings:{"Corp: Haas-Bioroid":"haasBioroid","Corp: Jinteki":"jinteki","Corp: NBN":"nbn","Corp: Weyland Consortium":"weyland","Corp: Neutral":"corpNeutral","Runner: Anarch":"anarch","Runner: Criminal":"criminal","Runner: Shaper":"shaper","Runner: Neutral":"runnerNeutral"}},cost:{type:"numeric",cardField:["advancementcost","cost"]},influenceValue:{type:"numeric",cardField:"factioncost"}}},identities:{cardType:"Identity",excludedGeneralFields:{cost:!0,influenceValue:!0},fieldFilters:{influenceLimit:{type:"numeric",cardField:"influencelimit"},minimumDeckSize:{type:"numeric",cardField:"minimumdecksize"},baseLink:{type:"numeric",cardField:"baselink",inclusionPredicate:function(a){return"Runner"===a.side}}}},ice:{cardType:"ICE",fieldFilters:{subroutineCount:{type:"numeric",cardField:"subroutinecount"},iceStrength:{type:"numeric",cardField:"strength"}}},agendas:{cardType:"Agenda",fieldFilters:{points:{type:"numeric",cardField:"agendapoints"}}},assets:{cardType:"Asset",fieldFilters:{assetTrashCost:{type:"numeric",cardField:"trash"}}},operations:{cardType:"Operation"},upgrades:{cardType:"Upgrade",fieldFilters:{upgradeTrashCost:{type:"numeric",cardField:"trash"}}},events:{cardType:"Event"},hardware:{cardType:"Hardware"},programs:{cardType:"Program",fieldFilters:{memoryUnits:{type:"numeric",cardField:"memoryunits"}}},resources:{cardType:"Resource"}})}.call(this),function(){var a;a=function(a,b){var c;switch(b){case"type":switch(a){case"Agenda":case"Asset":case"Operation":case"Upgrade":case"Event":case"Program":case"Resource":return""+a+"s";case"Identity":return"Identities";default:return a}break;case"cost":return a=parseInt(a),_.isNaN(a)?"Cost N/A":(c=""+a+" Credit",(0===a||a>1)&&(c+="s"),c);case"factioncost":return""!==a?""+a+" Influence":"Influence N/A";default:return a}},angular.module("deckBuilder").filter("primaryGroupTitle",function(){return function(b,c){return c.length>1?a(b[1],c[1]):a(b[0],c[0])}}).filter("secondaryGroupTitle",function(){return function(b,c){return c.length>1?a(b[0],c[0]):""}})}.call(this),function(){"use strict";angular.module("deckBuilder").directive("subtypeFilter",function(){return{template:"<div></div>",restrict:"E",link:function(){}}})}.call(this),function(){angular.module("deckBuilder").directive("nrSubnav",function(){return{templateUrl:"views/directives/nr-subnav.html",replace:!1,restrict:"E"}})}.call(this),function(){angular.module("deckBuilder").directive("uiHotkey",function(){return jwerty.key("tab",function(){}),{restrict:"A",link:function(a,b,c){var d;return console.info("Binding element to "+c.uiHotkey,b),d=function(a){return a.preventDefault(),b.is("button, .btn")?a.click():b.focus().select()},c.uiHotkey?jwerty.key(c.uiHotkey,d):void 0}}})}.call(this),function(){angular.module("deckBuilder").directive("nrCardsView",["$window","$q","$log","$timeout","cssUtils",function(a,b,c,d,e){return{restrict:"E",transclude:!0,templateUrl:"views/directives/nr-cards-view.html",scope:{cards:"=",zoom:"=",selectedCard:"="},link:function(f,g){var h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R;return C="grid",E=20,P=10,N=e.getVendorPropertyName("transform"),n=g.find(".grid"),r=n.width(),M=!0,v=!1,A=void 0,u=void 0,k=null,l=null,i=[],H=[],z=[],t=[],w=1,s=function(){var a;return r!==(a=n.width())?(r=a,!0):!1},p=function(){return g.find(".grid-item")},o=function(){return g.find(".grid-header")},q=function(){return g.find(".grid-item,.grid-header")},m=function(a,b){var c;return null==b&&(b=!1),c=b?1:f.zoom*w,{width:parseFloat(a.css("width"))*c,height:parseFloat(a.css("height"))*c}},y=function(a){return a.classList.contains("grid-item")},x=function(a){return a.classList.contains("grid-header")},G=function(){var a,b,f,j,k,l,o,p,s,v,w,x,B,C,D,F,G,I;if(s=q(),s.length){for(c.info("Performing grid layout on "+s.length+" items"),j=$(_.find(s,function(a){return a.classList.contains("grid-item")})),f=$(_.find(s,function(a){return a.classList.contains("grid-header")})),M&&(A=m(j),u=m(f,!0),M=!1),w=Math.floor((r+E)/(A.width+E)),x=w-1,B=Math.ceil(s.length/w),l=(r-w*A.width)/x,i=function(){var a,b;for(b=[],o=a=0;w>=0?w>a:a>w;o=w>=0?++a:--a)b.push(o*(A.width+l));return b}(),H=[],z=[],t=[],k=0,a=0,b=function(a,b){var c,d,e,f;return null==b&&(b=!1),c=_.last(H),d=b?u.height:A.height,d+=2*P,f=c?c.position+c.height:0,e={firstElement:a,height:d,position:f},H.push(e),e},o=G=0,I=s.length;I>G;o=++G)p=s[o],y(p)?(C=Math.floor(k/w)+a,C===H.length&&b(p),p.idx=z.push({x:i[k%w],y:H[C].position+P})-1,p.row=C,k++):(D=b(p,!0),p.idx=t.push({x:0,y:D.position+P})-1,p.row=H.length-1,a=H.length,k=0);return h(),v=_.last(H),n.height(v.position+v.height),F=g.hasClass("transitioned")?e.getTransitionDuration(s.first()):0,L(F),g.hasClass("transitioned")?d(_.noop,F):void 0}},F=function(){var a,b;return a=p(),a.length?(b=g.hasClass("transitioned")?e.getTransitionDuration(a.first()):0,g.hasClass("transitioned")?d(function(){},b):void 0):void 0},D=function(a){var c,d;return null==a&&(a=!1),d=a?j():b.when(),c="grid"===C?G:F,d.then(c).then(function(){return a?O():void 0})},B=_.debounce(D,300),h=function(){var a,b,c,d,e,g,h,i;if(!_.isEmpty(z))for(c=p(),d=c.length,a=e=0,h=c.length;h>e;a=++e)b=c[a],b.style.zIndex=d-a,b.style[N]="translate3d("+z[a].x+"px, "+z[a].y+"px, 0)                     scale("+Number(f.zoom)*w+")";if(!_.isEmpty(t))for(c=o(),d=c.length,a=g=0,i=c.length;i>g;a=++g)b=c[a],b.style.zIndex=d-a,b.style[N]="translate3d("+t[a].x+"px, "+t[a].y+"px, 0)"},Q=function(){return s()?(c.info("Laying out grid (grid width change)"),D(!0)):void 0},$(a).resize(Q),K=g.parents(".scrollable").first(),L=function(){var a,b;if(null!=k)return b=H[k.row],a=b.position+b.height*l,K.scrollTop(a)},J=function(){var a,b,c;if(!v)return c=K.scrollTop(),a=_.sortedIndex(H,{position:c},function(a){return a.position})-1,0>a&&(a=0),b=H[a],k=b.firstElement,l=(c-b.position)/b.height},K.scroll(_.debounce(J,100)),j=function(){return c.info("Downscaling cards"),I(2)},O=function(){return c.info("Upscaling cards"),I(1)},I=function(a){var c;return w===a?b.when():(w=a,c=g.hasClass("transitioned"),g.removeClass("transitioned"),g.toggleClass("downscaled",1!==a),h(),c?d(function(){return g.toggleClass("transitioned",c)}):b.when())},f.$watch("selectedCard",function(a){return C=a?"detail":(c.info("No cards selected. Displaying cards in grid mode"),"grid"),B()}),f.$watch("cards",function(){return c.info("Laying out grid (cards change)"),D()}),f.$on("zoomStart",function(){return j(),v=!0}),f.$on("zoomEnd",function(){return O(),v=!1}),R=function(){return M=!0,v?D():B()},f.$watch("zoom",R)}}}])}.call(this),function(){var a;a=function(){function a(a){this.$window=a,this.div=this.$window.document.createElement("div"),this.transitionProperty=this.getVendorPropertyName("transition")}var b;return a.prototype.getVendorPropertyName=_.memoize(function(a){var b,c,d,e,f;if(a in this.div.style)return a;if(c=["Moz","Webkit","O","ms"],a=_.capitalize(a),a in this.div.style)return a;for(e=0,f=c.length;f>e;e++)if(b=c[e],d=b+a,d in this.div.style)return d}),b=function(a){var b;return(b=a.match(/(\d+)ms/))?Number(b[1]):(b=a.match(/(\d+(\.\d+)?)s/))?1e3*Number(b[1]):void 0},a.prototype.cssPixelLengthToNumber=function(a){var b;return a?(b=a.match(/^(\d+(\.\d+)?)/),Number(b[1])):0},a.prototype.getTransitionDuration=function(a,b){var c;return null==b&&(b=this.$window.getComputedStyle(this._node(a))),c=b[this.transitionProperty].split(/\s+/),this.cssDurationToMs(c[1])+this.cssDurationToMs(c[3])},a.prototype._node=function(a){return a instanceof $?a.get(0):a},a}(),angular.module("deckBuilder").service("cssUtils",["$window",function(b){return new a(b)}])}.call(this);