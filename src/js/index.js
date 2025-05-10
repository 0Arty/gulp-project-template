let APP = {}
let $document = $(document)

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

    open() {
        this.$modal.fadeIn(400)
        this.$openBtn.addClass('open')
        $('body').addClass('no-scroll')

        this.openOptions()
    }
    openOptions() { }

    close() {
        this.$modal.fadeOut(400)
        this.$openBtn.removeClass('open')
        $('body').removeClass('no-scroll')

        this.closeOptions()
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

class NewCustomModalWindow extends ModalWindow {
    constructor(modalSelector, btnOpenSelector, btnCloseSelector) {
        super(modalSelector, btnOpenSelector, btnCloseSelector)
    }

    closeModal() {
        //another cutom modal close logic
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
    }
}

// MAIN LOGIC =======================================================================
APP.site = {
    modals: () => {
        const mainModal = new ModalWindow(
            '.modal',
            '.openModal',
            '.closeModal'
        )
        
        mainModal.open()
        mainModal.closeOptions = () => {
            console.log('i changes close options:',)
        }

        setTimeout(() => {
            mainModal.close()

        }, 5000)
    }
}

$document.ready(function () {
    APP.site.modals()
})
