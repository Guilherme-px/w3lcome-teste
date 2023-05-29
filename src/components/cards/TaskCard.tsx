import Box from '@mui/material/Box';
import { Card, Checkbox } from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type CardList = {
    task: string;
};

const CardComponent = ({ task }: CardList) => {
    return (
        <Card className="flex items-center justify-between flex-row m-5 h-14">
            <Box className="flex">
                <div className="ml-2">
                    <Checkbox size="small" />
                    {task}
                </div>
            </Box>
            <Box>
                <div className="flex">
                    <EditIcon className="mr-8 cursor-pointer text-[#f2b10c]" />
                    <DeleteIcon className="mr-5 cursor-pointer text-red-600" />
                </div>
            </Box>
        </Card>
    );
};

export default CardComponent;
