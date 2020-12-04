import {
  LOCALPATH,
  NAV_LINK_TOP,
  NAV_LINK_BEST,
  NAV_LINK_NEW,
  DATA_TEST_CATEGORY,
  POST,
  POST_CATEGORY_TEXT,
  POST_LOADER_MESSAGE,
  POST_END_MESSAGE,
} from "../../../client/test_utils/testIds";

const FETCH_AMOUNT = 10;
const CATEGORY_BEST_RESPONSE_LIMIT = 200;
const CATEGORY_TOP_RESPONSE_LIMIT = 500;
const CATEGORY_NEW_RESPONSE_LIMIT = 500;

describe("posts", () => {
  /**
   * @description Assert against the value of custom data attrs amongst a list of resource cards.
   * @param {string} dataAttribute example `'data-custom-attr'`
   * @param {string} value example `'false'`
   */
  const checkAllPostsForDataAttribute = (dataAttribute, value) => {
    cy.findAllByTestId(POST)
      .each((post) => {
        cy.wrap(post).checkCustomDataAttribute(dataAttribute, value);
      })
      // .each() returns an array which ruins subsequent queries unless it is resolved
      .then(() => undefined);
  };

  beforeEach(() => {
    cy.visit(`${LOCALPATH}/`);
    cy.get("h1").should("have.text", "HNC");
  });

  it("fetches top posts by default upon visiting /", () => {
    cy.visit(`${LOCALPATH}/`);
    cy.location("pathname").should("eq", "/");
    cy.findByTestId(POST_CATEGORY_TEXT).should(
      "have.text",
      `viewing top (${FETCH_AMOUNT} of ${CATEGORY_TOP_RESPONSE_LIMIT})`
    );
    checkAllPostsForDataAttribute(DATA_TEST_CATEGORY, "top");
  });

  it("fetches best posts by upon visiting /best", () => {
    cy.visit(`${LOCALPATH}/best`);
    cy.location("pathname").should("eq", "/best");
    cy.findByTestId(POST_CATEGORY_TEXT).should(
      "have.text",
      `viewing best (${FETCH_AMOUNT} of ${CATEGORY_BEST_RESPONSE_LIMIT})`
    );
    checkAllPostsForDataAttribute(DATA_TEST_CATEGORY, "best");
  });

  it("fetches new posts by upon visiting /new", () => {
    cy.visit(`${LOCALPATH}/new`);
    cy.location("pathname").should("eq", "/new");
    cy.findByTestId(POST_CATEGORY_TEXT).should(
      "have.text",
      `viewing new (${FETCH_AMOUNT} of ${CATEGORY_NEW_RESPONSE_LIMIT})`
    );
    checkAllPostsForDataAttribute(DATA_TEST_CATEGORY, "new");
  });

  it("fetches top posts upon clicking 'top' in navbar", () => {
    cy.findByTestId(NAV_LINK_TOP).click();
    cy.location("pathname").should("eq", "/");
    checkAllPostsForDataAttribute(DATA_TEST_CATEGORY, "top");
  });

  it("fetches best posts upon clicking 'best' in navbar", () => {
    cy.findByTestId(NAV_LINK_BEST).click();
    cy.location("pathname").should("eq", "/best");
    checkAllPostsForDataAttribute(DATA_TEST_CATEGORY, "best");
  });

  it("fetches new posts upon clicking 'new' in navbar", () => {
    cy.findByTestId(NAV_LINK_NEW).click();
    cy.location("pathname").should("eq", "/new");
    checkAllPostsForDataAttribute(DATA_TEST_CATEGORY, "new");
  });

  it("fetches #FETCH_AMOUNT of new top posts when scrolling to the bottom of the page", () => {
    cy.findByTestId(POST_CATEGORY_TEXT).should(
      "have.text",
      `viewing top (${FETCH_AMOUNT} of ${CATEGORY_TOP_RESPONSE_LIMIT})`
    );
    cy.scrollTo("bottom");
    cy.findByTestId(POST_CATEGORY_TEXT).should(
      "have.text",
      `viewing top (${
        FETCH_AMOUNT + FETCH_AMOUNT
      } of ${CATEGORY_TOP_RESPONSE_LIMIT})`
    );
  });

  it("displays 'loading' when reaching bottom of page before new content is loaded", () => {
    cy.scrollTo("bottom");
    cy.findByTestId(POST_LOADER_MESSAGE).should("have.text", `loading top...`);
  });

  it("displays 'no more posts' when reaching bottom of page if there is no more content", () => {
    cy.visit(`${LOCALPATH}/best`);
    for (let i = 0; i < 40; i++) {
      cy.scrollTo("bottom", { duration: 500 });
    }
    cy.findByTestId(POST_END_MESSAGE).should("have.text", `no more posts`);
  });
});
