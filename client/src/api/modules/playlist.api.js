import privateClient from "../client/private.client.js";

const playlistsEndpoints = {
  list: "user/playlists",
  add: "user/playlists",
  remove: ({ playlistId }) => `user/playlists/${playlistId}`,
};

const playlistsApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(playlistsEndpoints.list);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(playlistsEndpoints.add, {
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate,
      });

      return { response };
    } catch (err) {
      return { err };
    }
  },
  remove: async ({ playlistId }) => {
    try {
      const response = await privateClient.delete(
        playlistsEndpoints.remove({ playlistId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default playlistsApi;
