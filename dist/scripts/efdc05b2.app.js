(function(){var a,b,c,d,e=[].slice;_.mixin({multiSort:function(){var a;return a=1<=arguments.length?e.call(arguments,0):[],function(b,c){var d,e,f,g;for(f=0,g=a.length;g>f;f++)if(d=a[f],0!==(e=d(b,c)))return e;return e}},concat:function(a){var b,c,d,f,g;for(d=1<=a.length?e.call(a,0):[],c=[],f=0,g=d.length;g>f;f++)b=d[f],null!=b&&(c=c.concat(b));return c}}),a="ąàáäâãåæăćęèéëêìíïîłńòóöôõōøśșțùúüûñçżź",d="aaaaaaaaaceeeeeiiiilnooooooosstuuuunczz",c=RegExp("["+a+"]","g"),b=_.object(_.zip(_.str.chars(a),_.str.chars(d))),_.mixin({stripDiacritics:function(a){return a=String(a).toLowerCase().replace(c,function(a){return b[a]})}})}).call(this),function(){_.mixin(_.str.exports()),angular.module("deckBuilder",["ui.bootstrap.buttons","ui.bootstrap.tooltip"])}.call(this),function(){angular.module("deckBuilder").controller("MainCtrl",["$scope","filterDefaults",function(a,b){return a.filter=b}])}.call(this),function(){angular.module("deckBuilder").controller("CardsCtrl",["cardService","$scope","$window",function(a,b){return b.$watch("filter",function(c){return a.getCards(c).then(function(a){return b.cardGroups=a})},!0)}])}.call(this),function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}},c=[].slice;a=function(){function a(a,c,e){var f=this;this.searchService=c,this.filterDescriptors=e,this._groupCards=b(this._groupCards,this),this._buildFilterFunction=b(this._buildFilterFunction,this),this._enabledTypes=b(this._enabledTypes,this),this._matchesFilter=b(this._matchesFilter,this),this._filterCards=b(this._filterCards,this),this._searchCards=b(this._searchCards,this),this.searchService=c,this._cards=[],this._cardsPromise=a.get(d).then(function(a){var b,c;return f._cards=a.data,c=a.status,b=a.headers,window.cards=f._cards,f.searchService.indexCards(f._cards),f._augmentCards(f._cards),f._cards})}var d,e,f;return d="data/cards.json",e={Identity:0,Event:1,Hardware:2,Program:3,Resource:4,Agenda:5,Asset:6,Operation:7,ICE:8,Upgrade:9},f={and:function(){var a,b,d,e,f;for(d=arguments[0],a=2<=arguments.length?c.call(arguments,1):[],e=0,f=d.length;f>e;e++)if(b=d[e],!b.apply(null,a))return!1;return!0},"=":function(a,b){return a===b},"<":function(a,b){return b>a},"≤":function(a,b){return b>=a},">":function(a,b){return a>b},"≥":function(a,b){return a>=b}},a.prototype.comparisonOperators=["=","<","≤",">","≥"],a.prototype.getCards=function(a){return null==a&&(a={}),this._cardsPromise.then(_.partial(this._searchCards,a)).then(_.partial(this._filterCards,a)).then(_.partial(this._groupCards,a))},a.prototype._searchCards=function(a){var b;return b=a.search,_.trim(b).length>0?this.searchService.search(b):this._cards},a.prototype._filterCards=function(a,b){var c,d,e,f,g,h;for(d=this._enabledTypes(a),e=this._buildFilterFunction(a,d),h=[],f=0,g=b.length;g>f;f++)c=b[f],this._matchesFilter(c,a,{enabledTypes:d,filterFn:e})&&h.push(c);return h},a.prototype._matchesFilter=function(a,b,c){var d,e;return d=c.enabledTypes,e=c.filterFn,a.side===b.side&&(null!=d?d[a.type]:!0)&&(null!=e?e(a):!0)},a.prototype._enabledTypes=function(a){var b,c,d,e;return d=null!=(e=a.activeGroup)?e.name:void 0,null==d||"general"===d?null:(b=this.filterDescriptors[d].cardType,c={},c[b]=!0,c)},a.prototype._buildFilterFunction=function(a){var b,c,d,e,g,h,i,j;return e=["general"],j=a.activeGroup,null!=j&&(this.filterDescriptors[j.name].excludeGeneral&&(e=[]),e.push(a.activeGroup.name)),g=_.flatten(function(){var f,g,j;for(j=[],f=0,g=e.length;g>f;f++)i=e[f],h=this.filterDescriptors[i],null!=h.fieldFilters&&j.push(function(){var e,f;e=h.fieldFilters,f=[];for(c in e)switch(b=e[c],d=a.fieldFilters[c],b.type){case"numeric":if(null==d.value||null==d.operator)continue;f.push(this._buildNumericFilter(b,d));break;case"inSet":f.push(this._buildInSetFilter(b,d));break;default:console.warn("Unknown filter type: "+b.type);continue}return f}.call(this));return j}.call(this)),_.isEmpty(g)?null:_.partial(f.and,g)},a.prototype._buildNumericFilter=function(a,b){return function(c){var d,e,g,h,i;for(d=_.isArray(a.cardField)?a.cardField:[a.cardField],h=0,i=d.length;i>h;h++)if(e=d[h],null!=c[e])return g=c[e],f[b.operator](g,b.value);return!1}},a.prototype._buildInSetFilter=function(a,b){return function(c){var d;return d="faction"===a.cardField?""+c.side+": "+c.faction:c[a.cardField],b[a.modelMappings[d]]}},a.prototype._groupCards=function(a,b){var c,d,f,g,h,i,j=this;for(d=a.primaryGrouping,g=a.secondaryGrouping,f=_(b).chain().groupBy(d).pairs().map(function(a){return{id:a[0].toLowerCase(),sortField:a[0],title:j._groupTitle(a[0]),subgroups:a[1]}}).sortBy("sortField").value(),h=0,i=f.length;i>h;h++)c=f[h],c.subgroups=_(c.subgroups).chain().groupBy(g).pairs().map(function(a){return{id:""+a[0].toLowerCase(),title:j._groupTitle(a[0]),sortField:a[0],cards:_.sortBy(a[1],"title")}}).sortBy(function(a){return e[a.sortField]}).value();return f},a.prototype._groupTitle=function(a){switch(a){case"Agenda":case"Asset":case"Operation":case"Upgrade":case"Event":case"Program":case"Resource":return""+a+"s";case"Identity":return"Identities";default:return a}},a.prototype._augmentCards=function(a){var b,c,d,e,f;for(f=[],c=0,d=a.length;d>c;c++)switch(b=a[c],b.subtypes=null!=b.subtype?b.subtype.split(" - "):[],b.type){case"ICE":f.push(b.subroutinecount=(null!=(e=b.text.match(/\[Subroutine\]/g))?e.length:void 0)||0);break;case"Identity":f.push(delete b.cost);break;default:f.push(void 0)}return f},a}(),angular.module("deckBuilder").service("cardService",["$http","searchService","filterDescriptors",function(b,c,d){return new a(b,c,d)}])}.call(this),function(){var a,b=function(a,b){return function(){return a.apply(b,arguments)}};a=function(){function a(a){var c;this.$q=a,this._tokenize=b(this._tokenize,this),this._mapResultsToCards=b(this._mapResultsToCards,this),this.search=b(this.search,this),this.indexCards=b(this.indexCards,this),c=[_.stripDiacritics],lunr.tokenizer=this._tokenize,this._index=lunr(function(){var a,b,d;for(b=0,d=c.length;d>b;b++)a=c[b],this.pipeline.before(function(){},a);return this.ref("title"),this.field("title",{boost:10}),this.field("faction",{boost:5}),this.field("type"),this.field("subtype"),this.field("text"),this.field("setname")}),window.search=this._index.search.bind(this._index)}return a.prototype.indexCards=function(a){var b,c,d,e;for(this.cards=a,this._cardsByTitle=_.object(_.zip(_.pluck(a,"title"),a)),e=this.cards,c=0,d=e.length;d>c;c++)b=e[c],this._index.add(b);return this._index.pipeline.remove(lunr.stopWordFilter)},a.prototype.search=function(a){var b;return b=this._mapResultsToCards(this._index.search(a)),this.$q.when(b)},a.prototype._mapResultsToCards=function(a){var b,c,d,e;if(null==a)return[];for(e=[],c=0,d=a.length;d>c;c++)b=a[c],e.push(this._cardsByTitle[b.ref]);return e},a.prototype._tokenize=function(a){var b;return arguments.length&&null!=a?_.isArray(a)?a.map(function(a){return a.toLowerCase()}):(b=a.toString().replace(/[\[\]{}'"]/g," "),_(b).chain().stripTags().words().map(function(a){return a.split("-")}).flatten().value()):[]},a}(),angular.module("deckBuilder").service("searchService",["$q",function(b){return new a(b)}])}.call(this),function(){"use strict";angular.module("deckBuilder").directive("numericFilter",["cardService",function(a){return{templateUrl:"views/directives/nr-numeric-filter.html",scope:{filter:"=filterAttr",placeholder:"@placeholder",id:"@id"},restrict:"E",link:function(b,c){var d,e;return b.comparisonOperators=a.comparisonOperators,e=c.find("input"),e.keydown(jwerty.event("esc",function(){return b.$apply(function(){return b.filter.value=void 0})})),d=!0,b.$watch("filter.operator",function(){return d?d=!1:e.focus()})}}}])}.call(this),function(){angular.module("deckBuilder").directive("dropdownToggle",["$document","$location",function(a){var b,c;return c=null,b=function(){},{restrict:"CA",link:function(d,e){return d.$watch("$location.path",function(){return b()}),e.parent().bind("click",function(){return b()}),e.bind("click",function(d){var f,g;return g=e===c,d.preventDefault(),d.stopPropagation(),c&&b(),g?void 0:(f=e.parent(),f.addClass("open"),f.find(".dropdown-menu a:first").focus(),c=e,b=function(d){return d&&(d.preventDefault(),d.stopPropagation()),a.unbind("click",b),e.parent().removeClass("open"),b=angular.noop,c=null},a.bind("click",b))})}}}]).directive("dropdownMenu",["$document",function(a){return{restrict:"CA",link:function(b,c){var d,e;return d=c.parent(),e=d.find(".dropdown-toggle"),c.keydown(function(b){var f,g,h;if(jwerty.is("esc/up/down/enter/space",b)&&(b.preventDefault(),b.stopPropagation(),!c.is(".disabled, :disabled"))){if(g=d.hasClass("open"),jwerty.is("esc",b))return e.click(),e.focus(),void 0;if(jwerty.is("enter/space",b))return $(b.target).click(),void 0;if(h=c.find("a"),!_.isEmpty(h))return f=h.index(a.attr("activeElement")),jwerty.is("up",b)&&f>0?f--:jwerty.is("down",b)&&f<h.length-1&&f++,h.eq(f).focus()}})}}}])}.call(this),angular.module("deckBuilder").directive("bnLazySrc",function(){function a(a){function b(b,c){if(!a.is(":visible"))return!1;null===h&&(h=a.height());var d=a.position().top,e=d+h;return c>=d&&d>=b||c>=e&&e>=b||b>=d&&e>=c}function c(){g=!0,e()}function d(a){f=a,g&&e()}function e(){a[0].src=f}var f=null,g=!1,h=null;return{isVisible:b,render:c,setSource:d}}function b(b,d,e){var f=new a(d);c.addImage(f),e.$observe("bnLazySrc",function(a){f.setSource(a)}),b.$watch("filter",function(){c.windowChanged()},!0),b.$on("$destroy",function(){c.removeImage(f)})}var c=function(){function a(a){j.push(a),k||f(),q||g()}function b(a){for(var b=0;b<j.length;b++)if(j[b]===a){j.splice(b,1);break}j.length||(e(),h())}function c(){if(!k){var a=m.height();a!==n&&(n=a,f())}}function d(){for(var a=[],b=[],c=0,d=m.height(),f=0;f<j.length;f++){var g=j[f];g.isVisible(c,d)?a.push(g):b.push(g)}for(var f=0;f<a.length;f++)a[f].render();j=b,e(),j.length||h()}function e(){clearTimeout(k),k=null}function f(){k=setTimeout(d,l)}function g(){q=!0,$(window).on("resize.bnLazySrc",i),m.on("scroll.bnLazySrc",i),o=setInterval(c,p)}function h(){q=!1,$("window").off("resize.bnLazySrc"),m.off("scroll.bnLazySrc"),clearInterval(o)}function i(){k||f()}var j=[],k=null,l=100,m=$(".page"),n=m.height(),o=null,p=2e3,q=!1;return{addImage:a,removeImage:b,windowChanged:i}}();return{link:b,restrict:"A"}}),function(){angular.module("deckBuilder").controller("FilterCtrl",["$scope","filterUI",function(a,b){var c;return a.filterUI=b,c=_.findWhere(b,{name:"general"}),a.filter.activeGroup=c,a.$watch("filter.side",function(){return a.filter.activeGroup=c,a.filter.primaryGrouping="faction",a.filter.secondaryGrouping="type"}),a.selectGroup=function(b){return a.filter.activeGroup=b,"general"===b.name?(a.filter.primaryGrouping="faction",a.filter.secondaryGrouping="type"):(a.filter.primaryGrouping="type",a.filter.secondaryGrouping="faction")},a.isActiveGroup=function(a,b){return b?a.name===b.name:!1},a.isGroupShown=function(a,b){return null!=a.side?a.side===b:!0},a.isFieldShown=function(a,b,c){var d;return c?"general"===b.name&&!(null!=(d=c.hiddenGeneralFields)?d[a.name]:void 0)||c.name===b.name:!1}}])}.call(this),function(){angular.module("deckBuilder").value("filterDefaults",{side:"Corp",primaryGrouping:"faction",secondaryGrouping:"type",fieldFilters:{faction:{haasBioroid:!0,jinteki:!0,nbn:!0,weyland:!0,corpNeutral:!0,anarch:!0,criminal:!0,shaper:!0,runnerNeutral:!0},cost:{operator:"="},influenceValue:{operator:"="},influenceLimit:{operator:"="},minimumDeckSize:{operator:"="},points:{operator:"="},assetTrashCost:{operator:"="},subroutineCount:{operator:"="},iceStrength:{operator:"="},influence:{operator:"="},upgradeTrashCost:{operator:"="}}}).constant("filterUI",[{name:"general",fieldFilters:[{name:"side",type:"side",icon:"side"},{name:"faction",type:"faction",icon:"faction",faction:{corp:[{name:"Haas-Bioroid",abbr:"HB",model:"haasBioroid"},{name:"Jinteki",abbr:"J",model:"jinteki"},{name:"NBN",abbr:"NBN",model:"nbn"},{name:"Weyland Consortium",abbr:"W",model:"weyland"},{name:"Neutral",abbr:"N",model:"corpNeutral"}],runner:[{name:"Anarch",abbr:"A",model:"anarch"},{name:"Criminal",abbr:"C",model:"criminal"},{name:"Shaper",abbr:"S",model:"shaper"},{name:"Neutral",abbr:"N",model:"runnerNeutral"}]}},{name:"cost",type:"numeric",placeholder:"Cost",icon:"credit"},{name:"influenceValue",type:"numeric",placeholder:"Influence",icon:"influence"}]},{name:"identities",hiddenGeneralFields:{cost:!0,influenceValue:!0},fieldFilters:[{name:"influenceLimit",type:"numeric",placeholder:"Influence Limit",icon:"influence"},{name:"minimumDeckSize",type:"numeric",placeholder:"Min. Deck Size",icon:"minimum-deck-size"}]},{name:"agendas",side:"Corp",fieldFilters:[{name:"points",type:"numeric",placeholder:"Agenda Points",icon:"agenda-point"}]},{name:"assets",side:"Corp",fieldFilters:[{name:"assetTrashCost",type:"numeric",placeholder:"Trash Cost",icon:"trash-cost"}]},{name:"operations",side:"Corp"},{name:"ice",side:"Corp",fieldFilters:[{name:"subroutineCount",type:"numeric",placeholder:"# Subroutines",icon:"subroutine"},{name:"iceStrength",type:"numeric",placeholder:"Strength",icon:"strength"}]},{name:"upgrades",side:"Corp",fieldFilters:[{name:"upgradeTrashCost",type:"numeric",placeholder:"Trash Cost",icon:"trash-cost"}]},{name:"events",side:"Runner"},{name:"hardware",side:"Runner"},{name:"programs",side:"Runner"},{name:"resources",side:"Runner"}]).constant("filterDescriptors",{general:{fieldFilters:{faction:{type:"inSet",cardField:"faction",modelMappings:{"Corp: Haas-Bioroid":"haasBioroid","Corp: Jinteki":"jinteki","Corp: NBN":"nbn","Corp: Weyland Consortium":"weyland","Corp: Neutral":"corpNeutral","Runner: Anarch":"anarch","Runner: Criminal":"criminal","Runner: Shaper":"shaper","Runner: Neutral":"runnerNeutral"}},cost:{type:"numeric",cardField:["advancementcost","cost"]},influenceValue:{type:"numeric",cardField:"factioncost"}}},identities:{cardType:"Identity",excludeGeneral:!0,fieldFilters:{influenceLimit:{type:"numeric",cardField:"influencelimit"},minimumDeckSize:{type:"numeric",cardField:"minimumdecksize"}}},ice:{cardType:"ICE",fieldFilters:{subroutineCount:{type:"numeric",cardField:"subroutinecount"},iceStrength:{type:"numeric",cardField:"strength"}}},agendas:{cardType:"Agenda",fieldFilters:{points:{type:"numeric",cardField:"agendapoints"}}},assets:{cardType:"Asset",fieldFilters:{assetTrashCost:{type:"numeric",cardField:"trash"}}},operations:{cardType:"Operation"},upgrades:{cardType:"Upgrade",fieldFilters:{upgradeTrashCost:{type:"numeric",cardField:"trash"}}},events:{cardType:"Event"},hardware:{cardType:"Hardware"},programs:{cardType:"Program"},resources:{cardType:"Resource"}})}.call(this);