import { TextField } from '@mui/material';
import MyCustomButttom from '../buttom/CustomButtom';

type FormProps = {
    error: boolean;
    inputValue: string;
    onInputChange: (value: string) => void;
    onSubmit: (value: string) => void;
};

const TaskForm = ({
    error,
    inputValue,
    onInputChange,
    onSubmit,
}: FormProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onInputChange(event.target.value);
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
            />
            <div className="pt-10">
                <MyCustomButttom
                    className="w-full"
                    handleClick={handleFormSubmit}
                    buttomText="Cadastrar"
                />
            </div>
        </div>
    );
};

export default TaskForm;
