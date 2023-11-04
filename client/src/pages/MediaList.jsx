import { LoadingButton } from "@mui/lab";
import {Box, Button, Stack, Typography} from "@mui/material";
import {useEffect, useState, useMemo} from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import tmdbConfigs from "../api/configs/tmdb.configs";
import mediaApi from "../api/modules/media.api";
import uiConfigs from "../configs/ui.configs";
import HeroSlide from "../components/common/HeroSlide";
import MediaGrid from "../components/common/MediaGrid";
import { setAppState } from "../redux/features/appStateSlice";
import { setGlobalLoading } from "../redux/features/globalLoadingSlice";
import { toast } from "react-toastify";

const MediaList = () => {
    const {mediaType} = useParams();
    const [medias, setMedias] = useState([])
    const [mediaLoading, setMediaLoading] = useState(false)
    const [currentCategory, setCurrentCategory] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()
    const mediaCategories = useMemo(() => ["popular", "top_rated"], [])
    const category = ["popular", "top rated"]

    useEffect(() => {
        dispatch(setAppState(mediaType))
        window.scrollTo(0, 0)
    }, [mediaType, dispatch])

    useEffect(() => {
        const getMedias = async () => {
            if (currentPage === 1) dispatch(setGlobalLoading(true))
            setMediaLoading(true)

            const {response, err} = await mediaApi.getList({
                mediaType,
                mediaCategory: mediaCategories[currentCategory], 
                page: currentPage
            })

            setMediaLoading(false)
            dispatch(setGlobalLoading(false))

            if (err) toast.error(err.message)
            if (response) {
                if (currentPage !== 1) setMedias(med => [...med, ...response.results])
                else setMedias([...response.results])
            }
        }
        getMedias()
    }, [
        mediaType,
        currentCategory,
        currentPage,
        mediaCategories,
        dispatch
    ])

    const onCategoryChange = (index) => {
        if (currentCategory === index) return
        setMedias([])
        setCurrentPage(1)
        setCurrentCategory(index)
    }

    const onLoadMore = () => setCurrentPage(currentPage + 1)

    return (
        <>
            <HeroSlide mediaType={mediaType} mediaCategory={mediaCategories[currentCategory]}/>
            <Box sx={{ ...uiConfigs.style.mainContent }}>
                <Stack 
                    spacing={2}
                    direction={{ xs: "column", md: "row" }}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{marginBottom: 4}}
                >
                    <Typography fontWeight="700" variant="h5">
                        {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "Series"}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        {category.map((item, index) => (
                            <Button
                                key={index}
                                size="large"
                                variant={currentCategory === index ? "contained" : "text"}
                                sx={{
                                    color: currentCategory === index ? "primary.contrastText" : "text.primary",
                                }}
                                onClick={() => onCategoryChange(index)}
                            >
                                {item}
                            </Button>
                        ))}
                    </Stack>
                </Stack>
                <MediaGrid medias={medias} mediaType={mediaType}/>
                <LoadingButton
                    sx={{ marginTop: 8}}
                    fullWidth
                    color="primary"
                    loading={mediaLoading}
                    onClick={onLoadMore}
                >
                    load more
                </LoadingButton>
            </Box>
        </>
    );
}

export default MediaList;