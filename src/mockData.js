// API DOCUMENT RESPONSE

// []entity.User{entity.User{
// ID: "e1c025fe-5a08-430b-b4b2-31cc4841d774",
// FirstName: "Neljas",
// LastName: "Kasutaja",
// UserImg: "",
//     }
// }


export const userInfo = {
  email: 'silver.luhtoja@gmail.com',
  first_name: 'Silver',
  last_name: 'Luhtoja',
  birth_day: '0035-08-12T00:00:00Z',
  nickname: 'Sinsius',
  about_me: 'React and redux nuub',
  user_img: 'old_man.jpg',
  is_private: false,
};
export const followers = [
  {
    id: 1,
    first_name: 'Siri',
    last_name: 'Tiri',
    // UserImg : "../../assets/Images/User/cat.png",
    UserImg: 'cat.png',
  },
  {
    id: 2,
    first_name: 'Papa ',
    last_name: 'Carlo',
    UserImg: 'old_man.jpg',
  },
  {
    id: 3,
    first_name: 'Ano',
    last_name: 'Nym',
    UserImg: 'ano.jpg',
  },
];
export const stalkers = [
  {
    id: 1,
    first_name: '...',
    last_name: '',
    UserImg: 'ano.jpg',
  },
  {
    id: 2,
    first_name: '...',
    last_name: '',
    UserImg: 'ano.jpg',
  },
  {
    id: 3,
    first_name: '...',
    last_name: '',
    UserImg: 'ano.jpg',
  },
];


export const groups = [
  {
    id: 1,
    group_name: 'Trip To Heaven',
    group_party: [
      {
        id: 1,
        first_name: 'Siri',
        last_name: 'Tiri',
        UserImg: 'cat.png',
      },
      {
        id: 2,
        first_name: 'Tiri',
        last_name: 'Siri',
        UserImg: 'cat.png',
      },
    ],
    group_description: "Awesome trip to see Jesus",
    group_img: 'ano.jpg',
  },
];


export const notifications = [
  {
    type: 'group invitation',
    user_id: '78ce690c-c4ee-44ff-8a35-f7dfe0146236',
    data: {
      group_id: 1,
    },
  },

  {
    type: 'new group member request',
    user_id: '78ce690c-c4ee-44ff-8a35-f7dfe0146236',
    data: {
      group_id: 1,
    },
  },

  {
    type: 'new event',
    user_id: '78ce690c-c4ee-44ff-8a35-f7dfe0146236',
    data: {
      group_id: 13,
      event_id: 4,
    },
  },

  {
    type: 'friend request',
    user_id: '78ce690c-c4ee-44ff-8a35-f7dfe0146236',
  },

  {
    type: 'new private message',
    user_id: '78ce690c-c4ee-44ff-8a35-f7dfe0146236',
    data: {
      message_id: 1,
    },
  },

  {
    type: 'new comment to post',
    user_id: '78ce690c-c4ee-44ff-8a35-f7dfe0146236',
    data: {
      post_id: 1,
      comment_id: 1,
    },
  },

  {
    type: 'group access opened',
    user_id: '78ce690c-c4ee-44ff-8a35-f7dfe0146236',
    data: {
      group_id: 1,
    },
  },

  {
    type: 'new message in group chat',
    user_id: '78ce690c-c4ee-44ff-8a35-f7dfe0146236',
    data: {
      group_id: 1,
      message_id: 1,
    },
  },
];