import {Box, Stack, Typography, useTheme} from "@mui/material"
import Topbar from "../components/common/Topbar.jsx";
import uiConfigs from "../configs/ui.configs.js";
import tmdbConfigs from "../api/configs/tmdb.configs";
import { useEffect, useState } from "react";
import mediaApi from "../api/modules/media.api.js";
import {setGlobalLoading} from "../redux/features/globalLoadingSlice";
import { useDispatch } from "react-redux";
import AuthModal from "../components/common/AuthModal.jsx";
import Footer from "../components/common/Footer.jsx";
import { toast } from "react-toastify";

const PresentationPage = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [movies, setMovies] = useState([]);
    const [randomNumber, setRandomNumber] = useState(null);

    useEffect(() => {
        const getMedias = async () => {
            const {response, err} = await mediaApi.getList({
                mediaType: "movie", 
                mediaCategory: "popular", 
                page: 1
            });
            if (response) {
                setMovies(response.results);
                const randomNum = Math.floor(Math.random() * (10 - 0 + 1));
                setRandomNumber(randomNum);
            }
            if (err) toast.error(err.message);
            dispatch(setGlobalLoading(false));
        };
        getMedias();
    }, [dispatch])

    return (
        <>
            <AuthModal/>
            <Topbar />
            <Box sx={{
            position: "relative",
            color: "primary.contrastText",
            "&::before": {
                content: "''",
                width: "100%",
                height: "30%",
                position: "absolute",
                bottom: 0,
                left: 0,
                zIndex: 2,
                pointerEvents: "none",
                ...uiConfigs.style.gradientBgImage[theme.palette.mode]
            }
        }}>
                        <Box sx={{
                            paddingTop: {
                                xs: "130%",
                                sm: "80%",
                                md: "60%",
                                lg: "45%"
                            },
                            backgroundPosition: "top",
                            backgroundSize: "cover",
                            backgroundImage: `url(${tmdbConfigs.backdropPath(movies[randomNumber]?.backdrop_path)})`,
                        }}/>
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            ...uiConfigs.style.horizontalGradientBgImage[theme.palette.mode]
                        }}/>
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            paddingX: {sm: "10px", md: "5rem", lg: "10rem"},
                        }}>
                            <Box sx={{
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                paddingX: "30px",
                                color: "text.primary",
                                width: {sm: "unset", md: "50%", lg: "80%"}
                            }}>
                                <Stack spacing={1} direction="column">
                                   
                                <Typography variant="h1"  
                                    fontSize={{ xs: "2rem", md: "3rem", lg: "6rem"}}
                                    fontWeight="700"
                                    sx={{...uiConfigs.style.typoLines(2, "left")}}
                                >
                                    Welcome to <span style={{color: theme.palette.primary.main}}>Neo</span>Movie
                                </Typography>
                                <Stack spacing={4} >

                                <Typography variant="body1"
                                fontSize={{xs: "1rem", md: "1rem", lg: "2rem"}}
                                sx={{...uiConfigs.style.typoLines(2, "left")}}
                                >
                                    NeoMovie is your ultimate destination to discover the latest movies
                                    and TV series. Our platform offers you an extensive collection of
                                    entertainment content, from the latest blockbusters to exclusive
                                    original series.
                                </Typography>
                                </Stack>
                            </Stack>
                        </Box>    
                    </Box>
                    
            </Box>
            <Stack direction="row" sx={{
                gap: '10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0',
                height: '500px',
            }}>
                <Box sx={{gap: '5px'}}>
                    <Typography
                        variant="h2"
                        fontSize={{ xs: "2rem", md: "2rem", lg: "4rem"}}
                        fontWeight="700"
                    >
                        The Latest <span style={{color: theme.palette.primary.main}}>Movies</span>
                    </Typography>
                    <Typography 
                        variant="body1"
                        fontSize={"1.5rem"}
                    >
                    Stay updated on the latest and most popular movies, with a review, images, cast and a trailer.
                    </Typography>

                </Box>
                
                <Box>
                    <img src="./tv.png" alt="tv"></img>
                </Box>
            </Stack>
            <Stack direction="row" sx={{
                gap: '10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0',
                height: '500px',
            }}>
                <Box>
                    <img src="./device-pile.png" alt="tv"></img>
                </Box>
                <Box sx={{gap: '5px'}}>
                    <Typography
                        variant="h2"
                        fontSize={{ xs: "2rem", md: "2rem", lg: "4rem"}}
                        fontWeight="700"
                    >
                        The Latest <span style={{color: theme.palette.primary.main}}>Series</span>
                    </Typography>
                    <Typography 
                        variant="body1"
                        fontSize={"1.5rem"}
                    >
                    Stay updated on the latest and most popular series, with a review, images, cast and a trailer.
                    </Typography>

                </Box>
                
            </Stack>
            <Stack direction="row" sx={{
                gap: '10%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: '1px solid #e0e0e0',
                height: '500px',
            }}>
                <Box sx={{gap: '5px'}}>
                    <Typography
                        variant="h2"
                        fontSize={{ xs: "2rem", md: "2rem", lg: "4rem"}}
                        fontWeight="700"
                    >
                        Your <span style={{color: theme.palette.primary.main}}>Account</span>
                    </Typography>
                    <Typography 
                        variant="body1"
                        fontSize={"1.5rem"}
                    >
                        Create your personal account to access your favorite media, leave comments, and much more.
                    </Typography>
                </Box>
                <Box>
                    <img src="./mobile.jpg" alt="tv"></img>
                </Box>
            </Stack>
            <Footer />

        </>
  )
}

export default PresentationPage;