export interface CreateTaskDto {
  title: string;
  description: string;
  doneTime: Date;
  remindeTime: Date;
  isCompleted: boolean;
}