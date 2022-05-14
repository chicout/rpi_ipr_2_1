import ListModel from './list.model';
import ListView from './list.view';

class ListController {
    handlers = {
        onCanLoadChange: (event) => this.canLoadChangeHandler(event),
        onSearchChange: (event) => this.searchChangeHandler(event),
        onFilterChange: (event) => this.filterChangeHandler(event),
        onMoreBtnClick: () => this.moreBtnClickHandler()
    };

    #model = null;
    #view = null;

    constructor() {
        this.#model = new ListModel();
        this.#view = new ListView();
    }

    async initialize() {
        await this.#model.initialize(this.handlers);

        this.#view.initialize(
            this.#model.newsChunk,
            this.#model.sources,
            this.#model.canLoadData,
            this.handlers
        );
    }

    canLoadChangeHandler(canLoad) {
        this.#view.toggleMoreBtn(canLoad);
        this.#view.toggleNoItems(!this.#model.news.length);
    }

    async searchChangeHandler(value) {
        this.#model.resetData();
        this.#model.currentQuery = value;

        await this.#model.loadData(this.#model.currentSource, value);
        this.#view.rerenderList(this.#model.newsChunk);
    }

    async filterChangeHandler(event) {
        const source = event.target.value;

        this.#model.resetData();
        this.#model.currentSource = source;

        await this.#model.loadData(source, this.#model.currentQuery);
        this.#view.cleanSearch();
        this.#view.rerenderList(this.#model.newsChunk);
    }

    async moreBtnClickHandler() {
        if (this.#model.canLoadData) {
            await this.#model.loadData(this.#model.currentSource, this.#model.currentQuery);
            this.#view.renderList(this.#model.newsChunk);
        }
    }
}

export default ListController;