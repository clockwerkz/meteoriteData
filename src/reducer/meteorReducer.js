
const meteorReducer = (state, action) => {
    const { pagePosition, pageSize } = state;
    switch (action.type) {
        case 'POPULATE_DATA':
            return {
                ...state,
                data: action.payload,
                defaultData: action.payload,
                dataSlice: action.payload.slice(state.pagePosition, state.pagePosition+state.pageSize)
            }
        case 'NEXT_PAGE':
            if (pagePosition+pageSize<state.defaultData.length) {
                const newPage = pagePosition + pageSize;
                return {
                    ...state,
                    pagePosition: newPage,
                    dataSlice: state.defaultData.slice(newPage, newPage+pageSize)
                }
            }
            return state;
        case 'PREV_PAGE':
            if (pagePosition-pageSize>=0) {
                const newPage = pagePosition - pageSize;
                return {
                    ...state,
                    pagePosition: newPage,
                    dataSlice: state.defaultData.slice(newPage, newPage+pageSize)
                }
            }
            return state;
        case 'UPDATE_SEARCH_STRING':
            const searchString = action.payload;
            const defaultData = state.data.filter(meteor => meteor.name.toLowerCase().includes(searchString));
            return {
                ...state,
                defaultData,
                dataSlice: state.defaultData.slice(pagePosition,pagePosition+pageSize),
                searchString
            }
        default:
            return state;
    }
}

export default meteorReducer;