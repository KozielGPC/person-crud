export interface ILog {
	_id: string;
	requestTime: string;
	responseTime: string;
	method: string;
	url: string;
	statusCode: number;
	userAgent: string;
	body: any;
	params: Object;
	query: Object;
}
