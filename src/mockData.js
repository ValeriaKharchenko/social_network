// API DOCUMENT RESPONSE

// []entity.User{entity.User{
// ID: "e1c025fe-5a08-430b-b4b2-31cc4841d774",
// FirstName: "Neljas",
// LastName: "Kasutaja",
// UserImg: "",
//     }
// }


export const userInfo = {
    
}

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
