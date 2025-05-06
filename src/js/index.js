let APP = {}
let $document = $(document)

APP.utils = {
    debounce: (func, delay)=> {
        let timeoutId;
        return function(...args) {
            const context = this;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    },
    createModalWindow : (modalSelector, btnOpenSelector, btnCloseSelector) => {
        const $modal = $(modalSelector)
        const $modalContent = $(`${modalSelector}__content`)
        const $openBtn = $(btnOpenSelector)
        const $closeBtn = $(btnCloseSelector)
    
        const openModal = () => {
            $modal.fadeIn(400)
            $openBtn.addClass('open')
            $('body').addClass('no-scroll')
        }
    
        const closeModal = () => {
            $modal.fadeOut(400)
            $openBtn.removeClass('open')
            $('body').removeClass('no-scroll')
        }
    
        const modalHandler = () => {
            if ($openBtn.hasClass('open')) {
                closeModal()
            } else {
                openModal()
            }
        }
    
        $modal.hide()
        $openBtn.on('click', modalHandler)
        $closeBtn.on('click', closeModal)
    
        const INTERACTIVE_ELEMENTS = `${modalSelector}__content, ${btnOpenSelector}`
        $(document).on('click', (e) => {
            if (!$(e.target).closest(INTERACTIVE_ELEMENTS).length) {
                closeModal()
            }
        })
    }
}

$document.ready(function () {
    APP.utils.createModalWindow('selector', 'openBtn', 'closeBtn')
})