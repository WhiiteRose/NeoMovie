import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorderOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import QueueIcon from '@mui/icons-material/Queue';
import QueueOutlinedIcon from '@mui/icons-material/QueueOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { LoadingButton } from '@mui/lab';
import {Box, Button, Chip, Divider, Stack, Typography} from '@mui/material';
import {useEffect, useState, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import CircularRate from '../components/common/CircularRate';
import Container from '../components/common/Container';
import ImageHeader from '../components/common/ImageHeader';
import uiConfigs from '../configs/ui.configs';
import tmdbConfigs from '../api/configs/tmdb.configs';
import mediaApi from '../api/modules/media.api';
import favoriteApi from '../api/modules/favorite.api';
import {setGlobalLoading} from '../redux/features/globalLoadingSlice';
import {setAuthModalOpen} from '../redux/features/authModalSlice';
import { addFavorite, addPlaylist, addView, removeFavorite, removePlaylist, removeView } from '../redux/features/userSlice';
import CastSlide from '../components/common/CastSlide';
import MediaVideosSlide from '../components/common/MediaVideoSlide';
import PosterSlide from '../components/common/PosterSlide';
import RecommendSlide from '../components/common/RecommendSlide';
import MediaSlide from '../components/common/MediaSlide';
import BackdropSlide from '../components/common/BackdropSlide';
import MediaReview from '../components/common/MediaReview';
import viewsApi from '../api/modules/view.api';
import playlistsApi from '../api/modules/playlist.api';


const MediaDetail = () => {
  const { mediaType, mediaId } = useParams();

  const { user, listFavorites, listViews, listPlaylist } = useSelector((state) => state.user);

  const [media, setMedia] = useState();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isView, setIsView] = useState(false);
  const [isPlaylist, setIsPlaylist] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);

  const dispatch = useDispatch();

  const videoRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const getMedia = async () => {
      dispatch(setGlobalLoading(true));
      const { response, err } = await mediaApi.getDetail({ mediaType, mediaId });
      dispatch(setGlobalLoading(false));

      if (response) {
        setMedia(response);
        setIsFavorite(response.isFavorite);
        setIsView(response.isView);
        setIsPlaylist(response.isPlaylist);
        setGenres(response.genres.splice(0, 2));
      }
      if (err) toast.error(err.message);
    };

    getMedia();
  }, [mediaType, mediaId, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isFavorite) {
      onRemoveFavorite();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average
    };

    const { response, err } = await favoriteApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Add favorite success");
    }
    };

    const onRemoveFavorite = async () => {
        if (onRequest) return;
        setOnRequest(true);

        const favorite = listFavorites.find(e => e.mediaId.toString() === media.id.toString());

        const { response, err } = await favoriteApi.remove({ favoriteId: favorite.id });

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
        dispatch(removeFavorite(favorite));
        setIsFavorite(false);
        toast.success("Remove favorite success");
        }
  };

  const onViewClick = async () => {
    if (!user) return dispatch(setAuthModalOpen(true));

    if (onRequest) return;

    if (isView) {
      onRemoveView();
      return;
    }

    setOnRequest(true);

    const body = {
      mediaId: media.id,
      mediaTitle: media.title || media.name,
      mediaType: mediaType,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average
    };

    const { response, err } = await viewsApi.add(body);

    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addView(response));
      setIsView(true);
      toast.success("Add view success");
    }
    };

    const onRemoveView = async () => {
        if (onRequest) return;
        setOnRequest(true);

        const views = listViews.find(e => e.mediaId.toString() === media.id.toString());

        const { response, err } = await viewsApi.remove({ viewsId: views.id });

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
        dispatch(removeView(views));
        setIsView(false);
        toast.success("Remove view success");
        }
    };

    const onPlaylistClick = async () => {
        if (!user) return dispatch(setAuthModalOpen(true));

        if (onRequest) return;

        if (isPlaylist) {
            onRemovePlaylist();
            return;
        }

        setOnRequest(true);

        const body = {
            mediaId: media.id,
            mediaTitle: media.title || media.name,
            mediaType: mediaType,
            mediaPoster: media.poster_path,
            mediaRate: media.vote_average
        };
        const { response, err } = await playlistsApi.add(body);

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
            dispatch(addPlaylist(response));
            setIsPlaylist(true);
            toast.success("Add to playlist success");
        }
        };

    const onRemovePlaylist = async () => {
        if (onRequest) return;
        setOnRequest(true);

        const playlist = listPlaylist.find(e => e.mediaId.toString() === media.id.toString());

        const { response, err } = await playlistsApi.remove({ playlistId: playlist.id });

        setOnRequest(false);

        if (err) toast.error(err.message);
        if (response) {
        dispatch(removePlaylist(playlist));
        setIsPlaylist(false);
        toast.success("Remove playlist success");
        }
    };


    return (
        media ? (
        <>
            <ImageHeader imagePath={tmdbConfigs.backdropPath(media.backdrop_path || media.poster_path)} />
            <Box sx={{
                color:"primary.contrastText",
                ...uiConfigs.style.mainContent
            }}>
                <Box sx={{
                    marginTop: {xs: "-10rem", md: "-15rem", lg: "-20rem"},
                }}>
                    <Box sx={{
                        display: "flex",
                        flexDirection: {xs: "column", md: "row"},
                    }}>
                        <Box sx={{
                            width: {xs: "70%", sm: "50%", md: "40%"},
                            margin: {xs: "0 auto 2rem", md: "0 2rem 0 0"},
                        }}>
                            <Box sx={{
                                paddingTop: "140%",
                                ...uiConfigs.style.backgroundImage(tmdbConfigs.posterPath(media.poster_path || media.backdrop_path))
                            }} />
                        </Box>
                        <Box sx={{
                            width: {xs: "100%", md: "60%"},
                            color: "text.primary",
                        }}>
                            <Stack spacing={5}>
                                <Typography
                                    variant="h4"
                                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                                    fontWeight="700"
                                    sx={{ ...uiConfigs.style.typoLines(2, "left") }}
                                >
                                    {`${media.title || media.name} ${mediaType === tmdbConfigs.mediaType.movie ? media.release_date.split("-")[0] : media.first_air_date.split("-")[0]}`}
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <CircularRate value={media.vote_average} />
                                    <Divider orientation="vertical">
                                        {genres.map((genre, index) => (
                                            <Chip key={index} label={genre.name}
                                                variant="filled" 
                                                color="primary"
                                                />
                                        ))}
                                    </Divider>
                                </Stack>
                                <Typography
                                    variant="body1"
                                    sx={{...uiConfigs.style.typoLines(5),}}
                                >
                                    {media.overview}
                                </Typography>
                                <Stack direction="row" spacing={2}>
                                    <LoadingButton 
                                        variant="text"
                                        sx={{
                                            width: "max-content",
                                            "& .MuiButton-startIcon": { marginRight: "0" }
                                        }}
                                        size="large"
                                        startIcon={isFavorite ? <FavoriteIcon /> : <FavoriteBorderOutlined />}
                                        loadingPosition="start"
                                        loading={onRequest}
                                        onClick={onFavoriteClick}
                                    />
                                    <LoadingButton 
                                        variant="text"
                                        sx={{
                                            width: "max-content",
                                            "& .MuiButton-startIcon": { marginRight: "0" }
                                        }}
                                        size="large"
                                        startIcon={isView ? <VisibilityIcon /> : <VisibilityOutlinedIcon />}
                                        loadingPosition="start"
                                        loading={onRequest}
                                        onClick={onViewClick}
                                    />
                                    <LoadingButton 
                                        variant="text"
                                        sx={{
                                            width: "max-content",
                                            "& .MuiButton-startIcon": { marginRight: "0" }
                                        }}
                                        size="large"
                                        startIcon={isPlaylist ? <QueueIcon /> : <QueueOutlinedIcon />}
                                        loadingPosition="start"
                                        loading={onRequest}
                                        onClick={onPlaylistClick}
                                    />
                                    <Button
                                        variant="contained"
                                        sx={{width: "max-content"}}
                                        size="large"
                                        startIcon={<PlayArrowIcon />}
                                        onClick={() => videoRef.current.scrollIntoView()}
                                    >
                                        watch now
                                    </Button>
                                </Stack>
                                <Container header="Cast">
                                    <CastSlide casts={media.credits.cast} />
                                </Container>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
                <div ref={videoRef} style={{ paddingTop: "2rem" }}>
                    <Container header="Videos">
                        <MediaVideosSlide videos={[...media.videos.results].splice(0, 5)} />
                    </Container>
                </div>
                {media.images.backdrops.length > 0 && (
                    <Container header="backdrops">
                        <BackdropSlide backdrops={media.images.backdrops} />
                    </Container>
                 )}
                 {media.images.posters.length > 0 && (
                    <Container header="posters">
                        <PosterSlide posters={media.images.posters} />
                    </Container>
                )}

                <MediaReview reviews={media.reviews} media={media} mediaType={mediaType} />

                <Container header="you may also like">
                    {media.recommend.length > 0 && (
                        <RecommendSlide medias={media.recommend} mediaType={mediaType}/> 
                    )}
                    {media.recommend.length === 0 && (
                        <MediaSlide 
                            mediaType={mediaType}
                            mediaCategory={tmdbConfigs.mediaCategory.top_rate}
                        />    
                    )}
                </Container>
            </Box>
        </>
        ) : null
    );
}

export default MediaDetail;