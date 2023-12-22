import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useToDoTasks from "../../../Hooks/useToDoTasks";
import useOngoingTasks from "../../../Hooks/useOngoingTasks";
import useCompletedTasks from "../../../Hooks/useCompletedTasks";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { Link } from "react-router-dom";

const Task = ({ _id, aouthorEemail, title, description, priority, deadline, handleDeleteTask }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { _id, type: "TASK" },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
 const { user  } = useAuth();

  return (
     <div className=" flex ">
        <div
      ref={dragRef}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="border-t w-11/12 p-2 cursor-pointer"
    >
      <span>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p>{description}</p>
        <p className="text-sm text-gray-600">Priority: {priority}</p>
        <p className="text-sm text-gray-600">Deadline: {deadline}</p>
      </span>
    </div>
    <button  onClick={() => handleDeleteTask(_id, aouthorEemail)}>X</button>
    {
      user.email !== aouthorEemail ? 
      ""
      :
      <Link className=" text-sm" to = {`/dashboard/updateTask/${_id}`}>🖊️</Link>
    }

     </div>
  );
};

const AllTasks = () => {
  const { toDoTasks, loadingToDoTasks, reloadToDoTasks } = useToDoTasks();
  const { ongoingTasks, loadingOngoingTasks, reloadOngoingTasks } = useOngoingTasks();
  const { completedTasks, loadingCompletedTasks, reloadCompletedTasks } = useCompletedTasks();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const userEmail = user.email;

  if (loadingToDoTasks || loadingOngoingTasks || loadingCompletedTasks) {
    return <div className=" text-center">Loading...</div>;
  }

 


  const handleDeleteTask = async (id, taskCreatorEmail) => {
    const proceed = confirm('Are You sure you want to delete');
    if (!proceed) {
        ''
    } else if (userEmail !== taskCreatorEmail) {
        Swal.fire('Only the person who created this task can delete it');

    } else {

        try {
            const response = await axiosPublic.delete(`/api/task/${id}`);
            if(response.data){
              Swal.fire('Deleted successfull')
              reloadToDoTasks();
              reloadOngoingTasks();
              reloadCompletedTasks();
            }
      
           
        } catch (error) {
            console.error("Error fetching assinment: ", error);

        }
    }
}

  const tasks = {
    todo: toDoTasks,
    ongoing: ongoingTasks,
    completed: completedTasks,
  };


  const moveTask = async (source, destination, taskId) => {
    try {
      const res = await axiosPublic.patch(`/api/tasks/${taskId}`, {
        status: destination,
      });
      if (res.status === 200) {
        // Refresh tasks after successfully updating the task
        reloadToDoTasks();
        reloadOngoingTasks();
        reloadCompletedTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const TaskList = ({ listName, tasks , handleDeleteTask }) => {
    const [{ isOver }, dropRef] = useDrop({
      accept: "TASK",
      drop: (item) => moveTask(item.source, listName, item._id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    return (
      <div ref={dropRef} className={` p-4 ${isOver ? "bg-gray-100" : ""}`}>
        <h2
          className={`text-xl font-bold mb-4 text-center ${
            listName === "todo" && "bg-gray-500"
          } ${listName === "ongoing" && "bg-blue-500"} ${
            listName === "completed" && "bg-green-500"
          }  text-white rounded-md`}
        >
          {listName.charAt(0).toUpperCase() + listName.slice(1)}
        </h2>
        <div className="bg-white p-2 mb-2 rounded shadow">
          {tasks.map((task) => (
            <Task key={task._id} {...task} handleDeleteTask = {handleDeleteTask} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col md:flex-row">
        {Object.entries(tasks).map(([listName, taskList]) => (
          <TaskList key={listName} listName={listName} tasks={taskList} handleDeleteTask = {handleDeleteTask}/>
        ))}
      </div>
    </DndProvider>
  );
};

export default AllTasks;
