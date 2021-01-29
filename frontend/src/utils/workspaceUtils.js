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
            newState.stories[stories[el].id] = stories[el]
            newState.columns[stories[el].workflowStatusId].storyIds.splice(stories[el].priority, 0, stories[el].id.toString())
        })

        Object.keys(stories).forEach(el => {
            newState.columns[stories[el].workflowStatusId].storyIds.splice(stories[el].priority, 1, stories[el].id.toString())
            console.log(newState.columns[stories[el].workflowStatusId].storyIds, stories[el].priority, 'splice')
        })
        Object.keys(order).forEach(el => {
            newState.columnOrder[el - 1] = order[el]
        })
    }
   
    
    return newState

}

