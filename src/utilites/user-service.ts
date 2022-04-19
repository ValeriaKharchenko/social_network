import http from "./http-common"

class userService {
    async login (email:string, pwd:string){
        try {
            await http.post("login", { credential: email, password: pwd });
        } catch (err) {
            // console.log("Here", err);
            throw err;
        }
    }
}

export default userService;