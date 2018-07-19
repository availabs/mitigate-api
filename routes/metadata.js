let META_DATA = {
  HAZARD_META :{
    'wind':{id:'wind', name:'Wind', description: '', sheldus: "Wind"},
    'wildfire':{id:'wildfire', name:'Wildfire', description: '', sheldus: "Wildfire"},
    'tsunami':{id:'tsunami', name:'Tsunami', description: '', sheldus: "Tsunami/Seiche"},
    'tornado':{id:'tornado', name:'Tornado', description: '', sheldus: "Tornado"},
    'riverine':{id:'riverine', name:'Riverine Flooding', description: '', sheldus: "Flooding"},
    'lightning':{id:'lightning', name:'Lightning', description: '', sheldus: "Lightning"},
    'landslide':{id:'landslide', name:'Landslide', description: '', sheldus: "Landslide"},
    'icestorm':{id:'icestorm', name:'Ice Storm', description: '', sheldus: "Winter Weather"},
    'hurricane':{id:'hurricane', name:'Hurricane', description: '', sheldus: "Hurricane/Tropical Storm"},
    'heatwave':{id:'heatwave', name:'Heat Wave', description: '', sheldus: "Heat"},
    'hail':{id:'hail', name:'Hail', description: '', sheldus:"Hail"},
    'earthquake':{id:'earthquake', name:'Earthquake', description: '', sheldus: "Earthquake"},
    'drought':{id:'drought', name:'Drought', description: '', sheldus: "Drought"},
    'avalanche':{id:'avalanche', name:'Avalanche', description: '', sheldus: "Avalanche"},
    'coldwave':{id:'coldwave', name:'Coldwave', description: ''},
    'winterweat':{id:'winterweat', name:'Snow Storm', description: '', sheldus: "Winter Weather"},
    'volcano':{id:'volcano', name:'Volcano', description: ''},
    'coastal':{id:'coastal', name:'Coastal Flooding', description:'',sheldus: "Coastal"}
  },
  sheldus2hazards: {
    "Wind":'wind',
    "Wildfire":'wildfire',
    "Tsunami/Seiche":'tsunami',
    "Tornado":'tornado',
    "Flooding":"riverine",
    "Lightning":"lightning",
    "Landslide":"landslide",
    "Winter Weather":"winterweat",
    "Hurricane/Tropical":"hurricane",
    "Heat":"heatwave",
    "Hail":"hail",
    "Earthquake":"earthquake",
    "Drought":"drought",
    "Avalanche":"avalanche",
    "Coastal":'coastal'
  },

  hazards2severeWeather: {
  // Uncategorized:
  // "Marine Dense Fog"
  // "OTHER"
  // "Dust Storm" -- wind?
  // "Astronomical Low Tide"
  // "Northern Lights"
  // "Dense Smoke"
  // "Freezing Fog"
  // "Dust Devil" -- wind?
  // "Lakeshore Flood"
  // "HAIL FLOODING"
  // "Heavy Rain"
  // "Dense Fog"
    'wind': [
        'High Wind',
        'Strong Wind',
        'Marine High Wind',
        'Marine Strong Wind',
        'Marine Thunderstorm Wind',
        'Thunderstorm Wind',
        'THUNDERSTORM WINDS LIGHTNING',
        'TORNADOES, TSTM WIND, HAIL',
        'THUNDERSTORM WIND/ TREES',
        'THUNDERSTORM WINDS HEAVY RAIN',
        "Heavy Wind",
        "THUNDERSTORM WINDS/FLASH FLOOD",
        "THUNDERSTORM WINDS/ FLOOD",
        "THUNDERSTORM WINDS/HEAVY RAIN",
        "THUNDERSTORM WIND/ TREE",
        "THUNDERSTORM WINDS FUNNEL CLOU",
        "THUNDERSTORM WINDS/FLOODING"
    ],
    'wildfire': ['Wildfire'],
    'tsunami': [
        'Tsunami',
        "Seiche"
    ],
    'tornado': [
        'Tornado',
        'TORNADOES, TSTM WIND, HAIL',
        "TORNADO/WATERSPOUT",
        "Funnel Cloud",
        "Waterspout"
    ],
    'riverine': [
        'Flood',
        'Flash Flood',
        "THUNDERSTORM WINDS/FLASH FLOOD",
        "THUNDERSTORM WINDS/ FLOOD"
    ],
    'lightning': [
        'Lightning',
        'THUNDERSTORM WINDS LIGHTNING',
        "Marine Lightning"
    ],
    'landslide': [
        'Landslide',
        "Debris Flow"
    ],
    'icestorm': ['Ice Storm'],
    'hurricane': [
        'Hurricane',
        'Hurricane (Typhoon)',
        "Marine Hurricane/Typhoon",
        "Marine Tropical Storm",
        "Tropical Storm"
    ],
    'heatwave': [
        'Heat',
        'Excessive Heat'
    ],
    'hail': [
        'Hail',
        'Marine Hail',
        'TORNADOES, TSTM WIND, HAIL',
        'HAIL/ICY ROADS',
        "HAIL FLOODING"
    ],
    'earthquake': [],
    'drought': ['Drought'],
    'avalanche': ['Avalanche'],
    'coldwave': [
        'Cold/Wind Chill',
        'Extreme Cold/Wind Chill'
    ],
    'winterweat': [
        'Winter Weather',
        'Winter Storm',
        'Heavy Snow',
        'Blizzard',
        'Ice Storm',
        "Frost/Freeze",
        "Cold/Wind Chill",
        "High Snow",
        "Lake-Effect Snow",
        "Sleet",
        "Extreme Cold/Wind Chill"
    ],
    'volcano': [
        'Volcanic Ash',
        'Volcanic Ashfall'
    ],
    'coastal': [
        'Coastal Flood',
        'High Surf',
        "Marine Tropical Storm",
        "Sneakerwave",
        "Storm Surge/Tide",
        "Tropical Depression",
        "Marine Tropical Depression",
        "Rip Current"
    ]
  }, // END hazards2severeWeather

  hazards: ['wind','wildfire','tsunami','tornado','riverine','lightning',
    'landslide','icestorm','hurricane','heatwave','hail','earthquake','drought',
    'avalanche','coldwave','winterweat','volcano','coastal'],
  secondary: ['builtenv', 'sovist', 'sovi', 'bric','nri']
}
function populateSevereWeather2hazards() {
    META_DATA.severeWeather2hazards = {};
    for (const hazard in META_DATA.hazards2severeWeather) {
        const swArray = META_DATA.hazards2severeWeather[hazard];
        swArray.forEach(d => {
            META_DATA.severeWeather2hazards[d] = hazard;
        })
    }
}
populateSevereWeather2hazards();
module.exports = META_DATA;