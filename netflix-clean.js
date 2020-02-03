(function() {
    /**
     * Hide items at init and on scroll
     */
    function init () {
        window.addEventListener('scroll', _hideUserRatedItems)
        _hideUserRatedItems()
    }

    /**
     * Hide rated items
     * @private
     */
    function _hideUserRatedItems() {
        [...document.querySelectorAll('.title-card')].forEach((card) => {
            const link = card.querySelector('a').getAttribute('href')
            const itemId = link.substring(
                link.lastIndexOf('/') + 1,
                link.lastIndexOf('?')
            )

            const videos = window.netflix.reactContext.pathEvaluator._root.cache.videos
            if (videos[itemId] && videos[itemId].userRating.value.userRating !== 0) {
                card.parentNode.parentNode.style.opacity = '0.1'
            }
        })
    }

    init()
})()
