export interface UpdateTaskDto {
  title?: string;
  description?: string;
  doneTime?: Date;
  remindeTime?: Date;
  isCompleted?: boolean;
}