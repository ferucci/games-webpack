(()=>{"use strict";const t=t=>t.flat().reduce(((t,e)=>(t.find((t=>t.title==e.title))||t.push(e),t)),[]),e=t=>{var e={boolean:{},number:{},string:{}},s=[];return t.filter((function(t){var i=typeof t;return i in e?!e[i].hasOwnProperty(t)&&(e[i][t]=!0):!(s.indexOf(t)>=0)&&s.push(t)}))},s=t=>t!==document.body&&document.body.contains(t);function i(t,e=200){let s;return function(i){clearTimeout(s),s=setTimeout(t,e,i)}}const n="index-slider__line",a="draggable",o="index-slider__dots-box",r="index-slider__dot",d="dot-active",l="index-slider__btn-left",c="index-slider__btn-right",h="index-slider__btn-disabled";class m{constructor(t,e={}){this.containerNode=t,this.size=t.childElementCount,this.currentSlide=0,this.currentSlideWasChanged=!1,this.settings={margin:e.margin||0,innerElementsClass:e.innerElementsClass||null,arrow:e.arrow||!1,dots:e.dots||!1,popupEl:e.popupElem||null},this.manageHTML=this.manageHTML.bind(this),this.setParameters=this.setParameters.bind(this),this.setEvents=this.setEvents.bind(this),this.resize=this.resize.bind(this),this.startDrag=this.startDrag.bind(this),this.stopDrag=this.stopDrag.bind(this),this.dragging=this.dragging.bind(this),this.setStylePosition=this.setStylePosition.bind(this),this.progressBar=this.progressBar.bind(this),this.clickDots=this.clickDots.bind(this),this.moveToLeft=this.moveToLeft.bind(this),this.moveToRight=this.moveToRight.bind(this),this.changeActiveDotClass=this.changeActiveDotClass.bind(this),this.changeCurrentSlide=this.changeCurrentSlide.bind(this),this.changeDisabledBtn=this.changeDisabledBtn.bind(this),this.manageHTML(),this.setParameters(),this.setEvents()}manageHTML(){this.containerNode.classList.add("index-slider"),this.containerNode.innerHTML=`\n      <div class="${n}">\n        ${this.containerNode.innerHTML}\n      </div>\n        <div class="index-slider__btns">\n          <button class="${l}"></button>\n          <button class="${c}"></button>\n        </div>\n      <div class="index-slider__dots">\n        <div class="${o}"></div>\n      </div>\n    `,this.lineNode=this.containerNode.querySelector(`.${n}`),this.dotsNode=this.containerNode.querySelector(`.${o}`),this.slideNodes=Array.from(this.lineNode.children).map((t=>function({element:t,className:e}){const s=document.createElement("div");return s.classList.add(e),t.parentNode.insertBefore(s,t),s.appendChild(t),s}({element:t,className:"index-slider__item"}))),this.containerNode.matches(".top-slider__inner")?this.dotsNode.innerHTML=Array.from(Array(this.size).keys()).map((t=>`<button class="${r} ${t===this.currentSlide?d:""}"></button>`)).join(""):this.dotsNode.innerHTML=`<button class="${r}"></button>`,this.dotsNodes=this.dotsNode.querySelectorAll(`.${r}`),this.btnLeft=document.querySelector(`.${l}`),this.btnRight=document.querySelector(`.${c}`)}setParameters(){const t=this.containerNode.getBoundingClientRect();this.innerItemsName=this.containerNode.querySelectorAll(`.${this.settings.innerElementsClass}`),this.innerItemsName&&document.documentElement.scrollWidth<975&&this.containerNode.matches(".slider__items")?(this.innerItemsName.forEach(((t,e)=>{this.width=t.scrollWidth})),this.settings.margin=0,this.size=3*this.innerItemsName.length):this.innerItemsName&&document.documentElement.scrollWidth>975?(this.size=this.innerItemsName.length,this.width=t.width,this.currentSlide=Math.floor(this.currentSlide/3),this.settings.margin=this.settings.margin+5):this.width=t.width-this.settings.margin,this.containerNode.matches("#slider-popup")&&this.innerItemsName.forEach(((t,e)=>{this.width=t.scrollWidth})),this.maximumX=-(this.size-1)*(this.width+this.settings.margin),this.x=-this.currentSlide*(this.width+this.settings.margin),this.resetStyleTransition(),this.lineNode.style.width=this.size*(this.width+this.settings.margin)+"px",this.setStylePosition(),this.changeDisabledBtn(),Array.from(this.slideNodes).forEach((t=>{t.style.width=`${this.width}px`,t.style.marginRight=`${this.settings.margin}px`}))}setEvents(){this.debonceResize=i(this.resize),window.addEventListener("resize",this.debonceResize),this.lineNode.addEventListener("pointerdown",this.startDrag),window.addEventListener("pointerup",this.stopDrag),window.addEventListener("pointercancel",this.stopDrag),this.containerNode.matches(".top-slider__inner")&&this.dotsNode.addEventListener("click",this.clickDots),this.btnLeft.addEventListener("click",this.moveToLeft),this.btnRight.addEventListener("click",this.moveToRight),null!==this.settings.popupEl&&this.settings.popupEl.forEach((t=>{t.addEventListener("click",this.debonceResize)}))}destroyEvents(){window.removeEventListener("resize",this.debonceResize),this.lineNode.removeEventListener("pointerdown",this.startDrag),window.removeEventListener("pointerup",this.stopDrag),window.removeEventListener("pointercancel",this.stopDrag),this.dotsNode.removeEventListener("click",this.clickDots),this.btnLeft.removeEventListener("click",this.moveToLeft),this.btnRight.removeEventListener("click",this.moveToRight)}resize(){this.setParameters(),this.setStylePosition()}startDrag(t){this.currentSlideWasChanged=!1,this.clickX=t.pageX,this.startX=this.x,this.resetStyleTransition(),this.containerNode.classList.add(a),window.addEventListener("pointermove",this.dragging)}stopDrag(){window.removeEventListener("pointermove",this.dragging),this.containerNode.classList.remove(a),this.changeCurrentSlide()}dragging(t){this.dragX=t.pageX;const e=this.dragX-this.clickX,s=e/5;this.x=Math.max(Math.min(e+this.startX,s),this.maximumX+s),this.setStylePosition(),e>7&&e>0&&!this.currentSlideWasChanged&&this.currentSlide>0&&(this.currentSlideWasChanged=!0,this.currentSlide=this.currentSlide-1),e<-7&&e<0&&!this.currentSlideWasChanged&&this.currentSlide<this.size-1&&(this.currentSlideWasChanged=!0,this.currentSlide=this.currentSlide+1)}clickDots(t){if(this.containerNode.matches(".top-slider__inner")){const e=t.target.closest("button");if(!e)return;let s;for(let t=0;t<this.dotsNodes.length;t++)if(this.dotsNodes[t]===e){s=t;break}if(s==this.currentSlide)return;const i=Math.abs(this.currentSlide-s);this.currentSlide=s,this.changeCurrentSlide(i)}}moveToRight(){this.currentSlide>=this.size-1||(this.currentSlide=this.currentSlide+1,this.changeCurrentSlide())}moveToLeft(){this.currentSlide<=0||(this.currentSlide=this.currentSlide-1,this.changeCurrentSlide())}progressBar(){this.dotsNode.children[0].style.width=parseFloat(100*(this.currentSlide+1)/this.size)+"%"}changeCurrentSlide(t){this.x=-this.currentSlide*(this.width+this.settings.margin),this.setStylePosition(),this.setStyleTransition(t),this.containerNode.matches(".top-slider__inner")?this.changeActiveDotClass():this.progressBar(),this.changeDisabledBtn()}changeActiveDotClass(){for(let t=0;t<this.dotsNodes.length;t++)this.dotsNodes[t].classList.remove(d);this.dotsNodes[this.currentSlide].classList.add(d)}changeDisabledBtn(){this.currentSlide<=0?this.btnLeft.classList.add(h):this.btnLeft.classList.remove(h),this.currentSlide>=this.size-1?this.btnRight.classList.add(h):this.btnRight.classList.remove(h)}setStylePosition(){document.documentElement.scrollWidth<975&&this.containerNode.matches(".slider__items")?this.lineNode.style.transform=`translate3d(${this.x/3+this.settings.margin}px, 0, 0)`:this.lineNode.style.transform=`translate3d(${this.x}px, 0, 0)`}setStyleTransition(t=1){this.lineNode.style.transition=`all ${.25*t}s ease 0s`}resetStyleTransition(){this.lineNode.style.transition="all 0s ease 0s"}}class g{constructor(t,e){this.elem=document.querySelector(t),this.elem&&(this.options=e,this.selectedId=e.selectedId,this.#t(),this.#e())}#t(){const{placeholder:t,data:e}=this.options;this.elem.classList.add("select"),this.elem.innerHTML=((t=[],e,s)=>{let i=e??"Placeholder default";const n=t.map((t=>{let e="";return t.id===s&&(i=t.value,e="selected"),`\n    <li class="select__item ${e}" data-type="item" data-id="${t.id}">${t.value}</li>`}));return`\n        <div class="select__backdrop" data-type="backdrop"></div>\n        <div class="select__input" data-type="input">\n            <span data-type="value">${i}</span>\n            <span class="triangle-icon-open" data-type="arrow"></span>\n          </div>\n          <div class="select__dropdown">\n            <ul class="select__list">\n              ${n.join("")}\n            </ul>\n        </div>\n    `})(e,t,this.selectedId)}#e(){this.clickHandler=this.clickHandler.bind(this),this.elem.addEventListener("click",this.clickHandler),this.arrow=this.elem.querySelector('[data-type="arrow"]'),this.value=this.elem.querySelector('[data-type="value"]')}clickHandler(t){const{type:e}=t.target.dataset;if("input"===e||t.target.closest(".select__input"))document.querySelectorAll(".select").forEach((t=>{if(t.closest(".select-open")){t.classList.remove("select-open");const e=t.querySelector(".triangle-icon-close");e.classList.remove("triangle-icon-close"),e.classList.add("triangle-icon-open")}})),this.toggle();else if("item"===e){const e=t.target.dataset.id;this.select(e)}else"backdrop"===e&&this.close()}get isOpen(){return this.elem.classList.contains("select-open")}get current(){return this.options.data.find((t=>t.id===this.selectedId))}select(t){this.selectedId=t,this.value.textContent=this.current.value,this.elem.querySelectorAll('[data-type="item"]').forEach((t=>{t.classList.remove("selected")})),this.elem.querySelector(`[data-id="${t}"]`).classList.add("selected"),this.options.onSelect&&this.options.onSelect(this.current),this.close()}toggle(){this.isOpen?this.close():this.open()}open(){this.elem.classList.add("select-open"),this.arrow.classList.remove("triangle-icon-open"),this.arrow.classList.add("triangle-icon-close")}close(){this.elem.classList.remove("select-open"),this.arrow.classList.remove("triangle-icon-close"),this.arrow.classList.add("triangle-icon-open")}destroy(){this.elem.removeEventListener("click",this.clickHandler),this.elem.innerHTML=""}}class u{constructor(t,e){this.options=Object.assign({isChanged:()=>{}},e),this.selector=t,this.tabs=document.querySelector(`[data-tabs="${t}"]`),this.tabs&&(this.tabList=this.tabs.querySelector(e.tabList),this.tabsBtns=this.tabList.querySelectorAll(e.tabsBtns),this.content=document.querySelector(e.content),this.contentItem=this.content.querySelectorAll(e.contentItem),this.check(),this.init(),this.events())}check(){document.querySelectorAll(`[data-tabs="${this.selector}"]`).length>1||(this.tabsBtns.length,this.contentItem.length)}init(){this.tabList.setAttribute("role","tablist"),this.tabsBtns.forEach(((t,e)=>{t.setAttribute("role","tab"),t.setAttribute("tabindex","-1"),t.setAttribute("id",`${this.selector}${e+1}`),t.classList.remove(this.options.linkActive)})),this.contentItem.forEach(((t,e)=>{t.setAttribute("role","tabpanel"),t.setAttribute("tabindex","-1"),t.setAttribute("aria-labelledby",this.tabsBtns[e].id),t.classList.remove(this.options.contentBoxActive)})),this.tabsBtns[0].classList.add(this.options.linkActive),this.tabsBtns[0].removeAttribute("tabindex"),this.tabsBtns[0].setAttribute("aria-selected","true"),this.contentItem[0].classList.add(this.options.contentBoxActive)}events(){this.tabsBtns.forEach(((t,e)=>{t.addEventListener("click",(t=>{let e=this.tabList.querySelector("[aria-selected]");t.currentTarget!==e&&this.switchTabs(t.currentTarget,e)})),t.addEventListener("keydown",(t=>{let s=Array.prototype.indexOf.call(this.tabsBtns,t.currentTarget),i=null;if(i=37===t.which?s-1:39===t.which?s+1:40===t.which?"down":null,null!==i)if("down"===i)this.contentItem[e].focus();else{if(!this.tabsBtns[i])return;this.switchTabs(this.tabsBtns[i],t.currentTarget)}}))}))}switchTabs(t,e=this.tabs.querySelector("[aria-selected]")){t.focus(),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),e.removeAttribute("aria-selected"),e.setAttribute("tabindex","-1");let s=Array.prototype.indexOf.call(this.tabsBtns,t),i=Array.prototype.indexOf.call(this.tabsBtns,e);this.contentItem[i].classList.remove("content__box--active"),this.contentItem[s].classList.add("content__box--active"),this.tabsBtns[i].classList.remove("content__tab-link--active"),this.tabsBtns[s].classList.add("content__tab-link--active"),this.options.isChanged(this)}}class p{constructor(t){this.options=Object.assign({isOpen:()=>{},isClose:()=>{}},t),this.modal=document.querySelector(".popup"),this.speed=!1,this.animation=!1,this._reOpen=!1,this._nextContainer=!1,this.isOpen=!1,this.modalContainer=!1,this.previousActiveElement=!1,this.fixBlocks=document.querySelectorAll(".fix-block"),this.focusElements=["a[href]","input","button","select","textarea","iframe","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],this.open=this.open.bind(this),this.close=this.close.bind(this),this.focusCatch=this.focusCatch.bind(this),this.focusTrap=this.focusTrap.bind(this),this.disableScroll=this.disableScroll.bind(this),this.enableScroll=this.enableScroll.bind(this),this.lockPadding=this.lockPadding.bind(this),this.unlockPadding=this.unlockPadding.bind(this),this.events()}events(){this.modal&&(document.addEventListener("click",(t=>{const e=t.target.closest("[data-path");if(e){let t=e.dataset.path,s=e.dataset.animation,i=e.dataset.speed;return this.animation=s||"fade",this.speed=i?parseInt(i):300,this._nextContainer=document.querySelector(`[data-target="${t}"]`),void this.open()}t.target.closest(".popup__close-item")&&this.close()})),window.addEventListener("keydown",(t=>{27==t.keyCode&&this.isOpen&&this.close(),9==t.keyCode&&this.isOpen&&this.focusCatch(t)})),window.addEventListener("click",(t=>{t.target.classList.contains("popup__wrapp")||t.target.closest(".popup__wrapp")||!this.isOpen||this.close()})))}open(t){if(this.previousActiveElement=document.activeElement,this.isOpen)return this.reOpen=!0,void this.close();this.modalContainer=this._nextContainer,t&&(this.modalContainer=document.querySelector(`[data-target="${t}"]`)),this.modalContainer.scrollTo(0,0),this.modal.style.setProperty("$transition-time",this.speed/1e3+"s"),this.modal.classList.add("is-open"),document.body.style.scrollBehavior="auto",document.documentElement.style.scrollBehavior="auto",this.disableScroll(),this.modalContainer.classList.add("popup-open"),this.modalContainer.classList.add(this.animation),setTimeout((()=>{this.modalContainer.classList.add("animate-open"),this.options.isOpen(this),this.isOpen=!0,this.focusTrap()}),this.speed)}close(){this.modalContainer&&(this.modalContainer.classList.remove("animate-open"),this.modalContainer.classList.remove(this.animation),this.modal.classList.remove("is-open"),this.modalContainer.classList.remove("popup-open"),this.enableScroll(),document.body.style.scrollBehavior="auto",document.documentElement.style.scrollBehavior="auto",this.options.isClose(this),this.isOpen=!1,this.focusTrap(),this.reOpen&&(this.reOpen=!1,this.open()))}focusCatch(t){const e=this.modalContainer.querySelectorAll(this.focusElements),s=Array.prototype.slice.call(e),i=s.indexOf(document.activeElement);t.shiftKey&&0===i&&(s[s.length-1].focus(),t.preventDefault()),t.shiftKey||i!==s.length-1||(s[0].focus(),t.preventDefault())}focusTrap(){const t=this.modalContainer.querySelectorAll(this.focusElements);this.isOpen?t&&t[t.length-1].focus():this.previousActiveElement.focus()}disableScroll(){let t=window.scrollY;this.lockPadding(),document.body.classList.add("disable-scroll"),document.body.dataset.position=t,document.body.style.top=-t+"px"}enableScroll(){let t=parseInt(document.body.dataset.position,10);this.unlockPadding(),document.body.style.top="auto",document.body.classList.remove("disable-scroll"),window.scrollTo({top:t,left:0}),document.body.removeAttribute("data-position")}lockPadding(){let t=window.innerWidth-document.body.offsetWidth+"px";this.fixBlocks.forEach((e=>{e.style.paddingRight=t})),document.body.style.paddingRight=t}unlockPadding(){this.fixBlocks.forEach((t=>{t.style.paddingRight="0px"})),document.body.style.paddingRight="0px"}}let b=document.querySelectorAll(".game-card__action-incard");const v=()=>{const t=document.querySelector(".basket-content__games");b=document.querySelectorAll(".game-card__action-incard");let e=0;const s=new class{#s=[];addItem(t){this.#s.push(t),this.save()}removeItem(t){const e=this.#s.findIndex((e=>e.id===t.id));-1!==e&&(this.#s.splice(e,1),this.save())}getItems(){return this.#s}save(){localStorage.setItem("cart",JSON.stringify(this.#s))}load(){const t=localStorage.getItem("cart");t&&(this.#s=JSON.parse(t))}};function i(){const t=s.getItems().length;document.querySelector(".basket__num").textContent=t}s.load(),i(),document.getElementById("basket-page")&&setTimeout((function(){s.getItems().forEach((e=>{var s,i,n,a;t.insertAdjacentHTML("afterbegin",(s=e.img,i=e.title,n=e.price,`\n\n    <div class="basket-content__game" data-id="${a=e.id}">\n      <div class="basket-content__game-info">\n          <img class="basket-content__game-image"\n            src="${s}" alt="game image prev">\n          <div class="basket-content__game-text">\n              <span class="basket-content__game-name">\n                ${i}\n              </span>\n              <span class="basket-content__game-sum">\n                ${n}\n              </span>\n          </div>\n      </div>\n      <div class="basket-content__game-select">\n          <button class="basket-content__game-del" aria-label="Удалить товар">\n              <img src="./images/icons/btn-delete.svg" alt=""></button>\n          <div class="basket-content__select-app">\n              <div class="basket-content__select-wrapp">\n\n                  <div id="select-${a}">\n\n                  </div>\n\n                </div>\n          </div>\n      </div>\n  </div> `)),(t=>{new g(`#select-${t}`,{placeholder:"Выберите способ покупки",selectedId:"1",data:[{id:"1",value:"Аренда через семейный доступ"},{id:"2",value:"Аренда через личный доступ"}],onSelect(t){}})})(e.id)})),document.querySelectorAll(".basket-content__game-del").forEach((t=>{t.addEventListener("click",(t=>{const e=t.currentTarget,n=e.parentNode.closest(".basket-content__game");console.log(e),console.log(n);const a={id:n.dataset.id};n.remove(),s.removeItem(a),i()}))}))}),500),b.forEach((t=>{t.closest(".game-card").setAttribute("data-id",++e),t.addEventListener("click",(t=>{const e=(t=>({title:t.querySelector(".game-card__title").textContent,price:t.querySelector(".game-card__sum").textContent,img:t.querySelector(".game-card__img").getAttribute("src"),id:t.dataset.id}))(t.currentTarget.parentNode.closest(".game-card"));s.addItem(e),i()}))}))},_="Экшен",y="Инди",f="Приключения",S="Стратегия",L="Ролевые",w="Гонки",E="Казульные",k="DLC",x=[{id:1,title:"Death Stranding 1",description:"Множество игровых компаний, в том числе, EA, Ubisoft, Take-Two заявили о...",params:{payMethod:["Личный аккаунт"],category:[_,"Шутер","ММО",L,E]},price:"359,599 ₽"},{id:2,title:"Death Stranding 2",description:"Множество игровых компаний, в том числе, EA, Ubisoft, Take-Two заявили о...",params:{payMethod:["Личный аккаунт","Семейный аккаунт"],category:[w,S,k]},price:"1359,599 ₽"},{id:3,title:"Death Stranding 3",description:"Множество игровых компаний, в том числе, EA, Ubisoft, Take-Two заявили о...",params:{payMethod:["Личный аккаунт","Семейный аккаунт"],category:[L,f]},price:"559,599 ₽"},{id:4,title:"Death Stranding 4",description:"Множество игровых компаний, в том числе, EA, Ubisoft, Take-Two заявили о...",params:{payMethod:["Личный аккаунт"],category:[w,y,S,f,_,k,"Файтинг"]},price:"759,599 ₽"},{id:5,title:"Death Stranding 5",description:"Множество игровых компаний, в том числе, EA, Ubisoft, Take-Two заявили о...",params:{payMethod:["Личный аккаунт"],category:[w]},price:"259,599 ₽"},{id:6,title:"Death Stranding 6",description:"Множество игровых компаний, в том числе, EA, Ubisoft, Take-Two заявили о...",params:{payMethod:["Семейный аккаунт"],category:[f,L,_]},price:"2359,599 ₽"},{id:7,title:"Death Stranding 7",description:"Множество игровых компаний, в том числе, EA, Ubisoft, Take-Two заявили о...",params:{payMethod:["Личный аккаунт"],category:[f,E,k,S]},price:"13359,599 ₽"},{id:8,title:"Death Stranding 8",description:"Множество игровых компаний, в том числе, EA, Ubisoft, Take-Two заявили о...",params:{payMethod:["Семейный аккаунт"],category:[y]},price:"5359,599 ₽"}],N="draggable";class C{constructor(t,e={}){this.containerNode=t,this.size=t.childElementCount,this.currentSlide=0,this.settings={scrollWidth:e.scrollWidth||null,SliderLineCN:e.SliderLineCN},this.setParameters=this.setParameters.bind(this),this.setEvents=this.setEvents.bind(this),this.resize=this.resize.bind(this),this.startDrag=this.startDrag.bind(this),this.stopDrag=this.stopDrag.bind(this),this.dragging=this.dragging.bind(this),this.setStylePosition=this.setStylePosition.bind(this),this.lineNode=this.containerNode.querySelector(`.${this.settings.SliderLineCN}`),this.setParameters=this.setParameters.bind(this),this.setParameters(),this.setEvents()}setParameters(){const t=this.containerNode.getBoundingClientRect();this.widthLineNodes=this.containerNode.querySelector(`.${this.settings.SliderLineCN}`).getBoundingClientRect().width,this.settings.scrollWidth=document.documentElement.scrollWidth,this.widthLineNodes+120>this.settings.scrollWidth&&(this.width=t.width,this.x=-this.currentSlide*this.width)}setEvents(){this.debonceResize=i(this.resize),window.addEventListener("resize",this.debonceResize),this.lineNode.addEventListener("pointerdown",this.startDrag),window.addEventListener("pointerup",this.stopDrag)}destroyEvents(){window.removeEventListener("resize",this.debonceResize)}resize(){this.setParameters(),this.setStylePosition()}startDrag(t){this.clickX=t.pageX,this.startX=this.x,this.containerNode.classList.add(N),window.addEventListener("pointermove",this.dragging)}stopDrag(){window.removeEventListener("pointermove",this.dragging),this.containerNode.classList.remove(N)}dragging(t){this.dragX=t.pageX;const e=this.dragX-this.clickX;this.x=this.startX+e,this.setStylePosition()}setStylePosition(){return this.lineNode.style.transform=`translate3d(${this.x}px, 0, 0)`,this.lineNode.style.transform>="translate3d(0px, 0px, 0px)"?(this.lineNode.style.transform="translate3d(0px, 0, 0)",void(this.x=0)):this.x<-Math.round(this.widthLineNodes-this.width)?(this.lineNode.style.transform=`translate3d(${-Math.round(this.widthLineNodes-this.width+20)}px, 0, 0)`,void(this.x=-Math.round(this.widthLineNodes-this.width))):void 0}}document.addEventListener("DOMContentLoaded",(function(){const i=(t,e)=>{"loading"!==document.readyState?s(document.getElementById(t))&&e(document.getElementById(t)):document.addEventListener("DOMContentLoaded",(function(){s(document.getElementById(t))&&e(document.getElementById(t))}))};i("slider-games",(t=>new m(t,{margin:20,innerElementsClass:"slider__item",arrow:!0}))),i("slider-header",(t=>new m(t,{margin:15,innerElementsClass:"top-slider__item",dots:!0}))),i("slider-popup",(t=>new m(t,{margin:20,popupElem:document.querySelectorAll('[data-path="game-path"]'),innerElementsClass:"game-card"}))),i("nav-content",(t=>new C(t,{scrollWidth:document.documentElement.scrollWidth,SliderLineCN:"nav-content__track"}))),new p({isOpen:t=>{},isClose:t=>{}});const n={placeholder:"Выберите способ покупки",selectedId:"1",data:[{id:"1",value:"Аренда через семейный доступ"},{id:"2",value:"Аренда через личный доступ"}],onSelect(t){}},a={placeholder:"Выберите элемент",selectedId:"1",data:[{id:"1",value:"Дате заказа"}],onSelect(t){}},o={placeholder:"Выберите элемент",selectedId:"1",data:[{id:"1",value:"Сумме заказа"}],onSelect(t){},styles:[{background:"#3F434B;",boxShadow:"inset 0px 4px 16px rgba(0, 0, 0, 0.1);"}]};new g("#select-n",{placeholder:"Выберите способ покупки",data:[{id:"1",value:"Способ покупки 1"},{id:"2",value:"Способ покупки 2"},{id:"3",value:"Способ покупки 3"},{id:"4",value:"Способ покупки 4"}],onSelect(t){}}),new g("#select-1",n),new g("#select-2",n),new g("#select-3",n),new g("#select-filter-1",a),new g("#select-filter-2",o),new u("faq-tab",{tabList:".content__tabs",tabsBtns:".content__tab-link",content:".faq-content-box",contentItem:".content__box",linkActive:"content__tab-link--active",contentBoxActive:"content__box--active",isChanged:t=>{}}),new u("profile-tab",{tabList:".profile-content__tabs",tabsBtns:".content__tab-link",content:".profile-content-box",contentItem:".content__box",linkActive:"content__tab-link--active",contentBoxActive:"content__box--active",isChanged:t=>{}}),document.querySelector(".faq")&&(()=>{const t=document.querySelectorAll(".faq-triggers__item"),e=({currentTarget:t})=>{const e=t.querySelector("p"),s=t.querySelector(".faq-triggers__btn");e.classList.toggle("faq-triggers__text--active"),s.classList.toggle("faq-triggers__btn--active")};t.forEach((t=>t.addEventListener("click",e)))})(),(()=>{let i=[];if(s(document.getElementById("catalog-games"))){const s={catalogGames:document.getElementById("catalog-games"),filterBlock:document.querySelector(".catalog__buttons"),filterBtns:document.querySelectorAll(".catalog-btn")},n=(t,e)=>0==Number(e)||1==Number(e)?t[e]:"+"+(+t.length-2),a=t=>{let e=[];for(let s=0;s<t.params.category.length;s++)e.push(`\n          <a class="game-card__genre" href="#">\n            ${t.params.category.length<3?t.params.category[s]:n(t.params.category,s)}\n          </a>     \n      `);return e.length>=3&&e.splice(3).join(""),e.join("")},o=t=>{const e=[];for(let s=0;s<t.length;s++)e.push(`\n        <div class="game-card" data-id="${s+1}">\n                  <div class="game-card__info">\n                      <div class="game-card__img-box">\n                          <img class="game-card__img"\n                          src="./images/games/catalog/game-${Math.floor((s+1)%(t.length/2))}.jpg"\n                              alt="Death Stranding game">\n                      </div>\n                      <div class="game-card__genres">\n                        ${a(t[s])}\n                      </div>\n  \n                      <div class="game-card__accounts game-card__accounts-large">\n                          <a class="game-card__accounts-item game-card__accounts-pers" href="#">\n                          ${t[s].params.payMethod[0]}\n                          </a>\n                      </div>\n                  </div>\n                  <div class="game-card__footer">\n                      <div class="game-card__footer-box">\n                          <div class="game-card__description">\n                              <h5 class="game-card__title">\n                                  <a class="game-card__link" href="#">\n                                    ${t[s].title}\n                                  </a>\n                              </h5>\n                              <p class="game-card__subtitle">\n                                ${t[s].description}\n                              </p>\n                              <span class="game-card__sum">\n                              ${t[s].price}\n                              </span>\n                          </div>\n  \n                      </div>\n                      <div class="game-card__action">\n                          <button class="game-card__action-incard light-accent-btn">\n                              В корзину\n                          </button>\n                          <a class="game-card__action-buy light-btn" href="#">\n                              Купить\n                          </a>\n                      </div>\n                  </div>\n              </div>\n          `);return e};s.catalogGames.innerHTML=o(x).join("");const r=n=>{let a=[];n.addEventListener("click",(n=>{const r=n.target,d=r.dataset.fil;if(r.classList.toggle("catalog-btn--active"),a=x.filter((t=>{const e=new RegExp(d),s=t.params.category;return e.test(s)})),r.closest(".catalog-btn--active"))i.push(a),i=e(t(i));else{let t=[...document.querySelectorAll(".catalog-btn--active")],e=[];t.forEach((t=>{let s=t.dataset.fil;e.push(s)})),i=i.flat().filter((({params:t})=>t.category.some((t=>e.includes(t)))))}const l=o(e(t(i).flat()));s.catalogGames.innerHTML=e(l.flat()).join(""),v()}))};s.filterBtns.forEach((t=>r(t)))}})(),v()}))})();