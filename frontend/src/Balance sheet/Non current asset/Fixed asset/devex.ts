import { getMonthsNumberFromModelStartDate } from "../../../calculates/utils";

export function calcDevexAdditions(
	{
		batteryDuration = 4,
		capexSensitivity = 0,
		operationStartDate = "2028-01-01",
		modelStartDate = "2023-01-01",
		decommissioningEndDate = "2068-06-30"
	}
	:{
		batteryDuration?:number
		capexSensitivity?:number
		operationStartDate?:string
		modelStartDate?:string
		decommissioningEndDate ?:string
	}
) {
	const calcLength =
		getMonthsNumberFromModelStartDate(
			modelStartDate,
			decommissioningEndDate
		) - 1;
	const devexAdditions = [];
	for (let i = 0; i < calcLength; i++) devexAdditions.push(0);
	return devexAdditions;
}
