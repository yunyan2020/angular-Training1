export interface IPerson{
  name: string;
  id: number;
  phoneNr: number;
  city: string;
}

export interface ITableItem extends IPerson {
  employmentYear: string;
  salary: number;
}

