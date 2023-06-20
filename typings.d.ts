export interface ICard {
	id: string;
	name: string;
	detail: string;
	type: string;
	prices: number;
	img_url: string;
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
	id: number;
	user_id: string;
	card_id: string;
	date_time: string;
}

export interface ILogEvent {
	id: number;
	user_id: string;
	target_id?: string;
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
		user_id: string;
		point: number;
		card: Icard[];
	}
}

export interface getAllUser{
	code: string;
	data: {
		user_id: string;
		point: number;
		card: number;
	}[]
}

export interface typeRowGrup {
	user_id: string;
	point: number;
	card: number;
  }

export interface getCardsResponse {
	code: string;
	data: ICard[];
}