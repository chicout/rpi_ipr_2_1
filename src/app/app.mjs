import ListController from './list.controller';

import '../styles.scss';

document.addEventListener('DOMContentLoaded', () => {
    const listController = new ListController();
    listController.initialize();
});
