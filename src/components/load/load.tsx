import CircularProgress from '@mui/material/CircularProgress';

type LoaderProps = {
    active: boolean;
};

const Load = ({ active }: LoaderProps) => {
    return (
        <div className="flex items-center justify-center h-screen">
            {active && <CircularProgress style={{ color: '#f2b10c' }} />}
        </div>
    );
};

export default Load;