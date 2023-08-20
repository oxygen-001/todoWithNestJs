import { IsNotEmpty, IsNumber } from 'class-validator';

export interface BodyType {
  title: string;
  text: string;
  id: number;
}

export class PostBody {
  @IsNotEmpty()
  text: string

  @IsNotEmpty()
  title: string

  isCompleted: boolean;
}
