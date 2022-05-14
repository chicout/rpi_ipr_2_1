class ListView {
    handlers = null;

    #elementSelectors = {
        filter: 'select',
        search: 'input',
        searchBtn: 'main button',
        container: 'ul',
        moreBtn: 'footer button',
        noItems: '.list-no-item-container'
    };

    #elements = { };

    initialize(news, sources, canLoad, handlers) {
        this.handlers = handlers;

        this.#processElementSelectors();
        this.#addEventListeners();
        this.#renderFilter(sources);
        this.renderList(news);

        this.toggleMoreBtn(canLoad);
        this.toggleNoItems(!news.length);
    }

    renderList(items) {
        const template = document.createElement('template');

        for (const item of items) {
            template.innerHTML += this.#getListItem(item);
        }

        this.#elements.container.append(template.content);
    }

    rerenderList(items) {
        this.#elements.container.innerHTML = '';
        this.renderList(items);
    }

    toggleMoreBtn(show) {
        if (!this.#elements.moreBtn) { return; }
        this.#elements.moreBtn.hidden = !show;
    }

    toggleNoItems(show) {
        if (!this.#elements.noItems) { return; }
        this.#elements.noItems.hidden = !show;
    }

    cleanSearch() {
        this.#elements.search.value = '';
    }

    #onSearchChange() {
        this.handlers.onSearchChange(this.#elements.search.value);
    }

    #processElementSelectors() {
        for (const [key, value] of Object.entries(this.#elementSelectors)) {
            this.#elements[key] = document.querySelector(value);
        }
    }

    #addEventListeners() {
        this.#elements.search.addEventListener('keypress', event => {  if (event.key === 'Enter') this.#onSearchChange()} );
        this.#elements.searchBtn.addEventListener('click', () => this.#onSearchChange());
        this.#elements.filter.addEventListener('change', this.handlers.onFilterChange);
        this.#elements.moreBtn.addEventListener('click', this.handlers.onMoreBtnClick);
    }

    #renderFilter(items) {
        const template = document.createElement('template');

        for (const item of items) {
            template.innerHTML += this.#getFilterItem(item);
        }

        this.#elements.filter.append(template.content);
    }

    #getListItem(data) {
        const {urlToImage, title, description, url} = data,
              urlToDefaultImage = 'https://www.seekpng.com/png/detail/370-3703355_empty-folder-image-showing-no-results-were-found.png';

        return `
            <li>
                <div class="list-item-img-container">
                    <img src="${urlToImage !== 'null' ? urlToImage : urlToDefaultImage}" alt="news image"/>
                </div>
                <div class="list-item-content-container">
                    <h4>${title}</h4>
                    <p>${description}</p>
                    <a href="${url}">Read More</a>
                </div>
            </li>
        `;
    }

    #getFilterItem(data) {
        return `<option value="${data.id}">${data.name}</option>`;
    }
}

export default ListView;