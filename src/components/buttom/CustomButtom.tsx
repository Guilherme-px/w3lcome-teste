import { styled } from '@mui/system';
import Button from '@mui/material/Button';

const CustomButton = styled(Button)`
    &.MuiButton-root {
        color: #222222;
        background-color: #f2b10c;
        border-color: #f2b10c;
        border: 1px solid;
    }
    &:hover {
        &.MuiButton-root {
            color: #f2b10c;
            background-color: #222222;
            border-color: #222222;
            border: 1px solid;
        }
    }
`;

type ButtomProps = {
    handleClick: () => void;
    buttomText: string;
    startIcon?: React.ReactNode;
    className?: string;
};

const MyCustomButttom = ({
    handleClick,
    buttomText,
    startIcon,
    className,
}: ButtomProps) => {
    return (
        <CustomButton
            variant="contained"
            startIcon={startIcon}
            onClick={handleClick}
            className={className}
        >
            {buttomText}
        </CustomButton>
    );
};

export default MyCustomButttom;
