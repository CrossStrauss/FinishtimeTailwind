import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="accordion"
export default class extends Controller {
  static targets = ["accordionButton", "accordionWindow"];

  accordionIsOpen = false;

  connect() {
    console.log('Accordion controller attached')
  }

  toggleAccordion(){
    this.accordionIsOpen = !this.accordionIsOpen;

    if(this.accordionIsOpen){
      console.log("openAccordion");
      this.accordionWindowTarget.classList.add("accordion-open");
      this.accordionWindowTarget.classList.remove("accordion-close");
    } else {
      console.log("closeAccordion");
      this.accordionWindowTarget.classList.remove("accordion-open");
      this.accordionWindowTarget.classList.add("accordion-close");
    }
  }
}
