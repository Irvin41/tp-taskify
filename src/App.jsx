import { useState } from "react";
import {
    Routes,
    Route,
    NavLink,
    Link,
    useParams,
    useNavigate,
} from "react-router-dom";
import "./App.css";

function Navbar() {
    return (
        <nav className="navbar">
            <NavLink
                to="/"
                end
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                Accueil
            </NavLink>
            <NavLink
                to="/ajout"
                className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                }
            >
                Ajouter une tâche
            </NavLink>
        </nav>
    );
}

// Page d'accueil affichage de la liste si il y une tâche dedans et un message s'il y a rien

function Home({ tasks, onDeleteTask }) {
    return (
        <div>
            <h1>Liste des tâches</h1>

            {tasks.length === 0 && <p>Aucune tâche pour le moment.</p>}

            <div className="tasks-list">
                {tasks.map((t) => (
                    <div className="task-item" key={t.id}>
                        <Link className="task-link" to={`/tache/${t.id}`}>
                            {t.text}
                        </Link>
                        <button
                            className="delete-button"
                            onClick={() => onDeleteTask(t.id)}
                        >
                            Supprimer
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

// Page pour ajouter la tâche

function AddTaskPage({
                         task,
                         description,
                         onInputChange,
                         onDescriptionChange,
                         onAddTask,
                     }) {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddTask();
        navigate("/");
    };

    return (
        <div>
            <h1>Ajouter une tâche</h1>

            <form className="task-form" onSubmit={handleSubmit}>
                <input
                    className="task-input"
                    onChange={onInputChange}
                    placeholder="Titre de la tâche"
                    value={task}
                />
                <textarea
                    className="task-textarea"
                    onChange={onDescriptionChange}
                    placeholder="Description de la tâche"
                    value={description}
                />
                <button className="add-button" type="submit">
                    Ajouter la tâche
                </button>
            </form>
        </div>
    );
}

// détail de la tâche
function TaskDetail({ tasks }) {
    const { id } = useParams();
    const taskId = Number(id);
    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
        return (
            <div className="notfound-container">
                <h1>Tâche introuvable</h1>
                <p>Cette tâche n'existe pas.</p>
                <Link to="/">Retour à l'accueil</Link>
            </div>
        );
    }

    return (
        <div className="detail-container">
            <h1>Détail de la tâche</h1>
            <p>
                <strong>Titre :</strong> {task.text}
            </p>
            <p>
                <strong>Description :</strong> {task.description}
            </p>
            <p>
                <strong>Statut :</strong> à faire
            </p>
            <Link to="/">Retour à l'accueil</Link>
        </div>
    );
}

// PAGE 404

function NotFound() {
    return (
        <div className="notfound-container">
            <h1>404 - Page non trouvée</h1>
            <p>Oups, cette page n'existe pas.</p>
            <Link to="/">Retour à l'accueil</Link>
        </div>
    );
}

function App() {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState([]);

    const InputChange = (event) => {
        setTask(event.target.value);
    };

    const DescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const AddTask = () => {
        if (task.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: task,
            description: description || "Aucune description.",
        };

        setTasks([...tasks, newTask]);
        setTask("");
        setDescription("");
    };

    const DeleteTask = (id) => {
        const updatedTasks = tasks.filter((t) => t.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <div className="app-container">
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={<Home tasks={tasks} onDeleteTask={DeleteTask} />}
                />
                <Route
                    path="/ajout"
                    element={
                        <AddTaskPage
                            task={task}
                            description={description}
                            onInputChange={InputChange}
                            onDescriptionChange={DescriptionChange}
                            onAddTask={AddTask}
                        />
                    }
                />
                <Route path="/tache/:id" element={<TaskDetail tasks={tasks} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;
