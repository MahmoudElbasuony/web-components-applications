export class FilteredList extends HTMLElement {


    items = [];



    constructor() {

        super();

        let _isInitialized = false;
        
        Reflect.defineProperty(this, 'isInitialized', {
            get: () => _isInitialized,
            set: (val) => {
                if (_isInitialized)
                    throw `invalid operation`;
                _isInitialized = val;
            }
        });

        this._setup();

    }

    _setup() {

        if (this.isInitialized)
            throw `can't re-initialize this component !`;

        this.attachShadow({
            mode: 'open'
        });


        const _getNodeFromTemplate = (template) => {
            const temp = document.createElement('template');
            temp.innerHTML = template;
            return temp.content.firstChild.cloneNode(true);
        }

        const _styleTemplate = `<link href='./FilteredList/filtered-list.css' rel='stylesheet' type="text/css"/>`;
        const _inputTemplate = `<input type='text' placeholder='type to filter , enter to add ' />`;
        const _listTemplate = `<ul/>`;
        const _itemTemplate = `<li/>`;

        const _styleNode = _getNodeFromTemplate(_styleTemplate);
        this.shadowRoot.appendChild(_styleNode);

        const _inputNode = _getNodeFromTemplate(_inputTemplate);
        if (this.hasAttribute('input-class'))
            _inputNode.setAttribute('class', this.getAttribute('input-class'));

        _inputNode.addEventListener('keyup', (evt) => {
            const val = evt.target.value;
            const code = evt.which || evt.keyCode;
            if (code === 13) {
                this.searchText = null;
                this.addItem(val);
            } else {
                this.searchText = val;
            }
        });

        this.shadowRoot.appendChild(_inputNode);


        this.createTemplateNode = () => {
            return _getNodeFromTemplate(_listTemplate);
        };

        this.createItemTemplateNode = () => {
            return _getNodeFromTemplate(_itemTemplate);
        };

        const $listNode = this.createTemplateNode();
        if (this.hasAttribute('list-class'))
            $listNode.setAttribute('class', this.getAttribute('list-class'));

        Reflect.defineProperty(this, 'listNode', {
            "get": () => $listNode
        });

        this.shadowRoot.appendChild(this.listNode);

        let $searchText = null;
        Reflect.defineProperty(this, 'searchText', {
            "get": () => $searchText,
            "set": (val) => {
                $searchText = val;
                this.render();
            }
        });


        this.isInitialized = true;

    }



    connectedCallback() {
        this.render();
    }

    set Items(val) {
        this.items = val;
        this.render();
    }

    addItem(val) {
        this.items = this.items || [];
        this.items.push(val);
        this.render();
    }


    render() {
        this.listNode.innerHTML = "";
        const matchedItems = this.searchText && this.searchText.trim() ? this.items.filter(i => i.includes(this.searchText)) : this.items;
        matchedItems.forEach(item => {
            if (item && item.toString().trim()) {
                const listItemNode = this.createItemTemplateNode();
                listItemNode.innerHTML = item;
                this.listNode.appendChild(listItemNode);
            }
        });
    }




}


customElements.define('filtered-list', FilteredList);