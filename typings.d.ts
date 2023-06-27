export interface ICard {
	id: string;
	name: string;
	detail: string;
	type: string;
	prices: number;
	img_url: string;
}
export interface ICardUser {
	id: string;
	name: string;
	detail: string;
	type: string;
	prices: number;
	img_url: string;
	refresh : any;
	refreshMain : any;
}

export interface IUser {
	id: string;
	password: string;
	admin: boolean;
	point: number;
}

export interface ICardType {
	id: number;
	name: string;
}

export interface ICardInUser {
	user_id: string;
	card_id: string;
}

export interface ILogBuy {
	id: string;
	user_id: string;
	card_id: string;
	date_time: string;
}

export interface ILogEvent {
	id: string;
	user_id: string;
	card: ICard[];
	target_id?: string;
	date_time: string;
}

export interface ICardEvent {
	id: number;
	event_log_id: string;
	card_id: string;
}

export interface ISystemSetting {
	id: number;
	name: string;
	is_open: boolean;
}

export interface getUsersResponse {
	code: string;
	data: {
		user_id: string;
		point: number;
	}[]
}

export interface getUserByIdResponse {
	code: string;
    data: {
        id: string;
        point: number;
        admin: number;
        cards: ICard[];
    };
}

export interface getLogBuyResponse {
	code: string;
	data: ILogBuy[];
}

export interface getLogEventResponse {
	code: string;
	data: ILogEvent[];
}

export interface getLogEventResponseNew {
	code: string;
	data: {
		id : number;
		user_id : string;
		at_card_id :{
			id : string;
			name : string;
			details : string;
			type : string;
			price : number;
			img_url : string;
		};
		bf_card_id :{
			id : string;
			name : string;
			details : string;
			type : string;
			price : number;
			img_url : string;
		};
		df_card_id :{
			id : string;
			name : string;
			details : string;
			type : string;
			price : number;
			img_url : string
		};
		target_id : string;
		detail: string;
		date_time: string;
	}[];
}

export interface arrayUser {
	id: string;
	point: number;
	admin: number;
	card_count: number;
}
export interface getAllUser {
	code: string;
	data: {
		id: string;
		point: number;
		admin: number;
		card_count: number;
	}[]
}
export interface groupPoint {
	user_id: string,
	update_point: int
}

export interface scoreSummary{
	id : string,
	point: number,
	addPoint : number
}

export interface upDatePointAll {
	admin: string;
	points: {
		user_id: string,
		update_point: int
	}[]
}

export interface typeRowGrup {
	id: string;
	point: number;
	admin: number;
	card_count: number;
}

export interface getCardsResponse {
	code: string;
	data: ICard[];
}