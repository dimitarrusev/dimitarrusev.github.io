import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { iframeResizer, IFrameComponent, IFrameOptions } from 'iframe-resizer';
import { RemarkboxIframeOptions } from './shared';

@Component({
  selector: 'dr-remarkbox',
  templateUrl: './remarkbox.component.html',
  styleUrls: ['./remarkbox.component.scss']
})
export class RemarkboxComponent implements OnInit, AfterViewInit, OnDestroy {
  protocol: string = 'https://';
  domain: string = 'dimitarrusev.com';
  path: string;
  remarkboxOwnerKey: string = 'none';
  remarkboxThreadUri: string;
  remarkboxThreadFragment: string;
  remarkboxIframeSrc: string = 'https://my.remarkbox.com';
  remarkboxIframeOptions: RemarkboxIframeOptions;
  remarkboxNoscriptElement: object;
  remarkboxIframeElement: object;
  iframeResizer: IFrameComponent;
  iframeResizerOptions: IFrameOptions;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  ngOnInit() {
    this.route.url.take(1)
                  .subscribe(urlSegments => {
                    const urlSegmentsArr = new Array();

                    urlSegments.forEach((urlSegment, index) => {
                      urlSegmentsArr.push(urlSegment.path);

                      if ((urlSegments.length - 1) === index) {
                        this.path = `/${ urlSegmentsArr.join('/') }`;
                        this.remarkboxThreadUri = `${this.protocol}${this.domain}${this.path}`;
                      }
                    });
                  });

    this.route.fragment.take(1)
                       .subscribe(fragment => {
                         if (fragment) {
                           this.remarkboxThreadFragment = fragment;
                         }
                       });

    this.remarkboxIframeOptions = {
      id: 'remarkbox-iframe',
      scrolling: 'no',
      src: this.remarkboxIframeSrc,
      frameborder: '0',
      tabindex: '0',
      title: 'Remarkbox',
      width: '100%'
    };

    this.iframeResizerOptions = {
      checkOrigin: false,
      inPageLinks: true,
      initCallback: (iframeResizer: IFrameComponent): void => {
        if (this.remarkboxThreadFragment) {
          iframeResizer.iFrameResizer.moveToAnchor(this.remarkboxThreadFragment);
        }
      }
    };

    if (isPlatformServer(this.platformId)) {
      this.remarkboxNoscriptElement = this.createNoscriptElement();
      this.renderer.appendChild(this.elementRef.nativeElement, this.remarkboxNoscriptElement);
    }

    if (isPlatformBrowser(this.platformId)) {
      this.remarkboxIframeElement = this.createIframeElement();
      this.renderer.appendChild(this.elementRef.nativeElement, this.remarkboxIframeElement);
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.iframeResizer = iframeResizer(this.iframeResizerOptions, this.renderer.selectRootElement(`#${ this.remarkboxIframeOptions.id }`))[0];
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.iframeResizer) {
      this.iframeResizer.iFrameResizer.close();
    }
  }

  createNoscriptElement(): object {
    const noscriptElement: object = this.renderer.createElement('noscript');
    this.renderer.appendChild(noscriptElement, this.createIframeElement(true));
    return noscriptElement;
  }

  createIframeElement(nojs?: boolean): object {
    const iframeElement: object = this.renderer.createElement('iframe');

    if (nojs) {
      this.renderer.setAttribute(iframeElement, 'id', this.remarkboxIframeOptions.id);
      this.renderer.setAttribute(iframeElement, 'src', `${ this.remarkboxIframeOptions.src }/embed?nojs=true`);
      this.renderer.setAttribute(iframeElement, 'style', 'height:600px;width:100%;border:none!important');
      this.renderer.setAttribute(iframeElement, 'tabindex', this.remarkboxIframeOptions.tabindex);
    } else {
      this.renderer.setAttribute(iframeElement, 'id', this.remarkboxIframeOptions.id);
      this.renderer.setAttribute(iframeElement, 'scrolling', this.remarkboxIframeOptions.scrolling);
      this.renderer.setAttribute(iframeElement, 'src', `${ this.remarkboxIframeOptions.src }/embed?rb_owner_key=${ this.remarkboxOwnerKey }&thread_uri=${ this.remarkboxThreadUri }`);
      this.renderer.setAttribute(iframeElement, 'frameborder', this.remarkboxIframeOptions.frameborder);
      this.renderer.setAttribute(iframeElement, 'tabindex', this.remarkboxIframeOptions.tabindex);
      this.renderer.setAttribute(iframeElement, 'title', this.remarkboxIframeOptions.title);
      this.renderer.setStyle(iframeElement, 'width', this.remarkboxIframeOptions.width);
    }

    return iframeElement;
  }
}
