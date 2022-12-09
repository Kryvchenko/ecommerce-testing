class HeaderComponent {
  headerLinks(linkText) {
    return $(`//span[text()='${linkText}']`);
  }
}
export default new HeaderComponent();
