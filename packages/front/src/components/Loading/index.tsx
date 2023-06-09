import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Loading = ({ open }: { open: boolean }) => {
    return (
        <Backdrop sx={{ color: "#fff", zIndex: (theme: any) => theme.zIndex.drawer + 1 }} open={open}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Loading;
