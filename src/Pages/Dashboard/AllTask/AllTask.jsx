import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import useToDoTasks from '../../../Hooks/useToDoTasks';
import useOngoingTasks from '../../../Hooks/useOngoingTasks';
import useCompletedTasks from '../../../Hooks/useCompletedTasks';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const Task = ({ _id, title, description, priority }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'TASK',
    item: { _id , type: 'TASK',},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="border-b p-2 cursor-pointer"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{description}</p>
      <p className="text-sm text-gray-600">Priority: {priority}</p>
    </div>
  );
};

const AllTasks = () => {
  const { toDoTasks, loadingToDoTasks, reloadToDoTasks } = useToDoTasks();
  const { ongoingTasks, loadingOngoingTasks, reloadOngoingTasks } = useOngoingTasks();
  const { completedTasks, loadingCompletedTasks, reloadCompletedTasks } = useCompletedTasks();
  const axiosPublic = useAxiosPublic();

  if(loadingToDoTasks || loadingOngoingTasks || loadingCompletedTasks){
    return <div className=' text-center'>Loading...</div>
  }

  const tasks =  { todo: toDoTasks, ongoing: ongoingTasks, completed: completedTasks } 

 
const moveTask = async (source, destination, taskId) => {
   
    try {
      const res = await axiosPublic.patch(`/api/tasks/${taskId}`, { status: destination });
      if (res.status === 200) {
        // Refresh tasks after successfully updating the task
        reloadToDoTasks();
        reloadOngoingTasks();
        reloadCompletedTasks();
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  

  const TaskList = ({ listName, tasks }) => {
    const [{ isOver }, dropRef] = useDrop({
      accept: 'TASK',
      drop: (item) => moveTask(item.source, listName, item._id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    return (
      <div
        ref={dropRef}
        className={`w-1/3 p-4 ${isOver ? 'bg-gray-100' : ''}`}
      >
        <h2 className={`text-xl font-bold mb-4 text-center bg-${listName === 'todo' ? 'gray-500' : listName === 'ongoing' ? 'blue-400' : 'green-500'} text-white`}>
          {listName.charAt(0).toUpperCase() + listName.slice(1)}
        </h2>
        <div className="bg-white p-2 mb-2 rounded shadow">
          {tasks.map((task) => (
            <Task key={task._id} {...task} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex">
        {Object.entries(tasks).map(([listName, taskList]) => (
          <TaskList key={listName} listName={listName} tasks={taskList} />
        ))}
      </div>
    </DndProvider>
  );
};

export default AllTasks;
