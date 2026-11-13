/**
 * 24 OnlineShop: lightweight one-row slider with prev/next buttons.
 *
 * Markup:
 *   <os24-slider>
 *     <div data-slider-nav>
 *       <button data-slider-prev>…</button>
 *       <button data-slider-next>…</button>
 *     </div>
 *     <ul data-slider-track>…</ul>
 *   </os24-slider>
 *
 * The track does the layout (CSS scroll-snap); this only moves it one card per click,
 * disables the buttons at either end, and hides them when every card already fits.
 */
if (!customElements.get('os24-slider')) {
  customElements.define(
    'os24-slider',
    class Os24Slider extends HTMLElement {
      connectedCallback() {
        this.track = this.querySelector('[data-slider-track]');
        if (!this.track) return;

        this.nav = this.querySelector('[data-slider-nav]');
        this.prev = this.querySelector('[data-slider-prev]');
        this.next = this.querySelector('[data-slider-next]');

        this.update = this.update.bind(this);
        this.onBlockSelect = this.onBlockSelect.bind(this);

        this.prev?.addEventListener('click', () => this.go(-1));
        this.next?.addEventListener('click', () => this.go(1));
        this.track.addEventListener('scroll', this.update, { passive: true });

        this.resizeObserver = new ResizeObserver(this.update);
        this.resizeObserver.observe(this.track);

        // Theme editor: bring the selected set into view.
        document.addEventListener('shopify:block:select', this.onBlockSelect);

        this.update();
      }

      disconnectedCallback() {
        this.resizeObserver?.disconnect();
        document.removeEventListener('shopify:block:select', this.onBlockSelect);
      }

      step() {
        const items = this.track.children;
        if (items.length < 2) return this.track.clientWidth;
        return items[1].offsetLeft - items[0].offsetLeft;
      }

      go(direction) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.track.scrollBy({ left: direction * this.step(), behavior: reduceMotion ? 'auto' : 'smooth' });
      }

      update() {
        const max = this.track.scrollWidth - this.track.clientWidth;
        const position = this.track.scrollLeft;

        if (this.nav) this.nav.hidden = max <= 2;
        if (this.prev) this.prev.disabled = position <= 2;
        if (this.next) this.next.disabled = position >= max - 2;
      }

      onBlockSelect(event) {
        if (!this.track.contains(event.target)) return;
        this.track.scrollTo({ left: event.target.offsetLeft - this.track.children[0].offsetLeft });
      }
    }
  );
}
