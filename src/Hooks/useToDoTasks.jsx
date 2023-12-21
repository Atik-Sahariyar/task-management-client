import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useToDoTasks = () => {
    const axiosPublic = useAxiosPublic();
    const { data: toDoTasks, isPending: loadingToDoTasks, refetch: reloadToDoTasks  } = useQuery({
        queryKey: ['ToDOTasks'],
        queryFn: async() => {
            const res = await axiosPublic.get('/api/tasks/todo');
            return res.data 
        }
    })
    return {toDoTasks, loadingToDoTasks, reloadToDoTasks }
};

export default useToDoTasks;