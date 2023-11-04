import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    user: null,
    listFavorites: [],
    listViews: [],
    listPlaylist: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token) {
          localStorage.setItem("actkn", action.payload.token);
        }
      }
      state.user = action.payload;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;
      state.listFavorites = [...state.listFavorites].filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
    setListViews: (state, action) => {
      state.listViews = action.payload;
    },
    removeView: (state, action) => {
      const { mediaId } = action.payload;
      state.listViews = [...state.listViews].filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },
    addView: (state, action) => {
      state.listViews = [action.payload, ...state.listViews];
    },
    setListPlaylist: (state, action) => {
      state.listPlaylist = action.payload;
    },
    removePlaylist: (state, action) => {
      const { mediaId } = action.payload;
      state.listPlaylist = [...state.listPlaylist].filter(
        (e) => e.mediaId.toString() !== mediaId.toString()
      );
    },
    addPlaylist: (state, action) => {
      state.listPlaylist = [action.payload, ...state.listPlaylist];
    },
  },
});

export const {
  setUser,
  setListFavorites,
  addFavorite,
  removeFavorite,
  setListViews,
  removeView,
  addView,
  setListPlaylist,
  removePlaylist,
  addPlaylist,
} = userSlice.actions;

export default userSlice.reducer;
