import { VideoComponent } from './components/page/item/video.js';
import { TodoComponent } from './components/page/item/todo.js';
import { NoteComponent } from './components/page/item/note.js';
import { ImageComponent } from './components/page/item/image.js';
import { Composable, PageComponent } from './components/page/page.js';
import { Component } from './components/component.js';

// App 클래스는 전달받은 최고의 컨테이너 안에
class App {
  private readonly page: Component & Composable;
  constructor(appRoot: HTMLElement) {
    // 안에서 다른 어떤 다른 클래스를 만든다는 것은 사실 조금 위험함
    // 이런 것들은 다 의존관계 주입(Dependency Injection)을 이용해서 
    // 외부로부터 주입을 받는 것이 더 확장 가능하고 나중에 유닛 테스트하기에도 더 좋음
    this.page = new PageComponent(); // 페이지라는 컴포넌트를 만들어서
    this.page.attachTo(appRoot); // 만들어진 페이지를 appRoot에 추가해주고

    // 생성자 안에는 아직 사용자에게 데이터를 받는 다이얼로그가 없으므로 임의
    const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
    this.page.addChild(image); // <- image.attachTo(appRoot, 'beforeend');
    
    const video = new VideoComponent('Video Title', 'https://youtu.be/SNBaIAvKxU4');
    this.page.addChild(video); // <- video.attachTo(appRoot, 'beforeend');
    
    const note = new NoteComponent('Note Title', 'Note Body');
    this.page.addChild(note); // <- note.attachTo(appRoot, 'beforeend');
    
    const todo = new TodoComponent('Todo Title', 'Todo Item');
    this.page.addChild(todo); // <- todo.attachTo(appRoot, 'beforeend');
  }
}

// querySelector은 기본적으로 Element 타입 또는 null을 리턴할 수 있는 아이
// 하지만 이 클래스 document를 가지고 있는 요소를 동적으로 만드는 것이 아니라
// 앱을 실행하면서 무언가가 변경되는 것이 아니라 개발할 때 정확하게 정해져 있기 때문에
// 이런 경우엔 확신 있게 무조건 null 아니고 HTMLElement 타입이야라고 Type Assertion 사용할 수 있음
new App(document.querySelector('.document')! as HTMLElement);