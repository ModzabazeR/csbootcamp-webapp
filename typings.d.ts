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
  point: number;
  admin: number;
  card_count: number;
}

export interface ICardUser {
  id: string;
  name: string;
  detail: string;
  type: string;
  prices: number;
  img_url: string;
  refresh: any;
  refreshMain: any;
}

export interface IGroupPointUpdate {
  user_id: string;
  update_point: int;
}

export interface IScoreSummary {
  id: string;
  point: number;
  addPoint: number;
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

export interface getLogEventResponse {
  code: string;
  data: {
    id: number;
    user_id: string;
    at_card_id: ICard;
    bf_card_id: ICard;
    df_card_id: ICard;
    target_id: string;
    detail: string;
    date_time: string;
  }[];
}

export interface getUsersResponse {
  code: string;
  data: IUser[];
}

export interface getCardsResponse {
  code: string;
  data: ICard[];
}
