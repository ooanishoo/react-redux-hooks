function giffReducer(state, { type, payload }) {
  switch (type) {
    case "load_giff":
      console.log({ payload });
      return {
        ...state,
        giffs: payload,
      };

    case "search_start":
      return {
        ...state,
        isLoading: true,
      };
    case "search_complete":
      return {
        ...state,
        giffs: payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

export default giffReducer;