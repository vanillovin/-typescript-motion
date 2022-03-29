import { BaseComponent } from '../component.js';

export class PageComponent extends BaseComponent<HTMLUListElement> {
  constructor() {
    // super를 이용해 부모 클래스의 생성자를 호출
    super('<ul class="page">This is PageComponenet!</ul>');
  }
}