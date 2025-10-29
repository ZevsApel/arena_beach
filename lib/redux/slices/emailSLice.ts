import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface EmailState {
  email: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: EmailState = {
  email: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const checkAuth = createAsyncThunk('dashboard/checkAuth', async (_, { rejectWithValue }) => {
  try {
    const responce = await fetch('/api/auth/dashboard', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await responce.json();

    if (!responce.ok) {
      return rejectWithValue(data.error);
    }
    return data;
  } catch (error) {
    return rejectWithValue('Проверка аторизации не пройдена');
  }
});

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setUserEmail(state, action) {
      state.email = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser(state) {
      state.email = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.isAuthenticated = false;
        state.email = null;
      });
  },
});

export const { setUserEmail, clearUser, setError } = emailSlice.actions;
export default emailSlice.reducer;
