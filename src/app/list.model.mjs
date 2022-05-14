import Api from './api.mjs';

class ListModel {
    handlers = null;

    #api = null;

    #news = [];
    #newsChunk = [];
    #sources = [];
    #currentSource = null;
    #currentPage = 0;
    #currentQuery = null;

    #canLoadData = true;

    get news() {
        return this.#news;
    }

    get newsChunk() {
        return this.#newsChunk;
    }

    get sources() {
        return this.#sources;
    }

    get currentSource() {
        return this.#currentSource;
    }

    set currentSource(source) {
        this.#currentSource = source;
    }

    get currentQuery() {
        return this.#currentQuery;
    }

    set currentQuery(query) {
        this.#currentQuery = query;
    }

    get canLoadData() {
        return this.#canLoadData;
    }

    constructor() {
        this.#api = new Api();
    }

    async initialize(handlers) {
        this.handlers = handlers;

        this.#sources = await this.#api.getSources();
        this.#currentSource = this.#sources.length ? this.#sources[0].id : null;

        await this.loadData(this.#currentSource);
    }

    async loadData(sources, q) {
        this.#currentPage += 1;

        this.#newsChunk = await this.#api.getNews({page: this.#currentPage, sources, q});
        this.#news = this.#news.concat(this.#newsChunk);

        this.#canLoadData = !!this.#newsChunk.length && this.#news.length <= 35;
        this.handlers.onCanLoadChange(this.#canLoadData);
    }

    resetData() {
        this.#currentPage = 0;

        this.#newsChunk = [];
        this.#news = [];

        this.#currentQuery = null;

        this.#canLoadData = true;
    }
}

export default ListModel;