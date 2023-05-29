import Box from '@mui/material/Box';
import { Card, Checkbox, Button } from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type CardList = {
    id: number;
    task: string;
    concluida?: boolean;
    onEditClick: (taskId: number) => void;
    onDeleteClick: (taskId: number) => void;
    onCheckboxChange: (checked: boolean) => void;
};

const CardComponent = ({
    id,
    task,
    concluida,
    onEditClick,
    onDeleteClick,
    onCheckboxChange,
}: CardList) => {
    const handleEditButtonClick = () => {
        onEditClick(id);
    };

    const handleDeleteButtonClick = () => {
        onDeleteClick(id);
    };

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        onCheckboxChange(event.target.checked);
    };

    return (
        <Card
            className="flex items-center justify-between flex-row m-5 h-14"
            style={
                concluida ? { background: '#32a852' } : { background: 'white' }
            }
        >
            <Box className="flex">
                <div className="ml-2">
                    <Checkbox
                        size="small"
                        checked={concluida}
                        onChange={handleCheckboxChange}
                    />
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
