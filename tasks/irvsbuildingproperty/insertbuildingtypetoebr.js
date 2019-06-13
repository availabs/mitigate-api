var dbservice = require('../../db_service');



let getData = `
   select 
   	a.id, a.parcel_id, a.type, st_area(a.footprint) as area,
   	b.prop_class, b.bldg_style, b.sqft_living
   FROM irvs.buildings_2018 as a
   JOIN parcel.parcel_2017_36 as b ON a.parcel_id = b.objectid
   where b.cousub_geoid = '3606144919'

`	


	dbservice.promise(getData).then(d=> {
		//console.log('inserted', d)
		d
		.forEach(building => {
			building.building_type = null;
			// building.foundation_type = null;
			// building.roof_type = null;
			// building.structure_type = null;
			building.num_stories = null;
			building.num_units = null;
			building.basement = false;

			building.prop_class = +building.prop_class; //chnage to numeric
			

			//with NYS property type classification code and NYC bldg style code 


			if(building.type === 'garage') return; // skip last of code and return

			if((building.prop_class > 100 && building.prop_class < 200) || building.prop_class == 241 || building.prop_class == 473 ) {
				building.building_type = 'AGR1'
			    } 

			else if( building.prop_class == 620 || ['M1', 'M2', 'M3', 'M4', 'M9'].includes(building.bldg_style) ) {
				building.building_type = 'REL1'// churches 
			    } 

			else if ([210, 215, 250, 260, 280, 283].includes(building.prop_class) 
				|| ['A0', 'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'].includes(building.bldg_style)) {
				building.building_type = 'RES1' //single family dwelling
				building.num_units = 1} 


			else if ([270, 271].includes(building.prop_class) || ['CM'].includes(building.bldg_style)) {
				building.building_type = 'RES2' //manuf housing
				//building.num_units = 1
				building.num_stories = 1
				building.basement = false}  

			else if(building.prop_class == 220 || ['B1', 'B2', 'B3', 'B9'].includes(building.bldg_style)) {
				building.building_type = 'RES3A'// duplex
				building.num_units = 2} 

			else if(building.prop_class == 230 || ['C0'].includes(building.bldg_style)) {
				building.building_type = 'RES3B' //triplex
				building.num_units = 3} 

			else if(building.prop_class == 281 || ['C2','C3', 'R0', 'R1', 'R2', 'R3', 'R6'].includes(building.bldg_style)) { //??
				building.building_type = 'RES3C' // 5-9 dwellings	 
				} 

  	   	    else if( [ 'C1', 'C7'].includes(building.bldg_style)) { 
				building.building_type = 'RES3D' // 10-19 dwellings
				} 

			/*else if(building.prop_class ==   || [ ].includes(building.bldg_style)) { //??
				building.building_type = 'RES3E'
				 // 20-49 dwellings
				} */
	
			else if(building.prop_class == 411 || ['C6', 'C7', 'C8', 'C9', 'D0', 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'RR', 'R4'].includes(building.bldg_style)) { 
				building.building_type = 'RES3F' // 50+ unit --apartments
				} 
			
			else if([414,415].includes(building.prop_class) || ['HB','HH', 'HR', 'HS', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H9','P2','RH'].includes(building.bldg_style)) { 
				building.building_type = 'RES4' // hotel motel
				} 

			else if(building.prop_class == 418 || ['H8'].includes(building.bldg_style)) { 
				building.building_type = 'RES5' // domitories
				} 

  			else if(building.prop_class == 633 || ['I6'].includes(building.bldg_style)) { 
				building.building_type = 'RES6' // nursing home
				} 
   

   			else if([431,432,434,435,436,450,451,452,453,454,455,474,475,485,486].includes(building.prop_class) 
   				|| ['G3', 'G4', 'G5', 'G8', 'G9', 'GU', 'GW', 'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K8', 'K9', 'L8'].includes(building.bldg_style)) { 
				building.building_type = 'COM1' // retail trade
				} 

   			else if([440,441,442,443,444,445,446,447,448,449].includes(building.prop_class) || ['F1', 'F2','F3', 'F4', 'F7', 'F9', 'RW'].includes(building.bldg_style)) { 
				building.building_type = 'COM2' // wholesale trade
				} 


			else if([433].includes(building.prop_class) || ['G2'].includes(building.bldg_style)) { 
				building.building_type = 'COM3' // personal and repair
				} 

			else if([464,465,470,471,483, 831,832,833,834,835,836,837].includes(building.prop_class) || ['O1', 'O2','O3','O4','O5','O6','O7','O8'].includes(building.bldg_style)) { 
				building.building_type = 'COM4' // professional/technical
				}
			else if([460,461,462,463].includes(building.prop_class) || ['O9','K7'].includes(building.bldg_style)) { 
				building.building_type = 'COM5' // bank
				}
			else if([641].includes(building.prop_class) || ['I1','I2','I3','I4','I5','I7','I9'].includes(building.bldg_style)) { 
				building.building_type = 'COM6' // hospital
				}
		
			else if([472,642].includes(building.prop_class) || ['I5','I7','I9'].includes(building.bldg_style)) { 
				building.building_type = 'COM7' // medical office/clinic
				}
			else if([416,417,420,421,423,424,425,426,510,514,515,520,521,522,530,531,532,533,534,540,541,542,543,544,545,546,
				550,551,552,553,554,555,556,557,560,570,580,581,582,583,590,591,592,593,910,920].includes(building.prop_class) 
				|| ['P1','P3','P4','P5','P6','Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8','Q9','Z0'].includes(building.bldg_style)) { 
				building.building_type = 'COM8' // entertainment
				}

			else if([511,512,513].includes(building.prop_class) || ['J1','J2','J3','J4','J5','J6','J7','J8','J9'].includes(building.bldg_style)) { 
				building.building_type = 'COM9' // theaters
				}
			else if([437,438,439, 10].includes(building.prop_class) || ['RG','G0','G1','G6','G7','RP','Z2'].includes(building.bldg_style)) { 
				building.building_type = 'COM10' // parking
				}

			else if([612,614,615].includes(building.prop_class) || ['W1','W2','W3','W4', 'W7','W8','W9'].includes(building.bldg_style)) { 
				building.building_type = 'EDU1' // grade school
				}

			else if(building.prop_class == 613 || ['W5','W6'].includes(building.bldg_style)) {
				building.building_type ='EDU2' // colleges
				}
 
			else if([611,630,631,632,651,652,653, 670,680,681,682,690,691,692,693,694,695,821,
				822,823,826,827,841,930,931,932,941,942,950,960,961,962,963,980,990,991,992,993,994].includes(building.prop_class) 
				|| ['P7','P8','P9','T1', 'T2', 'T9', 'U1', 'U7', 'Y3', 'Y5', 'Y6', 'Y7', 'Y8', 'Y9', 'Z1', 'Z3', 'Z4', 'Z5'].includes(building.bldg_style)) { 
				building.building_type = 'GOV1' // general services
				}


			else if([661,662].includes(building.prop_class) || ['Y1', 'Y2'].includes(building.bldg_style)) { 
				building.building_type = 'GOV2' // emergency response
				}


			else if([715,850,852,853,854,860,861,862,866,867,868,
				869,870,871,872,873,874,875,876,877,880,882,883,884,885].includes(building.prop_class) || ['F1'].includes(building.bldg_style)) { 
				building.building_type = 'IND1' // heavy ind
				}

			else if([714].includes(building.prop_class) || ['F4','F5', 'F9'].includes(building.bldg_style)) { 
				building.building_type = 'IND2' // light ind
				}

			else if( ['F8'].includes(building.bldg_style)) { 
				building.building_type = 'IND3' // FOOD, DRUGS, CHEMICALS
				}

			else if([720,30,731,732,733,734,735,736].includes(building.prop_class)) { 
				building.building_type = 'IND4' // metals/minerals processing
				}

			else if([712].includes(building.prop_class) || ['U0', 'U2', 'U4', 'U5', 'U6'].includes(building.bldg_style)) { 
				building.building_type = 'IND5' // high tech
				}

			else if( ['F2'].includes(building.bldg_style)) { 
				building.building_type = 'IND6' // construction
			}

			//console.log(building)
			// let update = `update ebr set building_type = ${d.building_type} where building_id = ${d.building_id}`
			// dbservice.query(update)

		})

		// d is completed date

		console.log('inserted', d)

		dbservice.end();
	})

