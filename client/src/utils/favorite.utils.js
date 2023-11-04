const favoriteUtils = {
  check: ({ listFavorites, mediaId }) =>
    listFavorites &&
    listFavorites.find((e) => e.mediaId.toString() === mediaId.toString()) !==
      undefined,

  checkView: ({ listViews, mediaId }) =>
    listViews &&
    listViews.find((e) => e.mediaId.toString() === mediaId.toString()) !==
      undefined,

  checkPlaylist: ({ listPlaylists, mediaId }) =>
    listPlaylists &&
    listPlaylists.find((e) => e.mediaId.toString() === mediaId.toString()) !==
      undefined,
};

export default favoriteUtils;
