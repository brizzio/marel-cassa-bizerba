

const useSchedule = () => {

 //pass user id to this function when is operational
 const getUserSchedule = () =>{

    //request info from api

    return (scheduleModel)


 }
  return {
    getUserSchedule
  }
}

export default useSchedule

const scheduleModel = {

    "Day": {
      "Monday": {
        "Name": "Lun",
        "Hours": [
          {
            "from": "10:00",
            "to": "13:30"
          },
          {
            "from": "18:00",
            "to": "22:00"
          }
        ]
      },
      "Tuesday": {
        "Name": "Mar",
        "Hours": [
          {
            "from": "10:00",
            "to": "13:30"
          },
          {
            "from": "18:00",
            "to": "22:00"
          }
        ]
      },
      "Wednesday": {
        "Name": "Mer",
        "Hours": [
          {
            "from": "10:00",
            "to": "13:30"
          },
          {
            "from": "18:00",
            "to": "22:00"
          }
        ]
      },
      "Thursday": {
        "Name": "Gio",
        "Hours": [
          {
            "from": "10:00",
            "to": "13:30"
          },
          {
            "from": "18:00",
            "to": "22:00"
          }
        ]
      },
      "Friday": {
        "Name": "Ven",
        "Hours": [
          {
            "from": "10:00",
            "to": "13:30"
          },
          {
            "from": "18:00",
            "to": "22:00"
          }
        ]
      },
      "Saturday": {
        "Name": "Sab",
        "Hours": []
      },
      "Sunday": {
        "Name": "Dom",
        "Hours": []
      }
    },
    "Options": {
      "timezone": "Europe/Rome",
      "Format": "it-IT"
    },
    "Holidays": {
      "4": [
        {
          "Name": "Pascoa",
          "WeekNo": -1,
          "Day": 12,
          "Year": 2020,
          "Hours": [
            { "from": "1:00", "to": "10:50" },
            { "from": "11:00", "to": "18:00" }
          ]
        },
        {
          "Name": "Pascoa",
          "WeekNo": -1,
          "Day": 21,
          "Year": 2019,
          "Hours": [
            { "from": "1:50", "to": "10:50" },
            { "from": "11:00", "to": "18:00" }
          ]
        }
      ],
      "9": [
        {
          "Name": "Primo Maggio",
          "WeekNo": 1,
          "Day": "Monday",
          "Year": -1,
          "Hours": [
            { "from": "4:50", "to": "09:50" },
            { "from": "11:00", "to": "18:00" }
          ]
        }
      ],
      "12": [
        {
          "Name": "Natale",
          "WeekNo": -1,
          "Day": 25,
          "Year": -1,
          "Hours": [{ "from": "10:00", "to": "22:00" }]
        }
      ]
    }
  }