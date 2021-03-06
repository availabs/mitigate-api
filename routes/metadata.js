let META_DATA = {
    HAZARD_META :{
        'wind':{id:'wind', name:'Wind', description: '', sheldus: "Wind", zones: []},
        'wildfire':{id:'wildfire', name:'Wildfire', description: '', sheldus: "Wildfire", zones: []},
        'tsunami':{id:'tsunami', name:'Tsunami/Seiche', description: '', sheldus: "Tsunami/Seiche", zones: []},
        'tornado':{id:'tornado', name:'Tornado', description: '', sheldus: "Tornado", zones: []},
        'riverine':{id:'riverine', name:'Flooding', description: '', sheldus: "Flooding", zones: ['X', 'A', 'AR','AE','AO','VE']},
        'lightning':{id:'lightning', name:'Lightning', description: '', sheldus: "Lightning", zones: []},
        'landslide':{id:'landslide', name:'Landslide', description: '', sheldus: "Landslide", zones: []},
        'icestorm':{id:'icestorm', name:'Ice Storm', description: '', sheldus: "", zones: []},
        'hurricane':{id:'hurricane', name:'Hurricane', description: '', sheldus: "Hurricane/Tropical Storm", zones: []},
        'heatwave':{id:'heatwave', name:'Heat Wave', description: '', sheldus: "Heat", zones: []},
        'hail':{id:'hail', name:'Hail', description: '', sheldus:"Hail", zones: []},
        'earthquake':{id:'earthquake', name:'Earthquake', description: '', sheldus: "Earthquake", zones: []},
        'drought':{id:'drought', name:'Drought', description: '', sheldus: "Drought", zones: []},
        'avalanche':{id:'avalanche', name:'Avalanche', description: '', sheldus: "Avalanche", zones: []},
        'coldwave':{id:'coldwave', name:'Coldwave', description: '', zones: []},
        'winterweat':{id:'winterweat', name:'Snow Storm', description: '', sheldus: "Winter Weather", zones: []},
        'volcano':{id:'volcano', name:'Volcano', description: '', zones: []},
        'coastal': {id:'coastal', name:'Coastal Hazards', description:'',sheldus: "Coastal Hazards", zones: []},

        // --------- No Data ---------------//
        // expansive_soil: {id: 'expansive_soil', name: 'Expansive Soil', sheldus: '' },
        // landsubsidence: {id: 'landsubsidence', name: 'Land Subsidence' },
        // sealevel: {id: 'Sea Level', name: 'Sea Level'},

    },

    RISK_ZONES :{
        'wind':{id:'wind', name:'Wind', description: '', sheldus: "Wind", zones: []},
        'wildfire':{id:'wildfire', name:'Wildfire', description: '', sheldus: "Wildfire", zones: []},
        'tsunami':{id:'tsunami', name:'Tsunami/Seiche', description: '', sheldus: "Tsunami/Seiche", zones: []},
        'tornado':{id:'tornado', name:'Tornado', description: '', sheldus: "Tornado", zones: []},
        'flood_zone':{id:'flood_zone', name:'Flooding', description: '', sheldus: "Flooding", zones: ['X', 'A', 'AR','AE','AO','VE']},
        'lightning':{id:'lightning', name:'Lightning', description: '', sheldus: "Lightning", zones: []},
        'landslide':{id:'landslide', name:'Landslide', description: '', sheldus: "Landslide", zones: []},
        'icestorm':{id:'icestorm', name:'Ice Storm', description: '', sheldus: "", zones: []},
        'hurricane':{id:'hurricane', name:'Hurricane', description: '', sheldus: "Hurricane/Tropical Storm", zones: []},
        'heatwave':{id:'heatwave', name:'Heat Wave', description: '', sheldus: "Heat", zones: []},
        'hail':{id:'hail', name:'Hail', description: '', sheldus:"Hail", zones: []},
        'earthquake':{id:'earthquake', name:'Earthquake', description: '', sheldus: "Earthquake", zones: []},
        'drought':{id:'drought', name:'Drought', description: '', sheldus: "Drought", zones: []},
        'avalanche':{id:'avalanche', name:'Avalanche', description: '', sheldus: "Avalanche", zones: []},
        'coldwave':{id:'coldwave', name:'Coldwave', description: '', zones: []},
        'winterweat':{id:'winterweat', name:'Snow Storm', description: '', sheldus: "Winter Weather", zones: []},
        'volcano':{id:'volcano', name:'Volcano', description: '', zones: []},
        'coastal': {id:'coastal', name:'Coastal Hazards', description:'',sheldus: "Coastal Hazards", zones: []},

        // --------- No Data ---------------//
        // expansive_soil: {id: 'expansive_soil', name: 'Expansive Soil', sheldus: '' },
        // landsubsidence: {id: 'landsubsidence', name: 'Land Subsidence' },
        // sealevel: {id: 'Sea Level', name: 'Sea Level'},

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

    // Uncategorized:
    // "Toxic Substances"
    // "Fishing Losses"
    // "Dam/Levee Break"
    // "Terrorist"
    // "Other"
    // "Chemical"
    // "Human Cause"
    hazards2femadisasters: {
        'wind': [
        ],
        'wildfire': [
            "Fire"
        ],
        'tsunami': [
            "Tsunami"
        ],
        'tornado': [
            "Tornado"
        ],
        'riverine': [
            "Flood",
            "Severe Storm(s)"
        ],
        'lightning': [
        ],
        'landslide': [
            "Mud/Landslide"
        ],
        'icestorm': [
            "Severe Ice Storm"
        ],
        'hurricane': [
            "Hurricane",
            "Typhoon"

        ],
        'heatwave': [
        ],
        'hail': [
        ],
        'earthquake': [
            "Earthquake"
        ],
        'drought': [
            "Drought"
        ],
        'avalanche': [
        ],
        'coldwave': [
            "Freezing"
        ],
        'winterweat': [
            "Snow"
        ],
        'volcano': [
            "Volcano"
        ],
        'coastal': [
            "Coastal Storm"
        ]
    },

    hazards2severeWeather: {
        // Uncategorized:
        // "Marine Dense Fog"
        // "OTHER"
        // "Dust Storm"
        // "Astronomical Low Tide"
        // "Northern Lights"
        // "Dense Smoke"
        // "Freezing Fog"
        // "Dust Devil"
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
            "THUNDERSTORM WINDS/ FLOOD",
            'Coastal Flood',
            'Lakeshore Flood'

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
        'icestorm': ['Ice Storm', "Sleet"],
        'hurricane': [
            'Hurricane',
            'Hurricane (Typhoon)',
            "Marine Hurricane/Typhoon",
            "Marine Tropical Storm",
            "Tropical Storm",
            "Tropical Depression",
            "Marine Tropical Depression",
            'Hurricane Flood'
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
            'Extreme Cold/Wind Chill',
            "Frost/Freeze",
            "Cold/Wind Chill"

        ],
        'winterweat': [
            'Winter Weather',
            'Winter Storm',
            'Heavy Snow',
            'Blizzard',
            "High Snow",
            "Lake-Effect Snow"
        ],
        'volcano': [
            'Volcanic Ash',
            'Volcanic Ashfall'
        ],
        'coastal': [
            'High Surf',
            "Sneakerwave",
            "Storm Surge/Tide",
            "Rip Current"
        ]
    }, // END hazards2severeWeather

    secondary: ['builtenv', 'sovist', 'sovi', 'bric','nri']
}

META_DATA.hazards = Object.keys(META_DATA.HAZARD_META);

// Populates mappings from severe weather names to hazard ids
META_DATA.severeWeather2hazards = {};
for (const hazard in META_DATA.hazards2severeWeather) {
    const swArray = META_DATA.hazards2severeWeather[hazard];
    swArray.forEach(sw => {
        META_DATA.severeWeather2hazards[sw] = hazard;
    })
}

// Populates mappings from fema disasters to hazard ids
META_DATA.femadisasters2hazards = {}
for (const hazard in META_DATA.hazards2femadisasters) {
    const swArray = META_DATA.hazards2femadisasters[hazard];
    swArray.forEach(sw => {
        META_DATA.femadisasters2hazards[sw] = hazard;
    })
}

module.exports = META_DATA;