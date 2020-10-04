(function() {
    let scrollTimer

    /**
     * Hide items at init and on scroll
     */
    function init () {
        _hideUserRatedItems();

        [...document.querySelectorAll('.sliderContent')].forEach((sliderContent) => {
            sliderContent.addEventListener('transitionend', () => setTimeout(_hideUserRatedItems, 500))
        })

        window.addEventListener('scroll', function () {
            window.clearTimeout( scrollTimer );
            scrollTimer = setTimeout(_hideUserRatedItems, 500);
        });
    }

    /**
     * Check if item is rated (positive or negative)
     * Retrieve from list from store and adapt to use as array/flatten and find matching item to check
     * @param itemId
     * @returns {*|boolean}
     * @private
     */
    function _isItemRated (itemId) {
        const lists = window.netflix.reactContext.pathEvaluator._root.cache.lists;
        const item = Object.keys(lists)
            .map(listId => listId.includes('$') ? [] : lists[listId])
            .map(list => typeof list === 'object' && Object.keys(list).map(itemId => itemId.includes('$') ? [] : list[itemId]))
            .flat(2)
            .map(item => item.itemSummary && item.itemSummary.value ? item.itemSummary.value : {})
            .find(item => item.id === itemId);

        return (
            item &&
            item.userRating &&
            item.userRating.userRating !== 0 &&
            item.userRating.userRating !== -1
        );
    }

    /**
     * Hide rated items
     * @private
     */
    function _hideUserRatedItems() {
        [...document.querySelectorAll('.title-card')].forEach((card) => {
            const link = card.querySelector('a').getAttribute('href');
            const itemId = link.substring(
                link.lastIndexOf('/') + 1,
                link.lastIndexOf('?')
            );

            card.parentNode.style.opacity = _isItemRated(parseInt(itemId)) ?  '0.1' : '1';
            card.parentNode.style.transition = 'opacity 0.3s ease-in-out';
        })
    }

    init();
})();
