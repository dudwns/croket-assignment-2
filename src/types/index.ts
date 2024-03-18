export interface CountListItem {
  combination: string[];
  remainCount: number;
}

export interface Data {
  countList: CountListItem[];
  titleList: string[];
  groupList: { title: string; options: string[] }[];
}

export interface DataResponse {
  _id: string;
  data: Data;
}
