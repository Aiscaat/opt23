;
/* —— total vars —— */
var $ = document,
   active = '-active';



window.addEventListener('load', () => {
   if ($.querySelector('.quick-view__wrap')) device(1);
   if ($.querySelector('.header-catalog')) device(2);
   if ($.querySelector('.slider__wrap')) swiper({
      elem: {
         selector: '.slider__wrap',
         settings: {
            wrapperClass: "slider__list",
            slideClass: "product",
            slidesPerView: 'auto',
            navigation: {
               nextEl: '.slider__control-btn.-next',
               prevEl: '.slider__control-btn.-prev',
            },
            breakpoints: {
               540: {
                  navigation: {
                     nextEl: '.content-control__btn.-next',
                     prevEl: '.content-control__btn.-prev',
                  },
               }
            },
            pagination: {
               el: '.content-control__counter',
               type: 'fraction'
            }
         }
      }
   });
   if ($.querySelector('.shares__list')) swiper({
      maxWidth: '540px',
      elem: {
         selector: '.shares__list',
         settings: {
            wrapperClass: "shares__list-wrap",
            slideClass: "shares__item",
            slidesPerView: 'auto',
            navigation: {
               nextEl: '.content-control__btn.-next',
               prevEl: '.content-control__btn.-prev',
            },
            pagination: {
               el: '.content-control__counter',
               type: 'fraction'
            }
         }
      }
   });
   if ($.querySelector('.advantages__list')) swiper({
      maxWidth: '540px',
      elem: {
         selector: '.advantages__list',
         settings: {
            wrapperClass: "advantages__list-wrap",
            slideClass: "advantages__item",
            slidesPerView: 'auto',
            navigation: {
               nextEl: '.content-control__btn.-next',
               prevEl: '.content-control__btn.-prev',
            },
            pagination: {
               el: '.content-control__counter',
               type: 'fraction'
            }
         }
      }
   });

   catalogSelect();
   
   mobileCatalogControls(); // добавить проверку на мобильное расширение

   // if ($.querySelector('.modal-form')) modalForm.open();
});



/* ————————————————— secondary functions ————————————————— */
var _closePopupElement = (el) => {
   el.querySelector('button.close').onclick = () => {
      el.style.display = 'none';
   }
};

var _tabsCommonFunc = (tabs) => {
   var currTab = null;

   tabs.forEach(item => {
      if (item.classList.contains(active))
         currTab = $.getElementById(item.getAttribute('href'));

      item.onclick = (e) => {
         e.preventDefault();
         
         if (item.classList.contains(active)) return false;
         item.parentElement.querySelector('a.-active').classList.remove(active);
         item.classList.add(active);

         if (currTab !== null) currTab.style.display = 'none';

         currTab = $.getElementById(item.getAttribute('href'));
         currTab.style.display = 'block';
      }
   });
};

var _changeDisplayVisible = (el) => {
   var computedStyle = getComputedStyle(el);

   if (el.style.display && el.style.display === 'block' || computedStyle.display !== 'none')
      el.style.display = 'none';
   else
      el.style.display = 'block';

   window.addEventListener('resize', () => {
      el.removeAttribute('style');
   });
};

var checkMobileContent = () => {
   if (window.outerWidth < 768) return false;
};
/* ————————————————— main functions ————————————————— */
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
};

var mobileCatalogControls = () => {
   var sortContainer = $.querySelector('.catalog-controls__sort'),
      filterContainer = $.querySelector('.catalog__grid-aside');      

   $.querySelector('.catalog-controls__sort-btn')
      .onclick = () => _changeDisplayVisible(sortContainer);

   $.querySelector('.catalog-controls__filter-btn')
      .onclick = () => _changeDisplayVisible(filterContainer);   
};

var swiper = (obj) => {
   var elem, slider;
   elem = obj.elem;

   var _elemCreateSlider = (elem) => 
      slider = new Swiper(elem.selector, elem.settings);

   if (!obj.minWidth && !obj.maxWidth) {
      _elemCreateSlider(elem);
      return false;
   }

   var media = 'all';

   obj.minWidth ? media += ` and (min-width: ${obj.minWidth})` : null;
   obj.maxWidth ? media += ` and (max-width: ${obj.maxWidth})` : null;

   var breakpoint = window.matchMedia(media);

   var _breakpointChecker = () => {
      if (breakpoint.matches === true) {
         _elemCreateSlider(elem);
         return;
      } else if (slider !== undefined) slider.destroy(true, true);
   };

   _breakpointChecker();
   breakpoint.addListener(_breakpointChecker);
};
/* ————————————————— modules functions ————————————————— */

var modalForm = (() => {
   var form;

   var init = () => {
      form = $.querySelector('.modal-form');
      close();
      _tabs();
   };
   
   var open = () => {
      init();
      form.style.display = 'flex';
   };

   var close = () => {
      _closePopupElement(form);
   };

   var _tabs = () => {
      var tabs = $.querySelectorAll('.modal-form__tab'),
         contentTabs = form.querySelectorAll('form.form'),
         recPassTab = form.querySelector('a[href="rec-pass"].form__reset-pass'),
         tabsArr = [], currTab = null;

      tabs.forEach(item => {
         tabsArr.push(item);
         if (item.classList.contains(active))
            currTab = $.getElementById(item.getAttribute('href'));
      });
      tabsArr.push(recPassTab);      

      tabsArr.forEach(item => {
         item.onclick = (e) => {
            e.preventDefault();
            
            if (item.classList.contains(active)) return false;
            if (item !== recPassTab) {
               item.parentElement.querySelector('a.-active').classList.remove(active);
               item.classList.add(active);
            } else {
               form.querySelector('a.-active').classList.remove(active);


               // form.querySelector('a.modal-form__tab')
               //    .innerHTML = '1'
               //    .classList.add(active);
            }

            currTab.style.display = 'none';

            currTab = $.getElementById(item.getAttribute('href'));
            currTab.style.display = 'block';
         }
      });


      recPassTab.onclick = () => {
         tabs[0].innerHTML = 'Назад';
         $.getElementById('rec-pass').style.display = 'block';
      };
   };
   
   return {
      open: open,
      close: close,
      init: init
   }
})();

var profileModule = (() => {
   var tabs = [];

   $.querySelectorAll('.profile__tab').forEach(item => {
      tabs.push(item);
   });
   
   _tabsCommonFunc(tabs);
})();