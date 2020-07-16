;(function () {
    let scrollTimer

    /**
     * Hide items at init and on scroll
     */
    function init() {
        _hideUserRatedItems()

        window.addEventListener('scroll', function () {
            window.clearTimeout(scrollTimer)
            scrollTimer = setTimeout(_hideUserRatedItems, 500)
        })
    }

    /**
     * Check if item is rated (positive or negative)
     * @param itemId
     * @returns {*|boolean}
     * @private
     */
    function _isItemRated(video) {
        return (
            video &&
            video.userRating &&
            video.userRating.value &&
            video.userRating.value.userRating !== 0
        )
    }

    /**
     * Hide rated items
     * @private
     */
    function _hideUserRatedItems() {
        const videos =
            window.netflix.reactContext.pathEvaluator._root.cache.videos

        document.querySelectorAll('.title-card').forEach((card) => {
            if (card.querySelector('a')) {
                const link = card.querySelector('a').getAttribute('href')
                const itemId = link.substring(
                    link.lastIndexOf('/') + 1,
                    link.lastIndexOf('?')
                )

                if (_isItemRated(videos[itemId])) {
                    card.style.opacity = 0.1
                }
            }
        })
    }

    init()
})()
