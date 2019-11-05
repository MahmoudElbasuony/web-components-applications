export class CustomButton extends HTMLDivElement {

    constructor() {
        super();

        this.attachShadow({mode : 'open'});
        const styleNode = document.createElement('style');
        styleNode.innerHTML = `
            .btn {
                display: inline-block;
                border: 1px solid silver;
                padding: 10px;
                cursor: pointer;
                margin: 2px;
                background: silver;
                border-radius: 5px;
            }
            .btn:hover {
                background: #aba9a9;
            }
        `;

        this.shadowRoot.appendChild(styleNode);
        const slot = document.createElement('slot');
        slot.classList.add('btn');
        this.shadowRoot.appendChild(slot);
        slot.addEventListener('click',()=>{
            alert('you dared !');
        });

    }

}



customElements.define('custom-button', CustomButton, {
    extends: 'div'
});