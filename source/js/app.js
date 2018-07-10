;
var $ = document;

window.onload = () => {
   catalogSelect();
};

var catalogSelect = () => {
   $.querySelectorAll('p.catalog-controls__item-name').forEach(item => {
      item.onclick = () => {
         $.querySelectorAll('.catalog-controls__select').forEach(el => {
            if(el.classList.contains('-active') && item.nextElementSibling !== el) el.classList.remove('-active')
         });
         item.nextElementSibling.classList.toggle('-active');
      }
   })
}