import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Reader } from 'src/utils/reader/reader';
import { getFromJson } from 'src/utils/reader/typesOfReader';
import { TodoService } from './todo.service';
const reader = new Reader('db/todos.json');

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  getAll() {
    return this.todoService.getTodos();
  }

  @Post()
  post(
    @Body() itemData: { text: string; title: string; isCompleted: boolean },
  ) {
    return this.todoService.post(itemData);
  }

  @Put()
  edit(
    @Body() itemData: { text: string; title: string; id: number },
  ): Promise<string> {
    return this.todoService.put(itemData);
  }

  @Delete()
  async delete(@Body() dataItem: { id: number }): Promise<string> {
    return this.todoService.remove(dataItem);
  }
}
