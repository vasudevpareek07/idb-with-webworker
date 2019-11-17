export class CONSTANTS {
  static STORES = [
    {
      db_name: "topODITeams",
      indexed_fields: "id",
      version: 1
    },
    {
      db_name: "topTestTeams",
      indexed_fields: "id",
      version: 1
    },
    {
      db_name: "topT20Teams",
      indexed_fields: "id",
      version: 1
    }
  ];

  static storeData = {
    topODITeams: [
      { id: 1, name: "India" },
      { id: 2, name: "Australia" },
      { id: 3, name: "England" },
      { id: 4, name: "New Zealand" },
      { id: 5, name: "South Africa" }
    ],
    topTestTeams: [
      { id: 1, name: "India" },
      { id: 2, name: "England" },
      { id: 3, name: "Australia" },
      { id: 4, name: "New Zealand" },
      { id: 5, name: "South Africa" }
    ],
    topT20Teams: [
      { id: 1, name: "Australia" },
      { id: 2, name: "England" },
      { id: 3, name: "India" },
      { id: 4, name: "New Zealand" },
      { id: 5, name: "South Africa" }
    ]
  };
}
