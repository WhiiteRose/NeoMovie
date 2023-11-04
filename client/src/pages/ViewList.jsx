import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingButton } from '@mui/lab';
import {Box, Button, Grid} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import MediaItem from '../components/common/MediaItem';
import Container from '../components/common/Container';
import uiConfigs from '../configs/ui.configs';
import viewsApi from '../api/modules/view.api';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { removeView } from '../redux/features/userSlice';

const ViewItem = ({ media, onRemoved }) => {
    const dispatch = useDispatch()
    const [onRequest, setOnRequest] = useState(false)

    const onRemove = async () => {
        if (onRequest) return
        setOnRequest(true)
        const { response, err } = await viewsApi.remove({ viewsId: media.id })
        setOnRequest(false)

        if (err) toast.error(err.message)
        if (response) {
            toast.success('Removed from your views')
            dispatch(removeView({ mediaId: media.id }))
            onRemoved(media.id)
        }
    }

    return (
        <>
            <MediaItem media={media} mediaType={media.mediaType} />
            <LoadingButton
                fullWidth
                variant='contained'
                sx={{ marginTop: 2 }}
                startIcon={<DeleteIcon />}
                loadingPosition='start'
                loading={onRequest}
                onClick={onRemove}
            >
                remove
            </LoadingButton>
        </>
    )
}

const ViewList = () => {
    const [medias, setMedias] = useState([])
    const [filteredMedias, setFilteredMedias] = useState([])
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(0)
    const skip = 8
    const dispatch = useDispatch()

    useEffect(() => {
      const getViews = async () => {
        dispatch(setGlobalLoading(true))
        const { response, err } = await viewsApi.getList()
        dispatch(setGlobalLoading(false))
        
        if (err) toast.error(err.message)
        if (response) {
            setCount(response.length)
            setMedias([...response])
            setFilteredMedias([...response].splice(0, skip))
        }
      }
      getViews()
    }, [dispatch])
    
    const onLoadMore = () => {
        setFilteredMedias([...filteredMedias], ...[...medias].splice(page * skip, skip))
        setPage(page + 1)
    }

    const onRemoved = (mediaId) => {
        const newMedias = [...medias].filter(media => media.id !== mediaId)
        setMedias(newMedias)
        setFilteredMedias([...newMedias].splice(0, page * skip))
        setCount(count - 1)
    }

    return (
        <Box sx={{...uiConfigs.style.mainContent}}>
            <Container header={`Media View (${count})`}>
                <Grid container spacing={1} sx={{marginRight: "-8px!important"}}>
                    {filteredMedias.map((media, index) => (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                           <ViewItem media={media} onRemoved={onRemoved} />
                        </Grid>
                    ))}
                </Grid>
                {filteredMedias.length < medias.length && (
                    <Button onClick={onLoadMore}>
                        load more
                    </Button>
                )}
            </Container>
        </Box>
    );
}

export default ViewList;
