$(function () {
  function buildmessageHTML(message) {
    if (message.image) {
      var html =
        `<div class="message" data-messageId="${message.id}" data-groupId="${message.group_id}" >
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
          <image src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-messageId="${message.id}" data-groupId="${message.group_id}" >
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
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function (message) {
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

  var reloadMessages = function () {
    var last_message_id = $('.message').last().attr("data-messageId");
    var groupId = $('.message').attr("data-groupId");
    $.ajax({
      url: `/groups/` + groupId + `/api/messages`,
      type: 'GET',
      data: { id: last_message_id },
      dataType: 'json',
    })
      .done(function (data) {
        $.each(data, function (i, message) {
          var insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          $(".messages").animate({ scrollTop: $(".messages")[0].scrollHeight + 100 }, "fast");
        })
      })
      .fail(function () {
        console.log('error!!');
      });
  }
  setInterval(reloadMessages, 5000);

});