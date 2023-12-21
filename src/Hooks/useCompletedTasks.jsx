import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCompletedTasks = () => {
    const axiosPublic = useAxiosPublic();
    const { data: completedTasks, isPending: loadingCompletedTasks, refetch: reloadCompletedTasks  } = useQuery({
        queryKey: ['CompletedTasks'],
        queryFn: async() => {
            const res = await axiosPublic.get('/api/tasks/completed');
            return res.data 
        }
    })
    return { completedTasks, loadingCompletedTasks, reloadCompletedTasks }
};

export default useCompletedTasks;