export interface IProduct {
  id?: string;
  name: string;
  rateInterest: number;
  minimumAmount: number;
  maximumAmount: number;
  isActive: boolean;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
