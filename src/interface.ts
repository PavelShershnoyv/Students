export interface IUser {
  id: number
  email: string
  name: string
  sex: string
  specialty: string
  group: string
  color: string
  rating: number
  birthday: string
  avatar: string
}

export interface IInitState {
  data: IStudents,
  status: string,
  error: string
}

export interface IOptions {
  value: string,
  label: string
}

export interface IStudents {
  students: IUser[];
}