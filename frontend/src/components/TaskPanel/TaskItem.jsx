function TaskItem({ task, onToggle, onDelete, isEditing, onTextChange }) {
    return (
        <li className={`task-item ${task.completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
            <input
                type="checkbox"
                checked={task.completed}
                disabled={isEditing}
                onChange={() => onToggle(task.id)}
            />
 
            {isEditing ? (
                <input
                    value={task.text}
                    onChange={e => onTextChange(task.id, e.target.value)}
                    className="task-text editable"
                />
            ) : (
                <span className="task-text">
                    {task.text}
                </span>
            )}
 
            {isEditing && (
                <span
                    className="delete-btn task-del"
                    onClick={() => onDelete(task.id)}
                    role="button"
                    aria-label="Delete task"
                >
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none">
                        <path
                            d="M6 6L18 18M18 6L6 18"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                        />
                    </svg>
                </span>
            )}
        </li>
    );
}
 
export default TaskItem