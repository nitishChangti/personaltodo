import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
export const fetchAllUsersAdmin = createAsyncThunk(
  "users/fetchAllUsersAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authService.getAllUsersAdmin();
      console.log(res);
      return res.data; // assuming ApiResponse format
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Fetch users failed"
      );
    }
  }
);
export const updateUserAdmin = createAsyncThunk(
  "users/updateUserAdmin",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await userService.updateUserAdmin(id, data);
      return res;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Update failed"
      );
    }
  }
);
export const deleteUserAdmin = createAsyncThunk(
  "users/deleteUserAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await authService.deleteUserAdmin(id);
      console.log('delete');
      return id; // return deleted id
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Delete failed"
      );
    }
  }
);
const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsersAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsersAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchAllUsersAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserAdmin.fulfilled, (state, action) => {
  const index = state.list.findIndex(
    (u) => u._id === action.payload._id
  );
  if (index !== -1) {
    state.list[index] = action.payload;
  }
})

.addCase(deleteUserAdmin.fulfilled, (state, action) => {
  state.list = state.list.filter(
    (user) => user._id !== action.payload
  );
});
  },
});

export default userSlice.reducer;