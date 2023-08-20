import { Body, Injectable } from '@nestjs/common';
import { Reader } from 'src/utils/reader/reader';
import { getFromJson } from 'src/utils/reader/typesOfReader';

const reader = new Reader('db/todos.json');

@Injectable()
export class TodoService {
  async getTodos(): Promise<getFromJson[]> {
    const data = await reader.read();

    return data;
  }

  async post(itemData: {
    text: string;
    title: string;
    isCompleted: boolean;
  }): Promise<getFromJson> {
    const data: getFromJson[] = await reader.read();

    const id: number = (data[data.length - 1]?.id || 0) + 1;

    const information: getFromJson = {
      text: itemData.text,
      title: itemData.title,
      isCompleted: itemData.isCompleted,
      id,
    };

    await reader.write(!data.length ? [information] : [...data, information]);

    return information;
  }

  async put(itemData: {
    text: string;
    title: string;
    id: number;
  }): Promise<string> {
    const data = await reader.read();

    const changed = data.map((item) => {
      if (item.id === itemData.id) {
        item.text = itemData.text;
        item.title = itemData.title;

        return item;
      }

      return item;
    });

    await reader.write(changed);

    return 'success';
  }

  async remove(itemData: { id: number }): Promise<string> {
    const data: getFromJson[] = await reader.read();

    const changed = data.filter((item) => item.id !== itemData.id);

    await reader.write(changed);

    return 'deleted';
  }
}
