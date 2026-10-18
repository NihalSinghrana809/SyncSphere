export interface WorkoutSession {
	id:string;
	title:string;
	type:"HIIT"|"Interval Run"|"Strength"|"Cycling"|"Recovery";
	timeAgo:string;
	durationMin:number;
	calories:number;
	avgHeartRate:number;
	maxHeartRate:number;
	strainScore:number;
}
