(function() {
    let scrollTimer

    /**
     * Hide items at init and on scroll
     */
    function init () {
        _hideUserRatedItems();

        window.addEventListener('scroll', function () {
            window.clearTimeout( scrollTimer );
            scrollTimer = setTimeout(_hideUserRatedItems, 500);
        });
    }

    /**
     * Check if item is rated (positive or negative)
     * @param itemId
     * @returns {*|boolean}
     * @private
     */
    function _isItemRated (itemId) {
        const videos = window.netflix.reactContext.pathEvaluator._root.cache.videos;
        return videos[itemId] && videos[itemId].userRating.value.userRating !== 0;
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

            card.parentNode.style.opacity = _isItemRated(itemId) ?  '0.1' : '1';
        })
    }

    init();
})();
