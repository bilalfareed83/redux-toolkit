import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchNumber = createAsyncThunk(
  "number/fetchNumber",
  async (data, thunkApi) => {
    console.log("hit async func");
    const response = await fetch("/api/number");
    return await response.json();
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    isLoading: false,
  },
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: {
    [fetchNumber.fulfilled]: (state, action) => {
      console.log(state, action);
      state.value += action.payload;
      state.isLoading = false;
    },
    [fetchNumber.rejected]: (state, action) => {
      console.log("api rejected");
      state.isLoading = false;
    },
    [fetchNumber.pending]: (state, action) => {
      console.log("api pending");
      state.isLoading = true;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => ({
  value: state.counter.value,
  isLoading: state.counter.isLoading,
});

export default counterSlice.reducer;
