class _3Utils {
    static #registerElements = new Map();
    /**
     * Получить элемент со страницы
     * @param selector селектор
     * @param name опциональный, имя для регистрации
     * @returns LionElement
     */
    static get (selector, name)  {
        const temp = document.querySelector(selector);
        const el = new LionElement(temp)
        name && LIONUtils.register(name, el);
        return el;
    };

    /**
     * Создать новый LionElement
     * @param tag tag элемента
     * @param name опциональный, имя для регистрации
     * @returns LionElement элемент
     */
    static create (tag, name) {
        const temp = document.createElement(tag);
        const el = new LionElement(temp)
        name && LIONUtils.register(name, el);
        return el;
    };

    /**
     * Зарегистрировать элемент
     * @param name имя для регистрации
     * @param el элемент
     * @returns LionElement элемент
     */
    static register (name, el)  {
        if (!name || this.#registerElements.has(name)){
            throw new Error(`ошибка регистрации элемента ${name} obj=${el.description()}`);
        }
        const temp = document.querySelector(selector);
        return new LionElement(temp);
    };


    /**
     * Временная смена класса
     * @param el елемент
     * @param time время
     * @param addClass класс, который на время добавится
     * @param removeClass класс который на время уберется
     */
    static timeClassToggle(el, time, addClass, removeClass){
        el.classList.add(addClass);
        removeClass && el.classList.remove(removeClass);

        setTimeout(() => {
            removeClass && el.classList.add(removeClass);
            el.classList.remove(addClass);
        }, time);
    };
}

/**
 * Прокси для работы с утилитами
 * @type {LIONUtils}
 * @private
 */
const _$ = LIONUtils;