import { createContext, useEffect, useRef, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider =({children})=>{
       
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true)
    const hasLoadedUser = useRef(false)

    // useEffect(() => {
    //     if (hasLoadedUser.current) {
    //         return
    //     }

    //     hasLoadedUser.current = true

    //     const loadUser = async () => {
    //         try {
    //             const data = await getMe()
    //             setUser(data?.user ?? null)
    //         } finally {
    //             setLoading(false)
    //         }
    //     }

    //     loadUser()
    // }, [])


    // useEffect(()=>{
    //      const getAndSsetUser = async()=>{
    //         const data =await getMe()
    //         setUser(data.user)
    //         setLoading(false)
    //      }

    //      getAndSsetUser();
    // },[])


    return(
        <AuthContext.Provider value={{user,setUser, loading,setLoading}}>
           {children}
        </AuthContext.Provider>   
    )



}