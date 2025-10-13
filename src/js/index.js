let APP = {}

// CLASSES ========================================================================
class ModalWindow {
    constructor(modalSelector, openHandlerSelector, closeHandlerSelector) {
        this.$modal = $(modalSelector)
        this.$modalContent = $(`${modalSelector}__content`)
        this.$openBtn = $(openHandlerSelector)
        this.$closeBtn = $(closeHandlerSelector)
        this.INTERACTIVE_ELEMENTS = `${modalSelector}__content, ${openHandlerSelector}`

        this.init()
    }

    openModal() {
        this.$modal.fadeIn(400);
        this.$openBtn.addClass('open');
        $('body').addClass('no-scroll');

        // Паузимо ScrollSmoother
        if (APP.smoother) {
            APP.smoother.paused(true);
        }

        this.openOptions();
    }
    openOptions() { }


    closeModal() {
        this.$modal.fadeOut(400);
        this.$openBtn.removeClass('open');
        $('body').removeClass('no-scroll');

        // Відновлюємо ScrollSmoother
        if (APP.smoother) {
            APP.smoother.paused(false);
        }

        this.closeOptions();
    }
    closeOptions() { }

    modalHandler() {
        if (this.$openBtn.hasClass('open')) {
            this.closeModal()
        } else {
            this.openModal()
        }
    }

    init() {
        this.$modal.hide()
        this.$openBtn.on('click', () => this.modalHandler())
        this.$closeBtn.on('click', () => this.closeModal())

        $(document).on('click', (e) => {
            if (!$(e.target).closest(this.INTERACTIVE_ELEMENTS).length) {
                this.closeModal()
            }
        })
    }
}

// APP UTILS =======================================================================
APP.utils = {
    debounce: (func, delay) => {
        let timeoutId
        return function (...args) {
            const context = this
            clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                func.apply(context, args)
            }, delay)
        }
    },
    throttle: (func, delay) => {
        let lastCall = 0
        return function (...args) {
            const context = this
            const now = Date.now()
            if (now - lastCall >= delay) {
                func.apply(context, args)
                lastCall = now
            }
        }
    },
    onWidthChange: (callback, debounceMs = 150) => {
        let lastWidth = window.innerWidth;
        let timeoutId = null;

        function handleResize() {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                const currentWidth = window.innerWidth;

                if (currentWidth !== lastWidth) {
                    lastWidth = currentWidth;
                    callback(currentWidth);
                }
            }, debounceMs);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            window.removeEventListener('resize', handleResize);
        };
    },
    inputMasks: () => {
        $('input[data-input-type]').each(function () {
            const inputType = $(this).data('input-type');

            switch (inputType) {
                case 'text':
                    // Маска для текстового поля (дозволяє тільки літери та пробіли)
                    $(this).inputmask({
                        mask: '*{1,50}',
                        definitions: {
                            '*': {
                                validator: '[A-Za-zА-Яа-яЁё\\s]',
                                cardinality: 1
                            }
                        },
                        placeholder: '',
                        clearIncomplete: true
                    });
                    break;

                case 'number':
                    // Маска для числового поля (дозволяє тільки цифри)
                    $(this).inputmask({
                        mask: '9{1,10}',
                        placeholder: '',
                        clearIncomplete: true
                    });
                    break;

                case 'email':
                    // Маска для email
                    $(this).inputmask({
                        mask: '*{1,64}@*{1,64}.*{1,10}',
                        greedy: false,
                        definitions: {
                            '*': {
                                validator: '[0-9A-Za-z!#$%&\'*+/=?^_`{|}~-]',
                                cardinality: 1
                            }
                        },
                        placeholder: '',
                        clearIncomplete: true
                    });
                    break;

                case 'phone':
                    // Маска для телефону (формат +38 (XXX) XXX-XX-XX)
                    $(this).inputmask({
                        mask: '+38 (999) 999-99-99',
                        placeholder: '+38 (XXX) XXX-XX-XX',
                        clearIncomplete: true
                    });
                    break;
            }
        });
    }
}

APP.gsapConfig = () => {
    // ScrollSmoother
    gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);

    ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true
    });

    // APP.smoother = ScrollSmoother.create({
    //     wrapper: '#smooth-wrapper',  // Обгортка для всього контенту
    //     content: '#smooth-content',  // Контейнер з контентом
    //     smooth: 1.5,                 // Плавність (0.1 - 3, де більше = плавніше)
    //     effects: true,               // Увімкнути data-speed parallax ефекти
    //     smoothTouch: 0.1,            // Плавність на тач-пристроях (0 = вимкнено)
    //     normalizeScroll: false,      // НЕ використовуємо normalizeScroll
    //     ignoreMobileResize: true,    // Ігноруємо resize на мобільних
    // });


    // Скрол до елемента
    // APP.smoother.scrollTo("#section2", true, "top top");

    // Отримати поточну позицію скролу
    // const scrollY = APP.smoother.scrollTop();

    // Паузa smooth scroll
    // APP.smoother.paused(true);

    // Відновити smooth scroll
    // APP.smoother.paused(false);

    APP.utils.onWidthChange(() => { ScrollTrigger.refresh() })
    window.addEventListener('load', () => { setTimeout(() => ScrollTrigger.refresh(), 100); });
}

document.addEventListener("DOMContentLoaded", (event) => {
    APP.gsapConfig()
    APP.utils.inputMasks()

    setTimeout(() => ScrollTrigger.refresh(), 100);
});
