import { Locator, Page } from "playwright";
import { BasePage } from "./base-page";

export interface IArticle {
  title: string;
  content: string;
}

export class ZingPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  zingUrl = "https://znews.vn/";

  //xpath
  xArticles = "//article[contains(@class,article-item)]";

  //locator
  articles = this.page.locator(this.xArticles);

  //functions
  openZingPage = async () => {
    await this.navigateTo(this.zingUrl);
  };

  getArticleTitle = async (article: Locator) => {
    return await article.locator("//p[@class='article-title']").innerText();
  };

  getArticleSummary = async (article: Locator) => {
    return await article.locator("//p[@class='article-summary']").innerText();
  };

  getArticles = async (numberOfNotes: number) => {
    let articles: IArticle[] = [];
    //Get all articles
    const allArticles = await this.articles.all();

    for (const article of allArticles) {
      const newsTitle: string = await this.getArticleTitle(article);
      const newsContent: string = await this.getArticleSummary(article);

      const hasTitleAndContent: boolean =
        Boolean(newsTitle?.trim()) && Boolean(newsContent?.trim());

      // Check if the article has both title and content
      if (hasTitleAndContent) {
        articles.push({ title: newsTitle, content: newsContent });
        const hasExpectedNumberOfNotes: boolean =
          articles.length === numberOfNotes;
        //Exit for loop when it reaches the expected number
        if (hasExpectedNumberOfNotes) {
          break;
        }
      }
    }

    return articles;
  };
}
