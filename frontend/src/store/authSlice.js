import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../service/auth.service";

// ---------------- THUNKS ----------------
// export const fetchAllUsersAdmin = createAsyncThunk(
//   "users/fetchAllUsersAdmin",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await userService.getAllUsersAdmin();
      
//       // If backend returns ApiResponse format
//       return res.data; 
//       // If backend returns array directly,
//       // then use: return res;

//     } catch (e) {
//       return rejectWithValue(
//         e.response?.data?.message || "Fetch users failed"
//       );
//     }
//   }
// );
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authService.register(payload);
      return res.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await authService.login(payload);
      console.log(res.data.user);
      return res.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      return true;
    } catch {
      return rejectWithValue("Logout failed");
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const res = await authService.getCurrentUser();
      return res.user;
    } catch {
      return rejectWithValue("Session expired");
    }
  }
);

// ---------------- SLICE ----------------

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true, // start with loading=true to trigger session check on app load
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //  .addCase(fetchAllUsersAdmin.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(fetchAllUsersAdmin.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.list = Array.isArray(action.payload)
      //     ? action.payload
      //     : [];
      // })
      // .addCase(fetchAllUsersAdmin.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // })
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // get current user
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;