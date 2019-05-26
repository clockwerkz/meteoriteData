
const meteorReducer = (state, action) => {
    const { pagePosition, pageSize, defaultData } = state;
    switch (action.type) {
        case 'POPULATE_DATA':
            return {
                ...state,
                data: action.payload,
                defaultData: action.payload,
                dataSlice: action.payload.slice(state.pagePosition, state.pagePosition+state.pageSize)
            }
        case 'NEXT_PAGE':
            if (pagePosition+pageSize<defaultData.length) {
                const newPage = pagePosition + pageSize;
                return {
                    ...state,
                    pagePosition: newPage,
                    dataSlice: defaultData.slice(newPage, newPage+pageSize)
                }
            }
            return state;
        case 'PREV_PAGE':
            if (pagePosition-pageSize>=0) {
                const newPage = pagePosition - pageSize;
                return {
                    ...state,
                    pagePosition: newPage,
                    dataSlice: defaultData.slice(newPage, newPage+pageSize)
                }
            }
            return state;
        default:
            return state;
    }
}

export default meteorReducer;