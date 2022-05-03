import http from './http-common';



export default {
    async getMyInfo(){
        try{
            console.log("GETTING USER INFO");
            const response = await http.get("/user/me")
            console.log(response);
        }catch(err){
            if(err){
                console.log(err.message);
                console.log(err.status);
                console.log(err.header);
            }else{
                console.log("Different Error ", err.message);
            }
        }
    }
   
}
