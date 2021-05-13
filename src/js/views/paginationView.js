import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHanderButtons(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const generateMarkupButton = function (btn) {
      let n = currPage;
      let arrow = '';
      if (btn === 'next') {
        n = n + 1;
        arrow = 'right';
      }

      if (btn === 'prev') {
        n = n - 1;
        arrow = 'left';
      }

      return `
                <button data-goto="${n}" class="btn--inline pagination__btn--${btn}">
                    <span>Page ${n}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-${arrow}"></use>
                    </svg>
                </button>
            `;
    };

    // Page 1 and there are other pages
    if (currPage === 1 && numPages > 1) {
      return generateMarkupButton('next');
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return generateMarkupButton('prev');
    }

    // Other page
    if (currPage < numPages) {
      return generateMarkupButton('prev') + generateMarkupButton('next');
    }

    // Page 1 and there aren NO other pages
    return '';
  }
}

export default new PaginationView();
