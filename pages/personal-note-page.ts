import { Page } from "playwright";
import { BasePage } from "./base-page";
import { IArticle } from "./zing-page";

export class PersonalNotePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  xTitleInput = "//input[@id='note-title']";
  xContentInput = "//textarea[@id='note-content']";
  xAddBtn = "//button[@id='add-note']";
  xNoteCount = "//*[@id='note-count']";
  xSearchInput = "//*[@id='search']";
  xSearchResults = "//*[@id='notes-list']";

  titleInput = this.page.locator(this.xTitleInput);
  contentInput = this.page.locator(this.xContentInput);
  addButton = this.page.locator(this.xAddBtn);
  noteCount = this.page.locator(this.xNoteCount);
  searchInput = this.page.locator(this.xSearchInput);
  searchResults = this.page.locator(this.xSearchResults);

  openPersonalNotePage = async () => {
    await this.openMainPage();
    await this.page.locator("//a[contains(text(),'Personal notes')]").click();
  };

  addNotesWithArticles = async (articles: IArticle[]) => {
    for (const article of articles) {
      await this.titleInput.fill(article.title);
      await this.contentInput.fill(article.content);
      await this.addButton.click();
    }
  };

  getSearchTerm = async (
    articles: IArticle[],
    searchBy: "title" | "content",
    numberOfSearchCharacters: number
  ) => {
    //Get search term by random title or content of article
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomArticle = articles[randomIndex];

    const searchTerm = randomArticle[searchBy].slice(
      0,
      numberOfSearchCharacters
    );

    return searchTerm;
  };

  searchByKeyword = async (keyword: string) => {
    const searchInput = this.searchInput;
    await searchInput.fill(keyword);
  };

  getFirstSearchResult = async () => {
    const searchResults = this.searchResults;
    const firstResult = await searchResults.first().innerText();
    return firstResult;
  };
}
