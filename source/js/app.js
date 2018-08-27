;
/* —— total vars —— */
var $ = document,
active = '-active';



window.addEventListener('load', () => {
   headerCatalog();
   headerPopups();

   if ($.querySelector('.product')) quickView();
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
                  }
               }
            },
            pagination: {
               el: '.content-control__counter',
               type: 'fraction'
            }
         }
      }
   });
   if ($.querySelector('.about-company__slider')) swiper({
      elem: {
         selector: '.about-company__slider-wrap',
         settings: {
            wrapperClass: "about-company__slider-container",
            slideClass: "about-company__slider-item",
            slidesPerView: 1,
            navigation: {
               nextEl: '.slider__control-btn.-next',
               prevEl: '.slider__control-btn.-prev',
            },
            breakpoints: {
               540: {
                  navigation: {
                     nextEl: '.content-control__btn.-next',
                     prevEl: '.content-control__btn.-prev',
                  }
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

   if ($.querySelector('form.filter__list')) catalogFilter.init();
   if ($.querySelector('.catalog-controls__sort-wrap')) mobileCatalogControls();   
   
   if ($.querySelector('.profile__wrap')) profileModule.init();
   
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

var _changeDisplayVisible = (el, resize) => {
   var _close = () => {
      el.style.length === 1
         ? el.removeAttribute('style')
         : el.style.display = null;
   };

   var computedStyle = getComputedStyle(el);

   if (!el.style.display && computedStyle.display)
      el.style.display = computedStyle.display;

   el.style.display === 'none'
      ? el.style.display = 'block'
      : _close();

   if (resize === false) return false;

   window.addEventListener('resize', () => _close());
};

var mediaCheck = (obj) => {
   var media = 'all';

   obj.minWidth ? media += ` and (min-width: ${obj.minWidth})` : null;
   obj.maxWidth ? media += ` and (max-width: ${obj.maxWidth})` : null;

   var breakpoint = window.matchMedia(media);

   var _breakpointChecker = () => {
      if (breakpoint.matches === true) {
         if (obj.funcTrue) obj.funcTrue();
         return;
      } else
         if (obj.funcFalse) obj.funcFalse();
   };

   _breakpointChecker();
   breakpoint.addListener(_breakpointChecker);
};

var pageScroll = (scroll) => {
   scroll === false
      ? $.body.classList.add('no-scroll')
      : $.body.classList.remove('no-scroll');
};

var formShowPass = (form) => {
   form.querySelectorAll('.form__group.-pass').forEach(item => {
      item.querySelector('button.show-pass').onclick = (e) => {
         e.preventDefault();
         var input = item.querySelector('input.form__input');
         input.getAttribute('type') === 'password'
            ? input.setAttribute('type', 'text')
            : input.setAttribute('type', 'password');
      };
   });
};
/* ————————————————— main functions ————————————————— */
var device = (n) => {
   var windowWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
   var htmlWidth = document.documentElement.offsetWidth;
   if (windowWidth - htmlWidth !== 17) {
      switch (n) {
         case 1:
            $.querySelector('.quick-view__wrap').classList.add('-padding');
            break;
         case 2:
            mediaCheck({
               minWidth: '768px',
               funcTrue: () => {
                  $.querySelector('.header-catalog').classList.add('-padding');
               },
               funcTrue: () => {
                  $.querySelector('.header-catalog').classList.remove('-padding');
               }
            });
            break;
         case 3:
            $.querySelectorAll('.filter__item')[$.querySelectorAll('.filter__item').length - 1].style.right = '0';
            $.querySelector('.catalog__grid-aside').querySelector('.-filter').style.right = '0';
            break;
         default: break;
      }
   }
   
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

   mediaCheck({
      minWidth: obj.minWidth,
      maxWidth: obj.maxWidth,
      funcTrue: () => {
         _elemCreateSlider(elem);
      },
      funcFalse: () => {
         if (slider !== undefined) slider.destroy(true, true);
      }
   });

   // var media = 'all';

   // obj.minWidth ? media += ` and (min-width: ${obj.minWidth})` : null;
   // obj.maxWidth ? media += ` and (max-width: ${obj.maxWidth})` : null;

   // var breakpoint = window.matchMedia(media);

   // var _breakpointChecker = () => {
   //    if (breakpoint.matches === true) {
   //       _elemCreateSlider(elem);
   //       return;
   //    } else if (slider !== undefined) slider.destroy(true, true);
   // };

   // _breakpointChecker();
   // breakpoint.addListener(_breakpointChecker);
};

var headerCatalog = () => {
   var catalog = $.querySelector('.header-catalog');

   var _sp = () => {
      catalog.style.display === 'block'
         ? pageScroll(false)
         : pageScroll(true);
   };

   _sp();
   
   var _open = (catalog) => {
      _changeDisplayVisible(catalog, false);
      _sp();
   };

   var _close = (catalog) => {
      catalog.style.length === 1
         ? catalog.removeAttribute('style')
         : catalog.style.display = null;
      pageScroll(true);
   };

   $.querySelector('.header-catalog__btn').onclick = () => _open(catalog);

   catalog.querySelector('button.close').onclick = () => _close(catalog);
};

var headerPopups = () => {
   var
      headerMenu = $.querySelector('.header-menu'),
      mobileSearch = $.querySelector('.mobile-search'),
      controls = [
         {
            el: headerMenu.querySelector('button.header-menu__btn'),
            box: headerMenu.querySelector('.header-popup')
         },
         {
            el: mobileSearch.querySelector('button.mobile-search__btn'),
            box: mobileSearch.querySelector('.header-popup')
         }
      ];

   controls.forEach(item => {
      item.el.onclick = () => {
         _changeDisplayVisible(item.box);
         pageScroll(false);
      };
   });

   $.querySelectorAll('.head-mobile').forEach(item => {
      item.querySelector('button.close').onclick = () => {
         _changeDisplayVisible(item
            .querySelector('button.close')
            .parentElement
            .parentElement);
         pageScroll(true);
      };
   });

   headerMenu
      .querySelector('a.header-menu__link[href="@catalog"]')
      .onclick = (e) => {
         e.preventDefault();
         _changeDisplayVisible($.querySelector('.header-catalog'));
         pageScroll(false);
      };
   
};

var quickView = () => {
   var qw = $.querySelector('.quick-view');

   var _close = (qw) => {
      qw.style.length === 1
         ? qw.removeAttribute('style')
         : qw.style.display = null;
   };
   
   $.querySelectorAll('.product__quick-view').forEach(item => {
      item.onclick = () => { qw.style.display = 'block'; };
   });

   qw.querySelector('button.close').onclick = () => _close(qw);

   mediaCheck({maxWidth: '767px', funcTrue: () => { _close(qw); } });
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
   var init = () => {
      _tabsCommonFunc($.querySelectorAll('.profile__tab'));
      itemShow();
      formShowPass($.getElementById('profileForm'));
   };

   var itemShow = () => {
      $.querySelectorAll('.history-item').forEach(item => {
         item.querySelector('button.history-item__btn').onclick = () => {
            var current = item.querySelector('button.history-item__btn');

            current.parentElement.nextElementSibling.classList.toggle(active);
            console.log(current.parentElement.nextElementSibling);
            
         };
      });
   };

   return {
      init: init
   }
})();

var catalogFilter = (() => {

   var init = () => {
      openOption();
      if ($.querySelector('.filter__range')) slider($.querySelector('.filter__range'));      
      if ($.querySelector('.filter__list')) mediaCheck({ maxWidth: '767px', funcTrue: device(3) });
      _closePopupElement($.querySelector('.catalog__grid-aside'));
   };

   var openOption = () => {
      $.querySelectorAll('.filter__item-name').forEach(item => {
         item.onclick = () => {
            item.parentElement.nextElementSibling.classList.toggle('-hidden');
         }
      });
   };

   var _setSliderHandle = (i, value) => {
      var r = [null, null];
      r[i] = value;
      el.noUiSlider.set(r);
   };

   var slider = (el) => {
      var controlBoxs = el.previousElementSibling.querySelectorAll('.filter__input');
      
      noUiSlider.create(el, {
         start: [0.5, 5],
         connect: true,
         range: {
            'min': 0,
            'max': 6
         }
      });
   
      el.noUiSlider.on('update', (values, handle) => {
         controlBoxs[handle].value = values[handle];
      });
      
      controlBoxs.forEach(function(input, handle) {   
         input.addEventListener('change', function() {
            _setSliderHandle(handle, this.value);
         });
      
         input.addEventListener('keydown', function(e) {   
            var values = el.noUiSlider.get(),
               value = Number(values[handle]),
               steps = el.noUiSlider.steps(),
               step = steps[handle],
               position;
   
            switch (e.which) {
               case 13:
                  e.preventDefault();
                  _setSliderHandle(handle, this.value);
                  break;
               case 38:
                  position = step[1];
                  if ( position === false ) position = 1;   
                  if ( position !== null ) _setSliderHandle(handle, value + position);
                  break;
               case 40:
                  position = step[0];
                  if ( position === false ) position = 1;
                  if ( position !== null ) _setSliderHandle(handle, value - position);
                  break;
            }
         });
      });
   };

   return {
      init: init,
      openOption: openOption,
      slider: slider
   }
})();