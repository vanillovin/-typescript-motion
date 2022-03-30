import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

// 섹션을 감쌀 수 있는 컨테이너는 무조건 Component와 Composable 인터페이스를 구현해야 되고
// 하나 더 추가적으로 setOnCloseListener라는 API가 있어야 한다라고 규격을 할 수 있음 
interface SectionContainer extends Component, Composable {
  setOnCloseListener(listener: OnCloseListener): void;
}

// 생성자를 정의하는 타입
// 아무런 것도 전달받지 않는 생성자인데 이 생성자가 호출이 되면
// SectionContainer를 만드는 그 어떤 클래스라도 괜찮다라고 타임을 정의
// SectionContainer라는 이 interface의 규격을 따라가는 그 어떤 클래스라도 이 타입에 맞음
type SectionContainerConstructor = {
  new (): SectionContainer;
}

// 이제 PageItemComponent는 SectionContainer 하나만 구현하면 됨
export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
  private closeListener?: OnCloseListener; // 외부로부터 전달받은 콜백 함수를 저장하고 있을 변수

  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
  }
  
  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener; // 전달받은 listener로 등록
  }
}

// 이제 PageComponent는 정해진 어떤 특정한 클래스를 만드는 것이 아니라 
// constructor에 전달된 SectionContainerConstruct 타입의 아이를 생성함
export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  // 어떤 타입의 데이터를 만들 수 있는지 전달해서 내부에서만 볼 수 있는 private으로 설정
  constructor(private pageItemConstructor: SectionContainerConstructor) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    // const item = new PageItemComponent(); 한 가지만 내부에서 결정해서 만드는 것은 나쁨
    // 내부에서 한 가지 클래스를 만드는 것이 아니라 외부에서 전달된 pageItemConstructor를 이용해 만듦 
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
    item.setOnCloseListener(() => {
      item.removeFrom(this.element);
    });
  }
}