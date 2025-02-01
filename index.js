import{a as m,i as n,S as p}from"./assets/vendor-BDaiwwc1.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerPolicy&&(a.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?a.credentials="include":e.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(e){if(e.ep)return;e.ep=!0;const a=s(e);fetch(e.href,a)}})();const g="https://pixabay.com/api/",h="48226781-c314bf294542f2e13595e23de",y=15;async function L(t,o=1){try{const i=(await m.get(g,{params:{key:h,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:y,page:o}})).data;return i.hits.length===0&&n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),i}catch(s){throw console.error("Error fetching images:",s),n.error({message:"Error fetching images. Please try again later.",position:"topRight"}),s}}function v(t){return t.map(({largeImageURL:o,webformatURL:s,tags:i,likes:e,views:a,comments:c,downloads:u})=>`<li class="gallery-item">
          <article class="card">
            <a class="card-link" href="${o}" target="_blank" rel="noopener noreferrer">
              <img class="card-image" src="${s}" alt="${i}" />
            </a>
            <div class="card-container">
              <div class="card-item">
                <p class="card-title"><i class="fas fa-heart"></i> Likes</p>
                <p class="card-count">${e}</p>
              </div>
              <div class="card-item">
                <p class="card-title"><i class="fas fa-eye"></i> Views</p>
                <p class="card-count">${a}</p>
              </div>
              <div class="card-item">
                <p class="card-title"><i class="fas fa-comment"></i> Comments</p>
                <p class="card-count">${c}</p>
              </div>
              <div class="card-item">
                <p class="card-title"><i class="fas fa-download"></i> Downloads</p>
                <p class="card-count">${u}</p>
              </div>
            </div>
          </article>
        </li>`).join("")}const r={form:document.querySelector(".form"),gallery:document.querySelector(".gallery"),loaderContainer:document.querySelector(".loader-container"),loadMoreBtn:document.createElement("button")};r.loadMoreBtn.textContent="Load more";r.loadMoreBtn.classList.add("button","load-more","is-hidden");r.gallery.insertAdjacentElement("afterend",r.loadMoreBtn);let d="",l=1;const b=15;let E=new p(".gallery a",{captionDelay:300,captionsData:"alt"});r.form.addEventListener("submit",M);r.loadMoreBtn.addEventListener("click",P);function M(t){if(t.preventDefault(),d=t.currentTarget.elements.state.value.trim(),!d){n.error({message:"Please enter your request",position:"topRight"});return}l=1,r.gallery.innerHTML="",r.loadMoreBtn.classList.add("is-hidden"),f()}async function P(){l+=1,await f()}async function f(){try{r.loaderContainer.classList.remove("is-hidden");const t=await L(d,l);if(t.hits.length===0){n.error({message:"No images found. Try another search!",position:"topRight"});return}r.gallery.insertAdjacentHTML("beforeend",v(t.hits)),E.refresh(),w(),l*b>=t.totalHits?(r.loadMoreBtn.classList.add("is-hidden"),n.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):r.loadMoreBtn.classList.remove("is-hidden")}catch(t){n.error({message:"Error fetching images. Please try again later.",position:"topRight"}),console.error(t)}finally{r.loaderContainer.classList.add("is-hidden")}}function w(){const{height:t}=r.gallery.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2+20,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
