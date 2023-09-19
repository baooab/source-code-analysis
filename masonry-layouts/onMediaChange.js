export function onMediaChange({ media: medias, columns, gap }, callback) {
    const mediaQueries = medias.map(media =>
      window.matchMedia(`(min-width: ${media}px)`)
    )

    const onSizeChange = () => {
      let matches = 0

      mediaQueries.forEach(mediaQuery => {
        if (mediaQuery.matches) {
          matches++
        }
      })

      const idx = Math.max(matches - 1, 0)

      // Update Values
      // console.log('[onSizeChange]', { matches, idx, matcheMedia: medias[idx] })

      callback({ columns: columns[idx], gap: gap[idx] })
    }

    // Initial Call
    onSizeChange()

    // Apply Listeners
    for (const mediaQuery of mediaQueries) {
      mediaQuery.addEventListener("change", onSizeChange)
    }
}

