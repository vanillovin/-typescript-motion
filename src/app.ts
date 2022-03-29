import { PageComponent } from './components/page.js';

// App 클래스는 전달받은 최고의 컨테이너 안에
class App {
  private readonly page: PageComponent;
  constructor(appRoot: HTMLElement) {
    this.page = new PageComponent(); // 페이지라는 컴포넌트를 만들어서
    this.page.attachTo(appRoot); // 만들어진 페이지를 뺨 하고 붙여주는 일
  }
}

// querySelector은 기본적으로 Element 타입 또는 null을 리턴할 수 있는 아이
// 하지만 이 클래스 document를 가지고 있는 요소를 동적으로 만드는 것이 아니라
// 앱을 실행하면서 무언가가 변경되는 것이 아니라 개발할 때 정확하게 정해져 있기 때문에
// 이런 경우엔 확신 있게 무조건 null 아니고 HTMLElement 타입이야라고 Type Assertion 사용할 수 있음
new App(document.querySelector('.document')! as HTMLElement);