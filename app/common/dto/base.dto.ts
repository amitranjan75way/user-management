export interface BaseSchema {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

// this payload interface used for token releted stuff(generate token)
export interface Payload {
  id: string;
  name: string;
  email: string;
  role: string
}
