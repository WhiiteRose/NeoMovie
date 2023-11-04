import privateClient from "../client/private.client.js";

const viewsEndpoints = {
  list: "user/views",
  add: "user/views",
  remove: ({ viewsId }) => `user/views/${viewsId}`,
};

const viewsApi = {
  getList: async () => {
    try {
      const response = await privateClient.get(viewsEndpoints.list);

      return { response };
    } catch (err) {
      return { err };
    }
  },
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }) => {
    try {
      const response = await privateClient.post(viewsEndpoints.add, {
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
  remove: async ({ viewsId }) => {
    try {
      const response = await privateClient.delete(
        viewsEndpoints.remove({ viewsId })
      );

      return { response };
    } catch (err) {
      return { err };
    }
  },
};

export default viewsApi;
