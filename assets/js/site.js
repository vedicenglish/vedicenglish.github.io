// Click-to-load videos: replace the thumbnail link with the YouTube player.
document.addEventListener('click', function (event) {
  var tile = event.target.closest('.video-tile');
  if (!tile) return;
  event.preventDefault();
  var frame = document.createElement('iframe');
  frame.className = 'video-frame';
  frame.src = 'https://www.youtube-nocookie.com/embed/' + tile.dataset.videoId + '?autoplay=1';
  frame.title = tile.dataset.videoTitle;
  frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  frame.allowFullscreen = true;
  tile.replaceWith(frame);
  frame.focus();
});

// Email addresses are written as "name [at] domain" in the HTML to avoid spam harvesting.
document.querySelectorAll('.email[data-user]').forEach(function (el) {
  var address = el.dataset.user + '@' + el.dataset.domain;
  var link = document.createElement('a');
  link.href = 'mailto:' + address;
  link.textContent = address;
  el.replaceWith(link);
});
