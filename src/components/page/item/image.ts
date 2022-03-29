export class ImageComponent {
  private element: HTMLElement;
  constructor(title: string, url: string) { // 사용자에게 입력받은 데이터를 설정
    // template 태그를 이용해 어떠한 요소들을 내부적으로 만들 수 있도록
    const template = document.createElement('template');
    // ↓ 이것이 실제로 컨텐츠가 됨. 이것들을 활용해 이미지 URL과 title을 설정함
    template.innerHTML = `<section class="image">
  <div class="image__holder">
    <img class="image__thumbnail">
  </div>
  <p class="image__title"></p>
</section>`;
    // 포인트는 사용자에게 전달받은 데이터를 innerHTML에 설정하지 않고 
    // 필요한 부분만 업데이트해 주는 것이 더 안전!
    // template 안에 있는 첫 번재 자식은 `<section..` 이 아이들! 
    // null 아니고 HTMLElement야 Type Assertion을 사용 코드를 작성하는 이 시접에 정확하게 알 수 있으면!
    this.element = template.content.firstElementChild! as HTMLElement;

    const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
    imageElement.src = url;
    imageElement.alt = title;

    const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement;
    titleElement.textContent = title;
  }

  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }
}