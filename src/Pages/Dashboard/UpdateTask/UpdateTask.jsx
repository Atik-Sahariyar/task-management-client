import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateTask = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

    const { data: task , isPending} = useQuery({
        queryKey: ['task'],
        queryFn: async() => {
            const res = await axiosPublic.get(`/api/tasks/${id}`);
            return res.data
        }
    })

    if(isPending){
        return <div>Loading...</div>
    }
    const {
        _id,
        title,
        description,
        deadline,
        priority,
      } = task

    //  update task function
    const onSubmit = async (data) => {
      const aouthorEemail = user?.email;
      const aouthorName = user?.displayName;
      const title = data.title;
      const description = data.description;
      const deadline = data.deadline;
      const priority = data.priority;
      const status = "todo";
      const taskData = {
        aouthorName,
        aouthorEemail,
        title,
        description,
        deadline,
        priority,
        status,
      };
    
      const res = await axiosPublic.patch(`/api/tasks/update/${_id}`, taskData);
      if (res.data) {
        toast.success('Task updated successfully!', {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000, 
        });
          navigate('/dashboard/allTasks');
          reset();
      }
    };

    return (
        <div className="flex items-center justify-center h-screen">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full sm:w-1/2 lg:w-1/2">
          <h2 className="text-2xl font-bold mb-6 text-center">Update your Task</h2>
  
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                defaultValue={title}
                placeholder="Task Title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <span className="text-red-500 text-xs">Title is required</span>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="description"
                defaultValue={description}
                placeholder="Task Description"
                {...register("description")}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="deadline"
              >
                Deadline
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                name="deadline"
                defaultValue={deadline}
                {...register("deadline", { required: true })}
              />
              {errors.deadline && (
                <span className="text-red-500 text-xs">Deadline is required</span>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="priority"
              >
                Priority
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={priority}
                {...register("priority")}
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Update Task
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default UpdateTask;