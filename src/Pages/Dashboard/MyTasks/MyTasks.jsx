import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";


const MyTask = () => {
 const { user } = useAuth();
 const axiosPublic = useAxiosPublic();

 const { data: myTasks, isPending}  = useQuery({
    queryKey: ['myTasks'],
    queryFn: async() => {
        const res = await axiosPublic.get(`/api/tasks/myTasks/${user.email}`);
        return res.data;
    }
 }) 

 if(isPending){
    return <div>Loading...</div>
 }
 console.log(myTasks);
  
  if (myTasks.length === 0) {
    return (
      <div className="text-center flex items-center justify-center h-screen text-gray-500 mt-8">
        No tasks found. Create some tasks to manage!
      </div>
    );
  }
  const renderTaskCards = () => {
    return myTasks.map((task) => (
      <div key={task._id} className="bg-gray-100 rounded-lg shadow-md p-4 mb-4">
        <h3 className="text-lg font-semibold mb-2">{task.title}</h3>
        <p className="text-sm mb-2">{task.description}</p>
        <p className="text-sm">Deadline: {task.deadline}</p>
        <p className="text-sm">Priority: {task.priority}</p>
        <p className="text-sm">Status: {task.status}</p>
      </div>
    ));
  };

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">My Tasks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderTaskCards()}
      </div>
    </div>
  );
};

export default MyTask;
