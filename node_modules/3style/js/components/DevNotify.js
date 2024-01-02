class DevNotify extends HTMLElement {
    text = '';
    type = '';
    textComponent;
    static observedAttributes = ['data-text', 'data-type'];

    constructor(type = 'info', text = '') {
        super();
        if (!this.getAttribute('data-text')) this.setAttribute('data-text', text);
        if (!this.getAttribute('data-type')) this.setAttribute('data-type', type);
    };

    getText() {
        return this.text;
    };

    init() {
        document.body.appendChild(this);
    }

    onChange() {
        this.className = `notification notification__${this.type}`;
        if (this.textComponent) this.textComponent.textContent = this.text;
    };

    connectedCallback() {
        this.text = this.getAttribute('data-text');
        this.type = this.getAttribute('data-type');
        this.className = `notification notification__${this.type}`;
        this.innerHTML = `<div class="notification__close" onclick="this.parentElement.remove()"><span class="material-symbols-outlined">close</span></div>`;
        this.textComponent = document.createElement('p');
        this.textComponent.textContent = this.text;
        this.appendChild(this.textComponent);

        setTimeout(() => this.remove(), 8000);
    };

    disconnectedCallback() { };

    adoptedCallback() { };

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'data-text':
                this.text = newValue;
            case 'data-type':
                this.type = newValue
        }
        this.onChange();
    };
}

customElements.define("dev-notify", DevNotify);