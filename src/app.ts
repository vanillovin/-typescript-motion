import { VideoComponent } from './components/page/item/video.js';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent, PageItemComponent } from './components/page/page.js';
import { Component } from './components/component.js';

class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    // this.page = new PageComponent();
    // 이제 어떤 PageItemComponent를 만들 수 있는지 타입을 알려주기
    // PageComponent야 네가 만들 수 있는 PageItemComponent는 바로 이 클래스야
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
    this.page.addChild(image);
    
    const video = new VideoComponent('Video Title', 'https://youtu.be/SNBaIAvKxU4');
    this.page.addChild(video);
    
    const note = new NoteComponent('Note Title', 'Note Body');
    this.page.addChild(note);
    
    const todo = new TodoComponent('Todo Title', 'Todo Item');
    this.page.addChild(todo);
  }
}

new App(document.querySelector('.document')! as HTMLElement);