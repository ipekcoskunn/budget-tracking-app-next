export const saveToLocalStorage = (key: string, data: any) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

export const getFromLocalStorage = (key: string) => {
    if (typeof window === "undefined") return [];
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : [];
};

export const removeFromLocalStorage = (key: string, id: number) => {
    if (typeof window !== "undefined") {
        const storedData = getFromLocalStorage(key);

        const updatedData = storedData.filter((item: { id: number }) => item.id !== id);

        saveToLocalStorage(key, updatedData);
    }
};
