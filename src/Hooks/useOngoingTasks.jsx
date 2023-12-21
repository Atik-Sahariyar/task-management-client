import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useOngoingTasks = () => {
    const axiosPublic = useAxiosPublic();
    const { data: ongoingTasks, isPending: loadingOngoingTasks, refetch: reloadOngoingTasks  } = useQuery({
        queryKey: ['OngoingTasks'],
        queryFn: async() => {
            const res = await axiosPublic.get('/api/tasks/ongoing');
            return res.data 
        }
    })
    return {ongoingTasks, loadingOngoingTasks, reloadOngoingTasks }
};

export default useOngoingTasks;