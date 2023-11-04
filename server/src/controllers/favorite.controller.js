import responseHandler from "../handlers/response.handler.js";
import favoriteModel from "../models/favorite.model.js";
import viewModel from "../models/view.model.js";
import playlistModel from "../models/playlist.model.js";

const addFavorite = async (req, res) => {
  try {
    const isFavorite = await favoriteModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });
    if (isFavorite) {
      return responseHandler.ok(res, isFavorite);
    }

    const favorite = new favoriteModel({
      ...req.body,
      user: req.user.id,
    });
    await favorite.save();
    responseHandler.created(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { favoriteId } = req.params;

    const favorite = await favoriteModel.findOne({
      user: req.user.id,
      _id: favoriteId,
    });

    if (!favorite) return responseHandler.notfound(res);
    await favorite.remove();

    responseHandler.ok(res);
  } catch (e) {
    responseHandler.error(res);
  }
};

const getFavorites = async (req, res) => {
  try {
    const favorite = await favoriteModel
      .find({ user: req.user.id })
      .sort("-createdAt");
    responseHandler.ok(res, favorite);
  } catch {
    responseHandler.error(res);
  }
};

const addView = async (req, res) => {
  try {
    const isView = await viewModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });
    if (isView) {
      return responseHandler.ok(res, isView);
    }

    const view = new viewModel({
      ...req.body,
      user: req.user.id,
    });
    await view.save();
    responseHandler.created(res, view);
  } catch {
    responseHandler.error(res);
  }
};

const removeView = async (req, res) => {
  try {
    const { viewId } = req.params;

    const view = await viewModel.findOne({
      user: req.user.id,
      _id: viewId,
    });

    if (!view) return responseHandler.notfound(res);
    await view.remove();

    responseHandler.ok(res);
  } catch (e) {
    responseHandler.error(res);
  }
};

const getView = async (req, res) => {
  try {
    const view = await viewModel.find({ user: req.user.id }).sort("-createdAt");
    responseHandler.ok(res, view);
  } catch {
    responseHandler.error(res);
  }
};

const addPlaylist = async (req, res) => {
  try {
    const isPlaylist = await playlistModel.findOne({
      user: req.user.id,
      mediaId: req.body.mediaId,
    });
    if (isPlaylist) {
      return responseHandler.ok(res, isPlaylist);
    }

    const playlist = new playlistModel({
      ...req.body,
      user: req.user.id,
    });
    await playlist.save();
    responseHandler.created(res, playlist);
  } catch {
    responseHandler.error(res);
  }
};

const removePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const playlist = await playlistModel.findOne({
      user: req.user.id,
      _id: playlistId,
    });

    if (!playlist) return responseHandler.notfound(res);
    await playlist.remove();

    responseHandler.ok(res);
  } catch (e) {
    responseHandler.error(res);
  }
};

const getPlaylist = async (req, res) => {
  try {
    const playlist = await playlistModel
      .find({ user: req.user.id })
      .sort("-createdAt");
    responseHandler.ok(res, playlist);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  addFavorite,
  removeFavorite,
  getFavorites,
  addView,
  removeView,
  getView,
  addPlaylist,
  removePlaylist,
  getPlaylist,
};
