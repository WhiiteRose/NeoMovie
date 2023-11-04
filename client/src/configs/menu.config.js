import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
import LiveTvOutlined from "@mui/icons-material/LiveTvOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import RateReviewOutlined from "@mui/icons-material/RateReviewOutlined";
import LockResetOutlined from "@mui/icons-material/LockResetOutlined";

const main = [
  {
    display: "home",
    path: "/",
    icon: <HomeOutlinedIcon />,
    state: "home",
  },
  {
    display: "movies",
    path: "/movie",
    icon: <SlideshowOutlinedIcon />,
    state: "movie",
  },
  {
    display: "tv series",
    path: "/tv",
    icon: <LiveTvOutlined />,
    state: "tv",
  },
  {
    display: "search",
    path: "/search",
    icon: <SearchOutlined />,
    state: "search",
  },
];

const user = [
  {
    display: "favorites",
    path: "/favorites",
    icon: <FavoriteBorderOutlined />,
    state: "favorite",
  },
  {
    display: "views",
    path: "/views",
    icon: <VisibilityOutlinedIcon />,
    state: "view",
  },
  {
    display: "playlists",
    path: "/playlists",
    icon: <QueueOutlinedIcon />,
    state: "playlist",
  },
  {
    display: "reviews",
    path: "/reviews",
    icon: <RateReviewOutlined />,
    state: "reviews",
  },
  {
    display: "password update",
    path: "/password-update",
    icon: <LockResetOutlined />,
    state: "password.update",
  },
];

const menuConfigs = { main, user };

export default menuConfigs;
