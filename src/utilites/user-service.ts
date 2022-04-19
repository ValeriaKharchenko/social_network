import http from "./http-common"

export default {
    async login(email: string, pwd: string) {
        try {
            await http.post("login", {credential: email, password: pwd});
        } catch (err) {
            throw err;
        }
    }
}
