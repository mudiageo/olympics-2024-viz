let data = {
  "games": "2020 Tokyo",
  "countries": [
    {
      "name": "United States",
      "code": "USA",
      "medals": {
        "gold": 39,
        "silver": 41,
        "bronze": 33,
        "total": 113
      },
      "sports": {
        "Swimming": 30,
        "Athletics": 26,
        "Gymnastics": 6,
        "Shooting": 6,
        "Wrestling": 9,
        "Other": 36
      }
    },
    {
      "name": "China",
      "code": "CHN",
      "medals": {
        "gold": 38,
        "silver": 32,
        "bronze": 18,
        "total": 88
      },
      "sports": {
        "Diving": 7,
        "Weightlifting": 8,
        "Shooting": 11,
        "Table Tennis": 4,
        "Gymnastics": 4,
        "Other": 54
      }
    },
    {
      "name": "Japan",
      "code": "JPN",
      "medals": {
        "gold": 27,
        "silver": 14,
        "bronze": 17,
        "total": 58
      },
      "sports": {
        "Judo": 9,
        "Wrestling": 7,
        "Baseball/Softball": 2,
        "Skateboarding": 5,
        "Gymnastics": 5,
        "Other": 30
      }
    }
    // ... more countries ...
  ],
  "historical": {
    "USA": {
      "2012": 104,
      "2016": 121,
      "2020": 113
    },
    "CHN": {
      "2012": 91,
      "2016": 70,
      "2020": 88
    },
    "JPN": {
      "2012": 38,
      "2016": 41,
      "2020": 58
    }
    // ... more countries and years ...
  }
}



export const load = ({ fetch }) => {
  
   // loading = true;
   // error = null;
    try {
      data = data
      
      
         } catch (err) {
      console.log(err.message)
    //  error = err.message;
    } finally {
   //   loading = false;
    }
  return { ...data}
  
}