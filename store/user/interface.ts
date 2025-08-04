interface ObjectMap {
    [key: string]: string,
}

export interface UserState {
   saveLocal: String,
    storeKey: String,
    user: {
        userData : ObjectMap
    }
}

export interface UserDefaultState {
    saveLocal: String,
    storeKey: String,
    user: {
        userData : ObjectMap
    }  
}