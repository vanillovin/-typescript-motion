import { BaseComponent } from '../../component.js'

// ImageComponent는 BaseComponent를 상속하고 사용하고 싶은 HTML 스트링을
// contructor에 전달할 수 있고 필요한 title과 URL을 업데이트해 주는구나
export class ImageComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="image">
            <div class="image__holder"><img class="image__thumbnail"></div>
            <h2 class="page-item__title"></h2>
          </section>`);

    // 부모 클래스에서 this.element를 만든 다음 필요한 데이터를 업데이트
    const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
    imageElement.src = url;

    const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement;
    titleElement.textContent = title;
  }
}