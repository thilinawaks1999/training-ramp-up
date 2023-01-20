export interface Student {
  id: number;
  name: string;
  gender: string;
  address: string;
  mobile: string;
  birthday: Date;
  age: number;
  inEdit?: boolean | string;
}

export interface PageState {
  skip: number;
  take: number;
}

export interface HomeState {
  home: {
    students: Student[];
    error: string;
    loading: boolean;
  };
}
