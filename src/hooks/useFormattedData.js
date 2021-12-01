export const useFormattedData = () => {
    const addNewAttr = (data) => {
        for (let i = 1; i <= data.length; i++) {
            data[i-1].id = i;
        }
    }

    return { addNewAttr };
}