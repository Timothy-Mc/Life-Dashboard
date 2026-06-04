
function HabitItem({ habit, onToggle, onDelete, onNameChange, isEditing, daysList }) {
    return (
        <li className={`habit-item ${isEditing ? 'editing' : ''}`}>
            <div className="habit-meta">
                {isEditing ? (
                    <div className="edit-bar">
                        <input 
                            value={habit.name} 
                            onChange={e => onNameChange(habit.id, e.target.value)}
                            className="edit-input"
                        />
                    </div>
                ) : (
                    <span className='habit-text'>{habit.name}</span>
                )}
                {!isEditing && <span className='streak-badge'>🔥 {habit.streak || 0}</span>}
            </div>

            <div className="habit-days-row">
                {daysList.map((day, index) => {
                    const isCompleted = habit.history?.[day] || false;

                    const todayLabel = new Date().toLocaleDateString('en-US', { weekday: 'short' });
                    const todayIndex = daysList.indexOf(todayLabel);
                    const isToday = day === todayLabel;

                    const isFutureDay = index > todayIndex;

                    return(
                        <button
                            key={day}
                            disabled={isEditing || isFutureDay}
                            onClick={() => onToggle(habit.id, day)}
                            className={`day-node ${isCompleted ? 'checked' : 'empty'} ${isToday ? 'today' : ''}`}
                            title={`${day}`}
                        >
                            {day.charAt(0)}
                        </button>
                    )
                })}
            </div>

            {isEditing && (
                                <span
                    className="delete-btn habit-del"
                    onClick={() => onDelete(habit.id)}
                    role="button"
                    aria-label="Delete habit"
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
    )
}

export default HabitItem