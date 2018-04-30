/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function () {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function () {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Test that loops through each feed in the allFeeds object
     * and ensures it has a URL defined and that the URL is
     *  not empty.
     */
    it('URLs are defined and not empty', function () {
      allFeeds.forEach(feed => {
        const url = feed.url;
        expect(url).toBeDefined();
        expect(url.length).toBeGreaterThan(0);
      })
    });


    /* Test that loops through each feed in the allFeeds object
     * and ensures it has a name defined and that the name is
     * not empty.
     */
    it('names are defined and not empty', function () {
      allFeeds.forEach(feed => {
        const name = feed.name;
        expect(name).toBeDefined();
        expect(name.length).toBeGreaterThan(0);
      })
    });
  });


  /* Test suite to check menu */
  describe('The menu', function () {

    /* Test that ensures the menu element is hidden by default.*/
    it('menu is hidden by default', function () {
      expect($('body').hasClass('menu-hidden')).toBeTruthy();
    });

    /* Test that ensures the menu changes visibility when the menu
     * icon is clicked. This test should have two expectations:
     * does the menu display when clicked and does it hide when
     * clicked again.
     */
    it('menu changes visibility on icon click', function () {
      // Get hamburger icon
      const icon = $('.menu-icon-link')

      // First click on hamburger icon
      icon.trigger('click')
      // Menu should be visible
      expect($('body').hasClass('menu-hidden')).toBe(false);

      // Second click on hamburger icon
      icon.trigger('click')
      // Menu should be hidden
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  /* Test suite to check initial entries */
  describe('Initial Entries', function () {

    beforeEach(function (done) {
      loadFeed(0, done);
    });

    /* Test that ensures when the loadFeed function is called
     * and completes its work, there is at least a single .entry
     * element withfix: in the .feed container.
     */
    it('at least single entry within container', function () {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });

  /* Test suite to check loading of new feeds */
  describe('New Feed Selection', function () {

    // Variables that will hold old and new feed entries
    let oldFeed;
    let newFeed;

    beforeEach(function (done) {
      // Load first feed
      loadFeed(0, function () {
        oldFeed = $('.feed').html();
        done();
      });
    });

    /* Test that ensures when a new feed is loaded by the loadFeed
     * test function that the content actually changes.
     */
    it('content changes when new feed loaded', function (done) {
      // Load second feed
      loadFeed(1, function () {
        newFeed = $('.feed').html();
        // Check if oldFeed is defined
        expect(oldFeed).toBeDefined();
        // Check if newFeed is defined
        expect(newFeed).toBeDefined();
        // Expect old and new feed not to be equal
        expect(newFeed).not.toEqual(oldFeed);
        done();
      });
    });
  });
}());
