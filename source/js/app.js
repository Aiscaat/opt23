;
var $ = document;

window.onload = () => {
   if ($.querySelector('.quick-view__wrap')) device(1);
   if ($.querySelector('.header-catalog')) device(2);
   if ($.querySelector('.product-card .product-info__feature')) productCart();
   catalogSelect();
};

var device = (n) => {
   var windowWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
   var htmlWidth = document.documentElement.offsetWidth;
   if (windowWidth - htmlWidth !== 17) {
      switch (n) {
         case 1: $.querySelector('.quick-view__wrap').classList.add('-padding');
         case 2: $.querySelector('.header-catalog').classList.add('-padding');
         default: break;
      }
   }
};

var catalogSelect = () => {
   $.querySelectorAll('p.catalog-controls__item-name').forEach(item => {
      item.onclick = () => {
         $.querySelectorAll('.catalog-controls__select').forEach(el => {
            if (el.classList.contains('-active') && item.nextElementSibling !== el) el.classList.remove('-active')
         });
         item.nextElementSibling.classList.toggle('-active');
      }
   })
}

var productCart = () => {
   var h = $.querySelector('.product-info__head').offsetHeight;
   $.querySelector('.product-card .product-info__feature').style.marginTop = `-${h-5}px`;
};