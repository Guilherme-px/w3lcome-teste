import { TextField } from '@mui/material';
import MyCustomButttom from '../buttom/CustomButtom';
import { ITask } from '../../interfaces/ITask';

type FormProps = {
    error: boolean;
    isEditing: boolean;
    inputValue: string;
    onInputChange: (value: string) => void;
    onSubmit: (value: string) => void;
    task: ITask | null;
};

const TaskForm = ({
    error,
    inputValue,
    onInputChange,
    onSubmit,
    isEditing,
    task,
}: FormProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        onInputChange(newValue);
    };

    const handleFormSubmit = () => {
        onSubmit(inputValue);
    };

    return (
        <div>
            <TextField
                id="task-title"
                label="Titulo"
                variant="standard"
                value={inputValue}
                onChange={handleChange}
                error={error}
                helperText={error ? 'Informe um titulo para a tarefa!' : ''}
                InputProps={{ value: inputValue || '' }}
            />
            <div className="pt-10">
                <MyCustomButttom
                    className="w-full"
                    handleClick={handleFormSubmit}
                    buttomText={!isEditing ? 'Cadastrar' : 'Editar'}
                />
            </div>
        </div>
    );
};

export default TaskForm;
