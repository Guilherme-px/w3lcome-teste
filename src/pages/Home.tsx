import { useState, useEffect } from 'react';
import Load from '../components/load/Load';
import DialogModal from '../components/modal/Dialog';
import TaskForm from '../components/form/TaskForm';
import MyCustomButttom from '../components/buttom/CustomButtom';
import AddIcon from '@mui/icons-material/Add';
import api from '../services/axiosConfig';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleSubmit = async (value: string) => {
        if (!value) {
            setError(true);
            return;
        }

        setError(false);

        await api
            .post('/tarefas', { titulo: value })
            .then((res) => {
                console.log(res.data);
                setInputValue('');
            })
            .catch((res) => {
                console.log(res.data);
            });
    };

    return (
        <div>
            {loading ? (
                <Load active={loading} />
            ) : (
                <div>
                    <div className="p-5">
                        <MyCustomButttom
                            handleClick={handleOpenModal}
                            buttomText="Nova tarefa"
                            startIcon={<AddIcon />}
                        />
                    </div>
                    <DialogModal
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                    >
                        <div className="px-10 py-3">
                            <div className="pb-5 font-bold text-lg">
                                <h1 className="text-[#f2b10c]">Criar tarefa</h1>
                            </div>
                            <div>
                                <TaskForm
                                    error={error}
                                    inputValue={inputValue}
                                    onInputChange={setInputValue}
                                    onSubmit={handleSubmit}
                                />
                            </div>
                        </div>
                    </DialogModal>
                    <div></div>
                </div>
            )}
        </div>
    );
};

export default Home;
