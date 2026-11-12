/**
 * 24 OnlineShop — mobile sticky add-to-cart bar.
 * Mirrors the main product form (price, button label, disabled state) and
 * forwards clicks to its submit button so Dawn's product-form handles the
 * cart drawer, errors and selected variant.
 */
if (!customElements.get('os24-sticky-atc')) {
  customElements.define(
    'os24-sticky-atc',
    class Os24StickyAtc extends HTMLElement {
      connectedCallback() {
        this.mainButton = document.querySelector('[id^="ProductSubmitButton-"]');
        this.mainPrice = document.querySelector('[id^="price-template"]');
        this.button = this.querySelector('[data-sticky-add]');
        this.price = this.querySelector('[data-sticky-price]');
        if (!this.mainButton || !this.button) return;

        this.hidden = false;
        this.button.addEventListener('click', this.onClick.bind(this));

        this.observer = new IntersectionObserver(
          ([entry]) => {
            const scrolledPast = !entry.isIntersecting && entry.boundingClientRect.top < 0;
            this.classList.toggle('is-visible', scrolledPast);
          },
          { threshold: 0 }
        );
        this.observer.observe(this.mainButton);

        this.sync = this.sync.bind(this);
        this.mutation = new MutationObserver(this.sync);
        this.mutation.observe(this.mainButton, { attributes: true, childList: true, subtree: true, characterData: true });
        if (this.mainPrice) {
          this.mutation.observe(this.mainPrice, { childList: true, subtree: true, characterData: true });
        }
        this.sync();

        // Dawn can swap the product markup on variant change; re-bind afterwards.
        if (typeof subscribe === 'function' && typeof PUB_SUB_EVENTS !== 'undefined') {
          this.unsubscribe = subscribe(PUB_SUB_EVENTS.variantChange, () => setTimeout(() => this.rebind()));
        }
      }

      disconnectedCallback() {
        this.observer?.disconnect();
        this.mutation?.disconnect();
        this.unsubscribe?.();
      }

      rebind() {
        const button = document.querySelector('[id^="ProductSubmitButton-"]');
        const price = document.querySelector('[id^="price-template"]');
        if (button && button !== this.mainButton) {
          this.observer.unobserve(this.mainButton);
          this.mainButton = button;
          this.observer.observe(button);
        }
        if (price) this.mainPrice = price;
        this.mutation.disconnect();
        this.mutation.observe(this.mainButton, { attributes: true, childList: true, subtree: true, characterData: true });
        if (this.mainPrice) {
          this.mutation.observe(this.mainPrice, { childList: true, subtree: true, characterData: true });
        }
        this.sync();
      }

      sync() {
        const label = this.mainButton.querySelector('span');
        if (label) this.button.textContent = label.textContent.trim();
        this.button.disabled = this.mainButton.disabled || this.mainButton.getAttribute('aria-disabled') === 'true';

        if (this.mainPrice && this.price) {
          const onSale = this.mainPrice.querySelector('.price--on-sale');
          const current = onSale
            ? this.mainPrice.querySelector('.price__sale .price-item--last')
            : this.mainPrice.querySelector('.price__regular .price-item--regular');
          if (current) this.price.textContent = current.textContent.trim();
          this.price.classList.toggle('os24-sticky-atc__price--sale', Boolean(onSale));
        }
      }

      onClick() {
        if (this.mainButton.disabled) {
          this.mainButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }
        this.mainButton.click();
      }
    }
  );
}
