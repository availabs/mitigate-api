const CENSUS_DATA_API_KEY = require("./censusDataApiKey");

const EARLIEST_DATA_YEAR = 2009;
const LATEST_DATA_YEAR = 2016;

let AVAILABLE_DATA_YEARS = {};

const populateAvailableDataYears = () => {
	for (let i = EARLIEST_DATA_YEAR; i <= LATEST_DATA_YEAR; ++i) {
		AVAILABLE_DATA_YEARS[i] = true;
	}
}
populateAvailableDataYears();

const makeBaseCensusApiUrl = year => {
	if (!AVAILABLE_DATA_YEARS[year]) return null;
	return "https://api.census.gov/data/" +
		`${ year }/` +
		`${ (year > 2014) ? 'acs/' : '' }` +
		`acs5?` + 
		`key=${ CENSUS_DATA_API_KEY }` +
		`&get=B01003_001E,`+ // population
			`B01001_003E,` + // males under 5
			`B01001_027E`    // females under 5
}

class Geoid {
	constructor(geoid) {
		geoid = geoid.toString();

		this.length = geoid.length;

		this.state = geoid.slice(0, 2);

		this.county = null;
		this.cousub = null;
		this.tract = null;

		switch (geoid.length) {
			case 5:
				this.county = geoid.slice(2);
				break;
			case 10:
				this.county = geoid.slice(2, 5);
				this.cousub = geoid.slice(5);
				break;
			case 11:
				this.county = geoid.slice(2, 5);
				this.tract = geoid.slice(5);
				break;
		}
	}
}

const makeCensusApiUrl = (_geoid, year) => {
	let url = makeBaseCensusApiUrl(year);
	if (url == null) return null;

	const geoid = new Geoid(_geoid);

	switch (geoid.length) {
		case 2:
			url += `&for=state:${ geoid.state }`;
			break;
		case 5:
			url += `&for=county:${ geoid.county }`
			url += `&in=state:${ geoid.state }`
			break;
		case 10:
			url += `&for=county+subdivision:${ geoid.cousub }`
			url += `&in=state:${ geoid.state }+county:${ geoid.county }`
			break;
		case 11:
			url += `&for=tract:${ geoid.tract }`
			url += `&in=state:${ geoid.state }+county:${ geoid.county }`
			break;
		default:
			return null;
	}
	return url;
}

module.exports = {
	fillCensusApiUrlArray: (geoids, years) => {
		let urlArray = [];
		geoids.forEach(geoid => {
			years.forEach(year =>
				urlArray.push(
					[geoid, year, makeCensusApiUrl(geoid, year)]
				)
			)
		})
		return urlArray.filter(([geoid, year, url]) => Boolean(url));
	}
}