import Box from '@mui/material/Box';
import { Card, Checkbox, Button } from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type CardList = {
    id: number;
    task: string;
    onEditClick: (taskId: number) => void;
    onDeleteClick: (taskId: number) => void;
};

const CardComponent = ({ id, task, onEditClick, onDeleteClick }: CardList) => {
    const handleEditButtonClick = () => {
        onEditClick(id);
    };

    const handleDeleteButtonClick = () => {
        onDeleteClick(id);
    };

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
                    <Button onClick={handleEditButtonClick}>
                        <EditIcon className="mr-6 cursor-pointer text-[#f2b10c]" />
                    </Button>
                    <Button onClick={handleDeleteButtonClick}>
                        <DeleteIcon className="mr-5 cursor-pointer text-red-600" />
                    </Button>
                </div>
            </Box>
        </Card>
    );
};

export default CardComponent;
