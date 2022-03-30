import { BaseComponent, Component } from '../component.js';

export interface Composable {
  addChild(child: Component): void;
}

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
  constructor() {
    super(`<li class="page-item">
            <section class="page-item__body"></section>
            <div class="page-item__controls">
              <button class="close">&times;</button>
            </div>
          </li>`);
  }
  // 외부에서 어떤 아이템을 전달하냐에 따라서 위 section 안에 추가
  addChild(child: Component) {
    const container = this.element.querySelector('.page-item__body')! as HTMLElement;
    child.attachTo(container);
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor() {
    // super를 이용해 부모 클래스의 생성자를 호출
    super('<ul class="page"></ul>');
  }

  // Video가 될 수도 있고 Note가 될 수도 있고 아이템의 종류는 다양
  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
  }
}