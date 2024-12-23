import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import '../App.css';
import { Link } from 'react-router-dom';

function DndPage() {
  const [columns, setColumns] = useState({
    todo: { name: 'To Do', items: [{ id: '1', content: 'First task' }, { id: '2', content: 'Second task' }, { id: '3', content: 'Buy something' }, { id: '4', content: 'Do something' }] },
    inProgress: { name: 'In Progress', items: [] },
    done: { name: 'Done', items: [] },
    blocked: { name: 'Blocked', items: [] },
  });

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    if (sourceColumn === destColumn) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({ ...columns, [source.droppableId]: { ...sourceColumn, items: sourceItems } });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destItems }
      });
    }
  };

  const deleteTask = (columnId, itemId) => {
    const newItems = columns[columnId].items.filter(item => item.id !== itemId);
    setColumns({ ...columns, [columnId]: { ...columns[columnId], items: newItems } });
  };

  return (
    <div className="dnd-container">
      <div className="link-container">
        <Link to="/" style={{ textDecoration: 'none', color: 'blue' }}>
          Вернуться на главную страницу
        </Link>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns-container">
          {Object.entries(columns).map(([columnId, column]) => (
            <div key={columnId} className="column">
              <h2>{column.name}</h2>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`droppable-area ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task"
                            style={{
                              backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                              ...provided.draggableProps.style,
                            }}
                          >
                            {item.content}
                            <button onClick={() => deleteTask(columnId, item.id)}>Удалить</button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default DndPage;
