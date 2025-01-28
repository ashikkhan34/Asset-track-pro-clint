import useAxiosSecure from '../Hooks/useAxiosSecure'
import useAuth from '../Hooks/useAuth'
import { useQuery } from '@tanstack/react-query';

const useManager = () => {
    const {user,loading} = useAuth()
    const axiosSecure = useAxiosSecure()
    const {data :isManager, isPending:isManagerLoading} = useQuery({
        queryKey:[user?.email, 'isManager'],
        // enabled:!!localStorage.getItem('access-token'),
        enabled:!loading,
        queryFn:async () =>{
            const res = await axiosSecure.get(`/users/manager/${user.email}`)
            console.log(res.data)
            return res.data?.manager;
        }
    })
    return[isManager,isManagerLoading]
};

export default useManager;