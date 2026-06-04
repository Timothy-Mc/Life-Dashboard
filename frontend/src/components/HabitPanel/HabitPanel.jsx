import { useState, useEffect, useRef } from 'react'
import HabitItem from './HabitItem'
import useLocalStorage from '../../hooks/useLocalStorage'

function HabitPanel() {
  const [habits, setHabits] = useLocalStorage('habits', []);

  const [isEditing, setIsEditing] = useState(false);
  const [draftHabits, setDraftHabits] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

 
  useEffect(() => {
    if (isAdding && inputRef.current) inputRef.current.focus();
  }, [isAdding]);

  const activeHabits = isEditing ? draftHabits : habits;

  function calculateCurrentStreak(history) {
	const todayName = new Date().toLocaleDateString('en-US', { weekday : 'short' });
	const todayIndex = DAYS_OF_WEEK.indexOf(todayName);

	if (todayIndex === -1) return 0;

	let streak = 0;

	if (history[todayName]) {
		for (let i = todayIndex; i >= 0; i--) {
			if (history[DAYS_OF_WEEK[i]]) {
				streak++;
			} else {
				break;
			}
		}	
	} else {
		const yesterdayIndex = todayIndex - 1;

		if (yesterdayIndex >= 0) {
			for (let i = yesterdayIndex; i >= 0; i--) {
				if (history[DAYS_OF_WEEK[i]]) {
					streak++;
				} else {
					break;
				}
			}
		}
	}

	return streak;
  }

  function handleToggle(id, day) {
    const setter = isEditing ? setDraftHabits : setHabits;
    setter(prev =>
      prev.map(h => {
        if (h.id === id) {
          const currentHistory = h.history || [];
          const updatedHistory = { ...currentHistory, [day]: !currentHistory[day] };

          const newStreak = calculateCurrentStreak(updatedHistory);

          return { ...h, history: updatedHistory, streak: newStreak };
        }
		return h;
      })
    );
  }

  function handleDelete(id) {
    setDraftHabits(prev => prev.filter(h => h.id !== id));
  }

  function handleNameChange(id, val) {
      setDraftHabits(prev =>
          prev.map(h => h.id === id ? { ...h, name: val } : h)
      );
  }

  function openAdd() {
    setIsAdding(true);
    setNewName('');
    setError('');
  }

  function closeAdd() {
    setIsAdding(false);
    setError('');
  }

  function confirmAdd() {
    const name = newName.trim();
    if (!name) {
      setError('Habit name cannot be empty.');
      return;
    }

    if (habits.some(h => h.name.toLowerCase() === name.toLowerCase())) {
      setError('A habit with this name already exists.');
      return;
    }

    const freshHistory = DAYS_OF_WEEK.reduce((acc, day) => ({ ...acc, [day]: false }), {})

    setHabits(prev => [...prev, { id: Date.now(), name, streak: 0, history: freshHistory}]);
    setIsAdding(false);
    setNewName('');
    setError('');
  }

  function startEdit() {
    setDraftHabits(habits.map(h => ({ ...h })));
    setIsEditing(true);
    setError('');
  }

  function confirmEdit() {
    const cleaned = draftHabits.map(h => ({ ...h, name: h.name.trim() }));
    
    if (cleaned.some(h => !h.name)) {
      setError('Habit names cannot be empty.');
      return;
    }

    const names = cleaned.map(h => h.name.toLowerCase());

    if (new Set(names).size !== names.length) {
      setError('Duplicate habit names are not allowed.');
      return;
    }

    setHabits(cleaned);
    setIsEditing(false);
    setError('');
  }

  function cancelEdit() {
    setIsEditing(false);
    setError('');
  }

  return (
    <section id="habits">
      <div className="header-row">
            <h2>Habits</h2>
            <div className="header-btns">
                {!isEditing && (
                  <button id="add-habit-btn" onClick={openAdd}>
                      Add Habit
                  </button>
                )}
                {!isEditing && activeHabits.length > 0 && (
                  <button id="edit-btn" onClick={startEdit}>
                    Edit
                  </button>
                )}
				{isEditing && (
					<>
						<button id="edit-btn" className="active" onClick={confirmEdit}>
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
					value={newName}
					onChange={e => { setNewName(e.target.value); setError(''); }}
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

		<ul className="habit-list">
			{activeHabits.map(habit => (
				<HabitItem
					key={habit.id}
					habit={habit}
					onToggle={handleToggle}
					onDelete={handleDelete}
					onNameChange={handleNameChange}
					isEditing={isEditing}
					daysList={DAYS_OF_WEEK}
				/>
			))}
		</ul>
    </section>
  )
}

export default HabitPanel