import { useState, useEffect } from 'react';
import Load from '../components/load/Load';
import DialogModal from '../components/modal/Dialog';
import TaskForm from '../components/form/TaskForm';
import MyCustomButttom from '../components/buttom/CustomButtom';
import AddIcon from '@mui/icons-material/Add';
import api from '../services/axiosConfig';
import MessageAlert from '../components/alerts/MessageAlert';
import CardComponent from '../components/cards/TaskCard';
import { ITask } from '../interfaces/ITask';
import { Pagination, Button } from '@mui/material/';
import DeleteDialog from '../components/modal/DeleteDialog';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isUpdateStatus, setIsUpdateStatus] = useState(false);
    const [error, setError] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [task, setTask] = useState<ITask | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(5);
    const [id, setId] = useState<number | null>(null);
    const [updateId, setUpdateId] = useState<number | null>(null);

    useEffect(() => {
        setLoading(false);
        getTasks();
        if (id !== null) {
            getTask();
        }
    }, [id]);

    useEffect(() => {
        setLoading(false);
        getTasks();
        if (id !== null) {
            getTask();
        }
    }, [id]);

    useEffect(() => {
        if (isUpdateStatus && task) {
            handleSubmit(task.titulo);
        }
    }, [isUpdateStatus, task]);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handlDeleteClick = async (taskId: number) => {
        setId(taskId);
        setDeleteModal(true);
    };

    const handleEditClick = async (taskId: number) => {
        setIsEditing(true);
        setUpdateId(taskId);
        setId(taskId);
        handleOpenModal();
        if (task) {
            setInputValue(task.titulo || '');
        }
    };

    const handleSubmit = async (value: string) => {
        setLoading(true);

        if (!value) {
            setError(true);
            setLoading(false);
            return;
        }

        setError(false);

        if (!isEditing) {
            await api
                .post('/tarefas', { titulo: value })
                .then((res) => {
                    setMessage(res.data.msg);
                    setMessageType('success');
                    setInputValue('');
                    getTasks();
                    setLoading(false);
                    setShowModal(false);
                })
                .catch((res) => {
                    setLoading(false);
                    setMessage(res.data.msg);
                    setMessageType('error');
                });
        } else {
            await api
                .put(`/tarefas/${updateId}`, {
                    titulo: value || task?.titulo,
                    concluida: task?.concluida,
                })
                .then((res) => {
                    setMessage(res.data.msg);
                    setMessageType('success');
                    setInputValue('');
                    setIsUpdateStatus(false);
                    getTasks();
                    setLoading(false);
                    setShowModal(false);
                    setIsEditing(false);
                })
                .catch((res) => {
                    setLoading(false);
                    setMessage(res.data);
                    setMessageType('error');
                });
        }
    };

    const getTasks = async () => {
        setLoading(true);
        await api
            .get('/tarefas')
            .then((res) => {
                setTasks(res.data);
                setLoading(false);
            })
            .catch((res) => {
                setLoading(false);
                setMessage(res.data.msg);
                setMessageType('error');
            });
    };

    const getTask = async () => {
        setLoading(true);
        await api
            .get(`/tarefas/${id}`)
            .then((res) => {
                setInputValue(res.data.titulo);
                setTask(res.data);
                setLoading(false);
            })
            .catch((res) => {
                setLoading(false);
                setMessage(res.data.msg);
                setMessageType('error');
            });
    };

    const handleCheckboxChange = async (
        taskId: number,
        checked: boolean,
        title: string
    ) => {
        setUpdateId(taskId);
        setIsUpdateStatus(true);
        setTask({ id: taskId, titulo: title, concluida: checked });
        setIsEditing(true);
    };

    const handleDelete = async () => {
        await api
            .delete(`/tarefas/${id}`)
            .then((res) => {
                setMessage(res.data.msg);
                setMessageType('success');
                getTasks();
                setLoading(false);
                setDeleteModal(false);
            })
            .catch((res) => {
                setLoading(false);
                setMessage(res.data);
                setMessageType('error');
                setDeleteModal(false);
            });
    };

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
                    <MessageAlert
                        alertType={messageType}
                        message={message}
                        onClose={() => setMessage('')}
                    />
                    <DialogModal
                        isOpen={showModal}
                        onClose={() => {
                            setShowModal(false);
                            setTask(null);
                            setIsEditing(false);
                            setInputValue('');
                        }}
                    >
                        <div className="px-10 py-3">
                            <div className="pb-5 font-bold text-lg">
                                <h1 className="text-[#f2b10c]">
                                    {!isEditing
                                        ? 'Criar tarefa'
                                        : 'Editar tarefa'}
                                </h1>
                            </div>
                            <div>
                                <TaskForm
                                    isEditing={isEditing}
                                    error={error}
                                    inputValue={inputValue}
                                    onInputChange={setInputValue}
                                    onSubmit={handleSubmit}
                                    task={task}
                                />
                            </div>
                        </div>
                    </DialogModal>

                    <DeleteDialog
                        isOpen={deleteModal}
                        onClose={() => {
                            setDeleteModal(false);
                        }}
                    >
                        <div className="px-10 py-3">
                            <div className="pb-5 font-bold text-lg">
                                <h1 className="text-[#f2b10c]">
                                    Deletar tarefa
                                </h1>
                            </div>
                            <div>
                                <span>
                                    Tem certeza que deseja deletar esta tarefa ?
                                </span>
                            </div>
                            <div className="flex justify-end mt-8">
                                <div className="mx-5">
                                    <Button
                                        variant="contained"
                                        style={{ background: 'grey' }}
                                        onClick={() => setDeleteModal(false)}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        style={{ background: 'red' }}
                                        onClick={handleDelete}
                                    >
                                        Deletar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DeleteDialog>
                    <div>
                        {currentTasks.map((task: ITask) => (
                            <CardComponent
                                key={task.id}
                                id={task.id}
                                task={task.titulo}
                                concluida={task.concluida}
                                onEditClick={() => handleEditClick(task.id)}
                                onDeleteClick={() => handlDeleteClick(task.id)}
                                onCheckboxChange={(checked) =>
                                    handleCheckboxChange(
                                        task.id,
                                        checked,
                                        task.titulo
                                    )
                                }
                            />
                        ))}
                    </div>
                    {tasks.length > 0 ? (
                        <Pagination
                            className="flex justify-center my-8"
                            count={Math.ceil(tasks.length / tasksPerPage)}
                            page={currentPage}
                            onChange={(_event, pageNumber) =>
                                paginate(pageNumber)
                            }
                        />
                    ) : (
                        <></>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;
