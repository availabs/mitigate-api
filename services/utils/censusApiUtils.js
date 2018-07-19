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
	makeUrlAndKey(year) {
		let url = makeBaseCensusApiUrl(year), key;
		if (url !== null) {
			switch (this.length) {
				case 2:
					url += `&for=state:${ this.state }`;
					key = `${ year }-state-${ this.state }`;
					break;
				case 5:
					url += `&for=county:*`;
					url += `&in=state:${ this.state }`;
					key = `${ year }-counties-${ this.state }`;
					break;
				case 10:
					url += `&for=county+subdivision:*`
					url += `&in=state:${ this.state }+county:${ this.county }`
					key = `${ year }-cousubs-${ this.state }-${ this.county }`;
					break;
				case 11:
					url += `&for=tract:*`
					url += `&in=state:${ this.state }+county:${ this.county }`
					key = `${ year }-tracts-${ this.state }-${ this.county }`;
					break;
			}
		}
		return { url, key };
	}
}

module.exports = {
	fillCensusApiUrlArray: (geoids, years) => {
		let urlMap = {};
		geoids.forEach(geoid => {
			years.forEach(year => {
				const geoidObj = new Geoid(geoid),
					{ url, key } = geoidObj.makeUrlAndKey(year);
				urlMap[key] = [year, url];
			})
		})
		return Object.values(urlMap).filter(([year, url]) => Boolean(url));
	}
}