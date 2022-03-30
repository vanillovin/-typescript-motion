import { Composable } from '../page/page.js';
import { BaseComponent, Component } from './../component.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

// Composable 인터페이스를 구현 - 다이얼로그는 타입에 따라서 다양한 컨텐츠를 추가할 수 있음. Video라면 URL, Note라면 body,,
export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;

  constructor() {
    super(`<dialog class="dialog">
            <div class="dialog__container">
              <button class="close">&times;</button>
              <div id="dialog__body"></div>
              <button class="dialog__submit">ADD</button>
            </div>
          </dialog>`);
    const closeBtn = this.element.querySelector('.close')! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };
    // 항상 이벤트는 내부적으로 처리하는 것이 아니라 외부에서 주입받아서 등록된 리스너가 있다면 호출하는 방식
    const submitBtn = this.element.querySelector('.dialog__submit')! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  // 외부로부터 전달받을 수 있는 리스너를 구현
  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  // Composable interface 구현
  addChild(child: Component) {
    const body = this.element.querySelector('#dialog__body')! as HTMLElement;
    // dialog__body id를 가진 요소를 가지고 와서 HTMLElement로 캐스팅하고 추가!
    child.attachTo(body);
  }
}