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
  async getGroupMsgs(id, skip, limit) {
    try {
      const msgs = await http.get(
        `/group/chat?groupId=${id}&skip=${skip}&limit=${limit}`
      );
      console.log(msgs);
      let m = [];
      if (msgs.data !== null) {
        msgs.data.forEach((msg) => {
          const ms = {
            content: msg.content,
            data: msg.created_at,
            from: msg.from,
            name: msg.first_name + " " + msg.last_name,
            read: msg.seen, //prob don't need this field
          };
          m.push(ms);
        });
      }
      console.log("Parsed msgs", m);
      return m;
    } catch (err) {
      console.error(err);
    }
  },
};
