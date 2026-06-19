import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="temporal-accordion"
export default class extends Controller {
  static targets = ["accordion", "accordionHeader", "accordionWindow"]

  connect() {
    this.activeIndex = this.findInitiallyOpenIndex()

    this.accordionTargets.forEach((_, index) => {
      this.applyAccordionState(index, index === this.activeIndex)
    })
  }

  handleAccordionClick(event) {
    const index = this.accordionTargets.indexOf(event.currentTarget)

    if (index === -1) {
      return
    }

    this.toggleAccordion(index)
  }

  toggleAccordion(index) {
    const nextActiveIndex = this.activeIndex === index ? null : index

    this.accordionTargets.forEach((_, currentIndex) => {
      this.applyAccordionState(currentIndex, currentIndex === nextActiveIndex)
    })

    this.activeIndex = nextActiveIndex
  }

  findInitiallyOpenIndex() {
    const today = this.normalizedToday()

    const matchingIndex = this.accordionTargets.findIndex((accordion) => {
      const activeDate = this.parseDate(accordion.dataset.activeDate)
      const inactiveDate = this.parseDate(accordion.dataset.inactiveDate)

      if (!activeDate || !inactiveDate) {
        return false
      }

      return today >= activeDate && today <= inactiveDate
    })

    return matchingIndex >= 0 ? matchingIndex : null
  }

  applyAccordionState(index, isOpen) {
    const header = this.accordionHeaderTargets[index]
    const window = this.accordionWindowTargets[index]

    header.classList.toggle("temporal-accordion-header-hidden", isOpen)
    header.classList.toggle("temporal-accordion-header-visible", !isOpen)

    window.classList.toggle("temporal-accordion-open", isOpen)
    window.classList.toggle("temporal-accordion-close", !isOpen)
  }

  normalizedToday() {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), today.getDate())
  }

  parseDate(value) {
    if (!value) {
      return null
    }

    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)

    if (!match) {
      return null
    }

    const [, day, month, year] = match

    return new Date(Number(year), Number(month) - 1, Number(day))
  }
}
