export interface RaffleResponse {
  data: Data;
  code: number;
  message?: string;
  status: string;
};

export interface Data {
  id: number;
  raffleSequence: RaffleSequence[];
};

export interface RaffleSequence {
  givingPerson: Person;
  receivingPerson: Person;
};

export interface Person {
  id: number;
  name: string;
};
export interface Group {
  name: string;
  people: Person[];
};

export interface RaffleRequest {
  People: Person[];
  Groups: Group[];
};