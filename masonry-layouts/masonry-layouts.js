

export function createChunks(data = [], columns = 3) {
  const result = []

  for (let idx = 0; idx < data.length; idx += columns) {
    const slice = data.slice(idx, idx + columns)
    result.push(slice)
  }

  return result
}

export function createDataColumns(data = [], columns = 3) {
  const result = Array.from({ length: columns }, () => [])

  for (let idx = 0; idx < columns; idx++) {
    for (let jdx = 0; jdx < data.length; jdx += 1) {
      if (data[jdx][idx]) {
        result[idx].push(data[jdx][idx])
      }
    }
  }

  return result
}

export function useMediaValues(medias, columns, gap) {
  let values = { columns: 1, gap: 1 }

  if (!medias) {
    values = { columns: columns[0], gap: gap[0] }
  } 

  return values
}

export function createSafeArray(data) {
  return Array.isArray(data) ? data : [data]
}


export function Masonry({ items = [], render, config, ...rest }) {
  const { columns, gap } = useMediaValues(
    config.media,
    createSafeArray(config.columns),
    createSafeArray(config.gap)
  )


  const chunks = createChunks(items, columns)
  const dataColumns = createDataColumns(chunks, columns)

  console.log('[masonry-layouts]', { items, chunks, dataColumns})

  return `
    <div
      style="
        display: grid;
        align-items: start;
        grid-column-gap: ${gap}px;
        grid-template-columns: repeat(${columns}, minmax(0, 1fr))
      "
    >
      ${
        dataColumns.map((column, idx) => {
          return `
              <div
                style="
                  display: grid;
                  grid-row-gap: ${gap}px;
                  grid-template-columns: minmax(0, 1fr)
                "
              >
                ${
                  column.map((item, idx) => {
                    return render(item, idx)
                  }).join('')
                }
              </div>
          `
        }).join('')
      }
    </div> 
  `
}
