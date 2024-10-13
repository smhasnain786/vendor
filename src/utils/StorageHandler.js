export const getActiveValue = (setTab, key) => {
    const value = localStorage.getItem(key)
    if (value) {
        setTab(value)
    }
}


export const handleActiveValue = (setTab, key, value) => {
    setTab(value)
    localStorage.setItem(key, value)
}

export const StoreKeys = {
    main: "main-sides-tabs",
    users: "users-screens",
    userId: "active-users-id",
}