import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="navbar"
export default class extends Controller {
  static targets = ["nav", "toggler"]

  connect() {
    window.addEventListener("scroll", this.handleScroll.bind(this))
  }

  disconnect() {
    window.removeEventListener("scroll", this.handleScroll.bind(this))
  }

  toggle() {
    this.menuTarget.classList.toggle("hidden")
  }

  handleScroll() {
    if (window.scrollY > 0) {
      console.log("Scroll away from top");
      this.navTarget.classList.add("scrolled")
      this.navTarget.classList.remove("at-top")
    } else {
      console.log("Back at top");
      this.navTarget.classList.remove("scrolled")
      this.navTarget.classList.add("at-top")
    }
  }
}
