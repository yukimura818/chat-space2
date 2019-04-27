$(function () {
  function buildmessageHTML(message) {
    if (message.image) {
      var html =
        `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        <asset_path src=${message.image} >
      </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-message-id=${message.id}>
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.date}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }
  $('.js-form').on('submit', function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.href
    console.log(url);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (message) {
        console.log('OK');
        var html = buildmessageHTML(message);
        $('.messages').append(html);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight }, 'fast');
        $('.js-form')[0].reset();
      })
      .fail(function () {
        alert('error');
      });
    return false;
  });
});