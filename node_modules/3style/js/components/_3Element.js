class _3Element {
    #el;
    #listeners = new Map();
    #listenersType = new Map();
    #connections = new Map();
    #connectListeners = new Map();

    constructor(el) {
        this.#el = el;
    }

    get __element__() {
        return this.#el;
    }

    get value() {
        return this.#el.value | this.#el.getAttribute('value') | this.#el.dataset.value;
    }

    /* Методы глубокого взаимодействия */
    prop(property, value) {
        if (!value) return this.#el[property];
        this.#el[property] = value;
        return this;
    }

    attr(property, value) {
        if (!value) return this.#el.getAttribute(property);
        this.#el.setAttribute(property, value);
        return this;
    }

    rmProp(property) {
        this.#el[property] = undefined;
        return this;
    }

    rmAttr(property) {
        this.#el.removeAttribute(property);
        return this;
    }

    hasProp(property) {
        return !(!this.#el[property]);
    }

    hasAttr(attr, value) {
        return this.#el.hasAttribute(attr);
    }

    /* Работа со слушателями  */
    click(name, type, fun, options) {
        this.#el.addEventListener(type, fun, options);
        this.#listeners.set(name, fun);
        this.#listenersType.set(name, type);
        return this;
    }

    rmClick(name) {
        const fun = this.#listeners.get(name);
        const type = this.#listenersType.get(name);
        this.#el.removeEventListener(type, fun);
        return this;
    }

    /* Налаживание связи элементов  */
    /**
     * Создание соединения между объектами
     * @param name имя соединения
     * @param el второй участник соединения
     * @returns {LionElement} this
     */
    connect(name, el) {
        if (el instanceof LionElement) {
            this.#connections.set(name, el);
            el.connect(name, this);
        } else {
            const element = new LionElement(el);
            element.connect(name, this);
            this.#connections.set(name, element);
        }
        return this;
    }

    /**
     * Отправка сообщения с посылкой по соединению
     * @param name имя соединения
     * @param msg сообщение
     * @param obj передающийся объект - посылка
     * @returns {Promise<any>} промис обработки слушателя у получателя
     */
    emit(name, msg, obj) {
        const recipient = this.#connections.get(name);
        return recipient.initReceiveListener(msg, obj);
    }

    /**
     * Задать слушатель получения сообщения
     * @param msg сообщение
     * @param fun слушатель принимающий три аргумента (resolve, reject, obj)
     * @returns {LionElement} this
     */
    setConnectListener(msg, fun) {
        this.#connectListeners.set(msg, fun);
        return this;
    }

    /**
     * Запустить слушатель по сообщению с посылкой
     * @param msg сообщение
     * @param obj передающийся объект - посылка
     * @returns {Promise<unknown>} промис обработки слушателя
     */
    initReceiveListener( msg, obj) {
        const fun = this.#connectListeners.get(`${msg}`);
        if (!fun) throw new Error(`Слушатель с сообщением [${msg}] не найден`)
        return new Promise((resolve, reject) => {
            fun(resolve, reject, obj)
        });
    }

    /* Дополнительный функционал */
    isPresent(){
        return !(!this.#el);
    }

    isShow() {
        return !this.#el.classList.contains('hide');
    }

    hide() {
        this.#el.classList.add('hide');
        return this;
    }

    show() {
        this.#el.classList.remove('hide');
        return this;
    }

    isEnable() {
        !this.#el.classList.contains('disable');
        return this;
    }

    disable() {
        !this.#el.classList.add('disable');
        this.#el.disabled = true;
        return this;
    }

    enable() {
        !this.#el.classList.remove('disable');
        this.#el.disabled = false;
        return this;
    }

    withId(id) {
        this.#el.id = id;
        return this;
    }

    withClass(clas) {
        this.#el.classList.add(clas);
        return this;
    }

    withoutClass(clas) {
        this.#el.classList.remove(clas);
        return this;
    }

    withInner(inner) {
        this.#el.innerHTML = inner;
        return this;
    }

    /* Геттеры */
    get dataset() {
        return this.#el.dataset;
    }

    get attrs() {
        return this.#el.attributes;
    }

    get parent() {
        return this.#el.parentElement;
    }

    get firstChild() {
        return this.#el.firstElementChild;
    }

    get children() {
        return this.#el.childNodes;
    }

    get root() {
        return this.#el.shadowRoot;
    }

    get id() {
        return this.#el.id;
    }

    get tagName() {
        return this.#el.tagName;
    }

}