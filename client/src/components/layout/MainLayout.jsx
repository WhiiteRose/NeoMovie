import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import GlobalLoading from '../common/GlobalLoading';
import Footer from '../common/Footer';
import Topbar from '../common/Topbar';
import AuthModal from '../common/AuthModal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import userApi from '../../api/modules/user.api';
import favoriteApi from '../../api/modules/favorite.api';
import viewsApi from '../../api/modules/view.api';
import playlistsApi from '../../api/modules/playlist.api';
import {
  setListFavorites,
  setListViews,
  setListPlaylist,
  setUser,
} from '../../redux/features/userSlice';

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();

      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getUserLists = async () => {
      const [favRes, viewRes, playRes] = await Promise.all([
        favoriteApi.getList(),
        viewsApi.getList(),
        playlistsApi.getList(),
      ]);

      if (favRes.response)
        dispatch(setListFavorites(favRes.response));
      if (favRes.err) toast.error(favRes.err.message);

      if (viewRes.response) dispatch(setListViews(viewRes.response));
      if (viewRes.err) toast.error(viewRes.err.message);

      if (playRes.response)
        dispatch(setListPlaylist(playRes.response));
      if (playRes.err) toast.error(playRes.err.message);
    };

    if (user) {
      getUserLists();
    } else {
      dispatch(setListFavorites([]));
      dispatch(setListViews([]));
      dispatch(setListPlaylist([]));
    }
  }, [user, dispatch]);

  return (
    <>
      <GlobalLoading />
      <AuthModal />
      <Box
        display="flex"
        minHeight="100vh"
      >
        <Topbar />
        <Box
          component="main"
          flexGrow={1}
          overflow="hidden"
          minHeight="100vh"
        >
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
