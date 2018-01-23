const serverBase = "localhost:8080/";
const BLOG_POST_URL = serverBase + "blog-posts";

const postTemplate = `<h2 class="post-title"></h2>
  <div class="post-author"></div>
  <div class="post-content"></div>
  <div class="post-date"></div>`;

function getandDisplayBlog() {
  console.log("Getting posts");
  $.getJSON(BLOG_POST_URL, function(items) {
    console.log("render blog posts");
    const itemElements = items.map(function(item) {
      const element = $(postTemplate);
      element.attr("id", item.id);
      const itemTitle = element.find(".post-title");
      const itemAuthor = element.find(".post-author");
      const itemContent = element.find(".post-content");
      const itemDate = elemtent.find(".post-date");
      itemTitle.text(item.title);
      itemAuthor.text(item.author);
      itemContent.text(item.content);
      itemDate.text(item.date);
    });
    $(".posts").append(itemElements);
  });
}

function handleApp() {
  getandDisplayBlog();
}

$(handleApp);
