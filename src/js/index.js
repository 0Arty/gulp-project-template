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

// INPUTS

APP.inputMasks = () => {
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
                    placeholder: '+38 (___) ___-__-__',
                    clearIncomplete: true
                });
                break;
        }
    });
}


$document.ready(function () {
    APP.inputMasks()
})
