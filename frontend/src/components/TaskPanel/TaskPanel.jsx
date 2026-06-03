import { useState, useEffect, useRef } from 'react'
import TaskItem from './TaskItem'
 
function TaskPanel() {
    const [tasks, setTasks] = useState(() => {
        return JSON.parse(localStorage.getItem('tasks')) || []
    });
 
    const [isEditing, setIsEditing] = useState(false);
    const [draftTasks, setDraftTasks] = useState([]);
    const [isAdding, setIsAdding] = useState(false);
    const [newText, setNewText] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef(null);
 
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);
 
    useEffect(() => {
        if (isAdding && inputRef.current) inputRef.current.focus();
    }, [isAdding]);
 
    const activeTasks = isEditing ? draftTasks : tasks;
 
    function handleToggle(id) {
        const setter = isEditing ? setDraftTasks : setTasks;
        setter(prev =>
            prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        );
    }
 
    function handleDelete(id) {
        setDraftTasks(prev => prev.filter(t => t.id !== id));
    }
 
    function handleTextChange(id, val) {
        setDraftTasks(prev =>
            prev.map(t => t.id === id ? { ...t, text: val } : t)
        );
    }
 
    function openAdd() {
        setIsAdding(true);
        setNewText('');
        setError('');
    }
 
    function closeAdd() {
        setIsAdding(false);
        setError('');
    }
 
    function confirmAdd() {
        const text = newText.trim();
        if (!text) {
            setError('Task text cannot be empty.');
            return;
        }
        if (tasks.some(t => t.text.toLowerCase() === text.toLowerCase())) {
            setError('A task with this name already exists.');
            return;
        }
        setTasks(prev => [...prev, { id: Date.now(), text, completed: false }]);
        setIsAdding(false);
        setNewText('');
        setError('');
    }
 
    function startEdit() {
        setDraftTasks(tasks.map(t => ({ ...t })));
        setIsEditing(true);
        setError('');
    }
 
    function confirmEdit() {
        const cleaned = draftTasks.map(t => ({ ...t, text: t.text.trim() }));
        if (cleaned.some(t => !t.text)) {
            setError('Tasks cannot be empty.');
            return;
        }
        const texts = cleaned.map(t => t.text.toLowerCase());
        if (new Set(texts).size !== texts.length) {
            setError('Duplicate tasks are not allowed.');
            return;
        }
        setTasks(cleaned);
        setIsEditing(false);
        setError('');
    }
 
    function cancelEdit() {
        setIsEditing(false);
        setError('');
    }
 
    const completedCount = tasks.filter(t => t.completed).length;
 
    return (
        <section id="tasks">
            <div className="header-row">
                <h2>Tasks</h2>
                <div className="task-btns">
                    {!isEditing && (
                        <button id="add-task-btn" onClick={openAdd}>
                            Add Task
                        </button>
                    )}
                    {!isEditing && activeTasks.length > 0 && (
                        <button id="edit-task-btn" onClick={startEdit}>
                            Edit
                        </button>
                    )}
                    {isEditing && (
                        <>
                            <button id="edit-task-btn" className="active" onClick={confirmEdit}>
                                Done
                            </button>
                            <button onClick={cancelEdit}>
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
 
            {isAdding && (
                <div className="add-bar">
                    <input
                        ref={inputRef}
                        value={newText}
                        onChange={e => { setNewText(e.target.value); setError(''); }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') confirmAdd();
                            if (e.key === 'Escape') closeAdd();
                        }}
                        placeholder="What needs to be done?"
                        className="add-input"
                    />
                    <div className="add-bar-actions">
                        <button className="btn-confirm" onClick={confirmAdd}>Add</button>
                        <button className="btn-cancel" onClick={closeAdd}>Cancel</button>
                    </div>
                </div>
            )}
 
            {error && <p className="task-error">{error}</p>}
 
            <ul>
                {activeTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        isEditing={isEditing}
                        onTextChange={handleTextChange}
                    />
                ))}
            </ul>
 
            {tasks.length > 0 && (
                <p className="task-count">{completedCount} of {tasks.length} completed</p>
            )}
        </section>
    );
}
 
export default TaskPanel