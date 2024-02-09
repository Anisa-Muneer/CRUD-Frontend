import { adminApi } from "../Utils/Api";

export async function AdminLogin(details){
    try {
        const data = await adminApi.post('/login', details)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export async function GetUsers(){
    try {
        const data = await adminApi.get('/getallusers')
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export async function addUser(Credentials){
    try {
        const data = await adminApi.post('/addUser',Credentials)
        return data
    } catch (error) {
        console.log(error.message);
    }
}

export async function DeleteUser(userid){
    try {
        const data = await adminApi.post(`/deleteUser/${userid}`)
        return data
    } catch (error) {
        console.log(error.message);
    }
}


export async function EditUserData(userId){
        try {
            console.log(userId,"kkkkkkkkkkkkk");
            const data = await adminApi.get(`/editUser/${userId}`)
            return data
        } catch (error) {
            console.log(error);
        }
}

export async function UpdateUser(id,updateUserData){
    try{
        const {name,email,number} = updateUserData
        const data = await adminApi.post('/updateuser',{id,name,email,number})
        return data
    }catch(err){
        console.log(err);
    }
}