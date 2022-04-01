import { BaseComponent } from '../../component.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
            <div class="video__player">
              <iframe class="video__iframe"></iframe>
            </div>
            <h3 class="page-item__title video__title"></h3>
          </section>`);

    const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
    iframe.src = this.convertToEmbeddedURL(url); // url -> videoId -> embed

    // URL을 비디오 Id로 변환해서 우리가 이런 형태의 임베디드 코드로 변환해줘야 함
    const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  // input
  // https://www.youtube.com/watch?v=K3-jG52XwuQ
  // https://youtu.be/K3-jG52XwuQ
  // output
  // https://www.youtube.com/embed/K3-jG52XwuQ
  // 정규표현식 Regex
  // https://regexr.com/5l6nr
  
  // url을 받아 임베디드용으로 변환된 string을 리턴하는 내부적으로 쓰이는 함수 
  // [a-zA-Z0-9-] => [a-zA-Z0-9(-|_)] 이렇게 하면 언더바인것도 가져올수 있어요!
  private convertToEmbeddedURL(url: string): string {
    const regExp = /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);

    console.log(match);

    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      // 임베디드용 주소 리턴
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // placeholder나 지원하지 않는 URL이라고 사용자에게 impormative한 좋은 정보를 줄 수 있음
    return url;
  }
}

  // <iframe 
  //   width="1077" 
  //   height="615" 
  //   src = "https://www.youtube.com/embed/SNBaIAvKxU4"
  //   title = "YouTube video player"
  //   frameborder = "0"
  //   allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
  //   allowfullscreen
  // ></iframe>