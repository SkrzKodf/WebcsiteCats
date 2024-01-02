class DevSelect extends HTMLElement {
    value = "";
    static observedAttributes = ["value"];
    constructor() {
        super();
    };

    getValue() {
        return this.value;
    };

    onChange() {

    };

    connectedCallback() {
        this.value = this.getAttribute("value");
    };

    disconnectedCallback() { };

    adoptedCallback() { };

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "value":
                this.value = newValue;
                this.classList.remove(oldValue);
                this.classList.add(newValue);
                this.onChange();
        }
    };
}

customElements.define("dev-select", DevSelect);