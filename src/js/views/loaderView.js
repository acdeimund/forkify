import { elementStrings } from './base.js';

function renderLoader(parent){
    const loader =`
        <div class = "${elementStrings.loader}">
            <svg>
                <use href = "img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

function clearLoader(){
    const loader = document.querySelector('.' + elementStrings.loader);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
}
export { renderLoader, clearLoader };