import http from "./http-common";

export default {
  async getMsgs(receiver, skip, limit) {
    // console.log("R:", receiver);
    try {
      const msgs = await http.get(
        `/chat/?with=${receiver}&skip=${skip}&limit=${limit}`
      );
      console.log("Got history", msgs);
      return msgs.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
  async getGroupMsgs(id) {
    try {
      const msgs = await http.get(`/group/message?groupId=${id}`);
      console.log(msgs);
      return msgs.data;
    } catch (err) {
      console.error(err);
    }
  },
};
