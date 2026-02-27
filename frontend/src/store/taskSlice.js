import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taskService from "../service/task.service";
export const updateTaskAdmin = createAsyncThunk(
  "tasks/updateTaskAdmin",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await taskService.updateTaskAdmin(id, data);
      return res.data;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Update failed"
      );
    }
  }
);

export const deleteTaskAdmin = createAsyncThunk(
  "tasks/deleteTaskAdmin",
  async (id, { rejectWithValue }) => {
    try {
      await taskService.deleteTaskAdmin(id);
      return id;
    } catch (e) {
      return rejectWithValue(
        e.response?.data?.message || "Delete failed"
      );
    }
  }
);
// Create
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await taskService.createTask(payload);
      console.log(res);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Create failed");
    }
  }
);
export const fetchAllTasksAdmin = createAsyncThunk(
  "tasks/fetchAllTasksAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const res = await taskService.getAllTasksAdmin();
      console.log(res.data);
      return res.data;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Fetch failed");
    }
  }
);
// Fetch
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const res = await taskService.getAllTasks();
      console.log(res);
      return res.data; // ✅ correct shape
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Fetch failed");
    }
  }
);

// Update
// src/store/taskSlice.js
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await taskService.updateTask(id, data);
      console.log(res);
      return res.data; // ✅ matches backend { task }
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Update failed");
    }
  }
);
// Delete
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { rejectWithValue }) => {
    try {
      await taskService.deleteTask(id);
      console.log('delete task');
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Delete failed");
    }
  }
);

// Toggle Important
export const toggleImportant = createAsyncThunk(
  "tasks/toggleImportant",
  async (id, { rejectWithValue }) => {
    try {
      const res = await taskService.toggleImportant(id);
      return res.task;
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Toggle failed");
    }
  }
);

// Move Status
// Move Status
export const moveTaskStatus = createAsyncThunk(
  "tasks/moveTaskStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const apiStatus =
        status === "todo"
          ? "Todo"
          : status === "progress"
          ? "In Progress"
          : "Completed";

      const res = await taskService.moveTaskStatus(id, apiStatus);
      return res.task; // ✅
    } catch (e) {
      return rejectWithValue(e.response?.data?.message || "Move failed");
    }
  }
);

const taskSlice = createSlice({
  name: "tasks",
  initialState: { list: [], loading: false, error: null },
  reducers: {
    clearTaskError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
  builder
    // ================= USER FETCH =================
    .addCase(fetchTasks.pending, (s) => {
      s.loading = true;
    })
    .addCase(fetchTasks.fulfilled, (s, a) => {
      s.loading = false;
      s.list = Array.isArray(a.payload)
        ? a.payload
        : [];
        console.log(a.payload);
    })
    .addCase(fetchTasks.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload;
    })

    // ================= ADMIN FETCH =================
    .addCase(fetchAllTasksAdmin.pending, (s) => {
      s.loading = true;
    })
   .addCase(fetchAllTasksAdmin.fulfilled, (s, a) => {
  s.loading = false;
  s.list = Array.isArray(a.payload)
    ? a.payload
    : [];
})
    .addCase(fetchAllTasksAdmin.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload;
    })

    // ================= CREATE =================
    .addCase(createTask.fulfilled, (s, a) => {
      s.list.unshift(a.payload);
    })

    // ================= UPDATE =================
    .addCase(updateTask.fulfilled, (s, a) => {
      const i = s.list.findIndex((t) => t._id === a.payload._id);
      if (i !== -1) s.list[i] = a.payload;
    })

    // ================= DELETE =================
    .addCase(deleteTask.fulfilled, (s, a) => {
      s.list = s.list.filter((t) => t._id !== a.payload);
    })

    // ================= IMPORTANT =================
    .addCase(toggleImportant.fulfilled, (state, action) => {
  const index = state.list.findIndex(
    (task) => task._id === action.payload._id
  );

  if (index !== -1) {
    state.list[index] = action.payload;
  }
})

    // ================= MOVE STATUS =================
    .addCase(moveTaskStatus.fulfilled, (s, a) => {
      const i = s.list.findIndex((t) => t._id === a.payload._id);
      if (i !== -1) s.list[i] = a.payload;
    })
    .addCase(updateTaskAdmin.fulfilled, (state, action) => {
  const index = state.list.findIndex(
    (task) => task._id === action.payload._id
  );
  if (index !== -1) {
    state.list[index] = action.payload;
  }
})

.addCase(deleteTaskAdmin.fulfilled, (state, action) => {
  state.list = state.list.filter(
    (task) => task._id !== action.payload
  );
});
}
});

export const { clearTaskError } = taskSlice.actions;
export default taskSlice.reducer;