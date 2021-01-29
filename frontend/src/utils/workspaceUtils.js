export const dndDataObject = (names, stories, order) => {
    const newState = { stories: {}, columns: {}, columnOrder: [] }

    if (names && stories && order) {
        Object.keys(names).forEach(el => {
            newState.columns[el] = {
                id: el,
                name: names[el],
                storyIds: [],
            }
        })

        Object.keys(stories).forEach(el => {
            newState.stories[el.toString()] = stories[el]
            newState.columns[stories[el].workflowStatusId].storyIds.splice(stories[el].priority - 1, 0, el)
        })
        Object.keys(order).forEach(el => {
            newState.columnOrder[el - 1] = order[el]
        })
    }
    return newState

}

