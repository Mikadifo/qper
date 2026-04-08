export interface Issue {
  id: number;
  title: string;
  description: string;
  steps: string;
  expectedResult: string;
  actualResult: string;
  createdAt: Date;
}
