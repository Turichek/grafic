import { useState, useCallback } from "react";

export const useGetStatistics = () => {
    const [data, setData] = useState([]);

    const request = useCallback(async (url) => {
        try {
            const response = await fetch(url);
            const arr = await response.json();
            setData(arr.data.reverse());
        } catch (e) {
            console.log(e.message);
            throw e;
        }
    }, []);

    return { data, request };
}