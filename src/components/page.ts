export class PageComponent {
  private element: HTMLUListElement; // 내부 state. 카드들의 목록
  constructor() {
    this.element = document.createElement('ul');
    this.element.setAttribute('class', 'page');
    this.element.textContent = 'This is PageComponent';
  }

  // 외부에서 이 페이지를 추가할 수 있는 api / parent 컨테이너 안에 있는 
  // 어딘가에 자식 요소들 어딘가에 슉 하고 추가할 수 있는 API
  // 얘를 호출해야지만 전달받은 parent 요소에 우리가 만든 DOM 요소를 붙여줌
  // type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend";
  attachTo(
    parent: HTMLElement, // 부모 컨테이너 - HTML의 어떤 Element든
    position: InsertPosition = 'afterbegin' // 어디에다가 추가할 건지
  ) {
    parent.insertAdjacentElement(position, this.element);
  }
}