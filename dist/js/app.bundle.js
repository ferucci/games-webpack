(()=>{"use strict";class t{constructor(t,e){this.options=Object.assign({isChanged:()=>{}},e),this.selector=t,this.tabs=document.querySelector(`[data-tabs="${t}"]`),this.tabs&&(this.tabList=this.tabs.querySelector(e.tabList),this.tabsBtns=this.tabList.querySelectorAll(e.tabsBtns),this.content=document.querySelector(e.content),this.contentItem=this.content.querySelectorAll(e.contentItem),this.check(),this.init(),this.events())}check(){document.querySelectorAll(`[data-tabs="${this.selector}"]`).length>1||(this.tabsBtns.length,this.contentItem.length)}init(){this.tabList.setAttribute("role","tablist"),this.tabsBtns.forEach(((t,e)=>{t.setAttribute("role","tab"),t.setAttribute("tabindex","-1"),t.setAttribute("id",`${this.selector}${e+1}`),t.classList.remove(this.options.linkActive)})),this.contentItem.forEach(((t,e)=>{t.setAttribute("role","tabpanel"),t.setAttribute("tabindex","-1"),t.setAttribute("aria-labelledby",this.tabsBtns[e].id),t.classList.remove(this.options.contentBoxActive)})),this.tabsBtns[0].classList.add(this.options.linkActive),this.tabsBtns[0].removeAttribute("tabindex"),this.tabsBtns[0].setAttribute("aria-selected","true"),this.contentItem[0].classList.add(this.options.contentBoxActive)}events(){this.tabsBtns.forEach(((t,e)=>{t.addEventListener("click",(t=>{let e=this.tabList.querySelector("[aria-selected]");t.currentTarget!==e&&this.switchTabs(t.currentTarget,e)})),t.addEventListener("keydown",(t=>{let s=Array.prototype.indexOf.call(this.tabsBtns,t.currentTarget),n=null;if(n=37===t.which?s-1:39===t.which?s+1:40===t.which?"down":null,null!==n)if("down"===n)this.contentItem[e].focus();else{if(!this.tabsBtns[n])return;this.switchTabs(this.tabsBtns[n],t.currentTarget)}}))}))}switchTabs(t,e=this.tabs.querySelector("[aria-selected]")){t.focus(),t.removeAttribute("tabindex"),t.setAttribute("aria-selected","true"),e.removeAttribute("aria-selected"),e.setAttribute("tabindex","-1");let s=Array.prototype.indexOf.call(this.tabsBtns,t),n=Array.prototype.indexOf.call(this.tabsBtns,e);this.contentItem[n].classList.remove("content__box--active"),this.contentItem[s].classList.add("content__box--active"),this.tabsBtns[n].classList.remove("content__tab-link--active"),this.tabsBtns[s].classList.add("content__tab-link--active"),this.options.isChanged(this)}}class e{constructor(t,e){this.elem=document.querySelector(t),this.elem&&(this.options=e,this.selectedId=e.selectedId,this.#t(),this.#e())}#t(){const{placeholder:t,data:e}=this.options;this.elem.classList.add("select"),this.elem.innerHTML=((t=[],e,s)=>{let n=e??"Placeholder default";const i=t.map((t=>{let e="";return t.id===s&&(n=t.value,e="selected"),`\n    <li class="select__item ${e}" data-type="item" data-id="${t.id}">${t.value}</li>`}));return`\n        <div class="select__backdrop" data-type="backdrop"></div>\n        <div class="select__input" data-type="input">\n            <span data-type="value">${n}</span>\n            <span class="triangle-icon-open" data-type="arrow"></span>\n          </div>\n          <div class="select__dropdown">\n            <ul class="select__list">\n              ${i.join("")}\n            </ul>\n        </div>\n    `})(e,t,this.selectedId)}#e(){this.clickHandler=this.clickHandler.bind(this),this.elem.addEventListener("click",this.clickHandler),this.arrow=this.elem.querySelector('[data-type="arrow"]'),this.value=this.elem.querySelector('[data-type="value"]')}clickHandler(t){const{type:e}=t.target.dataset;if("input"===e||t.target.closest(".select__input"))document.querySelectorAll(".select").forEach((t=>{if(t.closest(".select-open")){t.classList.remove("select-open");const e=t.querySelector(".triangle-icon-close");e.classList.remove("triangle-icon-close"),e.classList.add("triangle-icon-open")}})),this.toggle();else if("item"===e){const e=t.target.dataset.id;this.select(e)}else"backdrop"===e&&this.close()}get isOpen(){return this.elem.classList.contains("select-open")}get current(){return this.options.data.find((t=>t.id===this.selectedId))}select(t){this.selectedId=t,this.value.textContent=this.current.value,this.elem.querySelectorAll('[data-type="item"]').forEach((t=>{t.classList.remove("selected")})),this.elem.querySelector(`[data-id="${t}"]`).classList.add("selected"),this.options.onSelect&&this.options.onSelect(this.current),this.close()}toggle(){this.isOpen?this.close():this.open()}open(){this.elem.classList.add("select-open"),this.arrow.classList.remove("triangle-icon-open"),this.arrow.classList.add("triangle-icon-close")}close(){this.elem.classList.remove("select-open"),this.arrow.classList.remove("triangle-icon-close"),this.arrow.classList.add("triangle-icon-open")}destroy(){this.elem.removeEventListener("click",this.clickHandler),this.elem.innerHTML=""}}let s=document.querySelectorAll(".game-card__action-incard");const n=()=>{const t=document.querySelector(".basket-content__games");s=document.querySelectorAll(".game-card__action-incard");let n=0;const i=new class{#s=[];addItem(t){this.#s.push(t),this.save()}removeItem(t){const e=this.#s.findIndex((e=>e.id===t.id));-1!==e&&(this.#s.splice(e,1),this.save())}getItems(){return this.#s}save(){localStorage.setItem("cart",JSON.stringify(this.#s))}load(){const t=localStorage.getItem("cart");t&&(this.#s=JSON.parse(t))}};function a(){const t=i.getItems().length;document.querySelector(".basket__num").textContent=t}i.load(),a(),document.getElementById("basket-page")&&setTimeout((function(){i.getItems().forEach((s=>{var n,i,a,c;t.insertAdjacentHTML("afterbegin",(n=s.img,i=s.title,a=s.price,`\n\n    <div class="basket-content__game" data-id="${c=s.id}">\n      <div class="basket-content__game-info">\n          <img class="basket-content__game-image"\n            src="${n}" alt="game image prev">\n          <div class="basket-content__game-text">\n              <span class="basket-content__game-name">\n                ${i}\n              </span>\n              <span class="basket-content__game-sum">\n                ${a}\n              </span>\n          </div>\n      </div>\n      <div class="basket-content__game-select">\n          <button class="basket-content__game-del" aria-label="Удалить товар">\n              <img src="./images/icons/btn-delete.svg" alt=""></button>\n          <div class="basket-content__select-app">\n              <div class="basket-content__select-wrapp">\n\n                  <div id="select-${c}">\n\n                  </div>\n\n                </div>\n          </div>\n      </div>\n  </div> `)),(t=>{new e(`#select-${t}`,{placeholder:"Выберите способ покупки",selectedId:"1",data:[{id:"1",value:"Аренда через семейный доступ"},{id:"2",value:"Аренда через личный доступ"}],onSelect(t){}})})(s.id)})),document.querySelectorAll(".basket-content__game-del").forEach((t=>{t.addEventListener("click",(t=>{const e=t.currentTarget,s=e.parentNode.closest(".basket-content__game");console.log(e),console.log(s);const n={id:s.dataset.id};s.remove(),i.removeItem(n),a()}))}))}),500),s.forEach((t=>{t.closest(".game-card").setAttribute("data-id",++n),t.addEventListener("click",(t=>{const e=(t=>({title:t.querySelector(".game-card__title").textContent,price:t.querySelector(".game-card__sum").textContent,img:t.querySelector(".game-card__img").getAttribute("src"),id:t.dataset.id}))(t.currentTarget.parentNode.closest(".game-card"));i.addItem(e),a()}))}))};document.addEventListener("DOMContentLoaded",(function(){new t("faq-tab",{tabList:".content__tabs",tabsBtns:".content__tab-link",content:".faq-content-box",contentItem:".content__box",linkActive:"content__tab-link--active",contentBoxActive:"content__box--active",isChanged:t=>{}}),new t("profile-tab",{tabList:".profile-content__tabs",tabsBtns:".content__tab-link",content:".profile-content-box",contentItem:".content__box",linkActive:"content__tab-link--active",contentBoxActive:"content__box--active",isChanged:t=>{}}),document.querySelector(".faq")&&triggers(),n()}))})();