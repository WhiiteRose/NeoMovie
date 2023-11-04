import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

const personDetail = async (req, res) => {
  try {
    const { personId } = req.params;

    const persone = await tmdbApi.personDetail({ personId });

    responseHandler.ok(res, persone);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

const personMedias = async (req, res) => {
  try {
    const { personId } = req.params;

    const medias = await tmdbApi.personMedias({ personId });
    responseHandler.ok(res, medias);
  } catch (e) {
    console.log(e);
    responseHandler.error(res);
  }
};

export default { personDetail, personMedias };
