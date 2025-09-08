import { Backdrop, CircularProgress } from "@mui/material";

const Loading = ({ open = false }) => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loading;
